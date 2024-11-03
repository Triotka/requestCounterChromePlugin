document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tabId = tabs[0].id; // get current window
  
      // use get badge text to update html element 'requestCount
      chrome.action.getBadgeText({ tabId: tabId }, function (text) {
        document.getElementById('requestCount').textContent = text ? text : '0';
      });
    });
  });
  