var settings = {
    attrModified: 'data-modified',
    imageGridDlButton: '._12slh a:not([data-modified="1"])',
    imageSingleDlButton: '._3-6v7 div:last-child a:not([data-modified="1"])',
    disableThanksMessage: true,
    addCPUrl: true,
    addHQUrl: true
};

function addCPUrlButton(link) {
    var buttonContainer = link.parentNode.parentNode,
        cpButton = link.parentNode.cloneNode(true),
        cpUrl = link.getAttribute('href').replace('?force=true', ''),
        cpLink = cpButton.querySelector('a');

    cpLink.setAttribute('href', cpUrl);
    cpLink.innerHTML = 'OPTI';
    cpButton.setAttribute('style', 'width: auto !important; margin-left: 0 !important; padding-left: 4px !important;');

    buttonContainer.appendChild(cpButton);
}

function addHQUrlButton(link) {
    var http = new XMLHttpRequest(),
        buttonContainer = link.parentNode.parentNode,
        hqButton = link.parentNode.cloneNode(true);

    http.open('HEAD', link.getAttribute('href'));
    http.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            var hqUrl = this.responseURL.substring(0, this.responseURL.indexOf('?')),
                hqLink = hqButton.querySelector('a');

            hqLink.setAttribute('href', hqUrl);
            hqLink.innerHTML = 'HQ';
            hqButton.setAttribute('style', 'width: auto !important; margin-left: 0 !important; padding-left: 4px !important;');

            buttonContainer.appendChild(hqButton);
        }
    };
    http.send();
}

function addUrlButtons(el) {
    el.setAttribute(settings.attrModified, '1');
    if (settings.addCPUrl) addCPUrlButton(el);
    if (settings.addHQUrl) addHQUrlButton(el);
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
                    addUrlButtons(el);
                });
            }

            if (imageSingleElem) addUrlButtons(imageSingleElem);

            lockCalls = false;
        }, 60);
    }
});

if (settings.disableThanksMessage){
    var styleSheet = window.document.styleSheets[0];
    styleSheet.insertRule('._3rh8J { display: none; }', styleSheet.cssRules.length);
}
