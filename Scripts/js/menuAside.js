"use strict";

var dropdownItems = document.querySelectorAll(".items-menu-inner .dropdown");
dropdownItems.forEach(function (item) {

    var dropdownNav = item.querySelector(".items-menu-inner .dropdown >a");
    dropdownNav.addEventListener("click", function (e) {
        e.preventDefault();
    });

    item.addEventListener("click", function () {
        this.classList.toggle("open");
    });
});

