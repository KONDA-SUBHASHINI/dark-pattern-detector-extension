const darkPatterns = {
  urgency: {
    keywords: ['only.*left', 'hurry', 'limited time', 'expires soon', 'last chance', 'almost gone', 'selling fast'],
    type: 'Urgency Pressure'
  },
  sneaking: {
    keywords: ['pre-checked', 'automatically renew', 'auto-subscribe', 'hidden fee', 'additional charge'],
    type: 'Sneaking'
  },
  misdirection: {
    keywords: ['no thanks', 'maybe later', 'i don\'t want', 'skip this offer', 'continue without'],
    type: 'Misdirection'
  },
  social_proof: {
    keywords: ['people are viewing', 'others bought', 'trending now', 'popular choice', 'bestseller'],
    type: 'False Social Proof'
  },
  forced_action: {
    keywords: ['must accept', 'required field', 'cannot proceed', 'mandatory'],
    type: 'Forced Action'
  },
  confirmshaming: {
    keywords: ['no.*i.*don\'t.*want.*save', 'no.*i.*like.*paying', 'no.*i.*hate.*deals'],
    type: 'Confirmshaming'
  }
};

let detectedPatterns = [];
let observer = null;

async function analyzeText(text, element) {
  if (!text || text.length < 5) return null;
  
  const lowerText = text.toLowerCase();
  
  for (const [key, pattern] of Object.entries(darkPatterns)) {
    for (const keyword of pattern.keywords) {
      const regex = new RegExp(keyword, 'i');
      if (regex.test(lowerText)) {
        return {
          type: pattern.type,
          text: text.substring(0, 100),
          element: element,
          keyword: keyword
        };
      }
    }
  }
  
  return null;
}

function highlightElement(element, patternType) {
  if (element.classList.contains('dpg-highlighted')) return;
  
  element.classList.add('dpg-highlighted');
  element.setAttribute('data-dpg-pattern', patternType);
  
  const warning = document.createElement('div');
  warning.className = 'dpg-warning';
  warning.innerHTML = `⚠️ ${patternType} Detected`;
  
  element.style.position = 'relative';
  element.appendChild(warning);
}

async function scanPage() {
  const data = await chrome.storage.local.get(['settings']);
  const settings = data.settings || { protectionEnabled: true };
  
  if (!settings.protectionEnabled) return;
  
  const elements = document.querySelectorAll('button, a, p, span, div, label, input');
  let newDetections = [];
  
  for (const element of elements) {
    if (element.classList.contains('dpg-warning') || element.classList.contains('dpg-highlighted')) continue;
    
    const text = element.textContent || element.value || element.placeholder || '';
    const result = await analyzeText(text, element);
    
    if (result) {
      highlightElement(element, result.type);
      newDetections.push(result);
    }
  }
  
  if (newDetections.length > 0) {
    detectedPatterns = [...detectedPatterns, ...newDetections];
    await updateStats(newDetections.length);
  }
}

async function updateStats(newPatterns) {
  const data = await chrome.storage.local.get(['stats', 'detections']);
  const stats = data.stats || { patternsDetected: 0, sitesScanned: 0 };
  const detections = data.detections || [];
  
  stats.patternsDetected += newPatterns;
  stats.sitesScanned = stats.sitesScanned || 0;
  stats.sitesScanned += 1;
  
  const newDetections = detectedPatterns.slice(-10);
  
  await chrome.storage.local.set({
    stats,
    detections: [...newDetections, ...detections].slice(0, 50)
  });
  
  chrome.runtime.sendMessage({
    action: 'patternsDetected',
    count: newPatterns
  });
}

function observeDOM() {
  if (observer) observer.disconnect();
  
  observer = new MutationObserver((mutations) => {
    let shouldScan = false;
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        shouldScan = true;
        break;
      }
    }
    if (shouldScan) {
      setTimeout(scanPage, 500);
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scanPage') {
    scanPage();
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(scanPage, 1000);
    observeDOM();
  });
} else {
  setTimeout(scanPage, 1000);
  observeDOM();
}