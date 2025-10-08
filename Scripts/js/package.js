//owl carousel
dc.queries('.owl-carousel').forEach(item => {
    $(item).owlCarousel({ 
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        rtl: true,
        responsive: {
            0: {
                items: 1.5
            },
            600: {
                items: 2.5
            },
            900: {
                items: 3.5
            }
        }
     });
})

const kidsComment = dc.id("kids_comments");
if (kidsComment) {
    let registerForm = kidsComment.query('form');
    let commentBox = registerForm.query('textarea');

    commentBox.onkeydown = () => {
        commentBox.classList.remove('error');
    }

    //submit new comment
    function submitComment(commentBox, e) {
        e.preventDefault();

        if (!commentBox.value) {
            callModal.fail('لطفا نظر خود را وارد کنید');
            commentBox.classList.add('error');
            return
        }

        console.log("comment to be saved: ", commentBox.value);
        callModal.success('نظر شما با موفقیت ثبت شد و پس از بازرسی ادمین نمایش داده میشود').then(() => {
            commentBox.value = '';
        })

    }
    registerForm.onsubmit = e => {
        submitComment(commentBox, e);
    }

    //reply button event
    let replys = kidsComment.queries('.comment button');

    replys.forEach(button => {
        button.onclick = () => {
            let clone = registerForm.cloneNode(true);
            clone.classList.add("kids_comments_form");
            let _textarea = clone.querySelector('textarea');
            _textarea.classList.remove('error');
            _textarea.placeholder = 'ثبت پاسخ...';
            clone.querySelector('p').innerText = 'پاسخ خود را ثبت کنید';
            clone.querySelector('button').innerText = 'ثبت پاسخ';

            clone.onsubmit = e => {
                submitComment(_textarea, e);
            }

            callModal(clone);
        }
    });
}

const signupButton = dc.query('#course_package section.courseGrid aside a.button');
//if (signupButton) {
//    //hide sign up button when entering comment
//    const commentBox = dc.query('#course_package section.comments form textarea');

    
//    commentBox.onfocus = () => {
//        signupButton.classList.add('hide');
//    }
//    commentBox.onblur = () => {
//        signupButton.classList.remove('hide');
//    }
//}

const videoPlays = dc.queries('[data-playvideo]');
if (videoPlays) {
    videoPlays.forEach(play => {
        play.onclick = () => {
            callModal.lockedVideo(play.dataset.playvideo);
        }
    })
}

//price separator function
function formatPrice(price) {
    // Check if the input is a valid number
    if (isNaN(price)) {
        return "Invalid input";
    }

    // Convert the price to a string and split it into integer and decimal parts
    const [integerPart, decimalPart] = price.toString().split(".");

    // Add commas as separators for the integer part
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the formatted integer part with the decimal part
    const formattedPrice = decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;

    return formattedPrice;
}


//sample video codes
const sampleVideo = dc.query('.sample-video');
if (sampleVideo) {
    const video = sampleVideo.query('video');
    function playVideo() {
        this.classList.add('play');
        video.play();
        video.controls = true;
        this.removeEventListener('click', playVideo)
    }

    sampleVideo.addEventListener('click', playVideo);
    video.addEventListener('ended', function () {
        sampleVideo.classList.remove('play');
        sampleVideo.addEventListener('click', playVideo);
        this.controls = false;
    });
}

respondToVisibility('[data-poster]', function (el) {
    el.poster = el.dataset.poster;
    el.removeAttribute('data-poster');
});
//collapsible head line codes
setTimeout(() => {
    const collapsibleHeadLines = document.querySelectorAll('.collapsibleHeadLine');
    collapsibleHeadLines.forEach(item => {
        const collapsibleHeadLineBody = item.querySelector('.collapsibleHeadLine > .body');
        if (collapsibleHeadLineBody) {
            const collapsibleHeadLinesTitles = collapsibleHeadLineBody.querySelectorAll('.headline > span');
            const collapsibleHeadLines = collapsibleHeadLineBody.querySelectorAll('.headline');
            collapsibleHeadLines.forEach(item => {
                const videosTagHeight = item.querySelector('.videos').scrollHeight;
                item.querySelector('.videos').style.setProperty('--maxHeight', videosTagHeight + 'px');
            })
            collapsibleHeadLinesTitles.forEach(item => {
                item.addEventListener('click', (e) => {
                    const myParent = e.currentTarget.closest('.headline');
                    if (myParent.classList.contains('show')) {
                        myParent.classList.remove('show');
                    } else {
                        const OpenCollapsibleHeadLines = collapsibleHeadLineBody.querySelectorAll('.show');
                        OpenCollapsibleHeadLines.forEach(item => {
                            item.classList.remove('show');
                        });
                        myParent.classList.add('show');
                    }
                });
            });
        }
    });}, 2000);


window.addEventListener('click', (e) => {
    if (!(e.target.hasAttribute('data-onclick'))) {
        const element = document.querySelector('.havePrerequisite');
        if (element) {
            element.classList.remove('active');
        }
    }
});

if (window.innerWidth < 992) {
    let getUpBtn = document.querySelector('#getUp');
    getUpBtn.style.setProperty('bottom', '7em');
}