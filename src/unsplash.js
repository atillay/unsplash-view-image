var imageGridDlButton = '._12slh a';
var imageSingleDlButton = '._3-6v7 div:last-child a';

var imageGridLoaded = setInterval(function() {
    if (document.querySelectorAll(imageGridDlButton).length > 0) {
        clearInterval(imageGridLoaded);
        replaceImageGridUrls();
    }
}, 120);

var imageSingleLoaded = setInterval(function() {
    if (document.querySelectorAll(imageSingleDlButton).length > 0) {
        clearInterval(imageSingleLoaded);
        replaceImageSingleUrl();
    }
}, 120);

function replaceImageGridUrls() {
    [].forEach.call(
        document.querySelectorAll('._12slh a'),
        function (el) {
            var compressedUrl = el.getAttribute('href').replace('?force=true', '');
            el.setAttribute('href', compressedUrl);
            el.innerHTML = 'View';

            var buttonContainer = el.parentNode.parentNode;
            var button = el.parentNode.cloneNode(true);
            button.setAttribute('style', 'margin-left: 10px');

            getRawUrl(el, buttonContainer, button);
        }
    );
}

function replaceImageSingleUrl() {
    var el = document.querySelector(imageSingleDlButton);
    var compressedUrl = el.getAttribute('href').replace('?force=true', '');

    el.setAttribute('href', compressedUrl);
    el.innerHTML = 'View';
    el.parentNode.setAttribute('style', 'width: 104px !important');

    var buttonContainer = el.parentNode.parentNode;
    var button = el.parentNode.cloneNode(true);

    getRawUrl(el, buttonContainer, button);
}

function getRawUrl(image, buttonContainer, button) {
    var http = new XMLHttpRequest();
    http.open('HEAD', image.getAttribute('href'));
    http.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            var rawUrl = this.responseURL.substring(0, this.responseURL.indexOf('?'));

            var rawLink = button.querySelector('a');
            rawLink.setAttribute('href', rawUrl);
            rawLink.innerHTML = 'View RAW';

            buttonContainer.appendChild(button);
        }
    };
    http.send();
}