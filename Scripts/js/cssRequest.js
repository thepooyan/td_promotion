resizeHandler();

function resizeHandler() {
    if (window.innerWidth >= 980 ) createCss('/Content/MediaCss/screen-media.min.css');
    if (window.innerWidth < 980 && window.innerWidth >= 480) createCss('/Content/MediaCss/tablet-media.min.css');
    if (window.innerWidth <= 480) createCss('/Content/MediaCss/mobile-media.min.css');
}
function createCss(id) {
    if (!document.getElementById(id)) {
        let head = document.getElementsByTagName('head')[0];
        let link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = id;
        link.media = 'all';
        head.appendChild(link);
    }
}
window.onresize = resizeHandler;