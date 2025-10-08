
$(function () {
    window.setValidations();

    //profile edit submit and edit mobile
    let editProfile = dc.query('form.editProfile');
    if (editProfile) {
        editProfile.errors = editProfile.query('.errors');
        editProfile.nationality = editProfile.query('#nationality');
        editProfile.nationalCode = editProfile.query('#ContNationalCode');
        editProfile.foreigner = editProfile.query('#ContForeigners');
        let changeCity = editProfile.querySelector('.drpCityChange');
        let cityList = editProfile.querySelector('#CityID');
        editProfile.onsubmit = (e) => {
            e.preventDefault();
            validateSection(e.target).then(_ => {
                registerProfile(e);
            }).catch(_ => {
                editProfile.errors.innerHTML = 'اطلاعات وارد شده صحیح نمیباشد';
                editProfile.errors.classList.add('show');
            });
        };

        editProfile.onreset = e => {
            setTimeout(() => {
                validateSection(e.target);
            }, 0)
        }

        editProfile.nationality.onchange = e => {
            toggleInput(editProfile.nationalCode)
            toggleInput(editProfile.foreigner)
        }

        if ($(nationality).val() == "ایرانی") {
            toggleInput(editProfile.foreigner);
        }
        else {
            toggleInput(editProfile.nationalCode);
        }

        function toggleInput(label) {
            $(label).toggle();
            label.querySelector('input').classList.toggle('noValidate')
        }

        //image inputs
        let imgInputs = dc.queries('.imageInput')
        imgInputs.forEach(input => {
            let imgTag = input.parentElement.querySelector('img');
            input.onchange = e => {
                const [file] = input.files;
                if (file) {
                    if (file.size < 2000 || file.size > 50000000) {
                        callModal.fail("حجم تصویر شما باید بین 2 کیلو بایت تا 2 مگابایت باشد");
                    }
                    else {
                        imgTag.src = URL.createObjectURL(file)
                    }
                }
            }
        });

        //city change
        changeCity.onchange = e => {
            let ur = $(e.target).data("url");
            let waper = $(e.target).data("waper");
            let vid = $(e.target).val();
            $(waper).html("");
            if (vid > 0) {
                $.ajax({
                    type: 'GET',
                    url: ur,

                    data: { sID: vid },
                    success: function (cities) {
                        if (waper != "") {
                            $(cityList).html(cities)
                        }
                    },
                    error: function (ex) {
                        alert('Failed to retrieve states.\n', ex);
                    }
                });


            };
        }
    }

    let moreEdits = dc.queries('form.moreEdit');
    moreEdits.forEach(i => {
        let errors = i.querySelector('.errors');

        i.onsubmit = e => {
            e.preventDefault();
            validateSection(i).then(_ => {
                registerProfile(e);
            }).catch(_ => {
                errors.innerHTML = 'اطلاعات وارد شده صحیح نمیباشد';
                errors.classList.add('show');
            });
        }
    })

    //register profile new info
    function registerProfile(e) {
        e.stopPropagation();
        $(".validationMsg.errors.show").html('');
        if ($("#IsEmailConfirmed").val() != 'False' && $("#IsMobileConfirmed").val() != 'False') {
            $("#Email").attr("disabled", false);
            $("#Mobile").attr("disabled", false);
            $("#btnSavePersonalInfo").hide();
            $("#imgloader").removeAttr("hidden");
            var data = new FormData();
            data.append("FirstName", $('#frmPersonalInfo').find('[name="FirstName"]').val());
            data.append("LastName", $('#frmPersonalInfo').find('[name="LastName"]').val());
            data.append("Email", $('#frmPersonalInfo').find('[name="Email"]').val());
            data.append("UserName", $('#frmPersonalInfo').find('[name="UserName"]').val());
            data.append("Mobile", $('#frmPersonalInfo').find('[name="Mobile"]').val());
            data.append("StateID", $('#frmPersonalInfo').find('[name="StateID"]').val());
            data.append("CityID", $('#frmPersonalInfo').find('[name="CityID"]').val());
            data.append("EducationDegreeId", $('#frmPersonalInfo').find('[name="EducationDegreeId"]').val());
            data.append("AcademicMajor", $('#frmPersonalInfo').find('[name="AcademicMajor"]').val());
            data.append("FatherName", $('#frmPersonalInfo').find('[name="FatherName"]').val());
            data.append("NationalCode", $('#frmPersonalInfo').find('[name="NationalCode"]').val());
            data.append("IDSecond", $('#frmPersonalInfo').find('[name="IDSecond"]').val());
            data.append("UserId", $('#frmPersonalInfo').find('[name="UserId"]').val());
            data.append("Address", $('#frmPersonalInfo').find('[name="Address"]').val());
            data.append("Day", $('#frmPersonalInfo').find('[name="Day"]').val());
            data.append("Month", $('#frmPersonalInfo').find('[name="Month"]').val());
            data.append("Year", $('#frmPersonalInfo').find('[name="Year"]').val());
            data.append("NationalResidenceCardNumber", $('#frmPersonalInfo').find('[name="NationalResidenceCardNumber"]').val());
            data.append("Nationality", $('#frmPersonalInfo').find('#nationality').val());
            data.append("Gender", $('#frmPersonalInfo').find('[name="Gender"]').val())
            data.append("__RequestVerificationToken", $('input[name="__RequestVerificationToken"]').val())
            $('#frmPersonalInfo').find('[name="personal_picture"]').each(function (i) {
                if ($(this)[0].files.length > 0) {
                    data.append("PersonalPicture", $(this)[0].files[0]);
                }
            });
            $('#frmPersonalInfo').find('[name="PhotoID_Or_NationalCard"]').each(function (i) {
                if ($(this)[0].files.length > 0) {
                    data.append("IDOrNationalCadPicture", $(this)[0].files[0]);
                }
            });
            //console.log(e.target.dataset.url);
            let Url = "/UserPanel/UpdatePersonalInfo";
            callModal.spinner((done) => {
                $.ajax({
                    type: "post",
                    url: Url,
                    data: data,
                    async: true,
                    cache: false,
                    contentType: false,
                    enctype: 'multipart/form-data',
                    processData: false,
                    success: function (result) {
                        if (result.error) {
                            done().then(() => {
                                callModal.fail(result.message, 5000), then(() => {
                                    $("#btnSavePersonalInfo").show();
                                    $("#imgloader").hide();
                                    $("#Mobile").attr("disabled", true);
                                    $(".validationMsg.errors").addClass("show");
                                    $(".validationMsg.errors").html(result.message)
                                });

                            });
                        }
                        else {
                            done().then(() => {
                                if (result.message === "Payment") {
                                    $.get(result.url, function (receive) {
                                        location.href = result.url
                                    });
                                }
                                if (!isNaN(result)) {
                                    let id = result;
                                    $.ajax({
                                        type: "Post",
                                        url: "/UserPanel/RegisterCourse",
                                        data: { id: id },
                                        success: function (data) {
                                            if (!data.error || data.message == 'OK') {
                                                window.location.replace('/UserPanel/Courses?cate=myCourse');
                                            }
                                            else {
                                                callModal.fail(data.message)
                                            }
                                        }
                                    })
                                }
                                else {
                                    callModal.success("ویرایش با موفقیت انجام شد", 5000).then(() => {
                                        $("#btnSavePersonalInfo").show();
                                        location.reload();
                                        $("#imgloader").hide();
                                    });
                                }
                            });
                        }
                    },
                    error: function (result) {
                        done().then(() => {
                            callModal.fail(result.message, 5000).then(() => {
                                $(".validationMsg.errors").addClass("show");
                                $(".validationMsg.errors").html(result.message)
                                $("#Mobile").attr("disabled", true);
                                $("#btnSavePersonalInfo").show();
                                $("#imgloader").hide();
                            });
                        })
                    },
                    complete: () => {

                        $("#btnSavePersonalInfo").show();
                    }
                });
            })

        } else {
            if ($("#IsEmailConfirmed").val() == 'False') {
                console.log("ایمیل فعالسازی نشده است.")
                $('[data-valmsg-for="Email"]').text("ایمیل فعالسازی نشده است.").removeClass('field-validation-valid').addClass('field-validation-error');
            }
            if ($("#IsMobileConfirmed").val() == 'False') {
                console.log("موبایل فعالسازی نشده است.")
                callModal.fail('موبایل فعالسازی نشده است', 5000);
            }
        }
    }

    //send mobile validation conde
    function sendMobileValidationCode(Data) {
        callModal.spinner((closeSpinner) => {
            $.post("/User/VerifyMobileCode",
                Data,
                function (view) {
                    closeSpinner().then(() => {
                        callModal.custom((showModal, closeModal) => {
                            showModal(view);
                            setSmsValidationInput(closeModal);
                        }).then(checkMobileValidation)

                        $.get("/User/GetTimerValue", Data, function (time) {
                            mobileCodeResendTimer(time)
                        });
                    })
                }
            );
        })
    }

    //sms validation
    function setSmsValidationInput(closeModal) {
        dc.queries('input.coupledSms').forEach(item => {
            item.onkeydown = e => {
                if (!/[0-9]/.test(e.key))
                    e.preventDefault()
                else if (e.target.value)
                    e.target.value = '';
            }
            item.onkeyup = e => {
                if (/[0-9]/.test(e.key)) {
                    if (e.target.nextElementSibling) {
                        e.target.nextElementSibling.focus()
                    } else {
                        closeModal()
                    }
                } else {
                    if (e.key === 'Enter')
                        closeModal()
                }
            }
        })
    }
    function mobileCodeResendTimer(i) {
        i = Math.floor(i);
        let timerDone = new Promise((resolve, reject) => {
            let resend = dc.query('.resend');
            resend.innerHTML = 'ارسال مجدد در <span></span> ثانیه...';
            let span = resend.query('.resend span');
            if (i <= 0) {
                resolve(resend);
                return;
            }
            span.innerText = i;
            let timer = setInterval(() => {
                span.innerText = --i;
                if (i <= 0) {
                    clearInterval(timer);
                    resolve(resend);
                }
            }, 1000);
        })

        timerDone.then(resendBtn => {
            resendBtn.innerText = 'ارسال مجدد';
            resendBtn.classList.add('button')
            resendBtn.onclick = e => {
                resendBtn.disabled = true;

                let Data = {
                    iDSecond: $("#IDSecond").val(),
                    Mobile: $("#MobileNumber").val()
                };

                $.post("/User/VerifyMobileCode",
                    Data,
                    function () {
                        resendBtn.disabled = false;
                        resendBtn.classList.remove('button');
                        dc.query('#modal span.alert').classList.add('active');

                        $.get("/User/GetTimerValue", Data, function (time) {
                            mobileCodeResendTimer(time)
                        });
                    }
                );
            }
        })
    }

    //check sms validation input
    function checkMobileValidation() {
        let verifyCode = '';
        let error = false;
        dc.queries('.coupledSms').forEach(i => {
            if (!i.value) error = true;
            verifyCode += i.value
        })
        if (error) return;


        Data = {
            ID: $("#IDSecond").val(),
            VerifyCode: verifyCode

        }
        $.post("/user/ConfirmVerify", Data, function (data) {

            if (!data.result.Error) {
                callModal.success('شماره شما با موفقیت تغییر یافت', 5000).then(() => {
                    window.location.href = "/UserPanel/Profile?cate=editProfile";
                })
            } else {
                callModal.fail('کد وارد شده مطابقت نداشت', 10000);
            }
        })
    }

    //side munu click
    const sideMenu = dc.query('#profile aside');
    sideMenu.onclick = e => {
        if (e.target === sideMenu)
            closeSideMenu()
    };
    function closeSideMenu() {
        sideMenu.classList.remove('active')
        dc.query('#profile header .fa-bars').classList.remove('active')
    }

    //finish signup and money input
    let upload = document.querySelector('.upload');
    if (upload) {
        upload.form = upload.querySelector('form')
        upload.form.button = upload.form.querySelector('button');
        upload.form.img = upload.form.querySelector('input#moneyPic');
        upload.form.checkout = upload.form.querySelector('select');
        upload.form.alert = upload.form.querySelector('.alert');
        upload.form.rules = upload.form.querySelector('#rules');
        upload.form.amount = upload.form.querySelector('input[type="number"]');
        upload.form.price = upload.form.querySelector('p');
        upload.form.price.amount = upload.form.price.querySelector('.amount');
        upload.form.price.type = upload.form.price.querySelector('.type');

        //accep the rules checkbox
        upload.form.rules.onchange = e => upload.form.button.disabled = e.target.checked ? 0 : 1;

        //put the name of uploaded file into the box! (for Receipt pic)
        function inputChangeHandler(item) {
            item.addEventListener('change', (e) => {
                let path = e.target.value.replace(/C:\\fakepath\\/i, "");
                item.parentElement.querySelector('span').innerHTML = path;
            })
        }
        inputChangeHandler(upload.form.moneyPic)

        //submit finish sign up form
        upload.form.onsubmit = (e) => (!upload.form.img.value || !upload.form.amount) && emptyErr(e);

        emptyErr = (e) => {
            upload.form.alert.innerHTML = 'لطفا مبلغ و عکس فیش خود را وارد کنید';
            upload.form.alert.classList.add('show');
            e.preventDefault();
        }
    }

    //copyable
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
        navigator.clipboard.writeText(text)
    }
    dc.queries('.copyable').forEach(item => {
        item.onclick = () => {
            let copyText = item.dataset.copy;

            clipboard(copyText);
            dc.queries('.copied').forEach(i => {
                i.classList.remove('copied')
            })
            item.classList.add('copied');
            setTimeout(() => {
                item.classList.remove('copied')
            }, 3000);
        }
    });

    //! --------  activate current menu item

    //activating links
    dc.queries('#profile aside a').forEach(i => {
        if (i.href === window.location.href.replace('#', ''))
            i.classList.add('active')
    })

    //activate current subCategory from query string
    const params = new URLSearchParams(window.location.search)
    let subCate = params.get('cate')
    if (subCate) {
        dc.id(subCate).classList.add('active')
    }

    // disable a href if already in the page and close the sidemnu on click
    dc.queries('#profile a[data-target]').forEach(i => {
        if (i.href.split('?')[0] === window.location.href.split('?')[0]) {
            i.onclick = e => {
                e.preventDefault()
                history.pushState('', null, i.href);
                closeSideMenu()
            }
        }
    })

    //my course
    let myCourse = dc.query('#profile #myCourse');
    if (myCourse) {
        myCourse.select = myCourse.queries('.course .right .table select');

        // select course type (inPerson vs online)
        myCourse.select.forEach(item => {
            item.onchange = e => {
                ClassParticipationTypeChange(item.dataset.userid, item.dataset.courseid, e.target.value);
            }
        })

        function ClassParticipationTypeChange(userId, courceClassID, type) {
            let obj = {
                userId: userId,
                courceClassID: courceClassID,
                classParticipationState: type
            };
            let url = "/Courses/AddClassParticipationType"
            $.ajax({
                url: url,
                type: "POST",
                data: obj,
                success: function (response) {
                    if (!response.error) {
                        callModal.success('نوع شرکت درکلاس شما با موفقیت ثبت شد!');
                    }
                    else {
                        callModal.fail(response.message, 10000);
                    }
                },
                error: function (err) {
                    callModal.fail(err.statusText, 10000);
                }
            });
        }

        //cancell course signup
        $(document).on("click", "#CancelRegisteration", function () {
            let SU = $(this).attr("data-url");
            let coursename = $(this).attr("data-coursename");
            let SD = $(coursename).serialize();
            callModal.confirm('آیا از انصراف از دوره مطمئن هستید؟').then(sendingdata);

            function sendingdata() {
                $.get(SU, SD, function (rc) {
                    callModal.success(rc, 3000).then(() => {
                        window.location.href = '/Userpanel/Courses?cate=myCourse';
                    })
                })
            };
        });
    }

    //change mobile
    let changeMobile = dc.query('#profile #changeMobile');
    if (changeMobile) {
        let submit = changeMobile.query('button');
        submit.onclick = e => {
            e.preventDefault();
            let editMobileData = {
                IdSecond: $("#IdSecond").val(),
                MobileNumber: $("#MobileNumber").val(),
                UserId: $("#UserId").val()
            }
            let editMobileUrl = "/UserPanel/EditMobileNumber"
            $.post(editMobileUrl, editMobileData, function (receiveData) {
                if (receiveData.error) {
                    callModal.fail(receiveData.message[0]);
                }
                else {
                    validateSection(changeMobile).then(_ => {

                        let Data = {
                            iDSecond: $("#IDSecond").val(),
                            Mobile: $("#MobileNumber").val()
                        };

                        sendMobileValidationCode(Data);
                    })
                }
            })


        }
    }


    /*    --change password----*/

    /* --personal info--*/




    if ($('#nationality').val() == "ایرانی") {
        $('#ContForeigners').hide();
        $('#ContNationalCode').show();
    }
    else {
        $('#ContForeigners').hide();
        $('#ContForeigners').show();
    }


    /*  -----*/
    $(document).on("submit", "#frmDeposit", function (e) {
        let url = $("#frmDeposit").attr("data-url");
        e.preventDefault(0);
        var data = new FormData();
        $("#imgloader").removeAttr("hidden");
        $("#frmDepositSubmit").hide();
        if ($(".courseRegistrationId").length) {
            data.append("CourseClassName", $(".courseRegistrationId")[0].innerText);
            data.append("CourseClassId", $(".courseRegistrationId").val())
        }
        else {
            data.append("CourseClassName", $("#courseClassName")[0].innerHTML);
            data.append("CourseClassId", $("#CourseClassId").val());
        }
        data.append("UserId", $("#UserId").val());
        data.append("CourseClassAmount", $("#DepositCourseClassAmount").val());
        data.append("AcceptingTheRules", $("#frmDeposit").find('[Name="AcceptingTheRules"]').is(":checked"));
        $('#frmDeposit').find('[name="DepositSlipPicture"]').each(function (i) {
            if ($(this)[0].files.length > 0) {
                data.append("DepositSlipPicture", $(this)[0].files[0]);
                console.log($(this)[0].files[0]);
            }
        });
        callModal.spinner((done) => {

            $.ajax({
                url: url,
                type: "POST",
                data: data,
                async: true,
                cache: false,
                contentType: false,
                enctype: 'multipart/form-data',
                processData: false,
                success: function (response) {
                    console.log(response)
                    if (!response.error) {
                        done().then(() => {
                            $("#frmDepositSubmit").attr("disabled", "true");
                            $('#rules').prop('checked', false);
                            $(".alert").removeClass("show");
                            callModal.success("فیش واریزی با موفقیت ارسال شد", 3000).then(() => {
                                location.reload();
                            })
                            $("#imgloader").hide();
                            $("#frmDepositSubmit").show();
                            $("#DepositCourseClassAmount").val(" ")
                        })
                    }
                    else {
                        done().then(() => {
                            $(".alert").html(response.message);
                            $(".alert").addClass("show");
                            $("#imgloader").hide();
                            $("#frmDepositSubmit").show();
                        })
                    }
                },
                error: function (response) {
                    callModal.notif(response.message, 5000);
                }
            });
        })
    })
    $(document).on("click", "#frmDepositEditBtn", function () {

        var data = new FormData();
        if ($(".courseRegistrationId").length) {
            data.append("CourseClassId", $(".courseRegistrationId").val())
        }
        else {

            data.append("CourseClassId", $('#frmDeposit').find('[name="CourseClassId"]').val());
        }

        data.append("UserId", $('#frmDeposit').find('[name="UserId"]').val());
        data.append("CourseClassAmount", $('#frmDeposit').find('[name="DepositAmount"]').val());
        data.append("DepositId", $('#frmDeposit').find('[name="DepositId"]').val());
        data.append("DepositSlipPictureUrl", $('#frmDeposit').find('[name="DepositSlipPictureImg"]').attr("src"));
        data.append("AcceptingTheRules", $('#frmDeposit').find('[name="AcceptingTheRules"]').is(":checked"));
        let url = $("#frmDeposit").attr("data-url");
        $('#frmDeposit').find('[name="DepositSlipPicture"]').each(function (i) {
            console.log($(this)[0].files.length + "files length");
            if ($(this)[0].files.length > 0) {
                console.log($(this)[0].files[0] + "files");
                data.append("DepositSlipPicture", $(this)[0].files[0]);
                console.log($('#frmDeposit').find('[name="DepositSlipPicture"]').val())
            }
        });
        $.ajax({
            url: url,
            data: data,
            type: "POST",
            async: true,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (response) {
                if (!response.error) {
                    callModal.success(response.message).then(() => { location.reload(); })
                }
                else {
                    callModal.fail(response.message)
                }
            }
        })
    })
    $('.pastRecord .table .deleteDeposit').each(function () {
        $(this).click(function (e) {
            e.preventDefault();
            let url = $("#frmDeposit").attr("data-urlDelete");
            let dpositId = e.target.dataset["depositid"]
            callModal.confirm("ایا واقعا قصد پاک کردن منو داری؟").then(() => {
                $.ajax({
                    url: url,
                    data: { depositId: dpositId },
                    type: "POST",
                    success: function (response) {
                        console.log(response.error)
                        if (!response.error) {
                            callModal.success(response.message).then(() => { location.reload() })
                        }
                        else {
                            callModal.fail(response.message)
                        }
                    },
                    error: function (response) {
                        alert("fail")
                        callModal.fail(response.message)
                    }
                })
            })
        })
    });


    let repeatRegister = $(".repeatRegister");
    let CourseClassId = repeatRegister.attr("data-CourseClassId");
    repeatRegister.click(function () {

        RepeatRegister(CourseClassId);
    });
    async function RepeatRegister(coreseId) {

        let url = repeatRegister.attr("data-url");
        callModal.spinner((done) => {
            $.ajax({
                url: url,
                type: "POST",
                data: { id: coreseId },
                success: function (response) {
                    if (!response.error) {
                        done().then(() => { callModal.success(response.message).then(() => { location.reload() }) });
                    }
                    else {
                        done().then(() => { callModal.fail(response.message) });
                    }
                },
                error: function (response) {
                    done().then(() => { callModal.fail(response.message) });
                }
            })
        });
    }


    /*   --change password---*/
    $('#btnChangePassword').click(function (e) {
        e.preventDefault();

        var data = {
            IDSecond: $('#IDSecond').val(),
            Password: $('#Password').val(),
            CurrentPassword: $('#CurrentPassword').val()
        };
        let changePasword = $("#btnChangePassword").attr("data-changePasword");

        $.post(changePasword, data, function (receiveData) {
            console.log(receiveData)
            if (!receiveData.Error) {
                callModal.success("کلمه عبور شما با موفقیت تغیر کرد").then(() => {
                    $('#Password').val("");
                    $('#CurrentPassword').val("");
                    $('#ConfirmPassword').val("")
                });
            }
            else {
                callModal.fail(receiveData.ErrorMessage[0]);
            }
        });

    })

    //dark mode code
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    if (getCookie('darkMode')) {
        if (getCookie('darkMode') == 'true') {
            $('#profile').addClass('dark');
        }
    }
    //if (localStorage.getItem('darkMode') && localStorage.getItem('darkMode') == 'true') {
    //    $('#profile').toggleClass('dark');
    //}
    $('#darkBtn').click(function () {
        if (getCookie('darkMode') && getCookie('darkMode') == 'true') {
            setCookie('darkMode', 'false', 30);
            $('#profile').removeClass('dark');
            return;
        }
        setCookie('darkMode', 'true', 30);
        $('#profile').addClass('dark');
    })

    //------------------------------------------------------------------------------------
    //copy license
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

    $('[data-license]').on('click', function (e) {
        clipboard(e.target.dataset.license);
        e.target.classList.add('copied');

        setTimeout(() => {
            e.target.classList.remove('copied');
        }, 2000);
    })

    // hide aside if click out of aside
    if (window.innerWidth < 698) {
        document.addEventListener('click', function (e) {
            const aside = document.querySelector('#profile aside');
            const showAsideBtn = document.querySelector('.right .fa-bars');
            if (e.target !== aside && !aside.contains(e.target) && e.target !== showAsideBtn && !showAsideBtn.contains(e.target)) {
                aside.classList.remove('active');
            }
        })
    }
    window.addEventListener('resize', function () {
        if (window.innerWidth < 698) {
            document.addEventListener('click', function (e) {
                const aside = document.querySelector('#profile aside');
                const showAsideBtn = document.querySelector('.right .fa-bars');
                if (e.target !== aside && !aside.contains(e.target) && e.target !== showAsideBtn && !showAsideBtn.contains(e.target)) {
                    aside.classList.remove('active');
                }
            })
        }
    })


    respondToVisibility("[data-src]", function (element) {
        $(element).attr("src", $(element).data("src"));
        $(element).removeAttr("data-src");
    });
});