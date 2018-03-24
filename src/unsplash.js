var attrModifiedUrl = 'data-modified-url',
    lockCalls = false,
    imageGridDlButton = '._12slh a:not([' + attrModifiedUrl + '="1"])',
    imageSingleDlButton = '._3-6v7 div:last-child a:not([' + attrModifiedUrl + '="1"])';

function replaceImageGridUrls(elems) {
    [].forEach.call(elems, function (el) {
        var compressedUrl = el.getAttribute('href').replace('?force=true', '');

        el.setAttribute('href', compressedUrl);
        el.setAttribute(attrModifiedUrl, '1');
        el.innerHTML = 'View';
        el.setAttribute('style', 'margin-right: 10px');

        addHQUrlButton(el);
    });
}

function replaceImageSingleUrl(el) {
    var compressedUrl = el.getAttribute('href').replace('?force=true', '');

    el.setAttribute('href', compressedUrl);
    el.setAttribute(attrModifiedUrl, '1');
    el.innerHTML = 'View';
    el.parentNode.setAttribute('style', 'width: 104px !important');

    addHQUrlButton(el);
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
            hqLink.innerHTML = 'View HQ';

            buttonContainer.appendChild(hqButton);
        }
    };
    http.send();
}

function disableSayThanksMessage() {
    var styleSheet = window.document.styleSheets[0];
    styleSheet.insertRule('._3rh8J { display: none; }', styleSheet.cssRules.length);
}

document.addEventListener('DOMNodeInserted', function() {
    if (!lockCalls) {
        lockCalls = true;
        setTimeout(function() {
            var imageGridElems = document.querySelectorAll(imageGridDlButton),
                imageSingleElem = document.querySelector(imageSingleDlButton);

            if (imageGridElems.length > 0) replaceImageGridUrls(imageGridElems);
            if (imageSingleElem)replaceImageSingleUrl(imageSingleElem);

            lockCalls = false;
        }, 60);
    }
});

disableSayThanksMessage();
