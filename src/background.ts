const bgTest = () => {
  console.count('bgTest')
  setTimeout(bgTest, 1000 * 1)
}
bgTest()

chrome.webNavigation.onCompleted.addListener(
  (detail) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0]
      if (currentTab?.id) {
        chrome.tabs.sendMessage(currentTab.id, {
          action: 'insertPanel'
        })
      }
    })
  },
  {
    url: [{ hostSuffix: '591.com.tw' }]
  }
)
