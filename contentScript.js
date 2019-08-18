chrome.runtime.onMessage.addListener((checkMessage))
function checkMessage(message, sender, sendResponse) {
  console.log('message received')
  start(message)
}
window.onload = function () {
  console.log('onload')

}

function start(message) {
  if (message.status === 'start') {
    makeWidget()
  }
}
function makeWidget() {
  addWidgetStyle()
  var container = document.createElement('DIV')

  var buttonCrop = document.createElement('BUTTON')
  buttonCrop.classList.add('youcrop-btns')
  buttonCrop.id = 'crop-btn'
  buttonCrop.innerHTML = `
    <i class='fas fa-crop-alt'></i>`
  buttonCrop.onclick = () => addStyle("crop")

  var buttonAct = document.createElement('BUTTON')
  buttonAct.classList.add('youcrop-btns')
  buttonAct.id = 'actual-btn'
  buttonAct.innerHTML = `
    <i class='fas fa-compress'></i>`
  buttonAct.onclick = () => addStyle("actual")

  var buttonReset = document.createElement('BUTTON')
  buttonReset.classList.add('youcrop-btns')
  buttonReset.innerHTML = `
    <i class='fas fa-redo'></i>`
  buttonReset.onclick = () => addStyle("original")

  var buttonClose = document.createElement('SPAN')
  buttonClose.classList.add('fas')
  buttonClose.classList.add('fa-times')
  buttonClose.classList.add('close')
  buttonClose.onclick = () => closeWidget()

  let innerHTML = `
  <div class='youcrop-head'>YouCrop</div>
  <div class='youcrop-btn-container'>
  </div>
  `
  container.innerHTML = innerHTML
  container.classList.add('youcrop-outer-container')
  document.body.appendChild(container)
  setTimeout(() => {
    document.querySelector('.youcrop-btn-container').appendChild(buttonCrop)
    document.querySelector('.youcrop-btn-container').appendChild(buttonAct)
    document.querySelector('.youcrop-btn-container').appendChild(buttonReset)
    document.querySelector('.youcrop-outer-container').appendChild(buttonClose)
  }, 100)
}
function closeWidget () {
  clean()
  document.body.removeChild(document.querySelector('.youcrop-outer-container'))
}
function addWidgetStyle() {
  var stringStyle = `
  @import url(https://use.fontawesome.com/releases/v5.5.0/css/all.css);
  .youcrop-outer-container * {
    box-sizing: border-box;
  }
  .youcrop-outer-container {
    position: fixed;
    padding: 1rem;
    z-index: 22;
    background: rgba(0, 0, 0, 0.9);
    right: 10px;
    top: 75px;
    border-radius: 8px;
    opacity: 0.3;
    transition: all 0.34s ease-in-out;
    transform: translateX(80%);
    animation: show 2s ease-in-out 1;
  }
  @keyframes show {
    from {
      transform: translateX(0%);
      opacity: 1;
      background: red;
    }
    to {
      transform: translateX(80%);
      opacity: 0.1;
      background: rgba(0, 0, 0, 0.9);
    }
  }
  .youcrop-outer-container:hover {
    opacity: 1;
    transform: translateX(0%);
  }
  .youcrop-outer-container > .youcrop-btn-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    width: 100%;
    padding-bottom: 0.5rem;
  }
  .youcrop-outer-container > .youcrop-head {
    font-size: 12px;
    color: #fff;
    text-align: center;
  }
  .youcrop-outer-container > .close {
    position: absolute;
    right: 8px;
    top: 5px;
    font-size: 14px;
    color: #eee;
    cursor: pointer;
  }
  .youcrop-outer-container .youcrop-btns {
    height: 40px;
    /* flex: 1; */
    width: 40px;
    margin-right: 10px;
    border: 2px solid #fff;
    background: transparent;
    border-radius: 8px;
    color: #fff;
    font-size: 15px;
    display: flex;
    cursor: pointer;
    border-radius: 30px;
    justify-content: center;
    position: relative;
    align-items: center;
    transition: all 0.34s ease-in-out;
  }
  .youcrop-outer-container .youcrop-btns:after {
    content: 'Toottip';
    position: absolute;
    top: 0;
    left: 50%;
    padding: 5px;
    color: white;
    background: #222;
    transform: translateY(-0%) translateX(-50%);
    z-index: 1;
    font-size: 12px;
    border-radius: 5px;
    transition: all 0.34s ease-in-out;
    opacity: 0;
  }
  .youcrop-outer-container .youcrop-btns:hover:after {
    opacity: 1;
    transform: translateY(-143%) translateX(-50%);
  }
  .youcrop-outer-container .youcrop-btns:nth-child(1)::after {
    content: 'Crop';
  }
  .youcrop-outer-container .youcrop-btns:nth-child(2)::after {
    content: 'Actual';
  }
  .youcrop-outer-container .youcrop-btns:nth-child(3)::after {
    content: 'Reset';
  }
  .youcrop-outer-container .youcrop-btns.active {
    border-color: red;
    color: red;
  }
  .youcrop-outer-container .youcrop-btns:focus {
    outline: none;
  }
  .youcrop-btns:last-child {
    margin-right: 0;
  }
  `
  console.log(stringStyle)
  styleMaker(stringStyle, 'youcrop-widget-style')
}
function clean() {
  var styleTag = document.getElementById('you-crop-style-tag')
  console.log('Cleaning', styleTag)
  if (styleTag) document.head.removeChild(styleTag)
  var buttons = document.querySelectorAll('.youcrop-btns')
  if (buttons && buttons.length > 0) {
    buttons.forEach(but => but.classList.remove('active'))
  }
}
function addStyle(type) {
  clean()
  makeBtnActive(type)
  var videoPlayer = document.querySelector('.html5-main-video')
  var styleString
  var host = window.location.hostname
  if (videoPlayer && host === "www.youtube.com") {
    if (type === 'crop') {
      styleString = `
                  .html5-main-video {
                      width: 100vw !important;
                      object-fit: cover;
                      left: 0 !important;
                      height: 100vh !important;
                      top: 0 !important;
                  }
              `
    } else if (type === 'actual') {
      styleString = `
                  .html5-main-video {
                      width: 100vw !important;
                      object-fit: none;
                      left: 0 !important;
                      height: 100vh !important;
                      top: 0 !important;
                  }
              `
    }
    styleMaker(styleString, 'you-crop-style-tag')
  }
}
function makeBtnActive(type) {
  console.log('revive', type)
  switch (type) {
    case 'crop':
      document.getElementById('crop-btn').classList.add('active')
      break
    case 'actual':
      document.getElementById('actual-btn').classList.add('active')
      break
  }
}
function styleMaker(css, id, mute) {
  if (css) {
    if (id && document.getElementById(id)) return
    if (mute === '--verbose' || mute === '-v') console.log('Initialising Style Maker', css);
    let head = document.head || document.getElementsByTagName('head')[0];
    let style = document.createElement('style');
    if (id) style.id = id

    style.type = 'text/css';
    if (style.styleSheet) {
      // This is required for IE8 and below.
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
    if (mute === '--verbose' || mute === '-v') console.log('Style Added');
  } else {
    console.log('Please call StylerMaker with a valid cssText argument');
  }

}