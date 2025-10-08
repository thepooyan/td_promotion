$(function () {
    setTimeout(() => {
        //event of videos inside course content (journal)
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

        //getUp
        const getUp = dc.id("getUp");
        if (getUp) {
            const checkScroll = () => {
                if (window.scrollY > window.innerHeight) getUp.classList.add("active");
                else getUp.classList.remove("active");
            };
            getUp.onclick = () => {
                window.scrollTo(0, 0);
            };

            window.addEventListener("scroll", checkScroll);
        }

        const isScrolledOver = (element) => {
            return element.getBoundingClientRect().top - window.innerHeight < 0;
        };

        //scroll progress
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

        //overlay for videos of pages
        function setOverlayEvent() {
            if ($(".overlay").length > 0) {
                $(".overlay").click(function () {
                    $(this).removeClass("overlay");
                    $(this).find("video").attr("controls", true);
                    $(this).find("video")[0].play();
                });
                $(".overlay")
                    .find("video")
                    .on("ended", function () {
                        $(this).attr("controls", false);
                        $(this).parents(".road-map-video").addClass("overlay");
                    });
            }
        }
        

        //show course info  when user click on course title
        if ($("[class*='station']")) {
            $("[class*='station']").click(function (event) {
                //disable bubble because nested .station classes
                if (event.stopPropagation) {
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true;
                }

                //show course info and scroll to info section
                let description = $(this)
                    .parents(".road-map-overview")
                    .children(".road-map-description");
                if (this.dataset.id) {
                    let data = {
                        roadMapCategoryId: this.dataset.id
                    };

                    let url = this.dataset.url;
                    console.log(this.dataset.url)
                    $(description).addClass('loading');
                    $(description).html('');

                    $.get(url, data, function (ReceivedData, status) {
                        if (status == "success") {
                            console.log(ReceivedData)
                            $(description).removeClass('loading');
                            $(description).addClass('active');
                            $(description).html(ReceivedData);
                            setOverlayEvent();
                            if ($(window).width() < 698) {
                                $("html , body").animate(
                                    { scrollTop: description.offset().top },
                                    100
                                );
                            }
                        }
                    });
                }
            });
        }
        if ($(".prerequisite")) {
            $(".prerequisite").click(function (event) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true;
                }

                //show course info and scroll to info section
                let description = $(this)
                    .parents(".road-map-overview")
                    .children(".road-map-description");
                if ($(this).data("id")) {
                    let data = `{"id" : ${$(this).data("id")}}`;
                    $(description).addClass('loading');
                    $(description).html('');
                    $.get("url", data, function (ReceivedData, status) {
                        if (status == "success") {
                            //$(description).removeClass('loading');
                            //$(description).addClass('active');
                            // $(description).html(ReceivedData);
                            //scroll to info section on mobile device
                            if ($(window).width() < 698) {
                                $("html , body").animate(
                                    { scrollTop: description.offset().top },
                                    100
                                );
                            }
                        }
                    });
                }
            });
        }
        //End

        //calculate height of road-map-stations depending on number of stations in small devices
        if ($(window).width() < 698) {
            if ($(".road-map-stations")) {
                $(".road-map-stations").each(function () {
                    let stationsCounte = $(this).find("[class*='station']").length + 7;
                    let height = stationsCounte * 21; //every station has 19vw height
                    $(this).css("height", height + "vw");
                });
            }
        }
        //End

        //road map category ajax code
        const roadMapCategory = dc.queries('[data-sendto]');
        if (roadMapCategory.length > 0) {
            roadMapCategory.forEach(item => {
                item.addEventListener('click', function () {
                    let url = this.dataset.sendto;
                    let data = { category: this.dataset.mydata };
                    const categoryContent = dc.query('#content-of-category');
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                        .then(response => response.text())
                        .then(data => {
                            categoryContent.innerHTML = data
                        })
                        .catch(error => {
                            console.log('Error', error)
                        })
                });
            });
        }

        const roadMapAnchors = dc.queries('[data-scrolltoid]');
        if (roadMapAnchors.length > 0) {
            roadMapAnchors.forEach((item) => {
                item.addEventListener('click', function () {
                    let query = this.dataset.scrolltoid;
                    let elementToScroll = dc.id(query);
                    if (elementToScroll) {
                        elementToScroll.scrollIntoView();
                    }
                });
            });
        }
    }, 500);
});
