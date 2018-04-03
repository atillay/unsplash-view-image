var settings = {
    attrModified: 'data-modified',
    imageGridDlButton: '._12slh a:not([data-modified="1"])',
    imageSingleDlButton: '._3-6v7 div:last-child a:not([data-modified="1"])',
    disableThanksMessage: true,
    addSDUrl: true,
    addHDUrl: true,
    sdSVG: '<svg style="fill:{{color}}; width: 19px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 185.86 100.26"><title>sd</title><path d="M38.29,127.51c.86,7,8.31,11.67,17.14,11.67,9.43,0,16-4.28,16-10.68,0-4.74-3.36-7.45-12.59-10.28l-10.35-3.1c-14.57-4.35-22.87-13.78-22.87-26.63,0-18.06,16.74-31.25,39.48-31.25,22.42,0,37.51,12.4,37.64,30.26H80.42c-.6-6.92-7.19-12-16.15-12-8,0-14.31,4.29-14.31,10.15,0,4.68,3.23,8.18,11.41,10.62l10.41,3c16.35,4.81,23.67,12.66,23.67,25.91,0,19.51-16.62,32.29-41.66,32.29-22.68,0-38.11-11.33-38.57-30Z" transform="translate(-15.22 -57.24)"/><path d="M163.44,59.81c23.07,0,37.64,13.91,37.64,37.58,0,33.35-20.37,57.54-50,57.54H105.76l20.17-95.12Zm-29.13,75.74h13.84c16.34,0,28.08-13.77,28.08-35.33,0-12.79-7-21-19.12-21H146.17Z" transform="translate(-15.22 -57.24)"/></svg>',
    hdSVG: '<svg style="fill:{{color}}; width: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 202.73 95.12"><title>hd</title><path d="M68.29,155,76.4,116.6H38.56L30.39,155H6.26L26.5,59.85H50.69L42.78,97.16H80.62l8-37.31h24.19L92.55,155Z" transform="translate(-6.26 -59.85)"/><path d="M171.35,59.85c23.07,0,37.64,13.91,37.64,37.57,0,33.36-20.37,57.55-50,57.55H113.67l20.18-95.12Zm-29.13,75.74h13.84c16.35,0,28.08-13.78,28.08-35.33,0-12.79-7-21-19.11-21H154.08Z" transform="translate(-6.26 -59.85)"/></svg>'
};

function addSDUrlButton(link, svgColor) {
    var buttonContainer = link.parentNode.parentNode,
        sdButton = link.parentNode.cloneNode(true),
        sdUrl = link.getAttribute('href').replace('?force=true', ''),
        sdLink = sdButton.querySelector('a');

    sdLink.setAttribute('href', sdUrl);
    sdLink.innerHTML = settings.sdSVG.replace('{{color}}', svgColor);
    sdButton.setAttribute('style', 'width: auto !important; margin-left: 0 !important; padding-left: 4px !important;');

    buttonContainer.appendChild(sdButton);
}

function addHDUrlButton(link, svgColor) {
    var http = new XMLHttpRequest(),
        buttonContainer = link.parentNode.parentNode,
        hdButton = link.parentNode.cloneNode(true);

    http.open('HEAD', link.getAttribute('href'));
    http.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            var hdUrl = this.responseURL.substring(0, this.responseURL.indexOf('?')),
                hdLink = hdButton.querySelector('a');

            hdLink.setAttribute('href', hdUrl);
            hdLink.innerHTML = settings.hdSVG.replace('{{color}}', svgColor);
            hdButton.setAttribute('style', 'width: auto !important; margin-left: 0 !important; padding-left: 4px !important;');

            buttonContainer.appendChild(hdButton);
        }
    };
    http.send();
}

function addUrlButtons(el, svgColor) {
    el.setAttribute(settings.attrModified, '1');
    if (settings.addSDUrl) addSDUrlButton(el, svgColor);
    if (settings.addHDUrl) addHDUrlButton(el, svgColor);
}

var lockCalls = false;
document.addEventListener('DOMNodeInserted', function() {
    if (!lockCalls) {
        lockCalls = true;
        setTimeout(function() {
            var imageGridElems = document.querySelectorAll(settings.imageGridDlButton),
                imageSingleElem = document.querySelector(settings.imageSingleDlButton);

            if (imageGridElems.length > 0) {
                [].forEach.call(imageGridElems, function (el) {
                    addUrlButtons(el, '#777');
                });
            }

            if (imageSingleElem) addUrlButtons(imageSingleElem, '#fff');

            lockCalls = false;
        }, 60);
    }
});

if (settings.disableThanksMessage){
    var styleSheet = window.document.styleSheets[0];
    styleSheet.insertRule('._3rh8J { display: none; }', styleSheet.cssRules.length);
}
