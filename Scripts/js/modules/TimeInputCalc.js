//*Time Input Calc
"use strict";

var setCounterDate = function setCounterDate(date) {
    var DateParse = function DateParse(string) {
        var y = string.match(/[0-9]+(?=\/?)/g)[2];
        var m = string.match(/[0-9]+(?=\/?)/g)[0];
        var d = string.match(/[0-9]+(?=\/?)/g)[1];

        y = parseInt(y);
        m = parseInt(m);
        d = parseInt(d);
        var result = { year: y, mounth: m, day: d };
        return result;
    };
    date = DateParse(date);
    var countDownDate = new Date(date.year, date.mounth - 1, date.day).getTime();
    var remainingTime;
    return remainingTime = function () {
        var now = new Date().getTime();
        var timeleft = countDownDate - now;
        var remTime = {
            days: Math.floor(timeleft / (1000 * 60 * 60 * 24)),
            hours: Math.floor(timeleft % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
            minutes: Math.floor(timeleft % (1000 * 60 * 60) / (1000 * 60)),
            seconds: Math.floor(timeleft % (1000 * 60) / 1000)
        };
        Object.entries(remTime).filter(function (key, val) {
            if (val < 0) remTime[key] = 0;
        });
        return remTime;
    };
};
window.setCounterDate = setCounterDate;

