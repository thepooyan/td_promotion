"use strict";

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var _slicedToArray = (function () {
    function sliceIterator(arr, i) {
        var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;_e = err;
        } finally {
            try {
                if (!_n && _i["return"]) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }return _arr;m;
    }return function (arr, i) {
        if (Array.isArray(arr)) {
            return arr;
        } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
        } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
    };
})();

$(function () {
    //* Res menu handler
    function openResMenu() {
        document.getElementById("resMenu").style.width = "320px";
        dc.query('#resMenu + .overlay').classList.add('active');
    }
    function closeResMenu() {
        document.getElementById("resMenu").style.width = "0";
        dc.query('#resMenu + .overlay').classList.remove('active');
    }
    document.getElementById("resOpen").addEventListener("click", openResMenu);
    document.getElementById("resClose").addEventListener("click", closeResMenu);
    dc.query('#resMenu + .overlay').addEventListener('click', closeResMenu);

    //? res menu course handler
    var courseL1 = document.getElementsByClassName("courseSelector");

    for (var i = 0; i < courseL1.length; i++) {
        courseL1[i].addEventListener("click", function () {
            document.getElementById(this.dataset.linkto).classList.remove("noDisplay");
            document.getElementsByClassName("OriginContent")[0].classList.add("out");
            document.getElementsByClassName("crossContent")[0].classList.add("in");
        });
    }

    document.getElementById("backToRes").addEventListener("click", function () {
        var courseL2 = dc.query(".crossContent ul:not(.noDisplay)");
        courseL2.classList.add("noDisplay");
        document.getElementsByClassName("OriginContent")[0].classList.remove("out");
        document.getElementsByClassName("crossContent")[0].classList.remove("in");
    });

    //getUp
    var getUp = dc.id("getUp");
    if (getUp) {
        getUp.addEventListener('click', function () {
            window.scrollTo(0, 0);
        });
        var checkScroll = function checkScroll() {
            if (window.scrollY > window.innerHeight) getUp.classList.add("active");else getUp.classList.remove("active");
        };

        window.addEventListener("scroll", checkScroll);
    }

    //lazy load pics
    function getOffsetTop(element) {
        return element ? element.offsetTop + getOffsetTop(element.offsetParent) : 0;
    }
    function isVisible(query) {
        var expand = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        var elements = dc.queries(query);

        var res = Object.values(elements).find(function (item) {
            return $(window).scrollTop() + $(window).height() > getOffsetTop(item) - expand && $(window).scrollTop() < getOffsetTop(item) + item.clientHeight + expand;
        });
        if (res) {
            if (res.nodeName == 'SOURCE') return;
            return true;
        } else return false;
    }
    function doSmIfCompIsSeen(comp, callback) {
        window.addEventListener('scroll', compLoader);
        setTimeout(compLoader, 900);

        function compLoader() {
            if (isVisible(comp, 400)) {
                callback();
                window.removeEventListener('scroll', compLoader);
            }
        }
    }

    window.isVisible = isVisible;

    //list and grid veiw handler
    function showList(e) {
        var $gridCont = $(".grid-container");
        e.preventDefault();
        $gridCont.hasClass("list-view");
        $gridCont.addClass("list-view");
    }
    function gridList(e) {
        var $gridCont = $(".grid-container");
        e.preventDefault();
        $gridCont.removeClass("list-view");
    }

    $(document).on("click", ".btn-grid", gridList);
    $(document).on("click", ".btn-list", showList);

    //ATTENTION Initiate counter
    dc.queries('.attentionBanner:not(.deadline)').forEach(function (item) {
        setAttentionDate(item.dataset.date);
    });
    function setAttentionDate(date) {
        var getAttentionRemTime = setCounterDate(date);
        if (getAttentionRemTime().days + 1 <= 0) {
            dc.queries(".attentionBanner[data-date='" + date + "']").forEach(function (item) {
                item.classList.add('done');
            });
        } else {
            dc.queries(".attentionBanner[data-date='" + date + "'] .text span").forEach(function (item) {
                item.innerHTML = getAttentionRemTime().days + 1;
            });
        }
    }

    //ATTENTION close button
    dc.queries('.attentionBanner i').forEach(function (item) {
        item.onclick = function (e) {
            e.preventDefault();
            item.parentElement.classList.add('done');
        };
    });

    //copyable
    function clipboardFallback(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        document.execCommand('copy');

        document.body.removeChild(textArea);
    }
    function clipboard(text) {
        if (!navigator.clipboard) {
            clipboardFallback(text);
            return;
        }
        navigator.clipboard.writeText(text);
    }
    window.clipboard = clipboard;
    dc.queries('.copyable').forEach(function (item) {
        item.onclick = function () {
            var copyText = item.dataset.copy;

            clipboard(copyText);
            dc.queries('.copied').forEach(function (i) {
                i.classList.remove('copied');
            });
            item.classList.add('copied');
            setTimeout(function () {
                item.classList.remove('copied');
            }, 3000);
        };
    });

    //src based changable image
    document.querySelectorAll('[data-mobileSrc]').forEach(function (item) {
        var mobileWidth = parseInt(item.dataset.mobilewidth) || 520;
        var isMobile = window.innerWidth < mobileWidth;

        if (isMobile) {
            item.isMobile = true;
            switchSrc(item);
            window.addEventListener('resize', screenCheck);
        } else {
            item.setAttribute('data-src', item.dataset.screensrc);
            window.addEventListener('resize', mobileCheck);
        }
        function switchSrc(ele) {
            if (ele.isMobile) {
                item.setAttribute('data-src', item.dataset.mobilesrc);
            } else {
                item.setAttribute('data-src', item.dataset.screensrc);
            }
        }
        function mobileCheck() {
            if (window.innerWidth < mobileWidth) {
                item.isMobile = true;
                switchSrc(item);
                window.removeEventListener('resize', mobileCheck);
                window.addEventListener('resize', screenCheck);
            }
        }
        function screenCheck() {
            if (window.innerWidth >= mobileWidth) {
                item.isMobile = false;
                switchSrc(item);
                window.removeEventListener('resize', screenCheck);
                window.addEventListener('resize', mobileCheck);
            }
        }
    });

    //photoViewer
    function initPhotoViewer() {
        var className = arguments.length <= 0 || arguments[0] === undefined ? 'photoVeiwer' : arguments[0];

        var photoVeiwer = dc.queries("." + className);
        if (photoVeiwer.length >= 1) {
            photoVeiwer.forEach(function (PV) {
                var images = PV.querySelectorAll('img');
                images.forEach(function (img) {
                    img.onclick = function () {
                        callModal.photoVeiwer(images, img);
                    };
                });
            });
        }
    }
    initPhotoViewer();

    //open images on click
    var targetImages = dc.queries('.td-content:not(.no_image_zoom) img:not(.no_image_zoom), .journal:not(.no_image_zoom) img:not(.no_image_zoom), .courseDetail:not(.no_image_zoom) img:not(.no_image_zoom) , section[id^="headline"]:not(.no_image_zoom) img:not(.no_image_zoom)');
    targetImages.forEach(function (img) {
        img.onclick = function (_) {
            img.classList.add('active');
            callModal.image(img.src, { zoom: true });
        };
        img.onerror = function () {
            img.onclick = null;
            img.onerror = null;
            img.classList.add('unclickable');
        };
    });

    //copy code inside pre tag
    var allPre = document.querySelectorAll('.td-content pre:not(.exception)');
    if (allPre.length) {
        allPre.forEach(function (pre) {
            var button = document.createElement('button');
            var code = pre.innerText;
            button.innerText = 'کپی';
            button.onclick = function (_) {
                if (button.classList.contains('copied')) return;

                clipboard(code);
                button.classList.add('copied');
                button.innerText = 'کپی شد!';
                setTimeout(function () {
                    button.innerText = 'کپی';
                    button.classList.remove('copied');
                }, 5000);
            };

            pre.appendChild(button);
        });
    }

    setTimeout(function () {
        respondToVisibility("[data-src]", function (element) {
            $(element).attr("src", $(element).data("src"));
            $(element).removeAttr("data-src");
        });
        respondToVisibility("[data-poster]", function (element) {
            $(element).attr("poster", $(element).data("poster"));
            $(element).removeAttr("data-poster");
        });
        respondToVisibility("[data-bg]", function (element) {
            var backGroundUrlString = $(element).data('bg');
            var backGroundUrl = '';

            if (backGroundUrlString.includes(',')) {
                (function () {
                    var backGroundUrlArray = backGroundUrlString.split(',');
                    backGroundUrlArray.forEach(function (item, index, arr) {
                        backGroundUrl += "url(" + item + ")" + (index === backGroundUrlArray.length - 1 ? '' : ',');
                    });
                })();
            } else {
                backGroundUrl = "url(" + backGroundUrlString + ")";
            }
            $(element).css('background-image', backGroundUrl);
            $(element).removeAttr("data-bg");
        });
    }, 1000);
    respondToVisibility(".lazyLoad", function (element) {
        $(element).addClass('backgroundLoaded');
    });

    $('.roadCats > span').on('click', function () {
        $('.tabSection').slideUp(0);
        var target = $(this).data('cat');
        $("" + target).slideDown(500);
    });

    //new collapsible part and box codes
    $('.collapsePart').each(function (index) {
        if ($(this).data('collapsestatus') === 'open') {
            $(this).next().slideDown();
            $(this).addClass('active');
        } else {
            $(this).next().slideToggle(300);
        }
    });
    $('.collapsePart').on('click', function () {
        $(this).toggleClass('active');
        $(this).next().slideToggle(300);
    });

    var mobileRegisterBtn = document.querySelector('#mobileRegisterBtn');
    var courseInfo = document.querySelector('.courseInfo');

    function chnagePositionOfGetUp() {
        if (window.innerWidth < 698) {
            var mobileRegisterBtnHeight = mobileRegisterBtn.clientHeight;
            document.querySelector('#getUp').style.bottom = mobileRegisterBtnHeight + 10 + "px";
        } else {
            document.querySelector('#getUp').style.bottom = "var(--offset)";
        }
    }
    window.addEventListener('resize', function () {
        if (mobileRegisterBtn) {
            chnagePositionOfGetUp();
        }
    });
    if (courseInfo) {
        window.addEventListener('scroll', function () {
            isInViewport(courseInfo, function (targetEl) {
                mobileRegisterBtn.classList.add('disable');
            }, function (targetEl) {
                chnagePositionOfGetUp();
                mobileRegisterBtn.classList.remove('disable');
            });
        });
    }

    //course info collapse code
    $('[data-classid]').on('click', function () {
        var myClassID = $(this).data('classid');

        $("[data-myclassid='" + myClassID + "']").slideToggle();
    });

    setTimeout(function () {
        if (document.querySelector('#weblog-slider')) {
            var articleSlider = new Swiper("#weblog-slider", {

                speed: 1000,
                slidesPerView: 5,
                spaceBetween: 30,
                slidesPerGroup: 1,
                loop: false,
                loopFillGroupWithBlank: true,

                navigation: {
                    nextEl: "#weblog-slider .swiper-button-next",
                    prevEl: "#weblog-slider .swiper-button-prev"
                },
                breakpoints: {
                    1300: {
                        freemode: true,
                        slidesPerView: 4,
                        spaceBetween: 20,
                        slidesPerGroup: 1
                    },
                    1200: {
                        freemode: true,
                        slidesPerView: 3.5,
                        spaceBetween: 20,
                        slidesPerGroup: 1
                    },
                    980: {
                        freemode: true,
                        slidesPerView: 3,
                        spaceBetween: 20,
                        slidesPerGroup: 1
                    },
                    840: {
                        freemode: true,
                        slidesPerView: 2.5,
                        spaceBetween: 20,
                        slidesPerGroup: 1
                    },
                    680: {
                        freemode: true,
                        slidesPerView: 2,
                        spaceBetween: 20,
                        slidesPerGroup: 1
                    },
                    550: {
                        freemode: true,
                        slidesPerView: 1.6,
                        spaceBetween: 20,
                        slidesPerGroup: 1
                    },
                    320: {
                        freemode: true,
                        slidesPerView: 1.3,
                        spaceBetween: 20,
                        slidesPerGroup: 1
                    }
                }

            });
        }
    }, 1000);
});

//Create CSS
function createCss(id) {
    if (!document.getElementById(id)) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = id;
        link.media = 'all';
        head.appendChild(link);
    }
}

//cart

function cartItems() {
    var basketItem = document.querySelectorAll(".body-basket-items");
    var headBasketItem = document.querySelector(".heade-basket-items");
    var coursePrice = document.querySelectorAll(".coursePrice");
    var modalSuccess = document.querySelector(".modalSuccess");
    var iconModalSuccess = document.querySelector(".modalSuccess g");
    var shoppingCart = document.querySelector(".shoppingCart");
    var emptyShoppingCart = document.querySelector(".emptyShoppingCart");
    var hideCartItem = document.getElementsByClassName("hide--cart-item");
    var removedPrice = [];

    basketItem.forEach(function (item) {
        var countP = 0;
        item.querySelector(".body-basket-items");
        item.querySelector(".delete").addEventListener("click", function (e) {

            e.preventDefault();

            // --start/modal success

            //modalSuccess.classList.add("show");
            //iconModalSuccess.classList.add("active");
            //setTimeout(() => {
            //    iconModalSuccess.classList.remove("active");
            //    modalSuccess.classList.remove("show");
            //}, 1000);

            // --end/modal success

            //let coursePrice = parseInt(item.querySelector(".coursePrice").innerText);
            //let mainPrice = parseInt(document.getElementById("mainPrice").innerText);
            //let totalPrice = parseInt(document.getElementById("totalPrice").innerText);

            //document.getElementById("totalPrice").innerText = totalPrice - coursePrice;
            //document.getElementById("mainPrice").innerText = mainPrice - coursePrice;

            //if (mainPrice - coursePrice < 1) {
            //    document.getElementById("mainPrice").innerText = "0";
            //}

            item.remove();
            function isCartEmpty() {

                return document.querySelectorAll(".body-basket-items").length === 0;
            }

            //100/100

            if (isCartEmpty()) {

                /*    shoppingCart.style.display = "none";*/
                document.querySelectorAll(".hide--cart-item").forEach(function (i) {
                    i.style.display = "none";
                });

                setTimeout(function () {
                    emptyShoppingCart.style.display = "block";
                }, 1000);
            } else {

                shoppingCart.style.display = "grid";
                emptyShoppingCart.style.display = "none";
            }
        });
    });
}

cartItems();
//regulation accept input
//const btnPayment = document.getElementById('btn-payment');
//document.getElementById('regulations').onclick = _ => {
//    btnPayment.disabled = !_.target.checked;
//}

var courseNav = document.querySelectorAll(".CourseNav");

courseNav.forEach(function (item) {

    if (!item.querySelector(" li > ul")) {
        item.classList.add("hide");
    }
});

var InnerNav = document.querySelectorAll(".InnerNav");
InnerNav.forEach(function (item) {

    if (!item.querySelector(" li > ul")) {
        item.classList.add("hide");
    }
});

var breadcrumbItemLastChild = document.querySelector(".breadcrumb-item:last-child a");
if (breadcrumbItemLastChild) {

    breadcrumbItemLastChild.onclick = function (e) {

        e.preventDefault();
    };
}

//get up button code

//price separator function
function formatPrice(price) {
    // Check if the input is a valid number
    if (isNaN(price)) {
        return "Invalid input";
    }

    // Convert the price to a string and split it into integer and decimal parts

    var _price$toString$split = price.toString().split(".");

    var _price$toString$split2 = _slicedToArray(_price$toString$split, 2);

    var integerPart = _price$toString$split2[0];
    var decimalPart = _price$toString$split2[1];

    // Add commas as separators for the integer part
    var formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the formatted integer part with the decimal part
    var formattedPrice = decimalPart ? formattedIntegerPart + "." + decimalPart : formattedIntegerPart;

    return formattedPrice;
}

//get all prices and add separator
var priceElements = dc.queries('.separate-price');
if (priceElements.length > 0) {
    priceElements.forEach(function (item) {
        var priceNum = parseInt(item.textContent.replaceAll(',', ''));
        item.textContent = formatPrice(priceNum);
    });
}

//scroll to id
var AnchorElements = dc.queries('[data-scrolltoid]');
if (AnchorElements.length > 0) {
    AnchorElements.forEach(function (item) {
        item.addEventListener('click', function () {
            var query = this.dataset.scrolltoid;
            var elementToScroll = dc.id(query);
            if (elementToScroll) {
                var targetPosition = window.scrollY + elementToScroll.getBoundingClientRect().top - 100;
                window.scrollTo(0, targetPosition);
            }
        });
    });
}

//close login drop down when click out of box
window.addEventListener('click', function (e) {
    var LoginButton = document.querySelector('.left-header [data-onclick]');
    var targetElement = e.target;
    var targetElementParent = targetElement.parentElement;
    if (LoginButton) {
        if (!targetElement.contains(LoginButton) && !targetElementParent.contains(LoginButton)) {
            LoginButton.classList.remove('active');
        }
    }
});

//convert html codes

function escapeHtml(html) {
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
var htmlCodeElements = document.querySelectorAll('.htmlCodes');
if (htmlCodeElements && htmlCodeElements.length > 0) {
    htmlCodeElements.forEach(function (item) {
        var htmlCode = item.innerHTML;
        var escapedHtmlCode = escapeHtml(htmlCode);
        item.innerHTML = escapedHtmlCode;
    });
}

var collapse = (function () {
    function collapse(section) {
        _classCallCheck(this, collapse);

        this.section = section;
        this.title = this.section.querySelector('.title');
        this.content = this.section.querySelector('.content');
        this.eventSetter();
        this.contentHeightSetter();
    }

    _createClass(collapse, [{
        key: "eventSetter",
        value: function eventSetter() {
            this.title.addEventListener('click', this.titleClickHandler.bind(this));
        }
    }, {
        key: "titleClickHandler",
        value: function titleClickHandler(e) {
            if (this.section.classList.contains('active')) {
                this.section.classList.remove('active');
                e.currentTarget.classList.remove('active');
            } else {
                this.section.classList.add('active');
                e.currentTarget.classList.add('active');
            }
        }
    }, {
        key: "contentHeightSetter",
        value: function contentHeightSetter() {
            var height = this.content.scrollHeight;
            this.content.style.setProperty('--height', height + "px");
        }
    }]);

    return collapse;
})();

var collapsibleSections = document.querySelectorAll('.collapsibleSection');
var collapsibleSectionsArray = [];
collapsibleSections.forEach(function (item) {
    collapsibleSectionsArray.push(new collapse(item));
});

setTimeout(function () {
    var collapsibleContentsArray = document.querySelectorAll('.collapsible-content');
    if (collapsibleContentsArray && collapsibleContentsArray.length >= 1) {
        collapsibleContentsArray.forEach(function (collapsibleContent) {
            collapsibleContent.style.setProperty('--scrollHeight', collapsibleContent.scrollHeight + "px");
        });
    }
    var heightAnimationArray = document.querySelectorAll('.heightAnimation');
    if (heightAnimationArray && heightAnimationArray.length >= 1) {
        heightAnimationArray.forEach(function (heightAnimation) {
            heightAnimation.style.setProperty('--maxHeight', heightAnimation.scrollHeight + "px");
        });
    }
}, 1000);
//new courses table of content codes
var activeMyCollapsibleItem = function activeMyCollapsibleItem(btn) {
    var MyCollapsibleItem = btn.closest('.collapsible-item');
    if (MyCollapsibleItem) {
        var value = MyCollapsibleItem.classList.contains('active');
        if (value) {
            MyCollapsibleItem.classList.remove('active');
        } else {
            MyCollapsibleItem.classList.add('active');
        }
    }
};
var collapsibleItemBtnsArray = document.querySelectorAll('.collapse-item-btn');
if (collapsibleItemBtnsArray && collapsibleItemBtnsArray.length >= 1) {

    collapsibleItemBtnsArray.forEach(function (collapsibleItemBtn) {
        collapsibleItemBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            activeMyCollapsibleItem(e.currentTarget);
        });
    });
}

var articleVideoBoxVideos = document.querySelectorAll('.video-part video');
if (articleVideoBoxVideos && articleVideoBoxVideos.length >= 1) {
    articleVideoBoxVideos.forEach(function (video) {
        video.addEventListener('click', function (e) {
            video.play();
        });
    });
}

//active single packages in courses
var activeSinglePackages = setInterval(function () {
    var countOfPackagesInCourse = document.querySelectorAll('.packageInCourse');
    if (countOfPackagesInCourse && countOfPackagesInCourse.length === 1) {
        document.querySelector('.packageInCourse .p-collapsibleContent').style.display = 'flex';

        var countOfSections = document.querySelectorAll('.packageInCourse .p-collapsibleSection');
        if (countOfSections && countOfSections.length === 1) {
            document.querySelector('.packageInCourse .p-collapsibleSection > .content').style.display = 'flex';
            document.querySelector('.packageInCourse .p-collapsibleSection > .title').classList.add('active');
            clearInterval(activeSinglePackages);
        }
    }
}, 1000);

function runSampleVideosOf(contentDiv) {
    var sampleVideos = $(contentDiv).find('.sample-video');
    $(sampleVideos).each(function () {
        var tvVideo = $(this).find('video')[0];
        tvVideo.controls = false;
        function playVideo(e) {
            e.stopPropagation();
            this.classList.add('play');
            tvVideo.play();
            tvVideo.controls = true;
            this.removeEventListener('click', playVideo);
        }
        $(this).on('click', playVideo);
        $(tvVideo).on('ended', function () {
            $(this).removeClass('play');
            $(this).addEventListener('click', playVideo);
            this.controls = false;
        });
    });
}

runSampleVideosOf($('.seoLandingPage')[0]);

