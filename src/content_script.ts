chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  const { action } = msg

  if (!action) {
    return
  }

  if (action === 'changeTitle') {
    const title = document.querySelector('span.houseInfoTitle')
    if (title) title.innerHTML = 'Testing'
    sendResponse('changeTitle')
  } else if (action === 'insertPanel') {
    const bodyElement = document.querySelector('body')
    const mainElement = document.createElement('div')
    mainElement.setAttribute('id', 'zotsu-app')
    const left = window.innerWidth - 140
    const top = window.innerHeight - 160
    mainElement.style.left = left + 'px'
    mainElement.style.top = top + 'px'

    mainElement.innerHTML = `
        <div class="app-container">
          <div class="app-icon"></div>
        </div>
      `
    makeDraggable(mainElement)
    bodyElement?.prepend(mainElement)
    sendResponse('insertPanel')
  }
})

function makeDraggable(element: HTMLElement): void {
  const dragPosition = {
    currentX: 0,
    currentY: 0,
    initialX: 0,
    initialY: 0,
    xOffset: 0,
    yOffset: 0
  }
  element.addEventListener('mousedown', (event) => {
    dragPosition.initialX = event.clientX - dragPosition.xOffset
    dragPosition.initialY = event.clientY - dragPosition.yOffset

    document.onmousemove = (event) => {
      event.preventDefault()
      dragPosition.currentX = event.clientX - dragPosition.initialX
      dragPosition.currentY = event.clientY - dragPosition.initialY
      dragPosition.xOffset = dragPosition.currentX
      dragPosition.yOffset = dragPosition.currentY
      element.style.transform = `translate(${dragPosition.currentX}px, ${dragPosition.currentY}px)`
    }
    document.onmouseup = () => {
      document.onmouseup = null
      document.onmousemove = null
    }
  })
}
