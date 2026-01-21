chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.local.set({
    stats: { patternsDetected: 0, sitesScanned: 0 },
    settings: { protectionEnabled: true, notificationsEnabled: true },
    detections: []
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'patternsDetected') {
    chrome.storage.local.get(['settings'], (data) => {
      const settings = data.settings || { notificationsEnabled: true };
      if (settings.notificationsEnabled && request.count > 0) {
        chrome.action.setBadgeText({ text: String(request.count) });
        chrome.action.setBadgeBackgroundColor({ color: '#ef4444' });
        
        setTimeout(() => {
          chrome.action.setBadgeText({ text: '' });
        }, 5000);
      }
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    }).catch(() => {});
  }
});