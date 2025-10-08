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
    let resClose = document.getElementById("resClose");
    if (resClose) {
        resClose.addEventListener("click", closeResMenu);
    }

    dc.query('#resMenu + .overlay').addEventListener('click', closeResMenu)

    //? res menu course handler
    let courseL1 = document.getElementsByClassName("courseSelector");

    for (let i = 0; i < courseL1.length; i++) {
        courseL1[i].addEventListener("click", function () {
            document.getElementById(this.dataset.linkto).classList.remove("noDisplay");
            document.getElementsByClassName("OriginContent")[0].classList.add("out");
            document.getElementsByClassName("crossContent")[0].classList.add("in");
        });
    }

    document.getElementById("backToRes").addEventListener("click", function () {
        let courseL2 = dc.query(".crossContent ul:not(.noDisplay)");
        courseL2.classList.add("noDisplay");
        document.getElementsByClassName("OriginContent")[0].classList.remove("out");
        document.getElementsByClassName("crossContent")[0].classList.remove("in");
    });

    //* Collapsible
    var coll = document.getElementsByClassName("collapsible");
    for (let i = 0; i < coll.length; i++) {
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
    class HomeSlider {
        constructor(container, options) {
            this.nextBtn = container.query("#right");
            this.prevBtn = container.query("#left");
            this.images = container.queries('img');
            this.dotsContainer = container.query('.dots');
            this.dots = this.createDots();
            this.mainElement = container.query('main');

            let specialCase;
            if (this.images.length === 1) specialCase = 'single';
            if (this.images.length === 0) specialCase = 'empty';

            if (specialCase) {
                container.classList.add(specialCase);
                this.images[0].classList.add('active');
                return
            } else
                this.init(container,options);
        }
        get activeDot() {
            return this.dots[this.activeIndex];
        }
        get activeImage() {
            return this.images[this.activeIndex];
        }
        get activeIndex() {
            return this.activeImageIndexVal ? this.activeImageIndexVal : 0;
        }
        set activeIndex(val) {
            if (val > this.images.length - 1) val = 0;
            if (val < 0) val = this.images.length - 1;

            this.activeImageIndexVal = val;
        }
        init(container , options) {
            //set initial active items
            this.images[0].classList.add('active');
            this.dots[0].classList.add('active');

            //add next/prev click events
            this.nextBtn.addEventListener('click', () => {
                this.next();
            })
            this.prevBtn.addEventListener('click', () => {
                this.prev();
            })

            //download initial images
            this.downloadImage(1);
            this.downloadImage(this.images.length - 1);

            //set timer if given in the options
            if (options.timer) {
                this.timerInterval = options.timer;
                this.setHoverEvent(container);
                this.setMoveTimeout();
                
            }

            //container click event
            this.mainElement.addEventListener('click', () => {
                window.open(this.activeImage.dataset.href, '_blank');
            })
        }
        downloadImage(index) {
            this.images[index].src = this.images[index].dataset.src;
        }
        createDots() {
            let allDots = [];

            this.images.forEach((i, index) => {
                let dot = document.createElement('span');
                allDots.push(dot);

                dot.addEventListener('click', () => { this.move(index); });

                this.dotsContainer.appendChild(dot);
            })

            return allDots;
        }
        next() {
            let targetIndex = this.activeIndex + 1;
            this.move(targetIndex);

            //download the image after this
            this.activeIndex = this.activeIndex + 1;
            this.downloadImage(this.activeIndex);
            this.activeIndex = this.activeIndex - 1;
        }
        prev() {
            let index = this.activeIndex - 1;
            this.move(index);

            //download the image before this
            this.activeIndex = this.activeIndex - 1;
            this.downloadImage(this.activeIndex);
            this.activeIndex = this.activeIndex + 1;
        }
        move(index) {
            this.activeImage.classList.remove('active');
            this.activeDot.classList.remove('active');
            this.activeIndex = index;
            this.activeImage.classList.add('active');
            this.activeDot.classList.add('active');

            if (this.timerInterval) this.setMoveTimeout();
        }
        setMoveTimeout() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                if (!(this.hover)) {
                    this.next();
                }
            }, this.timerInterval);
        }
        setHoverEvent(container) {
            container.addEventListener('mouseover', (e) => {
                this.hover = true;
            });
            container.addEventListener('mouseleave', (e) => {
                this.hover = false;
                this.setMoveTimeout();
            });
        }
    }
    const mainSlider = dc.id("mainSlider");
    if (mainSlider) {
        new HomeSlider(mainSlider, { timer: 4000 });
    }

    //-------   Scroll  Events  ---------------
    function getOffsetTop(element) {
        return element ? (element.offsetTop + getOffsetTop(element.offsetParent)) : 0;
    }
    function isVisible(query, expand = 0) {
        let elements = dc.queries(query);

        return Object.values(elements).find(item => {
            return ($(window).scrollTop() + $(window).height() > getOffsetTop(item) - expand &&
                $(window).scrollTop() < getOffsetTop(item) + item.clientHeight + expand)
        });
    }
    window.isVisible = isVisible;

    function loadCompOnScroll(query, controller = `Home/${query.substring(1)}`, args, offset) {
        return new Promise(resolve => {

            respondToVisibility(query, item => {
                $(item).load(controller, args, () => {
                    $(item).addClass('loaded');
                    resolve();
                })
            }, { offset: offset })

        })
    }

    function newPromise() {
        let a, b;
        let promise = new Promise((resolve, reject) => {
            a = resolve;
            b = reject;
        });
        promise.resolve = a;
        promise.reject = b;
        return promise;
    } //singular promise constructor

    const sliderScriptState = newPromise();
    const customerSpotted = newPromise();
    const sliderClassesSpotted = newPromise();

    Promise.all([customerSpotted, sliderScriptState]).then(startSliderCustomer)
    Promise.all([sliderClassesSpotted, sliderScriptState]).then(startSliderClasses)

    respondToVisibility('.lazyLoad', lazyLoadPics);

    respondToVisibility('.td-content', () => {
        loadStyle("/Content/pages/InnerStyle.min.css");
    }, { offset: 600 })
    //lazy load components
    loadCompOnScroll('#StatisticsRendered', ...[, ,], 200).then(() => {
        respondToVisibility('#StatisticsRendered', () => {
            $('[data-count].num').each(function () {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                },
                    {
                        duration: 2000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $this.text(this.countNum);
                            counterRun = true;
                            //alert('finished');
                        }

                    });
            });
        })
    })
    loadCompOnScroll('#FStepRendered').then(lazyLoadPics);
    loadCompOnScroll('#CustomerRendered').then(() => {
        loadScript("/Scripts/js/swiper-bundle.min.js");
        lazyLoadPics();
        customerSpotted.resolve();
    });
    loadCompOnScroll('#footerPartial', 'Home/footer').then(lazyLoadPics);

    //getUp
    const getUp = dc.id("getUp");
    getUp.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
    });
    if (getUp) {
        const checkScroll = () => {
            if (window.scrollY > window.innerHeight) getUp.classList.add("active");
            else getUp.classList.remove("active");
        };

        window.addEventListener("scroll", checkScroll);
    }

    //insta tall images
    window.addEventListener('scroll', checkInstaTallImages)
    function checkInstaTallImages() {
        if (isVisible('.bg-insta.HaveAnimation')) {
            window.removeEventListener('scroll', checkInstaTallImages);
            dc.queries('.card.instagram-post .instagram-post-img img').forEach(item => {
                if (item.height > 360) {
                    item.parentElement.classList.add('tallImage');
                }
            })
        }
    }
    //-------   Scroll  Events  ---------------


    //slider initiate
    function startSliderClasses() {
        dc.queries('.slider-classes').forEach(item => {
            item.classList.add('loaded')
        })
        //slider-classes 
        var swiper = new Swiper(".slider-classes", {

            speed: 1000,
            slidesPerView: 5,
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: true,


            navigation: {
                nextEl: ".slider-classes .swiper-button-next",
                prevEl: ".slider-classes .swiper-button-prev"
            },
            breakpoints: {
                1400: {
                    freemode: true,
                    slidesPerView: 4,
                    spaceBetween: 30,
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
                    slidesPerView: 1.3,
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
    setTimeout(() => {
        startSliderClasses();
        const projectSlider = new Swiper("#project-slider", {

            speed: 1000,
            slidesPerView: 5,
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: false,
            loopFillGroupWithBlank: true,


            navigation: {
                nextEl: "#project-slider .swiper-button-next",
                prevEl: "#project-slider .swiper-button-prev"
            },
            breakpoints: {
                1390: {
                    freemode: true,
                    slidesPerView: 4,
                    spaceBetween: 15,
                    slidesPerGroup: 1
                },
                1220: {
                    freemode: true,
                    slidesPerView: 3.5,
                    spaceBetween: 15,
                    slidesPerGroup: 1
                },
                1050: {
                    freemode: true,
                    slidesPerView: 3,
                    spaceBetween: 30,
                    slidesPerGroup: 1
                },
                920: {
                    freemode: true,
                    slidesPerView: 2.5,
                    spaceBetween: 15,
                    slidesPerGroup: 1
                },
                730: {
                    freemode: true,
                    slidesPerView: 2,
                    spaceBetween: 30,
                    slidesPerGroup: 1
                },
                590: {
                    freemode: true,
                    slidesPerView: 1.5,
                    spaceBetween: 15,
                    slidesPerGroup: 1
                },
                320: {
                    freemode: true,
                    slidesPerView: 1.3,
                    spaceBetween: 30,
                    slidesPerGroup: 1
                }
            }

        });
        const weblogSlider = new Swiper("#weblog-slider", {

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
        const articleSlider = new Swiper("#article-slider", {

            speed: 1000,
            slidesPerView: 5,
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: false,
            loopFillGroupWithBlank: true,


            navigation: {
                nextEl: "#article-slider .swiper-button-next",
                prevEl: "#article-slider .swiper-button-prev"
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
    }, 1000)
    
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
    function loadStyle(href) {
        if (!document.getElementById(href)) {
            let head = document.getElementsByTagName('head')[0];
            let link = document.createElement('link');
            link.id = href;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = href;
            link.media = 'all';
            head.appendChild(link);
        }
    }
    function loadScript(src) {
        if (!document.getElementById(src)) {
            let head = document.getElementsByTagName('head')[0];
            let script = document.createElement('script');
            script.src = src;
            script.id = src;
            script.defer = 'defer';
            script.onload = sliderScriptState.resolve;

            head.appendChild(script);
        }
    }

    function lazyLoadPics() {
            respondToVisibility("[data-src]", (element) => {
                $(element).attr("src", $(element).data("src"));
            });
            respondToVisibility(".lazyLoad", (element) => {
                $(element).addClass('backgroundLoaded');
            });
    }

    document.querySelector('.projectAtnaHost').setAttribute('data-bg', '/Content/images/img/homePage/cloud.png');
    setTimeout(function () {
        respondToVisibility("[data-src]", function (element) {
            $(element).attr("src", $(element).data("src"));
            $(element).removeAttr("data-src");
        });

        respondToVisibility("[data-bg]", function (element) {
            let backGroundUrlString = $(element).data('bg');
            let backGroundUrl = '';
            if (backGroundUrlString.includes(',')) {
                let backGroundUrlArray = backGroundUrlString.split(',');
                backGroundUrlArray.forEach((item , index , arr) => {
                    backGroundUrl += `url(${item})${index === (backGroundUrlArray.length - 1) ? '' : ','}`;
                    
                })
            }
            else {
                backGroundUrl = `url(${backGroundUrlString})`;
            }
            $(element).css('background-image', backGroundUrl);
            $(element).removeAttr("data-bg");
        });

        
    }, 1000);

    //load pics that are too close to the top
    $('#FStepRendered .lazyLoad').addClass('backgroundLoaded');
    $('.atnaHost.lazyLoad').addClass('backgroundLoaded');

    //ATTENTION Initiate counter
    dc.queries('.attentionBanner:not(.deadline)').forEach(item => {
        setAttentionDate(item.dataset.date);
    })
    function setAttentionDate(date) {
        let getAttentionRemTime = setCounterDate(date);

        if (getAttentionRemTime().days + 1 <= 0) {
            dc.queries(`.attentionBanner[data-date='${date}']`).forEach(item => {
                item.classList.add('done');
            })

        } else {
            dc.queries(`.attentionBanner[data-date='${date}'] .text span`).forEach(item => {
                item.innerHTML = getAttentionRemTime().days + 1;
            })
        }
    }

    //ATTENTION close button
    dc.queries('.attentionBanner i').forEach(item => {
        item.onclick = (e) => {
            e.preventDefault();
            item.parentElement.classList.add('done')
        }
    })

    //teacher video
    //let teacherVideo = dc.query('#teacherVideoPlaceholder');
    //if (teacherVideo.query('#teacherVideo'))
    //    setVideoEvents(teacherVideo, true);

    let homeVideo = dc.query('#homeVideoPlaceholder');
    //if (homeVideo.query('.homeVideo'))
    //    setVideoEvents(homeVideo)


    //HomePage video (general functions)
    function setVideoEvents(section, dropDown = false) {  //section is the most outer container! (exm. #videoRendered)
        const tv = section.query('.tv');
        const video = tv.query('video');
        function playVideo() {
            this.classList.add('play');
            video.play();
            video.controls = true;
            this.removeEventListener('click', playVideo)
        }

        tv.addEventListener('click', playVideo);
        video.addEventListener('ended', function () {
            tv.classList.remove('play');
            tv.addEventListener('click', playVideo);
            this.controls = false;
        });
        function loadVideoCate(cate, id, target) { //load video cate with id, into target
            $.get("/Home/VideoRendered/", { catid: cate, id }, function (data) {
                let modify = data.replace('moreVideos', 'moreVideos active').replace('videoTab', 'videoTab active');
                target.innerHTML = modify;
                let cats = dc.queries('.videoTab .item[data-id]');
                cats.forEach(item => {
                    if (item.dataset.id == id) {
                        item.querySelector('span').classList.add('active');
                    }
                })
                setVideoEvents(section, target.id === "teacherVideoPlaceholder" ? true : false);
                refreshOnClicks();
                videoTabCarousel();
            })
        }

        //how many videos do we have?
        if (section.queries('[data-videoSrc]').length >= 1) {
            section.queries('[data-videoSrc]').forEach(item => {
                item.closest('[data-onclick]').addEventListener('click', function () {
                    let video = section.query('.tv video');
                    //let showLink = section.query(".cucumber>section>a");
                    //if (showLink) {
                    //    const link = item.dataset.pageurl;
                    //    showLink.href = link;
                    //}
                    video.poster = item.src;
                    video.querySelector('source').src = item.dataset.videosrc;
                    video.load();
                })
            })
        }

        //how many categories do we have?
        if (section.query('.videoTab').queries('.item').length >= 1) {
            section.queries('.videoTab .item').forEach(item => {
                item.addEventListener('click', function () {
                    loadVideoCate(item.dataset.category, item.dataset.id, section) 
                })
            })
        }

        //teacher video
        if (dropDown) {
            //techer video view button function
            function veiwTeacherVid() {
                dc.query('#teacherVideo video').pause();
            }
            dc.query('#teacherVideo .item').onclick = veiwTeacherVid; //veiw button
            
        }
    }

    //Counter initiate
    if (dc.id('counterSlider')) {
        let counterDate = dc.id('counterSlider').dataset.date;
        let getCounterRemTime = setCounterDate(counterDate);

        counterInterval = setInterval(() => {
            let placeHolders = dc.queries('#counterSlider .timer span');
            let remainingTime = getCounterRemTime();
            if (Object.values(remainingTime).every(i => i <= 0)) {
                clearInterval(counterInterval);
                dc.id('counterSlider').classList.add('done')
                return;
            }
            placeHolders[0].innerHTML = remainingTime.seconds;
            placeHolders[1].innerHTML = remainingTime.minutes;
            placeHolders[2].innerHTML = remainingTime.hours;
            placeHolders[3].innerHTML = remainingTime.days;

        }, 1000);
    }

    //src based changable image
    document.querySelectorAll('[data-mobileSrc][data-mobileSrc]').forEach(item => {
        let mobileWidth = parseInt(item.dataset.mobilewidth) || 520;
        let isMobile = window.innerWidth < mobileWidth;

        if (isMobile) {
            item.isMobile = true;
            switchSrc(item)
            window.addEventListener('resize', screenCheck);
        } else {
            item.setAttribute('data-src', item.dataset.screensrc);
            window.addEventListener('resize', mobileCheck);
        }
        function switchSrc(ele) {
            if (ele.isMobile) {
                ele.setAttribute('data-src', ele.dataset.mobilesrc);
            } else {
                ele.setAttribute('data-src', ele.dataset.screensrc);
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

    })

    function videoTabCarousel() {
        $('#videoTabCarousel').owlCarousel({
            navText: "",
            rtl: true,
            nav: true,
            responsive: {
                0: {
                    items: 3
                },
                400: {
                    items: 4
                },
                600: {
                    items: 6
                }
            }
        });
    }
    window.videoTabCarousel = videoTabCarousel;
    setTimeout(() => {
        videoTabCarousel();
    } , 2000);

    //learning programing code

    setTimeout(() => {
        $('#learnProgramingTxt').owlCarousel({
            rtl: true,
            nav: false,
            dots: true,
            responsive: {
                0: {
                    items: 1
                }
            }
        })
    }, 2000);

    //customers code

    $('#customers').owlCarousel({
        rtl: true,
        nav: false,
        dots: true,
        margin: 20,
        responsive: {
            0: {
                items: 4
            },
            600: {
                items: 5
            },
            1100: {
                items: 8
            },
            1400: {
                items: 10
            }
        }
    })
    $('#homeCommentsSlider').owlCarousel({
        rtl: true,
        nav: true,
        dots: false,
        navText: '',
        items: 1
    })

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

    setTimeout(function () {
        var collapsibleContentsArray = document.querySelectorAll('.collapsible-content');
        if (collapsibleContentsArray && collapsibleContentsArray.length >= 1) {
            collapsibleContentsArray.forEach(function (collapsibleContent) {
                collapsibleContent.style.setProperty('--scrollHeight', collapsibleContent.scrollHeight + "px");
            });
        }
    }, 1000);

    document.querySelectorAll('.attentionBanner')[0].style.display = 'none';


    const Modal = ()=>{
     const result = document.getElementById("testResaultModal");
     const endQuestion =

    }




});


window.onload = () => {
    //setHeightProperties(document);

    //have animation > start animation
    respondToVisibility('.HaveAnimation', item => {
        item.classList.add('start-animation');
    })
}









