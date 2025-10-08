function initMobileOwl(query) {
    //turn sample project into carousel if smaller than 480
    if (window.innerWidth <= 480) {
        query.classList.add('owl-carousel');
        $(query).owlCarousel({
            loop: true,
            autoplay: true,
            autoplayTimeout: 3000,
            rtl: true,
            items: 1.5,
        });
    }
}
//const kidsComment = dc.id("kids_comments");
//if (kidsComment) {
//    let registerForm = kidsComment.query('form');
//    let commentBox = registerForm.query('textarea');

//    commentBox.onkeydown = () => {
//        commentBox.classList.remove('error');
//    }

//    //submit new comment
//    function submitComment(commentBox, e) {
//        e.preventDefault();

//        if (!commentBox.value) {
//            callModal.fail('لطفا نظر خود را وارد کنید');
//            commentBox.classList.add('error');
//            return
//        }

//        console.log("comment to be saved: ", commentBox.value);
//        callModal.success('نظر شما با موفقیت ثبت شد و پس از بازرسی ادمین نمایش داده میشود').then(() => {
//            commentBox.value = '';
//        })

//    }
//    registerForm.onsubmit = e => {
//        submitComment(commentBox, e);
//    }

//    //reply button event
//    let replys = kidsComment.queries('.comment button');

//    replys.forEach(button => {
//        button.onclick = () => {
//            let clone = registerForm.cloneNode(true);
//            clone.classList.add("kids_comments_form");
//            let _textarea = clone.querySelector('textarea');
//            _textarea.classList.remove('error');
//            _textarea.placeholder = 'ثبت پاسخ...';
//            clone.querySelector('p').innerText = 'پاسخ خود را ثبت کنید';
//            clone.querySelector('button').innerText = 'ثبت پاسخ';

//            clone.onsubmit = e => {
//                submitComment(_textarea, e);
//            }

//            callModal(clone);
//        }
//    });
//}

const sampleProject = dc.query('#kidsCourseDetail .smapleProject');
if (sampleProject) {
    const projectItems = sampleProject.query('.smapleProject > .content')
    initMobileOwl(projectItems);
}

const interview = dc.query('#kidsCourseDetail .interview');
if (interview) {
    let player = interview.query('.interview > div > .video');
    player.src = player.query('source');
    player.poster = player.query('video');
    player.description = player.query('section');
    let videos = interview.queries('.interview > div > .potentiallySlider > .item');

    const playVideo = () => {
        player.classList.add('playing');
        player.poster.setAttribute('controls', true);
        player.poster.play();
    }
    const pauseVideo = () => {
        player.classList.remove('playing');
        player.poster.removeAttribute('controls');
    }

    videos.forEach(video => {
        let videoSrc = video.dataset.video;
        let posterSrc = video.querySelector('img').getAttribute('src');
        let descriptions = video.querySelectorAll('section > *');
        descriptions = Object.values(descriptions).map(i => i.cloneNode(true));

        video.onclick = () => {
            player.poster.setAttribute('poster', posterSrc);
            player.src.setAttribute('src', videoSrc);
            player.description.replaceChildren(...descriptions);
            player.poster.load();
            pauseVideo();
        }
    });

    player.onclick = playVideo;
    player.poster.onended = pauseVideo;

    let slider = interview.query('.potentiallySlider');
    initMobileOwl(slider);
}

//getUp
const getUp = dc.id("getUp");
if (getUp) {
    const checkScroll = () => {
        if (window.scrollY > window.innerHeight) getUp.classList.add("active");
        else getUp.classList.remove("active");
    };

    window.addEventListener("scroll", checkScroll);
}

$(function () {
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
});
//lazy load sources and pics
setTimeout(function () {
    respondToVisibility("[data-src]", function (element) {
        $(element).attr("src", $(element).data("src"));
        $(element).removeAttr("data-src");
    });
}, 1000);

//open images on click

let targetImages = dc.queries('section[id^="headline"]:not(.no_image_zoom) img:not(.no_image_zoom)');
targetImages.forEach(img => {
    img.onclick = _ => {
        debugger;
        img.classList.add('active');
        callModal.image(img.src, { zoom: true });
    }
    img.onerror = () => {
        img.onclick = null;
        img.onerror = null;
        img.classList.add('unclickable')
    }
})