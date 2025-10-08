"use strict";

$(function () {
    //$("#btnFindUser").click(function () {
    //    var url = $(this).data('url');
    //    var getval = $("#UserName").val();
    //    var datas = { userName: getval };
    //    $.ajax({

    //        method: "GET",
    //        contentType: "application/x-www-form-urlencoded; charset=utf-8",
    //        url: url,
    //        data: datas,
    //        success: function (data) {
    //            $("#wapinfo").html(data);
    //        },
    //        error: function (XMLHttpRequest, textStatus, errorThrown) {
    //            alert(textStatus);
    //        },
    //    });
    //});
    function uselessFinder(selector) {
        if (dc.query(selector)) alert("found " + selector);
    }

    $(".btn-Login").click(function () {
        callModal.spinner(function (done) {
            $.get("/CNTDL/DownloadFileModal", null, function (rc) {
                done().then(function () {
                    callModal.notif(rc, 'loginModal');
                    //$("#myModalTitle").html('لطفا جهت ثبت نام در دوره ابتدا وارد حساب کاربری خود شوید.');
                });
            });
        });
    });
    $(".btn-save-like").click(function () {
        var login = $(this).data("login");
        var title = $(this).data("title");
        if (login == "False") {
            $.get("/CNTDL/DownloadFileModal", null, function (rc) {
                callModal.notif(rc);
                $("#myModalTitle").html(title);
            });

            $("#myModalTitle").html(result.message);
            //$("#modalmess h5").html("ثبت");
            //$("#modalmess p").html(title);
            //$("#modalmess").modal('show');
        } else {

                var url = $(this).data("url");
                $("#frmlike > #Value").val($(this).data("val"));
                var datas = $('#frmlike').serialize();
                $.ajax({
                    url: url,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: datas,
                    success: function success(data) {
                        if (data.status === "ok") {
                            console.log(data);
                            $("#likeCount").html(data.data.Like);
                            $(".btn-save-like").find('.fa-thumbs-up').remove();
                            $(".btn-save-like").find('.fa-heart').remove();
                            if (data.data.userLike == 0) {
                                if (data.data.useHeart) {
                                    $(".btn-save-like").append("<i class='far fa-heart' ></i>");
                                } else {

                                    $(".btn-save-like").append("<i class='far fa-thumbs-up' ></i>");
                                }
                            } else {
                                if (data.data.useHeart) {
                                    $(".btn-save-like").append("<i class='fa fa-heart' ></i>");
                                } else {

                                    $(".btn-save-like").append("<i class='fa fa-thumbs-up' ></i>");
                                }
                            }
                        } else {
                            $(function () {
                                callModal.notif(data.message);
                                //$("#modalmess h5").html("ثبت");
                                //$("#modalmess p").html(data.message);
                                //$("#modalmess").modal('show');
                            });
                        }
                    },
                    error: function error(XMLHttpRequest, textStatus, errorThrown) {
                        callModal.notif(textStatus);
                        /*alert(textStatus);*/
                    }
                });
            }
    });

    //uselessFinder('.modal-download')
    $('.modal-download').click(function () {
        var SU = $(this).attr("data-action");

        $.get(SU, null, function (rc) {

            callModal.notif(rc);
            $("#myModalTitle").html('برای دانلود فایل ابتدا وارد شوید!');
        });
    });

    $(".btn-save-vote").click(function () {
        var login = $(this).data("login");
        var title = $(this).data("title");
        if (login == "False") {
            $.get("/CNTDL/DownloadFileModal", null, function (rc) {
                callModal.notif(rc);
                $("#myModalTitle").html(title);
            });
            /*callModal.notif(title);*/
            //$("#modalmess h5").html("ثبت");
            //$("#modalmess p").html(title);
            //$("#modalmess").modal('show');
        } else {

                var datas = $('#frmvoterank').serialize();
                var url = $(this).data("url");

                $.ajax({
                    url: url,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: datas,
                    success: function success(result) {
                        callModal.notif(result.message);

                        //$("#modalmess h5").html("ثبت");
                        //$("#modalmess p").html(result.message);
                        //$("#modalmess").modal('show');
                        //alert(result.data);
                        $("#VoteAverage").text(result.data);

                        var basic = $(".basic").clone();
                        $("#rating").find('.basic').remove();
                        $("#rating").append("<div class='basic' data-average=" + result.data + " data-id='1'></div>");
                        loadRating();
                    },
                    error: function error(XMLHttpRequest, textStatus, errorThrown) {
                        callModal.notif(textStatus);
                    }
                });
            }
    });

    uselessFinder('.start i');
    //$(".start i").hover(function () {
    //    $(this).removeClass("text-black-50 fa-star-o");
    //    $(this).addClass("fa-star text-warning");
    //    $("#Value").val($(this).data("val"));
    //});

    //$(".btnregister").click(function () {

    //    var url = $(this).data("url")
    //    $.ajax({
    //        url: url,
    //        dataType: "json",
    //        contentType: "application/json; charset=utf-8",
    //        success: function (data) {
    //            $(".registermess").removeClass("d-none");
    //            $(".registermess").html(data);
    //            $(".btnregister").prop('disabled', true);
    //        },
    //        error: function (XMLHttpRequest, textStatus, errorThrown) {
    //            alert(textStatus);
    //        },
    //    })
    //});

    //$("#savecomments").click(function () {
    //    var datas = $('#commentForm').serialize();
    //    var url = $(this).data("url")
    //    $.ajax({
    //        url: url,
    //        data: datas
    //        ,
    //        success: function (data) {
    //            $("#comments").html("");
    //            $("#comments").html(data);
    //            $("#Model_title").val("");
    //            $("#Model_text").val("");
    //        },
    //        error: function (XMLHttpRequest, textStatus, errorThrown) {
    //            alert(textStatus);
    //        },
    //    })

    //});

    //$(".chngFilmHome").click(function () {
    //    var getsrc1 = $(this).data('src1');
    //    var getsrc2 = $(this).data('src2');
    //    var getsrc3 = $(this).data('src3');
    //    var title = $(this).data('titlefilm');
    //    var link = $(this).data('link');
    //    var pic = $(this).data('pic');

    //    $("#my-video_html5_api").attr("src", getsrc1);
    //    $('source[type="video/webm"]').attr("src", getsrc1);
    //    $('source[type="video/mp4"]').attr("src", getsrc2);
    //    $('source[type="video/ogg"]').attr("src", getsrc3);

    //    $('#titlevideoLink').text(title);
    //    $('#titlevideoLink').attr("href", link);

    //    $('.vjs-poster').css('background-image', 'url(' + pic + ')');

    //});

    uselessFinder(".playfilmcourse");
    //$(".playfilmcourse").click(function (e) {
    //    var getsrc1 = $(this).data('src1');
    //    var getsrc2 = $(this).data('src2');
    //    var getsrc3 = $(this).data('src3');
    //    var title = $(this).data('titlefilm');
    //    var link = $(this).data('link');
    //    var pic = $(this).data('pic');

    //    // $("#my-video").html("");

    //    // var data = "<video id='my-video_html5_api' class='vjs-tech' preload='auto' autoplay='' poster='/Files/Articles/' data-setup='{}' src='" + getsrc2 + "'>"
    //    // + "<source src='" + getsrc2 + "' type='video/mp4'>"
    //    // + "<source src='"+getsrc1+"' type='video/webm'>"
    //    // + "<source src='" + getsrc3 + "' type='video/ogg'>"
    //    // + "<p class='vjs-no-js'>"
    //    // + "To view this video please enable JavaScript, and consider upgrading to a web browser that"
    //    // + "</p></video>";

    //    // $("#my-video").html(data);

    //    // var video = document.getElementById('my-video_html5_api');
    //    // video.load();
    //    // video.play();

    //    //$("#my-video_html5_api").attr("src", getsrc1);
    //    //$('source[type="video/webm"]').attr("src", getsrc1);
    //    //$('source[type="video/mp4"]').attr("src", getsrc2);
    //    //$('source[type="video/ogg"]').attr("src", getsrc3);

    //    // $("#my-video").html("");

    //    $('#my-video_html5_api').get(0).pause();
    //    $('#my-video_html5_api').attr('src', getsrc2);
    //    $('#my-video_html5_api').get(0).load();
    //    //$('#'+videoID).attr('poster', newposter); //Change video poster
    //    $('#my-video_html5_api').get(0).play();

    //    $('.vjs-poster').css('background-image', 'url(' + pic + ')');

    //    $('html,body').animate({
    //        scrollTop: $("#filmcourse").offset().top
    //    },
    //        'slow');

    //});

    //$("#playvideobtn").click(function (e) {

    //    $('html,body').animate({
    //        scrollTop: $("#filmcourse").offset().top
    //    },
    //        'slow');
    //});

    //$(".PlayedLable").click(function () {
    //    var getFilmweb = $(this).data('webm');
    //    var getFilmmp4 = $(this).data('mp4');

    //    $('#my-video_html5_api').get(0).pause();

    //    $("#my-video_html5_api").attr("src", getFilmmp4);
    //    $('source[type="video/webm"]').attr("src", getFilmweb);
    //    $('source[type="video/mp4"]').attr("src", getFilmmp4);

    //    $('#my-video_html5_api').get(0).load();
    //    $('#my-video_html5_api').get(0).play();

    //    $('html,body').animate({
    //        scrollTop: $(".TvBox").offset().top
    //    },
    //        'slow');

    //});

    //$("#playvideobtn").click(function (e) {

    //    $('html,body').animate({
    //        scrollTop: $("#filmcourse").offset().top
    //    },
    //        'slow');
    //});

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        var expires = "expires=Fri, 18 Dec 2020 12:00:00 GMT; "; // + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; path=/;" + expires;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    //function checkOrSaveCookie(cname, cvalue) {
    //    var cook = getCookie(cname);
    //    if (cook !== "") {
    //        return cook;
    //    } else {
    //        if (cvalue !== "" && cvalue !== null) {
    //            setCookie(cname, cvalue, 365);
    //            return cvalue;
    //        }
    //    }
    //}

    function closeCategory() {
        var getSaved = getCookie("CloseC");
        if (getSaved !== '') {
            $(getSaved).collapse('hide');
        }
        var split = getSaved.split(',');
        for (var i = 0; i < split.length; i++) {
            var getid = split[i].replace("#", "");
            var getIco = $("[data-ico='" + getid + "']");
            $(getIco).removeClass('fa-minus-square-o');
            $(getIco).addClass('fa-plus-square-o');
        }
    }

    function ViewItems() {
        var getSaved = getCookie("viewDta");
        if (getSaved !== '') {
            $(getSaved).attr('style', "color:#660099 !important");
        }
    }

    closeCategory();
    ViewItems();

    //$("#accordioncateList").find('.collapse').on('show.bs.collapse', function () {
    //    var getSaved = getCookie("CloseC");
    //    if (getSaved !== '') {

    //        var find = "#" + $(this).attr('id') + ",";
    //        getSaved = getSaved.replace(find, "");
    //        find = "#" + $(this).attr('id');
    //        getSaved = getSaved.replace(find, "");

    //        var getId = $(this).attr('id');
    //        var getIco = $("[data-ico='" + getId + "']");
    //        $(getIco).removeClass('fa-plus-square-o');
    //        $(getIco).addClass('fa-minus-square-o');

    //        setCookie("CloseC", getSaved, 365);
    //    };
    //});
    //$("#accordioncateList").find('.collapse').on('hide.bs.collapse', function () {
    //    var getSaved = getCookie("CloseC");
    //    if (getSaved !== '') {
    //        getSaved = getSaved + ",#" + $(this).attr('id');
    //    }
    //    else {
    //        getSaved = '#' + $(this).attr('id');
    //    }

    //    var getId = $(this).attr('id');
    //    var getIco = $("[data-ico='" + getId + "']");
    //    $(getIco).removeClass('fa-minus-square-o');
    //    $(getIco).addClass('fa-plus-square-o');

    //    setCookie("CloseC", getSaved, 365);
    //});

    //$("[data-view]").click(function () {
    //    var getSaved = getCookie("viewDta");
    //    if (getSaved !== '') {
    //        getSaved = getSaved + ",[data-view='" + $(this).data('view') + "']";
    //    }
    //    else {
    //        getSaved = "[data-view='" + $(this).data('view') + "']";
    //    }
    //    setCookie("viewDta", getSaved, 365);

    //});
    // $('.rating').rating();

    //$("#secondDiv").click(function () {
    //    var nextwidth = "250px";
    //    var divs = $("#mydiv");
    //    nextwidth = (divs.width() > 0) ? "0px" : "250px"
    //    $("#mydiv").animate({
    //        width: nextwidth
    //    }, 200);
    //    $("#toolsdiv").toggle(200);

    //    setCookie("ToolsC", nextwidth, 365);

    //});

    //function closeTools() {
    //    var getSaved = getCookie("ToolsC");
    //    if (getSaved === '0px') {
    //        $("#mydiv").animate({
    //            width: getSaved
    //        }, 200);
    //        $("#toolsdiv").toggle(200);
    //    }

    //}

    //closeTools();

    //$("#btnSendActivationCode").click(function (e) {

    //    var url = $(this).data("url");
    //    var userName = $("#UserName").val();
    //    $.ajax({
    //        url: url,
    //        data: { userName: userName },
    //        dataType: "json",
    //        contentType: "application/json; charset=utf-8",
    //        success: function (data) {
    //            callModal.notif(data);
    //            $("input[tabindex=101]").focus();
    //        },
    //        error: function (data) {
    //            callModal.notif(data);
    //            /*$("input[tabindex=101]").focus();*/
    //            // alert(textStatus);
    //        },
    //    })
    //});

    //Verify mobile code
    $(document).on("click", "#btnResendVerify", function () {

        var Data = {
            iDSecond: $("#IDSecond").val()
        };

        $.post("/User/VerifyMobileCode", Data, function (data) {
            //$("#VerifyModalBody").html(data);
            //$("#VerifyModal").modal("show");
            callModal.notif(data);
            $("input[tabindex=101]").focus();

            $.get("/User/GetTimerValue", Data, function (rc) {
                verifySetTimer("resend", rc);
            });
        });
    });

    $(document).on('keydown', ".verifydigitbox", function (e) {
        if (e.keyCode === 8 && e.target.value === '') $(this).prev().focus();
    });

    $(document).on("keyup", "[data-verifyid]", function (e) {
        var verifyCode = "";

        if ($('#ErrorMsg').text() != '') {
            $('#secErrorMsg').addClass("collapse");
            $('#ErrorMsg').text('');
        }
        if ($.isNumeric($(this).val())) {

            var nexttabindex = parseInt($(this).attr("tabindex")) + 1;
            $("input[tabindex=" + nexttabindex + "]").trigger("focus");
            $("input[tabindex=" + nexttabindex + "]").trigger("select");

            for (var i = 101; i <= 105; i++) {
                verifyCode = verifyCode + $("input[tabindex=" + i + "]").val();
            }

            if (verifyCode.length == 5) $("#btnConfirmVerify").trigger("click");
        } else {
            $(this).val("");
            e.stopPropagation();
            e.preventDefault();
        }
    });

    $(document).on("click", "#btnConfirmVerify", function () {
        var verifyCode = "";
        for (var i = 101; i <= 105; i++) {
            verifyCode = verifyCode + $("input[tabindex=" + i + "]").val();
        }
        if (verifyCode.length < 5) {
            $('#secErrorMsg').removeClass("collapse");
            $('#ErrorMsg').text("کد ارسالی را وارد کنید");
        } else {
            Data = {
                ID: $("#IDSecond").val(),
                VerifyCode: verifyCode

            };
            $.post("/user/ConfirmVerify", Data, function (data) {

                if (!data.result.Error) {
                    /*$("#VerifyModal").modal("hide");*/
                    closeModal();
                    $('#modal .content .modalFooter #optional').removeClass('active');
                    if ($("#btnConfirmVerify").hasClass('btnConfirmVerifyPersonalInfo')) {
                        window.location.href = '/Userpanel/Profile?IsVerified="True"';
                    }
                    if (data.urlName == "ForgetPassword") {
                        window.location.href = "/User/ChangePassword?idSeccond=" + data.IDSeccond;
                    } else {
                        window.location.href = data.returnUrl;
                    }
                } else {
                    $('#secErrorMsg').removeClass("collapse");
                    $('#ErrorMsg').text(data.ErrorMessage[0]);
                }
            });
        }
    });

    $(document).on("click", "#btnActivateUser", function () {
        var Data = {
            email: $("#Email").val()
        };

        $.post("/User/VerifyMobileCode", Data, function (data) {
            //$("#VerifyModalBody").html(data);
            //$("#VerifyModal").modal("show");
            //$("input[tabindex=101]").focus();
            console.log(data);
            callModal.notif(data);
            $("input[tabindex=101]").focus();
            $.get("/User/GetTimerValue", Data, function (rc) {
                verifySetTimer("send", rc);
            });
        });
    });

    var verifySetTimer = function verifySetTimer(type, rtime) {

        var reminedTime = rtime * 1000;

        var x = setInterval(function () {
            reminedTime -= 1000;

            // Time calculations for days, hours, minutes and seconds
            var seconds = Math.floor(reminedTime % (1000 * rtime) / 1000);

            // Output the result in an element with id="demo"
            $('.VerifyReminedTimer').html(" ارسال مجدد در " + seconds + " ثانیه دیگر ");

            // If the count down is over, write some text
            if (reminedTime <= 0) {
                clearInterval(x);
                if (type == "resend") {
                    $("#secResendVerify").addClass("collapse");
                    $("#secResendVerify").removeClass("collapse.in");
                    $("#secVerifyReminedTimer").addClass("collapse.in");
                    $("#secVerifyReminedTimer").removeClass("collapse");
                } else {
                    $("#secResendVerify").addClass("collapse.in");
                    $("#secResendVerify").removeClass("collapse");
                    $("#secVerifyReminedTimer").addClass("collapse");
                }
            } else {
                if (type == "resend") {
                    $("#secResendVerify").addClass("collapse");
                    $("#secResendVerify").removeClass("collapse.in");
                    $("#secVerifyReminedTimer").addClass("collapse.in");
                    $("#secVerifyReminedTimer").removeClass("collapse");
                }
            }
        }, 1000);
    };

    //*Qcomment
    var mainQC = dc.query('.mainPageSection.Qcomment');
    if (mainQC) {
        setTimeout(function () {
            var form = dc.query('.mainPageSection.Qcomment form');
            var submitMsg = dc.query('.mainPageSection.Qcomment form p');
            var submitMsgText = submitMsg.query('span');
            var QCsection = dc.query('.mainPageSection.Qcomment section');
            var comments = QCsection.queries('.question, .answer');
            var modal = dc.query('.mainPageSection.Qcomment .replyModal');
            var modalMsgText = modal.query('form p span');
            var overlay = modal.query('.overlay');
            var viewCommentSection = dc.query('.mainPageSection.Qcomment .contain > div section');

            setValidations(form);
            addReplyButtonEvt();
            //*change Tab
            dc.queries('.mainPageSection.Qcomment .formTab span').forEach(function (item) {
                item.addEventListener("click", function () {
                    if (item.classList.contains('active')) return;
                    dc.query('.mainPageSection.Qcomment .forms').classList.toggle('q');
                    dc.queries('.mainPageSection.Qcomment .formTab span').forEach(function (i) {
                        i.classList.toggle('active');
                    });

                    var isComment = item.getAttribute('data-iscomment');
                    $("#IsComment").val(isComment);

                    var sectionId = $("#SectionID").val();
                    var resourceId = $("#ResourceID").val();

                    var data = JSON.stringify({ isComment: isComment, sectionId: sectionId, resourceId: resourceId });
                    $.ajax({
                        dataType: "html",
                        contentType: 'application/json',
                        type: "Post",
                        url: '../../QComment/ViewComment',
                        data: data,
                        success: function success(result) {
                            viewCommentSection.innerHTML = result;
                            addReplyButtonEvt();
                            combineComments();
                            lazyLoadPics();

                            comments = QCsection.queries('.question, .answer');
                            setCommentsState(comments);
                        }
                    });
                });
            });

            //*Combine answer/question s with same asker
            combineComments();
            function combineComments() {
                var prevData = undefined;
                dc.queries('.mainPageSection.Qcomment section div .icon').forEach(function (item) {
                    if (item.dataset.user == 'کاربر میهمان') {
                        prevData = item.dataset.user;
                        return;
                    }

                    if (item.dataset.user === prevData) item.parentElement.classList.add('combine');
                    prevData = item.dataset.user;
                });
            }

            //*reply event
            function addReplyButtonEvt() {
                dc.queries('.mainPageSection.Qcomment section i').forEach(function (item) {
                    item.addEventListener("click", function (e) {
                        var clone = e.target.parentElement.parentElement.cloneNode(true);
                        modal.query('.target').appendChild(clone);
                        modal.classList.add('active');
                    });
                });
            }

            function clearQCForm() {
                form.querySelector('input#Title').value = '';
                form.querySelector('textarea').value = '';
            }

            //*form submit
            form.addEventListener('submit', function (e) {
                var _this = this;

                e.preventDefault();
                validateSection(form).then(function () {
                    //var isValid = true;
                    //var fileUpload = $("input[type='file']");
                    //if (parseInt(fileUpload.get(0).files.length) > 3) {
                    //    isValid = false;
                    //    callModal.notif("آپلود فقط تا سه فایل مجاز میباشد");
                    //}
                    //var isComment = $(this).find("#IsComment").val();
                    //if (isValid) {

                    data = new FormData($(_this)[0]);
                    $.ajax({
                        processData: false,
                        contentType: false,
                        type: "Post",
                        url: '../../QComment/SendComment',
                        data: data,
                        success: function success(result) {
                            if (!result.HasError) {
                                submitMsgText.innerHTML = "پیام  شما با موفقیت ثبت شد و پس از تایید ادمین، نمایش/پاسخ داده خواهد شد.";
                                clearQCForm();
                            } else submitMsgText.innerHTML = result.Errors[0];
                        }
                    });
                    submitMsg.classList.add('show');
                    // }
                })["catch"](function (_) {
                    callModal.fail('لطفا فرم را کامل کنید');
                });
            });

            //*close QCmodal
            function closeQCModal() {
                modal.classList.remove('active');
                modal.addEventListener('transitionend', function () {
                    modal.query('.target').innerHTML = '';
                    modal.query('p.success').classList.remove('show');
                    modal.query('.reply textarea').value = '';
                    modal.queries('.validationMsg').forEach(function (item) {
                        item.classList.remove('show');
                    });
                }, { once: true });
            }
            overlay.addEventListener('click', closeQCModal);
            modal.query('i.fa-times').addEventListener('click', closeQCModal);

            //*modal submit
            modal.query('form').addEventListener('submit', function (e) {
                var _this2 = this;

                e.preventDefault();
                validateSection(modal).then(function () {
                    var pCommentId = modal.query('.target > *').getAttribute("data-id");

                    modal.query('#PCommentID').value = pCommentId;
                    modal.query('#IsComment').value = $("#IsComment").val();

                    data = new FormData($(_this2)[0]);
                    $.ajax({
                        processData: false,
                        contentType: false,
                        type: "Post",
                        url: '../../QComment/SendAnswer',
                        data: data,
                        success: function success(result) {
                            if (!result.HasError) {
                                modalMsgText.innerHTML = "پاسخ  شما با موفقیت ثبت شد";
                                location.reload();
                            } else modalMsgText.innerHTML = result.Errors[0];
                        }
                    });
                    // modalMsgText.classList.add('show');
                    modal.query('p.success').classList.add('show');
                    modal.query('textarea').value = '';
                });
            });

            setCommentsState(comments);
            function setCommentsState(comments) {
                if (comments.length < 6) {
                    if (comments.length == 0) {
                        mainQC.classList.add('empty');
                        return;
                    }
                    mainQC.classList.remove('empty');
                    mainQC.classList.add('minimal');
                } else {
                    mainQC.classList.remove('empty');
                    mainQC.classList.remove('minimal');
                }
            }
        }, 400);
    }
});

function GetIP(divDownloadBox) {

    $.ajax({
        method: "GET",
        dataType: "json",
        url: "http://ip-api.com/json",
        success: function success(data) {
            var cCode = data["countryCode"];

            if (cCode !== "IR") {
                $(divDownloadBox).html("<p class='alert alert-warning ' >دانلود فقط با IP ایران امکان پذیر است</p>");
            }
        }
    });
};

var isMobile = {
    Android: function Android() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function BlackBerry() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function iOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function Opera() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function Windows() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function any() {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    }
};

function ScroolSet() {
    var menu = $('#mainMenu');
    if ($(document).scrollTop() >= 110) {
        menu.addClass("fixedNav");
        $("#bigLogo").slideUp().hide();
        $("#logo").removeAttr("style");
        //$(".menuContainerArea > ul > li#logo").show();
    } else {
            menu.removeClass("fixedNav");
            $("#bigLogo").slideDown();
            $("#logo").attr("style", "visibility:hidden !important");
            //$(".menuContainerArea > ul > li#logo").hide();
        }
}
var main = function main() {
    var menu = $('#mainMenu');
    $(document).scroll(function () {
        ScroolSet();
        $("#logo").hide();
    });
    $(window).resize(function () {
        var width = $(window).width();
        if (width > 600) {
            menu.show();
        }
    });
    var btnMenu = $("#btnMenu");
    btnMenu.click(function () {
        $(".firstLevelRoot").toggle();
    });
};

function color(hexaValueColor) {
    var realHex = Number(hexaValueColor).toString(16);
    return "#" + ("000000".substr(0, 6 - realHex.length) + realHex.toUpperCase());
}

function isDark(color) {
    var match = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(color);
    return parseFloat(match[1]) + parseFloat(match[2]) + parseFloat(match[3]) < 3 * 256 / 2;
}

function setBoxSize(elem) {
    if ($(elem).height() < 96) {
        $(elem).css("line-height", "96px");

        $(elem).css("height", "96px");
    }
    if ($(elem).height() > 96 && $(elem).height() < 288) {
        $(elem).css("line-height", "48px");

        $(elem).css("height", "96px");
    }
    if ($(elem).height() >= 288) {
        $(elem).css("line-height", "32px");
    }
}

function doResize(boxNumber) {
    $(".titleBoxArea").each(function (index, elem) {
        setBoxSize(elem);
    });

    //height ra Reset mikonad
    $(".caption").each(function (index, elem) {
        $(elem).css("height", "auto");
    });

    var numberOfItems = $(".caption").length;
    for (var i = 0; i < numberOfItems; i += boxNumber) {
        var maxHeight = 0;

        //mohasebeh hadeksar height

        $(".caption").slice(i, i + boxNumber).each(function (index, elem) {
            if ($(elem).height() > maxHeight) {
                maxHeight = $(elem).height();
            }
        });
        //tanzimHeight
        $(".caption").slice(i, i + boxNumber).each(function (index, elem) {
            $(elem).height(maxHeight);
        });
    }
}
$(function () {
    $("#searchbtn").click(function () {
        var getValueSearch = $("#MenuEdu_txtSearch").val();
        var getCate = $("#MenuEdu_txtSearch").attr("tabindex");
        var search = "/Search/";
        if (getCate !== "") {
            getCate = "/" + getCate;
        } else {
            getCate = search;
        }

        if (getValueSearch !== "") {
            window.location = "/Forum" + getCate + getValueSearch;
        }
    });
});

function autoComplatetxt(controlName, valueControl, url) {

    $(controlName).autocomplete({

        source: function source(request, response) {
            $.ajax({
                url: url,
                dataType: "json",
                type: "Get",
                contentType: "application/json; charset=utf-8",

                data: {
                    keyref: JSON.stringify(request.term)
                },
                success: function success(data) {
                    //$("#autocompleteDiv").html(data);
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split('-')[0],
                            val: item.split('-')[1]
                        };
                    }));
                },
                error: function error(XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus);
                }
            });
        },
        position: {
            my: "right top",
            at: "right bottom"
        },

        //open: function () { $(' .ui-menu').width(300) },
        // appendTo: controlName,
        open: function open() {
            var getw = $(controlName).width();

            $(controlName).autocomplete("widget").width(getw);
        },
        minLength: 2,
        select: function select(event, ui) {
            var selecteditem = ui.item;
            var $valuec = $('#' + valueControl);
            $valuec.val(ui.item.val);
        }
    });
};

function scroolerTo(getRefDiv) {

    $('html, body').animate({
        scrollTop: $(getRefDiv).offset().top - 200
    }, 1000);
};

function loadRating() {
    $(".basic").jRating({
        bigStarsPath: '/content/icons/stars.png',
        smallStarsPath: '/content/icons/small.png',
        rateMax: 5,
        step: true,
        length: 5,
        onSuccess: function onSuccess(element, rate) {
            $("#Value").val(rate);
            $(".jRatingAverage").attr("style", "width: 0px; top: -20px;");
            $(".btn-save-vote").trigger("click");
        }
    });
}

function loadRatingJustForShow() {
    $(".basic").jRating({
        bigStarsPath: '/content/icons/stars-white.png',
        smallStarsPath: '/content/icons/small.png',
        rateMax: 5,
        step: true,
        length: 5,
        isDisabled: true,
        type: 'big'
    });
}

