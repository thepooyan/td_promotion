

//const defaultFallbackImage = '/content/images/image-not-found.jpg';

////function setFallbackImage(element, customFallback, defaultFallback) {
////    const fallbackImage = new Image();
////    fallbackImage.onload = function () {
////        if (element.tagName === 'IMG') {
////            element.src = this.src;
////        } else if (element.tagName === 'VIDEO') {
////            element.poster = this.src;
////        }
////    };
////    fallbackImage.onerror = function () {
////        element.onerror = null;
////        if (element.tagName === 'IMG') {
////            element.src = defaultFallback;
////        } else if (element.tagName === 'VIDEO') {
////            element.poster = defaultFallback;
////        }
////    };
////    fallbackImage.src = customFallback;
////}

////document.addEventListener("DOMContentLoaded", () => {
////    document.querySelectorAll('img:not([aria-label^="enamad"]), video').forEach(element => {
////        const customFallback = element.getAttribute('data-fallbackimage') || defaultFallbackImage;
////        const defaultFallback = defaultFallbackImage;

////        if (element.tagName === 'IMG') {
////            element.onerror = function () {
////                setFallbackImage(element, customFallback, defaultFallback);
////            };
////        } else if (element.tagName === 'VIDEO') {
////            const img = new Image();
////            img.onerror = function () {
////                setFallbackImage(element, customFallback, defaultFallback);
////            };
////            img.src = element.poster;
////        }
////    });
////});


//function setFallbackImage(element, customFallback, defaultFallback) {
//    const fallbackImage = new Image();
//    fallbackImage.onload = function () {
//        if (element.tagName === 'IMG') {
//            element.src = this.src;
//        } else if (element.tagName === 'VIDEO') {
//            element.poster = this.src;
//        }
//    };
//    fallbackImage.onerror = function () {
//        if (element.tagName === 'IMG') {
//            element.src = defaultFallback;
//        } else if (element.tagName === 'VIDEO') {
//            element.poster = defaultFallback;
//        }
//    };

//    fallbackImage.src = customFallback;
//}
//function checkImageLoad(element) {
//    if (element.tagName === 'IMG') {
//        const img = new Image();
//        img.onload = function () {
//            if (!element.complete || element.naturalWidth === 0) {
//                const customFallback = element.getAttribute('data-fallbackimage') || defaultFallbackImage;
//                setFallbackImage(element, customFallback, defaultFallbackImage);
//            }
//        };
//        img.onerror = function () {
//            const customFallback = element.getAttribute('data-fallbackimage') || defaultFallbackImage;
//            setFallbackImage(element, customFallback, defaultFallbackImage);
//        };
//        img.src = element.src;
//    } else if (element.tagName === 'VIDEO') {
//        const poster = element.poster;
//        if (!poster) return;
//        const img = new Image();
//        img.onload = function () {
//            if (!element.complete || element.videoWidth === 0) {
//                const customFallback = element.getAttribute('data-fallbackimage') || defaultFallbackImage;
//                setFallbackImage(element, customFallback, defaultFallbackImage);
//            }
//        };
//        img.onerror = function () {
//            const customFallback = element.getAttribute('data-fallbackimage') || defaultFallbackImage;
//            setFallbackImage(element, customFallback, defaultFallbackImage);
//        };
//        try {
//            if (poster && poster != "")
//                img.src = element.poster;
//        } catch (e) { }
//    }
//}


//document.addEventListener('DOMContentLoaded', () => {

//    const observer = new IntersectionObserver((entries, observer) => {
//        entries.forEach(entry => {
//            if (entry.isIntersecting) {
//                const element = entry.target;
//                checkImageLoad(element);
//                observer.unobserve(element);
//            }
//        });
//    });

//    document.querySelectorAll('img:not([aria-label^="enamad"]), video').forEach(element => {
//        observer.observe(element);
//    });

//});