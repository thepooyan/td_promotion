"use strict";

$(function () {
    //close modal
    var modal = document.querySelector(".modal");
    if (modal) {
        (function () {
            var modalContent = modal.querySelector(".modal-content");
            var understoodBtn = modal.querySelector(".understood-btn");
            var errorModal = modal.querySelector(".error-modal");
            understoodBtn.addEventListener("click", function () {
                modal.classList.add("hide");
            });

            window.addEventListener("click", function (e) {
                if (!modalContent.contains(e.target)) {
                    modal.classList.add("hide");
                }
            });
        })();
    }

    var formLoginRegister = document.querySelector(".container-login-register form");
    if (formLoginRegister) {
        setValidations(formLoginRegister);
        formLoginRegister.onsubmit = function (e) {
            e.preventDefault();
            validateSection(formLoginRegister).then(function () {
                formLoginRegister.submit();
            })["catch"](function () {
                callModal.fail('لطفا اطلاعات خود را تکمیل کنید');
            });
        };
    }

    var captcha = document.querySelector("[href='#CaptchaImage']");
    if (captcha) {
        captcha.addEventListener('click', function (e) {
            e.preventDefault();
        });
    }
});

