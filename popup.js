document.addEventListener('DOMContentLoaded', async () => {
  const enableProtection = document.getElementById('enableProtection');
  const enableNotifications = document.getElementById('enableNotifications');
  const scanNow = document.getElementById('scanNow');
  const patternsDetected = document.getElementById('patternsDetected');
  const sitesScanned = document.getElementById('sitesScanned');
  const recentDetections = document.getElementById('recentDetections');

  const data = await chrome.storage.local.get(['stats', 'settings', 'detections']);
  const stats = data.stats || { patternsDetected: 0, sitesScanned: 0 };
  const settings = data.settings || { protectionEnabled: true, notificationsEnabled: true };
  const detections = data.detections || [];

  patternsDetected.textContent = stats.patternsDetected;
  sitesScanned.textContent = stats.sitesScanned;
  enableProtection.checked = settings.protectionEnabled;
  enableNotifications.checked = settings.notificationsEnabled;

  if (detections.length > 0) {
    recentDetections.innerHTML = detections.slice(0, 5).map(d => `
      <div class="detection-item">
        <div class="detection-type">${d.type}</div>
        <div class="detection-text">${d.text.substring(0, 80)}...</div>
      </div>
    `).join('');
  }

  enableProtection.addEventListener('change', async (e) => {
    settings.protectionEnabled = e.target.checked;
    await chrome.storage.local.set({ settings });
  });

  enableNotifications.addEventListener('change', async (e) => {
    settings.notificationsEnabled = e.target.checked;
    await chrome.storage.local.set({ settings });
  });

  scanNow.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: 'scanPage' });
    scanNow.textContent = 'Scanning...';
    setTimeout(() => {
      scanNow.textContent = 'Scan Current Page';
    }, 1500);
  });
});