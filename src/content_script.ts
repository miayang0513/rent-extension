chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  const { action } = msg
  if (action) {
    if (action === 'changeTitle') {
      const title = document.querySelector('span.houseInfoTitle')
      if (title) title.innerHTML = 'Testing'
      sendResponse('changeTitle')
      console.log('injected')
    } else if (action === 'insertPanel') {
      console.log('Welcome 591 Detail 頁面')
    }
  }
})
