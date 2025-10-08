"use strict";

$(document).ready(function () {
    //show payment status
    function showPayment() {
        if (dc.id("paymentStatus")) {
            callModal.custom("notification", function (showModal) {
                var paymantHTML = dc.id("paymentStatus").outerHTML;
                showModal(paymantHTML);
            });
        }
    }
    showPayment();

    $('.classType').change(function () {
        var classType = $(this).val();
        var link = $(this).parent().parent().find('a');
        var href = link.attr('href');
        href = href.split('classParticipationType')[0];
        href += 'classParticipationType=' + classType;
        link.attr('href', href);
    });
    //register btnm
    $("[id^=btnRegister]").click(function () {
        //temp
        var isTest = window.location.search.toLowerCase().includes('test=true');

        var id = $(this).attr("data-id");
        var btnRegisterSelector = "#btnRegister-" + id;
        var btnCancelSelector = "#btnCancel-" + id;

        if (isTest) {} else {

            $.ajax({
                type: "GET",
                url: "/Courses/RegisterCourse",
                data: { TCourseID: id },
                dataType: "JSON",
                success: function success(data) {
                    if (data == "ok") {
                        $(btnRegisterSelector).removeClass("d-flex");
                        $(btnRegisterSelector).addClass("d-none");
                        $(btnCancelSelector).addClass("d-flex");
                        $(btnCancelSelector).removeClass("d-none");
                        window.location.href = "/UserPanel/Courses?cate=myCourse";
                    } else {
                        $.get("/CNTDL/DownloadFileModal", null, function (rc) {
                            if (data == "کاربر قبلا در این دوره ثبت نام کرده است.") {
                                callModal.fail(data);
                            }

                            if (data != "کاربر قبلا در این دوره ثبت نام کرده است.") {
                                window.location.href = "/UserPanel/Profile?cate=editProfile";
                            }
                        });
                    }
                },
                error: function error(data, string) {
                    console.log(string);
                    console.log(data);
                    callModal.fail(data);
                }
            });
        }
    });
    $("[id^=btnCancel]").click(function (e) {
        e.preventDefault();
        var id = $(this).attr("data-id");
        $.ajax({
            type: "Post",
            url: "/Courses/CancelRegistration",
            data: { TCourseID: id },
            success: function success(data) {
                callModal.confirm("آیا از انصراف از دوره مطمئن هستید؟").then(function () {
                    $.get("/CNTDL/DownloadFileModal", null, function (rc) {
                        callModal.success(data);
                        location.reload();
                    });
                });
            },
            error: function error(data) {
                callModal.fail(data);
            }
        });
    });

    //teacher video play
    var videoPlays = dc.queries(".courseVideso");
    videoPlays.forEach(function (item) {
        var button = item.querySelector(".playButton");
        var video = item.querySelector("video");
        var wrap = item.querySelector(".wrap");
        var imgMain = item.querySelector(".imgMain");
        var timeoutState = "done";

        var play = function play(_) {
            if (timeoutState !== "done") return;
            if (!button.classList.contains("playing")) {
                timeoutState = "running...";
                setTimeout(function () {
                    button.classList.add("playing");
                }, 500);
                setTimeout(function () {
                    video.play();
                    timeoutState = "done";
                }, 2000);
            } else {
                timeoutState = "running...";
                setTimeout(function () {
                    button.classList.remove("playing");
                }, 600);
                setTimeout(function () {
                    timeoutState = "done";
                }, 2000);
                video.pause();
            }

            wrap.classList.toggle("play");
        };

        button.onclick = play;
        imgMain.onclick = play;
    });

    var isScrolledOver = function isScrolledOver(element) {
        return element.getBoundingClientRect().top - window.innerHeight < 0;
    };

    //scroll progress
    var scrollProgress = dc.id("scrollProgress");
    if (scrollProgress) {
        (function () {
            //activate scroll progress buttons
            var items = scrollProgress.queries("#scrollProgress a");
            var activeItemsCount = 0;
            items.forEach(function (item) {

                var query = item.getAttribute("href").substr(1);
                var element = dc.id(query);
                item.addEventListener('click', function (e) {
                    e.preventDefault();
                    element.scrollIntoView();
                });

                var line = item.previousElementSibling;
                if (!element) {
                    if (item.parentElement.firstElementChild === item) //if it is the fist child of its parent
                        item.nextElementSibling.remove();
                    item.remove();
                    line && line.remove();
                    return;
                }
                activeItemsCount++;

                window.addEventListener("scroll", function () {
                    if (isScrolledOver(element)) {
                        line && line.classList.add("active");
                        item.classList.add("active");
                    } else {
                        line && line.classList.remove("active");
                        item.classList.remove("active");
                    }
                });
            });
            if (activeItemsCount < 1) {
                scrollProgress.remove();
            } else {
                //full width the whole thing on scroll
                window.addEventListener("scroll", function () {
                    if (scrollProgress.getBoundingClientRect().top) scrollProgress.classList.remove("stick");else scrollProgress.classList.add("stick");
                });

                scrollProgress.classList.add("loaded");
            }
        })();
    }

    //event of videos inside course content (journal)
    var courseVideos = document.querySelectorAll(".courseVideo");
    if (courseVideos.length > 0) {
        courseVideos.forEach(function (videoWrap) {
            var video = videoWrap.querySelector("video");
            videoWrap.onclick = function () {
                videoWrap.classList.add("active");
                video.controls = true;
                video.play();
            };

            video.onended = function () {
                videoWrap.classList.remove("active");
                video.controls = false;
            };
        });
    }

    //dynamicScroll
    var dynamicScrolls = dc.queries(".dynamicScroll");
    dynamicScrolls.forEach(function (item) {
        item.style.setProperty("--scrollHeight", item.scrollHeight + "px");
    });

    //overlay for videos of pages
    if ($(".overlay").length > 0) {
        $(".overlay").click(function () {
            $(this).removeClass("overlay");
            $(this).find("video").attr("controls", true);
            $(this).find("video")[0].play();
        });
        $(".overlay").find("video").on("ended", function () {
            $(this).attr("controls", false);
            $(this).parents(".road-map-video").addClass("overlay");
        });
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
            var description = $(this).parents(".road-map-overview").children(".road-map-description");
            if ($(this).data("id")) {
                var data = "{\"id\" : " + $(this).data("id") + "}";
                $.get("url", data, function (ReceivedData, status) {
                    if (status == "success") {
                        // $(description).html(ReceivedData);
                        if ($(window).width() < 698) {
                            $("html , body").animate({ scrollTop: description.offset().top }, 100);
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
            var description = $(this).parents(".road-map-overview").children(".road-map-description");
            if ($(this).data("id")) {
                var data = "{\"id\" : " + $(this).data("id") + "}";
                $.get("url", data, function (ReceivedData, status) {
                    if (status == "success") {
                        // $(description).html(ReceivedData);
                        //scroll to info section on mobile device
                        if ($(window).width() < 698) {
                            $("html , body").animate({ scrollTop: description.offset().top }, 100);
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
                var stationsCounte = $(this).find("[class*='station']").length + 7;
                var height = stationsCounte * 21; //every station has 19vw height
                $(this).css("height", height + "vw");
            });
        }
    }
    //End

    //road map category ajax code
    var roadMapCategory = dc.queries('[data-sendto]');
    if (roadMapCategory.length > 0) {
        roadMapCategory.forEach(function (item) {
            item.addEventListener('click', function () {
                var url = this.dataset.sendto;
                var data = { category: this.dataset.mydata };
                var categoryContent = dc.query('#content-of-category');
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(function (response) {
                    return response.text();
                }).then(function (data) {
                    categoryContent.innerHTML = data;
                })["catch"](function (error) {
                    console.log('Error', error);
                });
            });
        });
    }

    //-------------------------------------------- play vdeo codes ------------------------------------------------

    var sampleVideos = document.querySelectorAll('.videoAndQuestion .sample-video , .videoGridContainer .sample-video');
    sampleVideos.forEach(function (item) {
        var tvVideo = item.querySelector('video');
        tvVideo.controls = false;
        function playVideo(e) {
            e.stopPropagation();
            this.classList.add('play');
            tvVideo.play();
            tvVideo.controls = true;
            this.removeEventListener('click', playVideo);
        }
        if (item) {
            item.addEventListener('click', playVideo);
            tvVideo.addEventListener('ended', function () {
                item.classList.remove('play');
                item.addEventListener('click', playVideo);
                this.controls = false;
            });
        }
    });
});

