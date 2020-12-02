const clickEventHandler = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0]
    if (currentTab?.id) {
      chrome.tabs.sendMessage(currentTab.id, {
        action: 'changeTitle'
      })
    }
  })
}

document.querySelector('#test')?.addEventListener('click', clickEventHandler)
