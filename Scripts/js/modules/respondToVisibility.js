//respond to visibility
'use strict';

function respondToVisibility(queryOrElement, callback) {
    var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var _ref$once = _ref.once;
    var once = _ref$once === undefined ? true : _ref$once;
    var _ref$offset = _ref.offset;
    var offset = _ref$offset === undefined ? 0 : _ref$offset;
    var _ref$root = _ref.root;
    var root = _ref$root === undefined ? null : _ref$root;

    switch (typeof queryOrElement) {
        case 'string':
            document.querySelectorAll(queryOrElement).forEach(function (ele) {
                return observeElement(ele);
            });
            break;
        case 'object':
            if (queryOrElement.nodeName) {
                observeElement(queryOrElement);
                break;
            }
            if (queryOrElement[0].nodeName) {
                queryOrElement.forEach(function (el) {
                    return observeElement(el);
                });
                break;
            }
        default:
            throw new Error('please pass an html element or a valid query string to "respondToVisibility" funtion');
    }

    function observeElement(element) {
        var options = {
            root: root,
            rootMargin: offset + 'px 0px'
        };

        var observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    callback(element);
                    once && observer.disconnect();
                }
            });
        }, options);

        observer.observe(element);
    }
}

function isInViewport(targetElement, viewCallback, outViewCallback) {
    var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                viewCallback(entry.target);
                observer.unobserve(entry.target); // Optional: Stop observing after it's in view
            } else {
                    outViewCallback(entry.target);
                }
        });
    }, { threshold: 0.1 });

    observer.observe(targetElement);
}

window.respondToVisibility = respondToVisibility;
window.isInViewport = isInViewport;

