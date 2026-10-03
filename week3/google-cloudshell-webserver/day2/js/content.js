const AD_SELECTORS = [
  '[id*="ad-"]', '[id*="ads-"]', '[id*="advert"]', '[class*="ad-"]',
  '[class*="ads-"]', '[class*="advert"]', '[data-ad]', '[data-advertisement]',
  'iframe[src*="doubleclick"]', 'iframe[src*="googlesyndication"]'
];

let blockedOnPage = 0;

function removeAds() {
  chrome.storage.local.get({ enabled: true }, ({ enabled }) => {
    if (!enabled) return;
    const elements = document.querySelectorAll(AD_SELECTORS.join(','));
    elements.forEach((element) => {
      if (element.dataset.clearviewRemoved) return;
      element.dataset.clearviewRemoved = 'true';
      element.remove();
      blockedOnPage += 1;
    });
    if (blockedOnPage > 0) chrome.runtime.sendMessage({ type: 'adsBlocked', count: blockedOnPage });
  });
}

removeAds();
new MutationObserver(removeAds).observe(document.documentElement, { childList: true, subtree: true });

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'getStats') return Promise.resolve({ blockedOnPage });
  if (message.type === 'setEnabled' && message.enabled) removeAds();
});
