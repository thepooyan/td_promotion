"use strict";

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

    //* Collapsible
    var coll = document.getElementsByClassName("collapsible");
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }

    //* Homeslider
    (function () {
        var sliderImages = dc.queries("#slider .images .img");
        var sliderTimeout = document.getElementById('slider').getAttribute('data-timeout');
        var sliderIndex = undefined;
        sliderImages.forEach(function (item, index) {
            if (item.classList.contains('active')) sliderIndex = index;
        });

        if (sliderImages.length == 1) {
            document.getElementById('slider').classList.add('single');
        }
        if (sliderImages.length == 0) {
            document.getElementById('slider').classList.add('none');
            return;
        }
        if (sliderIndex == undefined) noActive();

        for (var i = 0; i < sliderImages.length; i++) {
            var span = document.createElement("span");
            span.classList.add("dot" + i);
            if (i == sliderIndex) span.classList.add('active');
            dc.query("#slider .dots").appendChild(span);
        }
        var dots = dc.queries("#slider .dots span");

        var _loop = function (i) {
            dots[i].addEventListener('click', function () {
                sliderReset();
                sliderGoto(i);
            });
        };

        for (var i = 0; i < dots.length; i++) {
            _loop(i);
        }

        document.getElementById("sliderNext").addEventListener("click", function () {
            sliderNext();
            sliderReset();
        });
        document.getElementById("sliderPre").addEventListener("click", function () {
            sliderPrev();
            sliderReset();
        });

        function sliderNext() {
            sliderImages[sliderIndex].classList.remove("active");
            dots[sliderIndex].classList.remove('active');

            sliderIndex = sliderImages[++sliderIndex] ? sliderIndex++ : 0;

            sliderImages[sliderIndex].classList.add("active");
            dots[sliderIndex].classList.add('active');
            getNextSliderImage();
        }
        function sliderPrev() {
            sliderImages[sliderIndex].classList.remove("active");
            dots[sliderIndex].classList.remove('active');

            sliderIndex = sliderImages[--sliderIndex] ? sliderIndex-- : sliderImages.length - 1;

            sliderImages[sliderIndex].classList.add("active");
            dots[sliderIndex].classList.add('active');
            getThisSliderImage();
        }
        function sliderReset() {
            clearInterval(sliderInterval);
            sliderInterval = window.setInterval(function () {
                sliderNext();
            }, sliderTimeout);
        }
        function stopSlider() {
            clearInterval(sliderInterval);
        }
        window.stopSlider = stopSlider;

        function sliderGoto(index) {
            sliderImages[sliderIndex].classList.remove("active");
            dots[sliderIndex].classList.remove('active');
            sliderIndex = index;
            sliderImages[sliderIndex].classList.add("active");
            dots[sliderIndex].classList.add('active');
            getThisSliderImage(getNextSliderImage);
        }
        function noActive() {
            sliderIndex = 0;
            sliderImages[0].classList.add('active');
        }

        dc.queries('#slider .images .img .title').forEach(function (item) {
            if (item.innerHTML.length > 16) item.classList.add('long');
            if (item.innerHTML.length > 20) item.classList.add('tooLong');
        });
        if (sliderImages.length > 1) {
            var sliderInterval = setInterval(function () {
                sliderNext();
            }, sliderTimeout);
        }

        function getNextSliderImage() {
            var trg = sliderImages[sliderImages[sliderIndex + 1] ? sliderIndex + 1 : 0].querySelector('img');
            trg.setAttribute('src', trg.dataset.slidersrc);
        }
        getNextSliderImage();
        function getThisSliderImage(callback) {
            var activeImg = dc.query('.active [data-sliderSrc]');
            activeImg.setAttribute('src', activeImg.dataset.slidersrc);
            activeImg.onload = function () {
                callback();
            };
        }
    })();

    //-------   Scroll  Events  ---------------
    function getOffsetTop(element) {
        return element ? element.offsetTop + getOffsetTop(element.offsetParent) : 0;
    }
    function isVisible(query) {
        var expand = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        var elements = dc.queries(query);

        return Object.values(elements).find(function (item) {
            return $(window).scrollTop() + $(window).height() > getOffsetTop(item) - expand && $(window).scrollTop() < getOffsetTop(item) + item.clientHeight + expand;
        });
    }
    window.isVisible = isVisible;

    function loadCompOnScroll(query, controller, args, offset) {
        if (controller === undefined) controller = "Home/" + query.substring(1);
        return (function () {
            return new Promise(function (resolve) {

                respondToVisibility(query, function (item) {
                    $(item).load(controller, args, function () {
                        $(item).addClass('loaded');
                        resolve();
                    });
                }, { offset: offset });
            });
        })();
    }

    function newPromise() {
        var a = undefined,
            b = undefined;
        var promise = new Promise(function (resolve, reject) {
            a = resolve;
            b = reject;
        });
        promise.resolve = a;
        promise.reject = b;
        return promise;
    } //singular promise constructor

    var sliderScriptState = newPromise();
    var customerSpotted = newPromise();
    var sliderClassesSpotted = newPromise();

    Promise.all([customerSpotted, sliderScriptState]).then(startSliderCustomer);
    Promise.all([sliderClassesSpotted, sliderScriptState]).then(startSliderClasses);

    respondToVisibility('.lazyLoad', lazyLoadPics);
    respondToVisibility('.slider-classes', function () {
        dc.queries('.slider-classes').forEach(function (item) {
            item.classList.add('loaded');
        });
        loadStyle("/Content/swiper.min.css");
        loadScript("/Scripts/js/swiper-bundle.min.js");
        sliderClassesSpotted.resolve();
    });
    //lazy load components
    if (window.innerWidth > 600) {
        loadCompOnScroll.apply(undefined, ['#StatisticsRendered'].concat([,,], [200])).then(function () {
            respondToVisibility('.aboutUs', function () {
                $('[data-count].num').each(function () {
                    var $this = $(this),
                        countTo = $this.attr('data-count');
                    $({
                        countNum: $this.text()
                    }).animate({
                        countNum: countTo
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function step() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function complete() {
                            $this.text(this.countNum);
                            counterRun = true;
                            //alert('finished');
                        }

                    });
                });
            });
        });
    }
    loadCompOnScroll('#FStepRendered').then(lazyLoadPics);
    loadCompOnScroll('#CustomerRendered').then(function () {
        loadScript("/Scripts/js/swiper-bundle.min.js");
        lazyLoadPics();
        customerSpotted.resolve();
    });
    loadCompOnScroll('#footerPartial', 'Home/footer').then(lazyLoadPics);

    //* get up
    window.addEventListener('scroll', getUpCheck);
    function getUpCheck() {
        if ($(window).scrollTop() > 600) {
            $('.getUp').addClass('show');
        } else {
            $('.getUp').removeClass('show');
        }
    }

    //insta tall images
    window.addEventListener('scroll', checkInstaTallImages);
    function checkInstaTallImages() {
        if (isVisible('.bg-insta.HaveAnimation')) {
            window.removeEventListener('scroll', checkInstaTallImages);
            dc.queries('.card.instagram-post .instagram-post-img img').forEach(function (item) {
                if (item.height > 360) {
                    item.parentElement.classList.add('tallImage');
                }
            });
        }
    }
    //-------   Scroll  Events  ---------------

    //slider initiate
    function startSliderClasses() {
        //slider-classes
        var swiper = new Swiper(".slider-classes", {

            speed: 1000,
            slidesPerView: 5,
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: true,
            loopFillGroupWithBlank: true,

            navigation: {
                nextEl: ".slider-classes .swiper-button-next",
                prevEl: ".slider-classes .swiper-button-prev"
            },
            breakpoints: {
                1400: {
                    freemode: true,
                    slidesPerView: 4,
                    spaceBetween: 20,
                    slidesPerGroup: 1
                },
                1200: {
                    freemode: true,
                    slidesPerView: 3,
                    spaceBetween: 20,
                    slidesPerGroup: 1
                },
                980: {
                    freemode: true,
                    slidesPerView: 3,
                    spaceBetween: 20,
                    slidesPerGroup: 1
                },
                640: {
                    freemode: true,
                    slidesPerView: 2,
                    spaceBetween: 20,
                    slidesPerGroup: 1
                },
                450: {
                    freemode: true,
                    slidesPerView: 1,
                    spaceBetween: 20,
                    slidesPerGroup: 1
                },
                320: {
                    freemode: true,
                    slidesPerView: 1,
                    spaceBetween: 20,
                    slidesPerGroup: 1
                }
            }

        });
    }
    function startSliderCustomer() {
        //slider-customer
        var swiper = new Swiper(".slider-customer", {
            autoplay: {
                delay: 1000

            },
            speed: 1000,
            slidesPerView: 9,
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: true,
            loopFillGroupWithBlank: true,
            pagination: {
                el: ".slider-customer .swiper-pagination",
                clickable: true
            },
            navigation: {
                nextEl: ".slider-customer .swiper-button-next",
                prevEl: ".slider-customer .swiper-button-prev"
            },
            breakpoints: {
                1200: {
                    freemode: true,
                    slidesPerView: 9,
                    spaceBetween: 30,
                    slidesPerGroup: 1
                },
                980: {
                    freemode: true,
                    slidesPerView: 6,
                    spaceBetween: 30,
                    slidesPerGroup: 1
                },
                640: {
                    freemode: true,
                    slidesPerView: 4,
                    spaceBetween: 20,
                    slidesPerGroup: 1
                },
                450: {
                    freemode: true,
                    slidesPerView: 3,
                    spaceBetween: 20,
                    slidesPerGroup: 1
                },
                320: {
                    freemode: true,
                    slidesPerView: 2,
                    spaceBetween: 20,
                    slidesPerGroup: 1
                }
            }

        });
    }

    //lazy loads
    function loadStyle(style) {
        if (!document.getElementById(style)) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = style;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = style;
            link.media = 'all';
            head.appendChild(link);
        }
    }
    function loadScript(src) {
        if (!document.getElementById(src)) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.src = src;
            script.id = src;
            script.defer = 'defer';
            script.onload = sliderScriptState.resolve;

            head.appendChild(script);
        }
    }

    function lazyLoadPics() {
        $("[data-src]").each(function () {
            if (!$(this).attr('src')) {
                $(this).attr("src", $(this).data("src"));
            }
        });
        $('.lazyLoad').each(function () {
            if (!$(this).hasClass('backgroundLoaded')) $(this).addClass('backgroundLoaded');
        });
    }

    //load pics that are too close to the top
    $('#FStepRendered .lazyLoad').addClass('backgroundLoaded');
    $('.atnaHost.lazyLoad').addClass('backgroundLoaded');

    //ATTENTION Initiate counter
    dc.queries('.attentionBanner:not(.deadline)').forEach(function (item) {
        setAttentionDate(item.dataset.date);
    });
    function setAttentionDate(date) {
        var getAttentionRemTime = setCounterDate(date);
        if (getAttentionRemTime().days + 1 <= 0) {
            dc.query(".attentionBanner[data-date='" + date + "']").classList.add('done');
        } else {
            dc.query(".attentionBanner[data-date='" + date + "'] .text span").innerHTML = getAttentionRemTime().days + 1;
        }
    }

    //ATTENTION close button
    dc.queries('.attentionBanner i').forEach(function (item) {
        item.onclick = function (e) {
            e.preventDefault();
            item.parentElement.classList.add('done');
        };
    });

    //teacher video
    var teacherVideo = dc.query('#teacherVideoPlaceholder');
    if (teacherVideo.query('#teacherVideo')) setVideoEvents(teacherVideo);

    var homeVideo = dc.query('#homeVideoPlaceholder');
    if (homeVideo.query('.homeVideo')) setVideoEvents(homeVideo);

    //HomePage video (general functions)
    function setVideoEvents(section) {
        var dropDown = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        //section is the most outer container! (exm. #videoRendered)
        function loadVideoCate(cate, id, target) {
            //load video cate with id, into target
            $.get("/Home/VideoRendered/", { catid: cate, id: id }, function (data) {
                var modify = data.replace('moreVideos', 'moreVideos active').replace('videoTab', 'videoTab active');
                target.innerHTML = modify;
                setVideoEvents(section, target.id === "teacherVideoPlaceholder" ? true : false);
                refreshOnClicks();
                target.classList.remove('fade');
                setHeightProperties(section);
            });
        }

        //how many videos do we have?
        if (section.queries('[data-videoSrc]').length > 1) {
            section.queries('[data-videoSrc]').forEach(function (item) {
                console.log(item)
                item.closest('[data-onclick]').addEventListener('click', function () {
                    var video = section.query('.tv video');
                    console.log(item)
                    video.poster = item.src;
                    video.querySelector('source').src = item.dataset.videosrc;
                    video.load();
                });
            });
        }

        //how many categories do we have?
        if (section.query('.videoTab').children.length > 1) {
            section.query('.videoTab').classList.add('active');
            section.queries('.videoTab button').forEach(function (item) {
                item.addEventListener('click', function () {
                    section.query('.moreVideos').addEventListener('transitionend', function () {
                        loadVideoCate(item.dataset.category, item.dataset.id, section);
                    }, { once: true });
                    section.classList.add('fade');
                });
            });
        }

        //teacher video
        if (dropDown) {
            (function () {
                //techer video view button function

                var veiwTeacherVid = function veiwTeacherVid() {
                    dc.query('#teacherVideo .film').classList.toggle('play');
                    dc.query('#teacherVideo video').pause();
                };

                dc.query('#teacherVideo .film button').onclick = veiwTeacherVid; //veiw button
                dc.queries('#teacherVideo .moreVideos .item').forEach(function (item) {
                    item.onclick = function () {
                        if (!dc.query('#teacherVideo .film').classList.contains('play')) veiwTeacherVid();
                    };
                }); //veiw when clicked on one of videos

                //teacher video cataegory
                dc.queries('#teacherVideo .videoTab button').forEach(function (item) {
                    item.onclick = function (e) {
                        console.log(e)
                        dc.query('#teacherVideo .videoTab span').innerHTML = e.target.innerHTML;
                    };
                });
            })();
        }
    }

    //Counter initiate
    if (dc.id('counterSlider')) {
        (function () {
            var counterDate = dc.id('counterSlider').dataset.date;
            var getCounterRemTime = setCounterDate(counterDate);

            counterInterval = setInterval(function () {
                var placeHolders = dc.queries('#counterSlider .timer span');
                var remainingTime = getCounterRemTime();
                if (Object.values(remainingTime).every(function (i) {
                    return i <= 0;
                })) {
                    clearInterval(counterInterval);
                    dc.id('counterSlider').classList.add('done');
                    return;
                }
                placeHolders[0].innerHTML = remainingTime.seconds;
                placeHolders[1].innerHTML = remainingTime.minutes;
                placeHolders[2].innerHTML = remainingTime.hours;
                placeHolders[3].innerHTML = remainingTime.days;
            }, 1000);
        })();
    }

    //src based changable image
    document.querySelectorAll('[data-mobileSrc][data-mobileSrc]').forEach(function (item) {
        var mobileWidth = parseInt(item.dataset.mobilewidth) || 700;
        var isMobile = window.innerWidth < mobileWidth;

        if (isMobile) {
            item.isMobile = true;
            switchSrc(item);
            window.addEventListener('resize', screenCheck);
        } else {
            item.src = item.dataset.screensrc;
            window.addEventListener('resize', mobileCheck);
        }
        function switchSrc(ele) {
            if (ele.isMobile) {
                ele.src = ele.dataset.mobilesrc;
            } else {
                ele.src = ele.dataset.screensrc;
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
});

//height animation
function setHeightProperties(section) {
    section.querySelectorAll('.heightAnimation').forEach(function (item) {
        respondToVisibility(item, function () {
            setHeightProperty(item);
        }, { offset: 400 });
    });
    var setHeightProperty = function setHeightProperty(i) {
        i.style.setProperty('--maxHeight', i.scrollHeight + 'px');
    };
}

window.onload = function () {
    setHeightProperties(document);

    //have animation > start animation
    respondToVisibility('.HaveAnimation', function (item) {
        item.classList.add('start-animation');
    });
};

