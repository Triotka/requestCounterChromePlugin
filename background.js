let requestCountsPerTab = {}; // key is tab id and value is request count on this tab

// When request completed count it in for current tab 
chrome.webRequest.onCompleted.addListener(
  function (details) {
    const tabId = details.tabId; // current tab
    if (tabId >= 0) { // valid tab id
      if (!requestCountsPerTab[tabId]) { // key does not exist yet, create and set to 0
        requestCountsPerTab[tabId] = 0;
      }
      requestCountsPerTab[tabId]++;
    }
  },
  { urls: ["<all_urls>"] }
);

// When tab actived, change badge text using actived tab request count, if not present, show 0
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.action.setBadgeText({
    tabId: activeInfo.tabId,
    text: requestCountsPerTab[activeInfo.tabId] ? requestCountsPerTab[activeInfo.tabId].toString() : "0"
  });
});

// When tab updated, change badge text using updated tab request count, if not present, show 0
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    chrome.action.setBadgeText({
      tabId: tabId,
      text: requestCountsPerTab[tabId] ? requestCountsPerTab[tabId].toString() : "0"
    });
  }
});
