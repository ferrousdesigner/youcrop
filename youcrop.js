document
  .getElementById('crop-btn')
  .addEventListener('click', e => setup(e, 'crop'))
document
  .getElementById('actual-btn')
  .addEventListener('click', e => setup(e, 'actual'))
document
  .getElementById('none-btn')
  .addEventListener('click', e => setup(e, 'none'))

document.onload = function () {
  let cropStatus = localStorage.getItem['cropped']
  if (cropStatus) reviveCrop(cropStatus)
}
function reviveCrop (cropStatus) {
  switch (cropStatus) {
    case 'crop':
      document.getElementById('crop-btn').classList.add('active')
      break
    case 'actual':
      document.getElementById('actual-btn').classList.add('active')
      break
  }
}
function setCrop (cropStatus) {
  switch (cropStatus) {
    case 'crop':
      localStorage.setItem('cropped', 'crop')
      break
    case 'actual':
      localStorage.setItem('cropped', 'actual')
      break
  }
}
function setup (e, type) {
  var buts = document.querySelectorAll('start')
  for (var i = 0; i < buts.length; i++) {
    buts[i].classList.remove('active')
  }
  e.target.classList.add('active')
  setCrop(type)
  var params = {
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params, gotTabs)
  function gotTabs (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { status: 'start', type: type },
      function (response) {
        setTimeout(function () {
          window.close()
        }, 1000)
      }
    )
  }
}
