'use strict';

(function () {
    //! ------my validation
    function checkValidation(element) {
        var vaidationProiorities = {
            notEmpty: 0,
            number: 1,
            email: 1,
            NEQ: 1,
            length: 2,
            noSpace: 3,
            usePersian: 4
        };

        var validation = JSON.parse(element.dataset.validate);
        var msgBox = element.nextElementSibling;
        element.errorList = {};
        if (element.classList.contains('noValidate')) return;
        function addError(err, msg) {
            element.errorList[err] = { order: vaidationProiorities[err], content: msg };
        }
        function removeError(key) {
            delete element.errorList[key];
        }
        function errorCheck(condition, msg, vali, proiority) {
            if (typeof condition === 'function') condition = condition();
            if (condition) {
                addError(vali, msg, proiority);
            } else {
                removeError(vali);
            }
        }
        function validateEmail(email) {
            return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        }
        function runValidation(vali, value) {
            switch (vali) {
                case 'notEmpty':
                    errorCheck(value === '', 'لطفا کادر را خالی نگذارید!', vali);
                    break;
                case 'length':
                    if (element.dataset.length) errorCheck(value.length != element.dataset.length, 'طول کاراکتر وارد شده باید ' + element.dataset.length + ' باشد', vali);

                    if (element.dataset.minlength) errorCheck(value.length < element.dataset.minlength, 'طول کاراکتر وارد شده باید بیشتر از ' + element.dataset.minlength + ' باشد', vali);

                    if (element.dataset.maxlength) errorCheck(value.length > element.dataset.maxlength, 'طول کاراکتر وارد شده باید کمتر از ' + element.dataset.maxlength + ' باشد', vali);

                    break;
                case 'number':
                    errorCheck(function (_) {
                        return isNaN(value);
                    }, 'فرمت کاراکتر وارد شده صحیح نمیباشد', vali);
                    break;
                case 'email':
                    errorCheck(function (_) {
                        return !validateEmail(value);
                    }, 'ایمیل وارد شده نادرست میباشد', vali);
                    break;
                case 'NEQ':
                    var errorMsg = 'مقدار نمی‌تواند برابر با ' + element.dataset.neq + ' باشد';
                    if (element.dataset.neqerror) {
                        errorMsg = element.dataset.neqerror;
                    }
                    errorCheck(value === element.dataset.neq, errorMsg, vali);
                    break;
                case 'EQU':
                    var equ = undefined;
                    if (element.dataset.equ.startsWith('ele=>')) {
                        var query = element.dataset.equ.substring(5);
                        var target = dc.query(query);
                        equ = target.value || target.innerHTML;
                    } else {
                        equ = element.dataset.equ;
                    }
                    errorCheck(value !== equ, 'تکرار کلمه عبور مطابقت ندارد', vali);
                    break;
                case 'noSpace':
                    errorCheck(value.includes(' '), 'لطفا از فاصله استفاده نکنید', vali);
                    break;
                case 'usePersian':
                    var persianChar = new RegExp('[؀-ۿ]');
                    errorCheck(!persianChar.test(value), 'لطفا از کیبرد فارسی استفاده کنید', vali);
                    break;
            }
        }
        if (!msgBox || !msgBox.classList.contains('validationMsg')) {
            console.log(element);
            console.log('above logged input has no validation box. do not interfier with creation of span with \'validationMsg\' class');
            return;
        }
        validation.forEach(function (vali) {
            runValidation(vali, element.value);
        });
    }
    function alertValidationErrs(element, reject) {
        var msgBox = element.nextElementSibling;
        if (Object.keys(element.errorList).length === 0) {
            msgBox.classList.remove('show');
            element.classList.remove('validationError');
        } else {
            (function () {
                var HigherOrder = Object.values(element.errorList).reduce(function (p, c) {
                    return p.order < c.order ? p : c;
                }).order;
                var targetErrors = Object.values(element.errorList).filter(function (i) {
                    return i.order === HigherOrder;
                });
                targetErrors.forEach(function (i, index) {
                    if (index === 0) {
                        /*editNumber*/
                        msgBox.innerHTML = i.content;
                    } else {
                        msgBox.innerHTML += ' و ' + i.content;
                    }
                    msgBox.classList.add('show');
                    element.classList.add('validationError');
                    reject && reject();
                });
            })();
        }
    }
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    //*validate section
    function validateSection(section) {
        return new Promise(function (resolve, reject) {
            section.querySelectorAll('[data-validate]').forEach(function (i) {
                checkValidation(i);
                alertValidationErrs(i, reject);
            });
            resolve();
        });
    }
    //* set all vaidations
    function setValidations() {
        dc.queries('[data-validate]').forEach(function (i) {

            var msgBox = i.nextElementSibling;
            if (!msgBox || !msgBox.classList.contains('validationMsg')) {
                msgBox = document.createElement('span');
                msgBox.classList.add('validationMsg');
                insertAfter(i, msgBox);
            }
            i.onchange = function () {
                checkValidation(i);
                alertValidationErrs(i);
            };
        });
    }
    function clearValidationAlerts(section) {
        section.querySelectorAll('.validationError').forEach(function (i) {
            i.classList.remove('validationError');
        });
        section.querySelectorAll('.validationMsg.show').forEach(function (i) {
            i.classList.remove('show');
        });
    }
    window.clearValidationAlerts = clearValidationAlerts;
    window.setValidations = setValidations;
    window.validateSection = validateSection;
})();

