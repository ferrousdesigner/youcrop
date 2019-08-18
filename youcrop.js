document
  .getElementById('start-btn')
  .addEventListener('click', e => setup(e))



function setup(e) {
  e.target.classList.add('active')
  var params = {
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params, gotTabs)
  function gotTabs(tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { status: 'start' },
      function (response) {
        setTimeout(function () {
          window.close()
        }, 300)
      }
    )
  }
}
