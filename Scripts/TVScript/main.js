const VideoSectionId = 24;
function runTV() {
    //event of videos inside course content (journal)
    const menuItems = document.querySelectorAll('.menu a')
    if (menuItems)
        menuItems.forEach(navItem => {
            navItem.addEventListener('click', (e) => {
                //const catId = e.currentTarget.dataset.catid
                const target = e.currentTarget.dataset.target
                const targetWraper = document.querySelector(target)
                const group = targetWraper.dataset.group
                document.querySelectorAll(`[data-group="${group}"]`).forEach(grp => grp.classList.remove('active'))
                targetWraper.classList.add('active')
                //videos.forEach(video => video.classList.remove('d-none'))
                //if (catId)
                //    videos.forEach(video => {
                //        if (video.dataset.catid != catId)
                //        video.classList.add('d-none')
                //    })
            })
        })

    const courseVideos = document.querySelectorAll(".courseVideo");
    if (courseVideos.length > 0)
        courseVideos.forEach((videoWrap) => {
            const video = videoWrap.querySelector("video");

            videoWrap.onclick = () => {
                videoWrap.classList.add("active");
                video.controls = true;
                video.play();
            };

            video.onended = () => {
                videoWrap.classList.remove("active");
                video.controls = false;
            };
        });

    ////getUp
    //const getUp = dc.id("getUp");
    //if (getUp) {
    //    const checkScroll = () => {
    //        if (window.scrollY > window.innerHeight) getUp.classList.add("active");
    //        else getUp.classList.remove("active");
    //    };
    //    getUp.onclick = () => {
    //        window.scrollTo(0, 0);
    //    };

    //    window.addEventListener("scroll", checkScroll);
    //}

    //collapsible
    const collapsible = dc.queries(".collapsible");
    if (collapsible) {
        collapsible.forEach((coll) => {
            let nextElement = coll.nextElementSibling;
            nextElement.style.setProperty(
                "--scrollHeight",
                nextElement.scrollHeight + "px"
            );
        });
    }

    const isScrolledOver = (element) => {
        return element.getBoundingClientRect().top - window.innerHeight < 0;
    };

    ////scroll progress
    const scrollProgress = dc.id("scrollProgress");
    if (scrollProgress) {
        //activate scroll progress buttons
        let items = scrollProgress.queries("#scrollProgress a");
        items.forEach((item) => {
            let query = item.getAttribute("href").substr(1);
            let element = dc.id(query);
            let line = item.previousElementSibling;
            if (!element) return;

            window.addEventListener("scroll", () => {
                if (isScrolledOver(element)) {
                    line && line.classList.add("active");
                    item.classList.add("active");
                } else {
                    line && line.classList.remove("active");
                    item.classList.remove("active");
                }
            });
        });

        //
        window.addEventListener("scroll", () => {
            if (scrollProgress.getBoundingClientRect().top)
                scrollProgress.classList.remove("stick");
            else scrollProgress.classList.add("stick");
        });
    }

    ////------------------------------- video section codes --------------------------------------------------------------

    ////show more video button in video section codes
    const showMoreBtns = dc.queries(".show-more");
    showMoreBtns.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            const btn = e.target;
            const parentVideoSection = btn.closest(".videos");
            if (parentVideoSection.classList.contains("more")) {
                parentVideoSection.classList.remove("more");
            } else {
                parentVideoSection.classList.add("more");
            }
        });
    });

    ////show modal video when click on video of video section
    const videoModalEl = document.createElement('div');
    const closeVideoModalEl = document.createElement('span');
    const videoModalBodyEl = document.createElement('div');
    videoModalEl.classList.add('videoModal');
    closeVideoModalEl.classList.add('closeVideoModal');
    videoModalBodyEl.classList.add('m-body');
    closeVideoModalEl.innerHTML = `×`;
    videoModalEl.appendChild(closeVideoModalEl);
    videoModalEl.appendChild(videoModalBodyEl);
    document.body.appendChild(videoModalEl);
    const videoModal = dc.query(".videoModal");
    const VideoSectionVideos = dc.queries(".videoSection .videos > div");
    const closeModalBtn = videoModal.querySelector(".closeVideoModal");
    const modalBody = videoModal.querySelector(".m-body");

    if (VideoSectionVideos) {
        const setModalContent = (result, otherVideoIds) => {

            modalBody.innerHTML = result;
            //setModalEvents();
            setScrollToIdElements();
            modalBody.querySelectorAll('a').forEach(a => {
                var slug = a.getAttribute('href');
                const parts = slug.split('/');
                slug = parts[parts.length - 1];
                slug = slug == "" ? parts[parts.length - 2] : slug;

                a.href = "javascript:void(0)"
                a.setAttribute('data-href', `/tv/GetVideoModal/${slug}/${otherVideoIds}`)
                a.addEventListener('click', changeModalContent)
            })
            videoModal.classList.add("active");
            videoModal.classList.remove("close");
            runModal();
        }
        const getModalContent = (e) => {
            let slug = e.currentTarget.dataset.slug;
            const otherVideoIds = $(e.currentTarget).parent().children().map(function (index, elem) {
                return $(elem).attr('data-videoid');
            }).get().join('-');


            $.get(`/tv/GetVideoModal/${slug}/${otherVideoIds}`, (result) => setModalContent(result, otherVideoIds))
        }
        const changeModalContent = (e) => {
            e.stopPropagation();
            e.preventDefault();
            var url = e.currentTarget.getAttribute('data-href')
            const parts = url.split('/');
            var sameVideo = parts[parts.length - 1];
            sameVideo = sameVideo == "" ? parts[parts.length - 2] : sameVideo;
            $.get(url, (result) => setModalContent(result, sameVideo))
            return false;
        }
        VideoSectionVideos.forEach((video) => {
            video.addEventListener("click", getModalContent);
        });
        //
    }

    if (closeModalBtn)
        closeModalBtn.addEventListener("click", () => {
            const modalMainVideo = videoModal.querySelector("video");
            modalMainVideo.pause();
            videoModal.classList.remove("active");
            videoModal.classList.add("close");
        });

    function fetchComments(videoId) {
        const data = {
            sectionId: VideoSectionId,
            resourceId: videoId
        }

        fetch(`/QComment/Index?${new URLSearchParams(data)}`)
            .then((response) => response.text())
            .then((data) => {
                document.querySelector('#commentDivider').innerHTML = data;
                handleComment('#commentDivider #comments')
            });
    }
    //modal main video codes
    function getSelectedVideoDetails(selectedVideoElem) {
        let src = selectedVideoElem.dataset.vsrc;
        let poster = selectedVideoElem.dataset.vposter;
        let title = selectedVideoElem.dataset.title;
        let des = selectedVideoElem.dataset.des;
        let likeCount = selectedVideoElem.dataset.like;
        let commentCount = selectedVideoElem.dataset.comment;
        let viewCount = selectedVideoElem.dataset.view;
        let videoId = selectedVideoElem.dataset.videoid;

        setMainVideo(poster, src, title, des, likeCount, commentCount, viewCount, videoId);
        fetchComments(videoId);
        increaseView(videoId)
    }
    function increaseView(videoId) {
        fetch(`/TV/IncreaseView/${videoId}`)
    }
    function setMainVideo(poster, src, title, des, likeCount, commentCount, viewCount, videoId) {
        const modalMainVideoContainer = videoModal.querySelector(".mainVideo");
        const modalMainVideo = modalMainVideoContainer.querySelector("video");
        const modalTitle = videoModal.querySelector(".m-main .vtitle");
        const modalDes = videoModal.querySelector(".m-main .vdes");
        const likeCountTag = videoModal.querySelector(".m-main .likeCount");
        const commentCountTag = videoModal.querySelector(".m-main .commentCount");
        const viewCountTag = videoModal.querySelector(".m-main .viewCount");
        modalMainVideo.src = src;
        modalMainVideo.poster = poster;
        modalMainVideo.controls = false;
        modalMainVideoContainer.classList.remove("play");
        modalTitle.innerHTML = title;
        modalDes.innerHTML = des;
        likeCountTag.innerHTML = likeCount;
        commentCountTag.innerHTML = commentCount;
        viewCountTag.innerHTML = viewCount;
        likeCountTag.dataset.videoid = videoId
    }
    function setModalEvents() {
        const modalMainVideoContainer = videoModal.querySelector(".mainVideo");
        const modalAsideVideos = videoModal.querySelectorAll(".m-aside > .video-item");
        const modalMainVideo = modalMainVideoContainer.querySelector("video");
        function playVideo() {
            this.classList.add("play");
            modalMainVideo.play();
            modalMainVideo.controls = true;
            this.removeEventListener("click", playVideo);
        }

        modalMainVideoContainer.addEventListener("click", playVideo);
        modalMainVideo.addEventListener("ended", function () {
            modalMainVideoContainer.classList.remove("play");
            modalMainVideoContainer.addEventListener("click", playVideo);
            this.controls = false;
        });

        //----------------

        modalAsideVideos.forEach((item) => {
            item.addEventListener("click", (e) => {
                getSelectedVideoDetails(e.currentTarget)
                modalMainVideoContainer.classList.remove("play");
                modalMainVideoContainer.addEventListener("click", playVideo);
            });
        });
    }


    //----------------------------------------------- copy url codes -----------------------------------------------

    const copyBtn = document.querySelector('#copyUrlBtn');
    if (copyBtn)
        copyBtn.addEventListener('click', sharePage)


    //----------------------------------------------- rating codes -----------------------------------------------

    const ratingElement = document.querySelector('.tvDetails .rating');
    const ratingElementObject = new rating(ratingElement);
}

function setScrollToIdElements() {
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
}
function handleComment(selector) {
    var comments = dc.query(selector);
    if (comments) {
        let commentImgs = comments.querySelectorAll('img');
        if (commentImgs) {
            commentImgs.forEach(img => {
                img.classList.add('exception');
            });
        }

    }

    if (comments) {
        (function () {
            var form = comments.query("form");
            var replys = comments.queries(".content button");

            var clearForm = function clearForm() {
                form.reset();
            };

            if (form) form.onsubmit = function (e) {
                e.preventDefault();
                validateSection(form).then(function () {
                    var formData = new FormData(e.target);
                    var formDataObject = {};
                    formData.forEach(function (key, value) {
                        formDataObject[value] = key;
                    });

                    var url = e.target.dataset.url;

                    fetch(url, {
                        method: "post",
                        cache: "no-cache",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formDataObject)
                    }).then(function (response) {
                        if (!response.ok) {
                            callModal.fail("خطای سرور");
                            console.log(response);
                            return;
                        }
                        callModal.success("نظر شما با موفقیت ثبت شد!");
                        clearForm();
                        // return response.json();
                    });
                    // .then(data => {
                    //     callModal.success('نظر شما با موفقیت ثبت شد!');
                    //     clearForm();
                    // })
                })["catch"](function () {
                    callModal.fail("لطفا عنوان و متن نظر را خالی نگذارید!");
                });
            };

            if (replys.length) replys.forEach(function (reply) {
                reply.onclick = function () {
                    callModal.custom(function (showModal, closeModal) {
                        var textarea = createElement("textarea");
                        textarea.id = "answer-message";
                        var replyForm = createElement("form.commentReplyForm").addChild("p{پاسخ خود را ثبت کنید}", textarea, "button{ثبت}");
                        var pCommentId = reply.dataset.pcommentid;
                        var url = reply.dataset.url;
                        replyForm.dataset.url = url;
                        replyForm.dataset.pcommentid = pCommentId;
                        replyForm.onsubmit = function (e) {
                            e.preventDefault();
                            var answerMessage = e.target[0].value;
                            var url = e.target.dataset.url;
                            var pCommentId = e.target.dataset.pcommentid;
                            var object = {
                                Text: answerMessage,
                                PCommentID: pCommentId
                            };
                            if (textarea.value.trim() === "") {
                                textarea.classList.add("error");
                                return;
                            }
                            fetch(url, {
                                method: "post",
                                cache: "no-cache",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(object)
                            }).then(function (response) {
                                if (!response.ok) {
                                    callModal.fail("خطای سرور");
                                    console.log(response);
                                    return;
                                }
                                closeModal().then(function () {
                                    callModal.success("نظر شما با موفقیت ثبت شد!");
                                });
                                clearForm();
                            });
                        };
                        showModal(replyForm);
                        setValidations();
                    });
                };
            });
        })();
    }
}



function fetchTVSection() {
    const tvSectionTags = dc.queries(".tv-section")
    let loadedSectionCount = 0
    const sectionLoaded = () => {
        loadedSectionCount++;
        if (loadedSectionCount != tvSectionTags.length) return;
        runTV()
        respondToVisibility("[data-src]", function (element) {
            $(element).attr("src", $(element).data("src"));
            $(element).removeAttr("data-src");
        });
    }

    tvSectionTags.forEach(tvTag => {
        //const sectionId = tvTag.dataset.sectionid
        //const resourceId = tvTag.dataset.resourceid
        //const data = { sectionId, resourceId }

        //fetch(`/tv/GetVideoInSection?${new URLSearchParams(data)}`)
        fetch(`/tv/GetVideoInSection`)
            .then(response => response.text())
            .then(html => {
                tvTag.innerHTML = html
                sectionLoaded()
                refreshOnClicks()
            }).catch(sectionLoaded)
    })
}


$(function () {
    fetchTVSection()
})




class asideFilter {
    constructor(asideFilter) {
        this.asideFilter = asideFilter;
        this.links = this.asideFilter.querySelectorAll('.links .filterList');
        this.responsiveBtn = this.asideFilter.querySelector('.topSection > span');
        this.overlay = this.asideFilter.querySelector('.overlay');
        this.closeFiltersBtn = this.asideFilter.querySelector('#close');
        this.setHeightForLinks();
        this.setEvents();
    }
    setHeightForLinks() {
        this.links.forEach(item => {
            const height = item.scrollHeight;
            item.style.setProperty('--height', `${height}px`);
        });
    }

    setEvents() {
        if (window.innerWidth < 698) {
            this.responsiveBtn.addEventListener('click', this.toggleFilters.bind(this));
        }

        this.overlay.addEventListener('click', this.toggleFilters.bind(this));
        this.closeFiltersBtn.addEventListener('click', this.toggleFilters.bind(this));
    }
    toggleFilters() {
        if (this.asideFilter.classList.contains('active')) {
            this.asideFilter.classList.remove('active');
        }
        else {
            this.asideFilter.classList.add('active');
        }
    }

}
setTimeout(() => {
    const asideFilterEl = document.querySelector('.asideFilter');
    const asideFilterObject = asideFilterEl ? new asideFilter(asideFilterEl) : null;
}, 2000)

$(function () {
    if ($('.owl-carousel').length) {
        setTimeout(() => {
            $('.owl-carousel:not(.tv-details)').owlCarousel({
                loop: false,
                autoWidth: false,
                margin: 10,
                nav: true,
                item: 2,
                rtl: true,
                navText: '',
                responsive: {
                    0: {
                        items: 1
                    },
                    698: {
                        items: 3
                    }
                }
            })
        }, 2000);


        setTimeout(() => {
            $('.owl-carousel.tv-details').owlCarousel({
                loop: false,
                autoWidth: false,
                margin: 10,
                nav: true,
                item: 4,
                rtl: true,
                navText: '',
                responsive: {
                    0: {
                        items: 1
                    },
                    698: {
                        items: 4
                    }
                }
            })
        }, 500);
    }

})


//----------------------------------------------- copy url codes -----------------------------------------------

function sharePage(e) {
    if (navigator.share) {
        navigator.share({
            title: $('title').text(),
            url: window.location.href
        }).then(() => {
            console.log('Thanks for sharing!');
        })
            .catch((error) => {
                console.error('Error sharing:', error);
            });
    } else {
        const url = window.location.href;
        clipboard(url);
        e.currentTarget.classList.add('copied');

        setTimeout(() => {
            document.querySelector('#copyUrlBtn').classList.remove('copied');
        }, 2000);
    }
}

function sharePageInModal(e) {
    if (navigator.share) {
        navigator.share({
            title: $('title').text(),
            url: e.currentTarget.dataset.url
        }).then(() => {
            console.log('Thanks for sharing!');
        })
            .catch((error) => {
                console.error('Error sharing:', error);
            });
    } else {
        const url = e.currentTarget.dataset.url;
        clipboard(url);
        e.currentTarget.classList.add('copied');

        setTimeout(() => {
            document.querySelector('#copyUrlBtn').classList.remove('copied');
        }, 2000);
    }
}
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


//----------------------------------------------- rating codes -----------------------------------------------

class rating {
    constructor(ratingEl) {
        if (!ratingEl)
            return;

        this.rated = false;
        this.ratingElement = ratingEl;
        this.starsContainer = this.ratingElement.querySelector('ul');
        this.stars = this.ratingElement.querySelectorAll('ul >li');
        this.checkUserVote(this.starsContainer.dataset.videoid)

    }

    checkUserVote(videoId) {

        fetch(`/UserInteraction/UserHasVote?referenceTable=Video&resourceId=${videoId}`, {
            method: "get",
            headers: new Headers({ 'content-type': 'application/json' }),
        }).then((response) => response.json())
            .then(result => {
                if (result.Count != 0 && result.Value != 0) {
                    this.rated = true;
                    this.setUserRate(result.Value)
                } else {
                    this.setEvents();
                }
            })
    }

    setEvents() {
        this.stars.forEach(star => {
            star.addEventListener('mouseover', this.starsMouseOverHandler.bind(this))
            star.addEventListener('click', this.starsMouseClickHandler.bind(this))
        });
        this.ratingElement.addEventListener('mouseout', this.starsContainerMouseOutHandler.bind(this));
    }

    starsMouseClickHandler(e) {
        if (!this.rated) {
            this.starsContainer.classList.add('disableEvent');
            this.rated = true;
            this.sendRequest(e)
        }
        else {
            alert('شما قبلا برای این ویدیو امتیاز ثبت کرده اید ');
        }
    }

    sendRequest(e) {
        const errorElem = $('#rateError')
        const rateElem = e.currentTarget
        const videoId = rateElem.parentElement.dataset.videoid;
        const data = {
            ResourceId: videoId,
            ReferenceTable: "Video",
            UseHeart: false,
            Value: $(rateElem).index() + 1
        }
        errorElem.text('')
        fetch('/UserInteraction/SaveRankVote', {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({ 'content-type': 'application/json' }),
        }).then((response) => response.json())
            .then(result => {
                if (result.hasError) {
                    errorElem.text(result.message)
                } else {
                    //likeElem.innerHTML = result.data.userLike
                    //document.querySelectorAll(`[data-videoid="${videoId}"]`).forEach(elem => elem.dataset.like = result.data.userLike)
                }
            })
    }

    starsMouseOverHandler(e) {
        this.removeHover()
        e.currentTarget.hovered = true;
        this.addHover();
    }
    addHover() {
        for (const star of this.stars) {
            star.classList.add('hover');
            if (star.hovered) {
                break;
            }
        }
    }
    setUserRate(rateValue) {
        if (rateValue == 0) return;
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].classList.add('hover');
            if (i + 1 == rateValue) {
                break;
            }
        }
    }
    removeHover() {
        this.stars.forEach(star => {
            star.classList.remove('hover');
            star.hovered = false;
        });
    }
    starsContainerMouseOutHandler() {
        if (!(this.starsContainer.classList.contains('disableEvent'))) {
            this.removeHover();
        }
    }
}
function runModal() {
    //-------------------------------------------- play vdeo codes ------------------------------------------------

    const sampleVideo = dc.query('.videoModal .sample-video');
    if (sampleVideo) {
        var tvVideo = sampleVideo.query('video');
    }
    function playVideo(e) {
        e.stopPropagation();
        this.classList.add('play');
        tvVideo.play();
        tvVideo.controls = true;
        this.removeEventListener('click', playVideo)
    }
    if (sampleVideo) {
        tvVideo.controls = false;
        sampleVideo.addEventListener('click', playVideo);
        tvVideo.addEventListener('ended', function () {
            sampleVideo.classList.remove('play');
            sampleVideo.addEventListener('click', playVideo);
            this.controls = false;
        });

    }

    //----------------------------------------------- copy url codes -----------------------------------------------

    const copyBtn = document.querySelector('#copyUrlBtn');
    if (copyBtn)
        copyBtn.addEventListener('click', sharePageInModal)


    //----------------------------------------------- rating codes -----------------------------------------------

    const ratingElement = document.querySelector('.tvDetails .rating');
    const ratingElementObject = new rating(ratingElement);
}