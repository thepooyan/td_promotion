



//lazy load pics
function lazyLoadPics() {
    $("img[data-src]").each(function () {
        $(this).attr("src", $(this).data("img"));
    })
    $('.lazyLoad').each(function () {
        $(this).addClass('backgroundLoaded');
    })
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

//get up show
let scrollNum = 0;
$(window).scroll(function () {
    scrollNum++;
    if (scrollNum == 2) {
        lazyLoadPics();
    }
})

$('#ham-icon').click(function () {
    $(".main-ul").slideToggle();
    $(".main-ul ul").css("display", "none");
    $(this).toggleClass('open');
});

$('.main-menu-item').click(function (evt) {
    $(this).find('ul').slideToggle();
});

$(".menu-two").click(function () {
    //$(".main-ul ul").slideUp();
    $(this).find('ul').slideToggle();

});


$(window).resize(function () {
    if ($(window).width() > 992) {
        $("ul").removeAttr('style');
        $('#ham-icon').removeClass('open');
    }
});

$(window).load(function () {
    $('.classes .grid-item').hover(function () {
        $(this).toggleClass('hover');
    });
});

//search

$(".search").click(function () {
    $(this).parents('body').addClass("open");
});
$(".close-search").click(function () {
    $(this).parents('body').removeClass("open");
});




//menu

$('.mega-drop-down').mouseenter(function () {
    $(this).addClass('active').siblings().removeClass('active');

});
$('.mega-drop-down').mouseleave(function () {
    $(this).removeClass('active');

});


//tab-calender

$(".tab-calender li").click(function () {
    $(this).addClass("active_TabNiroo").siblings("li").removeClass("active_TabNiroo");
    target = $(this).data("id");
    $(".tab-calender .contentTabNmayandeDiv").fadeOut(500, function () {
        $("#" + target).addClass("active_TabNiroo").siblings(".in_contentTabNmayandeDiv").removeClass("active_TabNiroo");
        $(".contentTabNmayandeDiv").fadeIn(500);
    });
});

//


//tab-news
$(document).ready(function () {
    $(".listTab .Tab_themes li").click(function () {
        $(this).addClass("active_themes").siblings("li").removeClass("active_themes");
        target = $(this).data("id");
        $(".listTab  .contentTab_themes").fadeOut(500, function () {
            $("#" + target).addClass("active_themes").siblings(".in_contentTab_themes").removeClass("active_themes");
            $(".listTab  .contentTab_themes").fadeIn(500);
        });
    });

});


$(document).ready(function () {
    $('.sideMenu #hamburger').click(function () {
        $(this).toggleClass('open');
        $('.menu').toggleClass('menu-open');
    });

});

$("#mainmenu li ul").parent('li').addClass('hasnav');
$('<span class="navtrigger">+</span>').insertAfter('#mainmenu li.hasnav > a');

$(document).on('click tap', '.navtrigger', function () {
    $(this).toggleClass('active');
    $(this).parent('li').find('ul:first').slideToggle('normal');
    return false;
});



//
jQuery(document).ready(function (e) {
    function t(t) {
        e(t).bind("click", function (t) {
            t.preventDefault();
            e(this).parent().fadeOut()
        })
    }
    e(".nav.more-drop .dropdown-toggle").click(function () {
        var t = e(this).parents(".button-dropdown").children(".dropdown-menu").is(":hidden");
        e(".button-dropdown .dropdown-menu").hide();
        e(".button-dropdown .dropdown-toggle").removeClass("active");
        if (t) {
            e(this).parents(".button-dropdown").children(".dropdown-menu").toggle().parents(".button-dropdown").children(".dropdown-toggle").addClass("active")
        }
    });
    e(document).bind("click", function (t) {
        var n = e(t.target);
        if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-menu").hide();
    });
    e(document).bind("click", function (t) {
        var n = e(t.target);
        if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-toggle").removeClass("active");
    })
});


