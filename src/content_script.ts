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
    if (document.getElementById('zotsu-app')) {
      return
    }

    const elementContainer = document.createElement('div')
    elementContainer.setAttribute('id', 'zotsu-app')
    const left = window.innerWidth - 140
    const top = window.innerHeight - 160
    elementContainer.style.left = left + 'px'
    elementContainer.style.top = top + 'px'

    makeDraggable(elementContainer, () => {
      console.log('click')
      window.location.href = 'https://www.youtube.com/'
    })

    const elementAppIcon = document.createElement('div')
    elementAppIcon.setAttribute('class', 'app-icon')

    elementContainer.prepend(elementAppIcon)
    document.querySelector('body')?.prepend(elementContainer)
    sendResponse('insertPanel')
  }
})

function makeDraggable(element: HTMLElement, clickHandler?: { (): void }): void {
  const dragPosition = {
    currentX: 0,
    currentY: 0,
    initialX: 0,
    initialY: 0,
    xOffset: 0,
    yOffset: 0
  }

  function dragging(event: MouseEvent): void {
    console.log('move')
    dragPosition.currentX = event.clientX - dragPosition.initialX
    dragPosition.currentY = event.clientY - dragPosition.initialY
    dragPosition.xOffset = dragPosition.currentX
    dragPosition.yOffset = dragPosition.currentY
    element.style.transform = `translate(${dragPosition.currentX}px, ${dragPosition.currentY}px)`

    if (clickHandler) {
      element.removeEventListener('click', clickHandler)
    }
  }

  function dragEnd(event: MouseEvent): void {
    console.log('end')
    document.removeEventListener('mousemove', dragging, true)
    document.removeEventListener('mousedown', dragEnd, true)
  }

  element.addEventListener('mousedown', (event) => {
    console.log('start')
    dragPosition.initialX = event.clientX - dragPosition.xOffset
    dragPosition.initialY = event.clientY - dragPosition.yOffset
    document.addEventListener('mousemove', dragging, true)
    document.addEventListener('mouseup', dragEnd, true)

    if (clickHandler) {
      element.addEventListener('click', clickHandler)
    }
  })
}
