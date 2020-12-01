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

    const elementAppPanel = document.createElement('div')
    elementAppPanel.setAttribute('class', 'app-panel')

    const overallRating = [
      {
        name: '環境噪音',
        rating: 4.0
      },
      {
        name: '交通便利',
        rating: 2.8
      },
      {
        name: '房屋狀況',
        rating: 0.9
      },
      {
        name: '房東評價',
        rating: 5.0
      }
    ]
    const elementSheet = generateOverallRatingSheet(overallRating)
    const elementMedian = generateMedianPanel(99999)

    elementAppPanel.addEventListener('click', (e) => {
      e.stopPropagation()
      if (elementAppPanel.children[0].classList.contains('panel--expand')) {
        elementAppPanel.children[0].classList.remove('panel--expand')
        elementSheet.style.display = 'none'
      } else {
        elementAppPanel.children[0].classList.add('panel--expand')
        elementSheet.style.display = 'block'
      }
    })

    elementAppPanel.append(elementMedian)
    elementAppPanel.append(elementSheet)
    elementContainer.append(elementAppIcon)
    elementContainer.append(elementAppPanel)
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

function generateMedianPanel(median: number): HTMLElement {
  const element = document.createElement('div')
  element.setAttribute('class', 'panel')
  element.innerHTML = `
    <div class="panel__upper">
      <span>區域中位數</span>
      <i></i>
    </div>
    <div class="panel__lower">
      <em>${median}</em>
      <span>元/月</span>
    </div>
  `
  return element
}

function generateOverallRatingSheet(overallRating: Array<{ name: string; rating: number }>): HTMLElement {
  const elementSheet = document.createElement('div')
  elementSheet.style.display = 'none'
  elementSheet.setAttribute('class', 'sheet')

  let htmlContent = ''
  overallRating.forEach((item) => {
    htmlContent += `
      <div class="sheet__item">
        <div>
          <span>${item.name}</span>
          <em>${item.rating}</em>
        </div>
    `
    htmlContent += `
        <div class="sheet__item__rating">
    `
    for (let i = 0; i < Math.floor(item.rating); i++) {
      htmlContent += `
          <i class="checked"></i>
      `
    }
    for (let i = 0; i < 5 - Math.floor(item.rating); i++) {
      htmlContent += `
          <i></i>
      `
    }
    htmlContent += `
        </div>
      </div>
    `
  })
  elementSheet.innerHTML = htmlContent

  return elementSheet
}
