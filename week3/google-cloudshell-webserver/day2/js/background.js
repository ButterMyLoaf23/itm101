const DEFAULT_SETTINGS = { enabled: true, totalBlocked: 0 };

chrome.runtime.onInstalled.addListener(async () => {
  const settings = await chrome.storage.local.get(DEFAULT_SETTINGS);
  await chrome.storage.local.set(settings);
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type !== 'adsBlocked') return;
  chrome.storage.local.get({ totalBlocked: 0 }, (settings) => {
    chrome.storage.local.set({ totalBlocked: settings.totalBlocked + message.count });
  });
});
