chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.test) {
    //TODO: 調整 591 DOM
    const title = document.querySelector('span.houseInfoTitle')
    if (title) title.innerHTML = 'Testing'
    sendResponse('injected')
    console.log('injected')
  }
})
