"use strict";

$(function () {
    //* Res menu handler
    var resMenu = document.getElementById("resMenu");
    if (resMenu) {
        var openResMenu = function openResMenu() {
            document.getElementById("resMenu").style.width = "320px";
            dc.query('#resMenu + .overlay').classList.add('active');
        };

        var closeResMenu = function closeResMenu() {
            document.getElementById("resMenu").style.width = "0";
            dc.query('#resMenu + .overlay').classList.remove('active');
        };

        document.getElementById("resOpen").addEventListener("click", openResMenu);
        var resClose = document.getElementById("resClose");
        if (resClose) {
            resClose.addEventListener("click", closeResMenu);
        }

        dc.query('#resMenu + .overlay').addEventListener('click', closeResMenu);
    }

    //? res menu course handler
    var courseL1 = document.getElementsByClassName("courseSelector");

    for (var i = 0; i < courseL1.length; i++) {
        courseL1[i].addEventListener("click", function () {
            document.getElementById(this.dataset.linkto).classList.remove("noDisplay");
            document.getElementsByClassName("OriginContent")[0].classList.add("out");
            document.getElementsByClassName("crossContent")[0].classList.add("in");
        });
    }
    var backToRes = document.getElementById("backToRes");
    if (backToRes) {
        document.getElementById("backToRes").addEventListener("click", function () {
            var courseL2 = dc.query(".crossContent ul:not(.noDisplay)");
            courseL2.classList.add("noDisplay");
            document.getElementsByClassName("OriginContent")[0].classList.remove("out");
            document.getElementsByClassName("crossContent")[0].classList.remove("in");
        });
    }

    //* Collapsible
    var coll = document.getElementsByClassName("collapsible");
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }

    if (document.querySelector('.left-header .left div a').getAttribute('href').length && document.querySelector('.left-header .left div a').getAttribute('href') !== "/Users/Login.aspx") {
        document.getElementById("resMenu").classList.add('loggedIn');
    }
});

