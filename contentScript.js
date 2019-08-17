chrome.runtime.onMessage.addListener((checkMessage))
function checkMessage(message, sender, sendResponse) {
    start(message)
}

function start(message) {
    if (message.status === 'start') {
        var videoPlayer = document.querySelector('.html5-main-video')
        var host = window.location.hostname
        var styleTag = document.getElementById('you-crop-style-tag')
        if(styleTag) document.body.removeChild(styleTag)
        var styleString
        if (videoPlayer && host === "www.youtube.com") {
            if(message.type === 'crop') {
                 styleString = `
                    .html5-main-video {
                        width: 100vw !important;
                        object-fit: cover;
                        left: 0 !important;
                        height: 100vh !important;
                        top: 0 !important;
                    }
                `
            } else if (message.type === 'actual') {
                styleString = `
                    .html5-main-video {
                        width: 100vw !important;
                        object-fit: none;
                        left: 0 !important;
                        height: 100vh !important;
                        top: 0 !important;
                    }
                `
            } else if (message.type === 'original') {
                
            }
            
            styleMaker(styleString, 'you-crop-style-tag')
        } else {
            console.log('Not Youtube!')
        }
    }
}

function styleMaker (css, id, mute) {
    if(css) {
        if(id && document.getElementById(id)) return
        if(mute === '--verbose' || mute === '-v') console.log('Initialising Style Maker', css);
        let head = document.head || document.getElementsByTagName('head')[0];
        let style = document.createElement('style');
        if(id) style.id = id
    
        style.type = 'text/css';
        if (style.styleSheet){
        // This is required for IE8 and below.
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
         }
        head.appendChild(style);
        if(mute === '--verbose' || mute === '-v') console.log('Style Added');
    } else {
        console.log('Please call StylerMaker with a valid cssText argument');
    }
   
}