chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  const { action } = msg
  if (action) {
    if (action === 'changeTitle') {
      const title = document.querySelector('span.houseInfoTitle')
      if (title) title.innerHTML = 'Testing'
      sendResponse('changeTitle')
      console.log('injected')
    } else if (action === 'insertPanel') {
      const bodyElement = document.querySelector('body')
      const mainElement = document.createElement('div')
      mainElement.setAttribute('id', 'zotsu-app')
      const x = window.innerWidth - 140
      const y = window.innerHeight - 160
      mainElement.style.transform = `translate(${x}px, ${y}px)`

      mainElement.innerHTML = `
        <div class="app-container">
          <div class="app-icon"></div>
          <div class="app-panel"></div>
        </div>
      `
      bodyElement?.prepend(mainElement)
    }
  }
})
