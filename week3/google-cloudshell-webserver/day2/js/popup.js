const siteName = document.querySelector('#siteName');
const enabledToggle = document.querySelector('#enabledToggle');
const blockedCount = document.querySelector('#blockedCount');
const totalCount = document.querySelector('#totalCount');
const statusDot = document.querySelector('#statusDot');
const message = document.querySelector('#message');

async function getActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
}

async function loadPopup() {
  const tab = await getActiveTab();
  const settings = await chrome.storage.local.get({ enabled: true, totalBlocked: 0 });
  siteName.textContent = tab?.url ? new URL(tab.url).hostname : 'Current tab';
  enabledToggle.checked = settings.enabled;
  totalCount.textContent = settings.totalBlocked;
  updateStatus(settings.enabled);
  try {
    const stats = await chrome.tabs.sendMessage(tab.id, { type: 'getStats' });
    blockedCount.textContent = stats?.blockedOnPage || 0;
  } catch { blockedCount.textContent = '—'; }
}

function updateStatus(enabled) {
  statusDot.classList.toggle('off', !enabled);
  message.textContent = enabled ? 'ClearView is protecting this page.' : 'Ad blocking is paused for this page.';
}

enabledToggle.addEventListener('change', async () => {
  const enabled = enabledToggle.checked;
  await chrome.storage.local.set({ enabled });
  const tab = await getActiveTab();
  if (tab?.id) chrome.tabs.sendMessage(tab.id, { type: 'setEnabled', enabled });
  updateStatus(enabled);
});

document.querySelector('#refreshButton').addEventListener('click', async () => {
  const tab = await getActiveTab();
  if (tab?.id) chrome.tabs.reload(tab.id);
  window.close();
});

loadPopup();
