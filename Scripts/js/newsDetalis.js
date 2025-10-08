"use strict";

var intraction = document.querySelector(".bar");
if (intraction) {
    (function () {
        var scrollIntraction = function scrollIntraction() {
            var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = winScroll / height * 100;
            intraction.style.display = "block";
            intraction.style.height = scrolled + "%";
        };

        var shareIntraction = document.querySelector(".intraction ul li:nth-child(3)");
        var shareIntractionDiv = document.querySelector(".showShare");
        // -----scroll for intraction section----
        window.onscroll = function () {
            scrollIntraction();
        };

        shareIntraction.addEventListener("click", function () {
            shareIntractionDiv.classList.toggle("active");
        });
        // copy url code
        $(".fa-copy").click(function () {
            var url = window.location.href;
            clipboard(url);
            dc.queries('.copied').forEach(function (i) {
                i.classList.remove('copied');
            });
            $(".fa-share-alt").addClass('copied');
            setTimeout(function () {
                $(".fa-share-alt").removeClass('copied');
            }, 3000);
        });
        // -----end scroll for intraction section----
    })();
}

// -----reading time----

var articleTime = document.querySelectorAll(".articleTimeRead");
if (articleTime) {
    (function () {
        var readingTime = function readingTime() {
            var wpm = 225;
            for (var i = 0; i < articleTime.length; i++) {
                var words = articleTime[i].innerText.trim().split(/\s+/).length;

                var time = Math.ceil(words / wpm);

                timeRead[i].innerText = "زمان مطالعه " + time + " دقیقه";
            }
        };

        var timeRead = document.querySelectorAll(".timeRead");

        readingTime();
        // -----end reading time----

        //jump to anchor code
    })();
}
$(function () {
    function scrollToAnchor(Anchor) {
        setTimeout(function () {
            $('html,body').animate({ scrollTop: Anchor.offset().top }, 'slow');
        }, 2000);
    }

    var url = location.href;
    if (url.includes("#")) {
        var id = url.slice(url.indexOf("#") + 1);
        if (!id) return;
        var anchor = $("#" + id);
        if (anchor) {
            $("[data-src]:not(source)").each(function () {
                $(this).attr("src", $(this).data("src"));
            });
            scrollToAnchor(anchor);
        }
    }

    var teacherCarousel = dc.queries('.tech-news.owl-carousel');
    setTimeout(function () {
        if (teacherCarousel) {
            $(teacherCarousel).owlCarousel({
                autoWidth: false,
                rtl: true,
                nav: true,
                items: 4,
                margin: 10,
                //loop: true,
                //rewind: true,
                //autoplay: true,
                navText: '',
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    900: {
                        items: 3
                    },
                    992: {
                        items: 2
                    },
                    1200: {
                        items: 3
                    },
                    1550: {
                        items: 4
                    }
                }
            });
        }
    }, //autoplayTimeout: 3200,
    //autoplayHoverPause: true,
    //autoplaySpeed: 900,
    1000);
});

