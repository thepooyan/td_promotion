//* CLICKER
"use strict";

function refreshOnClicks() {
    //onClick
    var clicker = dc.queries("[data-onClick]");

    clicker.forEach(function (item) {
        if (item.clickEvent) return;
        item.clickEvent = true;

        if (item.getAttribute('data-group')) {

            item.addEventListener("click", function () {
                dc.queries("[data-group=" + item.getAttribute('data-group')).forEach(function (item) {
                    item.classList.remove(item.getAttribute("data-onClick"));
                });
                item.classList.toggle(item.getAttribute("data-onClick"));
            });
        } else {

            item.addEventListener("click", function (e) {
                item.classList.toggle(item.getAttribute("data-onClick"));
            });
        }
    });

    //* Target system (grouped and single)
    debugger;
    var targeter = document.querySelectorAll('[data-target]');
    targeter.forEach(function (i) {
        debugger;
        if (i.targetEvent) return;

        var targetValue = i.dataset.targetvalue || "active";
        var targetSelector = document.querySelectorAll(i.dataset.target);
        //console.log(targetSelector);
        if (!targetSelector.length) return;
        targetSelector.forEach(function (target) {
            //console.log(target);
            if (target.dataset.group) {

                i.addEventListener("click", function () {
                    document.querySelectorAll("[data-group=" + target.dataset.group + "]").forEach(function (item) {
                        item.classList.remove(targetValue);
                    });
                    target.classList.add(targetValue);
                });
            } else {

                i.addEventListener("click", function (e) {
                    target.classList.toggle(targetValue);
                });
            }
        });
        i.targetEvent = true;
    });
}
setTimeout(function () {
    refreshOnClicks();
}, 1000);

