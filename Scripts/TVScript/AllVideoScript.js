const videosConstants = {
    referenceTable: "Video",
}
videosConstants.changeReference = (reference) => videosConstants.referenceTable = reference;
$(function () {


    function handleLike(selector) {
        const likeBtn = document.querySelector(selector)
        if (!likeBtn) return
        likeBtn.addEventListener('click', function (e) {
            const likeElem = e.currentTarget
            const videoId = likeElem.dataset.videoid;
            const data = {
                ResourceId: videoId,
                ReferenceTable: videosConstants.referenceTable,
                UseHeart: true,
            }
            fetch('/UserInteraction/SaveLike', {
                method: "POST",
                body: JSON.stringify(data),
                headers: new Headers({ 'content-type': 'application/json' }),
            }).then((response) => response.json())
                .then(result => {
                    if (result.status == 'error') {
                        document.querySelector('.video-error').innerHTML = result.message
                    } else {
                        likeBtn.classList.add('liked');
                        likeElem.innerHTML = result.data.userLike
                        document.querySelectorAll(`[data-videoid="${videoId}"]`).forEach(elem => elem.dataset.like = result.data.userLike)
                    }
                })
        })
    }
    $(function () {
        handleLike('.social .likeCount')
        //const sendRequest = (pageIndex) => { 
        //    pageIndex = pageIndex ?? 0
        //    const categoryIds = []
        //    const query = document.querySelector('[name="searchValue"]').value
        //    document.querySelectorAll(".videoSection [data-cat].checked").forEach(checkBox => categoryIds.push(checkBox.dataset.cat));

        //    $.ajax({
        //        type: "Get",
        //        url: "/TV/GetVideos",
        //        data: {
        //            query,
        //            SelectedCategoryIds : categoryIds.join(","),
        //            currentPage: pageIndex
        //        },
        //        success: function (response) {
        //            document.querySelector('#MainSection').innerHTML = response;
        //        },
        //    });
        //}
        //filter section code
        //const filters = document.querySelectorAll(".videoSection [data-cat]");
        //const videos = document.querySelector(".videoSection .videos");
        //if (filters) {
        //    filters.forEach((filter) => {
        //        filter.addEventListener("click", function (e) {
        //            e.stopPropagation();                    
                   
        //            //-------
        //            if ($(this).hasClass("checked")) {
        //                $(this).removeClass("checked");
        //                if ($(this).has(".checked").length > 0) {
        //                    $(this).children().removeClass("checked");
        //                }
        //            } else {
        //                $(this).addClass("checked");
        //                if (!$(this).parent().hasClass("checked")) {
        //                    $(this).parent().addClass("checked");
        //                }
        //            }
        //            sendRequest()
        //        });
        //    });
        //}

        //$(document).on('click', '.TD-pagination [data-page]', function (e) {
        //    e.stopPropagation();
        //    e.preventDefault()
        //    sendRequest($(this).data('page'))
        //    return false
        //})
      
        //const form = document.querySelector('#videoSearchForm')
        //if (form)
        //    form.addEventListener('submit', function (e) {
        //        e.stopPropagation();
        //        e.preventDefault()
        //        sendRequest()
        //        return false
        //    })
        //filters collapse code
        const filterBtn = document.querySelector(".videoSection aside span");
        if (filterBtn) {
            filterBtn.addEventListener("click", function () {
                if ($(window).width() < 992) {
                    $(this).toggleClass("active");
                    $(this).next().slideToggle();
                }
            });
        }
        window.addEventListener("resize", function () {
            if ($(window).width() > 992) {
                $(filterBtn).next().css("display", "block");
            } else {
                $(filterBtn).next().slideUp();
            }
        });
        //end
    });


    //-------------------------------------------- play vdeo codes ------------------------------------------------
    const sampleVideo = dc.query('.sample-video');
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
        copyBtn.addEventListener('click', sharePage)

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
    const ratingElement = document.querySelector('.tvDetails .rating');
    const ratingElementObject = new rating(ratingElement);
})

