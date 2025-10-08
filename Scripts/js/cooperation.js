'use strict';

$(function () {
    setValidations();
    initCustomSelect();

    var cooperationForm = dc.query('#cooperationForm');
    if (cooperationForm) {

        var myClearForm = function myClearForm() {
            cooperationForm.reset();
            clearValidationAlerts(cooperationForm);
            cooperationForm.querySelectorAll('select').forEach(function (i) {
                i.onchange();
            });
        };

        cooperationForm.onsubmit = function (e) {
            //check if form info is correct
            validateSection(cooperationForm)['catch'](function () {
                e.preventDefault();
                callModal.fail('لطفا اطلاعات خود را بصورت کامل وارد کنید');
            });
        };
    }

    //group checkbox
    dc.queries('input[type="checkbox"][data-groupWith]').forEach(function (item) {
        var groupName = item.dataset.groupwith;
        var group = dc.queries('[data-groupWith="' + groupName + '"]');
        if (!group) return;
        item.addEventListener("change", function () {
            group.forEach(function (i) {
                return i.checked = false;
            });
            item.checked = true;
        });
    });

    var teacherCarousel = dc.query('#cooperation > .teachers.owl-carousel');
    if (teacherCarousel) {
        $(teacherCarousel).owlCarousel({
            autoWidth: false,
            rtl: true,
            nav: true,
            items: 1,
            loop: true,
            autoplay: true,
            navText: '',
            autoplayTimeout: 3200,
            autoplayHoverPause: true,
            autoplaySpeed: 900
        });
    }

    //var commonQ = dc.queries('.commonQ .Q');
    //if (commonQ) {
    //    commonQ.forEach(function (Q) {
    //        Q.onclick = function (_) {
    //            Q.nextElementSibling.classList.toggle('active');
    //            Q.classList.toggle('active');
    //        };
    //    });
    //}

    //input type type file => type check
    var fileTypeCheck = dc.queries('input[type="file"][data-typecheck]');
    fileTypeCheck.forEach(function (i) {
        var type = i.dataset.typecheck.toLowerCase();

        i.addEventListener('change', function (e) {
            var value = e.target.value;
            value = value.split('\\').at(-1);
            var extention = value.split('.').at(-1);
            if (extention !== type) {
                callModal.fail('نوع فایل انتخابی باید از نوع ' + type + ' باشد');
                e.target.value = '';
            }
        });
    });

    //input type file => label
    var fileInput = dc.queries('input[type="file"]');
    fileInput.forEach(function (i) {
        var label = i.nextElementSibling;
        if (!label || !label.classList.contains('fileLabel')) return;

        i.addEventListener('change', function (e) {
            var value = e.target.value;
            value = value.split('\\').at(-1);
            if (!value) value = 'choose file...';
            label.innerText = value;
        });
    });
});

