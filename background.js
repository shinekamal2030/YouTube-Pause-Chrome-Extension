chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url.includes("youtube.com/watch")) {
      chrome.tabs.sendMessage(tab.id, { action: "resume" });
    } else {
      const queryOptions = { url: "*://www.youtube.com/watch?*" };
      const tabs = await chrome.tabs.query(queryOptions);
      for (let ytTab of tabs) {
        chrome.tabs.sendMessage(ytTab.id, { action: "pause" });
      }
    }
  });
  