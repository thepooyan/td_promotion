/************************************************************************
*************************************************************************
@Name :       	jRating - jQuery Plugin
@Revison :    	3.0
@Date : 		28/01/2013 
@Author:     	 ALPIXEL - (www.myjqueryplugins.com - www.alpixel.fr) 
@License :		 Open Source - MIT License : http://www.opensource.org/licenses/mit-license.php
**************************************************************************
*************************************************************************/
(function(n) {
    n.fn.jRating = function(t) {
        var i = {
            bigStarsPath: "jquery/icons/stars.png",
            smallStarsPath: "jquery/icons/small.png",
            phpPath: "php/jRating.php",
            type: "big",
            step: !1,
            isDisabled: !1,
            showRateInfo: !0,
            canRateAgain: !1,
            length: 5,
            decimalLength: 0,
            rateMax: 20,
            rateInfosX: -45,
            rateInfosY: 5,
            nbRates: 1,
            onSuccess: null,
            onError: null
        };
        if (this.length > 0)
            return this.each(function() {
                function c(n) {
                    var i = parseFloat(n * 100 / s * r.rateMax / 100), t;
                    switch (r.decimalLength) {
                    case 1:
                        t = Math.round(i * 10) / 10;
                        break;
                    case 2:
                        t = Math.round(i * 100) / 100;
                        break;
                    case 3:
                        t = Math.round(i * 1e3) / 1e3;
                        break;
                    default:
                        t = Math.round(i * 1) / 1
                    }
                    return t
                }
                function k() {
                    switch (r.type) {
                    case "small":
                        f = 12;
                        e = 10;
                        h = r.smallStarsPath;
                        break;
                    default:
                        f = 23;
                        e = 20;
                        h = r.bigStarsPath
                    }
                }
                function l(n) {
                    return n ? n.offsetLeft + l(n.offsetParent) : 0
                }
                var r = n.extend(i, t), u = 0, f = 0, e = 0, h = "", a = !1, v = 0, y = r.nbRates, p;
                p = n(this).hasClass("jDisabled") || r.isDisabled ? !0 : !1;
                k();
                n(this).height(e);
                var o = parseFloat(n(this).attr("data-average"))
                  , w = parseInt(n(this).attr("data-id"))
                  , s = f * r.length
                  , b = o / r.rateMax * s
                  , d = n("<div>", {
                    "class": "jRatingColor",
                    css: {
                        width: b
                    }
                }).appendTo(n(this))
                  , o = n("<div>", {
                    "class": "jRatingAverage",
                    css: {
                        width: 0,
                        top: -e
                    }
                }).appendTo(n(this))
                  , g = n("<div>", {
                    "class": "jStar",
                    css: {
                        width: s,
                        height: e,
                        top: -(e * 2),
                        background: "url(" + h + ") repeat-x"
                    }
                }).appendTo(n(this));
                n(this).css({
                    width: s,
                    overflow: "hidden",
                    zIndex: 1,
                    position: "relative"
                });
                p || n(this).unbind().bind({
                    mouseenter: function(t) {
                        var i = l(this), u = t.pageX - i, f;
                        r.showRateInfo && (f = n("<p>", {
                            "class": "jRatingInfos",
                            html: c(u) + ' <span class="maxRate">/ ' + r.rateMax + "<\/span>",
                            css: {
                                top: t.pageY + r.rateInfosY,
                                left: t.pageX + r.rateInfosX
                            }
                        }).appendTo("body").show())
                    },
                    mouseover: function() {
                        n(this).css("cursor", "pointer")
                    },
                    mouseout: function() {
                        n(this).css("cursor", "default");
                        a ? o.width(v) : o.width(0)
                    },
                    mousemove: function(t) {
                        var e = l(this)
                          , i = t.pageX - e;
                        u = r.step ? Math.floor(i / f) * f + f : i;
                        o.width(u);
                        r.showRateInfo && n("p.jRatingInfos").css({
                            left: t.pageX + r.rateInfosX
                        }).html(c(u) + ' <span class="maxRate">/ ' + r.rateMax + "<\/span>")
                    },
                    mouseleave: function() {
                        n("p.jRatingInfos").remove()
                    },
                    click: function(t) {
                        var f = this, i;
                        if (a = !0,
                        v = u,
                        y--,
                        (!r.canRateAgain || parseInt(y) <= 0) && n(this).unbind().css("cursor", "default").addClass("jDisabled"),
                        r.showRateInfo && n("p.jRatingInfos").fadeOut("fast", function() {
                            n(this).remove()
                        }),
                        t.preventDefault(),
                        i = c(u),
                        o.width(u),
                        n(".datasSent p").html("<strong>idBox : <\/strong>" + w + "<br /><strong>rate : <\/strong>" + i + "<br /><strong>action :<\/strong> rating"),
                        n(".serverResponse p").html("<strong>Loading...<\/strong>"),
                        r.onSuccess)
                            r.onSuccess(f, i);
                        if (r.onError)
                            r.onError(f, i)
                    }
                })
            })
    }
}
)(jQuery);
"use strict";
(function() {
    function u(t, i) {
        return n(t.getElementById(i))
    }
    function t(t, i) {
        return n(t.querySelector(i))
    }
    function i(t, i) {
        return n(t.querySelectorAll(i))
    }
    function n(n) {
        if (n)
            return n.query = function(i) {
                return t(n, i)
            }
            ,
            n.queries = function(t) {
                return i(n, t)
            }
            ,
            n
    }
    var r = {
        query: function(n) {
            return t(document, n)
        },
        queries: function(n) {
            return i(document, n)
        },
        id: function(n) {
            return u(document, n)
        }
    };
    window.dc = r
}
)();
"use strict";
var setCounterDate = function(n) {
    var i = function(n) {
        var t = n.match(/[0-9]+(?=\/?)/g)[2]
          , i = n.match(/[0-9]+(?=\/?)/g)[0]
          , r = n.match(/[0-9]+(?=\/?)/g)[1];
        return t = parseInt(t),
        i = parseInt(i),
        r = parseInt(r),
        {
            year: t,
            mounth: i,
            day: r
        }
    }, t;
    return n = i(n),
    t = new Date(n.year,n.mounth - 1,n.day).getTime(),
    function() {
        var r = (new Date).getTime()
          , n = t - r
          , i = {
            days: Math.floor(n / 864e5),
            hours: Math.floor(n % 864e5 / 36e5),
            minutes: Math.floor(n % 36e5 / 6e4),
            seconds: Math.floor(n % 6e4 / 1e3)
        };
        return Object.entries(i).filter(function(n, t) {
            t < 0 && (i[n] = 0)
        }),
        i
    }
};
window.setCounterDate = setCounterDate;
"use strict";
function initCustomSelect() {
    var n = arguments.length <= 0 || arguments[0] === undefined ? "select" : arguments[0];
    document.querySelectorAll("." + n).forEach(function(t) {
        if (!t.alreadyInit) {
            var r = document.createElement("span")
              , u = document.createElement("div")
              , f = t.querySelectorAll("option")
              , i = t.querySelector("select");
            i && f.length ? function() {
                var e = function() {
                    var n = t.getBoundingClientRect().y
                      , r = window.innerHeight / 2 - n
                      , u = window.innerHeight - n
                      , i = 50;
                    r > 0 ? (t.style.setProperty("--height", u - i + "px"),
                    t.classList.add("bottom"),
                    t.classList.remove("top")) : (t.style.setProperty("--height", n - i + "px"),
                    t.classList.add("top"),
                    t.classList.remove("bottom"));
                    t.classList.toggle("active")
                }
                  , o = function() {
                    t.classList.remove("top");
                    t.classList.remove("bottom");
                    t.classList.remove("active")
                }
                  , n = Object.values(f).find(function(n) {
                    return n.value === i.value
                });
                u.classList.add("list");
                t.value = n.value;
                r.innerText = n.innerHTML;
                f.forEach(function(n) {
                    var f = document.createElement("span");
                    f.innerHTML = n.innerHTML;
                    f.onclick = function() {
                        r.innerHTML = n.innerHTML;
                        t.value = n.value;
                        t.onchange && t.onchange({
                            target: i
                        });
                        i.value = n.value;
                        i.onchange && i.onchange({
                            target: i
                        })
                    }
                    ;
                    u.appendChild(f)
                });
                t.appendChild(r);
                t.appendChild(u);
                document.addEventListener("click", function(n) {
                    t.contains(n.target) ? e() : o()
                })
            }() : console.log('there should be a select tag inside <div class="' + n + '">...<\/div> for custom select to work.\nskipping this element:', t);
            t.alreadyInit = !0
        }
    })
}
initCustomSelect();
window.initCustomSelect = initCustomSelect;
"use strict";
$(function() {
    var n = document.getElementById("search");
    n && function() {
        var s = function(n) {
            clearTimeout(u);
            n.target.value.length > 2 && n.target.value !== r && (u = setTimeout(function() {
                h(n.target.value).then(c)
            }, 500));
            n.key === "Enter" && f(n.target.value)
        }, f = function(n) {
            if (n)
                if (t) {
                    if (t.searchText === n) {
                        var r = t.map(function(n) {
                            return n.Type
                        });
                        i(r, r[0], t.searchText);
                        location.href = "/search"
                    }
                } else
                    i(null, null, n),
                    location.href = "/search"
        }, h = function(t) {
            return r = t,
            n.classList.add("loading"),
            new Promise(function(i, u) {
                var f = {
                    searchText: t
                };
                $.get("/Home/HomeSearch", f, function(f) {
                    f.searchText = t;
                    r === t ? (i(f),
                    n.classList.remove("loading")) : u()
                })
            }
            )
        }, c = function(n) {
            if (n.length <= 1)
                return l(n);
            t = n;
            var r = document.createDocumentFragment();
            n.forEach(function(t) {
                var u = document.createElement("a");
                u.href = t.Href;
                u.innerHTML = "نتایج برای " + t.searchText + " در دسته <span>" + t.CategoryName + "<\/span>";
                u.dataset.icon = t.Icon;
                u.dataset.type = t.Type;
                u.onclick = function() {
                    var r = n.map(function(n) {
                        return n.Type
                    });
                    i(r, t.Type, t.searchText)
                }
                ;
                r.appendChild(u)
            });
            a(o, r)
        }, l = function(n) {
            var t = document.createElement("span");
            t.innerText = "متاسفانه نتیجه ای برای " + n.searchText + " یافت نشد! :/";
            o.replaceChildren(t)
        }, a = function(n, t) {
            n.childElementCount > 0 ? n.replaceChildren(t) : n.appendChild(t)
        }, i = function(n, t, i) {
            localStorage.setItem("activeCategories", n);
            localStorage.setItem("type", t);
            localStorage.setItem("searchText", i)
        }, e = n.querySelector("input"), o = n.querySelector("ul"), v = n.querySelector("img"), r = undefined, t = undefined, u;
        e.onkeyup = s;
        v.onclick = function() {
            return f(e.value)
        }
        ;
        u = undefined
    }()
});
"use strict";
function refreshOnClicks() {
    var t = dc.queries("[data-onClick]"), n;
    t.forEach(function(n) {
        n.clickEvent || (n.clickEvent = !0,
        n.getAttribute("data-group") ? n.addEventListener("click", function() {
            dc.queries("[data-group=" + n.getAttribute("data-group")).forEach(function(n) {
                n.classList.remove(n.getAttribute("data-onClick"))
            });
            n.classList.toggle(n.getAttribute("data-onClick"))
        }) : n.addEventListener("click", function() {
            n.classList.toggle(n.getAttribute("data-onClick"))
        }))
    });
    n = document.querySelectorAll("[data-target]");
    n.forEach(function(n) {
        if (!n.targetEvent) {
            var t = n.dataset.targetvalue || "active"
              , i = document.querySelectorAll(n.dataset.target);
            i.length && (i.forEach(function(i) {
                i.dataset.group ? n.addEventListener("click", function() {
                    document.querySelectorAll("[data-group=" + i.dataset.group + "]").forEach(function(n) {
                        n.classList.remove(t)
                    });
                    i.classList.add(t)
                }) : n.addEventListener("click", function() {
                    i.classList.toggle(t)
                })
            }),
            n.targetEvent = !0)
        }
    })
}
setTimeout(function() {
    refreshOnClicks()
}, 1e3);
"use strict";
function respondToVisibility(n, t) {
    function r(n) {
        var i = {
            root: h,
            rootMargin: s + "px 0px"
        }
          , r = new IntersectionObserver(function(i, r) {
            i.forEach(function(i) {
                i.isIntersecting && (t(n),
                o && r.disconnect())
            })
        }
        ,i);
        r.observe(n)
    }
    var i = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2]
      , u = i.once
      , o = u === undefined ? !0 : u
      , f = i.offset
      , s = f === undefined ? 0 : f
      , e = i.root
      , h = e === undefined ? null : e;
    switch (typeof n) {
    case "string":
        document.querySelectorAll(n).forEach(function(n) {
            return r(n)
        });
        break;
    case "object":
        if (n.nodeName) {
            r(n);
            break
        }
        if (n[0].nodeName) {
            n.forEach(function(n) {
                return r(n)
            });
            break
        }
    default:
        throw new Error('please pass an html element or a valid query string to "respondToVisibility" funtion');
    }
}
function isInViewport(n, t, i) {
    var r = new IntersectionObserver(function(n) {
        n.forEach(function(n) {
            n.isIntersecting ? t(n.target) : i(n.target)
        })
    }
    ,{
        threshold: .1
    });
    r.observe(n)
}
window.respondToVisibility = respondToVisibility;
window.isInViewport = isInViewport;
/**
 * Swiper 6.6.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2021 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: May 19, 2021
 */

!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper = t()
}(this, (function() {
    "use strict";
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i)
        }
    }
    function t() {
        return (t = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = arguments[t];
                for (var i in a)
                    Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i])
            }
            return e
        }
        ).apply(this, arguments)
    }
    function a(e) {
        return null !== e && "object" == typeof e && "constructor"in e && e.constructor === Object
    }
    function i(e, t) {
        void 0 === e && (e = {}),
        void 0 === t && (t = {}),
        Object.keys(t).forEach((function(s) {
            void 0 === e[s] ? e[s] = t[s] : a(t[s]) && a(e[s]) && Object.keys(t[s]).length > 0 && i(e[s], t[s])
        }
        ))
    }
    var s = {
        body: {},
        addEventListener: function() {},
        removeEventListener: function() {},
        activeElement: {
            blur: function() {},
            nodeName: ""
        },
        querySelector: function() {
            return null
        },
        querySelectorAll: function() {
            return []
        },
        getElementById: function() {
            return null
        },
        createEvent: function() {
            return {
                initEvent: function() {}
            }
        },
        createElement: function() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function() {},
                getElementsByTagName: function() {
                    return []
                }
            }
        },
        createElementNS: function() {
            return {}
        },
        importNode: function() {
            return null
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };
    function r() {
        var e = "undefined" != typeof document ? document : {};
        return i(e, s),
        e
    }
    var n = {
        document: s,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState: function() {},
            pushState: function() {},
            go: function() {},
            back: function() {}
        },
        CustomEvent: function() {
            return this
        },
        addEventListener: function() {},
        removeEventListener: function() {},
        getComputedStyle: function() {
            return {
                getPropertyValue: function() {
                    return ""
                }
            }
        },
        Image: function() {},
        Date: function() {},
        screen: {},
        setTimeout: function() {},
        clearTimeout: function() {},
        matchMedia: function() {
            return {}
        },
        requestAnimationFrame: function(e) {
            return "undefined" == typeof setTimeout ? (e(),
            null) : setTimeout(e, 0)
        },
        cancelAnimationFrame: function(e) {
            "undefined" != typeof setTimeout && clearTimeout(e)
        }
    };
    function l() {
        var e = "undefined" != typeof window ? window : {};
        return i(e, n),
        e
    }
    function o(e) {
        return (o = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }
        )(e)
    }
    function d(e, t) {
        return (d = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t,
            e
        }
        )(e, t)
    }
    function p() {
        if ("undefined" == typeof Reflect || !Reflect.construct)
            return !1;
        if (Reflect.construct.sham)
            return !1;
        if ("function" == typeof Proxy)
            return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}
            ))),
            !0
        } catch (e) {
            return !1
        }
    }
    function u(e, t, a) {
        return (u = p() ? Reflect.construct : function(e, t, a) {
            var i = [null];
            i.push.apply(i, t);
            var s = new (Function.bind.apply(e, i));
            return a && d(s, a.prototype),
            s
        }
        ).apply(null, arguments)
    }
    function c(e) {
        var t = "function" == typeof Map ? new Map : void 0;
        return (c = function(e) {
            if (null === e || (a = e,
            -1 === Function.toString.call(a).indexOf("[native code]")))
                return e;
            var a;
            if ("function" != typeof e)
                throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== t) {
                if (t.has(e))
                    return t.get(e);
                t.set(e, i)
            }
            function i() {
                return u(e, arguments, o(this).constructor)
            }
            return i.prototype = Object.create(e.prototype, {
                constructor: {
                    value: i,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            d(i, e)
        }
        )(e)
    }
    var h = function(e) {
        var t, a;
        function i(t) {
            var a, i, s;
            return a = e.call.apply(e, [this].concat(t)) || this,
            i = function(e) {
                if (void 0 === e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(a),
            s = i.__proto__,
            Object.defineProperty(i, "__proto__", {
                get: function() {
                    return s
                },
                set: function(e) {
                    s.__proto__ = e
                }
            }),
            a
        }
        return a = e,
        (t = i).prototype = Object.create(a.prototype),
        t.prototype.constructor = t,
        t.__proto__ = a,
        i
    }(c(Array));
    function v(e) {
        void 0 === e && (e = []);
        var t = [];
        return e.forEach((function(e) {
            Array.isArray(e) ? t.push.apply(t, v(e)) : t.push(e)
        }
        )),
        t
    }
    function f(e, t) {
        return Array.prototype.filter.call(e, t)
    }
    function m(e, t) {
        var a = l()
          , i = r()
          , s = [];
        if (!t && e instanceof h)
            return e;
        if (!e)
            return new h(s);
        if ("string" == typeof e) {
            var n = e.trim();
            if (n.indexOf("<") >= 0 && n.indexOf(">") >= 0) {
                var o = "div";
                0 === n.indexOf("<li") && (o = "ul"),
                0 === n.indexOf("<tr") && (o = "tbody"),
                0 !== n.indexOf("<td") && 0 !== n.indexOf("<th") || (o = "tr"),
                0 === n.indexOf("<tbody") && (o = "table"),
                0 === n.indexOf("<option") && (o = "select");
                var d = i.createElement(o);
                d.innerHTML = n;
                for (var p = 0; p < d.childNodes.length; p += 1)
                    s.push(d.childNodes[p])
            } else
                s = function(e, t) {
                    if ("string" != typeof e)
                        return [e];
                    for (var a = [], i = t.querySelectorAll(e), s = 0; s < i.length; s += 1)
                        a.push(i[s]);
                    return a
                }(e.trim(), t || i)
        } else if (e.nodeType || e === a || e === i)
            s.push(e);
        else if (Array.isArray(e)) {
            if (e instanceof h)
                return e;
            s = e
        }
        return new h(function(e) {
            for (var t = [], a = 0; a < e.length; a += 1)
                -1 === t.indexOf(e[a]) && t.push(e[a]);
            return t
        }(s))
    }
    m.fn = h.prototype;
    var g, b, y, w = {
        addClass: function() {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
                t[a] = arguments[a];
            var i = v(t.map((function(e) {
                return e.split(" ")
            }
            )));
            return this.forEach((function(e) {
                var t;
                (t = e.classList).add.apply(t, i)
            }
            )),
            this
        },
        removeClass: function() {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
                t[a] = arguments[a];
            var i = v(t.map((function(e) {
                return e.split(" ")
            }
            )));
            return this.forEach((function(e) {
                var t;
                (t = e.classList).remove.apply(t, i)
            }
            )),
            this
        },
        hasClass: function() {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
                t[a] = arguments[a];
            var i = v(t.map((function(e) {
                return e.split(" ")
            }
            )));
            return f(this, (function(e) {
                return i.filter((function(t) {
                    return e.classList.contains(t)
                }
                )).length > 0
            }
            )).length > 0
        },
        toggleClass: function() {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
                t[a] = arguments[a];
            var i = v(t.map((function(e) {
                return e.split(" ")
            }
            )));
            this.forEach((function(e) {
                i.forEach((function(t) {
                    e.classList.toggle(t)
                }
                ))
            }
            ))
        },
        attr: function(e, t) {
            if (1 === arguments.length && "string" == typeof e)
                return this[0] ? this[0].getAttribute(e) : void 0;
            for (var a = 0; a < this.length; a += 1)
                if (2 === arguments.length)
                    this[a].setAttribute(e, t);
                else
                    for (var i in e)
                        this[a][i] = e[i],
                        this[a].setAttribute(i, e[i]);
            return this
        },
        removeAttr: function(e) {
            for (var t = 0; t < this.length; t += 1)
                this[t].removeAttribute(e);
            return this
        },
        transform: function(e) {
            for (var t = 0; t < this.length; t += 1)
                this[t].style.transform = e;
            return this
        },
        transition: function(e) {
            for (var t = 0; t < this.length; t += 1)
                this[t].style.transitionDuration = "string" != typeof e ? e + "ms" : e;
            return this
        },
        on: function() {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
                t[a] = arguments[a];
            var i = t[0]
              , s = t[1]
              , r = t[2]
              , n = t[3];
            function l(e) {
                var t = e.target;
                if (t) {
                    var a = e.target.dom7EventData || [];
                    if (a.indexOf(e) < 0 && a.unshift(e),
                    m(t).is(s))
                        r.apply(t, a);
                    else
                        for (var i = m(t).parents(), n = 0; n < i.length; n += 1)
                            m(i[n]).is(s) && r.apply(i[n], a)
                }
            }
            function o(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e),
                r.apply(this, t)
            }
            "function" == typeof t[1] && (i = t[0],
            r = t[1],
            n = t[2],
            s = void 0),
            n || (n = !1);
            for (var d, p = i.split(" "), u = 0; u < this.length; u += 1) {
                var c = this[u];
                if (s)
                    for (d = 0; d < p.length; d += 1) {
                        var h = p[d];
                        c.dom7LiveListeners || (c.dom7LiveListeners = {}),
                        c.dom7LiveListeners[h] || (c.dom7LiveListeners[h] = []),
                        c.dom7LiveListeners[h].push({
                            listener: r,
                            proxyListener: l
                        }),
                        c.addEventListener(h, l, n)
                    }
                else
                    for (d = 0; d < p.length; d += 1) {
                        var v = p[d];
                        c.dom7Listeners || (c.dom7Listeners = {}),
                        c.dom7Listeners[v] || (c.dom7Listeners[v] = []),
                        c.dom7Listeners[v].push({
                            listener: r,
                            proxyListener: o
                        }),
                        c.addEventListener(v, o, n)
                    }
            }
            return this
        },
        off: function() {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
                t[a] = arguments[a];
            var i = t[0]
              , s = t[1]
              , r = t[2]
              , n = t[3];
            "function" == typeof t[1] && (i = t[0],
            r = t[1],
            n = t[2],
            s = void 0),
            n || (n = !1);
            for (var l = i.split(" "), o = 0; o < l.length; o += 1)
                for (var d = l[o], p = 0; p < this.length; p += 1) {
                    var u = this[p]
                      , c = void 0;
                    if (!s && u.dom7Listeners ? c = u.dom7Listeners[d] : s && u.dom7LiveListeners && (c = u.dom7LiveListeners[d]),
                    c && c.length)
                        for (var h = c.length - 1; h >= 0; h -= 1) {
                            var v = c[h];
                            r && v.listener === r || r && v.listener && v.listener.dom7proxy && v.listener.dom7proxy === r ? (u.removeEventListener(d, v.proxyListener, n),
                            c.splice(h, 1)) : r || (u.removeEventListener(d, v.proxyListener, n),
                            c.splice(h, 1))
                        }
                }
            return this
        },
        trigger: function() {
            for (var e = l(), t = arguments.length, a = new Array(t), i = 0; i < t; i++)
                a[i] = arguments[i];
            for (var s = a[0].split(" "), r = a[1], n = 0; n < s.length; n += 1)
                for (var o = s[n], d = 0; d < this.length; d += 1) {
                    var p = this[d];
                    if (e.CustomEvent) {
                        var u = new e.CustomEvent(o,{
                            detail: r,
                            bubbles: !0,
                            cancelable: !0
                        });
                        p.dom7EventData = a.filter((function(e, t) {
                            return t > 0
                        }
                        )),
                        p.dispatchEvent(u),
                        p.dom7EventData = [],
                        delete p.dom7EventData
                    }
                }
            return this
        },
        transitionEnd: function(e) {
            var t = this;
            return e && t.on("transitionend", (function a(i) {
                i.target === this && (e.call(this, i),
                t.off("transitionend", a))
            }
            )),
            this
        },
        outerWidth: function(e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function(e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        styles: function() {
            var e = l();
            return this[0] ? e.getComputedStyle(this[0], null) : {}
        },
        offset: function() {
            if (this.length > 0) {
                var e = l()
                  , t = r()
                  , a = this[0]
                  , i = a.getBoundingClientRect()
                  , s = t.body
                  , n = a.clientTop || s.clientTop || 0
                  , o = a.clientLeft || s.clientLeft || 0
                  , d = a === e ? e.scrollY : a.scrollTop
                  , p = a === e ? e.scrollX : a.scrollLeft;
                return {
                    top: i.top + d - n,
                    left: i.left + p - o
                }
            }
            return null
        },
        css: function(e, t) {
            var a, i = l();
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (a = 0; a < this.length; a += 1)
                        for (var s in e)
                            this[a].style[s] = e[s];
                    return this
                }
                if (this[0])
                    return i.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (a = 0; a < this.length; a += 1)
                    this[a].style[e] = t;
                return this
            }
            return this
        },
        each: function(e) {
            return e ? (this.forEach((function(t, a) {
                e.apply(t, [t, a])
            }
            )),
            this) : this
        },
        html: function(e) {
            if (void 0 === e)
                return this[0] ? this[0].innerHTML : null;
            for (var t = 0; t < this.length; t += 1)
                this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e)
                return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1)
                this[t].textContent = e;
            return this
        },
        is: function(e) {
            var t, a, i = l(), s = r(), n = this[0];
            if (!n || void 0 === e)
                return !1;
            if ("string" == typeof e) {
                if (n.matches)
                    return n.matches(e);
                if (n.webkitMatchesSelector)
                    return n.webkitMatchesSelector(e);
                if (n.msMatchesSelector)
                    return n.msMatchesSelector(e);
                for (t = m(e),
                a = 0; a < t.length; a += 1)
                    if (t[a] === n)
                        return !0;
                return !1
            }
            if (e === s)
                return n === s;
            if (e === i)
                return n === i;
            if (e.nodeType || e instanceof h) {
                for (t = e.nodeType ? [e] : e,
                a = 0; a < t.length; a += 1)
                    if (t[a] === n)
                        return !0;
                return !1
            }
            return !1
        },
        index: function() {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling); )
                    1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e)
                return this;
            var t = this.length;
            if (e > t - 1)
                return m([]);
            if (e < 0) {
                var a = t + e;
                return m(a < 0 ? [] : [this[a]])
            }
            return m([this[e]])
        },
        append: function() {
            for (var e, t = r(), a = 0; a < arguments.length; a += 1) {
                e = a < 0 || arguments.length <= a ? void 0 : arguments[a];
                for (var i = 0; i < this.length; i += 1)
                    if ("string" == typeof e) {
                        var s = t.createElement("div");
                        for (s.innerHTML = e; s.firstChild; )
                            this[i].appendChild(s.firstChild)
                    } else if (e instanceof h)
                        for (var n = 0; n < e.length; n += 1)
                            this[i].appendChild(e[n]);
                    else
                        this[i].appendChild(e)
            }
            return this
        },
        prepend: function(e) {
            var t, a, i = r();
            for (t = 0; t < this.length; t += 1)
                if ("string" == typeof e) {
                    var s = i.createElement("div");
                    for (s.innerHTML = e,
                    a = s.childNodes.length - 1; a >= 0; a -= 1)
                        this[t].insertBefore(s.childNodes[a], this[t].childNodes[0])
                } else if (e instanceof h)
                    for (a = 0; a < e.length; a += 1)
                        this[t].insertBefore(e[a], this[t].childNodes[0]);
                else
                    this[t].insertBefore(e, this[t].childNodes[0]);
            return this
        },
        next: function(e) {
            return this.length > 0 ? e ? this[0].nextElementSibling && m(this[0].nextElementSibling).is(e) ? m([this[0].nextElementSibling]) : m([]) : this[0].nextElementSibling ? m([this[0].nextElementSibling]) : m([]) : m([])
        },
        nextAll: function(e) {
            var t = []
              , a = this[0];
            if (!a)
                return m([]);
            for (; a.nextElementSibling; ) {
                var i = a.nextElementSibling;
                e ? m(i).is(e) && t.push(i) : t.push(i),
                a = i
            }
            return m(t)
        },
        prev: function(e) {
            if (this.length > 0) {
                var t = this[0];
                return e ? t.previousElementSibling && m(t.previousElementSibling).is(e) ? m([t.previousElementSibling]) : m([]) : t.previousElementSibling ? m([t.previousElementSibling]) : m([])
            }
            return m([])
        },
        prevAll: function(e) {
            var t = []
              , a = this[0];
            if (!a)
                return m([]);
            for (; a.previousElementSibling; ) {
                var i = a.previousElementSibling;
                e ? m(i).is(e) && t.push(i) : t.push(i),
                a = i
            }
            return m(t)
        },
        parent: function(e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                null !== this[a].parentNode && (e ? m(this[a].parentNode).is(e) && t.push(this[a].parentNode) : t.push(this[a].parentNode));
            return m(t)
        },
        parents: function(e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].parentNode; i; )
                    e ? m(i).is(e) && t.push(i) : t.push(i),
                    i = i.parentNode;
            return m(t)
        },
        closest: function(e) {
            var t = this;
            return void 0 === e ? m([]) : (t.is(e) || (t = t.parents(e).eq(0)),
            t)
        },
        find: function(e) {
            for (var t = [], a = 0; a < this.length; a += 1) {
                try {
                    var i = this[a].querySelectorAll(e)
                } catch (t) {
                    console.log(e)
                }
                for (var s = 0; s < i.length; s += 1)
                    t.push(i[s])
            }
            return m(t)
        },
        children: function(e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].children, s = 0; s < i.length; s += 1)
                    e && !m(i[s]).is(e) || t.push(i[s]);
            return m(t)
        },
        filter: function(e) {
            return m(f(this, e))
        },
        remove: function() {
            for (var e = 0; e < this.length; e += 1)
                this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        }
    };
    function E(e, t) {
        return void 0 === t && (t = 0),
        setTimeout(e, t)
    }
    function x() {
        return Date.now()
    }
    function T(e, t) {
        void 0 === t && (t = "x");
        var a, i, s, r = l(), n = function(e) {
            var t, a = l();
            return a.getComputedStyle && (t = a.getComputedStyle(e, null)),
            !t && e.currentStyle && (t = e.currentStyle),
            t || (t = e.style),
            t
        }(e);
        return r.WebKitCSSMatrix ? ((i = n.transform || n.webkitTransform).split(",").length > 6 && (i = i.split(", ").map((function(e) {
            return e.replace(",", ".")
        }
        )).join(", ")),
        s = new r.WebKitCSSMatrix("none" === i ? "" : i)) : a = (s = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","),
        "x" === t && (i = r.WebKitCSSMatrix ? s.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])),
        "y" === t && (i = r.WebKitCSSMatrix ? s.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])),
        i || 0
    }
    function C(e) {
        return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
    }
    function S() {
        for (var e = Object(arguments.length <= 0 ? void 0 : arguments[0]), t = ["__proto__", "constructor", "prototype"], a = 1; a < arguments.length; a += 1) {
            var i = a < 0 || arguments.length <= a ? void 0 : arguments[a];
            if (null != i)
                for (var s = Object.keys(Object(i)).filter((function(e) {
                    return t.indexOf(e) < 0
                }
                )), r = 0, n = s.length; r < n; r += 1) {
                    var l = s[r]
                      , o = Object.getOwnPropertyDescriptor(i, l);
                    void 0 !== o && o.enumerable && (C(e[l]) && C(i[l]) ? i[l].__swiper__ ? e[l] = i[l] : S(e[l], i[l]) : !C(e[l]) && C(i[l]) ? (e[l] = {},
                    i[l].__swiper__ ? e[l] = i[l] : S(e[l], i[l])) : e[l] = i[l])
                }
        }
        return e
    }
    function M(e, t) {
        Object.keys(t).forEach((function(a) {
            C(t[a]) && Object.keys(t[a]).forEach((function(i) {
                "function" == typeof t[a][i] && (t[a][i] = t[a][i].bind(e))
            }
            )),
            e[a] = t[a]
        }
        ))
    }
    function z(e) {
        return void 0 === e && (e = ""),
        "." + e.trim().replace(/([\.:\/])/g, "\\$1").replace(/ /g, ".")
    }
    function P() {
        return g || (g = function() {
            var e = l()
              , t = r();
            return {
                touch: !!("ontouchstart"in e || e.DocumentTouch && t instanceof e.DocumentTouch),
                pointerEvents: !!e.PointerEvent && "maxTouchPoints"in e.navigator && e.navigator.maxTouchPoints >= 0,
                observer: "MutationObserver"in e || "WebkitMutationObserver"in e,
                passiveListener: function() {
                    var t = !1;
                    try {
                        var a = Object.defineProperty({}, "passive", {
                            get: function() {
                                t = !0
                            }
                        });
                        e.addEventListener("testPassiveListener", null, a)
                    } catch (e) {}
                    return t
                }(),
                gestures: "ongesturestart"in e
            }
        }()),
        g
    }
    function k(e) {
        return void 0 === e && (e = {}),
        b || (b = function(e) {
            var t = (void 0 === e ? {} : e).userAgent
              , a = P()
              , i = l()
              , s = i.navigator.platform
              , r = t || i.navigator.userAgent
              , n = {
                ios: !1,
                android: !1
            }
              , o = i.screen.width
              , d = i.screen.height
              , p = r.match(/(Android);?[\s\/]+([\d.]+)?/)
              , u = r.match(/(iPad).*OS\s([\d_]+)/)
              , c = r.match(/(iPod)(.*OS\s([\d_]+))?/)
              , h = !u && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/)
              , v = "Win32" === s
              , f = "MacIntel" === s;
            return !u && f && a.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(o + "x" + d) >= 0 && ((u = r.match(/(Version)\/([\d.]+)/)) || (u = [0, 1, "13_0_0"]),
            f = !1),
            p && !v && (n.os = "android",
            n.android = !0),
            (u || h || c) && (n.os = "ios",
            n.ios = !0),
            n
        }(e)),
        b
    }
    function $() {
        return y || (y = function() {
            var e, t = l();
            return {
                isEdge: !!t.navigator.userAgent.match(/Edge/g),
                isSafari: (e = t.navigator.userAgent.toLowerCase(),
                e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
            }
        }()),
        y
    }
    Object.keys(w).forEach((function(e) {
        Object.defineProperty(m.fn, e, {
            value: w[e],
            writable: !0
        })
    }
    ));
    var L = {
        name: "resize",
        create: function() {
            var e = this;
            S(e, {
                resize: {
                    observer: null,
                    createObserver: function() {
                        e && !e.destroyed && e.initialized && (e.resize.observer = new ResizeObserver((function(t) {
                            var a = e.width
                              , i = e.height
                              , s = a
                              , r = i;
                            t.forEach((function(t) {
                                var a = t.contentBoxSize
                                  , i = t.contentRect
                                  , n = t.target;
                                n && n !== e.el || (s = i ? i.width : (a[0] || a).inlineSize,
                                r = i ? i.height : (a[0] || a).blockSize)
                            }
                            )),
                            s === a && r === i || e.resize.resizeHandler()
                        }
                        )),
                        e.resize.observer.observe(e.el))
                    },
                    removeObserver: function() {
                        e.resize.observer && e.resize.observer.unobserve && e.el && (e.resize.observer.unobserve(e.el),
                        e.resize.observer = null)
                    },
                    resizeHandler: function() {
                        e && !e.destroyed && e.initialized && (e.emit("beforeResize"),
                        e.emit("resize"))
                    },
                    orientationChangeHandler: function() {
                        e && !e.destroyed && e.initialized && e.emit("orientationchange")
                    }
                }
            })
        },
        on: {
            init: function(e) {
                var t = l();
                e.params.resizeObserver && void 0 !== l().ResizeObserver ? e.resize.createObserver() : (t.addEventListener("resize", e.resize.resizeHandler),
                t.addEventListener("orientationchange", e.resize.orientationChangeHandler))
            },
            destroy: function(e) {
                var t = l();
                e.resize.removeObserver(),
                t.removeEventListener("resize", e.resize.resizeHandler),
                t.removeEventListener("orientationchange", e.resize.orientationChangeHandler)
            }
        }
    }
      , I = {
        attach: function(e, t) {
            void 0 === t && (t = {});
            var a = l()
              , i = this
              , s = new (a.MutationObserver || a.WebkitMutationObserver)((function(e) {
                if (1 !== e.length) {
                    var t = function() {
                        i.emit("observerUpdate", e[0])
                    };
                    a.requestAnimationFrame ? a.requestAnimationFrame(t) : a.setTimeout(t, 0)
                } else
                    i.emit("observerUpdate", e[0])
            }
            ));
            s.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData
            }),
            i.observer.observers.push(s)
        },
        init: function() {
            var e = this;
            if (e.support.observer && e.params.observer) {
                if (e.params.observeParents)
                    for (var t = e.$el.parents(), a = 0; a < t.length; a += 1)
                        e.observer.attach(t[a]);
                e.observer.attach(e.$el[0], {
                    childList: e.params.observeSlideChildren
                }),
                e.observer.attach(e.$wrapperEl[0], {
                    attributes: !1
                })
            }
        },
        destroy: function() {
            this.observer.observers.forEach((function(e) {
                e.disconnect()
            }
            )),
            this.observer.observers = []
        }
    }
      , O = {
        name: "observer",
        params: {
            observer: !1,
            observeParents: !1,
            observeSlideChildren: !1
        },
        create: function() {
            M(this, {
                observer: t({}, I, {
                    observers: []
                })
            })
        },
        on: {
            init: function(e) {
                e.observer.init()
            },
            destroy: function(e) {
                e.observer.destroy()
            }
        }
    };
    function A(e) {
        var t = this
          , a = r()
          , i = l()
          , s = t.touchEventsData
          , n = t.params
          , o = t.touches;
        if (t.enabled && (!t.animating || !n.preventInteractionOnTransition)) {
            var d = e;
            d.originalEvent && (d = d.originalEvent);
            var p = m(d.target);
            if ("wrapper" !== n.touchEventsTarget || p.closest(t.wrapperEl).length)
                if (s.isTouchEvent = "touchstart" === d.type,
                s.isTouchEvent || !("which"in d) || 3 !== d.which)
                    if (!(!s.isTouchEvent && "button"in d && d.button > 0))
                        if (!s.isTouched || !s.isMoved)
                            if (!!n.noSwipingClass && "" !== n.noSwipingClass && d.target && d.target.shadowRoot && e.path && e.path[0] && (p = m(e.path[0])),
                            n.noSwiping && p.closest(n.noSwipingSelector ? n.noSwipingSelector : "." + n.noSwipingClass)[0])
                                t.allowClick = !0;
                            else if (!n.swipeHandler || p.closest(n.swipeHandler)[0]) {
                                o.currentX = "touchstart" === d.type ? d.targetTouches[0].pageX : d.pageX,
                                o.currentY = "touchstart" === d.type ? d.targetTouches[0].pageY : d.pageY;
                                var u = o.currentX
                                  , c = o.currentY
                                  , h = n.edgeSwipeDetection || n.iOSEdgeSwipeDetection
                                  , v = n.edgeSwipeThreshold || n.iOSEdgeSwipeThreshold;
                                if (h && (u <= v || u >= i.innerWidth - v)) {
                                    if ("prevent" !== h)
                                        return;
                                    e.preventDefault()
                                }
                                if (S(s, {
                                    isTouched: !0,
                                    isMoved: !1,
                                    allowTouchCallbacks: !0,
                                    isScrolling: void 0,
                                    startMoving: void 0
                                }),
                                o.startX = u,
                                o.startY = c,
                                s.touchStartTime = x(),
                                t.allowClick = !0,
                                t.updateSize(),
                                t.swipeDirection = void 0,
                                n.threshold > 0 && (s.allowThresholdMove = !1),
                                "touchstart" !== d.type) {
                                    var f = !0;
                                    p.is(s.formElements) && (f = !1),
                                    a.activeElement && m(a.activeElement).is(s.formElements) && a.activeElement !== p[0] && a.activeElement.blur();
                                    var g = f && t.allowTouchMove && n.touchStartPreventDefault;
                                    !n.touchStartForcePreventDefault && !g || p[0].isContentEditable || d.preventDefault()
                                }
                                t.emit("touchStart", d)
                            }
        }
    }
    function D(e) {
        var t = r()
          , a = this
          , i = a.touchEventsData
          , s = a.params
          , n = a.touches
          , l = a.rtlTranslate;
        if (a.enabled) {
            var o = e;
            if (o.originalEvent && (o = o.originalEvent),
            i.isTouched) {
                if (!i.isTouchEvent || "touchmove" === o.type) {
                    var d = "touchmove" === o.type && o.targetTouches && (o.targetTouches[0] || o.changedTouches[0])
                      , p = "touchmove" === o.type ? d.pageX : o.pageX
                      , u = "touchmove" === o.type ? d.pageY : o.pageY;
                    if (o.preventedByNestedSwiper)
                        return n.startX = p,
                        void (n.startY = u);
                    if (!a.allowTouchMove)
                        return a.allowClick = !1,
                        void (i.isTouched && (S(n, {
                            startX: p,
                            startY: u,
                            currentX: p,
                            currentY: u
                        }),
                        i.touchStartTime = x()));
                    if (i.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
                        if (a.isVertical()) {
                            if (u < n.startY && a.translate <= a.maxTranslate() || u > n.startY && a.translate >= a.minTranslate())
                                return i.isTouched = !1,
                                void (i.isMoved = !1)
                        } else if (p < n.startX && a.translate <= a.maxTranslate() || p > n.startX && a.translate >= a.minTranslate())
                            return;
                    if (i.isTouchEvent && t.activeElement && o.target === t.activeElement && m(o.target).is(i.formElements))
                        return i.isMoved = !0,
                        void (a.allowClick = !1);
                    if (i.allowTouchCallbacks && a.emit("touchMove", o),
                    !(o.targetTouches && o.targetTouches.length > 1)) {
                        n.currentX = p,
                        n.currentY = u;
                        var c = n.currentX - n.startX
                          , h = n.currentY - n.startY;
                        if (!(a.params.threshold && Math.sqrt(Math.pow(c, 2) + Math.pow(h, 2)) < a.params.threshold)) {
                            var v;
                            if (void 0 === i.isScrolling)
                                a.isHorizontal() && n.currentY === n.startY || a.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : c * c + h * h >= 25 && (v = 180 * Math.atan2(Math.abs(h), Math.abs(c)) / Math.PI,
                                i.isScrolling = a.isHorizontal() ? v > s.touchAngle : 90 - v > s.touchAngle);
                            if (i.isScrolling && a.emit("touchMoveOpposite", o),
                            void 0 === i.startMoving && (n.currentX === n.startX && n.currentY === n.startY || (i.startMoving = !0)),
                            i.isScrolling)
                                i.isTouched = !1;
                            else if (i.startMoving) {
                                a.allowClick = !1,
                                !s.cssMode && o.cancelable && o.preventDefault(),
                                s.touchMoveStopPropagation && !s.nested && o.stopPropagation(),
                                i.isMoved || (s.loop && a.loopFix(),
                                i.startTranslate = a.getTranslate(),
                                a.setTransition(0),
                                a.animating && a.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
                                i.allowMomentumBounce = !1,
                                !s.grabCursor || !0 !== a.allowSlideNext && !0 !== a.allowSlidePrev || a.setGrabCursor(!0),
                                a.emit("sliderFirstMove", o)),
                                a.emit("sliderMove", o),
                                i.isMoved = !0;
                                var f = a.isHorizontal() ? c : h;
                                n.diff = f,
                                f *= s.touchRatio,
                                l && (f = -f),
                                a.swipeDirection = f > 0 ? "prev" : "next",
                                i.currentTranslate = f + i.startTranslate;
                                var g = !0
                                  , b = s.resistanceRatio;
                                if (s.touchReleaseOnEdges && (b = 0),
                                f > 0 && i.currentTranslate > a.minTranslate() ? (g = !1,
                                s.resistance && (i.currentTranslate = a.minTranslate() - 1 + Math.pow(-a.minTranslate() + i.startTranslate + f, b))) : f < 0 && i.currentTranslate < a.maxTranslate() && (g = !1,
                                s.resistance && (i.currentTranslate = a.maxTranslate() + 1 - Math.pow(a.maxTranslate() - i.startTranslate - f, b))),
                                g && (o.preventedByNestedSwiper = !0),
                                !a.allowSlideNext && "next" === a.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate),
                                !a.allowSlidePrev && "prev" === a.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate),
                                a.allowSlidePrev || a.allowSlideNext || (i.currentTranslate = i.startTranslate),
                                s.threshold > 0) {
                                    if (!(Math.abs(f) > s.threshold || i.allowThresholdMove))
                                        return void (i.currentTranslate = i.startTranslate);
                                    if (!i.allowThresholdMove)
                                        return i.allowThresholdMove = !0,
                                        n.startX = n.currentX,
                                        n.startY = n.currentY,
                                        i.currentTranslate = i.startTranslate,
                                        void (n.diff = a.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY)
                                }
                                s.followFinger && !s.cssMode && ((s.freeMode || s.watchSlidesProgress || s.watchSlidesVisibility) && (a.updateActiveIndex(),
                                a.updateSlidesClasses()),
                                s.freeMode && (0 === i.velocities.length && i.velocities.push({
                                    position: n[a.isHorizontal() ? "startX" : "startY"],
                                    time: i.touchStartTime
                                }),
                                i.velocities.push({
                                    position: n[a.isHorizontal() ? "currentX" : "currentY"],
                                    time: x()
                                })),
                                a.updateProgress(i.currentTranslate),
                                a.setTranslate(i.currentTranslate))
                            }
                        }
                    }
                }
            } else
                i.startMoving && i.isScrolling && a.emit("touchMoveOpposite", o)
        }
    }
    function N(e) {
        var t = this
          , a = t.touchEventsData
          , i = t.params
          , s = t.touches
          , r = t.rtlTranslate
          , n = t.$wrapperEl
          , l = t.slidesGrid
          , o = t.snapGrid;
        if (t.enabled) {
            var d = e;
            if (d.originalEvent && (d = d.originalEvent),
            a.allowTouchCallbacks && t.emit("touchEnd", d),
            a.allowTouchCallbacks = !1,
            !a.isTouched)
                return a.isMoved && i.grabCursor && t.setGrabCursor(!1),
                a.isMoved = !1,
                void (a.startMoving = !1);
            i.grabCursor && a.isMoved && a.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
            var p, u = x(), c = u - a.touchStartTime;
            if (t.allowClick && (t.updateClickedSlide(d),
            t.emit("tap click", d),
            c < 300 && u - a.lastClickTime < 300 && t.emit("doubleTap doubleClick", d)),
            a.lastClickTime = x(),
            E((function() {
                t.destroyed || (t.allowClick = !0)
            }
            )),
            !a.isTouched || !a.isMoved || !t.swipeDirection || 0 === s.diff || a.currentTranslate === a.startTranslate)
                return a.isTouched = !1,
                a.isMoved = !1,
                void (a.startMoving = !1);
            if (a.isTouched = !1,
            a.isMoved = !1,
            a.startMoving = !1,
            p = i.followFinger ? r ? t.translate : -t.translate : -a.currentTranslate,
            !i.cssMode)
                if (i.freeMode) {
                    if (p < -t.minTranslate())
                        return void t.slideTo(t.activeIndex);
                    if (p > -t.maxTranslate())
                        return void (t.slides.length < o.length ? t.slideTo(o.length - 1) : t.slideTo(t.slides.length - 1));
                    if (i.freeModeMomentum) {
                        if (a.velocities.length > 1) {
                            var h = a.velocities.pop()
                              , v = a.velocities.pop()
                              , f = h.position - v.position
                              , m = h.time - v.time;
                            t.velocity = f / m,
                            t.velocity /= 2,
                            Math.abs(t.velocity) < i.freeModeMinimumVelocity && (t.velocity = 0),
                            (m > 150 || x() - h.time > 300) && (t.velocity = 0)
                        } else
                            t.velocity = 0;
                        t.velocity *= i.freeModeMomentumVelocityRatio,
                        a.velocities.length = 0;
                        var g = 1e3 * i.freeModeMomentumRatio
                          , b = t.velocity * g
                          , y = t.translate + b;
                        r && (y = -y);
                        var w, T, C = !1, S = 20 * Math.abs(t.velocity) * i.freeModeMomentumBounceRatio;
                        if (y < t.maxTranslate())
                            i.freeModeMomentumBounce ? (y + t.maxTranslate() < -S && (y = t.maxTranslate() - S),
                            w = t.maxTranslate(),
                            C = !0,
                            a.allowMomentumBounce = !0) : y = t.maxTranslate(),
                            i.loop && i.centeredSlides && (T = !0);
                        else if (y > t.minTranslate())
                            i.freeModeMomentumBounce ? (y - t.minTranslate() > S && (y = t.minTranslate() + S),
                            w = t.minTranslate(),
                            C = !0,
                            a.allowMomentumBounce = !0) : y = t.minTranslate(),
                            i.loop && i.centeredSlides && (T = !0);
                        else if (i.freeModeSticky) {
                            for (var M, z = 0; z < o.length; z += 1)
                                if (o[z] > -y) {
                                    M = z;
                                    break
                                }
                            y = -(y = Math.abs(o[M] - y) < Math.abs(o[M - 1] - y) || "next" === t.swipeDirection ? o[M] : o[M - 1])
                        }
                        if (T && t.once("transitionEnd", (function() {
                            t.loopFix()
                        }
                        )),
                        0 !== t.velocity) {
                            if (g = r ? Math.abs((-y - t.translate) / t.velocity) : Math.abs((y - t.translate) / t.velocity),
                            i.freeModeSticky) {
                                var P = Math.abs((r ? -y : y) - t.translate)
                                  , k = t.slidesSizesGrid[t.activeIndex];
                                g = P < k ? i.speed : P < 2 * k ? 1.5 * i.speed : 2.5 * i.speed
                            }
                        } else if (i.freeModeSticky)
                            return void t.slideToClosest();
                        i.freeModeMomentumBounce && C ? (t.updateProgress(w),
                        t.setTransition(g),
                        t.setTranslate(y),
                        t.transitionStart(!0, t.swipeDirection),
                        t.animating = !0,
                        n.transitionEnd((function() {
                            t && !t.destroyed && a.allowMomentumBounce && (t.emit("momentumBounce"),
                            t.setTransition(i.speed),
                            setTimeout((function() {
                                t.setTranslate(w),
                                n.transitionEnd((function() {
                                    t && !t.destroyed && t.transitionEnd()
                                }
                                ))
                            }
                            ), 0))
                        }
                        ))) : t.velocity ? (t.updateProgress(y),
                        t.setTransition(g),
                        t.setTranslate(y),
                        t.transitionStart(!0, t.swipeDirection),
                        t.animating || (t.animating = !0,
                        n.transitionEnd((function() {
                            t && !t.destroyed && t.transitionEnd()
                        }
                        )))) : (t.emit("_freeModeNoMomentumRelease"),
                        t.updateProgress(y)),
                        t.updateActiveIndex(),
                        t.updateSlidesClasses()
                    } else {
                        if (i.freeModeSticky)
                            return void t.slideToClosest();
                        i.freeMode && t.emit("_freeModeNoMomentumRelease")
                    }
                    (!i.freeModeMomentum || c >= i.longSwipesMs) && (t.updateProgress(),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses())
                } else {
                    for (var $ = 0, L = t.slidesSizesGrid[0], I = 0; I < l.length; I += I < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup) {
                        var O = I < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
                        void 0 !== l[I + O] ? p >= l[I] && p < l[I + O] && ($ = I,
                        L = l[I + O] - l[I]) : p >= l[I] && ($ = I,
                        L = l[l.length - 1] - l[l.length - 2])
                    }
                    var A = (p - l[$]) / L
                      , D = $ < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
                    if (c > i.longSwipesMs) {
                        if (!i.longSwipes)
                            return void t.slideTo(t.activeIndex);
                        "next" === t.swipeDirection && (A >= i.longSwipesRatio ? t.slideTo($ + D) : t.slideTo($)),
                        "prev" === t.swipeDirection && (A > 1 - i.longSwipesRatio ? t.slideTo($ + D) : t.slideTo($))
                    } else {
                        if (!i.shortSwipes)
                            return void t.slideTo(t.activeIndex);
                        t.navigation && (d.target === t.navigation.nextEl || d.target === t.navigation.prevEl) ? d.target === t.navigation.nextEl ? t.slideTo($ + D) : t.slideTo($) : ("next" === t.swipeDirection && t.slideTo($ + D),
                        "prev" === t.swipeDirection && t.slideTo($))
                    }
                }
        }
    }
    function G() {
        var e = this
          , t = e.params
          , a = e.el;
        if (!a || 0 !== a.offsetWidth) {
            t.breakpoints && e.setBreakpoint();
            var i = e.allowSlideNext
              , s = e.allowSlidePrev
              , r = e.snapGrid;
            e.allowSlideNext = !0,
            e.allowSlidePrev = !0,
            e.updateSize(),
            e.updateSlides(),
            e.updateSlidesClasses(),
            ("auto" === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0),
            e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
            e.allowSlidePrev = s,
            e.allowSlideNext = i,
            e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
        }
    }
    function B(e) {
        var t = this;
        t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation && t.animating && (e.stopPropagation(),
        e.stopImmediatePropagation())))
    }
    function H() {
        var e = this
          , t = e.wrapperEl
          , a = e.rtlTranslate;
        if (e.enabled) {
            e.previousTranslate = e.translate,
            e.isHorizontal() ? e.translate = a ? t.scrollWidth - t.offsetWidth - t.scrollLeft : -t.scrollLeft : e.translate = -t.scrollTop,
            -0 === e.translate && (e.translate = 0),
            e.updateActiveIndex(),
            e.updateSlidesClasses();
            var i = e.maxTranslate() - e.minTranslate();
            (0 === i ? 0 : (e.translate - e.minTranslate()) / i) !== e.progress && e.updateProgress(a ? -e.translate : e.translate),
            e.emit("setTranslate", e.translate, !1)
        }
    }
    var X = !1;
    function Y() {}
    var R = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "container",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !1,
        nested: !1,
        enabled: !0,
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: .02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: "column",
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !1,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        loopPreventsSlide: !0,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        containerModifierClass: "swiper-container-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
        _emitClasses: !1
    }
      , W = {
        modular: {
            useParams: function(e) {
                var t = this;
                t.modules && Object.keys(t.modules).forEach((function(a) {
                    var i = t.modules[a];
                    i.params && S(e, i.params)
                }
                ))
            },
            useModules: function(e) {
                void 0 === e && (e = {});
                var t = this;
                t.modules && Object.keys(t.modules).forEach((function(a) {
                    var i = t.modules[a]
                      , s = e[a] || {};
                    i.on && t.on && Object.keys(i.on).forEach((function(e) {
                        t.on(e, i.on[e])
                    }
                    )),
                    i.create && i.create.bind(t)(s)
                }
                ))
            }
        },
        eventsEmitter: {
            on: function(e, t, a) {
                var i = this;
                if ("function" != typeof t)
                    return i;
                var s = a ? "unshift" : "push";
                return e.split(" ").forEach((function(e) {
                    i.eventsListeners[e] || (i.eventsListeners[e] = []),
                    i.eventsListeners[e][s](t)
                }
                )),
                i
            },
            once: function(e, t, a) {
                var i = this;
                if ("function" != typeof t)
                    return i;
                function s() {
                    i.off(e, s),
                    s.__emitterProxy && delete s.__emitterProxy;
                    for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
                        r[n] = arguments[n];
                    t.apply(i, r)
                }
                return s.__emitterProxy = t,
                i.on(e, s, a)
            },
            onAny: function(e, t) {
                var a = this;
                if ("function" != typeof e)
                    return a;
                var i = t ? "unshift" : "push";
                return a.eventsAnyListeners.indexOf(e) < 0 && a.eventsAnyListeners[i](e),
                a
            },
            offAny: function(e) {
                var t = this;
                if (!t.eventsAnyListeners)
                    return t;
                var a = t.eventsAnyListeners.indexOf(e);
                return a >= 0 && t.eventsAnyListeners.splice(a, 1),
                t
            },
            off: function(e, t) {
                var a = this;
                return a.eventsListeners ? (e.split(" ").forEach((function(e) {
                    void 0 === t ? a.eventsListeners[e] = [] : a.eventsListeners[e] && a.eventsListeners[e].forEach((function(i, s) {
                        (i === t || i.__emitterProxy && i.__emitterProxy === t) && a.eventsListeners[e].splice(s, 1)
                    }
                    ))
                }
                )),
                a) : a
            },
            emit: function() {
                var e, t, a, i = this;
                if (!i.eventsListeners)
                    return i;
                for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++)
                    r[n] = arguments[n];
                "string" == typeof r[0] || Array.isArray(r[0]) ? (e = r[0],
                t = r.slice(1, r.length),
                a = i) : (e = r[0].events,
                t = r[0].data,
                a = r[0].context || i),
                t.unshift(a);
                var l = Array.isArray(e) ? e : e.split(" ");
                return l.forEach((function(e) {
                    i.eventsAnyListeners && i.eventsAnyListeners.length && i.eventsAnyListeners.forEach((function(i) {
                        i.apply(a, [e].concat(t))
                    }
                    )),
                    i.eventsListeners && i.eventsListeners[e] && i.eventsListeners[e].forEach((function(e) {
                        e.apply(a, t)
                    }
                    ))
                }
                )),
                i
            }
        },
        update: {
            updateSize: function() {
                var e, t, a = this, i = a.$el;
                e = void 0 !== a.params.width && null !== a.params.width ? a.params.width : i[0].clientWidth,
                t = void 0 !== a.params.height && null !== a.params.height ? a.params.height : i[0].clientHeight,
                0 === e && a.isHorizontal() || 0 === t && a.isVertical() || (e = e - parseInt(i.css("padding-left") || 0, 10) - parseInt(i.css("padding-right") || 0, 10),
                t = t - parseInt(i.css("padding-top") || 0, 10) - parseInt(i.css("padding-bottom") || 0, 10),
                Number.isNaN(e) && (e = 0),
                Number.isNaN(t) && (t = 0),
                S(a, {
                    width: e,
                    height: t,
                    size: a.isHorizontal() ? e : t
                }))
            },
            updateSlides: function() {
                var e = this;
                function t(t) {
                    return e.isHorizontal() ? t : {
                        width: "height",
                        "margin-top": "margin-left",
                        "margin-bottom ": "margin-right",
                        "margin-left": "margin-top",
                        "margin-right": "margin-bottom",
                        "padding-left": "padding-top",
                        "padding-right": "padding-bottom",
                        marginRight: "marginBottom"
                    }[t]
                }
                function a(e, a) {
                    return parseFloat(e.getPropertyValue(t(a)) || 0)
                }
                var i = e.params
                  , s = e.$wrapperEl
                  , r = e.size
                  , n = e.rtlTranslate
                  , l = e.wrongRTL
                  , o = e.virtual && i.virtual.enabled
                  , d = o ? e.virtual.slides.length : e.slides.length
                  , p = s.children("." + e.params.slideClass)
                  , u = o ? e.virtual.slides.length : p.length
                  , c = []
                  , h = []
                  , v = []
                  , f = i.slidesOffsetBefore;
                "function" == typeof f && (f = i.slidesOffsetBefore.call(e));
                var m = i.slidesOffsetAfter;
                "function" == typeof m && (m = i.slidesOffsetAfter.call(e));
                var g = e.snapGrid.length
                  , b = e.slidesGrid.length
                  , y = i.spaceBetween
                  , w = -f
                  , E = 0
                  , x = 0;
                if (void 0 !== r) {
                    var T, C;
                    "string" == typeof y && y.indexOf("%") >= 0 && (y = parseFloat(y.replace("%", "")) / 100 * r),
                    e.virtualSize = -y,
                    n ? p.css({
                        marginLeft: "",
                        marginTop: ""
                    }) : p.css({
                        marginRight: "",
                        marginBottom: ""
                    }),
                    i.slidesPerColumn > 1 && (T = Math.floor(u / i.slidesPerColumn) === u / e.params.slidesPerColumn ? u : Math.ceil(u / i.slidesPerColumn) * i.slidesPerColumn,
                    "auto" !== i.slidesPerView && "row" === i.slidesPerColumnFill && (T = Math.max(T, i.slidesPerView * i.slidesPerColumn)));
                    for (var M, z, P, k = i.slidesPerColumn, $ = T / k, L = Math.floor(u / i.slidesPerColumn), I = 0; I < u; I += 1) {
                        C = 0;
                        var O = p.eq(I);
                        if (i.slidesPerColumn > 1) {
                            var A = void 0
                              , D = void 0
                              , N = void 0;
                            if ("row" === i.slidesPerColumnFill && i.slidesPerGroup > 1) {
                                var G = Math.floor(I / (i.slidesPerGroup * i.slidesPerColumn))
                                  , B = I - i.slidesPerColumn * i.slidesPerGroup * G
                                  , H = 0 === G ? i.slidesPerGroup : Math.min(Math.ceil((u - G * k * i.slidesPerGroup) / k), i.slidesPerGroup);
                                A = (D = B - (N = Math.floor(B / H)) * H + G * i.slidesPerGroup) + N * T / k,
                                O.css({
                                    "-webkit-box-ordinal-group": A,
                                    "-moz-box-ordinal-group": A,
                                    "-ms-flex-order": A,
                                    "-webkit-order": A,
                                    order: A
                                })
                            } else
                                "column" === i.slidesPerColumnFill ? (N = I - (D = Math.floor(I / k)) * k,
                                (D > L || D === L && N === k - 1) && (N += 1) >= k && (N = 0,
                                D += 1)) : D = I - (N = Math.floor(I / $)) * $;
                            O.css(t("margin-top"), 0 !== N && i.spaceBetween && i.spaceBetween + "px")
                        }
                        if ("none" !== O.css("display")) {
                            if ("auto" === i.slidesPerView) {
                                var X = getComputedStyle(O[0])
                                  , Y = O[0].style.transform
                                  , R = O[0].style.webkitTransform;
                                if (Y && (O[0].style.transform = "none"),
                                R && (O[0].style.webkitTransform = "none"),
                                i.roundLengths)
                                    C = e.isHorizontal() ? O.outerWidth(!0) : O.outerHeight(!0);
                                else {
                                    var W = a(X, "width")
                                      , V = a(X, "padding-left")
                                      , F = a(X, "padding-right")
                                      , _ = a(X, "margin-left")
                                      , q = a(X, "margin-right")
                                      , j = X.getPropertyValue("box-sizing");
                                    if (j && "border-box" === j)
                                        C = W + _ + q;
                                    else {
                                        var U = O[0]
                                          , K = U.clientWidth;
                                        C = W + V + F + _ + q + (U.offsetWidth - K)
                                    }
                                }
                                Y && (O[0].style.transform = Y),
                                R && (O[0].style.webkitTransform = R),
                                i.roundLengths && (C = Math.floor(C))
                            } else
                                C = (r - (i.slidesPerView - 1) * y) / i.slidesPerView,
                                i.roundLengths && (C = Math.floor(C)),
                                p[I] && (p[I].style[t("width")] = C + "px");
                            p[I] && (p[I].swiperSlideSize = C),
                            v.push(C),
                            i.centeredSlides ? (w = w + C / 2 + E / 2 + y,
                            0 === E && 0 !== I && (w = w - r / 2 - y),
                            0 === I && (w = w - r / 2 - y),
                            Math.abs(w) < .001 && (w = 0),
                            i.roundLengths && (w = Math.floor(w)),
                            x % i.slidesPerGroup == 0 && c.push(w),
                            h.push(w)) : (i.roundLengths && (w = Math.floor(w)),
                            (x - Math.min(e.params.slidesPerGroupSkip, x)) % e.params.slidesPerGroup == 0 && c.push(w),
                            h.push(w),
                            w = w + C + y),
                            e.virtualSize += C + y,
                            E = C,
                            x += 1
                        }
                    }
                    if (e.virtualSize = Math.max(e.virtualSize, r) + m,
                    n && l && ("slide" === i.effect || "coverflow" === i.effect) && s.css({
                        width: e.virtualSize + i.spaceBetween + "px"
                    }),
                    i.setWrapperSize)
                        s.css(((z = {})[t("width")] = e.virtualSize + i.spaceBetween + "px",
                        z));
                    if (i.slidesPerColumn > 1)
                        if (e.virtualSize = (C + i.spaceBetween) * T,
                        e.virtualSize = Math.ceil(e.virtualSize / i.slidesPerColumn) - i.spaceBetween,
                        s.css(((P = {})[t("width")] = e.virtualSize + i.spaceBetween + "px",
                        P)),
                        i.centeredSlides) {
                            M = [];
                            for (var Z = 0; Z < c.length; Z += 1) {
                                var J = c[Z];
                                i.roundLengths && (J = Math.floor(J)),
                                c[Z] < e.virtualSize + c[0] && M.push(J)
                            }
                            c = M
                        }
                    if (!i.centeredSlides) {
                        M = [];
                        for (var Q = 0; Q < c.length; Q += 1) {
                            var ee = c[Q];
                            i.roundLengths && (ee = Math.floor(ee)),
                            c[Q] <= e.virtualSize - r && M.push(ee)
                        }
                        c = M,
                        Math.floor(e.virtualSize - r) - Math.floor(c[c.length - 1]) > 1 && c.push(e.virtualSize - r)
                    }
                    if (0 === c.length && (c = [0]),
                    0 !== i.spaceBetween) {
                        var te, ae = e.isHorizontal() && n ? "marginLeft" : t("marginRight");
                        p.filter((function(e, t) {
                            return !i.cssMode || t !== p.length - 1
                        }
                        )).css(((te = {})[ae] = y + "px",
                        te))
                    }
                    if (i.centeredSlides && i.centeredSlidesBounds) {
                        var ie = 0;
                        v.forEach((function(e) {
                            ie += e + (i.spaceBetween ? i.spaceBetween : 0)
                        }
                        ));
                        var se = (ie -= i.spaceBetween) - r;
                        c = c.map((function(e) {
                            return e < 0 ? -f : e > se ? se + m : e
                        }
                        ))
                    }
                    if (i.centerInsufficientSlides) {
                        var re = 0;
                        if (v.forEach((function(e) {
                            re += e + (i.spaceBetween ? i.spaceBetween : 0)
                        }
                        )),
                        (re -= i.spaceBetween) < r) {
                            var ne = (r - re) / 2;
                            c.forEach((function(e, t) {
                                c[t] = e - ne
                            }
                            )),
                            h.forEach((function(e, t) {
                                h[t] = e + ne
                            }
                            ))
                        }
                    }
                    S(e, {
                        slides: p,
                        snapGrid: c,
                        slidesGrid: h,
                        slidesSizesGrid: v
                    }),
                    u !== d && e.emit("slidesLengthChange"),
                    c.length !== g && (e.params.watchOverflow && e.checkOverflow(),
                    e.emit("snapGridLengthChange")),
                    h.length !== b && e.emit("slidesGridLengthChange"),
                    (i.watchSlidesProgress || i.watchSlidesVisibility) && e.updateSlidesOffset()
                }
            },
            updateAutoHeight: function(e) {
                var t, a = this, i = [], s = a.virtual && a.params.virtual.enabled, r = 0;
                "number" == typeof e ? a.setTransition(e) : !0 === e && a.setTransition(a.params.speed);
                var n = function(e) {
                    return s ? a.slides.filter((function(t) {
                        return parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
                    }
                    ))[0] : a.slides.eq(e)[0]
                };
                if ("auto" !== a.params.slidesPerView && a.params.slidesPerView > 1)
                    if (a.params.centeredSlides)
                        a.visibleSlides.each((function(e) {
                            i.push(e)
                        }
                        ));
                    else
                        for (t = 0; t < Math.ceil(a.params.slidesPerView); t += 1) {
                            var l = a.activeIndex + t;
                            if (l > a.slides.length && !s)
                                break;
                            i.push(n(l))
                        }
                else
                    i.push(n(a.activeIndex));
                for (t = 0; t < i.length; t += 1)
                    if (void 0 !== i[t]) {
                        var o = i[t].offsetHeight;
                        r = o > r ? o : r
                    }
                r && a.$wrapperEl.css("height", r + "px")
            },
            updateSlidesOffset: function() {
                for (var e = this.slides, t = 0; t < e.length; t += 1)
                    e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
            },
            updateSlidesProgress: function(e) {
                void 0 === e && (e = this && this.translate || 0);
                var t = this
                  , a = t.params
                  , i = t.slides
                  , s = t.rtlTranslate;
                if (0 !== i.length) {
                    void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
                    var r = -e;
                    s && (r = e),
                    i.removeClass(a.slideVisibleClass),
                    t.visibleSlidesIndexes = [],
                    t.visibleSlides = [];
                    for (var n = 0; n < i.length; n += 1) {
                        var l = i[n]
                          , o = (r + (a.centeredSlides ? t.minTranslate() : 0) - l.swiperSlideOffset) / (l.swiperSlideSize + a.spaceBetween);
                        if (a.watchSlidesVisibility || a.centeredSlides && a.autoHeight) {
                            var d = -(r - l.swiperSlideOffset)
                              , p = d + t.slidesSizesGrid[n];
                            (d >= 0 && d < t.size - 1 || p > 1 && p <= t.size || d <= 0 && p >= t.size) && (t.visibleSlides.push(l),
                            t.visibleSlidesIndexes.push(n),
                            i.eq(n).addClass(a.slideVisibleClass))
                        }
                        l.progress = s ? -o : o
                    }
                    t.visibleSlides = m(t.visibleSlides)
                }
            },
            updateProgress: function(e) {
                var t = this;
                if (void 0 === e) {
                    var a = t.rtlTranslate ? -1 : 1;
                    e = t && t.translate && t.translate * a || 0
                }
                var i = t.params
                  , s = t.maxTranslate() - t.minTranslate()
                  , r = t.progress
                  , n = t.isBeginning
                  , l = t.isEnd
                  , o = n
                  , d = l;
                0 === s ? (r = 0,
                n = !0,
                l = !0) : (n = (r = (e - t.minTranslate()) / s) <= 0,
                l = r >= 1),
                S(t, {
                    progress: r,
                    isBeginning: n,
                    isEnd: l
                }),
                (i.watchSlidesProgress || i.watchSlidesVisibility || i.centeredSlides && i.autoHeight) && t.updateSlidesProgress(e),
                n && !o && t.emit("reachBeginning toEdge"),
                l && !d && t.emit("reachEnd toEdge"),
                (o && !n || d && !l) && t.emit("fromEdge"),
                t.emit("progress", r)
            },
            updateSlidesClasses: function() {
                var e, t = this, a = t.slides, i = t.params, s = t.$wrapperEl, r = t.activeIndex, n = t.realIndex, l = t.virtual && i.virtual.enabled;
                a.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass),
                (e = l ? t.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + r + '"]') : a.eq(r)).addClass(i.slideActiveClass),
                i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass));
                var o = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
                i.loop && 0 === o.length && (o = a.eq(0)).addClass(i.slideNextClass);
                var d = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
                i.loop && 0 === d.length && (d = a.eq(-1)).addClass(i.slidePrevClass),
                i.loop && (o.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass),
                d.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass)),
                t.emitSlidesClasses()
            },
            updateActiveIndex: function(e) {
                var t, a = this, i = a.rtlTranslate ? a.translate : -a.translate, s = a.slidesGrid, r = a.snapGrid, n = a.params, l = a.activeIndex, o = a.realIndex, d = a.snapIndex, p = e;
                if (void 0 === p) {
                    for (var u = 0; u < s.length; u += 1)
                        void 0 !== s[u + 1] ? i >= s[u] && i < s[u + 1] - (s[u + 1] - s[u]) / 2 ? p = u : i >= s[u] && i < s[u + 1] && (p = u + 1) : i >= s[u] && (p = u);
                    n.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0)
                }
                if (r.indexOf(i) >= 0)
                    t = r.indexOf(i);
                else {
                    var c = Math.min(n.slidesPerGroupSkip, p);
                    t = c + Math.floor((p - c) / n.slidesPerGroup)
                }
                if (t >= r.length && (t = r.length - 1),
                p !== l) {
                    var h = parseInt(a.slides.eq(p).attr("data-swiper-slide-index") || p, 10);
                    S(a, {
                        snapIndex: t,
                        realIndex: h,
                        previousIndex: l,
                        activeIndex: p
                    }),
                    a.emit("activeIndexChange"),
                    a.emit("snapIndexChange"),
                    o !== h && a.emit("realIndexChange"),
                    (a.initialized || a.params.runCallbacksOnInit) && a.emit("slideChange")
                } else
                    t !== d && (a.snapIndex = t,
                    a.emit("snapIndexChange"))
            },
            updateClickedSlide: function(e) {
                var t, a = this, i = a.params, s = m(e.target).closest("." + i.slideClass)[0], r = !1;
                if (s)
                    for (var n = 0; n < a.slides.length; n += 1)
                        if (a.slides[n] === s) {
                            r = !0,
                            t = n;
                            break
                        }
                if (!s || !r)
                    return a.clickedSlide = void 0,
                    void (a.clickedIndex = void 0);
                a.clickedSlide = s,
                a.virtual && a.params.virtual.enabled ? a.clickedIndex = parseInt(m(s).attr("data-swiper-slide-index"), 10) : a.clickedIndex = t,
                i.slideToClickedSlide && void 0 !== a.clickedIndex && a.clickedIndex !== a.activeIndex && a.slideToClickedSlide()
            }
        },
        translate: {
            getTranslate: function(e) {
                void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                var t = this
                  , a = t.params
                  , i = t.rtlTranslate
                  , s = t.translate
                  , r = t.$wrapperEl;
                if (a.virtualTranslate)
                    return i ? -s : s;
                if (a.cssMode)
                    return s;
                var n = T(r[0], e);
                return i && (n = -n),
                n || 0
            },
            setTranslate: function(e, t) {
                var a = this
                  , i = a.rtlTranslate
                  , s = a.params
                  , r = a.$wrapperEl
                  , n = a.wrapperEl
                  , l = a.progress
                  , o = 0
                  , d = 0;
                a.isHorizontal() ? o = i ? -e : e : d = e,
                s.roundLengths && (o = Math.floor(o),
                d = Math.floor(d)),
                s.cssMode ? n[a.isHorizontal() ? "scrollLeft" : "scrollTop"] = a.isHorizontal() ? -o : -d : s.virtualTranslate || r.transform("translate3d(" + o + "px, " + d + "px, 0px)"),
                a.previousTranslate = a.translate,
                a.translate = a.isHorizontal() ? o : d;
                var p = a.maxTranslate() - a.minTranslate();
                (0 === p ? 0 : (e - a.minTranslate()) / p) !== l && a.updateProgress(e),
                a.emit("setTranslate", a.translate, t)
            },
            minTranslate: function() {
                return -this.snapGrid[0]
            },
            maxTranslate: function() {
                return -this.snapGrid[this.snapGrid.length - 1]
            },
            translateTo: function(e, t, a, i, s) {
                void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === a && (a = !0),
                void 0 === i && (i = !0);
                var r = this
                  , n = r.params
                  , l = r.wrapperEl;
                if (r.animating && n.preventInteractionOnTransition)
                    return !1;
                var o, d = r.minTranslate(), p = r.maxTranslate();
                if (o = i && e > d ? d : i && e < p ? p : e,
                r.updateProgress(o),
                n.cssMode) {
                    var u, c = r.isHorizontal();
                    if (0 === t)
                        l[c ? "scrollLeft" : "scrollTop"] = -o;
                    else if (l.scrollTo)
                        l.scrollTo(((u = {})[c ? "left" : "top"] = -o,
                        u.behavior = "smooth",
                        u));
                    else
                        l[c ? "scrollLeft" : "scrollTop"] = -o;
                    return !0
                }
                return 0 === t ? (r.setTransition(0),
                r.setTranslate(o),
                a && (r.emit("beforeTransitionStart", t, s),
                r.emit("transitionEnd"))) : (r.setTransition(t),
                r.setTranslate(o),
                a && (r.emit("beforeTransitionStart", t, s),
                r.emit("transitionStart")),
                r.animating || (r.animating = !0,
                r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function(e) {
                    r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd),
                    r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd),
                    r.onTranslateToWrapperTransitionEnd = null,
                    delete r.onTranslateToWrapperTransitionEnd,
                    a && r.emit("transitionEnd"))
                }
                ),
                r.$wrapperEl[0].addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd),
                r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd))),
                !0
            }
        },
        transition: {
            setTransition: function(e, t) {
                var a = this;
                a.params.cssMode || a.$wrapperEl.transition(e),
                a.emit("setTransition", e, t)
            },
            transitionStart: function(e, t) {
                void 0 === e && (e = !0);
                var a = this
                  , i = a.activeIndex
                  , s = a.params
                  , r = a.previousIndex;
                if (!s.cssMode) {
                    s.autoHeight && a.updateAutoHeight();
                    var n = t;
                    if (n || (n = i > r ? "next" : i < r ? "prev" : "reset"),
                    a.emit("transitionStart"),
                    e && i !== r) {
                        if ("reset" === n)
                            return void a.emit("slideResetTransitionStart");
                        a.emit("slideChangeTransitionStart"),
                        "next" === n ? a.emit("slideNextTransitionStart") : a.emit("slidePrevTransitionStart")
                    }
                }
            },
            transitionEnd: function(e, t) {
                void 0 === e && (e = !0);
                var a = this
                  , i = a.activeIndex
                  , s = a.previousIndex
                  , r = a.params;
                if (a.animating = !1,
                !r.cssMode) {
                    a.setTransition(0);
                    var n = t;
                    if (n || (n = i > s ? "next" : i < s ? "prev" : "reset"),
                    a.emit("transitionEnd"),
                    e && i !== s) {
                        if ("reset" === n)
                            return void a.emit("slideResetTransitionEnd");
                        a.emit("slideChangeTransitionEnd"),
                        "next" === n ? a.emit("slideNextTransitionEnd") : a.emit("slidePrevTransitionEnd")
                    }
                }
            }
        },
        slide: {
            slideTo: function(e, t, a, i, s) {
                if (void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === a && (a = !0),
                "number" != typeof e && "string" != typeof e)
                    throw new Error("The 'index' argument cannot have type other than 'number' or 'string'. [" + typeof e + "] given.");
                if ("string" == typeof e) {
                    var r = parseInt(e, 10);
                    if (!isFinite(r))
                        throw new Error("The passed-in 'index' (string) couldn't be converted to 'number'. [" + e + "] given.");
                    e = r
                }
                var n = this
                  , l = e;
                l < 0 && (l = 0);
                var o = n.params
                  , d = n.snapGrid
                  , p = n.slidesGrid
                  , u = n.previousIndex
                  , c = n.activeIndex
                  , h = n.rtlTranslate
                  , v = n.wrapperEl
                  , f = n.enabled;
                if (n.animating && o.preventInteractionOnTransition || !f && !i && !s)
                    return !1;
                var m = Math.min(n.params.slidesPerGroupSkip, l)
                  , g = m + Math.floor((l - m) / n.params.slidesPerGroup);
                g >= d.length && (g = d.length - 1),
                (c || o.initialSlide || 0) === (u || 0) && a && n.emit("beforeSlideChangeStart");
                var b, y = -d[g];
                if (n.updateProgress(y),
                o.normalizeSlideIndex)
                    for (var w = 0; w < p.length; w += 1) {
                        var E = -Math.floor(100 * y)
                          , x = Math.floor(100 * p[w])
                          , T = Math.floor(100 * p[w + 1]);
                        void 0 !== p[w + 1] ? E >= x && E < T - (T - x) / 2 ? l = w : E >= x && E < T && (l = w + 1) : E >= x && (l = w)
                    }
                if (n.initialized && l !== c) {
                    if (!n.allowSlideNext && y < n.translate && y < n.minTranslate())
                        return !1;
                    if (!n.allowSlidePrev && y > n.translate && y > n.maxTranslate() && (c || 0) !== l)
                        return !1
                }
                if (b = l > c ? "next" : l < c ? "prev" : "reset",
                h && -y === n.translate || !h && y === n.translate)
                    return n.updateActiveIndex(l),
                    o.autoHeight && n.updateAutoHeight(),
                    n.updateSlidesClasses(),
                    "slide" !== o.effect && n.setTranslate(y),
                    "reset" !== b && (n.transitionStart(a, b),
                    n.transitionEnd(a, b)),
                    !1;
                if (o.cssMode) {
                    var C, S = n.isHorizontal(), M = -y;
                    if (h && (M = v.scrollWidth - v.offsetWidth - M),
                    0 === t)
                        v[S ? "scrollLeft" : "scrollTop"] = M;
                    else if (v.scrollTo)
                        v.scrollTo(((C = {})[S ? "left" : "top"] = M,
                        C.behavior = "smooth",
                        C));
                    else
                        v[S ? "scrollLeft" : "scrollTop"] = M;
                    return !0
                }
                return 0 === t ? (n.setTransition(0),
                n.setTranslate(y),
                n.updateActiveIndex(l),
                n.updateSlidesClasses(),
                n.emit("beforeTransitionStart", t, i),
                n.transitionStart(a, b),
                n.transitionEnd(a, b)) : (n.setTransition(t),
                n.setTranslate(y),
                n.updateActiveIndex(l),
                n.updateSlidesClasses(),
                n.emit("beforeTransitionStart", t, i),
                n.transitionStart(a, b),
                n.animating || (n.animating = !0,
                n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function(e) {
                    n && !n.destroyed && e.target === this && (n.$wrapperEl[0].removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd),
                    n.$wrapperEl[0].removeEventListener("webkitTransitionEnd", n.onSlideToWrapperTransitionEnd),
                    n.onSlideToWrapperTransitionEnd = null,
                    delete n.onSlideToWrapperTransitionEnd,
                    n.transitionEnd(a, b))
                }
                ),
                n.$wrapperEl[0].addEventListener("transitionend", n.onSlideToWrapperTransitionEnd),
                n.$wrapperEl[0].addEventListener("webkitTransitionEnd", n.onSlideToWrapperTransitionEnd))),
                !0
            },
            slideToLoop: function(e, t, a, i) {
                void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === a && (a = !0);
                var s = this
                  , r = e;
                return s.params.loop && (r += s.loopedSlides),
                s.slideTo(r, t, a, i)
            },
            slideNext: function(e, t, a) {
                void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0);
                var i = this
                  , s = i.params
                  , r = i.animating;
                if (!i.enabled)
                    return i;
                var n = i.activeIndex < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup;
                if (s.loop) {
                    if (r && s.loopPreventsSlide)
                        return !1;
                    i.loopFix(),
                    i._clientLeft = i.$wrapperEl[0].clientLeft
                }
                return i.slideTo(i.activeIndex + n, e, t, a)
            },
            slidePrev: function(e, t, a) {
                void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0);
                var i = this
                  , s = i.params
                  , r = i.animating
                  , n = i.snapGrid
                  , l = i.slidesGrid
                  , o = i.rtlTranslate;
                if (!i.enabled)
                    return i;
                if (s.loop) {
                    if (r && s.loopPreventsSlide)
                        return !1;
                    i.loopFix(),
                    i._clientLeft = i.$wrapperEl[0].clientLeft
                }
                function d(e) {
                    return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
                }
                var p = d(o ? i.translate : -i.translate)
                  , u = n.map((function(e) {
                    return d(e)
                }
                ));
                n[u.indexOf(p)];
                var c, h = n[u.indexOf(p) - 1];
                return void 0 === h && s.cssMode && n.forEach((function(e) {
                    !h && p >= e && (h = e)
                }
                )),
                void 0 !== h && (c = l.indexOf(h)) < 0 && (c = i.activeIndex - 1),
                i.slideTo(c, e, t, a)
            },
            slideReset: function(e, t, a) {
                return void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0),
                this.slideTo(this.activeIndex, e, t, a)
            },
            slideToClosest: function(e, t, a, i) {
                void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0),
                void 0 === i && (i = .5);
                var s = this
                  , r = s.activeIndex
                  , n = Math.min(s.params.slidesPerGroupSkip, r)
                  , l = n + Math.floor((r - n) / s.params.slidesPerGroup)
                  , o = s.rtlTranslate ? s.translate : -s.translate;
                if (o >= s.snapGrid[l]) {
                    var d = s.snapGrid[l];
                    o - d > (s.snapGrid[l + 1] - d) * i && (r += s.params.slidesPerGroup)
                } else {
                    var p = s.snapGrid[l - 1];
                    o - p <= (s.snapGrid[l] - p) * i && (r -= s.params.slidesPerGroup)
                }
                return r = Math.max(r, 0),
                r = Math.min(r, s.slidesGrid.length - 1),
                s.slideTo(r, e, t, a)
            },
            slideToClickedSlide: function() {
                var e, t = this, a = t.params, i = t.$wrapperEl, s = "auto" === a.slidesPerView ? t.slidesPerViewDynamic() : a.slidesPerView, r = t.clickedIndex;
                if (a.loop) {
                    if (t.animating)
                        return;
                    e = parseInt(m(t.clickedSlide).attr("data-swiper-slide-index"), 10),
                    a.centeredSlides ? r < t.loopedSlides - s / 2 || r > t.slides.length - t.loopedSlides + s / 2 ? (t.loopFix(),
                    r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(),
                    E((function() {
                        t.slideTo(r)
                    }
                    ))) : t.slideTo(r) : r > t.slides.length - s ? (t.loopFix(),
                    r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(),
                    E((function() {
                        t.slideTo(r)
                    }
                    ))) : t.slideTo(r)
                } else
                    t.slideTo(r)
            }
        },
        loop: {
            loopCreate: function() {
                var e = this
                  , t = r()
                  , a = e.params
                  , i = e.$wrapperEl;
                i.children("." + a.slideClass + "." + a.slideDuplicateClass).remove();
                var s = i.children("." + a.slideClass);
                if (a.loopFillGroupWithBlank) {
                    var n = a.slidesPerGroup - s.length % a.slidesPerGroup;
                    if (n !== a.slidesPerGroup) {
                        for (var l = 0; l < n; l += 1) {
                            var o = m(t.createElement("div")).addClass(a.slideClass + " " + a.slideBlankClass);
                            i.append(o)
                        }
                        s = i.children("." + a.slideClass)
                    }
                }
                "auto" !== a.slidesPerView || a.loopedSlides || (a.loopedSlides = s.length),
                e.loopedSlides = Math.ceil(parseFloat(a.loopedSlides || a.slidesPerView, 10)),
                e.loopedSlides += a.loopAdditionalSlides,
                e.loopedSlides > s.length && (e.loopedSlides = s.length);
                var d = []
                  , p = [];
                s.each((function(t, a) {
                    var i = m(t);
                    a < e.loopedSlides && p.push(t),
                    a < s.length && a >= s.length - e.loopedSlides && d.push(t),
                    i.attr("data-swiper-slide-index", a)
                }
                ));
                for (var u = 0; u < p.length; u += 1)
                    i.append(m(p[u].cloneNode(!0)).addClass(a.slideDuplicateClass));
                for (var c = d.length - 1; c >= 0; c -= 1)
                    i.prepend(m(d[c].cloneNode(!0)).addClass(a.slideDuplicateClass))
            },
            loopFix: function() {
                var e = this;
                e.emit("beforeLoopFix");
                var t, a = e.activeIndex, i = e.slides, s = e.loopedSlides, r = e.allowSlidePrev, n = e.allowSlideNext, l = e.snapGrid, o = e.rtlTranslate;
                e.allowSlidePrev = !0,
                e.allowSlideNext = !0;
                var d = -l[a] - e.getTranslate();
                if (a < s)
                    t = i.length - 3 * s + a,
                    t += s,
                    e.slideTo(t, 0, !1, !0) && 0 !== d && e.setTranslate((o ? -e.translate : e.translate) - d);
                else if (a >= i.length - s) {
                    t = -i.length + a + s,
                    t += s,
                    e.slideTo(t, 0, !1, !0) && 0 !== d && e.setTranslate((o ? -e.translate : e.translate) - d)
                }
                e.allowSlidePrev = r,
                e.allowSlideNext = n,
                e.emit("loopFix")
            },
            loopDestroy: function() {
                var e = this
                  , t = e.$wrapperEl
                  , a = e.params
                  , i = e.slides;
                t.children("." + a.slideClass + "." + a.slideDuplicateClass + ",." + a.slideClass + "." + a.slideBlankClass).remove(),
                i.removeAttr("data-swiper-slide-index")
            }
        },
        grabCursor: {
            setGrabCursor: function(e) {
                var t = this;
                if (!(t.support.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode)) {
                    var a = t.el;
                    a.style.cursor = "move",
                    a.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab",
                    a.style.cursor = e ? "-moz-grabbin" : "-moz-grab",
                    a.style.cursor = e ? "grabbing" : "grab"
                }
            },
            unsetGrabCursor: function() {
                var e = this;
                e.support.touch || e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.el.style.cursor = "")
            }
        },
        manipulation: {
            appendSlide: function(e) {
                var t = this
                  , a = t.$wrapperEl
                  , i = t.params;
                if (i.loop && t.loopDestroy(),
                "object" == typeof e && "length"in e)
                    for (var s = 0; s < e.length; s += 1)
                        e[s] && a.append(e[s]);
                else
                    a.append(e);
                i.loop && t.loopCreate(),
                i.observer && t.support.observer || t.update()
            },
            prependSlide: function(e) {
                var t = this
                  , a = t.params
                  , i = t.$wrapperEl
                  , s = t.activeIndex;
                a.loop && t.loopDestroy();
                var r = s + 1;
                if ("object" == typeof e && "length"in e) {
                    for (var n = 0; n < e.length; n += 1)
                        e[n] && i.prepend(e[n]);
                    r = s + e.length
                } else
                    i.prepend(e);
                a.loop && t.loopCreate(),
                a.observer && t.support.observer || t.update(),
                t.slideTo(r, 0, !1)
            },
            addSlide: function(e, t) {
                var a = this
                  , i = a.$wrapperEl
                  , s = a.params
                  , r = a.activeIndex;
                s.loop && (r -= a.loopedSlides,
                a.loopDestroy(),
                a.slides = i.children("." + s.slideClass));
                var n = a.slides.length;
                if (e <= 0)
                    a.prependSlide(t);
                else if (e >= n)
                    a.appendSlide(t);
                else {
                    for (var l = r > e ? r + 1 : r, o = [], d = n - 1; d >= e; d -= 1) {
                        var p = a.slides.eq(d);
                        p.remove(),
                        o.unshift(p)
                    }
                    if ("object" == typeof t && "length"in t) {
                        for (var u = 0; u < t.length; u += 1)
                            t[u] && i.append(t[u]);
                        l = r > e ? r + t.length : r
                    } else
                        i.append(t);
                    for (var c = 0; c < o.length; c += 1)
                        i.append(o[c]);
                    s.loop && a.loopCreate(),
                    s.observer && a.support.observer || a.update(),
                    s.loop ? a.slideTo(l + a.loopedSlides, 0, !1) : a.slideTo(l, 0, !1)
                }
            },
            removeSlide: function(e) {
                var t = this
                  , a = t.params
                  , i = t.$wrapperEl
                  , s = t.activeIndex;
                a.loop && (s -= t.loopedSlides,
                t.loopDestroy(),
                t.slides = i.children("." + a.slideClass));
                var r, n = s;
                if ("object" == typeof e && "length"in e) {
                    for (var l = 0; l < e.length; l += 1)
                        r = e[l],
                        t.slides[r] && t.slides.eq(r).remove(),
                        r < n && (n -= 1);
                    n = Math.max(n, 0)
                } else
                    r = e,
                    t.slides[r] && t.slides.eq(r).remove(),
                    r < n && (n -= 1),
                    n = Math.max(n, 0);
                a.loop && t.loopCreate(),
                a.observer && t.support.observer || t.update(),
                a.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1)
            },
            removeAllSlides: function() {
                for (var e = [], t = 0; t < this.slides.length; t += 1)
                    e.push(t);
                this.removeSlide(e)
            }
        },
        events: {
            attachEvents: function() {
                var e = this
                  , t = r()
                  , a = e.params
                  , i = e.touchEvents
                  , s = e.el
                  , n = e.wrapperEl
                  , l = e.device
                  , o = e.support;
                e.onTouchStart = A.bind(e),
                e.onTouchMove = D.bind(e),
                e.onTouchEnd = N.bind(e),
                a.cssMode && (e.onScroll = H.bind(e)),
                e.onClick = B.bind(e);
                var d = !!a.nested;
                if (!o.touch && o.pointerEvents)
                    s.addEventListener(i.start, e.onTouchStart, !1),
                    t.addEventListener(i.move, e.onTouchMove, d),
                    t.addEventListener(i.end, e.onTouchEnd, !1);
                else {
                    if (o.touch) {
                        var p = !("touchstart" !== i.start || !o.passiveListener || !a.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        s.addEventListener(i.start, e.onTouchStart, p),
                        s.addEventListener(i.move, e.onTouchMove, o.passiveListener ? {
                            passive: !1,
                            capture: d
                        } : d),
                        s.addEventListener(i.end, e.onTouchEnd, p),
                        i.cancel && s.addEventListener(i.cancel, e.onTouchEnd, p),
                        X || (t.addEventListener("touchstart", Y),
                        X = !0)
                    }
                    (a.simulateTouch && !l.ios && !l.android || a.simulateTouch && !o.touch && l.ios) && (s.addEventListener("mousedown", e.onTouchStart, !1),
                    t.addEventListener("mousemove", e.onTouchMove, d),
                    t.addEventListener("mouseup", e.onTouchEnd, !1))
                }
                (a.preventClicks || a.preventClicksPropagation) && s.addEventListener("click", e.onClick, !0),
                a.cssMode && n.addEventListener("scroll", e.onScroll),
                a.updateOnWindowResize ? e.on(l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G, !0) : e.on("observerUpdate", G, !0)
            },
            detachEvents: function() {
                var e = this
                  , t = r()
                  , a = e.params
                  , i = e.touchEvents
                  , s = e.el
                  , n = e.wrapperEl
                  , l = e.device
                  , o = e.support
                  , d = !!a.nested;
                if (!o.touch && o.pointerEvents)
                    s.removeEventListener(i.start, e.onTouchStart, !1),
                    t.removeEventListener(i.move, e.onTouchMove, d),
                    t.removeEventListener(i.end, e.onTouchEnd, !1);
                else {
                    if (o.touch) {
                        var p = !("onTouchStart" !== i.start || !o.passiveListener || !a.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        s.removeEventListener(i.start, e.onTouchStart, p),
                        s.removeEventListener(i.move, e.onTouchMove, d),
                        s.removeEventListener(i.end, e.onTouchEnd, p),
                        i.cancel && s.removeEventListener(i.cancel, e.onTouchEnd, p)
                    }
                    (a.simulateTouch && !l.ios && !l.android || a.simulateTouch && !o.touch && l.ios) && (s.removeEventListener("mousedown", e.onTouchStart, !1),
                    t.removeEventListener("mousemove", e.onTouchMove, d),
                    t.removeEventListener("mouseup", e.onTouchEnd, !1))
                }
                (a.preventClicks || a.preventClicksPropagation) && s.removeEventListener("click", e.onClick, !0),
                a.cssMode && n.removeEventListener("scroll", e.onScroll),
                e.off(l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G)
            }
        },
        breakpoints: {
            setBreakpoint: function() {
                var e = this
                  , t = e.activeIndex
                  , a = e.initialized
                  , i = e.loopedSlides
                  , s = void 0 === i ? 0 : i
                  , r = e.params
                  , n = e.$el
                  , l = r.breakpoints;
                if (l && (!l || 0 !== Object.keys(l).length)) {
                    var o = e.getBreakpoint(l, e.params.breakpointsBase, e.el);
                    if (o && e.currentBreakpoint !== o) {
                        var d = o in l ? l[o] : void 0;
                        d && ["slidesPerView", "spaceBetween", "slidesPerGroup", "slidesPerGroupSkip", "slidesPerColumn"].forEach((function(e) {
                            var t = d[e];
                            void 0 !== t && (d[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                        }
                        ));
                        var p = d || e.originalParams
                          , u = r.slidesPerColumn > 1
                          , c = p.slidesPerColumn > 1
                          , h = r.enabled;
                        u && !c ? (n.removeClass(r.containerModifierClass + "multirow " + r.containerModifierClass + "multirow-column"),
                        e.emitContainerClasses()) : !u && c && (n.addClass(r.containerModifierClass + "multirow"),
                        "column" === p.slidesPerColumnFill && n.addClass(r.containerModifierClass + "multirow-column"),
                        e.emitContainerClasses());
                        var v = p.direction && p.direction !== r.direction
                          , f = r.loop && (p.slidesPerView !== r.slidesPerView || v);
                        v && a && e.changeDirection(),
                        S(e.params, p);
                        var m = e.params.enabled;
                        S(e, {
                            allowTouchMove: e.params.allowTouchMove,
                            allowSlideNext: e.params.allowSlideNext,
                            allowSlidePrev: e.params.allowSlidePrev
                        }),
                        h && !m ? e.disable() : !h && m && e.enable(),
                        e.currentBreakpoint = o,
                        e.emit("_beforeBreakpoint", p),
                        f && a && (e.loopDestroy(),
                        e.loopCreate(),
                        e.updateSlides(),
                        e.slideTo(t - s + e.loopedSlides, 0, !1)),
                        e.emit("breakpoint", p)
                    }
                }
            },
            getBreakpoint: function(e, t, a) {
                if (void 0 === t && (t = "window"),
                e && ("container" !== t || a)) {
                    var i = !1
                      , s = l()
                      , r = "window" === t ? s.innerWidth : a.clientWidth
                      , n = "window" === t ? s.innerHeight : a.clientHeight
                      , o = Object.keys(e).map((function(e) {
                        if ("string" == typeof e && 0 === e.indexOf("@")) {
                            var t = parseFloat(e.substr(1));
                            return {
                                value: n * t,
                                point: e
                            }
                        }
                        return {
                            value: e,
                            point: e
                        }
                    }
                    ));
                    o.sort((function(e, t) {
                        return parseInt(e.value, 10) - parseInt(t.value, 10)
                    }
                    ));
                    for (var d = 0; d < o.length; d += 1) {
                        var p = o[d]
                          , u = p.point;
                        p.value <= r && (i = u)
                    }
                    return i || "max"
                }
            }
        },
        checkOverflow: {
            checkOverflow: function() {
                var e = this
                  , t = e.params
                  , a = e.isLocked
                  , i = e.slides.length > 0 && t.slidesOffsetBefore + t.spaceBetween * (e.slides.length - 1) + e.slides[0].offsetWidth * e.slides.length;
                t.slidesOffsetBefore && t.slidesOffsetAfter && i ? e.isLocked = i <= e.size : e.isLocked = 1 === e.snapGrid.length,
                e.allowSlideNext = !e.isLocked,
                e.allowSlidePrev = !e.isLocked,
                a !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"),
                a && a !== e.isLocked && (e.isEnd = !1,
                e.navigation && e.navigation.update())
            }
        },
        classes: {
            addClasses: function() {
                var e, t, a, i = this, s = i.classNames, r = i.params, n = i.rtl, l = i.$el, o = i.device, d = i.support, p = (e = ["initialized", r.direction, {
                    "pointer-events": d.pointerEvents && !d.touch
                }, {
                    "free-mode": r.freeMode
                }, {
                    autoheight: r.autoHeight
                }, {
                    rtl: n
                }, {
                    multirow: r.slidesPerColumn > 1
                }, {
                    "multirow-column": r.slidesPerColumn > 1 && "column" === r.slidesPerColumnFill
                }, {
                    android: o.android
                }, {
                    ios: o.ios
                }, {
                    "css-mode": r.cssMode
                }],
                t = r.containerModifierClass,
                a = [],
                e.forEach((function(e) {
                    "object" == typeof e ? Object.keys(e).forEach((function(i) {
                        e[i] && a.push(t + i)
                    }
                    )) : "string" == typeof e && a.push(t + e)
                }
                )),
                a);
                s.push.apply(s, p),
                l.addClass([].concat(s).join(" ")),
                i.emitContainerClasses()
            },
            removeClasses: function() {
                var e = this
                  , t = e.$el
                  , a = e.classNames;
                t.removeClass(a.join(" ")),
                e.emitContainerClasses()
            }
        },
        images: {
            loadImage: function(e, t, a, i, s, r) {
                var n, o = l();
                function d() {
                    r && r()
                }
                m(e).parent("picture")[0] || e.complete && s ? d() : t ? ((n = new o.Image).onload = d,
                n.onerror = d,
                i && (n.sizes = i),
                a && (n.srcset = a),
                t && (n.src = t)) : d()
            },
            preloadImages: function() {
                var e = this;
                function t() {
                    null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                    e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(),
                    e.emit("imagesReady")))
                }
                e.imagesToLoad = e.$el.find("img");
                for (var a = 0; a < e.imagesToLoad.length; a += 1) {
                    var i = e.imagesToLoad[a];
                    e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, t)
                }
            }
        }
    }
      , V = {}
      , F = function() {
        function t() {
            for (var e, a, i = arguments.length, s = new Array(i), r = 0; r < i; r++)
                s[r] = arguments[r];
            if (1 === s.length && s[0].constructor && "Object" === Object.prototype.toString.call(s[0]).slice(8, -1) ? a = s[0] : (e = s[0],
            a = s[1]),
            a || (a = {}),
            a = S({}, a),
            e && !a.el && (a.el = e),
            a.el && m(a.el).length > 1) {
                var n = [];
                return m(a.el).each((function(e) {
                    var i = S({}, a, {
                        el: e
                    });
                    n.push(new t(i))
                }
                )),
                n
            }
            var l = this;
            l.__swiper__ = !0,
            l.support = P(),
            l.device = k({
                userAgent: a.userAgent
            }),
            l.browser = $(),
            l.eventsListeners = {},
            l.eventsAnyListeners = [],
            void 0 === l.modules && (l.modules = {}),
            Object.keys(l.modules).forEach((function(e) {
                var t = l.modules[e];
                if (t.params) {
                    var i = Object.keys(t.params)[0]
                      , s = t.params[i];
                    if ("object" != typeof s || null === s)
                        return;
                    if (!(i in a) || !("enabled"in s))
                        return;
                    !0 === a[i] && (a[i] = {
                        enabled: !0
                    }),
                    "object" != typeof a[i] || "enabled"in a[i] || (a[i].enabled = !0),
                    a[i] || (a[i] = {
                        enabled: !1
                    })
                }
            }
            ));
            var o, d, p = S({}, R);
            return l.useParams(p),
            l.params = S({}, p, V, a),
            l.originalParams = S({}, l.params),
            l.passedParams = S({}, a),
            l.params && l.params.on && Object.keys(l.params.on).forEach((function(e) {
                l.on(e, l.params.on[e])
            }
            )),
            l.params && l.params.onAny && l.onAny(l.params.onAny),
            l.$ = m,
            S(l, {
                enabled: l.params.enabled,
                el: e,
                classNames: [],
                slides: m(),
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal: function() {
                    return "horizontal" === l.params.direction
                },
                isVertical: function() {
                    return "vertical" === l.params.direction
                },
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                allowSlideNext: l.params.allowSlideNext,
                allowSlidePrev: l.params.allowSlidePrev,
                touchEvents: (o = ["touchstart", "touchmove", "touchend", "touchcancel"],
                d = ["mousedown", "mousemove", "mouseup"],
                l.support.pointerEvents && (d = ["pointerdown", "pointermove", "pointerup"]),
                l.touchEventsTouch = {
                    start: o[0],
                    move: o[1],
                    end: o[2],
                    cancel: o[3]
                },
                l.touchEventsDesktop = {
                    start: d[0],
                    move: d[1],
                    end: d[2]
                },
                l.support.touch || !l.params.simulateTouch ? l.touchEventsTouch : l.touchEventsDesktop),
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    formElements: "input, select, option, textarea, button, video, label",
                    lastClickTime: x(),
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    isTouchEvent: void 0,
                    startMoving: void 0
                },
                allowClick: !0,
                allowTouchMove: l.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            }),
            l.useModules(),
            l.emit("_swiper"),
            l.params.init && l.init(),
            l
        }
        var a, i, s, r = t.prototype;
        return r.enable = function() {
            var e = this;
            e.enabled || (e.enabled = !0,
            e.params.grabCursor && e.setGrabCursor(),
            e.emit("enable"))
        }
        ,
        r.disable = function() {
            var e = this;
            e.enabled && (e.enabled = !1,
            e.params.grabCursor && e.unsetGrabCursor(),
            e.emit("disable"))
        }
        ,
        r.setProgress = function(e, t) {
            var a = this;
            e = Math.min(Math.max(e, 0), 1);
            var i = a.minTranslate()
              , s = (a.maxTranslate() - i) * e + i;
            a.translateTo(s, void 0 === t ? 0 : t),
            a.updateActiveIndex(),
            a.updateSlidesClasses()
        }
        ,
        r.emitContainerClasses = function() {
            var e = this;
            if (e.params._emitClasses && e.el) {
                var t = e.el.className.split(" ").filter((function(t) {
                    return 0 === t.indexOf("swiper-container") || 0 === t.indexOf(e.params.containerModifierClass)
                }
                ));
                e.emit("_containerClasses", t.join(" "))
            }
        }
        ,
        r.getSlideClasses = function(e) {
            var t = this;
            return e.className.split(" ").filter((function(e) {
                return 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass)
            }
            )).join(" ")
        }
        ,
        r.emitSlidesClasses = function() {
            var e = this;
            if (e.params._emitClasses && e.el) {
                var t = [];
                e.slides.each((function(a) {
                    var i = e.getSlideClasses(a);
                    t.push({
                        slideEl: a,
                        classNames: i
                    }),
                    e.emit("_slideClass", a, i)
                }
                )),
                e.emit("_slideClasses", t)
            }
        }
        ,
        r.slidesPerViewDynamic = function() {
            var e = this
              , t = e.params
              , a = e.slides
              , i = e.slidesGrid
              , s = e.size
              , r = e.activeIndex
              , n = 1;
            if (t.centeredSlides) {
                for (var l, o = a[r].swiperSlideSize, d = r + 1; d < a.length; d += 1)
                    a[d] && !l && (n += 1,
                    (o += a[d].swiperSlideSize) > s && (l = !0));
                for (var p = r - 1; p >= 0; p -= 1)
                    a[p] && !l && (n += 1,
                    (o += a[p].swiperSlideSize) > s && (l = !0))
            } else
                for (var u = r + 1; u < a.length; u += 1)
                    i[u] - i[r] < s && (n += 1);
            return n
        }
        ,
        r.update = function() {
            var e = this;
            if (e && !e.destroyed) {
                var t = e.snapGrid
                  , a = e.params;
                a.breakpoints && e.setBreakpoint(),
                e.updateSize(),
                e.updateSlides(),
                e.updateProgress(),
                e.updateSlidesClasses(),
                e.params.freeMode ? (i(),
                e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || i(),
                a.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
                e.emit("update")
            }
            function i() {
                var t = e.rtlTranslate ? -1 * e.translate : e.translate
                  , a = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                e.setTranslate(a),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
            }
        }
        ,
        r.changeDirection = function(e, t) {
            void 0 === t && (t = !0);
            var a = this
              , i = a.params.direction;
            return e || (e = "horizontal" === i ? "vertical" : "horizontal"),
            e === i || "horizontal" !== e && "vertical" !== e || (a.$el.removeClass("" + a.params.containerModifierClass + i).addClass("" + a.params.containerModifierClass + e),
            a.emitContainerClasses(),
            a.params.direction = e,
            a.slides.each((function(t) {
                "vertical" === e ? t.style.width = "" : t.style.height = ""
            }
            )),
            a.emit("changeDirection"),
            t && a.update()),
            a
        }
        ,
        r.mount = function(e) {
            var t = this;
            if (t.mounted)
                return !0;
            var a, i = m(e || t.params.el);
            return !!(e = i[0]) && (e.swiper = t,
            e && e.shadowRoot && e.shadowRoot.querySelector ? (a = m(e.shadowRoot.querySelector("." + t.params.wrapperClass))).children = function(e) {
                return i.children(e)
            }
            : a = i.children("." + t.params.wrapperClass),
            S(t, {
                $el: i,
                el: e,
                $wrapperEl: a,
                wrapperEl: a[0],
                mounted: !0,
                rtl: "rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction"),
                rtlTranslate: "horizontal" === t.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction")),
                wrongRTL: "-webkit-box" === a.css("display")
            }),
            !0)
        }
        ,
        r.init = function(e) {
            var t = this;
            return t.initialized || !1 === t.mount(e) || (t.emit("beforeInit"),
            t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.params.loop && t.loopCreate(),
            t.updateSize(),
            t.updateSlides(),
            t.params.watchOverflow && t.checkOverflow(),
            t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.preloadImages && t.preloadImages(),
            t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
            t.attachEvents(),
            t.initialized = !0,
            t.emit("init"),
            t.emit("afterInit")),
            t
        }
        ,
        r.destroy = function(e, t) {
            void 0 === e && (e = !0),
            void 0 === t && (t = !0);
            var a, i = this, s = i.params, r = i.$el, n = i.$wrapperEl, l = i.slides;
            return void 0 === i.params || i.destroyed || (i.emit("beforeDestroy"),
            i.initialized = !1,
            i.detachEvents(),
            s.loop && i.loopDestroy(),
            t && (i.removeClasses(),
            r.removeAttr("style"),
            n.removeAttr("style"),
            l && l.length && l.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),
            i.emit("destroy"),
            Object.keys(i.eventsListeners).forEach((function(e) {
                i.off(e)
            }
            )),
            !1 !== e && (i.$el[0].swiper = null,
            a = i,
            Object.keys(a).forEach((function(e) {
                try {
                    a[e] = null
                } catch (e) {}
                try {
                    delete a[e]
                } catch (e) {}
            }
            ))),
            i.destroyed = !0),
            null
        }
        ,
        t.extendDefaults = function(e) {
            S(V, e)
        }
        ,
        t.installModule = function(e) {
            t.prototype.modules || (t.prototype.modules = {});
            var a = e.name || Object.keys(t.prototype.modules).length + "_" + x();
            t.prototype.modules[a] = e
        }
        ,
        t.use = function(e) {
            return Array.isArray(e) ? (e.forEach((function(e) {
                return t.installModule(e)
            }
            )),
            t) : (t.installModule(e),
            t)
        }
        ,
        a = t,
        s = [{
            key: "extendedDefaults",
            get: function() {
                return V
            }
        }, {
            key: "defaults",
            get: function() {
                return R
            }
        }],
        (i = null) && e(a.prototype, i),
        s && e(a, s),
        t
    }();
    Object.keys(W).forEach((function(e) {
        Object.keys(W[e]).forEach((function(t) {
            F.prototype[t] = W[e][t]
        }
        ))
    }
    )),
    F.use([L, O]);
    var _ = {
        update: function(e) {
            var t = this
              , a = t.params
              , i = a.slidesPerView
              , s = a.slidesPerGroup
              , r = a.centeredSlides
              , n = t.params.virtual
              , l = n.addSlidesBefore
              , o = n.addSlidesAfter
              , d = t.virtual
              , p = d.from
              , u = d.to
              , c = d.slides
              , h = d.slidesGrid
              , v = d.renderSlide
              , f = d.offset;
            t.updateActiveIndex();
            var m, g, b, y = t.activeIndex || 0;
            m = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top",
            r ? (g = Math.floor(i / 2) + s + o,
            b = Math.floor(i / 2) + s + l) : (g = i + (s - 1) + o,
            b = s + l);
            var w = Math.max((y || 0) - b, 0)
              , E = Math.min((y || 0) + g, c.length - 1)
              , x = (t.slidesGrid[w] || 0) - (t.slidesGrid[0] || 0);
            function T() {
                t.updateSlides(),
                t.updateProgress(),
                t.updateSlidesClasses(),
                t.lazy && t.params.lazy.enabled && t.lazy.load()
            }
            if (S(t.virtual, {
                from: w,
                to: E,
                offset: x,
                slidesGrid: t.slidesGrid
            }),
            p === w && u === E && !e)
                return t.slidesGrid !== h && x !== f && t.slides.css(m, x + "px"),
                void t.updateProgress();
            if (t.params.virtual.renderExternal)
                return t.params.virtual.renderExternal.call(t, {
                    offset: x,
                    from: w,
                    to: E,
                    slides: function() {
                        for (var e = [], t = w; t <= E; t += 1)
                            e.push(c[t]);
                        return e
                    }()
                }),
                void (t.params.virtual.renderExternalUpdate && T());
            var C = []
              , M = [];
            if (e)
                t.$wrapperEl.find("." + t.params.slideClass).remove();
            else
                for (var z = p; z <= u; z += 1)
                    (z < w || z > E) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + z + '"]').remove();
            for (var P = 0; P < c.length; P += 1)
                P >= w && P <= E && (void 0 === u || e ? M.push(P) : (P > u && M.push(P),
                P < p && C.push(P)));
            M.forEach((function(e) {
                t.$wrapperEl.append(v(c[e], e))
            }
            )),
            C.sort((function(e, t) {
                return t - e
            }
            )).forEach((function(e) {
                t.$wrapperEl.prepend(v(c[e], e))
            }
            )),
            t.$wrapperEl.children(".swiper-slide").css(m, x + "px"),
            T()
        },
        renderSlide: function(e, t) {
            var a = this
              , i = a.params.virtual;
            if (i.cache && a.virtual.cache[t])
                return a.virtual.cache[t];
            var s = i.renderSlide ? m(i.renderSlide.call(a, e, t)) : m('<div class="' + a.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
            return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", t),
            i.cache && (a.virtual.cache[t] = s),
            s
        },
        appendSlide: function(e) {
            var t = this;
            if ("object" == typeof e && "length"in e)
                for (var a = 0; a < e.length; a += 1)
                    e[a] && t.virtual.slides.push(e[a]);
            else
                t.virtual.slides.push(e);
            t.virtual.update(!0)
        },
        prependSlide: function(e) {
            var t = this
              , a = t.activeIndex
              , i = a + 1
              , s = 1;
            if (Array.isArray(e)) {
                for (var r = 0; r < e.length; r += 1)
                    e[r] && t.virtual.slides.unshift(e[r]);
                i = a + e.length,
                s = e.length
            } else
                t.virtual.slides.unshift(e);
            if (t.params.virtual.cache) {
                var n = t.virtual.cache
                  , l = {};
                Object.keys(n).forEach((function(e) {
                    var t = n[e]
                      , a = t.attr("data-swiper-slide-index");
                    a && t.attr("data-swiper-slide-index", parseInt(a, 10) + 1),
                    l[parseInt(e, 10) + s] = t
                }
                )),
                t.virtual.cache = l
            }
            t.virtual.update(!0),
            t.slideTo(i, 0)
        },
        removeSlide: function(e) {
            var t = this;
            if (null != e) {
                var a = t.activeIndex;
                if (Array.isArray(e))
                    for (var i = e.length - 1; i >= 0; i -= 1)
                        t.virtual.slides.splice(e[i], 1),
                        t.params.virtual.cache && delete t.virtual.cache[e[i]],
                        e[i] < a && (a -= 1),
                        a = Math.max(a, 0);
                else
                    t.virtual.slides.splice(e, 1),
                    t.params.virtual.cache && delete t.virtual.cache[e],
                    e < a && (a -= 1),
                    a = Math.max(a, 0);
                t.virtual.update(!0),
                t.slideTo(a, 0)
            }
        },
        removeAllSlides: function() {
            var e = this;
            e.virtual.slides = [],
            e.params.virtual.cache && (e.virtual.cache = {}),
            e.virtual.update(!0),
            e.slideTo(0, 0)
        }
    }
      , q = {
        name: "virtual",
        params: {
            virtual: {
                enabled: !1,
                slides: [],
                cache: !0,
                renderSlide: null,
                renderExternal: null,
                renderExternalUpdate: !0,
                addSlidesBefore: 0,
                addSlidesAfter: 0
            }
        },
        create: function() {
            M(this, {
                virtual: t({}, _, {
                    slides: this.params.virtual.slides,
                    cache: {}
                })
            })
        },
        on: {
            beforeInit: function(e) {
                if (e.params.virtual.enabled) {
                    e.classNames.push(e.params.containerModifierClass + "virtual");
                    var t = {
                        watchSlidesProgress: !0
                    };
                    S(e.params, t),
                    S(e.originalParams, t),
                    e.params.initialSlide || e.virtual.update()
                }
            },
            setTranslate: function(e) {
                e.params.virtual.enabled && e.virtual.update()
            }
        }
    }
      , j = {
        handle: function(e) {
            var t = this;
            if (t.enabled) {
                var a = l()
                  , i = r()
                  , s = t.rtlTranslate
                  , n = e;
                n.originalEvent && (n = n.originalEvent);
                var o = n.keyCode || n.charCode
                  , d = t.params.keyboard.pageUpDown
                  , p = d && 33 === o
                  , u = d && 34 === o
                  , c = 37 === o
                  , h = 39 === o
                  , v = 38 === o
                  , f = 40 === o;
                if (!t.allowSlideNext && (t.isHorizontal() && h || t.isVertical() && f || u))
                    return !1;
                if (!t.allowSlidePrev && (t.isHorizontal() && c || t.isVertical() && v || p))
                    return !1;
                if (!(n.shiftKey || n.altKey || n.ctrlKey || n.metaKey || i.activeElement && i.activeElement.nodeName && ("input" === i.activeElement.nodeName.toLowerCase() || "textarea" === i.activeElement.nodeName.toLowerCase()))) {
                    if (t.params.keyboard.onlyInViewport && (p || u || c || h || v || f)) {
                        var m = !1;
                        if (t.$el.parents("." + t.params.slideClass).length > 0 && 0 === t.$el.parents("." + t.params.slideActiveClass).length)
                            return;
                        var g = t.$el
                          , b = g[0].clientWidth
                          , y = g[0].clientHeight
                          , w = a.innerWidth
                          , E = a.innerHeight
                          , x = t.$el.offset();
                        s && (x.left -= t.$el[0].scrollLeft);
                        for (var T = [[x.left, x.top], [x.left + b, x.top], [x.left, x.top + y], [x.left + b, x.top + y]], C = 0; C < T.length; C += 1) {
                            var S = T[C];
                            if (S[0] >= 0 && S[0] <= w && S[1] >= 0 && S[1] <= E) {
                                if (0 === S[0] && 0 === S[1])
                                    continue;
                                m = !0
                            }
                        }
                        if (!m)
                            return
                    }
                    t.isHorizontal() ? ((p || u || c || h) && (n.preventDefault ? n.preventDefault() : n.returnValue = !1),
                    ((u || h) && !s || (p || c) && s) && t.slideNext(),
                    ((p || c) && !s || (u || h) && s) && t.slidePrev()) : ((p || u || v || f) && (n.preventDefault ? n.preventDefault() : n.returnValue = !1),
                    (u || f) && t.slideNext(),
                    (p || v) && t.slidePrev()),
                    t.emit("keyPress", o)
                }
            }
        },
        enable: function() {
            var e = this
              , t = r();
            e.keyboard.enabled || (m(t).on("keydown", e.keyboard.handle),
            e.keyboard.enabled = !0)
        },
        disable: function() {
            var e = this
              , t = r();
            e.keyboard.enabled && (m(t).off("keydown", e.keyboard.handle),
            e.keyboard.enabled = !1)
        }
    }
      , U = {
        name: "keyboard",
        params: {
            keyboard: {
                enabled: !1,
                onlyInViewport: !0,
                pageUpDown: !0
            }
        },
        create: function() {
            M(this, {
                keyboard: t({
                    enabled: !1
                }, j)
            })
        },
        on: {
            init: function(e) {
                e.params.keyboard.enabled && e.keyboard.enable()
            },
            destroy: function(e) {
                e.keyboard.enabled && e.keyboard.disable()
            }
        }
    };
    var K = {
        lastScrollTime: x(),
        lastEventBeforeSnap: void 0,
        recentWheelEvents: [],
        event: function() {
            return l().navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function() {
                var e = r()
                  , t = "onwheel"
                  , a = t in e;
                if (!a) {
                    var i = e.createElement("div");
                    i.setAttribute(t, "return;"),
                    a = "function" == typeof i.onwheel
                }
                return !a && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (a = e.implementation.hasFeature("Events.wheel", "3.0")),
                a
            }() ? "wheel" : "mousewheel"
        },
        normalize: function(e) {
            var t = 0
              , a = 0
              , i = 0
              , s = 0;
            return "detail"in e && (a = e.detail),
            "wheelDelta"in e && (a = -e.wheelDelta / 120),
            "wheelDeltaY"in e && (a = -e.wheelDeltaY / 120),
            "wheelDeltaX"in e && (t = -e.wheelDeltaX / 120),
            "axis"in e && e.axis === e.HORIZONTAL_AXIS && (t = a,
            a = 0),
            i = 10 * t,
            s = 10 * a,
            "deltaY"in e && (s = e.deltaY),
            "deltaX"in e && (i = e.deltaX),
            e.shiftKey && !i && (i = s,
            s = 0),
            (i || s) && e.deltaMode && (1 === e.deltaMode ? (i *= 40,
            s *= 40) : (i *= 800,
            s *= 800)),
            i && !t && (t = i < 1 ? -1 : 1),
            s && !a && (a = s < 1 ? -1 : 1),
            {
                spinX: t,
                spinY: a,
                pixelX: i,
                pixelY: s
            }
        },
        handleMouseEnter: function() {
            this.enabled && (this.mouseEntered = !0)
        },
        handleMouseLeave: function() {
            this.enabled && (this.mouseEntered = !1)
        },
        handle: function(e) {
            var t = e
              , a = this;
            if (a.enabled) {
                var i = a.params.mousewheel;
                a.params.cssMode && t.preventDefault();
                var s = a.$el;
                if ("container" !== a.params.mousewheel.eventsTarget && (s = m(a.params.mousewheel.eventsTarget)),
                !a.mouseEntered && !s[0].contains(t.target) && !i.releaseOnEdges)
                    return !0;
                t.originalEvent && (t = t.originalEvent);
                var r = 0
                  , n = a.rtlTranslate ? -1 : 1
                  , l = K.normalize(t);
                if (i.forceToAxis)
                    if (a.isHorizontal()) {
                        if (!(Math.abs(l.pixelX) > Math.abs(l.pixelY)))
                            return !0;
                        r = -l.pixelX * n
                    } else {
                        if (!(Math.abs(l.pixelY) > Math.abs(l.pixelX)))
                            return !0;
                        r = -l.pixelY
                    }
                else
                    r = Math.abs(l.pixelX) > Math.abs(l.pixelY) ? -l.pixelX * n : -l.pixelY;
                if (0 === r)
                    return !0;
                i.invert && (r = -r);
                var o = a.getTranslate() + r * i.sensitivity;
                if (o >= a.minTranslate() && (o = a.minTranslate()),
                o <= a.maxTranslate() && (o = a.maxTranslate()),
                (!!a.params.loop || !(o === a.minTranslate() || o === a.maxTranslate())) && a.params.nested && t.stopPropagation(),
                a.params.freeMode) {
                    var d = {
                        time: x(),
                        delta: Math.abs(r),
                        direction: Math.sign(r)
                    }
                      , p = a.mousewheel.lastEventBeforeSnap
                      , u = p && d.time < p.time + 500 && d.delta <= p.delta && d.direction === p.direction;
                    if (!u) {
                        a.mousewheel.lastEventBeforeSnap = void 0,
                        a.params.loop && a.loopFix();
                        var c = a.getTranslate() + r * i.sensitivity
                          , h = a.isBeginning
                          , v = a.isEnd;
                        if (c >= a.minTranslate() && (c = a.minTranslate()),
                        c <= a.maxTranslate() && (c = a.maxTranslate()),
                        a.setTransition(0),
                        a.setTranslate(c),
                        a.updateProgress(),
                        a.updateActiveIndex(),
                        a.updateSlidesClasses(),
                        (!h && a.isBeginning || !v && a.isEnd) && a.updateSlidesClasses(),
                        a.params.freeModeSticky) {
                            clearTimeout(a.mousewheel.timeout),
                            a.mousewheel.timeout = void 0;
                            var f = a.mousewheel.recentWheelEvents;
                            f.length >= 15 && f.shift();
                            var g = f.length ? f[f.length - 1] : void 0
                              , b = f[0];
                            if (f.push(d),
                            g && (d.delta > g.delta || d.direction !== g.direction))
                                f.splice(0);
                            else if (f.length >= 15 && d.time - b.time < 500 && b.delta - d.delta >= 1 && d.delta <= 6) {
                                var y = r > 0 ? .8 : .2;
                                a.mousewheel.lastEventBeforeSnap = d,
                                f.splice(0),
                                a.mousewheel.timeout = E((function() {
                                    a.slideToClosest(a.params.speed, !0, void 0, y)
                                }
                                ), 0)
                            }
                            a.mousewheel.timeout || (a.mousewheel.timeout = E((function() {
                                a.mousewheel.lastEventBeforeSnap = d,
                                f.splice(0),
                                a.slideToClosest(a.params.speed, !0, void 0, .5)
                            }
                            ), 500))
                        }
                        if (u || a.emit("scroll", t),
                        a.params.autoplay && a.params.autoplayDisableOnInteraction && a.autoplay.stop(),
                        c === a.minTranslate() || c === a.maxTranslate())
                            return !0
                    }
                } else {
                    var w = {
                        time: x(),
                        delta: Math.abs(r),
                        direction: Math.sign(r),
                        raw: e
                    }
                      , T = a.mousewheel.recentWheelEvents;
                    T.length >= 2 && T.shift();
                    var C = T.length ? T[T.length - 1] : void 0;
                    if (T.push(w),
                    C ? (w.direction !== C.direction || w.delta > C.delta || w.time > C.time + 150) && a.mousewheel.animateSlider(w) : a.mousewheel.animateSlider(w),
                    a.mousewheel.releaseScroll(w))
                        return !0
                }
                return t.preventDefault ? t.preventDefault() : t.returnValue = !1,
                !1
            }
        },
        animateSlider: function(e) {
            var t = this
              , a = l();
            return !(this.params.mousewheel.thresholdDelta && e.delta < this.params.mousewheel.thresholdDelta) && (!(this.params.mousewheel.thresholdTime && x() - t.mousewheel.lastScrollTime < this.params.mousewheel.thresholdTime) && (e.delta >= 6 && x() - t.mousewheel.lastScrollTime < 60 || (e.direction < 0 ? t.isEnd && !t.params.loop || t.animating || (t.slideNext(),
            t.emit("scroll", e.raw)) : t.isBeginning && !t.params.loop || t.animating || (t.slidePrev(),
            t.emit("scroll", e.raw)),
            t.mousewheel.lastScrollTime = (new a.Date).getTime(),
            !1)))
        },
        releaseScroll: function(e) {
            var t = this
              , a = t.params.mousewheel;
            if (e.direction < 0) {
                if (t.isEnd && !t.params.loop && a.releaseOnEdges)
                    return !0
            } else if (t.isBeginning && !t.params.loop && a.releaseOnEdges)
                return !0;
            return !1
        },
        enable: function() {
            var e = this
              , t = K.event();
            if (e.params.cssMode)
                return e.wrapperEl.removeEventListener(t, e.mousewheel.handle),
                !0;
            if (!t)
                return !1;
            if (e.mousewheel.enabled)
                return !1;
            var a = e.$el;
            return "container" !== e.params.mousewheel.eventsTarget && (a = m(e.params.mousewheel.eventsTarget)),
            a.on("mouseenter", e.mousewheel.handleMouseEnter),
            a.on("mouseleave", e.mousewheel.handleMouseLeave),
            a.on(t, e.mousewheel.handle),
            e.mousewheel.enabled = !0,
            !0
        },
        disable: function() {
            var e = this
              , t = K.event();
            if (e.params.cssMode)
                return e.wrapperEl.addEventListener(t, e.mousewheel.handle),
                !0;
            if (!t)
                return !1;
            if (!e.mousewheel.enabled)
                return !1;
            var a = e.$el;
            return "container" !== e.params.mousewheel.eventsTarget && (a = m(e.params.mousewheel.eventsTarget)),
            a.off(t, e.mousewheel.handle),
            e.mousewheel.enabled = !1,
            !0
        }
    }
      , Z = {
        toggleEl: function(e, t) {
            e[t ? "addClass" : "removeClass"](this.params.navigation.disabledClass),
            e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = t)
        },
        update: function() {
            var e = this
              , t = e.params.navigation
              , a = e.navigation.toggleEl;
            if (!e.params.loop) {
                var i = e.navigation
                  , s = i.$nextEl
                  , r = i.$prevEl;
                r && r.length > 0 && (e.isBeginning ? a(r, !0) : a(r, !1),
                e.params.watchOverflow && e.enabled && r[e.isLocked ? "addClass" : "removeClass"](t.lockClass)),
                s && s.length > 0 && (e.isEnd ? a(s, !0) : a(s, !1),
                e.params.watchOverflow && e.enabled && s[e.isLocked ? "addClass" : "removeClass"](t.lockClass))
            }
        },
        onPrevClick: function(e) {
            var t = this;
            e.preventDefault(),
            t.isBeginning && !t.params.loop || t.slidePrev()
        },
        onNextClick: function(e) {
            var t = this;
            e.preventDefault(),
            t.isEnd && !t.params.loop || t.slideNext()
        },
        init: function() {
            var e, t, a = this, i = a.params.navigation;
            (i.nextEl || i.prevEl) && (i.nextEl && (e = m(i.nextEl),
            a.params.uniqueNavElements && "string" == typeof i.nextEl && e.length > 1 && 1 === a.$el.find(i.nextEl).length && (e = a.$el.find(i.nextEl))),
            i.prevEl && (t = m(i.prevEl),
            a.params.uniqueNavElements && "string" == typeof i.prevEl && t.length > 1 && 1 === a.$el.find(i.prevEl).length && (t = a.$el.find(i.prevEl))),
            e && e.length > 0 && e.on("click", a.navigation.onNextClick),
            t && t.length > 0 && t.on("click", a.navigation.onPrevClick),
            S(a.navigation, {
                $nextEl: e,
                nextEl: e && e[0],
                $prevEl: t,
                prevEl: t && t[0]
            }),
            a.enabled || (e && e.addClass(i.lockClass),
            t && t.addClass(i.lockClass)))
        },
        destroy: function() {
            var e = this
              , t = e.navigation
              , a = t.$nextEl
              , i = t.$prevEl;
            a && a.length && (a.off("click", e.navigation.onNextClick),
            a.removeClass(e.params.navigation.disabledClass)),
            i && i.length && (i.off("click", e.navigation.onPrevClick),
            i.removeClass(e.params.navigation.disabledClass))
        }
    }
      , J = {
        update: function() {
            var e = this
              , t = e.rtl
              , a = e.params.pagination;
            if (a.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                var i, s = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length, r = e.pagination.$el, n = e.params.loop ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                if (e.params.loop ? ((i = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > s - 1 - 2 * e.loopedSlides && (i -= s - 2 * e.loopedSlides),
                i > n - 1 && (i -= n),
                i < 0 && "bullets" !== e.params.paginationType && (i = n + i)) : i = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0,
                "bullets" === a.type && e.pagination.bullets && e.pagination.bullets.length > 0) {
                    var l, o, d, p = e.pagination.bullets;
                    if (a.dynamicBullets && (e.pagination.bulletSize = p.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0),
                    r.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (a.dynamicMainBullets + 4) + "px"),
                    a.dynamicMainBullets > 1 && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += i - e.previousIndex,
                    e.pagination.dynamicBulletIndex > a.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = a.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)),
                    l = i - e.pagination.dynamicBulletIndex,
                    d = ((o = l + (Math.min(p.length, a.dynamicMainBullets) - 1)) + l) / 2),
                    p.removeClass(a.bulletActiveClass + " " + a.bulletActiveClass + "-next " + a.bulletActiveClass + "-next-next " + a.bulletActiveClass + "-prev " + a.bulletActiveClass + "-prev-prev " + a.bulletActiveClass + "-main"),
                    r.length > 1)
                        p.each((function(e) {
                            var t = m(e)
                              , s = t.index();
                            s === i && t.addClass(a.bulletActiveClass),
                            a.dynamicBullets && (s >= l && s <= o && t.addClass(a.bulletActiveClass + "-main"),
                            s === l && t.prev().addClass(a.bulletActiveClass + "-prev").prev().addClass(a.bulletActiveClass + "-prev-prev"),
                            s === o && t.next().addClass(a.bulletActiveClass + "-next").next().addClass(a.bulletActiveClass + "-next-next"))
                        }
                        ));
                    else {
                        var u = p.eq(i)
                          , c = u.index();
                        if (u.addClass(a.bulletActiveClass),
                        a.dynamicBullets) {
                            for (var h = p.eq(l), v = p.eq(o), f = l; f <= o; f += 1)
                                p.eq(f).addClass(a.bulletActiveClass + "-main");
                            if (e.params.loop)
                                if (c >= p.length - a.dynamicMainBullets) {
                                    for (var g = a.dynamicMainBullets; g >= 0; g -= 1)
                                        p.eq(p.length - g).addClass(a.bulletActiveClass + "-main");
                                    p.eq(p.length - a.dynamicMainBullets - 1).addClass(a.bulletActiveClass + "-prev")
                                } else
                                    h.prev().addClass(a.bulletActiveClass + "-prev").prev().addClass(a.bulletActiveClass + "-prev-prev"),
                                    v.next().addClass(a.bulletActiveClass + "-next").next().addClass(a.bulletActiveClass + "-next-next");
                            else
                                h.prev().addClass(a.bulletActiveClass + "-prev").prev().addClass(a.bulletActiveClass + "-prev-prev"),
                                v.next().addClass(a.bulletActiveClass + "-next").next().addClass(a.bulletActiveClass + "-next-next")
                        }
                    }
                    if (a.dynamicBullets) {
                        var b = Math.min(p.length, a.dynamicMainBullets + 4)
                          , y = (e.pagination.bulletSize * b - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize
                          , w = t ? "right" : "left";
                        p.css(e.isHorizontal() ? w : "top", y + "px")
                    }
                }
                if ("fraction" === a.type && (r.find(z(a.currentClass)).text(a.formatFractionCurrent(i + 1)),
                r.find(z(a.totalClass)).text(a.formatFractionTotal(n))),
                "progressbar" === a.type) {
                    var E;
                    E = a.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                    var x = (i + 1) / n
                      , T = 1
                      , C = 1;
                    "horizontal" === E ? T = x : C = x,
                    r.find(z(a.progressbarFillClass)).transform("translate3d(0,0,0) scaleX(" + T + ") scaleY(" + C + ")").transition(e.params.speed)
                }
                "custom" === a.type && a.renderCustom ? (r.html(a.renderCustom(e, i + 1, n)),
                e.emit("paginationRender", r[0])) : e.emit("paginationUpdate", r[0]),
                e.params.watchOverflow && e.enabled && r[e.isLocked ? "addClass" : "removeClass"](a.lockClass)
            }
        },
        render: function() {
            var e = this
              , t = e.params.pagination;
            if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                var a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length
                  , i = e.pagination.$el
                  , s = "";
                if ("bullets" === t.type) {
                    var r = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                    e.params.freeMode && !e.params.loop && r > a && (r = a);
                    for (var n = 0; n < r; n += 1)
                        t.renderBullet ? s += t.renderBullet.call(e, n, t.bulletClass) : s += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                    i.html(s),
                    e.pagination.bullets = i.find(z(t.bulletClass))
                }
                "fraction" === t.type && (s = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>',
                i.html(s)),
                "progressbar" === t.type && (s = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>',
                i.html(s)),
                "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
            }
        },
        init: function() {
            var e = this
              , t = e.params.pagination;
            if (t.el) {
                var a = m(t.el);
                0 !== a.length && (e.params.uniqueNavElements && "string" == typeof t.el && a.length > 1 && (a = e.$el.find(t.el)),
                "bullets" === t.type && t.clickable && a.addClass(t.clickableClass),
                a.addClass(t.modifierClass + t.type),
                "bullets" === t.type && t.dynamicBullets && (a.addClass("" + t.modifierClass + t.type + "-dynamic"),
                e.pagination.dynamicBulletIndex = 0,
                t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
                "progressbar" === t.type && t.progressbarOpposite && a.addClass(t.progressbarOppositeClass),
                t.clickable && a.on("click", z(t.bulletClass), (function(t) {
                    t.preventDefault();
                    var a = m(this).index() * e.params.slidesPerGroup;
                    e.params.loop && (a += e.loopedSlides),
                    e.slideTo(a)
                }
                )),
                S(e.pagination, {
                    $el: a,
                    el: a[0]
                }),
                e.enabled || a.addClass(t.lockClass))
            }
        },
        destroy: function() {
            var e = this
              , t = e.params.pagination;
            if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                var a = e.pagination.$el;
                a.removeClass(t.hiddenClass),
                a.removeClass(t.modifierClass + t.type),
                e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass),
                t.clickable && a.off("click", z(t.bulletClass))
            }
        }
    }
      , Q = {
        setTranslate: function() {
            var e = this;
            if (e.params.scrollbar.el && e.scrollbar.el) {
                var t = e.scrollbar
                  , a = e.rtlTranslate
                  , i = e.progress
                  , s = t.dragSize
                  , r = t.trackSize
                  , n = t.$dragEl
                  , l = t.$el
                  , o = e.params.scrollbar
                  , d = s
                  , p = (r - s) * i;
                a ? (p = -p) > 0 ? (d = s - p,
                p = 0) : -p + s > r && (d = r + p) : p < 0 ? (d = s + p,
                p = 0) : p + s > r && (d = r - p),
                e.isHorizontal() ? (n.transform("translate3d(" + p + "px, 0, 0)"),
                n[0].style.width = d + "px") : (n.transform("translate3d(0px, " + p + "px, 0)"),
                n[0].style.height = d + "px"),
                o.hide && (clearTimeout(e.scrollbar.timeout),
                l[0].style.opacity = 1,
                e.scrollbar.timeout = setTimeout((function() {
                    l[0].style.opacity = 0,
                    l.transition(400)
                }
                ), 1e3))
            }
        },
        setTransition: function(e) {
            var t = this;
            t.params.scrollbar.el && t.scrollbar.el && t.scrollbar.$dragEl.transition(e)
        },
        updateSize: function() {
            var e = this;
            if (e.params.scrollbar.el && e.scrollbar.el) {
                var t = e.scrollbar
                  , a = t.$dragEl
                  , i = t.$el;
                a[0].style.width = "",
                a[0].style.height = "";
                var s, r = e.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, n = e.size / e.virtualSize, l = n * (r / e.size);
                s = "auto" === e.params.scrollbar.dragSize ? r * n : parseInt(e.params.scrollbar.dragSize, 10),
                e.isHorizontal() ? a[0].style.width = s + "px" : a[0].style.height = s + "px",
                i[0].style.display = n >= 1 ? "none" : "",
                e.params.scrollbar.hide && (i[0].style.opacity = 0),
                S(t, {
                    trackSize: r,
                    divider: n,
                    moveDivider: l,
                    dragSize: s
                }),
                e.params.watchOverflow && e.enabled && t.$el[e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass)
            }
        },
        getPointerPosition: function(e) {
            return this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY
        },
        setDragPosition: function(e) {
            var t, a = this, i = a.scrollbar, s = a.rtlTranslate, r = i.$el, n = i.dragSize, l = i.trackSize, o = i.dragStartPos;
            t = (i.getPointerPosition(e) - r.offset()[a.isHorizontal() ? "left" : "top"] - (null !== o ? o : n / 2)) / (l - n),
            t = Math.max(Math.min(t, 1), 0),
            s && (t = 1 - t);
            var d = a.minTranslate() + (a.maxTranslate() - a.minTranslate()) * t;
            a.updateProgress(d),
            a.setTranslate(d),
            a.updateActiveIndex(),
            a.updateSlidesClasses()
        },
        onDragStart: function(e) {
            var t = this
              , a = t.params.scrollbar
              , i = t.scrollbar
              , s = t.$wrapperEl
              , r = i.$el
              , n = i.$dragEl;
            t.scrollbar.isTouched = !0,
            t.scrollbar.dragStartPos = e.target === n[0] || e.target === n ? i.getPointerPosition(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null,
            e.preventDefault(),
            e.stopPropagation(),
            s.transition(100),
            n.transition(100),
            i.setDragPosition(e),
            clearTimeout(t.scrollbar.dragTimeout),
            r.transition(0),
            a.hide && r.css("opacity", 1),
            t.params.cssMode && t.$wrapperEl.css("scroll-snap-type", "none"),
            t.emit("scrollbarDragStart", e)
        },
        onDragMove: function(e) {
            var t = this
              , a = t.scrollbar
              , i = t.$wrapperEl
              , s = a.$el
              , r = a.$dragEl;
            t.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            a.setDragPosition(e),
            i.transition(0),
            s.transition(0),
            r.transition(0),
            t.emit("scrollbarDragMove", e))
        },
        onDragEnd: function(e) {
            var t = this
              , a = t.params.scrollbar
              , i = t.scrollbar
              , s = t.$wrapperEl
              , r = i.$el;
            t.scrollbar.isTouched && (t.scrollbar.isTouched = !1,
            t.params.cssMode && (t.$wrapperEl.css("scroll-snap-type", ""),
            s.transition("")),
            a.hide && (clearTimeout(t.scrollbar.dragTimeout),
            t.scrollbar.dragTimeout = E((function() {
                r.css("opacity", 0),
                r.transition(400)
            }
            ), 1e3)),
            t.emit("scrollbarDragEnd", e),
            a.snapOnRelease && t.slideToClosest())
        },
        enableDraggable: function() {
            var e = this;
            if (e.params.scrollbar.el) {
                var t = r()
                  , a = e.scrollbar
                  , i = e.touchEventsTouch
                  , s = e.touchEventsDesktop
                  , n = e.params
                  , l = e.support
                  , o = a.$el[0]
                  , d = !(!l.passiveListener || !n.passiveListeners) && {
                    passive: !1,
                    capture: !1
                }
                  , p = !(!l.passiveListener || !n.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                o && (l.touch ? (o.addEventListener(i.start, e.scrollbar.onDragStart, d),
                o.addEventListener(i.move, e.scrollbar.onDragMove, d),
                o.addEventListener(i.end, e.scrollbar.onDragEnd, p)) : (o.addEventListener(s.start, e.scrollbar.onDragStart, d),
                t.addEventListener(s.move, e.scrollbar.onDragMove, d),
                t.addEventListener(s.end, e.scrollbar.onDragEnd, p)))
            }
        },
        disableDraggable: function() {
            var e = this;
            if (e.params.scrollbar.el) {
                var t = r()
                  , a = e.scrollbar
                  , i = e.touchEventsTouch
                  , s = e.touchEventsDesktop
                  , n = e.params
                  , l = e.support
                  , o = a.$el[0]
                  , d = !(!l.passiveListener || !n.passiveListeners) && {
                    passive: !1,
                    capture: !1
                }
                  , p = !(!l.passiveListener || !n.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                o && (l.touch ? (o.removeEventListener(i.start, e.scrollbar.onDragStart, d),
                o.removeEventListener(i.move, e.scrollbar.onDragMove, d),
                o.removeEventListener(i.end, e.scrollbar.onDragEnd, p)) : (o.removeEventListener(s.start, e.scrollbar.onDragStart, d),
                t.removeEventListener(s.move, e.scrollbar.onDragMove, d),
                t.removeEventListener(s.end, e.scrollbar.onDragEnd, p)))
            }
        },
        init: function() {
            var e = this;
            if (e.params.scrollbar.el) {
                var t = e.scrollbar
                  , a = e.$el
                  , i = e.params.scrollbar
                  , s = m(i.el);
                e.params.uniqueNavElements && "string" == typeof i.el && s.length > 1 && 1 === a.find(i.el).length && (s = a.find(i.el));
                var r = s.find("." + e.params.scrollbar.dragClass);
                0 === r.length && (r = m('<div class="' + e.params.scrollbar.dragClass + '"></div>'),
                s.append(r)),
                S(t, {
                    $el: s,
                    el: s[0],
                    $dragEl: r,
                    dragEl: r[0]
                }),
                i.draggable && t.enableDraggable(),
                s && s[e.enabled ? "removeClass" : "addClass"](e.params.scrollbar.lockClass)
            }
        },
        destroy: function() {
            this.scrollbar.disableDraggable()
        }
    }
      , ee = {
        setTransform: function(e, t) {
            var a = this.rtl
              , i = m(e)
              , s = a ? -1 : 1
              , r = i.attr("data-swiper-parallax") || "0"
              , n = i.attr("data-swiper-parallax-x")
              , l = i.attr("data-swiper-parallax-y")
              , o = i.attr("data-swiper-parallax-scale")
              , d = i.attr("data-swiper-parallax-opacity");
            if (n || l ? (n = n || "0",
            l = l || "0") : this.isHorizontal() ? (n = r,
            l = "0") : (l = r,
            n = "0"),
            n = n.indexOf("%") >= 0 ? parseInt(n, 10) * t * s + "%" : n * t * s + "px",
            l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px",
            null != d) {
                var p = d - (d - 1) * (1 - Math.abs(t));
                i[0].style.opacity = p
            }
            if (null == o)
                i.transform("translate3d(" + n + ", " + l + ", 0px)");
            else {
                var u = o - (o - 1) * (1 - Math.abs(t));
                i.transform("translate3d(" + n + ", " + l + ", 0px) scale(" + u + ")")
            }
        },
        setTranslate: function() {
            var e = this
              , t = e.$el
              , a = e.slides
              , i = e.progress
              , s = e.snapGrid;
            t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t) {
                e.parallax.setTransform(t, i)
            }
            )),
            a.each((function(t, a) {
                var r = t.progress;
                e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (r += Math.ceil(a / 2) - i * (s.length - 1)),
                r = Math.min(Math.max(r, -1), 1),
                m(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t) {
                    e.parallax.setTransform(t, r)
                }
                ))
            }
            ))
        },
        setTransition: function(e) {
            void 0 === e && (e = this.params.speed);
            this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t) {
                var a = m(t)
                  , i = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
                0 === e && (i = 0),
                a.transition(i)
            }
            ))
        }
    }
      , te = {
        getDistanceBetweenTouches: function(e) {
            if (e.targetTouches.length < 2)
                return 1;
            var t = e.targetTouches[0].pageX
              , a = e.targetTouches[0].pageY
              , i = e.targetTouches[1].pageX
              , s = e.targetTouches[1].pageY;
            return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2))
        },
        onGestureStart: function(e) {
            var t = this
              , a = t.support
              , i = t.params.zoom
              , s = t.zoom
              , r = s.gesture;
            if (s.fakeGestureTouched = !1,
            s.fakeGestureMoved = !1,
            !a.gestures) {
                if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2)
                    return;
                s.fakeGestureTouched = !0,
                r.scaleStart = te.getDistanceBetweenTouches(e)
            }
            r.$slideEl && r.$slideEl.length || (r.$slideEl = m(e.target).closest("." + t.params.slideClass),
            0 === r.$slideEl.length && (r.$slideEl = t.slides.eq(t.activeIndex)),
            r.$imageEl = r.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"),
            r.$imageWrapEl = r.$imageEl.parent("." + i.containerClass),
            r.maxRatio = r.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio,
            0 !== r.$imageWrapEl.length) ? (r.$imageEl && r.$imageEl.transition(0),
            t.zoom.isScaling = !0) : r.$imageEl = void 0
        },
        onGestureChange: function(e) {
            var t = this
              , a = t.support
              , i = t.params.zoom
              , s = t.zoom
              , r = s.gesture;
            if (!a.gestures) {
                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2)
                    return;
                s.fakeGestureMoved = !0,
                r.scaleMove = te.getDistanceBetweenTouches(e)
            }
            r.$imageEl && 0 !== r.$imageEl.length ? (a.gestures ? s.scale = e.scale * s.currentScale : s.scale = r.scaleMove / r.scaleStart * s.currentScale,
            s.scale > r.maxRatio && (s.scale = r.maxRatio - 1 + Math.pow(s.scale - r.maxRatio + 1, .5)),
            s.scale < i.minRatio && (s.scale = i.minRatio + 1 - Math.pow(i.minRatio - s.scale + 1, .5)),
            r.$imageEl.transform("translate3d(0,0,0) scale(" + s.scale + ")")) : "gesturechange" === e.type && s.onGestureStart(e)
        },
        onGestureEnd: function(e) {
            var t = this
              , a = t.device
              , i = t.support
              , s = t.params.zoom
              , r = t.zoom
              , n = r.gesture;
            if (!i.gestures) {
                if (!r.fakeGestureTouched || !r.fakeGestureMoved)
                    return;
                if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !a.android)
                    return;
                r.fakeGestureTouched = !1,
                r.fakeGestureMoved = !1
            }
            n.$imageEl && 0 !== n.$imageEl.length && (r.scale = Math.max(Math.min(r.scale, n.maxRatio), s.minRatio),
            n.$imageEl.transition(t.params.speed).transform("translate3d(0,0,0) scale(" + r.scale + ")"),
            r.currentScale = r.scale,
            r.isScaling = !1,
            1 === r.scale && (n.$slideEl = void 0))
        },
        onTouchStart: function(e) {
            var t = this.device
              , a = this.zoom
              , i = a.gesture
              , s = a.image;
            i.$imageEl && 0 !== i.$imageEl.length && (s.isTouched || (t.android && e.cancelable && e.preventDefault(),
            s.isTouched = !0,
            s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
            s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
        },
        onTouchMove: function(e) {
            var t = this
              , a = t.zoom
              , i = a.gesture
              , s = a.image
              , r = a.velocity;
            if (i.$imageEl && 0 !== i.$imageEl.length && (t.allowClick = !1,
            s.isTouched && i.$slideEl)) {
                s.isMoved || (s.width = i.$imageEl[0].offsetWidth,
                s.height = i.$imageEl[0].offsetHeight,
                s.startX = T(i.$imageWrapEl[0], "x") || 0,
                s.startY = T(i.$imageWrapEl[0], "y") || 0,
                i.slideWidth = i.$slideEl[0].offsetWidth,
                i.slideHeight = i.$slideEl[0].offsetHeight,
                i.$imageWrapEl.transition(0),
                t.rtl && (s.startX = -s.startX,
                s.startY = -s.startY));
                var n = s.width * a.scale
                  , l = s.height * a.scale;
                if (!(n < i.slideWidth && l < i.slideHeight)) {
                    if (s.minX = Math.min(i.slideWidth / 2 - n / 2, 0),
                    s.maxX = -s.minX,
                    s.minY = Math.min(i.slideHeight / 2 - l / 2, 0),
                    s.maxY = -s.minY,
                    s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX,
                    s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY,
                    !s.isMoved && !a.isScaling) {
                        if (t.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x))
                            return void (s.isTouched = !1);
                        if (!t.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y))
                            return void (s.isTouched = !1)
                    }
                    e.cancelable && e.preventDefault(),
                    e.stopPropagation(),
                    s.isMoved = !0,
                    s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX,
                    s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY,
                    s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)),
                    s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)),
                    s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)),
                    s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)),
                    r.prevPositionX || (r.prevPositionX = s.touchesCurrent.x),
                    r.prevPositionY || (r.prevPositionY = s.touchesCurrent.y),
                    r.prevTime || (r.prevTime = Date.now()),
                    r.x = (s.touchesCurrent.x - r.prevPositionX) / (Date.now() - r.prevTime) / 2,
                    r.y = (s.touchesCurrent.y - r.prevPositionY) / (Date.now() - r.prevTime) / 2,
                    Math.abs(s.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0),
                    Math.abs(s.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0),
                    r.prevPositionX = s.touchesCurrent.x,
                    r.prevPositionY = s.touchesCurrent.y,
                    r.prevTime = Date.now(),
                    i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
                }
            }
        },
        onTouchEnd: function() {
            var e = this.zoom
              , t = e.gesture
              , a = e.image
              , i = e.velocity;
            if (t.$imageEl && 0 !== t.$imageEl.length) {
                if (!a.isTouched || !a.isMoved)
                    return a.isTouched = !1,
                    void (a.isMoved = !1);
                a.isTouched = !1,
                a.isMoved = !1;
                var s = 300
                  , r = 300
                  , n = i.x * s
                  , l = a.currentX + n
                  , o = i.y * r
                  , d = a.currentY + o;
                0 !== i.x && (s = Math.abs((l - a.currentX) / i.x)),
                0 !== i.y && (r = Math.abs((d - a.currentY) / i.y));
                var p = Math.max(s, r);
                a.currentX = l,
                a.currentY = d;
                var u = a.width * e.scale
                  , c = a.height * e.scale;
                a.minX = Math.min(t.slideWidth / 2 - u / 2, 0),
                a.maxX = -a.minX,
                a.minY = Math.min(t.slideHeight / 2 - c / 2, 0),
                a.maxY = -a.minY,
                a.currentX = Math.max(Math.min(a.currentX, a.maxX), a.minX),
                a.currentY = Math.max(Math.min(a.currentY, a.maxY), a.minY),
                t.$imageWrapEl.transition(p).transform("translate3d(" + a.currentX + "px, " + a.currentY + "px,0)")
            }
        },
        onTransitionEnd: function() {
            var e = this
              , t = e.zoom
              , a = t.gesture;
            a.$slideEl && e.previousIndex !== e.activeIndex && (a.$imageEl && a.$imageEl.transform("translate3d(0,0,0) scale(1)"),
            a.$imageWrapEl && a.$imageWrapEl.transform("translate3d(0,0,0)"),
            t.scale = 1,
            t.currentScale = 1,
            a.$slideEl = void 0,
            a.$imageEl = void 0,
            a.$imageWrapEl = void 0)
        },
        toggle: function(e) {
            var t = this.zoom;
            t.scale && 1 !== t.scale ? t.out() : t.in(e)
        },
        in: function(e) {
            var t, a, i, s, r, n, o, d, p, u, c, h, v, f, m, g, b = this, y = l(), w = b.zoom, E = b.params.zoom, x = w.gesture, T = w.image;
            (x.$slideEl || (b.params.virtual && b.params.virtual.enabled && b.virtual ? x.$slideEl = b.$wrapperEl.children("." + b.params.slideActiveClass) : x.$slideEl = b.slides.eq(b.activeIndex),
            x.$imageEl = x.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"),
            x.$imageWrapEl = x.$imageEl.parent("." + E.containerClass)),
            x.$imageEl && 0 !== x.$imageEl.length && x.$imageWrapEl && 0 !== x.$imageWrapEl.length) && (x.$slideEl.addClass("" + E.zoomedSlideClass),
            void 0 === T.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX,
            a = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = T.touchesStart.x,
            a = T.touchesStart.y),
            w.scale = x.$imageWrapEl.attr("data-swiper-zoom") || E.maxRatio,
            w.currentScale = x.$imageWrapEl.attr("data-swiper-zoom") || E.maxRatio,
            e ? (m = x.$slideEl[0].offsetWidth,
            g = x.$slideEl[0].offsetHeight,
            i = x.$slideEl.offset().left + y.scrollX + m / 2 - t,
            s = x.$slideEl.offset().top + y.scrollY + g / 2 - a,
            o = x.$imageEl[0].offsetWidth,
            d = x.$imageEl[0].offsetHeight,
            p = o * w.scale,
            u = d * w.scale,
            v = -(c = Math.min(m / 2 - p / 2, 0)),
            f = -(h = Math.min(g / 2 - u / 2, 0)),
            (r = i * w.scale) < c && (r = c),
            r > v && (r = v),
            (n = s * w.scale) < h && (n = h),
            n > f && (n = f)) : (r = 0,
            n = 0),
            x.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"),
            x.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + w.scale + ")"))
        },
        out: function() {
            var e = this
              , t = e.zoom
              , a = e.params.zoom
              , i = t.gesture;
            i.$slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? i.$slideEl = e.$wrapperEl.children("." + e.params.slideActiveClass) : i.$slideEl = e.slides.eq(e.activeIndex),
            i.$imageEl = i.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"),
            i.$imageWrapEl = i.$imageEl.parent("." + a.containerClass)),
            i.$imageEl && 0 !== i.$imageEl.length && i.$imageWrapEl && 0 !== i.$imageWrapEl.length && (t.scale = 1,
            t.currentScale = 1,
            i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
            i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
            i.$slideEl.removeClass("" + a.zoomedSlideClass),
            i.$slideEl = void 0)
        },
        toggleGestures: function(e) {
            var t = this
              , a = t.zoom
              , i = a.slideSelector
              , s = a.passiveListener;
            t.$wrapperEl[e]("gesturestart", i, a.onGestureStart, s),
            t.$wrapperEl[e]("gesturechange", i, a.onGestureChange, s),
            t.$wrapperEl[e]("gestureend", i, a.onGestureEnd, s)
        },
        enableGestures: function() {
            this.zoom.gesturesEnabled || (this.zoom.gesturesEnabled = !0,
            this.zoom.toggleGestures("on"))
        },
        disableGestures: function() {
            this.zoom.gesturesEnabled && (this.zoom.gesturesEnabled = !1,
            this.zoom.toggleGestures("off"))
        },
        enable: function() {
            var e = this
              , t = e.support
              , a = e.zoom;
            if (!a.enabled) {
                a.enabled = !0;
                var i = !("touchstart" !== e.touchEvents.start || !t.passiveListener || !e.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                }
                  , s = !t.passiveListener || {
                    passive: !1,
                    capture: !0
                }
                  , r = "." + e.params.slideClass;
                e.zoom.passiveListener = i,
                e.zoom.slideSelector = r,
                t.gestures ? (e.$wrapperEl.on(e.touchEvents.start, e.zoom.enableGestures, i),
                e.$wrapperEl.on(e.touchEvents.end, e.zoom.disableGestures, i)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, r, a.onGestureStart, i),
                e.$wrapperEl.on(e.touchEvents.move, r, a.onGestureChange, s),
                e.$wrapperEl.on(e.touchEvents.end, r, a.onGestureEnd, i),
                e.touchEvents.cancel && e.$wrapperEl.on(e.touchEvents.cancel, r, a.onGestureEnd, i)),
                e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, a.onTouchMove, s)
            }
        },
        disable: function() {
            var e = this
              , t = e.zoom;
            if (t.enabled) {
                var a = e.support;
                e.zoom.enabled = !1;
                var i = !("touchstart" !== e.touchEvents.start || !a.passiveListener || !e.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                }
                  , s = !a.passiveListener || {
                    passive: !1,
                    capture: !0
                }
                  , r = "." + e.params.slideClass;
                a.gestures ? (e.$wrapperEl.off(e.touchEvents.start, e.zoom.enableGestures, i),
                e.$wrapperEl.off(e.touchEvents.end, e.zoom.disableGestures, i)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, r, t.onGestureStart, i),
                e.$wrapperEl.off(e.touchEvents.move, r, t.onGestureChange, s),
                e.$wrapperEl.off(e.touchEvents.end, r, t.onGestureEnd, i),
                e.touchEvents.cancel && e.$wrapperEl.off(e.touchEvents.cancel, r, t.onGestureEnd, i)),
                e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove, s)
            }
        }
    }
      , ae = {
        loadInSlide: function(e, t) {
            void 0 === t && (t = !0);
            var a = this
              , i = a.params.lazy;
            if (void 0 !== e && 0 !== a.slides.length) {
                var s = a.virtual && a.params.virtual.enabled ? a.$wrapperEl.children("." + a.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : a.slides.eq(e)
                  , r = s.find("." + i.elementClass + ":not(." + i.loadedClass + "):not(." + i.loadingClass + ")");
                !s.hasClass(i.elementClass) || s.hasClass(i.loadedClass) || s.hasClass(i.loadingClass) || r.push(s[0]),
                0 !== r.length && r.each((function(e) {
                    var r = m(e);
                    r.addClass(i.loadingClass);
                    var n = r.attr("data-background")
                      , l = r.attr("data-src")
                      , o = r.attr("data-srcset")
                      , d = r.attr("data-sizes")
                      , p = r.parent("picture");
                    a.loadImage(r[0], l || n, o, d, !1, (function() {
                        if (null != a && a && (!a || a.params) && !a.destroyed) {
                            if (n ? (r.css("background-image", 'url("' + n + '")'),
                            r.removeAttr("data-background")) : (o && (r.attr("srcset", o),
                            r.removeAttr("data-srcset")),
                            d && (r.attr("sizes", d),
                            r.removeAttr("data-sizes")),
                            p.length && p.children("source").each((function(e) {
                                var t = m(e);
                                t.attr("data-srcset") && (t.attr("srcset", t.attr("data-srcset")),
                                t.removeAttr("data-srcset"))
                            }
                            )),
                            l && (r.attr("src", l),
                            r.removeAttr("data-src"))),
                            r.addClass(i.loadedClass).removeClass(i.loadingClass),
                            s.find("." + i.preloaderClass).remove(),
                            a.params.loop && t) {
                                var e = s.attr("data-swiper-slide-index");
                                if (s.hasClass(a.params.slideDuplicateClass)) {
                                    var u = a.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + a.params.slideDuplicateClass + ")");
                                    a.lazy.loadInSlide(u.index(), !1)
                                } else {
                                    var c = a.$wrapperEl.children("." + a.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                    a.lazy.loadInSlide(c.index(), !1)
                                }
                            }
                            a.emit("lazyImageReady", s[0], r[0]),
                            a.params.autoHeight && a.updateAutoHeight()
                        }
                    }
                    )),
                    a.emit("lazyImageLoad", s[0], r[0])
                }
                ))
            }
        },
        load: function() {
            var e = this
              , t = e.$wrapperEl
              , a = e.params
              , i = e.slides
              , s = e.activeIndex
              , r = e.virtual && a.virtual.enabled
              , n = a.lazy
              , l = a.slidesPerView;
            function o(e) {
                if (r) {
                    if (t.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]').length)
                        return !0
                } else if (i[e])
                    return !0;
                return !1
            }
            function d(e) {
                return r ? m(e).attr("data-swiper-slide-index") : m(e).index()
            }
            if ("auto" === l && (l = 0),
            e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0),
            e.params.watchSlidesVisibility)
                t.children("." + a.slideVisibleClass).each((function(t) {
                    var a = r ? m(t).attr("data-swiper-slide-index") : m(t).index();
                    e.lazy.loadInSlide(a)
                }
                ));
            else if (l > 1)
                for (var p = s; p < s + l; p += 1)
                    o(p) && e.lazy.loadInSlide(p);
            else
                e.lazy.loadInSlide(s);
            if (n.loadPrevNext)
                if (l > 1 || n.loadPrevNextAmount && n.loadPrevNextAmount > 1) {
                    for (var u = n.loadPrevNextAmount, c = l, h = Math.min(s + c + Math.max(u, c), i.length), v = Math.max(s - Math.max(c, u), 0), f = s + l; f < h; f += 1)
                        o(f) && e.lazy.loadInSlide(f);
                    for (var g = v; g < s; g += 1)
                        o(g) && e.lazy.loadInSlide(g)
                } else {
                    var b = t.children("." + a.slideNextClass);
                    b.length > 0 && e.lazy.loadInSlide(d(b));
                    var y = t.children("." + a.slidePrevClass);
                    y.length > 0 && e.lazy.loadInSlide(d(y))
                }
        },
        checkInViewOnLoad: function() {
            var e = l()
              , t = this;
            if (t && !t.destroyed) {
                var a = t.params.lazy.scrollingElement ? m(t.params.lazy.scrollingElement) : m(e)
                  , i = a[0] === e
                  , s = i ? e.innerWidth : a[0].offsetWidth
                  , r = i ? e.innerHeight : a[0].offsetHeight
                  , n = t.$el.offset()
                  , o = !1;
                t.rtlTranslate && (n.left -= t.$el[0].scrollLeft);
                for (var d = [[n.left, n.top], [n.left + t.width, n.top], [n.left, n.top + t.height], [n.left + t.width, n.top + t.height]], p = 0; p < d.length; p += 1) {
                    var u = d[p];
                    if (u[0] >= 0 && u[0] <= s && u[1] >= 0 && u[1] <= r) {
                        if (0 === u[0] && 0 === u[1])
                            continue;
                        o = !0
                    }
                }
                o ? (t.lazy.load(),
                a.off("scroll", t.lazy.checkInViewOnLoad)) : t.lazy.scrollHandlerAttached || (t.lazy.scrollHandlerAttached = !0,
                a.on("scroll", t.lazy.checkInViewOnLoad))
            }
        }
    }
      , ie = {
        LinearSpline: function(e, t) {
            var a, i, s, r, n, l = function(e, t) {
                for (i = -1,
                a = e.length; a - i > 1; )
                    e[s = a + i >> 1] <= t ? i = s : a = s;
                return a
            };
            return this.x = e,
            this.y = t,
            this.lastIndex = e.length - 1,
            this.interpolate = function(e) {
                return e ? (n = l(this.x, e),
                r = n - 1,
                (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
            }
            ,
            this
        },
        getInterpolateFunction: function(e) {
            var t = this;
            t.controller.spline || (t.controller.spline = t.params.loop ? new ie.LinearSpline(t.slidesGrid,e.slidesGrid) : new ie.LinearSpline(t.snapGrid,e.snapGrid))
        },
        setTranslate: function(e, t) {
            var a, i, s = this, r = s.controller.control, n = s.constructor;
            function l(e) {
                var t = s.rtlTranslate ? -s.translate : s.translate;
                "slide" === s.params.controller.by && (s.controller.getInterpolateFunction(e),
                i = -s.controller.spline.interpolate(-t)),
                i && "container" !== s.params.controller.by || (a = (e.maxTranslate() - e.minTranslate()) / (s.maxTranslate() - s.minTranslate()),
                i = (t - s.minTranslate()) * a + e.minTranslate()),
                s.params.controller.inverse && (i = e.maxTranslate() - i),
                e.updateProgress(i),
                e.setTranslate(i, s),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
            }
            if (Array.isArray(r))
                for (var o = 0; o < r.length; o += 1)
                    r[o] !== t && r[o]instanceof n && l(r[o]);
            else
                r instanceof n && t !== r && l(r)
        },
        setTransition: function(e, t) {
            var a, i = this, s = i.constructor, r = i.controller.control;
            function n(t) {
                t.setTransition(e, i),
                0 !== e && (t.transitionStart(),
                t.params.autoHeight && E((function() {
                    t.updateAutoHeight()
                }
                )),
                t.$wrapperEl.transitionEnd((function() {
                    r && (t.params.loop && "slide" === i.params.controller.by && t.loopFix(),
                    t.transitionEnd())
                }
                )))
            }
            if (Array.isArray(r))
                for (a = 0; a < r.length; a += 1)
                    r[a] !== t && r[a]instanceof s && n(r[a]);
            else
                r instanceof s && t !== r && n(r)
        }
    }
      , se = {
        getRandomNumber: function(e) {
            void 0 === e && (e = 16);
            return "x".repeat(e).replace(/x/g, (function() {
                return Math.round(16 * Math.random()).toString(16)
            }
            ))
        },
        makeElFocusable: function(e) {
            return e.attr("tabIndex", "0"),
            e
        },
        makeElNotFocusable: function(e) {
            return e.attr("tabIndex", "-1"),
            e
        },
        addElRole: function(e, t) {
            return e.attr("role", t),
            e
        },
        addElRoleDescription: function(e, t) {
            return e.attr("aria-roledescription", t),
            e
        },
        addElControls: function(e, t) {
            return e.attr("aria-controls", t),
            e
        },
        addElLabel: function(e, t) {
            return e.attr("aria-label", t),
            e
        },
        addElId: function(e, t) {
            return e.attr("id", t),
            e
        },
        addElLive: function(e, t) {
            return e.attr("aria-live", t),
            e
        },
        disableEl: function(e) {
            return e.attr("aria-disabled", !0),
            e
        },
        enableEl: function(e) {
            return e.attr("aria-disabled", !1),
            e
        },
        onEnterOrSpaceKey: function(e) {
            if (13 === e.keyCode || 32 === e.keyCode) {
                var t = this
                  , a = t.params.a11y
                  , i = m(e.target);
                t.navigation && t.navigation.$nextEl && i.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(),
                t.isEnd ? t.a11y.notify(a.lastSlideMessage) : t.a11y.notify(a.nextSlideMessage)),
                t.navigation && t.navigation.$prevEl && i.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(),
                t.isBeginning ? t.a11y.notify(a.firstSlideMessage) : t.a11y.notify(a.prevSlideMessage)),
                t.pagination && i.is(z(t.params.pagination.bulletClass)) && i[0].click()
            }
        },
        notify: function(e) {
            var t = this.a11y.liveRegion;
            0 !== t.length && (t.html(""),
            t.html(e))
        },
        updateNavigation: function() {
            var e = this;
            if (!e.params.loop && e.navigation) {
                var t = e.navigation
                  , a = t.$nextEl
                  , i = t.$prevEl;
                i && i.length > 0 && (e.isBeginning ? (e.a11y.disableEl(i),
                e.a11y.makeElNotFocusable(i)) : (e.a11y.enableEl(i),
                e.a11y.makeElFocusable(i))),
                a && a.length > 0 && (e.isEnd ? (e.a11y.disableEl(a),
                e.a11y.makeElNotFocusable(a)) : (e.a11y.enableEl(a),
                e.a11y.makeElFocusable(a)))
            }
        },
        updatePagination: function() {
            var e = this
              , t = e.params.a11y;
            e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each((function(a) {
                var i = m(a);
                e.a11y.makeElFocusable(i),
                e.params.pagination.renderBullet || (e.a11y.addElRole(i, "button"),
                e.a11y.addElLabel(i, t.paginationBulletMessage.replace(/\{\{index\}\}/, i.index() + 1)))
            }
            ))
        },
        init: function() {
            var e = this
              , t = e.params.a11y;
            e.$el.append(e.a11y.liveRegion);
            var a = e.$el;
            t.containerRoleDescriptionMessage && e.a11y.addElRoleDescription(a, t.containerRoleDescriptionMessage),
            t.containerMessage && e.a11y.addElLabel(a, t.containerMessage);
            var i, s, r = e.$wrapperEl, n = r.attr("id") || "swiper-wrapper-" + e.a11y.getRandomNumber(16), l = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite";
            e.a11y.addElId(r, n),
            e.a11y.addElLive(r, l),
            t.itemRoleDescriptionMessage && e.a11y.addElRoleDescription(m(e.slides), t.itemRoleDescriptionMessage),
            e.a11y.addElRole(m(e.slides), t.slideRole),
            e.slides.each((function(a) {
                var i = m(a)
                  , s = t.slideLabelMessage.replace(/\{\{index\}\}/, i.index() + 1).replace(/\{\{slidesLength\}\}/, e.slides.length);
                e.a11y.addElLabel(i, s)
            }
            )),
            e.navigation && e.navigation.$nextEl && (i = e.navigation.$nextEl),
            e.navigation && e.navigation.$prevEl && (s = e.navigation.$prevEl),
            i && i.length && (e.a11y.makeElFocusable(i),
            "BUTTON" !== i[0].tagName && (e.a11y.addElRole(i, "button"),
            i.on("keydown", e.a11y.onEnterOrSpaceKey)),
            e.a11y.addElLabel(i, t.nextSlideMessage),
            e.a11y.addElControls(i, n)),
            s && s.length && (e.a11y.makeElFocusable(s),
            "BUTTON" !== s[0].tagName && (e.a11y.addElRole(s, "button"),
            s.on("keydown", e.a11y.onEnterOrSpaceKey)),
            e.a11y.addElLabel(s, t.prevSlideMessage),
            e.a11y.addElControls(s, n)),
            e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", z(e.params.pagination.bulletClass), e.a11y.onEnterOrSpaceKey)
        },
        destroy: function() {
            var e, t, a = this;
            a.a11y.liveRegion && a.a11y.liveRegion.length > 0 && a.a11y.liveRegion.remove(),
            a.navigation && a.navigation.$nextEl && (e = a.navigation.$nextEl),
            a.navigation && a.navigation.$prevEl && (t = a.navigation.$prevEl),
            e && e.off("keydown", a.a11y.onEnterOrSpaceKey),
            t && t.off("keydown", a.a11y.onEnterOrSpaceKey),
            a.pagination && a.params.pagination.clickable && a.pagination.bullets && a.pagination.bullets.length && a.pagination.$el.off("keydown", z(a.params.pagination.bulletClass), a.a11y.onEnterOrSpaceKey)
        }
    }
      , re = {
        init: function() {
            var e = this
              , t = l();
            if (e.params.history) {
                if (!t.history || !t.history.pushState)
                    return e.params.history.enabled = !1,
                    void (e.params.hashNavigation.enabled = !0);
                var a = e.history;
                a.initialized = !0,
                a.paths = re.getPathValues(e.params.url),
                (a.paths.key || a.paths.value) && (a.scrollToSlide(0, a.paths.value, e.params.runCallbacksOnInit),
                e.params.history.replaceState || t.addEventListener("popstate", e.history.setHistoryPopState))
            }
        },
        destroy: function() {
            var e = l();
            this.params.history.replaceState || e.removeEventListener("popstate", this.history.setHistoryPopState)
        },
        setHistoryPopState: function() {
            var e = this;
            e.history.paths = re.getPathValues(e.params.url),
            e.history.scrollToSlide(e.params.speed, e.history.paths.value, !1)
        },
        getPathValues: function(e) {
            var t = l()
              , a = (e ? new URL(e) : t.location).pathname.slice(1).split("/").filter((function(e) {
                return "" !== e
            }
            ))
              , i = a.length;
            return {
                key: a[i - 2],
                value: a[i - 1]
            }
        },
        setHistory: function(e, t) {
            var a = this
              , i = l();
            if (a.history.initialized && a.params.history.enabled) {
                var s;
                s = a.params.url ? new URL(a.params.url) : i.location;
                var r = a.slides.eq(t)
                  , n = re.slugify(r.attr("data-history"));
                if (a.params.history.root.length > 0) {
                    var o = a.params.history.root;
                    "/" === o[o.length - 1] && (o = o.slice(0, o.length - 1)),
                    n = o + "/" + e + "/" + n
                } else
                    s.pathname.includes(e) || (n = e + "/" + n);
                var d = i.history.state;
                d && d.value === n || (a.params.history.replaceState ? i.history.replaceState({
                    value: n
                }, null, n) : i.history.pushState({
                    value: n
                }, null, n))
            }
        },
        slugify: function(e) {
            return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
        },
        scrollToSlide: function(e, t, a) {
            var i = this;
            if (t)
                for (var s = 0, r = i.slides.length; s < r; s += 1) {
                    var n = i.slides.eq(s);
                    if (re.slugify(n.attr("data-history")) === t && !n.hasClass(i.params.slideDuplicateClass)) {
                        var l = n.index();
                        i.slideTo(l, e, a)
                    }
                }
            else
                i.slideTo(0, e, a)
        }
    }
      , ne = {
        onHashCange: function() {
            var e = this
              , t = r();
            e.emit("hashChange");
            var a = t.location.hash.replace("#", "");
            if (a !== e.slides.eq(e.activeIndex).attr("data-hash")) {
                var i = e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + a + '"]').index();
                if (void 0 === i)
                    return;
                e.slideTo(i)
            }
        },
        setHash: function() {
            var e = this
              , t = l()
              , a = r();
            if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
                if (e.params.hashNavigation.replaceState && t.history && t.history.replaceState)
                    t.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || ""),
                    e.emit("hashSet");
                else {
                    var i = e.slides.eq(e.activeIndex)
                      , s = i.attr("data-hash") || i.attr("data-history");
                    a.location.hash = s || "",
                    e.emit("hashSet")
                }
        },
        init: function() {
            var e = this
              , t = r()
              , a = l();
            if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) {
                e.hashNavigation.initialized = !0;
                var i = t.location.hash.replace("#", "");
                if (i)
                    for (var s = 0, n = e.slides.length; s < n; s += 1) {
                        var o = e.slides.eq(s);
                        if ((o.attr("data-hash") || o.attr("data-history")) === i && !o.hasClass(e.params.slideDuplicateClass)) {
                            var d = o.index();
                            e.slideTo(d, 0, e.params.runCallbacksOnInit, !0)
                        }
                    }
                e.params.hashNavigation.watchState && m(a).on("hashchange", e.hashNavigation.onHashCange)
            }
        },
        destroy: function() {
            var e = l();
            this.params.hashNavigation.watchState && m(e).off("hashchange", this.hashNavigation.onHashCange)
        }
    }
      , le = {
        run: function() {
            var e = this
              , t = e.slides.eq(e.activeIndex)
              , a = e.params.autoplay.delay;
            t.attr("data-swiper-autoplay") && (a = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
            clearTimeout(e.autoplay.timeout),
            e.autoplay.timeout = E((function() {
                var t;
                e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(),
                t = e.slidePrev(e.params.speed, !0, !0),
                e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (t = e.slideTo(e.slides.length - 1, e.params.speed, !0, !0),
                e.emit("autoplay")) : (t = e.slidePrev(e.params.speed, !0, !0),
                e.emit("autoplay")) : e.params.loop ? (e.loopFix(),
                t = e.slideNext(e.params.speed, !0, !0),
                e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (t = e.slideTo(0, e.params.speed, !0, !0),
                e.emit("autoplay")) : (t = e.slideNext(e.params.speed, !0, !0),
                e.emit("autoplay")),
                (e.params.cssMode && e.autoplay.running || !1 === t) && e.autoplay.run()
            }
            ), a)
        },
        start: function() {
            var e = this;
            return void 0 === e.autoplay.timeout && (!e.autoplay.running && (e.autoplay.running = !0,
            e.emit("autoplayStart"),
            e.autoplay.run(),
            !0))
        },
        stop: function() {
            var e = this;
            return !!e.autoplay.running && (void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout),
            e.autoplay.timeout = void 0),
            e.autoplay.running = !1,
            e.emit("autoplayStop"),
            !0))
        },
        pause: function(e) {
            var t = this;
            t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout),
            t.autoplay.paused = !0,
            0 !== e && t.params.autoplay.waitForTransition ? ["transitionend", "webkitTransitionEnd"].forEach((function(e) {
                t.$wrapperEl[0].addEventListener(e, t.autoplay.onTransitionEnd)
            }
            )) : (t.autoplay.paused = !1,
            t.autoplay.run())))
        },
        onVisibilityChange: function() {
            var e = this
              , t = r();
            "hidden" === t.visibilityState && e.autoplay.running && e.autoplay.pause(),
            "visible" === t.visibilityState && e.autoplay.paused && (e.autoplay.run(),
            e.autoplay.paused = !1)
        },
        onTransitionEnd: function(e) {
            var t = this;
            t && !t.destroyed && t.$wrapperEl && e.target === t.$wrapperEl[0] && (["transitionend", "webkitTransitionEnd"].forEach((function(e) {
                t.$wrapperEl[0].removeEventListener(e, t.autoplay.onTransitionEnd)
            }
            )),
            t.autoplay.paused = !1,
            t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
        },
        onMouseEnter: function() {
            var e = this;
            e.autoplay.pause(),
            ["transitionend", "webkitTransitionEnd"].forEach((function(t) {
                e.$wrapperEl[0].removeEventListener(t, e.autoplay.onTransitionEnd)
            }
            ))
        },
        onMouseLeave: function() {
            this.autoplay.paused = !1,
            this.autoplay.run()
        },
        attachMouseEvents: function() {
            var e = this;
            e.params.autoplay.pauseOnMouseEnter && (e.$el.on("mouseenter", e.autoplay.onMouseEnter),
            e.$el.on("mouseleave", e.autoplay.onMouseLeave))
        },
        detachMouseEvents: function() {
            var e = this;
            e.$el.off("mouseenter", e.autoplay.onMouseEnter),
            e.$el.off("mouseleave", e.autoplay.onMouseLeave)
        }
    }
      , oe = {
        setTranslate: function() {
            for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) {
                var i = e.slides.eq(a)
                  , s = -i[0].swiperSlideOffset;
                e.params.virtualTranslate || (s -= e.translate);
                var r = 0;
                e.isHorizontal() || (r = s,
                s = 0);
                var n = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                i.css({
                    opacity: n
                }).transform("translate3d(" + s + "px, " + r + "px, 0px)")
            }
        },
        setTransition: function(e) {
            var t = this
              , a = t.slides
              , i = t.$wrapperEl;
            if (a.transition(e),
            t.params.virtualTranslate && 0 !== e) {
                var s = !1;
                a.transitionEnd((function() {
                    if (!s && t && !t.destroyed) {
                        s = !0,
                        t.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], a = 0; a < e.length; a += 1)
                            i.trigger(e[a])
                    }
                }
                ))
            }
        }
    }
      , de = {
        setTranslate: function() {
            var e, t = this, a = t.$el, i = t.$wrapperEl, s = t.slides, r = t.width, n = t.height, l = t.rtlTranslate, o = t.size, d = t.browser, p = t.params.cubeEffect, u = t.isHorizontal(), c = t.virtual && t.params.virtual.enabled, h = 0;
            p.shadow && (u ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = m('<div class="swiper-cube-shadow"></div>'),
            i.append(e)),
            e.css({
                height: r + "px"
            })) : 0 === (e = a.find(".swiper-cube-shadow")).length && (e = m('<div class="swiper-cube-shadow"></div>'),
            a.append(e)));
            for (var v = 0; v < s.length; v += 1) {
                var f = s.eq(v)
                  , g = v;
                c && (g = parseInt(f.attr("data-swiper-slide-index"), 10));
                var b = 90 * g
                  , y = Math.floor(b / 360);
                l && (b = -b,
                y = Math.floor(-b / 360));
                var w = Math.max(Math.min(f[0].progress, 1), -1)
                  , E = 0
                  , x = 0
                  , T = 0;
                g % 4 == 0 ? (E = 4 * -y * o,
                T = 0) : (g - 1) % 4 == 0 ? (E = 0,
                T = 4 * -y * o) : (g - 2) % 4 == 0 ? (E = o + 4 * y * o,
                T = o) : (g - 3) % 4 == 0 && (E = -o,
                T = 3 * o + 4 * o * y),
                l && (E = -E),
                u || (x = E,
                E = 0);
                var C = "rotateX(" + (u ? 0 : -b) + "deg) rotateY(" + (u ? b : 0) + "deg) translate3d(" + E + "px, " + x + "px, " + T + "px)";
                if (w <= 1 && w > -1 && (h = 90 * g + 90 * w,
                l && (h = 90 * -g - 90 * w)),
                f.transform(C),
                p.slideShadows) {
                    var S = u ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top")
                      , M = u ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                    0 === S.length && (S = m('<div class="swiper-slide-shadow-' + (u ? "left" : "top") + '"></div>'),
                    f.append(S)),
                    0 === M.length && (M = m('<div class="swiper-slide-shadow-' + (u ? "right" : "bottom") + '"></div>'),
                    f.append(M)),
                    S.length && (S[0].style.opacity = Math.max(-w, 0)),
                    M.length && (M[0].style.opacity = Math.max(w, 0))
                }
            }
            if (i.css({
                "-webkit-transform-origin": "50% 50% -" + o / 2 + "px",
                "-moz-transform-origin": "50% 50% -" + o / 2 + "px",
                "-ms-transform-origin": "50% 50% -" + o / 2 + "px",
                "transform-origin": "50% 50% -" + o / 2 + "px"
            }),
            p.shadow)
                if (u)
                    e.transform("translate3d(0px, " + (r / 2 + p.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + p.shadowScale + ")");
                else {
                    var z = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90)
                      , P = 1.5 - (Math.sin(2 * z * Math.PI / 360) / 2 + Math.cos(2 * z * Math.PI / 360) / 2)
                      , k = p.shadowScale
                      , $ = p.shadowScale / P
                      , L = p.shadowOffset;
                    e.transform("scale3d(" + k + ", 1, " + $ + ") translate3d(0px, " + (n / 2 + L) + "px, " + -n / 2 / $ + "px) rotateX(-90deg)")
                }
            var I = d.isSafari || d.isWebView ? -o / 2 : 0;
            i.transform("translate3d(0px,0," + I + "px) rotateX(" + (t.isHorizontal() ? 0 : h) + "deg) rotateY(" + (t.isHorizontal() ? -h : 0) + "deg)")
        },
        setTransition: function(e) {
            var t = this
              , a = t.$el;
            t.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
            t.params.cubeEffect.shadow && !t.isHorizontal() && a.find(".swiper-cube-shadow").transition(e)
        }
    }
      , pe = {
        setTranslate: function() {
            for (var e = this, t = e.slides, a = e.rtlTranslate, i = 0; i < t.length; i += 1) {
                var s = t.eq(i)
                  , r = s[0].progress;
                e.params.flipEffect.limitRotation && (r = Math.max(Math.min(s[0].progress, 1), -1));
                var n = -180 * r
                  , l = 0
                  , o = -s[0].swiperSlideOffset
                  , d = 0;
                if (e.isHorizontal() ? a && (n = -n) : (d = o,
                o = 0,
                l = -n,
                n = 0),
                s[0].style.zIndex = -Math.abs(Math.round(r)) + t.length,
                e.params.flipEffect.slideShadows) {
                    var p = e.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top")
                      , u = e.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
                    0 === p.length && (p = m('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'),
                    s.append(p)),
                    0 === u.length && (u = m('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'),
                    s.append(u)),
                    p.length && (p[0].style.opacity = Math.max(-r, 0)),
                    u.length && (u[0].style.opacity = Math.max(r, 0))
                }
                s.transform("translate3d(" + o + "px, " + d + "px, 0px) rotateX(" + l + "deg) rotateY(" + n + "deg)")
            }
        },
        setTransition: function(e) {
            var t = this
              , a = t.slides
              , i = t.activeIndex
              , s = t.$wrapperEl;
            if (a.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
            t.params.virtualTranslate && 0 !== e) {
                var r = !1;
                a.eq(i).transitionEnd((function() {
                    if (!r && t && !t.destroyed) {
                        r = !0,
                        t.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], a = 0; a < e.length; a += 1)
                            s.trigger(e[a])
                    }
                }
                ))
            }
        }
    }
      , ue = {
        setTranslate: function() {
            for (var e = this, t = e.width, a = e.height, i = e.slides, s = e.slidesSizesGrid, r = e.params.coverflowEffect, n = e.isHorizontal(), l = e.translate, o = n ? t / 2 - l : a / 2 - l, d = n ? r.rotate : -r.rotate, p = r.depth, u = 0, c = i.length; u < c; u += 1) {
                var h = i.eq(u)
                  , v = s[u]
                  , f = (o - h[0].swiperSlideOffset - v / 2) / v * r.modifier
                  , g = n ? d * f : 0
                  , b = n ? 0 : d * f
                  , y = -p * Math.abs(f)
                  , w = r.stretch;
                "string" == typeof w && -1 !== w.indexOf("%") && (w = parseFloat(r.stretch) / 100 * v);
                var E = n ? 0 : w * f
                  , x = n ? w * f : 0
                  , T = 1 - (1 - r.scale) * Math.abs(f);
                Math.abs(x) < .001 && (x = 0),
                Math.abs(E) < .001 && (E = 0),
                Math.abs(y) < .001 && (y = 0),
                Math.abs(g) < .001 && (g = 0),
                Math.abs(b) < .001 && (b = 0),
                Math.abs(T) < .001 && (T = 0);
                var C = "translate3d(" + x + "px," + E + "px," + y + "px)  rotateX(" + b + "deg) rotateY(" + g + "deg) scale(" + T + ")";
                if (h.transform(C),
                h[0].style.zIndex = 1 - Math.abs(Math.round(f)),
                r.slideShadows) {
                    var S = n ? h.find(".swiper-slide-shadow-left") : h.find(".swiper-slide-shadow-top")
                      , M = n ? h.find(".swiper-slide-shadow-right") : h.find(".swiper-slide-shadow-bottom");
                    0 === S.length && (S = m('<div class="swiper-slide-shadow-' + (n ? "left" : "top") + '"></div>'),
                    h.append(S)),
                    0 === M.length && (M = m('<div class="swiper-slide-shadow-' + (n ? "right" : "bottom") + '"></div>'),
                    h.append(M)),
                    S.length && (S[0].style.opacity = f > 0 ? f : 0),
                    M.length && (M[0].style.opacity = -f > 0 ? -f : 0)
                }
            }
        },
        setTransition: function(e) {
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
        }
    }
      , ce = {
        init: function() {
            var e = this
              , t = e.params.thumbs;
            if (e.thumbs.initialized)
                return !1;
            e.thumbs.initialized = !0;
            var a = e.constructor;
            return t.swiper instanceof a ? (e.thumbs.swiper = t.swiper,
            S(e.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }),
            S(e.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })) : C(t.swiper) && (e.thumbs.swiper = new a(S({}, t.swiper, {
                watchSlidesVisibility: !0,
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })),
            e.thumbs.swiperCreated = !0),
            e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass),
            e.thumbs.swiper.on("tap", e.thumbs.onThumbClick),
            !0
        },
        onThumbClick: function() {
            var e = this
              , t = e.thumbs.swiper;
            if (t) {
                var a = t.clickedIndex
                  , i = t.clickedSlide;
                if (!(i && m(i).hasClass(e.params.thumbs.slideThumbActiveClass) || null == a)) {
                    var s;
                    if (s = t.params.loop ? parseInt(m(t.clickedSlide).attr("data-swiper-slide-index"), 10) : a,
                    e.params.loop) {
                        var r = e.activeIndex;
                        e.slides.eq(r).hasClass(e.params.slideDuplicateClass) && (e.loopFix(),
                        e._clientLeft = e.$wrapperEl[0].clientLeft,
                        r = e.activeIndex);
                        var n = e.slides.eq(r).prevAll('[data-swiper-slide-index="' + s + '"]').eq(0).index()
                          , l = e.slides.eq(r).nextAll('[data-swiper-slide-index="' + s + '"]').eq(0).index();
                        s = void 0 === n ? l : void 0 === l ? n : l - r < r - n ? l : n
                    }
                    e.slideTo(s)
                }
            }
        },
        update: function(e) {
            var t = this
              , a = t.thumbs.swiper;
            if (a) {
                var i = "auto" === a.params.slidesPerView ? a.slidesPerViewDynamic() : a.params.slidesPerView
                  , s = t.params.thumbs.autoScrollOffset
                  , r = s && !a.params.loop;
                if (t.realIndex !== a.realIndex || r) {
                    var n, l, o = a.activeIndex;
                    if (a.params.loop) {
                        a.slides.eq(o).hasClass(a.params.slideDuplicateClass) && (a.loopFix(),
                        a._clientLeft = a.$wrapperEl[0].clientLeft,
                        o = a.activeIndex);
                        var d = a.slides.eq(o).prevAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index()
                          , p = a.slides.eq(o).nextAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index();
                        n = void 0 === d ? p : void 0 === p ? d : p - o == o - d ? o : p - o < o - d ? p : d,
                        l = t.activeIndex > t.previousIndex ? "next" : "prev"
                    } else
                        l = (n = t.realIndex) > t.previousIndex ? "next" : "prev";
                    r && (n += "next" === l ? s : -1 * s),
                    a.visibleSlidesIndexes && a.visibleSlidesIndexes.indexOf(n) < 0 && (a.params.centeredSlides ? n = n > o ? n - Math.floor(i / 2) + 1 : n + Math.floor(i / 2) - 1 : n > o && (n = n - i + 1),
                    a.slideTo(n, e ? 0 : void 0))
                }
                var u = 1
                  , c = t.params.thumbs.slideThumbActiveClass;
                if (t.params.slidesPerView > 1 && !t.params.centeredSlides && (u = t.params.slidesPerView),
                t.params.thumbs.multipleActiveThumbs || (u = 1),
                u = Math.floor(u),
                a.slides.removeClass(c),
                a.params.loop || a.params.virtual && a.params.virtual.enabled)
                    for (var h = 0; h < u; h += 1)
                        a.$wrapperEl.children('[data-swiper-slide-index="' + (t.realIndex + h) + '"]').addClass(c);
                else
                    for (var v = 0; v < u; v += 1)
                        a.slides.eq(t.realIndex + v).addClass(c)
            }
        }
    }
      , he = [q, U, {
        name: "mousewheel",
        params: {
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarget: "container",
                thresholdDelta: null,
                thresholdTime: null
            }
        },
        create: function() {
            M(this, {
                mousewheel: {
                    enabled: !1,
                    lastScrollTime: x(),
                    lastEventBeforeSnap: void 0,
                    recentWheelEvents: [],
                    enable: K.enable,
                    disable: K.disable,
                    handle: K.handle,
                    handleMouseEnter: K.handleMouseEnter,
                    handleMouseLeave: K.handleMouseLeave,
                    animateSlider: K.animateSlider,
                    releaseScroll: K.releaseScroll
                }
            })
        },
        on: {
            init: function(e) {
                !e.params.mousewheel.enabled && e.params.cssMode && e.mousewheel.disable(),
                e.params.mousewheel.enabled && e.mousewheel.enable()
            },
            destroy: function(e) {
                e.params.cssMode && e.mousewheel.enable(),
                e.mousewheel.enabled && e.mousewheel.disable()
            }
        }
    }, {
        name: "navigation",
        params: {
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock"
            }
        },
        create: function() {
            M(this, {
                navigation: t({}, Z)
            })
        },
        on: {
            init: function(e) {
                e.navigation.init(),
                e.navigation.update()
            },
            toEdge: function(e) {
                e.navigation.update()
            },
            fromEdge: function(e) {
                e.navigation.update()
            },
            destroy: function(e) {
                e.navigation.destroy()
            },
            "enable disable": function(e) {
                var t = e.navigation
                  , a = t.$nextEl
                  , i = t.$prevEl;
                a && a[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass),
                i && i[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass)
            },
            click: function(e, t) {
                var a = e.navigation
                  , i = a.$nextEl
                  , s = a.$prevEl
                  , r = t.target;
                if (e.params.navigation.hideOnClick && !m(r).is(s) && !m(r).is(i)) {
                    if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === r || e.pagination.el.contains(r)))
                        return;
                    var n;
                    i ? n = i.hasClass(e.params.navigation.hiddenClass) : s && (n = s.hasClass(e.params.navigation.hiddenClass)),
                    !0 === n ? e.emit("navigationShow") : e.emit("navigationHide"),
                    i && i.toggleClass(e.params.navigation.hiddenClass),
                    s && s.toggleClass(e.params.navigation.hiddenClass)
                }
            }
        }
    }, {
        name: "pagination",
        params: {
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: function(e) {
                    return e
                },
                formatFractionTotal: function(e) {
                    return e
                },
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                modifierClass: "swiper-pagination-",
                currentClass: "swiper-pagination-current",
                totalClass: "swiper-pagination-total",
                hiddenClass: "swiper-pagination-hidden",
                progressbarFillClass: "swiper-pagination-progressbar-fill",
                progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                clickableClass: "swiper-pagination-clickable",
                lockClass: "swiper-pagination-lock"
            }
        },
        create: function() {
            M(this, {
                pagination: t({
                    dynamicBulletIndex: 0
                }, J)
            })
        },
        on: {
            init: function(e) {
                e.pagination.init(),
                e.pagination.render(),
                e.pagination.update()
            },
            activeIndexChange: function(e) {
                (e.params.loop || void 0 === e.snapIndex) && e.pagination.update()
            },
            snapIndexChange: function(e) {
                e.params.loop || e.pagination.update()
            },
            slidesLengthChange: function(e) {
                e.params.loop && (e.pagination.render(),
                e.pagination.update())
            },
            snapGridLengthChange: function(e) {
                e.params.loop || (e.pagination.render(),
                e.pagination.update())
            },
            destroy: function(e) {
                e.pagination.destroy()
            },
            "enable disable": function(e) {
                var t = e.pagination.$el;
                t && t[e.enabled ? "removeClass" : "addClass"](e.params.pagination.lockClass)
            },
            click: function(e, t) {
                var a = t.target;
                if (e.params.pagination.el && e.params.pagination.hideOnClick && e.pagination.$el.length > 0 && !m(a).hasClass(e.params.pagination.bulletClass)) {
                    if (e.navigation && (e.navigation.nextEl && a === e.navigation.nextEl || e.navigation.prevEl && a === e.navigation.prevEl))
                        return;
                    !0 === e.pagination.$el.hasClass(e.params.pagination.hiddenClass) ? e.emit("paginationShow") : e.emit("paginationHide"),
                    e.pagination.$el.toggleClass(e.params.pagination.hiddenClass)
                }
            }
        }
    }, {
        name: "scrollbar",
        params: {
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag"
            }
        },
        create: function() {
            M(this, {
                scrollbar: t({
                    isTouched: !1,
                    timeout: null,
                    dragTimeout: null
                }, Q)
            })
        },
        on: {
            init: function(e) {
                e.scrollbar.init(),
                e.scrollbar.updateSize(),
                e.scrollbar.setTranslate()
            },
            update: function(e) {
                e.scrollbar.updateSize()
            },
            resize: function(e) {
                e.scrollbar.updateSize()
            },
            observerUpdate: function(e) {
                e.scrollbar.updateSize()
            },
            setTranslate: function(e) {
                e.scrollbar.setTranslate()
            },
            setTransition: function(e, t) {
                e.scrollbar.setTransition(t)
            },
            "enable disable": function(e) {
                var t = e.scrollbar.$el;
                t && t[e.enabled ? "removeClass" : "addClass"](e.params.scrollbar.lockClass)
            },
            destroy: function(e) {
                e.scrollbar.destroy()
            }
        }
    }, {
        name: "parallax",
        params: {
            parallax: {
                enabled: !1
            }
        },
        create: function() {
            M(this, {
                parallax: t({}, ee)
            })
        },
        on: {
            beforeInit: function(e) {
                e.params.parallax.enabled && (e.params.watchSlidesProgress = !0,
                e.originalParams.watchSlidesProgress = !0)
            },
            init: function(e) {
                e.params.parallax.enabled && e.parallax.setTranslate()
            },
            setTranslate: function(e) {
                e.params.parallax.enabled && e.parallax.setTranslate()
            },
            setTransition: function(e, t) {
                e.params.parallax.enabled && e.parallax.setTransition(t)
            }
        }
    }, {
        name: "zoom",
        params: {
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        },
        create: function() {
            var e = this;
            M(e, {
                zoom: t({
                    enabled: !1,
                    scale: 1,
                    currentScale: 1,
                    isScaling: !1,
                    gesture: {
                        $slideEl: void 0,
                        slideWidth: void 0,
                        slideHeight: void 0,
                        $imageEl: void 0,
                        $imageWrapEl: void 0,
                        maxRatio: 3
                    },
                    image: {
                        isTouched: void 0,
                        isMoved: void 0,
                        currentX: void 0,
                        currentY: void 0,
                        minX: void 0,
                        minY: void 0,
                        maxX: void 0,
                        maxY: void 0,
                        width: void 0,
                        height: void 0,
                        startX: void 0,
                        startY: void 0,
                        touchesStart: {},
                        touchesCurrent: {}
                    },
                    velocity: {
                        x: void 0,
                        y: void 0,
                        prevPositionX: void 0,
                        prevPositionY: void 0,
                        prevTime: void 0
                    }
                }, te)
            });
            var a = 1;
            Object.defineProperty(e.zoom, "scale", {
                get: function() {
                    return a
                },
                set: function(t) {
                    if (a !== t) {
                        var i = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0
                          , s = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0;
                        e.emit("zoomChange", t, i, s)
                    }
                    a = t
                }
            })
        },
        on: {
            init: function(e) {
                e.params.zoom.enabled && e.zoom.enable()
            },
            destroy: function(e) {
                e.zoom.disable()
            },
            touchStart: function(e, t) {
                e.zoom.enabled && e.zoom.onTouchStart(t)
            },
            touchEnd: function(e, t) {
                e.zoom.enabled && e.zoom.onTouchEnd(t)
            },
            doubleTap: function(e, t) {
                !e.animating && e.params.zoom.enabled && e.zoom.enabled && e.params.zoom.toggle && e.zoom.toggle(t)
            },
            transitionEnd: function(e) {
                e.zoom.enabled && e.params.zoom.enabled && e.zoom.onTransitionEnd()
            },
            slideChange: function(e) {
                e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && e.zoom.onTransitionEnd()
            }
        }
    }, {
        name: "lazy",
        params: {
            lazy: {
                checkInView: !1,
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                scrollingElement: "",
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader"
            }
        },
        create: function() {
            M(this, {
                lazy: t({
                    initialImageLoaded: !1
                }, ae)
            })
        },
        on: {
            beforeInit: function(e) {
                e.params.lazy.enabled && e.params.preloadImages && (e.params.preloadImages = !1)
            },
            init: function(e) {
                e.params.lazy.enabled && !e.params.loop && 0 === e.params.initialSlide && (e.params.lazy.checkInView ? e.lazy.checkInViewOnLoad() : e.lazy.load())
            },
            scroll: function(e) {
                e.params.freeMode && !e.params.freeModeSticky && e.lazy.load()
            },
            "scrollbarDragMove resize _freeModeNoMomentumRelease": function(e) {
                e.params.lazy.enabled && e.lazy.load()
            },
            transitionStart: function(e) {
                e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load()
            },
            transitionEnd: function(e) {
                e.params.lazy.enabled && !e.params.lazy.loadOnTransitionStart && e.lazy.load()
            },
            slideChange: function(e) {
                e.params.lazy.enabled && e.params.cssMode && e.lazy.load()
            }
        }
    }, {
        name: "controller",
        params: {
            controller: {
                control: void 0,
                inverse: !1,
                by: "slide"
            }
        },
        create: function() {
            M(this, {
                controller: t({
                    control: this.params.controller.control
                }, ie)
            })
        },
        on: {
            update: function(e) {
                e.controller.control && e.controller.spline && (e.controller.spline = void 0,
                delete e.controller.spline)
            },
            resize: function(e) {
                e.controller.control && e.controller.spline && (e.controller.spline = void 0,
                delete e.controller.spline)
            },
            observerUpdate: function(e) {
                e.controller.control && e.controller.spline && (e.controller.spline = void 0,
                delete e.controller.spline)
            },
            setTranslate: function(e, t, a) {
                e.controller.control && e.controller.setTranslate(t, a)
            },
            setTransition: function(e, t, a) {
                e.controller.control && e.controller.setTransition(t, a)
            }
        }
    }, {
        name: "a11y",
        params: {
            a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                slideLabelMessage: "{{index}} / {{slidesLength}}",
                containerMessage: null,
                containerRoleDescriptionMessage: null,
                itemRoleDescriptionMessage: null,
                slideRole: "group"
            }
        },
        create: function() {
            M(this, {
                a11y: t({}, se, {
                    liveRegion: m('<span class="' + this.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                })
            })
        },
        on: {
            afterInit: function(e) {
                e.params.a11y.enabled && (e.a11y.init(),
                e.a11y.updateNavigation())
            },
            toEdge: function(e) {
                e.params.a11y.enabled && e.a11y.updateNavigation()
            },
            fromEdge: function(e) {
                e.params.a11y.enabled && e.a11y.updateNavigation()
            },
            paginationUpdate: function(e) {
                e.params.a11y.enabled && e.a11y.updatePagination()
            },
            destroy: function(e) {
                e.params.a11y.enabled && e.a11y.destroy()
            }
        }
    }, {
        name: "history",
        params: {
            history: {
                enabled: !1,
                root: "",
                replaceState: !1,
                key: "slides"
            }
        },
        create: function() {
            M(this, {
                history: t({}, re)
            })
        },
        on: {
            init: function(e) {
                e.params.history.enabled && e.history.init()
            },
            destroy: function(e) {
                e.params.history.enabled && e.history.destroy()
            },
            "transitionEnd _freeModeNoMomentumRelease": function(e) {
                e.history.initialized && e.history.setHistory(e.params.history.key, e.activeIndex)
            },
            slideChange: function(e) {
                e.history.initialized && e.params.cssMode && e.history.setHistory(e.params.history.key, e.activeIndex)
            }
        }
    }, {
        name: "hash-navigation",
        params: {
            hashNavigation: {
                enabled: !1,
                replaceState: !1,
                watchState: !1
            }
        },
        create: function() {
            M(this, {
                hashNavigation: t({
                    initialized: !1
                }, ne)
            })
        },
        on: {
            init: function(e) {
                e.params.hashNavigation.enabled && e.hashNavigation.init()
            },
            destroy: function(e) {
                e.params.hashNavigation.enabled && e.hashNavigation.destroy()
            },
            "transitionEnd _freeModeNoMomentumRelease": function(e) {
                e.hashNavigation.initialized && e.hashNavigation.setHash()
            },
            slideChange: function(e) {
                e.hashNavigation.initialized && e.params.cssMode && e.hashNavigation.setHash()
            }
        }
    }, {
        name: "autoplay",
        params: {
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1,
                pauseOnMouseEnter: !1
            }
        },
        create: function() {
            M(this, {
                autoplay: t({}, le, {
                    running: !1,
                    paused: !1
                })
            })
        },
        on: {
            init: function(e) {
                e.params.autoplay.enabled && (e.autoplay.start(),
                r().addEventListener("visibilitychange", e.autoplay.onVisibilityChange),
                e.autoplay.attachMouseEvents())
            },
            beforeTransitionStart: function(e, t, a) {
                e.autoplay.running && (a || !e.params.autoplay.disableOnInteraction ? e.autoplay.pause(t) : e.autoplay.stop())
            },
            sliderFirstMove: function(e) {
                e.autoplay.running && (e.params.autoplay.disableOnInteraction ? e.autoplay.stop() : e.autoplay.pause())
            },
            touchEnd: function(e) {
                e.params.cssMode && e.autoplay.paused && !e.params.autoplay.disableOnInteraction && e.autoplay.run()
            },
            destroy: function(e) {
                e.autoplay.detachMouseEvents(),
                e.autoplay.running && e.autoplay.stop(),
                r().removeEventListener("visibilitychange", e.autoplay.onVisibilityChange)
            }
        }
    }, {
        name: "effect-fade",
        params: {
            fadeEffect: {
                crossFade: !1
            }
        },
        create: function() {
            M(this, {
                fadeEffect: t({}, oe)
            })
        },
        on: {
            beforeInit: function(e) {
                if ("fade" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "fade");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    S(e.params, t),
                    S(e.originalParams, t)
                }
            },
            setTranslate: function(e) {
                "fade" === e.params.effect && e.fadeEffect.setTranslate()
            },
            setTransition: function(e, t) {
                "fade" === e.params.effect && e.fadeEffect.setTransition(t)
            }
        }
    }, {
        name: "effect-cube",
        params: {
            cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            }
        },
        create: function() {
            M(this, {
                cubeEffect: t({}, de)
            })
        },
        on: {
            beforeInit: function(e) {
                if ("cube" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "cube"),
                    e.classNames.push(e.params.containerModifierClass + "3d");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        resistanceRatio: 0,
                        spaceBetween: 0,
                        centeredSlides: !1,
                        virtualTranslate: !0
                    };
                    S(e.params, t),
                    S(e.originalParams, t)
                }
            },
            setTranslate: function(e) {
                "cube" === e.params.effect && e.cubeEffect.setTranslate()
            },
            setTransition: function(e, t) {
                "cube" === e.params.effect && e.cubeEffect.setTransition(t)
            }
        }
    }, {
        name: "effect-flip",
        params: {
            flipEffect: {
                slideShadows: !0,
                limitRotation: !0
            }
        },
        create: function() {
            M(this, {
                flipEffect: t({}, pe)
            })
        },
        on: {
            beforeInit: function(e) {
                if ("flip" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "flip"),
                    e.classNames.push(e.params.containerModifierClass + "3d");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    S(e.params, t),
                    S(e.originalParams, t)
                }
            },
            setTranslate: function(e) {
                "flip" === e.params.effect && e.flipEffect.setTranslate()
            },
            setTransition: function(e, t) {
                "flip" === e.params.effect && e.flipEffect.setTransition(t)
            }
        }
    }, {
        name: "effect-coverflow",
        params: {
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                scale: 1,
                modifier: 1,
                slideShadows: !0
            }
        },
        create: function() {
            M(this, {
                coverflowEffect: t({}, ue)
            })
        },
        on: {
            beforeInit: function(e) {
                "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"),
                e.classNames.push(e.params.containerModifierClass + "3d"),
                e.params.watchSlidesProgress = !0,
                e.originalParams.watchSlidesProgress = !0)
            },
            setTranslate: function(e) {
                "coverflow" === e.params.effect && e.coverflowEffect.setTranslate()
            },
            setTransition: function(e, t) {
                "coverflow" === e.params.effect && e.coverflowEffect.setTransition(t)
            }
        }
    }, {
        name: "thumbs",
        params: {
            thumbs: {
                swiper: null,
                multipleActiveThumbs: !0,
                autoScrollOffset: 0,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-container-thumbs"
            }
        },
        create: function() {
            M(this, {
                thumbs: t({
                    swiper: null,
                    initialized: !1
                }, ce)
            })
        },
        on: {
            beforeInit: function(e) {
                var t = e.params.thumbs;
                t && t.swiper && (e.thumbs.init(),
                e.thumbs.update(!0))
            },
            slideChange: function(e) {
                e.thumbs.swiper && e.thumbs.update()
            },
            update: function(e) {
                e.thumbs.swiper && e.thumbs.update()
            },
            resize: function(e) {
                e.thumbs.swiper && e.thumbs.update()
            },
            observerUpdate: function(e) {
                e.thumbs.swiper && e.thumbs.update()
            },
            setTransition: function(e, t) {
                var a = e.thumbs.swiper;
                a && a.setTransition(t)
            },
            beforeDestroy: function(e) {
                var t = e.thumbs.swiper;
                t && e.thumbs.swiperCreated && t && t.destroy()
            }
        }
    }];
    return F.use(he),
    F
}
));
//# sourceMappingURL=swiper-bundle.min.js.map
"use strict";
function _classCallCheck(n, t) {
    if (!(n instanceof t))
        throw new TypeError("Cannot call a class as a function");
}
function createCss(n) {
    if (!document.getElementById(n)) {
        var i = document.getElementsByTagName("head")[0]
          , t = document.createElement("link");
        t.id = n;
        t.rel = "stylesheet";
        t.type = "text/css";
        t.href = n;
        t.media = "all";
        i.appendChild(t)
    }
}
function cartItems() {
    var t = document.querySelectorAll(".body-basket-items")
      , r = document.querySelector(".heade-basket-items")
      , u = document.querySelectorAll(".coursePrice")
      , f = document.querySelector(".modalSuccess")
      , e = document.querySelector(".modalSuccess g")
      , i = document.querySelector(".shoppingCart")
      , n = document.querySelector(".emptyShoppingCart")
      , o = document.getElementsByClassName("hide--cart-item");
    t.forEach(function(t) {
        t.querySelector(".body-basket-items");
        t.querySelector(".delete").addEventListener("click", function(r) {
            function u() {
                return document.querySelectorAll(".body-basket-items").length === 0
            }
            r.preventDefault();
            t.remove();
            u() ? (document.querySelectorAll(".hide--cart-item").forEach(function(n) {
                n.style.display = "none"
            }),
            setTimeout(function() {
                n.style.display = "block"
            }, 1e3)) : (i.style.display = "grid",
            n.style.display = "none")
        })
    })
}
function formatPrice(n) {
    if (isNaN(n))
        return "Invalid input";
    var u = n.toString().split(".")
      , t = _slicedToArray(u, 2)
      , f = t[0]
      , i = t[1]
      , r = f.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return i ? r + "." + i : r
}
function escapeHtml(n) {
    return n.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
function runSampleVideosOf(n) {
    $(n).each(function() {
        var n = $(this).find(".sample-video");
        $(n).each(function() {
            function t(i) {
                i.stopPropagation();
                this.classList.add("play");
                n.play();
                n.controls = !0;
                this.removeEventListener("click", t)
            }
            var n = $(this).find("video")[0];
            n.controls = !1;
            $(this).on("click", t);
            $(n).on("ended", function() {
                $(this).removeClass("play");
                $(this).addEventListener("click", t);
                this.controls = !1
            })
        })
    })
}
var _createClass = function() {
    function n(n, t) {
        for (var i, r = 0; r < t.length; r++)
            i = t[r],
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(n, i.key, i)
    }
    return function(t, i, r) {
        return i && n(t.prototype, i),
        r && n(t, r),
        t
    }
}(), _slicedToArray = function() {
    function n(n, t) {
        var r = [], u = !0, f = !1, e = undefined, i, o;
        try {
            for (i = n[Symbol.iterator](); !(u = (o = i.next()).done); u = !0)
                if (r.push(o.value),
                t && r.length === t)
                    break
        } catch (s) {
            f = !0;
            e = s
        } finally {
            try {
                !u && i["return"] && i["return"]()
            } finally {
                if (f)
                    throw e;
            }
        }
        return r
    }
    return function(t, i) {
        if (Array.isArray(t))
            return t;
        if (Symbol.iterator in Object(t))
            return n(t, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
}(), courseNav, InnerNav, breadcrumbItemLastChild, priceElements, AnchorElements, htmlCodeElements, activeMyCollapsibleItem, collapsibleItemBtnsArray, articleVideoBoxVideos, activeSinglePackages;
$(function() {
    function v() {
        document.getElementById("resMenu").style.width = "320px";
        dc.query("#resMenu + .overlay").classList.add("active")
    }
    function h() {
        document.getElementById("resMenu").style.width = "0";
        dc.query("#resMenu + .overlay").classList.remove("active")
    }
    function u(n) {
        return n ? n.offsetTop + u(n.offsetParent) : 0
    }
    function l(n) {
        var t = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1]
          , r = dc.queries(n)
          , i = Object.values(r).find(function(n) {
            return $(window).scrollTop() + $(window).height() > u(n) - t && $(window).scrollTop() < u(n) + n.clientHeight + t
        });
        return i ? i.nodeName == "SOURCE" ? void 0 : !0 : !1
    }
    function y(n) {
        var t = $(".grid-container");
        n.preventDefault();
        t.hasClass("list-view");
        t.addClass("list-view")
    }
    function p(n) {
        var t = $(".grid-container");
        n.preventDefault();
        t.removeClass("list-view")
    }
    function w(n) {
        var t = setCounterDate(n);
        t().days + 1 <= 0 ? dc.queries(".attentionBanner[data-date='" + n + "']").forEach(function(n) {
            n.classList.add("done")
        }) : dc.queries(".attentionBanner[data-date='" + n + "'] .text span").forEach(function(n) {
            n.innerHTML = t().days + 1
        })
    }
    function b(n) {
        var t = document.createElement("textarea");
        t.value = n;
        t.style.top = "0";
        t.style.left = "0";
        t.style.position = "fixed";
        document.body.appendChild(t);
        t.focus();
        t.select();
        document.execCommand("copy");
        document.body.removeChild(t)
    }
    function f(n) {
        if (!navigator.clipboard) {
            b(n);
            return
        }
        navigator.clipboard.writeText(n)
    }
    function k() {
        var t = arguments.length <= 0 || arguments[0] === undefined ? "photoVeiwer" : arguments[0]
          , n = dc.queries("." + t);
        n.length >= 1 && n.forEach(function(n) {
            var t = n.querySelectorAll("img");
            t.forEach(function(n) {
                n.onclick = function() {
                    callModal.photoVeiwer(t, n)
                }
            })
        })
    }
    function s() {
        if ($(window).width() < 1200) {
            var t = n.clientHeight;
            $(n).hasClass("disable") ? ($("#getUp").css("bottom", "var(--offset)"),
            $("#courses-table-of-content-btn").css("bottom", "20px")) : ($("#getUp").css("bottom", t + 10 + "px"),
            $("#courses-table-of-content-btn").css("bottom", t + 10 + "px"))
        } else
            $("#getUp").css("bottom", "var(--offset)"),
            $("#courses-table-of-content-btn").css("bottom", "20px")
    }
    var r, i, t, c, a, e, n, o;
    for (r = document.getElementsByClassName("courseSelector"),
    i = 0; i < r.length; i++)
        r[i].addEventListener("click", function() {
            document.getElementById(this.dataset.linkto).classList.remove("noDisplay");
            document.getElementsByClassName("OriginContent")[0].classList.add("out");
            document.getElementsByClassName("crossContent")[0].classList.add("in")
        });
    // document.getElementById("backToRes").addEventListener("click", function() {
    //     var n = dc.query(".crossContent ul:not(.noDisplay)");
    //     n.classList.add("noDisplay");
    //     document.getElementsByClassName("OriginContent")[0].classList.remove("out");
    //     document.getElementsByClassName("crossContent")[0].classList.remove("in")
    // });
    t = dc.id("getUp");
    t && (t.addEventListener("click", function() {
        window.scrollTo(0, 0)
    }),
    c = function() {
        window.scrollY > window.innerHeight ? t.classList.add("active") : t.classList.remove("active")
    }
    ,
    window.addEventListener("scroll", c));
    window.isVisible = l;
    $(document).on("click", ".btn-grid", p);
    $(document).on("click", ".btn-list", y);
    dc.queries(".attentionBanner:not(.deadline)").forEach(function(n) {
        w(n.dataset.date)
    });
    dc.queries(".attentionBanner i").forEach(function(n) {
        n.onclick = function(t) {
            t.preventDefault();
            n.parentElement.classList.add("done")
        }
    });
    window.clipboard = f;
    dc.queries(".copyable").forEach(function(n) {
        n.onclick = function() {
            var t = n.dataset.copy;
            f(t);
            dc.queries(".copied").forEach(function(n) {
                n.classList.remove("copied")
            });
            n.classList.add("copied");
            setTimeout(function() {
                n.classList.remove("copied")
            }, 3e3)
        }
    });
    document.querySelectorAll("[data-mobileSrc]").forEach(function(n) {
        function i(t) {
            t.isMobile ? n.setAttribute("data-src", n.dataset.mobilesrc) : n.setAttribute("data-src", n.dataset.screensrc)
        }
        function r() {
            window.innerWidth < t && (n.isMobile = !0,
            i(n),
            window.removeEventListener("resize", r),
            window.addEventListener("resize", u))
        }
        function u() {
            window.innerWidth >= t && (n.isMobile = !1,
            i(n),
            window.removeEventListener("resize", u),
            window.addEventListener("resize", r))
        }
        var t = parseInt(n.dataset.mobilewidth) || 520
          , f = window.innerWidth < t;
        f ? (n.isMobile = !0,
        i(n),
        window.addEventListener("resize", u)) : (n.setAttribute("data-src", n.dataset.screensrc),
        window.addEventListener("resize", r))
    });
    k();
    a = dc.queries('.td-content:not(.no_image_zoom) img:not(.no_image_zoom), .journal:not(.no_image_zoom) img:not(.no_image_zoom), .courseDetail:not(.no_image_zoom) img:not(.no_image_zoom) , section[id^="headline"]:not(.no_image_zoom) img:not(.no_image_zoom)');
    a.forEach(function(n) {
        n.onclick = function() {
            n.classList.add("active");
            callModal.image(n.src, {
                zoom: !0
            })
        }
        ;
        n.onerror = function() {
            n.onclick = null;
            n.onerror = null;
            n.classList.add("unclickable")
        }
    });
    e = document.querySelectorAll(".td-content pre:not(.exception)");
    e.length && e.forEach(function(n) {
        var t = document.createElement("button")
          , i = n.innerText;
        t.onclick = function() {
            t.classList.contains("copied") || (f(i),
            t.classList.add("copied"),
            setTimeout(function() {
                t.classList.remove("copied")
            }, 5e3))
        }
        ;
        n.appendChild(t)
    });
    setTimeout(function() {
        respondToVisibility("[data-src]", function(n) {
            $(n).attr("src", $(n).data("src"));
            $(n).removeAttr("data-src")
        });
        respondToVisibility("[data-poster]", function(n) {
            $(n).attr("poster", $(n).data("poster"));
            $(n).removeAttr("data-poster")
        });
        respondToVisibility("[data-bg]", function(n) {
            var t = $(n).data("bg")
              , i = "";
            t.includes(",") ? function() {
                var n = t.split(",");
                n.forEach(function(t, r) {
                    i += "url(" + t + ")" + (r === n.length - 1 ? "" : ",")
                })
            }() : i = "url(" + t + ")";
            $(n).css("background-image", i);
            $(n).removeAttr("data-bg")
        })
    }, 1e3);
    respondToVisibility(".lazyLoad", function(n) {
        $(n).addClass("backgroundLoaded")
    });
    $(".roadCats > span").on("click", function() {
        var n = $(this).data("cat");
        $("" + n).siblings(".tabSection").slideUp(0);
        $("" + n).slideToggle(300)
    });
    $(".collapsePart").each(function() {
        $(this).data("collapsestatus") === "open" ? ($(this).next().slideDown(),
        $(this).addClass("active")) : $(this).next().slideToggle(300)
    });
    $(".collapsePart").on("click", function() {
        $(this).toggleClass("active");
        $(this).next().slideToggle(300);
        $(this).siblings(".collapsePart").removeClass("active");
        $(this).siblings(".collapsePart").next().slideUp(300)
    });
    n = document.querySelector("#mobileRegisterBtn");
    o = document.querySelector(".courseInfo");
    window.addEventListener("resize", function() {
        n && s()
    });
    o && isInViewport(o, function() {
        n.classList.add("disable");
        s()
    }, function() {
        n.classList.remove("disable");
        s()
    });
    $("[data-classid]").on("click", function() {
        var n = $(this).data("classid");
        $("[data-myclassid='" + n + "']").slideToggle()
    });
    setTimeout(function() {
        if (document.querySelector("#weblog-slider"))
            var n = new Swiper("#weblog-slider",{
                speed: 1e3,
                slidesPerView: 5,
                spaceBetween: 30,
                slidesPerGroup: 1,
                loop: !1,
                loopFillGroupWithBlank: !0,
                navigation: {
                    nextEl: "#weblog-slider .swiper-button-next",
                    prevEl: "#weblog-slider .swiper-button-prev"
                },
                breakpoints: {
                    980: {
                        freemode: !0,
                        slidesPerView: 3,
                        spaceBetween: 20,
                        slidesPerGroup: 1
                    },
                    840: {
                        freemode: !0,
                        slidesPerView: 2.5,
                        spaceBetween: 20,
                        slidesPerGroup: 1
                    },
                    680: {
                        freemode: !0,
                        slidesPerView: 2,
                        spaceBetween: 20,
                        slidesPerGroup: 1
                    },
                    550: {
                        freemode: !0,
                        slidesPerView: 1.6,
                        spaceBetween: 20,
                        slidesPerGroup: 1
                    },
                    320: {
                        freemode: !0,
                        slidesPerView: 1.3,
                        spaceBetween: 20,
                        slidesPerGroup: 1
                    }
                }
            })
    }, 1e3);
    window.innerWidth < 768 && $(".attentionBanner .ResBg").each(function() {
        var n = $(this);
        n.attr("src", n.data("image"))
    });
    $("#ArticleAsideTableOfContents").on("click", function() {
        $(window).width() < 1200 && ($("#getUp").show(),
        $("#tableOfContentsOverLay").hide(),
        $(this).removeClass("active"))
    });
    $("#tableOfContentsOverLay").on("click", function() {
        $("#getUp").show();
        $("#ArticleAsideTableOfContents").removeClass("active");
        $(this).hide()
    });
    $("#activeTableOfContent").on("click", function() {
        $("#getUp").toggle();
        $("#tableOfContentsOverLay").toggle()
    });
    $("#courses-table-of-content-btn").on("click", function() {
        $("#getUp").toggle();
        $("#tableOfContentsOverLay").toggle();
        $("#ArticleAsideTableOfContents").addClass("active")
    });
    $(window).on("resize", function() {
        $(window).width() < 1200 ? $(".tableOfContents.forAside").length > 0 ? ($(".tableOfContents").removeClass("active"),
        $("#activeTableOfContent").show(),
        $("#tableOfContentsOverLay").hide(),
        $(".tableOfContents.forCourses").length > 0 ? $("#courses-table-of-content-btn").show() : $("#courses-table-of-content-btn").hide()) : ($("#activeTableOfContent").hide(),
        $("#courses-table-of-content-btn").hide()) : ($("#activeTableOfContent").hide(),
        $("#courses-table-of-content-btn").hide())
    });
    $(window).trigger("resize")
});
cartItems();
courseNav = document.querySelectorAll(".CourseNav");
courseNav.forEach(function(n) {
    n.querySelector(" li > ul") || n.classList.add("hide")
});
InnerNav = document.querySelectorAll(".InnerNav");
InnerNav.forEach(function(n) {
    n.querySelector(" li > ul") || n.classList.add("hide")
});
breadcrumbItemLastChild = document.querySelector(".breadcrumb-item:last-child a");
breadcrumbItemLastChild && (breadcrumbItemLastChild.onclick = function(n) {
    n.preventDefault()
}
);
priceElements = dc.queries(".separate-price");
priceElements.length > 0 && priceElements.forEach(function(n) {
    var t = parseInt(n.textContent.replaceAll(",", ""));
    n.textContent = formatPrice(t)
});
AnchorElements = dc.queries("[data-scrolltoid]");
AnchorElements.length > 0 && AnchorElements.forEach(function(n) {
    n.addEventListener("click", function() {
        var i = this.dataset.scrolltoid, n = dc.id(i), t;
        n && (t = window.scrollY + n.getBoundingClientRect().top - 100,
        window.scrollTo(0, t))
    })
});
window.addEventListener("click", function(n) {
    var t = document.querySelector(".left-header [data-onclick]")
      , i = n.target
      , r = i.parentElement;
    t && (i.contains(t) || r.contains(t) || t.classList.remove("active"))
});
htmlCodeElements = document.querySelectorAll(".htmlCodes");
htmlCodeElements && htmlCodeElements.length > 0 && htmlCodeElements.forEach(function(n) {
    var t = n.innerHTML
      , i = escapeHtml(t);
    n.innerHTML = i
});
var collapse = function() {
    function n(t) {
        _classCallCheck(this, n);
        this.section = t;
        this.title = this.section.querySelector(".title");
        this.content = this.section.querySelector(".content");
        this.eventSetter();
        this.contentHeightSetter()
    }
    return _createClass(n, [{
        key: "eventSetter",
        value: function() {
            this.title.addEventListener("click", this.titleClickHandler.bind(this))
        }
    }, {
        key: "titleClickHandler",
        value: function(n) {
            this.section.classList.contains("active") ? (this.section.classList.remove("active"),
            n.currentTarget.classList.remove("active")) : (this.section.classList.add("active"),
            n.currentTarget.classList.add("active"))
        }
    }, {
        key: "contentHeightSetter",
        value: function() {
            var n = this.content.scrollHeight;
            this.content.style.setProperty("--height", n + "px")
        }
    }]),
    n
}()
  , collapsibleSections = document.querySelectorAll(".collapsibleSection")
  , collapsibleSectionsArray = [];
collapsibleSections.forEach(function(n) {
    collapsibleSectionsArray.push(new collapse(n))
});
setTimeout(function() {
    var t = document.querySelectorAll(".collapsible-content"), n;
    t && t.length >= 1 && t.forEach(function(n) {
        n.style.setProperty("--scrollHeight", n.scrollHeight + "px")
    });
    n = document.querySelectorAll(".heightAnimation");
    n && n.length >= 1 && n.forEach(function(n) {
        n.style.setProperty("--maxHeight", n.scrollHeight + "px")
    })
}, 1e3);
activeMyCollapsibleItem = function(n) {
    var t = n.closest(".collapsible-item"), i;
    t && (i = t.classList.contains("active"),
    i ? t.classList.remove("active") : t.classList.add("active"))
}
;
collapsibleItemBtnsArray = document.querySelectorAll(".collapse-item-btn");
collapsibleItemBtnsArray && collapsibleItemBtnsArray.length >= 1 && collapsibleItemBtnsArray.forEach(function(n) {
    n.addEventListener("click", function(n) {
        n.stopPropagation();
        activeMyCollapsibleItem(n.currentTarget)
    })
});
articleVideoBoxVideos = document.querySelectorAll(".video-part video");
articleVideoBoxVideos && articleVideoBoxVideos.length >= 1 && articleVideoBoxVideos.forEach(function(n) {
    n.addEventListener("click", function() {
        n.play()
    })
});
activeSinglePackages = setInterval(function() {
    var t = document.querySelectorAll(".packageInCourse"), n;
    t && t.length === 1 && (document.querySelector(".packageInCourse .p-collapsibleContent").style.display = "flex",
    n = document.querySelectorAll(".packageInCourse .p-collapsibleSection"),
    n && n.length === 1 && (document.querySelector(".packageInCourse .p-collapsibleSection > .content").style.display = "flex",
    document.querySelector(".packageInCourse .p-collapsibleSection > .title").classList.add("active"),
    clearInterval(activeSinglePackages)))
}, 1e3);
runSampleVideosOf($(".introVideo"));
runSampleVideosOf($(".sample-video-container"));
"use strict";
(function() {
    function e() {
        function t() {
            n = document.documentElement.scrollTop;
            document.body.classList.add("locked");
            document.body.style.top = -n + "px";
            document.documentElement.style.scrollBehavior = "initial"
        }
        function i() {
            document.body.classList.remove("locked");
            document.body.style.top = null;
            document.documentElement.scrollTop = n;
            document.documentElement.style.scrollBehavior = null
        }
        var n = undefined;
        return {
            lock: t,
            unlock: i
        }
    }
    function t(n, t) {
        var r = arguments.length <= 2 || arguments[2] === undefined ? !1 : arguments[2];
        return i(t, function(t) {
            t(n)
        }, {
            scrollLock: r
        })
    }
    function i(t, i) {
        var e = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2]
          , f = e.close
          , u = e.scrollLock;
        return f || (f = "overlay"),
        u || (u = !1),
        i || typeof t != "function" || (i = t,
        t = undefined),
        new Promise(function(e) {
            function o() {
                return new Promise(function(t) {
                    n.classList.contains("active") && (n.addEventListener("transitionend", function() {
                        t();
                        e();
                        u && r.unlock()
                    }, {
                        once: !0
                    }),
                    n.classList.remove("active"))
                }
                )
            }
            function s(t) {
                typeof t == "string" ? n.content.innerHTML = t : n.content.replaceChildren(t);
                n.classList.add("active");
                var i = document.querySelector("#closeModal");
                i && (i.onclick = o);
                u && r.lock()
            }
            n.className = "";
            t && (n.className = t);
            switch (f) {
            case "all":
                n.onclick = o;
                break;
            case "overlay":
                n.onclick = function(t) {
                    n.content.contains(t.target) || o()
                }
                ;
                break;
            case "locked":
                n.onclick = null
            }
            i(s, o)
        }
        )
    }
    function o(n, t) {
        function u(n) {
            return n ? n.offsetTop + u(n.offsetParent) : 0
        }
        var r;
        if (n) {
            var f = u(n) - window.innerHeight / 2 + n.clientHeight / 2
              , i = Math.floor(f)
              , o = document.documentElement.scrollHeight
              , e = o - window.innerHeight;
            i < 0 && (i = 0);
            i > e && (i = e);
            r = function r() {
                var n = Math.floor(window.pageYOffset);
                (n === i || n + 1 === i || n - 1 === i) && (window.removeEventListener("scroll", r),
                t())
            }
            ;
            window.addEventListener("scroll", r);
            window.scrollTo({
                top: f,
                behavior: "smooth"
            });
            r()
        }
    }
    function u(n, t) {
        var r = arguments.length <= 2 || arguments[2] === undefined ? 5e3 : arguments[2];
        return i("notification " + t, function(t, i) {
            t(n);
            setTimeout(i, r)
        }, {
            close: "all"
        })
    }
    function f(n, t, i) {
        t === undefined && (t = 5e3);
        var r = document.createElement("div")
          , f = document.createElement("i")
          , e = document.createElement("br");
        return f.className = i ? "fas fa-times" : "fas fa-check-circle",
        r.innerText = n,
        r.appendChild(e),
        r.appendChild(f),
        u(r, t)
    }
    function s(n) {
        return new Promise(function(t, r) {
            i("choice", function(i, u) {
                var f = document.createElement("div")
                  , e = document.createElement("button")
                  , o = document.createElement("button")
                  , s = document.createElement("span");
                s.innerText = n;
                e.innerText = "بله";
                e.onclick = function() {
                    u().then(t)
                }
                ;
                e.className = "button";
                o.innerText = "خیر";
                o.onclick = function() {
                    u().then(r)
                }
                ;
                o.className = "button reverse";
                f.appendChild(s);
                f.appendChild(e);
                f.appendChild(o);
                i(f)
            }).then(r)
        }
        )
    }
    function h(n) {
        return i("spinner", function(t, i) {
            var r = document.createElement("div"), u = document.createElement("div"), f;
            u.classList.add("loader");
            r.appendChild(u);
            f = document.createTextNode("لطفا صبر کنید...");
            r.appendChild(f);
            t(r);
            n && n(i)
        }, {
            close: "locked"
        })
    }
    function c(n) {
        return i("spinner alt", function(t, i) {
            var r = document.createDocumentFragment()
              , f = document.createElement("img");
            f.src = "/Content/images/Logo/HoloG.png";
            var u = document.createElement("div")
              , o = document.createElement("span")
              , e = document.createElement("p");
            e.innerText = "در حال بارگذاری ...";
            u.appendChild(o);
            u.appendChild(e);
            r.appendChild(f);
            r.appendChild(u);
            t(r);
            n && n(i)
        }, {
            close: "locked"
        })
    }
    function l(n) {
        var r = arguments.length <= 1 || arguments[1] === undefined ? {
            zoom: !1
        } : arguments[1]
          , t = r.zoom
          , u = "image " + (t ? " zoom" : "")
          , f = t ? {
            close: "all"
        } : undefined;
        return i(u, function(t) {
            var i = document.createElement("img");
            i.src = n;
            t(i)
        }, f)
    }
    function a(t, r) {
        return new Promise(function(u) {
            i("guide", function(i, u) {
                var s = document.createDocumentFragment(), h = document.createTextNode(t), f = document.createElement("img"), e;
                f.src = "/Content/images/img/swirlyArrow.png";
                e = document.createElement("button");
                e.innerText = "باشه!";
                e.onclick = u;
                s.appendChild(h);
                s.appendChild(e);
                o(r, function() {
                    var t = r.getBoundingClientRect();
                    if (window.innerWidth > 830) {
                        var u = t.left + r.offsetWidth / 2
                          , e = window.innerWidth / 3
                          , o = Math.floor(u / e) + 1;
                        f.style.top = t.top + r.offsetHeight / 2 - 30 + "px";
                        switch (o) {
                        case 1:
                            f.style.left = t.right + "px";
                            f.classList.add("flip");
                            break;
                        case 2:
                            f.style.right = window.innerWidth - t.left + "px";
                            n.classList.add("left");
                            break;
                        case 3:
                            f.style.right = window.innerWidth - t.left + "px"
                        }
                        1100 >= window.innerWidth && o === 2 && (f.style.right = null,
                        f.style.left = t.right + "px",
                        f.classList.add("flip"),
                        n.classList.add("left"))
                    } else {
                        var u = t.top + r.offsetHeight / 2
                          , e = window.innerHeight / 3
                          , h = Math.floor(u / e) + 1;
                        f.style.right = window.innerWidth - r.getBoundingClientRect().right + r.offsetWidth / 2 - 60 + "px";
                        switch (h) {
                        case 1:
                            f.style.bottom = t.top - 20 + "px";
                            n.classList.add("bottom");
                            f.classList.add("toBottom");
                            break;
                        case 2:
                        case 3:
                            f.style.top = t.bottom + 20 + "px";
                            n.classList.add("top");
                            f.classList.add("toTop")
                        }
                    }
                    i(s);
                    n.appendChild(f)
                })
            }, {
                scrollLock: !0
            }).then(function() {
                n.querySelector("img").remove();
                u()
            })
        }
        )
    }
    function v(n, t) {
        return i("image photoVeiw", function(i, r) {
            function h(t) {
                f.style.left = "-" + (n.length - t - 1) * 100 + "vw";
                n.forEach(function(n) {
                    return n.classList.remove("showing")
                });
                n[t].classList.add("showing")
            }
            var e = document.createDocumentFragment(), f = document.createElement("div"), u = undefined, o, s;
            f.classList.add("cont");
            f.onclick = r;
            n.forEach(function(n, i) {
                var e = document.createElement("div")
                  , r = document.createElement("img");
                r.src = n.getAttribute("src");
                r.src === t.src && (r.classList.add("active"),
                u = i,
                h(u));
                e.appendChild(r);
                f.appendChild(e)
            });
            o = document.createElement("i");
            o.className = "fas fa-chevron-right";
            s = document.createElement("i");
            s.className = "fas fa-chevron-left";
            o.onclick = function() {
                u--;
                u < 0 && (u = 0);
                h(u)
            }
            ;
            s.onclick = function() {
                u++;
                u > n.length - 1 && (u = n.length - 1);
                h(u)
            }
            ;
            e.appendChild(o);
            e.appendChild(f);
            e.appendChild(s);
            i(e)
        }, {
            scrollLock: !0
        }).then(function() {
            n.forEach(function(n) {
                return n.classList.remove("showing")
            })
        })
    }
    function y(n) {
        var t = undefined;
        return i("lockedVideo", function(i) {
            var r = document.createElement("canvas");
            r.classList.add("video");
            r.id = n;
            i(r);
            t = new CanvasVideo(n)
        }, {
            scrollLock: !0
        }).then(function() {
            t.kill()
        })
    }
    var n = dc.query("#modal"), r;
    n.content = n.query(".content");
    r = e();
    t.notif = u;
    t.success = function(n, t) {
        return f(n, t, !1)
    }
    ;
    t.fail = function(n, t) {
        return f(n, t, !0)
    }
    ;
    t.confirm = s;
    t.custom = i;
    t.spinner = function(n) {
        var t = arguments.length <= 1 || arguments[1] === undefined ? !1 : arguments[1];
        t ? c(n) : h(n)
    }
    ;
    t.image = l;
    t.photoVeiwer = v;
    t.guide = a;
    t.lockedVideo = y;
    window.callModal = t
}
)();
"use strict";
(function() {
    //! ------my validation
    function n(n) {
        function f(t, i) {
            n.errorList[t] = {
                order: r[t],
                content: i
            }
        }
        function e(t) {
            delete n.errorList[t]
        }
        function t(n, t, i, r) {
            typeof n == "function" && (n = n());
            n ? f(i, t, r) : e(i)
        }
        function o(n) {
            return String(n).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        }
        function s(i, r) {
            var f, u, s, e, h;
            switch (i) {
            case "notEmpty":
                t(r === "", "لطفا کادر را خالی نگذارید!", i);
                break;
            case "length":
                n.dataset.length && t(r.length != n.dataset.length, "طول کاراکتر وارد شده باید " + n.dataset.length + " باشد", i);
                n.dataset.minlength && t(r.length < n.dataset.minlength, "طول کاراکتر وارد شده باید بیشتر از " + n.dataset.minlength + " باشد", i);
                n.dataset.maxlength && t(r.length > n.dataset.maxlength, "طول کاراکتر وارد شده باید کمتر از " + n.dataset.maxlength + " باشد", i);
                break;
            case "number":
                t(function() {
                    return isNaN(r)
                }, "فرمت کاراکتر وارد شده صحیح نمیباشد", i);
                break;
            case "email":
                t(function() {
                    return !o(r)
                }, "ایمیل وارد شده نادرست میباشد", i);
                break;
            case "NEQ":
                f = "مقدار نمی‌تواند برابر با " + n.dataset.neq + " باشد";
                n.dataset.neqerror && (f = n.dataset.neqerror);
                t(r === n.dataset.neq, f, i);
                break;
            case "EQU":
                u = undefined;
                n.dataset.equ.startsWith("ele=>") ? (s = n.dataset.equ.substring(5),
                e = dc.query(s),
                u = e.value || e.innerHTML) : u = n.dataset.equ;
                t(r !== u, "تکرار کلمه عبور مطابقت ندارد", i);
                break;
            case "noSpace":
                t(r.includes(" "), "لطفا از فاصله استفاده نکنید", i);
                break;
            case "usePersian":
                h = new RegExp("[؀-ۿ]");
                t(!h.test(r), "لطفا از کیبرد فارسی استفاده کنید", i)
            }
        }
        var r = {
            notEmpty: 0,
            number: 1,
            email: 1,
            NEQ: 1,
            length: 2,
            noSpace: 3,
            usePersian: 4
        }
          , u = JSON.parse(n.dataset.validate)
          , i = n.nextElementSibling;
        if (n.errorList = {},
        !n.classList.contains("noValidate")) {
            if (!i || !i.classList.contains("validationMsg")) {
                console.log(n);
                console.log("above logged input has no validation box. do not interfier with creation of span with 'validationMsg' class");
                return
            }
            u.forEach(function(t) {
                s(t, n.value)
            })
        }
    }
    function t(n, t) {
        var i = n.nextElementSibling;
        Object.keys(n.errorList).length === 0 ? (i.classList.remove("show"),
        n.classList.remove("validationError")) : function() {
            var r = Object.values(n.errorList).reduce(function(n, t) {
                return n.order < t.order ? n : t
            }).order
              , u = Object.values(n.errorList).filter(function(n) {
                return n.order === r
            });
            u.forEach(function(r, u) {
                u === 0 ? i.innerHTML = r.content : i.innerHTML += " و " + r.content;
                i.classList.add("show");
                n.classList.add("validationError");
                t && t()
            })
        }()
    }
    function i(n, t) {
        n.parentNode.insertBefore(t, n.nextSibling)
    }
    function r(i) {
        return new Promise(function(r, u) {
            i.querySelectorAll("[data-validate]").forEach(function(i) {
                n(i);
                t(i, u)
            });
            r()
        }
        )
    }
    function u() {
        dc.queries("[data-validate]").forEach(function(r) {
            var u = r.nextElementSibling;
            u && u.classList.contains("validationMsg") || (u = document.createElement("span"),
            u.classList.add("validationMsg"),
            i(r, u));
            r.onchange = function() {
                n(r);
                t(r)
            }
        })
    }
    function f(n) {
        n.querySelectorAll(".validationError").forEach(function(n) {
            n.classList.remove("validationError")
        });
        n.querySelectorAll(".validationMsg.show").forEach(function(n) {
            n.classList.remove("show")
        })
    }
    window.clearValidationAlerts = f;
    window.setValidations = u;
    window.validateSection = r
}
)();
"use strict";
function GetIP(n) {
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "http://ip-api.com/json",
        success: function(t) {
            var i = t.countryCode;
            i !== "IR" && $(n).html("<p class='alert alert-warning ' >دانلود فقط با IP ایران امکان پذیر است<\/p>")
        }
    })
}
function ScroolSet() {
    var n = $("#mainMenu");
    $(document).scrollTop() >= 110 ? (n.addClass("fixedNav"),
    $("#bigLogo").slideUp().hide(),
    $("#logo").removeAttr("style")) : (n.removeClass("fixedNav"),
    $("#bigLogo").slideDown(),
    $("#logo").attr("style", "visibility:hidden !important"))
}
function color(n) {
    var t = Number(n).toString(16);
    return "#" + ("000000".substr(0, 6 - t.length) + t.toUpperCase())
}
function isDark(n) {
    var t = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(n);
    return parseFloat(t[1]) + parseFloat(t[2]) + parseFloat(t[3]) < 384
}
function setBoxSize(n) {
    $(n).height() < 96 && ($(n).css("line-height", "96px"),
    $(n).css("height", "96px"));
    $(n).height() > 96 && $(n).height() < 288 && ($(n).css("line-height", "48px"),
    $(n).css("height", "96px"));
    $(n).height() >= 288 && $(n).css("line-height", "32px")
}
function doResize(n) {
    var r, t, i;
    for ($(".titleBoxArea").each(function(n, t) {
        setBoxSize(t)
    }),
    $(".caption").each(function(n, t) {
        $(t).css("height", "auto")
    }),
    r = $(".caption").length,
    t = 0; t < r; t += n)
        i = 0,
        $(".caption").slice(t, t + n).each(function(n, t) {
            $(t).height() > i && (i = $(t).height())
        }),
        $(".caption").slice(t, t + n).each(function(n, t) {
            $(t).height(i)
        })
}
function autoComplatetxt(n, t, i) {
    $(n).autocomplete({
        source: function(n, t) {
            $.ajax({
                url: i,
                dataType: "json",
                type: "Get",
                contentType: "application/json; charset=utf-8",
                data: {
                    keyref: JSON.stringify(n.term)
                },
                success: function(n) {
                    t($.map(n.d, function(n) {
                        return {
                            label: n.split("-")[0],
                            val: n.split("-")[1]
                        }
                    }))
                },
                error: function(n, t) {
                    alert(t)
                }
            })
        },
        position: {
            my: "right top",
            at: "right bottom"
        },
        open: function() {
            var t = $(n).width();
            $(n).autocomplete("widget").width(t)
        },
        minLength: 2,
        select: function(n, i) {
            var u = i.item
              , r = $("#" + t);
            r.val(i.item.val)
        }
    })
}
function scroolerTo(n) {
    $("html, body").animate({
        scrollTop: $(n).offset().top - 200
    }, 1e3)
}
function loadRating() {
    $(".basic").jRating({
        bigStarsPath: "/content/icons/stars.png",
        smallStarsPath: "/content/icons/small.png",
        rateMax: 5,
        step: !0,
        length: 5,
        onSuccess: function(n, t) {
            $("#Value").val(t);
            $(".jRatingAverage").attr("style", "width: 0px; top: -20px;");
            $(".btn-save-vote").trigger("click")
        }
    })
}
function loadRatingJustForShow() {
    $(".basic").jRating({
        bigStarsPath: "/content/icons/stars-white.png",
        smallStarsPath: "/content/icons/small.png",
        rateMax: 5,
        step: !0,
        length: 5,
        isDisabled: !0,
        type: "big"
    })
}
var isMobile, main;
$(function() {
    function t(n) {
        dc.query(n) && alert("found " + n)
    }
    function i(n) {
        for (var t, r = n + "=", u = document.cookie.split(";"), i = 0; i < u.length; i++) {
            for (t = u[i]; t.charAt(0) === " "; )
                t = t.substring(1);
            if (t.indexOf(r) === 0)
                return t.substring(r.length, t.length)
        }
        return ""
    }
    function u() {
        var t = i("CloseC"), r, n, f, u;
        for (t !== "" && $(t).collapse("hide"),
        r = t.split(","),
        n = 0; n < r.length; n++)
            f = r[n].replace("#", ""),
            u = $("[data-ico='" + f + "']"),
            $(u).removeClass("fa-minus-square-o"),
            $(u).addClass("fa-plus-square-o")
    }
    function f() {
        var n = i("viewDta");
        n !== "" && $(n).attr("style", "color:#660099 !important")
    }
    $(".btn-Login").click(function() {
        callModal.spinner(function(n) {
            $.get("/CNTDL/DownloadFileModal", null, function(t) {
                n().then(function() {
                    callModal.notif(t, "loginModal")
                })
            })
        })
    });
    $(".btn-save-like").click(function() {
        var i = $(this).data("login"), r = $(this).data("title"), n, t;
        i == "False" ? ($.get("/CNTDL/DownloadFileModal", null, function(n) {
            callModal.notif(n);
            $("#myModalTitle").html(r)
        }),
        $("#myModalTitle").html(result.message)) : (n = $(this).data("url"),
        $("#frmlike > #Value").val($(this).data("val")),
        t = $("#frmlike").serialize(),
        $.ajax({
            url: n,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: t,
            success: function(n) {
                n.status === "ok" ? (console.log(n),
                $("#likeCount").html(n.data.Like),
                $(".btn-save-like").find(".fa-thumbs-up").remove(),
                $(".btn-save-like").find(".fa-heart").remove(),
                n.data.userLike == 0 ? n.data.useHeart ? $(".btn-save-like").append("<i class='far fa-heart' ><\/i>") : $(".btn-save-like").append("<i class='far fa-thumbs-up' ><\/i>") : n.data.useHeart ? $(".btn-save-like").append("<i class='fa fa-heart' ><\/i>") : $(".btn-save-like").append("<i class='fa fa-thumbs-up' ><\/i>")) : $(function() {
                    callModal.notif(n.message)
                })
            },
            error: function(n, t) {
                callModal.notif(t)
            }
        }))
    });
    $(".modal-download").click(function() {
        var n = $(this).attr("data-action");
        $.get(n, null, function(n) {
            callModal.notif(n);
            $("#myModalTitle").html("برای دانلود فایل ابتدا وارد شوید!")
        })
    });
    $(".btn-save-vote").click(function() {
        var i = $(this).data("login"), r = $(this).data("title"), n, t;
        i == "False" ? $.get("/CNTDL/DownloadFileModal", null, function(n) {
            callModal.notif(n);
            $("#myModalTitle").html(r)
        }) : (n = $("#frmvoterank").serialize(),
        t = $(this).data("url"),
        $.ajax({
            url: t,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: n,
            success: function(n) {
                callModal.notif(n.message);
                $("#VoteAverage").text(n.data);
                var t = $(".basic").clone();
                $("#rating").find(".basic").remove();
                $("#rating").append("<div class='basic' data-average=" + n.data + " data-id='1'><\/div>");
                loadRating()
            },
            error: function(n, t) {
                callModal.notif(t)
            }
        }))
    });
    t(".start i");
    t(".playfilmcourse");
    u();
    f();
    $(document).on("click", "#btnResendVerify", function() {
        var n = {
            iDSecond: $("#IDSecond").val()
        };
        $.post("/User/VerifyMobileCode", n, function(t) {
            callModal.notif(t);
            $("input[tabindex=101]").focus();
            $.get("/User/GetTimerValue", n, function(n) {
                r("resend", n)
            })
        })
    });
    $(document).on("keydown", ".verifydigitbox", function(n) {
        n.keyCode === 8 && n.target.value === "" && $(this).prev().focus()
    });
    $(document).on("keyup", "[data-verifyid]", function(n) {
        var i = "", r, t;
        if ($("#ErrorMsg").text() != "" && ($("#secErrorMsg").addClass("collapse"),
        $("#ErrorMsg").text("")),
        $.isNumeric($(this).val())) {
            for (r = parseInt($(this).attr("tabindex")) + 1,
            $("input[tabindex=" + r + "]").trigger("focus"),
            $("input[tabindex=" + r + "]").trigger("select"),
            t = 101; t <= 105; t++)
                i = i + $("input[tabindex=" + t + "]").val();
            i.length == 5 && $("#btnConfirmVerify").trigger("click")
        } else
            $(this).val(""),
            n.stopPropagation(),
            n.preventDefault()
    });
    $(document).on("click", "#btnConfirmVerify", function() {
        for (var n = "", t = 101; t <= 105; t++)
            n = n + $("input[tabindex=" + t + "]").val();
        n.length < 5 ? ($("#secErrorMsg").removeClass("collapse"),
        $("#ErrorMsg").text("کد ارسالی را وارد کنید")) : (Data = {
            ID: $("#IDSecond").val(),
            VerifyCode: n
        },
        $.post("/user/ConfirmVerify", Data, function(n) {
            n.result.Error ? ($("#secErrorMsg").removeClass("collapse"),
            $("#ErrorMsg").text(n.ErrorMessage[0])) : (closeModal(),
            $("#modal .content .modalFooter #optional").removeClass("active"),
            $("#btnConfirmVerify").hasClass("btnConfirmVerifyPersonalInfo") && (window.location.href = '/Userpanel/Profile?IsVerified="True"'),
            window.location.href = n.urlName == "ForgetPassword" ? "/User/ChangePassword?idSeccond=" + n.IDSeccond : n.returnUrl)
        }))
    });
    $(document).on("click", "#btnActivateUser", function() {
        var n = {
            email: $("#Email").val()
        };
        $.post("/User/VerifyMobileCode", n, function(t) {
            console.log(t);
            callModal.notif(t);
            $("input[tabindex=101]").focus();
            $.get("/User/GetTimerValue", n, function(n) {
                r("send", n)
            })
        })
    });
    var r = function(n, t) {
        var i = t * 1e3
          , r = setInterval(function() {
            i -= 1e3;
            var u = Math.floor(i % (1e3 * t) / 1e3);
            $(".VerifyReminedTimer").html(" ارسال مجدد در " + u + " ثانیه دیگر ");
            i <= 0 ? (clearInterval(r),
            n == "resend" ? ($("#secResendVerify").addClass("collapse"),
            $("#secResendVerify").removeClass("collapse.in"),
            $("#secVerifyReminedTimer").addClass("collapse.in"),
            $("#secVerifyReminedTimer").removeClass("collapse")) : ($("#secResendVerify").addClass("collapse.in"),
            $("#secResendVerify").removeClass("collapse"),
            $("#secVerifyReminedTimer").addClass("collapse"))) : n == "resend" && ($("#secResendVerify").addClass("collapse"),
            $("#secResendVerify").removeClass("collapse.in"),
            $("#secVerifyReminedTimer").addClass("collapse.in"),
            $("#secVerifyReminedTimer").removeClass("collapse"))
        }, 1e3)
    }
      , n = dc.query(".mainPageSection.Qcomment");
    n && setTimeout(function() {
        function s() {
            var n = undefined;
            dc.queries(".mainPageSection.Qcomment section div .icon").forEach(function(t) {
                if (t.dataset.user == "کاربر میهمان") {
                    n = t.dataset.user;
                    return
                }
                t.dataset.user === n && t.parentElement.classList.add("combine");
                n = t.dataset.user
            })
        }
        function h() {
            dc.queries(".mainPageSection.Qcomment section i").forEach(function(n) {
                n.addEventListener("click", function(n) {
                    var i = n.target.parentElement.parentElement.cloneNode(!0);
                    t.query(".target").appendChild(i);
                    t.classList.add("active")
                })
            })
        }
        function y() {
            i.querySelector("input#Title").value = "";
            i.querySelector("textarea").value = ""
        }
        function c() {
            t.classList.remove("active");
            t.addEventListener("transitionend", function() {
                t.query(".target").innerHTML = "";
                t.query("p.success").classList.remove("show");
                t.query(".reply textarea").value = "";
                t.queries(".validationMsg").forEach(function(n) {
                    n.classList.remove("show")
                })
            }, {
                once: !0
            })
        }
        function l(t) {
            if (t.length < 6) {
                if (t.length == 0) {
                    n.classList.add("empty");
                    return
                }
                n.classList.remove("empty");
                n.classList.add("minimal")
            } else
                n.classList.remove("empty"),
                n.classList.remove("minimal")
        }
        var i = dc.query(".mainPageSection.Qcomment form")
          , u = dc.query(".mainPageSection.Qcomment form p")
          , f = u.query("span")
          , e = dc.query(".mainPageSection.Qcomment section")
          , r = e.queries(".question, .answer")
          , t = dc.query(".mainPageSection.Qcomment .replyModal")
          , o = t.query("form p span")
          , a = t.query(".overlay")
          , v = dc.query(".mainPageSection.Qcomment .contain > div section");
        setValidations(i);
        h();
        dc.queries(".mainPageSection.Qcomment .formTab span").forEach(function(n) {
            n.addEventListener("click", function() {
                var t;
                if (!n.classList.contains("active")) {
                    dc.query(".mainPageSection.Qcomment .forms").classList.toggle("q");
                    dc.queries(".mainPageSection.Qcomment .formTab span").forEach(function(n) {
                        n.classList.toggle("active")
                    });
                    t = n.getAttribute("data-iscomment");
                    $("#IsComment").val(t);
                    var i = $("#SectionID").val()
                      , u = $("#ResourceID").val()
                      , f = JSON.stringify({
                        isComment: t,
                        sectionId: i,
                        resourceId: u
                    });
                    $.ajax({
                        dataType: "html",
                        contentType: "application/json",
                        type: "Post",
                        url: "../../QComment/ViewComment",
                        data: f,
                        success: function(n) {
                            v.innerHTML = n;
                            h();
                            s();
                            lazyLoadPics();
                            r = e.queries(".question, .answer");
                            l(r)
                        }
                    })
                }
            })
        });
        s();
        i.addEventListener("submit", function(n) {
            var t = this;
            n.preventDefault();
            validateSection(i).then(function() {
                data = new FormData($(t)[0]);
                $.ajax({
                    processData: !1,
                    contentType: !1,
                    type: "Post",
                    url: "../../QComment/SendComment",
                    data: data,
                    success: function(n) {
                        n.HasError ? f.innerHTML = n.Errors[0] : (f.innerHTML = "پیام  شما با موفقیت ثبت شد و پس از تایید ادمین، نمایش/پاسخ داده خواهد شد.",
                        y())
                    }
                });
                u.classList.add("show")
            })["catch"](function() {
                callModal.fail("لطفا فرم را کامل کنید")
            })
        });
        a.addEventListener("click", c);
        t.query("i.fa-times").addEventListener("click", c);
        t.query("form").addEventListener("submit", function(n) {
            var i = this;
            n.preventDefault();
            validateSection(t).then(function() {
                var n = t.query(".target > *").getAttribute("data-id");
                t.query("#PCommentID").value = n;
                t.query("#IsComment").value = $("#IsComment").val();
                data = new FormData($(i)[0]);
                $.ajax({
                    processData: !1,
                    contentType: !1,
                    type: "Post",
                    url: "../../QComment/SendAnswer",
                    data: data,
                    success: function(n) {
                        n.HasError ? o.innerHTML = n.Errors[0] : (o.innerHTML = "پاسخ  شما با موفقیت ثبت شد",
                        location.reload())
                    }
                });
                t.query("p.success").classList.add("show");
                t.query("textarea").value = ""
            })
        });
        l(r)
    }, 400)
});
isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i)
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i)
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i)
    },
    any: function() {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()
    }
};
main = function() {
    var t = $("#mainMenu"), n;
    $(document).scroll(function() {
        ScroolSet();
        $("#logo").hide()
    });
    $(window).resize(function() {
        var n = $(window).width();
        n > 600 && t.show()
    });
    n = $("#btnMenu");
    n.click(function() {
        $(".firstLevelRoot").toggle()
    })
}
;
$(function() {
    $("#searchbtn").click(function() {
        var t = $("#MenuEdu_txtSearch").val()
          , n = $("#MenuEdu_txtSearch").attr("tabindex");
        n = n !== "" ? "/" + n : "/Search/";
        t !== "" && (window.location = "/Forum" + n + t)
    })
});
"use strict";
var intraction = document.querySelector(".bar"), articleTime;
intraction && ($(window).width() < 1200 && $("#getUp").css("bottom", "50px"),
function() {
    var n = function() {
        var n = document.body.scrollTop || document.documentElement.scrollTop
          , t = document.documentElement.scrollHeight - document.documentElement.clientHeight
          , i = n / t * 100;
        intraction.style.display = "block";
        intraction.style.width = i + "%"
    }
      , t = document.querySelector(".intraction ul li:nth-child(3)")
      , i = document.querySelector(".showShare");
    window.onscroll = function() {
        n()
    }
    ;
    t.addEventListener("click", function() {
        i.classList.toggle("active")
    });
    $(".fa-copy").click(function() {
        var n = window.location.href;
        clipboard(n);
        dc.queries(".copied").forEach(function(n) {
            n.classList.remove("copied")
        });
        $(".fa-share-alt").addClass("copied");
        setTimeout(function() {
            $(".fa-share-alt").removeClass("copied")
        }, 3e3)
    })
}());
articleTime = document.querySelectorAll(".articleTimeRead");
articleTime && function() {
    var n = function() {
        for (var i, r, n = 0; n < articleTime.length; n++)
            i = articleTime[n].innerText.trim().split(/\s+/).length,
            r = Math.ceil(i / 225),
            t[n].innerText = "زمان مطالعه " + r + " دقیقه"
    }
      , t = document.querySelectorAll(".timeRead");
    n()
}();
$(function() {
    function u(n) {
        setTimeout(function() {
            $("html,body").animate({
                scrollTop: n.offset().top
            }, "slow")
        }, 2e3)
    }
    var n = location.href, t, i, r;
    if (n.includes("#")) {
        if (t = n.slice(n.indexOf("#") + 1),
        !t)
            return;
        i = $("#" + t);
        i && ($("[data-src]:not(source)").each(function() {
            $(this).attr("src", $(this).data("src"))
        }),
        u(i))
    }
    r = dc.queries(".tech-news.owl-carousel");
    setTimeout(function() {
        r && $(r).owlCarousel({
            autoWidth: !1,
            rtl: !0,
            nav: !0,
            items: 4,
            margin: 10,
            navText: "",
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                900: {
                    items: 3
                },
                992: {
                    items: 2
                },
                1200: {
                    items: 3
                },
                1550: {
                    items: 4
                }
            }
        })
    }, 1e3)
});
"use strict";
$(function() {
    var n = document.querySelector(".modal"), t, i;
    n && function() {
        var t = n.querySelector(".modal-content")
          , i = n.querySelector(".understood-btn")
          , r = n.querySelector(".error-modal");
        i.addEventListener("click", function() {
            n.classList.add("hide")
        });
        window.addEventListener("click", function(i) {
            t.contains(i.target) || n.classList.add("hide")
        })
    }();
    t = document.querySelector(".container-login-register form");
    t && (setValidations(t),
    t.onsubmit = function(n) {
        n.preventDefault();
        validateSection(t).then(function() {
            t.submit()
        })["catch"](function() {
            callModal.fail("لطفا اطلاعات خود را تکمیل کنید")
        })
    }
    );
    i = document.querySelector("[href='#CaptchaImage']");
    i && i.addEventListener("click", function(n) {
        n.preventDefault()
    })
});
/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!function(a, b, c, d) {
    function e(b, c) {
        this.settings = null,
        this.options = a.extend({}, e.Defaults, c),
        this.$element = a(b),
        this._handlers = {},
        this._plugins = {},
        this._supress = {},
        this._current = null,
        this._speed = null,
        this._coordinates = [],
        this._breakpoint = null,
        this._width = null,
        this._items = [],
        this._clones = [],
        this._mergers = [],
        this._widths = [],
        this._invalidated = {},
        this._pipe = [],
        this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        },
        this._states = {
            current: {},
            tags: {
                initializing: ["busy"],
                animating: ["busy"],
                dragging: ["interacting"]
            }
        },
        a.each(["onResize", "onThrottledResize"], a.proxy(function(b, c) {
            this._handlers[c] = a.proxy(this[c], this)
        }, this)),
        a.each(e.Plugins, a.proxy(function(a, b) {
            this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
        }, this)),
        a.each(e.Workers, a.proxy(function(b, c) {
            this._pipe.push({
                filter: c.filter,
                run: a.proxy(c.run, this)
            })
        }, this)),
        this.setup(),
        this.initialize()
    }
    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        checkVisibility: !0,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        fallbackEasing: "swing",
        slideTransition: "",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    },
    e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    },
    e.Type = {
        Event: "event",
        State: "state"
    },
    e.Plugins = {},
    e.Workers = [{
        filter: ["width", "settings"],
        run: function() {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this.settings.margin || ""
              , c = !this.settings.autoWidth
              , d = this.settings.rtl
              , e = {
                width: "auto",
                "margin-left": d ? b : "",
                "margin-right": d ? "" : b
            };
            !c && this.$stage.children().css(e),
            a.css = e
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin
              , c = null
              , d = this._items.length
              , e = !this.settings.autoWidth
              , f = [];
            for (a.items = {
                merge: !1,
                width: b
            }; d--; )
                c = this._mergers[d],
                c = this.settings.mergeFit && Math.min(c, this.settings.items) || c,
                a.items.merge = c > 1 || a.items.merge,
                f[d] = e ? b * c : this._items[d].width();
            this._widths = f
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var b = []
              , c = this._items
              , d = this.settings
              , e = Math.max(2 * d.items, 4)
              , f = 2 * Math.ceil(c.length / 2)
              , g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0
              , h = ""
              , i = "";
            for (g /= 2; g > 0; )
                b.push(this.normalize(b.length / 2, !0)),
                h += c[b[b.length - 1]][0].outerHTML,
                b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)),
                i = c[b[b.length - 1]][0].outerHTML + i,
                g -= 1;
            this._clones = b,
            a(h).addClass("cloned").appendTo(this.$stage),
            a(i).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b; )
                d = f[c - 1] || 0,
                e = this._widths[this.relative(c)] + this.settings.margin,
                f.push(d + e * a);
            this._coordinates = f
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var a = this.settings.stagePadding
              , b = this._coordinates
              , c = {
                width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                "padding-left": a || "",
                "padding-right": a || ""
            };
            this.$stage.css(c)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this._coordinates.length
              , c = !this.settings.autoWidth
              , d = this.$stage.children();
            if (c && a.items.merge)
                for (; b--; )
                    a.css.width = this._widths[this.relative(b)],
                    d.eq(b).css(a.css);
            else
                c && (a.css.width = a.items.width,
                d.css(a.css))
        }
    }, {
        filter: ["items"],
        run: function() {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = a.current ? this.$stage.children().index(a.current) : 0,
            a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)),
            this.reset(a.current)
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1, f = 2 * this.settings.stagePadding, g = this.coordinates(this.current()) + f, h = g + this.width() * e, i = [];
            for (c = 0,
            d = this._coordinates.length; c < d; c++)
                a = this._coordinates[c - 1] || 0,
                b = Math.abs(this._coordinates[c]) + f * e,
                (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children(".active").removeClass("active"),
            this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"),
            this.$stage.children(".center").removeClass("center"),
            this.settings.center && this.$stage.children().eq(this.current()).addClass("center")
        }
    }],
    e.prototype.initializeStage = function() {
        this.$stage = this.$element.find("." + this.settings.stageClass),
        this.$stage.length || (this.$element.addClass(this.options.loadingClass),
        this.$stage = a("<" + this.settings.stageElement + ">", {
            class: this.settings.stageClass
        }).wrap(a("<div/>", {
            class: this.settings.stageOuterClass
        })),
        this.$element.append(this.$stage.parent()))
    }
    ,
    e.prototype.initializeItems = function() {
        var b = this.$element.find(".owl-item");
        if (b.length)
            return this._items = b.get().map(function(b) {
                return a(b)
            }),
            this._mergers = this._items.map(function() {
                return 1
            }),
            void this.refresh();
        this.replace(this.$element.children().not(this.$stage.parent())),
        this.isVisible() ? this.refresh() : this.invalidate("width"),
        this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)
    }
    ,
    e.prototype.initialize = function() {
        if (this.enter("initializing"),
        this.trigger("initialize"),
        this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
        this.settings.autoWidth && !this.is("pre-loading")) {
            var a, b, c;
            a = this.$element.find("img"),
            b = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d,
            c = this.$element.children(b).width(),
            a.length && c <= 0 && this.preloadAutoWidthImages(a)
        }
        this.initializeStage(),
        this.initializeItems(),
        this.registerEventHandlers(),
        this.leave("initializing"),
        this.trigger("initialized")
    }
    ,
    e.prototype.isVisible = function() {
        return !this.settings.checkVisibility || this.$element.is(":visible")
    }
    ,
    e.prototype.setup = function() {
        var b = this.viewport()
          , c = this.options.responsive
          , d = -1
          , e = null;
        c ? (a.each(c, function(a) {
            a <= b && a > d && (d = Number(a))
        }),
        e = a.extend({}, this.options, c[d]),
        "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()),
        delete e.responsive,
        e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s","g"), "$1" + d))) : e = a.extend({}, this.options),
        this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }),
        this._breakpoint = d,
        this.settings = e,
        this.invalidate("settings"),
        this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        })
    }
    ,
    e.prototype.optionsLogic = function() {
        this.settings.autoWidth && (this.settings.stagePadding = !1,
        this.settings.merge = !1)
    }
    ,
    e.prototype.prepare = function(b) {
        var c = this.trigger("prepare", {
            content: b
        });
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)),
        this.trigger("prepared", {
            content: c.data
        }),
        c.data
    }
    ,
    e.prototype.update = function() {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
            return this[a]
        }, this._invalidated), e = {}; b < c; )
            (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e),
            b++;
        this._invalidated = {},
        !this.is("valid") && this.enter("valid")
    }
    ,
    e.prototype.width = function(a) {
        switch (a = a || e.Width.Default) {
        case e.Width.Inner:
        case e.Width.Outer:
            return this._width;
        default:
            return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }
    ,
    e.prototype.refresh = function() {
        this.enter("refreshing"),
        this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$element.addClass(this.options.refreshClass),
        this.update(),
        this.$element.removeClass(this.options.refreshClass),
        this.leave("refreshing"),
        this.trigger("refreshed")
    }
    ,
    e.prototype.onThrottledResize = function() {
        b.clearTimeout(this.resizeTimer),
        this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }
    ,
    e.prototype.onResize = function() {
        return !!this._items.length && (this._width !== this.$element.width() && (!!this.isVisible() && (this.enter("resizing"),
        this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"),
        !1) : (this.invalidate("width"),
        this.refresh(),
        this.leave("resizing"),
        void this.trigger("resized")))))
    }
    ,
    e.prototype.registerEventHandlers = function() {
        a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)),
        !1 !== this.settings.responsive && this.on(b, "resize", this._handlers.onThrottledResize),
        this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass),
        this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)),
        this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
            return !1
        })),
        this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)),
        this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
    }
    ,
    e.prototype.onDragStart = function(b) {
        var d = null;
        3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","),
        d = {
            x: d[16 === d.length ? 12 : 4],
            y: d[16 === d.length ? 13 : 5]
        }) : (d = this.$stage.position(),
        d = {
            x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
            y: d.top
        }),
        this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(),
        this.invalidate("position")),
        this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type),
        this.speed(0),
        this._drag.time = (new Date).getTime(),
        this._drag.target = a(b.target),
        this._drag.stage.start = d,
        this._drag.stage.current = d,
        this._drag.pointer = this.pointer(b),
        a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)),
        a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function(b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)),
            Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(),
            this.enter("dragging"),
            this.trigger("drag"))
        }, this)))
    }
    ,
    e.prototype.onDragMove = function(a) {
        var b = null
          , c = null
          , d = null
          , e = this.difference(this._drag.pointer, this.pointer(a))
          , f = this.difference(this._drag.stage.start, e);
        this.is("dragging") && (a.preventDefault(),
        this.settings.loop ? (b = this.coordinates(this.minimum()),
        c = this.coordinates(this.maximum() + 1) - b,
        f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()),
        c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()),
        d = this.settings.pullDrag ? -1 * e.x / 5 : 0,
        f.x = Math.max(Math.min(f.x, b + d), c + d)),
        this._drag.stage.current = f,
        this.animate(f.x))
    }
    ,
    e.prototype.onDragEnd = function(b) {
        var d = this.difference(this._drag.pointer, this.pointer(b))
          , e = this._drag.stage.current
          , f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
        a(c).off(".owl.core"),
        this.$element.removeClass(this.options.grabClass),
        (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
        this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)),
        this.invalidate("position"),
        this.update(),
        this._drag.direction = f,
        (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
            return !1
        })),
        this.is("dragging") && (this.leave("dragging"),
        this.trigger("dragged"))
    }
    ,
    e.prototype.closest = function(b, c) {
        var e = -1
          , f = 30
          , g = this.width()
          , h = this.coordinates();
        return this.settings.freeDrag || a.each(h, a.proxy(function(a, i) {
            return "left" === c && b > i - f && b < i + f ? e = a : "right" === c && b > i - g - f && b < i - g + f ? e = a + 1 : this.op(b, "<", i) && this.op(b, ">", h[a + 1] !== d ? h[a + 1] : i - g) && (e = "left" === c ? a + 1 : a),
            -1 === e
        }, this)),
        this.settings.loop || (this.op(b, ">", h[this.minimum()]) ? e = b = this.minimum() : this.op(b, "<", h[this.maximum()]) && (e = b = this.maximum())),
        e
    }
    ,
    e.prototype.animate = function(b) {
        var c = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(),
        c && (this.enter("animating"),
        this.trigger("translate")),
        a.support.transform3d && a.support.transition ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
        }) : c ? this.$stage.animate({
            left: b + "px"
        }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
            left: b + "px"
        })
    }
    ,
    e.prototype.is = function(a) {
        return this._states.current[a] && this._states.current[a] > 0
    }
    ,
    e.prototype.current = function(a) {
        if (a === d)
            return this._current;
        if (0 === this._items.length)
            return d;
        if (a = this.normalize(a),
        this._current !== a) {
            var b = this.trigger("change", {
                property: {
                    name: "position",
                    value: a
                }
            });
            b.data !== d && (a = this.normalize(b.data)),
            this._current = a,
            this.invalidate("position"),
            this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }
    ,
    e.prototype.invalidate = function(b) {
        return "string" === a.type(b) && (this._invalidated[b] = !0,
        this.is("valid") && this.leave("valid")),
        a.map(this._invalidated, function(a, b) {
            return b
        })
    }
    ,
    e.prototype.reset = function(a) {
        (a = this.normalize(a)) !== d && (this._speed = 0,
        this._current = a,
        this.suppress(["translate", "translated"]),
        this.animate(this.coordinates(a)),
        this.release(["translate", "translated"]))
    }
    ,
    e.prototype.normalize = function(a, b) {
        var c = this._items.length
          , e = b ? 0 : this._clones.length;
        return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2),
        a
    }
    ,
    e.prototype.relative = function(a) {
        return a -= this._clones.length / 2,
        this.normalize(a, !0)
    }
    ,
    e.prototype.maximum = function(a) {
        var b, c, d, e = this.settings, f = this._coordinates.length;
        if (e.loop)
            f = this._clones.length / 2 + this._items.length - 1;
        else if (e.autoWidth || e.merge) {
            if (b = this._items.length)
                for (c = this._items[--b].width(),
                d = this.$element.width(); b-- && !((c += this._items[b].width() + this.settings.margin) > d); )
                    ;
            f = b + 1
        } else
            f = e.center ? this._items.length - 1 : this._items.length - e.items;
        return a && (f -= this._clones.length / 2),
        Math.max(f, 0)
    }
    ,
    e.prototype.minimum = function(a) {
        return a ? 0 : this._clones.length / 2
    }
    ,
    e.prototype.items = function(a) {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0),
        this._items[a])
    }
    ,
    e.prototype.mergers = function(a) {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0),
        this._mergers[a])
    }
    ,
    e.prototype.clones = function(b) {
        var c = this._clones.length / 2
          , e = c + this._items.length
          , f = function(a) {
            return a % 2 == 0 ? e + a / 2 : c - (a + 1) / 2
        };
        return b === d ? a.map(this._clones, function(a, b) {
            return f(b)
        }) : a.map(this._clones, function(a, c) {
            return a === b ? f(c) : null
        })
    }
    ,
    e.prototype.speed = function(a) {
        return a !== d && (this._speed = a),
        this._speed
    }
    ,
    e.prototype.coordinates = function(b) {
        var c, e = 1, f = b - 1;
        return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
            return this.coordinates(b)
        }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1,
        f = b + 1),
        c = this._coordinates[b],
        c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0,
        c = Math.ceil(c))
    }
    ,
    e.prototype.duration = function(a, b, c) {
        return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }
    ,
    e.prototype.to = function(a, b) {
        var c = this.current()
          , d = null
          , e = a - this.relative(c)
          , f = (e > 0) - (e < 0)
          , g = this._items.length
          , h = this.minimum()
          , i = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g),
        a = c + e,
        (d = ((a - h) % g + g) % g + h) !== a && d - e <= i && d - e > 0 && (c = d - e,
        a = d,
        this.reset(c))) : this.settings.rewind ? (i += 1,
        a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)),
        this.speed(this.duration(c, a, b)),
        this.current(a),
        this.isVisible() && this.update()
    }
    ,
    e.prototype.next = function(a) {
        a = a || !1,
        this.to(this.relative(this.current()) + 1, a)
    }
    ,
    e.prototype.prev = function(a) {
        a = a || !1,
        this.to(this.relative(this.current()) - 1, a)
    }
    ,
    e.prototype.onTransitionEnd = function(a) {
        if (a !== d && (a.stopPropagation(),
        (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)))
            return !1;
        this.leave("animating"),
        this.trigger("translated")
    }
    ,
    e.prototype.viewport = function() {
        var d;
        return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."),
        d
    }
    ,
    e.prototype.replace = function(b) {
        this.$stage.empty(),
        this._items = [],
        b && (b = b instanceof jQuery ? b : a(b)),
        this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)),
        b.filter(function() {
            return 1 === this.nodeType
        }).each(a.proxy(function(a, b) {
            b = this.prepare(b),
            this.$stage.append(b),
            this._items.push(b),
            this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
        }, this)),
        this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
        this.invalidate("items")
    }
    ,
    e.prototype.add = function(b, c) {
        var e = this.relative(this._current);
        c = c === d ? this._items.length : this.normalize(c, !0),
        b = b instanceof jQuery ? b : a(b),
        this.trigger("add", {
            content: b,
            position: c
        }),
        b = this.prepare(b),
        0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b),
        0 !== this._items.length && this._items[c - 1].after(b),
        this._items.push(b),
        this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b),
        this._items.splice(c, 0, b),
        this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)),
        this._items[e] && this.reset(this._items[e].index()),
        this.invalidate("items"),
        this.trigger("added", {
            content: b,
            position: c
        })
    }
    ,
    e.prototype.remove = function(a) {
        (a = this.normalize(a, !0)) !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }),
        this._items[a].remove(),
        this._items.splice(a, 1),
        this._mergers.splice(a, 1),
        this.invalidate("items"),
        this.trigger("removed", {
            content: null,
            position: a
        }))
    }
    ,
    e.prototype.preloadAutoWidthImages = function(b) {
        b.each(a.proxy(function(b, c) {
            this.enter("pre-loading"),
            c = a(c),
            a(new Image).one("load", a.proxy(function(a) {
                c.attr("src", a.target.src),
                c.css("opacity", 1),
                this.leave("pre-loading"),
                !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
        }, this))
    }
    ,
    e.prototype.destroy = function() {
        this.$element.off(".owl.core"),
        this.$stage.off(".owl.core"),
        a(c).off(".owl.core"),
        !1 !== this.settings.responsive && (b.clearTimeout(this.resizeTimer),
        this.off(b, "resize", this._handlers.onThrottledResize));
        for (var d in this._plugins)
            this._plugins[d].destroy();
        this.$stage.children(".cloned").remove(),
        this.$stage.unwrap(),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$stage.remove(),
        this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s","g"), "")).removeData("owl.carousel")
    }
    ,
    e.prototype.op = function(a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
        case "<":
            return d ? a > c : a < c;
        case ">":
            return d ? a < c : a > c;
        case ">=":
            return d ? a <= c : a >= c;
        case "<=":
            return d ? a >= c : a <= c
        }
    }
    ,
    e.prototype.on = function(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }
    ,
    e.prototype.off = function(a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }
    ,
    e.prototype.trigger = function(b, c, d, f, g) {
        var h = {
            item: {
                count: this._items.length,
                index: this.current()
            }
        }
          , i = a.camelCase(a.grep(["on", b, d], function(a) {
            return a
        }).join("-").toLowerCase())
          , j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
            relatedTarget: this
        }, h, c));
        return this._supress[b] || (a.each(this._plugins, function(a, b) {
            b.onTrigger && b.onTrigger(j)
        }),
        this.register({
            type: e.Type.Event,
            name: b
        }),
        this.$element.trigger(j),
        this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)),
        j
    }
    ,
    e.prototype.enter = function(b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b] === d && (this._states.current[b] = 0),
            this._states.current[b]++
        }, this))
    }
    ,
    e.prototype.leave = function(b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b]--
        }, this))
    }
    ,
    e.prototype.register = function(b) {
        if (b.type === e.Type.Event) {
            if (a.event.special[b.name] || (a.event.special[b.name] = {}),
            !a.event.special[b.name].owl) {
                var c = a.event.special[b.name]._default;
                a.event.special[b.name]._default = function(a) {
                    return !c || !c.apply || a.namespace && -1 !== a.namespace.indexOf("owl") ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
                }
                ,
                a.event.special[b.name].owl = !0
            }
        } else
            b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags,
            this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function(c, d) {
                return a.inArray(c, this._states.tags[b.name]) === d
            }, this)))
    }
    ,
    e.prototype.suppress = function(b) {
        a.each(b, a.proxy(function(a, b) {
            this._supress[b] = !0
        }, this))
    }
    ,
    e.prototype.release = function(b) {
        a.each(b, a.proxy(function(a, b) {
            delete this._supress[b]
        }, this))
    }
    ,
    e.prototype.pointer = function(a) {
        var c = {
            x: null,
            y: null
        };
        return a = a.originalEvent || a || b.event,
        a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a,
        a.pageX ? (c.x = a.pageX,
        c.y = a.pageY) : (c.x = a.clientX,
        c.y = a.clientY),
        c
    }
    ,
    e.prototype.isNumeric = function(a) {
        return !isNaN(parseFloat(a))
    }
    ,
    e.prototype.difference = function(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        }
    }
    ,
    a.fn.owlCarousel = function(b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var d = a(this)
              , f = d.data("owl.carousel");
            f || (f = new e(this,"object" == typeof b && b),
            d.data("owl.carousel", f),
            a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(b, c) {
                f.register({
                    type: e.Type.Event,
                    name: c
                }),
                f.$element.on(c + ".owl.carousel.core", a.proxy(function(a) {
                    a.namespace && a.relatedTarget !== this && (this.suppress([c]),
                    f[c].apply(this, [].slice.call(arguments, 1)),
                    this.release([c]))
                }, f))
            })),
            "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
        })
    }
    ,
    a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b,
        this._interval = null,
        this._visible = null,
        this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        },
        this._core.options = a.extend({}, e.Defaults, this._core.options),
        this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoRefresh: !0,
        autoRefreshInterval: 500
    },
    e.prototype.watch = function() {
        this._interval || (this._visible = this._core.isVisible(),
        this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }
    ,
    e.prototype.refresh = function() {
        this._core.isVisible() !== this._visible && (this._visible = !this._visible,
        this._core.$element.toggleClass("owl-hidden", !this._visible),
        this._visible && this._core.invalidate("width") && this._core.refresh())
    }
    ,
    e.prototype.destroy = function() {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers)
            this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this))
            "function" != typeof this[c] && (this[c] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b,
        this._loaded = [],
        this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function(b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) {
                    var c = this._core.settings
                      , e = c.center && Math.ceil(c.items / 2) || c.items
                      , f = c.center && -1 * e || 0
                      , g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f
                      , h = this._core.clones().length
                      , i = a.proxy(function(a, b) {
                        this.load(b)
                    }, this);
                    for (c.lazyLoadEager > 0 && (e += c.lazyLoadEager,
                    c.loop && (g -= c.lazyLoadEager,
                    e++)); f++ < e; )
                        this.load(h / 2 + this._core.relative(g)),
                        h && a.each(this._core.clones(this._core.relative(g)), i),
                        g++
                }
            }, this)
        },
        this._core.options = a.extend({}, e.Defaults, this._core.options),
        this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        lazyLoad: !1,
        lazyLoadEager: 0
    },
    e.prototype.load = function(c) {
        var d = this._core.$stage.children().eq(c)
          , e = d && d.find(".owl-lazy");
        !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
            var e, f = a(d), g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src") || f.attr("data-srcset");
            this._core.trigger("load", {
                element: f,
                url: g
            }, "lazy"),
            f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
                f.css("opacity", 1),
                this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this)).attr("src", g) : f.is("source") ? f.one("load.owl.lazy", a.proxy(function() {
                this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this)).attr("srcset", g) : (e = new Image,
            e.onload = a.proxy(function() {
                f.css({
                    "background-image": 'url("' + g + '")',
                    opacity: "1"
                }),
                this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this),
            e.src = g)
        }, this)),
        this._loaded.push(d.get(0)))
    }
    ,
    e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers)
            this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
            "function" != typeof this[b] && (this[b] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(c) {
        this._core = c,
        this._previousHeight = null,
        this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && "position" === a.property.name && this.update()
            }, this),
            "loaded.owl.lazy": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        },
        this._core.options = a.extend({}, e.Defaults, this._core.options),
        this._core.$element.on(this._handlers),
        this._intervalId = null;
        var d = this;
        a(b).on("load", function() {
            d._core.settings.autoHeight && d.update()
        }),
        a(b).resize(function() {
            d._core.settings.autoHeight && (null != d._intervalId && clearTimeout(d._intervalId),
            d._intervalId = setTimeout(function() {
                d.update()
            }, 250))
        })
    };
    e.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    },
    e.prototype.update = function() {
        var b = this._core._current
          , c = b + this._core.settings.items
          , d = this._core.settings.lazyLoad
          , e = this._core.$stage.children().toArray().slice(b, c)
          , f = []
          , g = 0;
        a.each(e, function(b, c) {
            f.push(a(c).height())
        }),
        g = Math.max.apply(null, f),
        g <= 1 && d && this._previousHeight && (g = this._previousHeight),
        this._previousHeight = g,
        this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)
    }
    ,
    e.prototype.destroy = function() {
        var a, b;
        for (a in this._handlers)
            this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
            "function" != typeof this[b] && (this[b] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b,
        this._videos = {},
        this._playing = null,
        this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.register({
                    type: "state",
                    name: "playing",
                    tags: ["interacting"]
                })
            }, this),
            "resize.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
            }, this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" === a.property.name && this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find(".owl-video");
                    c.length && (c.css("display", "none"),
                    this.fetch(c, a(b.content)))
                }
            }, this)
        },
        this._core.options = a.extend({}, e.Defaults, this._core.options),
        this._core.$element.on(this._handlers),
        this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
            this.play(a)
        }, this))
    };
    e.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    },
    e.prototype.fetch = function(a, b) {
        var c = function() {
            return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube"
        }()
          , d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id")
          , e = a.attr("data-width") || this._core.settings.videoWidth
          , f = a.attr("data-height") || this._core.settings.videoHeight
          , g = a.attr("href");
        if (!g)
            throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),
        d[3].indexOf("youtu") > -1)
            c = "youtube";
        else if (d[3].indexOf("vimeo") > -1)
            c = "vimeo";
        else {
            if (!(d[3].indexOf("vzaar") > -1))
                throw new Error("Video URL not supported.");
            c = "vzaar"
        }
        d = d[6],
        this._videos[g] = {
            type: c,
            id: d,
            width: e,
            height: f
        },
        b.attr("data-video", g),
        this.thumbnail(a, this._videos[g])
    }
    ,
    e.prototype.thumbnail = function(b, c) {
        var d, e, f, g = c.width && c.height ? "width:" + c.width + "px;height:" + c.height + "px;" : "", h = b.find("img"), i = "src", j = "", k = this._core.settings, l = function(c) {
            e = '<div class="owl-video-play-icon"></div>',
            d = k.lazyLoad ? a("<div/>", {
                class: "owl-video-tn " + j,
                srcType: c
            }) : a("<div/>", {
                class: "owl-video-tn",
                style: "opacity:1;background-image:url(" + c + ")"
            }),
            b.after(d),
            b.after(e)
        };
        if (b.wrap(a("<div/>", {
            class: "owl-video-wrapper",
            style: g
        })),
        this._core.settings.lazyLoad && (i = "data-src",
        j = "owl-lazy"),
        h.length)
            return l(h.attr(i)),
            h.remove(),
            !1;
        "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg",
        l(f)) : "vimeo" === c.type ? a.ajax({
            type: "GET",
            url: "//vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a[0].thumbnail_large,
                l(f)
            }
        }) : "vzaar" === c.type && a.ajax({
            type: "GET",
            url: "//vzaar.com/api/videos/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a.framegrab_url,
                l(f)
            }
        })
    }
    ,
    e.prototype.stop = function() {
        this._core.trigger("stop", null, "video"),
        this._playing.find(".owl-video-frame").remove(),
        this._playing.removeClass("owl-video-playing"),
        this._playing = null,
        this._core.leave("playing"),
        this._core.trigger("stopped", null, "video")
    }
    ,
    e.prototype.play = function(b) {
        var c, d = a(b.target), e = d.closest("." + this._core.settings.itemClass), f = this._videos[e.attr("data-video")], g = f.width || "100%", h = f.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"),
        this._core.trigger("play", null, "video"),
        e = this._core.items(this._core.relative(e.index())),
        this._core.reset(e.index()),
        c = a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),
        c.attr("height", h),
        c.attr("width", g),
        "youtube" === f.type ? c.attr("src", "//www.youtube.com/embed/" + f.id + "?autoplay=1&rel=0&v=" + f.id) : "vimeo" === f.type ? c.attr("src", "//player.vimeo.com/video/" + f.id + "?autoplay=1") : "vzaar" === f.type && c.attr("src", "//view.vzaar.com/" + f.id + "/player?autoplay=true"),
        a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")),
        this._playing = e.addClass("owl-video-playing"))
    }
    ,
    e.prototype.isInFullScreen = function() {
        var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame")
    }
    ,
    e.prototype.destroy = function() {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers)
            this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
            "function" != typeof this[b] && (this[b] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.Video = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this.core = b,
        this.core.options = a.extend({}, e.Defaults, this.core.options),
        this.swapping = !0,
        this.previous = d,
        this.next = d,
        this.handlers = {
            "change.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && (this.previous = this.core.current(),
                this.next = a.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
                a.namespace && (this.swapping = "translated" == a.type)
            }, this),
            "translate.owl.carousel": a.proxy(function(a) {
                a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        },
        this.core.$element.on(this.handlers)
    };
    e.Defaults = {
        animateOut: !1,
        animateIn: !1
    },
    e.prototype.swap = function() {
        if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
            this.core.speed(0);
            var b, c = a.proxy(this.clear, this), d = this.core.$stage.children().eq(this.previous), e = this.core.$stage.children().eq(this.next), f = this.core.settings.animateIn, g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next),
            d.one(a.support.animation.end, c).css({
                left: b + "px"
            }).addClass("animated owl-animated-out").addClass(g)),
            f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
        }
    }
    ,
    e.prototype.clear = function(b) {
        a(b.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),
        this.core.onTransitionEnd()
    }
    ,
    e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers)
            this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
            "function" != typeof this[b] && (this[b] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b,
        this._call = null,
        this._time = 0,
        this._timeout = 0,
        this._paused = !0,
        this._handlers = {
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._paused && (this._time = 0)
            }, this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoplay && this.play()
            }, this),
            "play.owl.autoplay": a.proxy(function(a, b, c) {
                a.namespace && this.play(b, c)
            }, this),
            "stop.owl.autoplay": a.proxy(function(a) {
                a.namespace && this.stop()
            }, this),
            "mouseover.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "mouseleave.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this),
            "touchstart.owl.core": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "touchend.owl.core": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this.play()
            }, this)
        },
        this._core.$element.on(this._handlers),
        this._core.options = a.extend({}, e.Defaults, this._core.options)
    };
    e.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    },
    e.prototype._next = function(d) {
        this._call = b.setTimeout(a.proxy(this._next, this, d), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()),
        this._core.is("interacting") || c.hidden || this._core.next(d || this._core.settings.autoplaySpeed)
    }
    ,
    e.prototype.read = function() {
        return (new Date).getTime() - this._time
    }
    ,
    e.prototype.play = function(c, d) {
        var e;
        this._core.is("rotating") || this._core.enter("rotating"),
        c = c || this._core.settings.autoplayTimeout,
        e = Math.min(this._time % (this._timeout || c), c),
        this._paused ? (this._time = this.read(),
        this._paused = !1) : b.clearTimeout(this._call),
        this._time += this.read() % c - e,
        this._timeout = c,
        this._call = b.setTimeout(a.proxy(this._next, this, d), c - e)
    }
    ,
    e.prototype.stop = function() {
        this._core.is("rotating") && (this._time = 0,
        this._paused = !0,
        b.clearTimeout(this._call),
        this._core.leave("rotating"))
    }
    ,
    e.prototype.pause = function() {
        this._core.is("rotating") && !this._paused && (this._time = this.read(),
        this._paused = !0,
        b.clearTimeout(this._call))
    }
    ,
    e.prototype.destroy = function() {
        var a, b;
        this.stop();
        for (a in this._handlers)
            this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
            "function" != typeof this[b] && (this[b] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(b) {
        this._core = b,
        this._initialized = !1,
        this._pages = [],
        this._controls = {},
        this._templates = [],
        this.$element = this._core.$element,
        this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        },
        this._handlers = {
            "prepared.owl.carousel": a.proxy(function(b) {
                b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
            }, this),
            "added.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
            }, this),
            "remove.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && this.draw()
            }, this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"),
                this.initialize(),
                this.update(),
                this.draw(),
                this._initialized = !0,
                this._core.trigger("initialized", null, "navigation"))
            }, this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"),
                this.update(),
                this.draw(),
                this._core.trigger("refreshed", null, "navigation"))
            }, this)
        },
        this._core.options = a.extend({}, e.Defaults, this._core.options),
        this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
        navSpeed: !1,
        navElement: 'button type="button" role="presentation"',
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    },
    e.prototype.initialize = function() {
        var b, c = this._core.settings;
        this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),
        this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.prev(c.navSpeed)
        }, this)),
        this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.next(c.navSpeed)
        }, this)),
        c.dotsData || (this._templates = [a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),
        this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),
        this._controls.$absolute.on("click", "button", a.proxy(function(b) {
            var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(),
            this.to(d, c.dotsSpeed)
        }, this));
        for (b in this._overrides)
            this._core[b] = a.proxy(this[b], this)
    }
    ,
    e.prototype.destroy = function() {
        var a, b, c, d, e;
        e = this._core.settings;
        for (a in this._handlers)
            this.$element.off(a, this._handlers[a]);
        for (b in this._controls)
            "$relative" === b && e.navContainer ? this._controls[b].html("") : this._controls[b].remove();
        for (d in this.overides)
            this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this))
            "function" != typeof this[c] && (this[c] = null)
    }
    ,
    e.prototype.update = function() {
        var a, b, c, d = this._core.clones().length / 2, e = d + this._core.items().length, f = this._core.maximum(!0), g = this._core.settings, h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)),
        g.dots || "page" == g.slideBy)
            for (this._pages = [],
            a = d,
            b = 0,
            c = 0; a < e; a++) {
                if (b >= h || 0 === b) {
                    if (this._pages.push({
                        start: Math.min(f, a - d),
                        end: a - d + h - 1
                    }),
                    Math.min(f, a - d) === f)
                        break;
                    b = 0,
                    ++c
                }
                b += this._core.mergers(this._core.relative(a))
            }
    }
    ,
    e.prototype.draw = function() {
        var b, c = this._core.settings, d = this._core.items().length <= c.items, e = this._core.relative(this._core.current()), f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d),
        c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)),
        this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))),
        this._controls.$absolute.toggleClass("disabled", !c.dots || d),
        c.dots && (b = this._pages.length - this._controls.$absolute.children().length,
        c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(),
        this._controls.$absolute.find(".active").removeClass("active"),
        this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
    }
    ,
    e.prototype.onTrigger = function(b) {
        var c = this._core.settings;
        b.page = {
            index: a.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
        }
    }
    ,
    e.prototype.current = function() {
        var b = this._core.relative(this._core.current());
        return a.grep(this._pages, a.proxy(function(a, c) {
            return a.start <= b && a.end >= b
        }, this)).pop()
    }
    ,
    e.prototype.getPosition = function(b) {
        var c, d, e = this._core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages),
        d = this._pages.length,
        b ? ++c : --c,
        c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()),
        d = this._core.items().length,
        b ? c += e.slideBy : c -= e.slideBy),
        c
    }
    ,
    e.prototype.next = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
    }
    ,
    e.prototype.prev = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
    }
    ,
    e.prototype.to = function(b, c, d) {
        var e;
        !d && this._pages.length ? (e = this._pages.length,
        a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(c) {
        this._core = c,
        this._hashes = {},
        this.$element = this._core.$element,
        this._handlers = {
            "initialized.owl.carousel": a.proxy(function(c) {
                c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                    if (!c)
                        return;
                    this._hashes[c] = b.content
                }
            }, this),
            "changed.owl.carousel": a.proxy(function(c) {
                if (c.namespace && "position" === c.property.name) {
                    var d = this._core.items(this._core.relative(this._core.current()))
                      , e = a.map(this._hashes, function(a, b) {
                        return a === d ? b : null
                    }).join();
                    if (!e || b.location.hash.slice(1) === e)
                        return;
                    b.location.hash = e
                }
            }, this)
        },
        this._core.options = a.extend({}, e.Defaults, this._core.options),
        this.$element.on(this._handlers),
        a(b).on("hashchange.owl.navigation", a.proxy(function(a) {
            var c = b.location.hash.substring(1)
              , e = this._core.$stage.children()
              , f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
        }, this))
    };
    e.Defaults = {
        URLhashListener: !1
    },
    e.prototype.destroy = function() {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers)
            this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this))
            "function" != typeof this[d] && (this[d] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    function e(b, c) {
        var e = !1
          , f = b.charAt(0).toUpperCase() + b.slice(1);
        return a.each((b + " " + h.join(f + " ") + f).split(" "), function(a, b) {
            if (g[b] !== d)
                return e = !c || b,
                !1
        }),
        e
    }
    function f(a) {
        return e(a, !0)
    }
    var g = a("<support>").get(0).style
      , h = "Webkit Moz O ms".split(" ")
      , i = {
        transition: {
            end: {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd",
                transition: "transitionend"
            }
        },
        animation: {
            end: {
                WebkitAnimation: "webkitAnimationEnd",
                MozAnimation: "animationend",
                OAnimation: "oAnimationEnd",
                animation: "animationend"
            }
        }
    }
      , j = {
        csstransforms: function() {
            return !!e("transform")
        },
        csstransforms3d: function() {
            return !!e("perspective")
        },
        csstransitions: function() {
            return !!e("transition")
        },
        cssanimations: function() {
            return !!e("animation")
        }
    };
    j.csstransitions() && (a.support.transition = new String(f("transition")),
    a.support.transition.end = i.transition.end[a.support.transition]),
    j.cssanimations() && (a.support.animation = new String(f("animation")),
    a.support.animation.end = i.animation.end[a.support.animation]),
    j.csstransforms() && (a.support.transform = new String(f("transform")),
    a.support.transform3d = j.csstransforms3d())
}(window.Zepto || window.jQuery, window, document);
"use strict";
$(function() {
    var n, u, t, i, r;
    setValidations();
    initCustomSelect();
    n = dc.query("#cooperationForm");
    n && (u = function() {
        n.reset();
        clearValidationAlerts(n);
        n.querySelectorAll("select").forEach(function(n) {
            n.onchange()
        })
    }
    ,
    n.onsubmit = function(t) {
        validateSection(n)["catch"](function() {
            t.preventDefault();
            callModal.fail("لطفا اطلاعات خود را بصورت کامل وارد کنید")
        })
    }
    );
    dc.queries('input[type="checkbox"][data-groupWith]').forEach(function(n) {
        var i = n.dataset.groupwith
          , t = dc.queries('[data-groupWith="' + i + '"]');
        t && n.addEventListener("change", function() {
            t.forEach(function(n) {
                return n.checked = !1
            });
            n.checked = !0
        })
    });
    t = dc.query("#cooperation > .teachers.owl-carousel");
    t && $(t).owlCarousel({
        autoWidth: !1,
        rtl: !0,
        nav: !0,
        items: 1,
        loop: !0,
        autoplay: !0,
        navText: "",
        autoplayTimeout: 3200,
        autoplayHoverPause: !0,
        autoplaySpeed: 900
    });
    i = dc.queries('input[type="file"][data-typecheck]');
    i.forEach(function(n) {
        var t = n.dataset.typecheck.toLowerCase();
        n.addEventListener("change", function(n) {
            var i = n.target.value, r;
            i = i.split("\\").at(-1);
            r = i.split(".").at(-1);
            r !== t && (callModal.fail("نوع فایل انتخابی باید از نوع " + t + " باشد"),
            n.target.value = "")
        })
    });
    r = dc.queries('input[type="file"]');
    r.forEach(function(n) {
        var t = n.nextElementSibling;
        t && t.classList.contains("fileLabel") && n.addEventListener("change", function(n) {
            var i = n.target.value;
            i = i.split("\\").at(-1);
            i || (i = "choose file...");
            t.innerText = i
        })
    })
});
"use strict";
var dropdownItems = document.querySelectorAll(".items-menu-inner .dropdown");
dropdownItems.forEach(function(n) {
    var t = n.querySelector(".items-menu-inner .dropdown >a");
    t.addEventListener("click", function(n) {
        n.preventDefault()
    });
    n.addEventListener("click", function() {
        this.classList.toggle("open")
    })
});
"use strict";
$(function() {
    var n = function n(t) {
        var r = t.split(/(?=\.|#|\{|\[)/)
          , i = document.createElement(r[0]);
        return r.shift(),
        r.forEach(function(n) {
            var t = n.substring(1);
            switch (n.charAt(0)) {
            case ".":
                i.classList.add(t);
                break;
            case "#":
                i.id = t;
                break;
            case "{":
                t = t.slice(0, -1);
                i.innerText = t;
                break;
            case "[":
                t = t.slice(0, -1);
                t = t.split("=");
                i.setAttribute(t[0], t[1])
            }
        }),
        i.addChild = function() {
            for (var r = arguments.length, u = Array(r), t = 0; t < r; t++)
                u[t] = arguments[t];
            return u.forEach(function(t) {
                typeof t == "string" && i.appendChild(n(t));
                t.nodeName && i.appendChild(t)
            }),
            i
        }
        ,
        i
    }
      , t = dc.query("#comments");
    t && function() {
        var i = t.query("form")
          , r = t.queries(".content button")
          , u = function() {
            i.reset()
        };
        i && (i.onsubmit = function(n) {
            n.preventDefault();
            validateSection(i).then(function() {
                var r = new FormData(n.target), t = {}, i;
                r.forEach(function(n, i) {
                    t[i] = n
                });
                i = n.target.dataset.url;
                fetch(i, {
                    method: "post",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(t)
                }).then(function(n) {
                    if (!n.ok) {
                        callModal.fail("خطای سرور");
                        console.log(n);
                        return
                    }
                    callModal.success("نظر شما با موفقیت ثبت شد!");
                    u()
                })
            })["catch"](function() {
                callModal.fail("لطفا عنوان و متن نظر را خالی نگذارید!")
            })
        }
        );
        r.length && r.forEach(function(t) {
            t.onclick = function() {
                callModal.custom(function(i, r) {
                    var f = n("textarea");
                    f.id = "answer-message";
                    var e = n("form.commentReplyForm").addChild("p{پاسخ خود را ثبت کنید}", f, "button{ثبت}")
                      , o = t.dataset.pcommentid
                      , s = t.dataset.url;
                    e.dataset.url = s;
                    e.dataset.pcommentid = o;
                    e.onsubmit = function(n) {
                        n.preventDefault();
                        var t = n.target[0].value
                          , i = n.target.dataset.url
                          , e = n.target.dataset.pcommentid
                          , o = {
                            Text: t,
                            PCommentID: e
                        };
                        if (f.value.trim() === "") {
                            f.classList.add("error");
                            return
                        }
                        fetch(i, {
                            method: "post",
                            cache: "no-cache",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(o)
                        }).then(function(n) {
                            if (!n.ok) {
                                callModal.fail("خطای سرور");
                                console.log(n);
                                return
                            }
                            r().then(function() {
                                callModal.success("نظر شما با موفقیت ثبت شد!")
                            });
                            u()
                        })
                    }
                    ;
                    i(e);
                    setValidations()
                })
            }
        })
    }()
});
const VideoSectionId = 24;
const setModalContent = (result, otherVideoIds) => {

    modalBody.innerHTML = result;
    runModal(otherVideoIds);
}
const getModalContent = (e) => {
    let slug = e.currentTarget.dataset.slug;
    const otherVideoIds = $(e.currentTarget).parent().children().map(function(index, elem) {
        return $(elem).attr('data-videoid');
    }).get().join('-');

    $.get(`/tv/GetVideoModal/${slug}/${otherVideoIds}`, (result) => setModalContent(result, otherVideoIds))
}
const changeModalContent = (e) => {
    e.stopPropagation();
    e.preventDefault();
    var url = e.currentTarget.getAttribute('data-href')
    const parts = url.split('/');
    var sameVideo = parts[parts.length - 1];
    sameVideo = sameVideo == "" ? parts[parts.length - 2] : sameVideo;
    $.get(url, (result) => setModalContent(result, sameVideo))
    return false;
}
function setScrollToIdElements() {
    var AnchorElements = dc.queries('[data-scrolltoid]');
    if (AnchorElements.length > 0) {
        AnchorElements.forEach(function(item) {
            item.addEventListener('click', function() {
                var query = this.dataset.scrolltoid;
                var elementToScroll = dc.id(query);
                if (elementToScroll) {
                    var targetPosition = window.scrollY + elementToScroll.getBoundingClientRect().top - 100;
                    window.scrollTo(0, targetPosition);
                }
            });
        });
    }
}
function handleComment(selector) {
    var comments = dc.query(selector);
    if (comments) {
        let commentImgs = comments.querySelectorAll('img');
        if (commentImgs) {
            commentImgs.forEach(img => {
                img.classList.add('exception');
            }
            );
        }

    }

    if (comments) {
        (function() {
            var form = comments.query("form");
            var replys = comments.queries(".content button");

            var clearForm = function clearForm() {
                form.reset();
            };

            if (form)
                form.onsubmit = function(e) {
                    e.preventDefault();
                    validateSection(form).then(function() {
                        var formData = new FormData(e.target);
                        var formDataObject = {};
                        formData.forEach(function(key, value) {
                            formDataObject[value] = key;
                        });

                        var url = e.target.dataset.url;

                        fetch(url, {
                            method: "post",
                            cache: "no-cache",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(formDataObject)
                        }).then(function(response) {
                            if (!response.ok) {
                                callModal.fail("خطای سرور");
                                console.log(response);
                                return;
                            }
                            callModal.success("نظر شما با موفقیت ثبت شد!");
                            clearForm();
                            // return response.json();
                        });
                        // .then(data => {
                        //     callModal.success('نظر شما با موفقیت ثبت شد!');
                        //     clearForm();
                        // })
                    })["catch"](function() {
                        callModal.fail("لطفا عنوان و متن نظر را خالی نگذارید!");
                    });
                }
                ;

            if (replys.length)
                replys.forEach(function(reply) {
                    reply.onclick = function() {
                        callModal.custom(function(showModal, closeModal) {
                            var textarea = createElement("textarea");
                            textarea.id = "answer-message";
                            var replyForm = createElement("form.commentReplyForm").addChild("p{پاسخ خود را ثبت کنید}", textarea, "button{ثبت}");
                            var pCommentId = reply.dataset.pcommentid;
                            var url = reply.dataset.url;
                            replyForm.dataset.url = url;
                            replyForm.dataset.pcommentid = pCommentId;
                            replyForm.onsubmit = function(e) {
                                e.preventDefault();
                                var answerMessage = e.target[0].value;
                                var url = e.target.dataset.url;
                                var pCommentId = e.target.dataset.pcommentid;
                                var object = {
                                    Text: answerMessage,
                                    PCommentID: pCommentId
                                };
                                if (textarea.value.trim() === "") {
                                    textarea.classList.add("error");
                                    return;
                                }
                                fetch(url, {
                                    method: "post",
                                    cache: "no-cache",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(object)
                                }).then(function(response) {
                                    if (!response.ok) {
                                        callModal.fail("خطای سرور");
                                        console.log(response);
                                        return;
                                    }
                                    closeModal().then(function() {
                                        callModal.success("نظر شما با موفقیت ثبت شد!");
                                    });
                                    clearForm();
                                });
                            }
                            ;
                            showModal(replyForm);
                            setValidations();
                        });
                    }
                    ;
                });
        }
        )();
    }
}
function runModal(otherVideoIds) {
    setScrollToIdElements();
    modalBody.querySelectorAll('a').forEach(a => {
        var slug = a.getAttribute('href');
        const parts = slug.split('/');
        slug = parts[parts.length - 1];
        slug = slug == "" ? parts[parts.length - 2] : slug;

        a.href = "javascript:void(0)"
        a.setAttribute('data-href', `/tv/GetVideoModal/${slug}/${otherVideoIds}`)
        a.addEventListener('click', changeModalContent)
    }
    )
    videoModal.classList.add("active");
    videoModal.classList.remove("close");

    if (closeModalBtn)
        closeModalBtn.addEventListener("click", () => {
            const modalMainVideo = videoModal.querySelector("video");
            modalMainVideo.pause();
            videoModal.classList.remove("active");
            videoModal.classList.add("close");
        }
        );
    //-------------------------------------------- play vdeo codes ------------------------------------------------

    const sampleVideo = dc.query('.videoModal .sample-video');
    if (sampleVideo) {
        var tvVideo = sampleVideo.query('video');
    }
    function playVideo(e) {
        e.stopPropagation();
        this.classList.add('play');
        tvVideo.play();
        tvVideo.controls = true;
        this.removeEventListener('click', playVideo)
    }
    if (sampleVideo) {
        tvVideo.controls = false;
        sampleVideo.addEventListener('click', playVideo);
        tvVideo.addEventListener('ended', function() {
            sampleVideo.classList.remove('play');
            sampleVideo.addEventListener('click', playVideo);
            this.controls = false;
        });

    }

    //----------------------------------------------- copy url codes -----------------------------------------------

    const copyBtn = document.querySelector('#copyUrlBtn');
    if (copyBtn)
        copyBtn.addEventListener('click', sharePageInModal)

    //----------------------------------------------- rating codes -----------------------------------------------

    const ratingElement = document.querySelector('.tvDetails .rating');
    const ratingElementObject = new rating(ratingElement);
}
function runTV() {
    respondToVisibility("[data-src]", function(element) {
        $(element).attr("src", $(element).data("src"));
        $(element).removeAttr("data-src");
    });
    //show more video button in video section codes
    const showMoreBtns = dc.queries(".show-more");
    showMoreBtns.forEach( (btn) => {
        btn.addEventListener("click", function(e) {
            const btn = e.target;
            const parentVideoSection = btn.closest(".videos");
            if (parentVideoSection.classList.contains("more")) {
                parentVideoSection.classList.remove("more");
            } else {
                parentVideoSection.classList.add("more");
            }
        });
    }
    );

    //show modal video when click on video of video section
    const videoModalEl = document.createElement('div');
    const closeVideoModalEl = document.createElement('span');
    const videoModalBodyEl = document.createElement('div');
    videoModalEl.classList.add('videoModal');
    closeVideoModalEl.classList.add('closeVideoModal');
    videoModalBodyEl.classList.add('m-body');
    closeVideoModalEl.innerHTML = `×`;
    videoModalEl.appendChild(closeVideoModalEl);
    videoModalEl.appendChild(videoModalBodyEl);
    document.body.appendChild(videoModalEl);

    //-----------------------------------------------------------------------

    const VideoSectionVideos = dc.queries(".videoSection .videos > div");

    const videoModal = dc.query(".videoModal");
    const closeModalBtn = videoModal.querySelector(".closeVideoModal");
    const modalBody = videoModal.querySelector(".m-body");
    window.videoModal = videoModal;
    window.closeModalBtn = closeModalBtn;
    window.modalBody = modalBody;

    if (VideoSectionVideos) {
        VideoSectionVideos.forEach( (video) => {
            video.addEventListener("click", getModalContent);
        }
        );
    }
}
//----------------------------------------------- copy url codes -----------------------------------------------
function sharePageInModal(e) {
    if (navigator.share) {
        navigator.share({
            title: $('title').text(),
            url: e.currentTarget.dataset.url
        }).then( () => {
            console.log('Thanks for sharing!');
        }
        ).catch( (error) => {
            console.error('Error sharing:', error);
        }
        );
    } else {
        const url = e.currentTarget.dataset.url;
        clipboard(url);
        e.currentTarget.classList.add('copied');

        setTimeout( () => {
            document.querySelector('#copyUrlBtn').classList.remove('copied');
        }
        , 2000);
    }
}
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
//----------------------------------------------- rating codes -----------------------------------------------
class rating {
    constructor(ratingEl) {
        if (!ratingEl)
            return;

        this.rated = false;
        this.ratingElement = ratingEl;
        this.starsContainer = this.ratingElement.querySelector('ul');
        this.stars = this.ratingElement.querySelectorAll('ul >li');
        this.checkUserVote(this.starsContainer.dataset.videoid)

    }

    checkUserVote(videoId) {

        fetch(`/UserInteraction/UserHasVote?referenceTable=Video&resourceId=${videoId}`, {
            method: "get",
            headers: new Headers({
                'content-type': 'application/json'
            }),
        }).then( (response) => response.json()).then(result => {
            if (result.Count != 0 && result.Value != 0) {
                this.rated = true;
                this.setUserRate(result.Value)
            } else {
                this.setEvents();
            }
        }
        )
    }

    setEvents() {
        this.stars.forEach(star => {
            star.addEventListener('mouseover', this.starsMouseOverHandler.bind(this))
            star.addEventListener('click', this.starsMouseClickHandler.bind(this))
        }
        );
        this.ratingElement.addEventListener('mouseout', this.starsContainerMouseOutHandler.bind(this));
    }

    starsMouseClickHandler(e) {
        if (!this.rated) {
            this.starsContainer.classList.add('disableEvent');
            this.rated = true;
            this.sendRequest(e)
        } else {
            alert('شما قبلا برای این ویدیو امتیاز ثبت کرده اید ');
        }
    }

    sendRequest(e) {
        const errorElem = $('#rateError')
        const rateElem = e.currentTarget
        const videoId = rateElem.parentElement.dataset.videoid;
        const data = {
            ResourceId: videoId,
            ReferenceTable: "Video",
            UseHeart: false,
            Value: $(rateElem).index() + 1
        }
        errorElem.text('')
        fetch('/UserInteraction/SaveRankVote', {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({
                'content-type': 'application/json'
            }),
        }).then( (response) => response.json()).then(result => {
            if (result.hasError) {
                errorElem.text(result.message)
            } else {//likeElem.innerHTML = result.data.userLike
            //document.querySelectorAll(`[data-videoid="${videoId}"]`).forEach(elem => elem.dataset.like = result.data.userLike)
            }
        }
        )
    }

    starsMouseOverHandler(e) {
        this.removeHover()
        e.currentTarget.hovered = true;
        this.addHover();
    }
    addHover() {
        for (const star of this.stars) {
            star.classList.add('hover');
            if (star.hovered) {
                break;
            }
        }
    }
    setUserRate(rateValue) {
        if (rateValue == 0)
            return;
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].classList.add('hover');
            if (i + 1 == rateValue) {
                break;
            }
        }
    }
    removeHover() {
        this.stars.forEach(star => {
            star.classList.remove('hover');
            star.hovered = false;
        }
        );
    }
    starsContainerMouseOutHandler() {
        if (!(this.starsContainer.classList.contains('disableEvent'))) {
            this.removeHover();
        }
    }
}

function fetchTVSection() {
    const tvSectionTags = dc.queries(".tv-section")
    let loadedSectionCount = 0
    const sectionLoaded = () => {
        loadedSectionCount++;
        if (loadedSectionCount != tvSectionTags.length)
            return;
        runTV()
    }

    tvSectionTags.forEach(tvTag => {

        fetch(`/tv/GetVideoInSection`).then(response => response.text()).then(html => {
            tvTag.innerHTML = html
            sectionLoaded()
            refreshOnClicks()
        }
        ).catch(sectionLoaded)
    }
    )
}

$(function() {
    fetchTVSection()

    if ($('.owl-carousel').length) {
        setTimeout( () => {
            $('.owl-carousel:not(.tv-details)').owlCarousel({
                loop: false,
                autoWidth: false,
                margin: 10,
                nav: true,
                item: 2,
                rtl: true,
                navText: '',
                responsive: {
                    0: {
                        items: 1
                    },
                    698: {
                        items: 3
                    }
                }
            })
        }
        , 2000);
        respondToVisibility(".videoSection [data-src]", function(element) {
            $(element).attr("src", $(element).data("src"));
            $(element).removeAttr("data-src");
        });

        setTimeout( () => {
            $('.owl-carousel.tv-details').owlCarousel({
                loop: false,
                autoWidth: false,
                margin: 10,
                nav: true,
                item: 4,
                rtl: true,
                navText: '',
                responsive: {
                    0: {
                        items: 1
                    },
                    698: {
                        items: 4
                    }
                }
            })
        }
        , 500);
    }
})

function runPackageInCourse() {
    $('.packageInCourse > .titr').click('click', function() {
        $(this).next('.p-collapsibleContent').slideToggle(300);
        $(this).next('.p-collapsibleContent').css('display', 'flex');
    });
    $('.packageInCourse .p-collapsibleSection .title').on('click', function() {
        $(this).toggleClass('active');
        $(this).next('.content').slideToggle(300);
        $(this).next('.content').css('display', 'flex');
    });

    const videoElements = document.querySelectorAll('.packageInCourse .item .viewBtn')
    if (videoElements && videoElements.length)
        videoElements.forEach(elem => elem.addEventListener('click', function() {
            showVideo(elem)
        }))

}

if (dc.queries('#packagesSection .packageInCourse') && dc.queries('#packagesSection .packageInCourse').length > 0) {
    runPackageInCourse();
}
//setTimeout(() => {
//    alert(dc.queries('.package-section .packageInCourse').length)
//    if (dc.queries('.package-section .packageInCourse') && dc.queries('.package-section .packageInCourse').length > 0) {
//        runPackageInCourse();
//    }
//}, 3000)
function fetchPackageSection() {
    const packageSectionTags = dc.queries(".package-section")

    packageSectionTags.forEach(tvTag => {
        fetch(`/PackageHome/GetPackageInSection`).then(response => response.text()).then(html => {
            tvTag.innerHTML = html;
            runPackageInCourse();
        }
        )
    }
    )

    $(document).on('click', '.package-section-item', function() {
        $(this).parent().find('.package-video').hide();
        $(this).find('.package-video').show();
    })

    $(document).on('click', '.p-section', function() {

        if ($(this).hasClass('fetched'))
            return;
        var id = $(this).attr('data-sectionid')
        var contentDiv = $(this).find('.content');
        $(this).addClass('fetched')
        fetch(`/PackageHome/GetPackageVideoInSection?id=${id}`).then(response => response.text()).then(html => {
            $(this).addClass('fetched')
            contentDiv.html(html);
            setTimeout( () => {
                runSampleVideosOf(contentDiv);
                //this function come from js.js file
                var seeMore = $(contentDiv).find('.seeMore')[0];
                $(seeMore).on('click', function() {
                    $(this).parents('#videoGridContainer').toggleClass('active');
                    $(this).toggleClass('active');
                });
            }
            , 300)
        }
        )
    })
}

function handleOpenInModalPackage() {
    $(document).on('click', '.close-custom-modal', function(e) {
        $('.modal-custom').hide()
    })
    $(document).on('click', '.open-in-modal', function(e) {
        e.stopPropagation()
        e.preventDefault()

        // get data
        const slug = $(this).attr('href')
        fetch(`/packageHome/GetPackageInModal?slug=${slug}`).then(response => response.text()).then(OpenModal)

        return false;
    })
}

function OpenModal(html) {
    const modal = $('.modal-custom')
    const modalBody = $('.modal-custom .modal-custom-body')
    modalBody.html(html);
    modal.show()
}

async function showVideo(elem) {
    if (!elem.clicked) {
        elem.clicked = true;
        const itemElement = elem.parentElement;
        const slug = itemElement.getAttribute('data-slug')
        const divider = itemElement.querySelector('.showVideoDivider')
        if (divider && divider.childElementCount == 0) {
            const data = await getVideo(slug);
            if (!data)
                return;

            const video = document.createElement('video')
            video.src = data.src;
            video.poster = data.cover;
            video.controls = true;
            video.classList.add('exception');

            divider.append(video);
            divider.classList.add('active');
        }
    }

    toggleVideoDivider(divider)
}
function toggleVideoDivider(elem) {
    (elem.classList.contains('hide') && openVideoDivider(elem)) || (!elem.classList.contains('hide') && closeVideoDivider(elem))
}
function openVideoDivider(elem) {
    elem.classList.contains('hide') && elem.classList.remove('hide');
}
function closeVideoDivider(elem) {
    !elem.classList.contains('hide') && elem.classList.add('hide');
}

async function getVideo(slug) {
    const result = await fetch(`/packageHome/GetVideoBySlug?slug=${slug}&download=false`)
    return await result.json()
}

$(function() {
    fetchPackageSection();
    handleOpenInModalPackage();
})

"use strict";
$(function() {
    var o = document.getElementById("resMenu"), f, t, i, r, e, u, n;
    for (o && (f = function() {
        document.getElementById("resMenu").style.width = "320px";
        dc.query("#resMenu + .overlay").classList.add("active")
    }
    ,
    t = function() {
        document.getElementById("resMenu").style.width = "0";
        dc.query("#resMenu + .overlay").classList.remove("active")
    }
    ,
    document.getElementById("resOpen").addEventListener("click", f),
    i = document.getElementById("resClose"),
    i && i.addEventListener("click", t),
    dc.query("#resMenu + .overlay").addEventListener("click", t)),
    r = document.getElementsByClassName("courseSelector"),
    n = 0; n < r.length; n++)
        r[n].addEventListener("click", function() {
            document.getElementById(this.dataset.linkto).classList.remove("noDisplay");
            document.getElementsByClassName("OriginContent")[0].classList.add("out");
            document.getElementsByClassName("crossContent")[0].classList.add("in")
        });
    for (e = document.getElementById("backToRes"),
    e && document.getElementById("backToRes").addEventListener("click", function() {
        var n = dc.query(".crossContent ul:not(.noDisplay)");
        n.classList.add("noDisplay");
        document.getElementsByClassName("OriginContent")[0].classList.remove("out");
        document.getElementsByClassName("crossContent")[0].classList.remove("in")
    }),
    u = document.getElementsByClassName("collapsible"),
    n = 0; n < u.length; n++)
        u[n].addEventListener("click", function() {
            this.classList.toggle("active");
            var n = this.nextElementSibling;
            n.style.maxHeight = n.style.maxHeight ? null : n.scrollHeight + "px"
        });
    // document.querySelector(".left-header .left div a").getAttribute("href").length && document.querySelector(".left-header .left div a").getAttribute("href") !== "/Users/Login.aspx" && document.getElementById("resMenu").classList.add("loggedIn")
});
function fetchAdsSection() {
    var adsSectionTags = document.querySelectorAll(".ads-section")

    adsSectionTags.forEach(function(adsTag) {
        var positionName = adsTag.getAttribute('data-position')
        if (!positionName)
            positionName = '';
        fetch('/Advertisement/GetAdsInSection?positionName=' + positionName, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'// اضافه کردن هدر AJAX
            }
        }).then(function(response) {
            return response.text()
        }).then(function(html) {
            if (!html)
                html = ""
            adsTag.innerHTML = html;
            setTimeout( () => {
                var deatailsNewAdsCloseBtn = document.querySelector('.td-content .newAds .close');
                if (deatailsNewAdsCloseBtn) {
                    deatailsNewAdsCloseBtn.addEventListener('click', (e) => {
                        if (e.currentTarget.closest('.newAds')) {
                            e.currentTarget.closest('.newAds').classList.add('diactive');
                        }
                    }
                    )
                }
            }
            , 2000)
        }).catch(console.log)
    })
}

function fetchFormSection() {
    var formSectionTags = document.querySelectorAll(".form-section")

    formSectionTags.forEach(function(formTag) {
        var positionName = formTag.getAttribute('data-position')
        if (!positionName)
            positionName = '';
        fetch('/Form/GetFormInSection?positionName=' + positionName, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'// اضافه کردن هدر AJAX
            }
        }).then(function(response) {
            return response.text()
        }).then(function(html) {
            if (!html)
                html = ""
            formTag.innerHTML = html;

            document.querySelectorAll('.next-level').forEach( (btn) => {
                btn.addEventListener('click', (e) => {
                    debugger ;const nextStep = parseInt(e.currentTarget.parentElement.getAttribute('data-step')) + 1;
                    document.querySelectorAll('.form-step').forEach( (step) => {
                        step.style.display = 'none';
                        if (step.getAttribute('data-step') == nextStep)
                            step.removeAttribute('style');
                    }
                    )
                }
                )
            }
            )
        }).catch(console.log)
    })
}

$(document).on('submit', '.dynamicForm', function(e) {
    e.preventDefault();
    // جلوگیری از ارسال سنتی فرم

    //if (!$(this).valid()) return; // جلوگیری از ارسال فرم نامعتبر

    let formData = {
        FormId: $(this).find('[name="formId"]').val(),
        SubmittedAt: new Date().toISOString(),
        FormFieldValues: []
    };

    // استخراج داده‌ها از فرم و تبدیل به JSON
    $(this).find("input:not([type=\"hidden\"]), select, textarea").each(function() {
        let fieldId = $(this).attr("id").replace("formField_", "");
        let fieldValue = $(this).attr("type") === "checkbox" ? $(this).prop("checked") : $(this).val();

        formData.FormFieldValues.push({
            FormFieldId: fieldId,
            FieldValue: fieldValue
        });
    });

    console.log("📤 ارسال داده‌ها:", formData);

    // ارسال داده به سرور
    $.ajax({
        url: "/Form/save",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        headers: {
            "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val()
        },
        success: function(response) {
            if (response.HasError)
                alert("❌ خطا در ارسال فرم: ");
            else
                alert("✅ فرم با موفقیت ذخیره شد!");
        },
        error: function(xhr) {
            alert("❌ خطا در ارسال فرم: " + xhr.responseText);
        }
    });

    return false;
});

window.addEventListener('DOMContentLoaded', function() {
    fetchAdsSection();
    fetchFormSection();
})
$(function() {

    //updload practice
    const practiceModal = dc.id('practiceModal');
    if (practiceModal) {
        //input adder 
        dc.queries('#practiceModal i.fa-plus-circle').forEach(item => {
            item.addEventListener('click', () => {
                //clone the last input in the secition
                let clone = item.parentElement.querySelectorAll('.input');
                clone = clone[clone.length - 1];
                clone = clone.cloneNode(true);

                //increase index of clone by one
                let cloneFor = clone.querySelector('label').getAttribute('for');
                let cloneIndex = cloneFor[cloneFor.length - 1];

                let regex = new RegExp(`${cloneIndex}$`)
                let newFor = cloneFor.replace(regex, parseInt(cloneIndex) + 1);

                clone.querySelector('label').setAttribute('for', newFor);
                clone.querySelector('input').id = newFor;

                //set events and inner values of clone
                inputChangeHandler(clone.querySelector('input'));
                clone.querySelector('input').value = '';
                clone.querySelector('span').innerHTML = '';
                removerEvnt(clone.querySelector('i.fa-times'))

                clone.classList.add('hidden')
                item.parentElement.appendChild(clone);
                setTimeout( () => {
                    document.querySelector('.input.hidden').classList.remove('hidden');
                }
                , 10);
            }
            )
        }
        )

        //input remover
        function removerEvnt(item) {
            item.onclick = () => {
                let inputs = item.parentElement.parentElement.querySelectorAll('.input');
                if (inputs.length == 1) {
                    inputs[0].querySelector('input').value = '';
                    inputs[0].querySelector('label').classList.remove('errored')
                    item.parentElement.querySelector('span').innerHTML = '';
                    return
                }
                item.parentElement.classList.add('hidden');
                setTimeout( () => {
                    item.parentElement.remove()
                }
                , 200);
            }
        }
        dc.queries('#practiceModal i.fa-times').forEach(item => {
            removerEvnt(item)
        }
        )

        //put the name of uploaded file into the box!
        function inputChangeHandler(item) {
            item.addEventListener('change', (e) => {
                if (e.target.type === "file") {
                    let path = e.target.files[0].name;
                    item.parentElement.querySelector('span').innerHTML = path;
                    item.parentElement.classList.remove('errored');
                }

            }
            )
        }
        dc.queries('#practiceModal input').forEach(item => {
            inputChangeHandler(item)
        }
        )

        //remove red heighlights when ok
        dc.query('#practiceModal textarea').onkeydown = _ => {
            _.target.classList.remove('errored')
        }

        //clear all
        function clearPracticeForm() {
            dc.queries('#practiceModal .input label span').forEach(item => {
                item.innerHTML = '';
            }
            )
            dc.query('#practiceModal').reset();
            dc.queries('#practiceModal .part').forEach(item => {
                let inputs = item.querySelectorAll('.input');
                if (inputs.length > 1) {

                    inputs.forEach( (i, index) => {
                        if (index == inputs.length - 1)
                            return
                        i.remove();
                    }
                    )
                    console.log(item)

                    // for (let m=0; m < inputs.length; m++) {
                    //   console.log(inputs[m])
                    // }
                }
            }
            )
        }
        //get title
        function getTitle(string) {
            let title = string.match(/(?<=<title>).*?(?=<\/title>)/i)
            return title
        }

        //upload validations
        function isFormValid() {
            const form = dc.id("practiceModal");
            const text = form.query("textarea");
            //not empty
            const pics = form.queries('input[id^=photo-]');
            //between 2 - 20 mb
            const errorMsg = $('#errormessage')
              , msg = $('#message');
            const throwErr = (err, elementToHeighlight) => {
                $(errorMsg).text(err);
                $(errorMsg).show();
                msg.removeClass('show');
                elementToHeighlight.classList.add('errored');
            }

            if (text.value.trim().length === 0) {
                throwErr('متن پاسخ نمی تواند خالی باشد', text);
                return false;
            }

            let arePicsValid = true;
            pics.forEach(pic => {
                if (!pic.files[0])
                    return
                if (pic.files[0].size < 2000 || pic.files[0].size > 2000000) {
                    throwErr("حجم عکس باید بین 2 کیلوبایت تا 2 مگابایت باشد", pic.parentElement);
                    arePicsValid = false
                }
            }
            )
            if (!arePicsValid)
                return false

            return true
        }

        //upload submit
        var isInUpload = false;
        /* if ($('#practiceModal').length)*/
        $(document).on('submit', '#practiceModal', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.preventDefault();

            if (!isFormValid())
                return
            //pooria
            if (isInUpload)
                return;
            isInUpload = true;
            //end
            var data = new FormData();
            data.append("id", $('#practiceModal').find('[name="ID"]').val());
            data.append("SourceUrl", $('#practiceModal').find('[name="SourceUrl"]').val());
            data.append("Description", $('#practiceModal').find('[name="Description"]').val());
            data.append("CoursClassQuizDefenitionID", $('#practiceModal').find('[name="CoursClassQuizDefenitionID"]').val());

            $('#practiceModal').find('[type="file"]').each(function(i) {
                if ($(this)[0].files.length > 0) {
                    data.append("file" + i, $(this)[0].files[0]);
                }
            });

            var removedAttachment = [];
            $('.removedAttachment').each(function() {
                removedAttachment.push($(this).attr('data-attachment'));
            });

            data.append('removedAttachment', JSON.stringify(removedAttachment));
            $.ajax({
                url: $(this).attr('action'),
                type: 'POST',
                data: data,
                async: true,
                cache: false,
                contentType: false,
                enctype: 'multipart/form-data',
                processData: false,
                //pooria
                beforeSend: createLoader,
                complete: function() {
                    removeLoader();
                    isInUpload = false;
                },
                //end
                xhr: function() {
                    let xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function(evt) {
                        if (evt.lengthComputable) {
                            let percentComplete = evt.loaded / evt.total;
                            percentComplete = parseInt(percentComplete * 100);
                            setUploadPercent(percentComplete)
                        }
                    }, false);
                    return xhr;

                },
                success: function(response) {
                    if (!response.result) {
                        $('#message').text("پاسخ شما با موفقیت ثبت شد!");
                        $('#message').addClass("show");
                        $('#errormessage').hide();
                        clearPracticeForm();
                    } else {
                        $('#errormessage').text(response.message);
                        $('#errormessage').show();
                        clearPracticeForm();
                    }
                },
                error: function(err) {
                    let errorTitle = getTitle(err.responseText)[0];
                    let error;
                    if (errorTitle.includes('A potentially dangerous Request.Form value was detected from the client ')) {
                        error = 'potentiallyDangrous'
                    }

                    switch (error) {
                    case 'potentiallyDangrous':
                        $('#errormessage').text('متن نمیتواند شامل کد های HTML, CSS یا JS باشد!');
                        $('#errormessage').show();
                        break;
                    default:
                        $('#errormessage').text('خطای نامشخص');
                        $('#errormessage').show();
                        console.log(err);
                        break;
                    }

                }
            });

            return false;
        });

        $(document).on('click', '.deleteAttachment', function(e) {
            $(this).toggleClass('removedAttachment');
        })

        $(document).on('click', '[data-answereditid]', function() {
            var id = $(this).attr('data-answereditid');
            callModal.spinner(done => {

                $.get('/courses/getAnswerEditForm/' + id, function(result) {
                    done().then( () => {
                        callModal(result, 'fullscreen', true);
                    }
                    )
                })
            }
            )

        });

        $(document).on('click', '#practiceModalBtn', submitEditFormAnswer)

    }

    //teacher massages
    let teacherMsg = dc.query('#myPractice.teacherMsg');
    if (teacherMsg) {
        let clicker = teacherMsg.queries("main > .item");
        clicker.forEach(click => {
            let title = click.querySelector(".top");
            const id = click.dataset.id;

            click.onclick = _ => {
                var text = click.querySelector('#message_text');
                text = $(text).val().replace(/\n/gi, '<br/>');
                callModal("پیام استاد:<br/> " + text).then( () => {
                    location.reload();
                }
                )
            }
            if (title.classList?.contains("display")) {
                click.addEventListener("click", () => {
                    massageDisplayed(id);
                    title.classList.remove("display");
                }
                , {
                    once: true
                })
            }
        }
        )
        function massageDisplayed(id) {
            let courseClassId = teacherMsg.dataset.courseid;
            let url = '/Courses/ShowMessage';
            $.ajax({
                url: url,
                data: {
                    messageId: id,
                    courseClassId: courseClassId
                },
                type: "Post",
                success: function(response) {
                    if (!response.succes)
                        return
                    $('.count').attr('data-count', response.messageCount)
                }
            });
        }
    }

    //pooria
    let loader = dc.query('#practiceModal .prLoader');
    let uploadButton = dc.query('#practiceModal button');

    function submitEditFormAnswer() {
        loader = dc.query('#practiceModal .prLoader');
        uploadButton = dc.query('#practiceModalBtn');
        $('#practiceModal').submit();
    }

    function createLoader() {
        uploadButton.disabled = true;
        loader.classList.remove('done');
        $('#message').removeClass("show").removeClass('error');
    }
    function removeLoader() {
        uploadButton.disabled = false;
        loader.classList.add('done');
    }
    function setUploadPercent(per) {
        loader.style.setProperty('--percent', per)
    }
    //end

})
/*!
* sweetalert2 v11.11.1
* Released under the MIT License.
*/
!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Sweetalert2 = e()
}(this, (function() {
    "use strict";
    function t(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, o = Array(e); n < e; n++)
            o[n] = t[n];
        return o
    }
    function e(t, e, n) {
        if ("function" == typeof t ? t === e : t.has(e))
            return arguments.length < 3 ? e : n;
        throw new TypeError("Private element is not present on this object")
    }
    function n(t, e, n) {
        return e = u(e),
        function(t, e) {
            if (e && ("object" == typeof e || "function" == typeof e))
                return e;
            if (void 0 !== e)
                throw new TypeError("Derived constructors may only return object or undefined");
            return function(t) {
                if (void 0 === t)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t
            }(t)
        }(t, s() ? Reflect.construct(e, n || [], u(t).constructor) : e.apply(t, n))
    }
    function o(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function i(t, n) {
        return t.get(e(t, n))
    }
    function r(t, e, n) {
        (function(t, e) {
            if (e.has(t))
                throw new TypeError("Cannot initialize the same private elements twice on an object")
        }
        )(t, e),
        e.set(t, n)
    }
    function a(t, e, n) {
        return e && function(t, e) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n];
                o.enumerable = o.enumerable || !1,
                o.configurable = !0,
                "value"in o && (o.writable = !0),
                Object.defineProperty(t, p(o.key), o)
            }
        }(t.prototype, e),
        Object.defineProperty(t, "prototype", {
            writable: !1
        }),
        t
    }
    function c() {
        return c = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(t, e, n) {
            var o = function(t, e) {
                for (; !{}.hasOwnProperty.call(t, e) && null !== (t = u(t)); )
                    ;
                return t
            }(t, e);
            if (o) {
                var i = Object.getOwnPropertyDescriptor(o, e);
                return i.get ? i.get.call(arguments.length < 3 ? t : n) : i.value
            }
        }
        ,
        c.apply(null, arguments)
    }
    function u(t) {
        return u = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        }
        ,
        u(t)
    }
    function s() {
        try {
            var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
            )))
        } catch (t) {}
        return (s = function() {
            return !!t
        }
        )()
    }
    function l(t, e) {
        return l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e,
            t
        }
        ,
        l(t, e)
    }
    function d(t, e) {
        return function(t) {
            if (Array.isArray(t))
                return t
        }(t) || function(t, e) {
            var n = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (null != n) {
                var o, i, r, a, c = [], u = !0, s = !1;
                try {
                    if (r = (n = n.call(t)).next,
                    0 === e)
                        ;
                    else
                        for (; !(u = (o = r.call(n)).done) && (c.push(o.value),
                        c.length !== e); u = !0)
                            ;
                } catch (t) {
                    s = !0,
                    i = t
                } finally {
                    try {
                        if (!u && null != n.return && (a = n.return(),
                        Object(a) !== a))
                            return
                    } finally {
                        if (s)
                            throw i
                    }
                }
                return c
            }
        }(t, e) || h(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    function f(e) {
        return function(e) {
            if (Array.isArray(e))
                return t(e)
        }(e) || function(t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"])
                return Array.from(t)
        }(e) || h(e) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    function p(t) {
        var e = function(t, e) {
            if ("object" != typeof t || !t)
                return t;
            var n = t[Symbol.toPrimitive];
            if (void 0 !== n) {
                var o = n.call(t, e);
                if ("object" != typeof o)
                    return o;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return String(t)
        }(t, "string");
        return "symbol" == typeof e ? e : e + ""
    }
    function m(t) {
        return m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ,
        m(t)
    }
    function h(e, n) {
        if (e) {
            if ("string" == typeof e)
                return t(e, n);
            var o = {}.toString.call(e).slice(8, -1);
            return "Object" === o && e.constructor && (o = e.constructor.name),
            "Map" === o || "Set" === o ? Array.from(e) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? t(e, n) : void 0
        }
    }
    var v = {}
      , g = function(t) {
        return new Promise((function(e) {
            if (!t)
                return e();
            var n = window.scrollX
              , o = window.scrollY;
            v.restoreFocusTimeout = setTimeout((function() {
                v.previousActiveElement instanceof HTMLElement ? (v.previousActiveElement.focus(),
                v.previousActiveElement = null) : document.body && document.body.focus(),
                e()
            }
            ), 100),
            window.scrollTo(n, o)
        }
        ))
    }
      , b = "swal2-"
      , y = ["container", "shown", "height-auto", "iosfix", "popup", "modal", "no-backdrop", "no-transition", "toast", "toast-shown", "show", "hide", "close", "title", "html-container", "actions", "confirm", "deny", "cancel", "default-outline", "footer", "icon", "icon-content", "image", "input", "file", "range", "select", "radio", "checkbox", "label", "textarea", "inputerror", "input-label", "validation-message", "progress-steps", "active-progress-step", "progress-step", "progress-step-line", "loader", "loading", "styled", "top", "top-start", "top-end", "top-left", "top-right", "center", "center-start", "center-end", "center-left", "center-right", "bottom", "bottom-start", "bottom-end", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen", "rtl", "timer-progress-bar", "timer-progress-bar-container", "scrollbar-measure", "icon-success", "icon-warning", "icon-info", "icon-question", "icon-error"].reduce((function(t, e) {
        return t[e] = b + e,
        t
    }
    ), {})
      , w = ["success", "warning", "info", "question", "error"].reduce((function(t, e) {
        return t[e] = b + e,
        t
    }
    ), {})
      , C = "SweetAlert2:"
      , A = function(t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
    }
      , k = function(t) {
        console.warn("".concat(C, " ").concat("object" === m(t) ? t.join(" ") : t))
    }
      , E = function(t) {
        console.error("".concat(C, " ").concat(t))
    }
      , P = []
      , B = function(t, e) {
        var n;
        n = '"'.concat(t, '" is deprecated and will be removed in the next major release. Please use "').concat(e, '" instead.'),
        P.includes(n) || (P.push(n),
        k(n))
    }
      , T = function(t) {
        return "function" == typeof t ? t() : t
    }
      , x = function(t) {
        return t && "function" == typeof t.toPromise
    }
      , S = function(t) {
        return x(t) ? t.toPromise() : Promise.resolve(t)
    }
      , L = function(t) {
        return t && Promise.resolve(t) === t
    }
      , O = function() {
        return document.body.querySelector(".".concat(y.container))
    }
      , j = function(t) {
        var e = O();
        return e ? e.querySelector(t) : null
    }
      , M = function(t) {
        return j(".".concat(t))
    }
      , I = function() {
        return M(y.popup)
    }
      , H = function() {
        return M(y.icon)
    }
      , D = function() {
        return M(y.title)
    }
      , q = function() {
        return M(y["html-container"])
    }
      , V = function() {
        return M(y.image)
    }
      , _ = function() {
        return M(y["progress-steps"])
    }
      , R = function() {
        return M(y["validation-message"])
    }
      , N = function() {
        return j(".".concat(y.actions, " .").concat(y.confirm))
    }
      , F = function() {
        return j(".".concat(y.actions, " .").concat(y.cancel))
    }
      , U = function() {
        return j(".".concat(y.actions, " .").concat(y.deny))
    }
      , z = function() {
        return j(".".concat(y.loader))
    }
      , W = function() {
        return M(y.actions)
    }
      , K = function() {
        return M(y.footer)
    }
      , Y = function() {
        return M(y["timer-progress-bar"])
    }
      , Z = function() {
        return M(y.close)
    }
      , $ = function() {
        var t = I();
        if (!t)
            return [];
        var e = t.querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')
          , n = Array.from(e).sort((function(t, e) {
            var n = parseInt(t.getAttribute("tabindex") || "0")
              , o = parseInt(e.getAttribute("tabindex") || "0");
            return n > o ? 1 : n < o ? -1 : 0
        }
        ))
          , o = t.querySelectorAll('\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n')
          , i = Array.from(o).filter((function(t) {
            return "-1" !== t.getAttribute("tabindex")
        }
        ));
        return f(new Set(n.concat(i))).filter((function(t) {
            return pt(t)
        }
        ))
    }
      , J = function() {
        return Q(document.body, y.shown) && !Q(document.body, y["toast-shown"]) && !Q(document.body, y["no-backdrop"])
    }
      , X = function() {
        var t = I();
        return !!t && Q(t, y.toast)
    }
      , G = function(t, e) {
        if (t.textContent = "",
        e) {
            var n = (new DOMParser).parseFromString(e, "text/html")
              , o = n.querySelector("head");
            o && Array.from(o.childNodes).forEach((function(e) {
                t.appendChild(e)
            }
            ));
            var i = n.querySelector("body");
            i && Array.from(i.childNodes).forEach((function(e) {
                e instanceof HTMLVideoElement || e instanceof HTMLAudioElement ? t.appendChild(e.cloneNode(!0)) : t.appendChild(e)
            }
            ))
        }
    }
      , Q = function(t, e) {
        if (!e)
            return !1;
        for (var n = e.split(/\s+/), o = 0; o < n.length; o++)
            if (!t.classList.contains(n[o]))
                return !1;
        return !0
    }
      , tt = function(t, e, n) {
        if (function(t, e) {
            Array.from(t.classList).forEach((function(n) {
                Object.values(y).includes(n) || Object.values(w).includes(n) || Object.values(e.showClass || {}).includes(n) || t.classList.remove(n)
            }
            ))
        }(t, e),
        e.customClass && e.customClass[n]) {
            if ("string" != typeof e.customClass[n] && !e.customClass[n].forEach)
                return void k("Invalid type of customClass.".concat(n, '! Expected string or iterable object, got "').concat(m(e.customClass[n]), '"'));
            it(t, e.customClass[n])
        }
    }
      , et = function(t, e) {
        if (!e)
            return null;
        switch (e) {
        case "select":
        case "textarea":
        case "file":
            return t.querySelector(".".concat(y.popup, " > .").concat(y[e]));
        case "checkbox":
            return t.querySelector(".".concat(y.popup, " > .").concat(y.checkbox, " input"));
        case "radio":
            return t.querySelector(".".concat(y.popup, " > .").concat(y.radio, " input:checked")) || t.querySelector(".".concat(y.popup, " > .").concat(y.radio, " input:first-child"));
        case "range":
            return t.querySelector(".".concat(y.popup, " > .").concat(y.range, " input"));
        default:
            return t.querySelector(".".concat(y.popup, " > .").concat(y.input))
        }
    }
      , nt = function(t) {
        if (t.focus(),
        "file" !== t.type) {
            var e = t.value;
            t.value = "",
            t.value = e
        }
    }
      , ot = function(t, e, n) {
        t && e && ("string" == typeof e && (e = e.split(/\s+/).filter(Boolean)),
        e.forEach((function(e) {
            Array.isArray(t) ? t.forEach((function(t) {
                n ? t.classList.add(e) : t.classList.remove(e)
            }
            )) : n ? t.classList.add(e) : t.classList.remove(e)
        }
        )))
    }
      , it = function(t, e) {
        ot(t, e, !0)
    }
      , rt = function(t, e) {
        ot(t, e, !1)
    }
      , at = function(t, e) {
        for (var n = Array.from(t.children), o = 0; o < n.length; o++) {
            var i = n[o];
            if (i instanceof HTMLElement && Q(i, e))
                return i
        }
    }
      , ct = function(t, e, n) {
        n === "".concat(parseInt(n)) && (n = parseInt(n)),
        n || 0 === parseInt(n) ? t.style.setProperty(e, "number" == typeof n ? "".concat(n, "px") : n) : t.style.removeProperty(e)
    }
      , ut = function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "flex";
        t && (t.style.display = e)
    }
      , st = function(t) {
        t && (t.style.display = "none")
    }
      , lt = function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "block";
        t && new MutationObserver((function() {
            ft(t, t.innerHTML, e)
        }
        )).observe(t, {
            childList: !0,
            subtree: !0
        })
    }
      , dt = function(t, e, n, o) {
        var i = t.querySelector(e);
        i && i.style.setProperty(n, o)
    }
      , ft = function(t, e) {
        e ? ut(t, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "flex") : st(t)
    }
      , pt = function(t) {
        return !(!t || !(t.offsetWidth || t.offsetHeight || t.getClientRects().length))
    }
      , mt = function(t) {
        return !!(t.scrollHeight > t.clientHeight)
    }
      , ht = function(t) {
        var e = window.getComputedStyle(t)
          , n = parseFloat(e.getPropertyValue("animation-duration") || "0")
          , o = parseFloat(e.getPropertyValue("transition-duration") || "0");
        return n > 0 || o > 0
    }
      , vt = function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
          , n = Y();
        n && pt(n) && (e && (n.style.transition = "none",
        n.style.width = "100%"),
        setTimeout((function() {
            n.style.transition = "width ".concat(t / 1e3, "s linear"),
            n.style.width = "0%"
        }
        ), 10))
    }
      , gt = function() {
        return "undefined" == typeof window || "undefined" == typeof document
    }
      , bt = '\n <div aria-labelledby="'.concat(y.title, '" aria-describedby="').concat(y["html-container"], '" class="').concat(y.popup, '" tabindex="-1">\n   <button type="button" class="').concat(y.close, '"></button>\n   <ul class="').concat(y["progress-steps"], '"></ul>\n   <div class="').concat(y.icon, '"></div>\n   <img class="').concat(y.image, '" />\n   <h2 class="').concat(y.title, '" id="').concat(y.title, '"></h2>\n   <div class="').concat(y["html-container"], '" id="').concat(y["html-container"], '"></div>\n   <input class="').concat(y.input, '" id="').concat(y.input, '" />\n   <input type="file" class="').concat(y.file, '" />\n   <div class="').concat(y.range, '">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="').concat(y.select, '" id="').concat(y.select, '"></select>\n   <div class="').concat(y.radio, '"></div>\n   <label class="').concat(y.checkbox, '">\n     <input type="checkbox" id="').concat(y.checkbox, '" />\n     <span class="').concat(y.label, '"></span>\n   </label>\n   <textarea class="').concat(y.textarea, '" id="').concat(y.textarea, '"></textarea>\n   <div class="').concat(y["validation-message"], '" id="').concat(y["validation-message"], '"></div>\n   <div class="').concat(y.actions, '">\n     <div class="').concat(y.loader, '"></div>\n     <button type="button" class="').concat(y.confirm, '"></button>\n     <button type="button" class="').concat(y.deny, '"></button>\n     <button type="button" class="').concat(y.cancel, '"></button>\n   </div>\n   <div class="').concat(y.footer, '"></div>\n   <div class="').concat(y["timer-progress-bar-container"], '">\n     <div class="').concat(y["timer-progress-bar"], '"></div>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, "")
      , yt = function() {
        v.currentInstance.resetValidationMessage()
    }
      , wt = function(t) {
        var e, n = !!(e = O()) && (e.remove(),
        rt([document.documentElement, document.body], [y["no-backdrop"], y["toast-shown"], y["has-column"]]),
        !0);
        if (gt())
            E("SweetAlert2 requires document to initialize");
        else {
            var o = document.createElement("div");
            o.className = y.container,
            n && it(o, y["no-transition"]),
            G(o, bt);
            var i, r, a, c, u, s, l, d, f, p = "string" == typeof (i = t.target) ? document.querySelector(i) : i;
            p.appendChild(o),
            function(t) {
                var e = I();
                e.setAttribute("role", t.toast ? "alert" : "dialog"),
                e.setAttribute("aria-live", t.toast ? "polite" : "assertive"),
                t.toast || e.setAttribute("aria-modal", "true")
            }(t),
            function(t) {
                "rtl" === window.getComputedStyle(t).direction && it(O(), y.rtl)
            }(p),
            r = I(),
            a = at(r, y.input),
            c = at(r, y.file),
            u = r.querySelector(".".concat(y.range, " input")),
            s = r.querySelector(".".concat(y.range, " output")),
            l = at(r, y.select),
            d = r.querySelector(".".concat(y.checkbox, " input")),
            f = at(r, y.textarea),
            a.oninput = yt,
            c.onchange = yt,
            l.onchange = yt,
            d.onchange = yt,
            f.oninput = yt,
            u.oninput = function() {
                yt(),
                s.value = u.value
            }
            ,
            u.onchange = function() {
                yt(),
                s.value = u.value
            }
        }
    }
      , Ct = function(t, e) {
        t instanceof HTMLElement ? e.appendChild(t) : "object" === m(t) ? At(t, e) : t && G(e, t)
    }
      , At = function(t, e) {
        t.jquery ? kt(e, t) : G(e, t.toString())
    }
      , kt = function(t, e) {
        if (t.textContent = "",
        0 in e)
            for (var n = 0; n in e; n++)
                t.appendChild(e[n].cloneNode(!0));
        else
            t.appendChild(e.cloneNode(!0))
    }
      , Et = function() {
        if (gt())
            return !1;
        var t = document.createElement("div");
        return void 0 !== t.style.webkitAnimation ? "webkitAnimationEnd" : void 0 !== t.style.animation && "animationend"
    }()
      , Pt = function(t, e) {
        var n = W()
          , o = z();
        n && o && (e.showConfirmButton || e.showDenyButton || e.showCancelButton ? ut(n) : st(n),
        tt(n, e, "actions"),
        function(t, e, n) {
            var o = N()
              , i = U()
              , r = F();
            if (!o || !i || !r)
                return;
            Bt(o, "confirm", n),
            Bt(i, "deny", n),
            Bt(r, "cancel", n),
            function(t, e, n, o) {
                if (!o.buttonsStyling)
                    return void rt([t, e, n], y.styled);
                it([t, e, n], y.styled),
                o.confirmButtonColor && (t.style.backgroundColor = o.confirmButtonColor,
                it(t, y["default-outline"]));
                o.denyButtonColor && (e.style.backgroundColor = o.denyButtonColor,
                it(e, y["default-outline"]));
                o.cancelButtonColor && (n.style.backgroundColor = o.cancelButtonColor,
                it(n, y["default-outline"]))
            }(o, i, r, n),
            n.reverseButtons && (n.toast ? (t.insertBefore(r, o),
            t.insertBefore(i, o)) : (t.insertBefore(r, e),
            t.insertBefore(i, e),
            t.insertBefore(o, e)))
        }(n, o, e),
        G(o, e.loaderHtml || ""),
        tt(o, e, "loader"))
    };
    function Bt(t, e, n) {
        var o = A(e);
        ft(t, n["show".concat(o, "Button")], "inline-block"),
        G(t, n["".concat(e, "ButtonText")] || ""),
        t.setAttribute("aria-label", n["".concat(e, "ButtonAriaLabel")] || ""),
        t.className = y[e],
        tt(t, n, "".concat(e, "Button"))
    }
    var Tt = function(t, e) {
        var n = O();
        n && (!function(t, e) {
            "string" == typeof e ? t.style.background = e : e || it([document.documentElement, document.body], y["no-backdrop"])
        }(n, e.backdrop),
        function(t, e) {
            if (!e)
                return;
            e in y ? it(t, y[e]) : (k('The "position" parameter is not valid, defaulting to "center"'),
            it(t, y.center))
        }(n, e.position),
        function(t, e) {
            if (!e)
                return;
            it(t, y["grow-".concat(e)])
        }(n, e.grow),
        tt(n, e, "container"))
    };
    var xt = {
        innerParams: new WeakMap,
        domCache: new WeakMap
    }
      , St = ["input", "file", "range", "select", "radio", "checkbox", "textarea"]
      , Lt = function(t) {
        if (t.input)
            if (qt[t.input]) {
                var e = Ht(t.input)
                  , n = qt[t.input](e, t);
                ut(e),
                t.inputAutoFocus && setTimeout((function() {
                    nt(n)
                }
                ))
            } else
                E("Unexpected type of input! Expected ".concat(Object.keys(qt).join(" | "), ', got "').concat(t.input, '"'))
    }
      , Ot = function(t, e) {
        var n = et(I(), t);
        if (n)
            for (var o in function(t) {
                for (var e = 0; e < t.attributes.length; e++) {
                    var n = t.attributes[e].name;
                    ["id", "type", "value", "style"].includes(n) || t.removeAttribute(n)
                }
            }(n),
            e)
                n.setAttribute(o, e[o])
    }
      , jt = function(t) {
        var e = Ht(t.input);
        "object" === m(t.customClass) && it(e, t.customClass.input)
    }
      , Mt = function(t, e) {
        t.placeholder && !e.inputPlaceholder || (t.placeholder = e.inputPlaceholder)
    }
      , It = function(t, e, n) {
        if (n.inputLabel) {
            var o = document.createElement("label")
              , i = y["input-label"];
            o.setAttribute("for", t.id),
            o.className = i,
            "object" === m(n.customClass) && it(o, n.customClass.inputLabel),
            o.innerText = n.inputLabel,
            e.insertAdjacentElement("beforebegin", o)
        }
    }
      , Ht = function(t) {
        return at(I(), y[t] || y.input)
    }
      , Dt = function(t, e) {
        ["string", "number"].includes(m(e)) ? t.value = "".concat(e) : L(e) || k('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(m(e), '"'))
    }
      , qt = {};
    qt.text = qt.email = qt.password = qt.number = qt.tel = qt.url = qt.search = qt.date = qt["datetime-local"] = qt.time = qt.week = qt.month = function(t, e) {
        return Dt(t, e.inputValue),
        It(t, t, e),
        Mt(t, e),
        t.type = e.input,
        t
    }
    ,
    qt.file = function(t, e) {
        return It(t, t, e),
        Mt(t, e),
        t
    }
    ,
    qt.range = function(t, e) {
        var n = t.querySelector("input")
          , o = t.querySelector("output");
        return Dt(n, e.inputValue),
        n.type = e.input,
        Dt(o, e.inputValue),
        It(n, t, e),
        t
    }
    ,
    qt.select = function(t, e) {
        if (t.textContent = "",
        e.inputPlaceholder) {
            var n = document.createElement("option");
            G(n, e.inputPlaceholder),
            n.value = "",
            n.disabled = !0,
            n.selected = !0,
            t.appendChild(n)
        }
        return It(t, t, e),
        t
    }
    ,
    qt.radio = function(t) {
        return t.textContent = "",
        t
    }
    ,
    qt.checkbox = function(t, e) {
        var n = et(I(), "checkbox");
        n.value = "1",
        n.checked = Boolean(e.inputValue);
        var o = t.querySelector("span");
        return G(o, e.inputPlaceholder),
        n
    }
    ,
    qt.textarea = function(t, e) {
        Dt(t, e.inputValue),
        Mt(t, e),
        It(t, t, e);
        return setTimeout((function() {
            if ("MutationObserver"in window) {
                var n = parseInt(window.getComputedStyle(I()).width);
                new MutationObserver((function() {
                    if (document.body.contains(t)) {
                        var o, i = t.offsetWidth + (o = t,
                        parseInt(window.getComputedStyle(o).marginLeft) + parseInt(window.getComputedStyle(o).marginRight));
                        i > n ? I().style.width = "".concat(i, "px") : ct(I(), "width", e.width)
                    }
                }
                )).observe(t, {
                    attributes: !0,
                    attributeFilter: ["style"]
                })
            }
        }
        )),
        t
    }
    ;
    var Vt = function(t, e) {
        var n = q();
        n && (lt(n),
        tt(n, e, "htmlContainer"),
        e.html ? (Ct(e.html, n),
        ut(n, "block")) : e.text ? (n.textContent = e.text,
        ut(n, "block")) : st(n),
        function(t, e) {
            var n = I();
            if (n) {
                var o = xt.innerParams.get(t)
                  , i = !o || e.input !== o.input;
                St.forEach((function(t) {
                    var o = at(n, y[t]);
                    o && (Ot(t, e.inputAttributes),
                    o.className = y[t],
                    i && st(o))
                }
                )),
                e.input && (i && Lt(e),
                jt(e))
            }
        }(t, e))
    }
      , _t = function(t, e) {
        for (var n = 0, o = Object.entries(w); n < o.length; n++) {
            var i = d(o[n], 2)
              , r = i[0]
              , a = i[1];
            e.icon !== r && rt(t, a)
        }
        it(t, e.icon && w[e.icon]),
        Ft(t, e),
        Rt(),
        tt(t, e, "icon")
    }
      , Rt = function() {
        var t = I();
        if (t)
            for (var e = window.getComputedStyle(t).getPropertyValue("background-color"), n = t.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"), o = 0; o < n.length; o++)
                n[o].style.backgroundColor = e
    }
      , Nt = function(t, e) {
        if (e.icon || e.iconHtml) {
            var n = t.innerHTML
              , o = "";
            if (e.iconHtml)
                o = Ut(e.iconHtml);
            else if ("success" === e.icon)
                o = '\n  <div class="swal2-success-circular-line-left"></div>\n  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n  <div class="swal2-success-circular-line-right"></div>\n',
                n = n.replace(/ style=".*?"/g, "");
            else if ("error" === e.icon)
                o = '\n  <span class="swal2-x-mark">\n    <span class="swal2-x-mark-line-left"></span>\n    <span class="swal2-x-mark-line-right"></span>\n  </span>\n';
            else if (e.icon) {
                o = Ut({
                    question: "?",
                    warning: "!",
                    info: "i"
                }[e.icon])
            }
            n.trim() !== o.trim() && G(t, o)
        }
    }
      , Ft = function(t, e) {
        if (e.iconColor) {
            t.style.color = e.iconColor,
            t.style.borderColor = e.iconColor;
            for (var n = 0, o = [".swal2-success-line-tip", ".swal2-success-line-long", ".swal2-x-mark-line-left", ".swal2-x-mark-line-right"]; n < o.length; n++) {
                dt(t, o[n], "background-color", e.iconColor)
            }
            dt(t, ".swal2-success-ring", "border-color", e.iconColor)
        }
    }
      , Ut = function(t) {
        return '<div class="'.concat(y["icon-content"], '">').concat(t, "</div>")
    }
      , zt = function(t, e) {
        var n = e.showClass || {};
        t.className = "".concat(y.popup, " ").concat(pt(t) ? n.popup : ""),
        e.toast ? (it([document.documentElement, document.body], y["toast-shown"]),
        it(t, y.toast)) : it(t, y.modal),
        tt(t, e, "popup"),
        "string" == typeof e.customClass && it(t, e.customClass),
        e.icon && it(t, y["icon-".concat(e.icon)])
    }
      , Wt = function(t) {
        var e = document.createElement("li");
        return it(e, y["progress-step"]),
        G(e, t),
        e
    }
      , Kt = function(t) {
        var e = document.createElement("li");
        return it(e, y["progress-step-line"]),
        t.progressStepsDistance && ct(e, "width", t.progressStepsDistance),
        e
    }
      , Yt = function(t, e) {
        !function(t, e) {
            var n = O()
              , o = I();
            if (n && o) {
                if (e.toast) {
                    ct(n, "width", e.width),
                    o.style.width = "100%";
                    var i = z();
                    i && o.insertBefore(i, H())
                } else
                    ct(o, "width", e.width);
                ct(o, "padding", e.padding),
                e.color && (o.style.color = e.color),
                e.background && (o.style.background = e.background),
                st(R()),
                zt(o, e)
            }
        }(0, e),
        Tt(0, e),
        function(t, e) {
            var n = _();
            if (n) {
                var o = e.progressSteps
                  , i = e.currentProgressStep;
                o && 0 !== o.length && void 0 !== i ? (ut(n),
                n.textContent = "",
                i >= o.length && k("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),
                o.forEach((function(t, r) {
                    var a = Wt(t);
                    if (n.appendChild(a),
                    r === i && it(a, y["active-progress-step"]),
                    r !== o.length - 1) {
                        var c = Kt(e);
                        n.appendChild(c)
                    }
                }
                ))) : st(n)
            }
        }(0, e),
        function(t, e) {
            var n = xt.innerParams.get(t)
              , o = H();
            if (o) {
                if (n && e.icon === n.icon)
                    return Nt(o, e),
                    void _t(o, e);
                if (e.icon || e.iconHtml) {
                    if (e.icon && -1 === Object.keys(w).indexOf(e.icon))
                        return E('Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(e.icon, '"')),
                        void st(o);
                    ut(o),
                    Nt(o, e),
                    _t(o, e),
                    it(o, e.showClass && e.showClass.icon)
                } else
                    st(o)
            }
        }(t, e),
        function(t, e) {
            var n = V();
            n && (e.imageUrl ? (ut(n, ""),
            n.setAttribute("src", e.imageUrl),
            n.setAttribute("alt", e.imageAlt || ""),
            ct(n, "width", e.imageWidth),
            ct(n, "height", e.imageHeight),
            n.className = y.image,
            tt(n, e, "image")) : st(n))
        }(0, e),
        function(t, e) {
            var n = D();
            n && (lt(n),
            ft(n, e.title || e.titleText, "block"),
            e.title && Ct(e.title, n),
            e.titleText && (n.innerText = e.titleText),
            tt(n, e, "title"))
        }(0, e),
        function(t, e) {
            var n = Z();
            n && (G(n, e.closeButtonHtml || ""),
            tt(n, e, "closeButton"),
            ft(n, e.showCloseButton),
            n.setAttribute("aria-label", e.closeButtonAriaLabel || ""))
        }(0, e),
        Vt(t, e),
        Pt(0, e),
        function(t, e) {
            var n = K();
            n && (lt(n),
            ft(n, e.footer, "block"),
            e.footer && Ct(e.footer, n),
            tt(n, e, "footer"))
        }(0, e);
        var n = I();
        "function" == typeof e.didRender && n && e.didRender(n)
    }
      , Zt = function() {
        var t;
        return null === (t = N()) || void 0 === t ? void 0 : t.click()
    }
      , $t = Object.freeze({
        cancel: "cancel",
        backdrop: "backdrop",
        close: "close",
        esc: "esc",
        timer: "timer"
    })
      , Jt = function(t) {
        t.keydownTarget && t.keydownHandlerAdded && (t.keydownTarget.removeEventListener("keydown", t.keydownHandler, {
            capture: t.keydownListenerCapture
        }),
        t.keydownHandlerAdded = !1)
    }
      , Xt = function(t, e) {
        var n, o = $();
        if (o.length)
            return (t += e) === o.length ? t = 0 : -1 === t && (t = o.length - 1),
            void o[t].focus();
        null === (n = I()) || void 0 === n || n.focus()
    }
      , Gt = ["ArrowRight", "ArrowDown"]
      , Qt = ["ArrowLeft", "ArrowUp"]
      , te = function(t, e, n) {
        t && (e.isComposing || 229 === e.keyCode || (t.stopKeydownPropagation && e.stopPropagation(),
        "Enter" === e.key ? ee(e, t) : "Tab" === e.key ? ne(e) : [].concat(Gt, Qt).includes(e.key) ? oe(e.key) : "Escape" === e.key && ie(e, t, n)))
    }
      , ee = function(t, e) {
        if (T(e.allowEnterKey)) {
            var n = et(I(), e.input);
            if (t.target && n && t.target instanceof HTMLElement && t.target.outerHTML === n.outerHTML) {
                if (["textarea", "file"].includes(e.input))
                    return;
                Zt(),
                t.preventDefault()
            }
        }
    }
      , ne = function(t) {
        for (var e = t.target, n = $(), o = -1, i = 0; i < n.length; i++)
            if (e === n[i]) {
                o = i;
                break
            }
        t.shiftKey ? Xt(o, -1) : Xt(o, 1),
        t.stopPropagation(),
        t.preventDefault()
    }
      , oe = function(t) {
        var e = W()
          , n = N()
          , o = U()
          , i = F();
        if (e && n && o && i) {
            var r = [n, o, i];
            if (!(document.activeElement instanceof HTMLElement) || r.includes(document.activeElement)) {
                var a = Gt.includes(t) ? "nextElementSibling" : "previousElementSibling"
                  , c = document.activeElement;
                if (c) {
                    for (var u = 0; u < e.children.length; u++) {
                        if (!(c = c[a]))
                            return;
                        if (c instanceof HTMLButtonElement && pt(c))
                            break
                    }
                    c instanceof HTMLButtonElement && c.focus()
                }
            }
        }
    }
      , ie = function(t, e, n) {
        T(e.allowEscapeKey) && (t.preventDefault(),
        n($t.esc))
    }
      , re = {
        swalPromiseResolve: new WeakMap,
        swalPromiseReject: new WeakMap
    }
      , ae = function() {
        Array.from(document.body.children).forEach((function(t) {
            t.hasAttribute("data-previous-aria-hidden") ? (t.setAttribute("aria-hidden", t.getAttribute("data-previous-aria-hidden") || ""),
            t.removeAttribute("data-previous-aria-hidden")) : t.removeAttribute("aria-hidden")
        }
        ))
    }
      , ce = "undefined" != typeof window && !!window.GestureEvent
      , ue = function() {
        var t, e = O();
        e && (e.ontouchstart = function(e) {
            t = se(e)
        }
        ,
        e.ontouchmove = function(e) {
            t && (e.preventDefault(),
            e.stopPropagation())
        }
        )
    }
      , se = function(t) {
        var e = t.target
          , n = O()
          , o = q();
        return !(!n || !o) && (!le(t) && !de(t) && (e === n || !mt(n) && e instanceof HTMLElement && "INPUT" !== e.tagName && "TEXTAREA" !== e.tagName && (!mt(o) || !o.contains(e))))
    }
      , le = function(t) {
        return t.touches && t.touches.length && "stylus" === t.touches[0].touchType
    }
      , de = function(t) {
        return t.touches && t.touches.length > 1
    }
      , fe = null
      , pe = function(t) {
        null === fe && (document.body.scrollHeight > window.innerHeight || "scroll" === t) && (fe = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),
        document.body.style.paddingRight = "".concat(fe + function() {
            var t = document.createElement("div");
            t.className = y["scrollbar-measure"],
            document.body.appendChild(t);
            var e = t.getBoundingClientRect().width - t.clientWidth;
            return document.body.removeChild(t),
            e
        }(), "px"))
    };
    function me(t, e, n, o) {
        X() ? Ae(t, o) : (g(n).then((function() {
            return Ae(t, o)
        }
        )),
        Jt(v)),
        ce ? (e.setAttribute("style", "display:none !important"),
        e.removeAttribute("class"),
        e.innerHTML = "") : e.remove(),
        J() && (null !== fe && (document.body.style.paddingRight = "".concat(fe, "px"),
        fe = null),
        function() {
            if (Q(document.body, y.iosfix)) {
                var t = parseInt(document.body.style.top, 10);
                rt(document.body, y.iosfix),
                document.body.style.top = "",
                document.body.scrollTop = -1 * t
            }
        }(),
        ae()),
        rt([document.documentElement, document.body], [y.shown, y["height-auto"], y["no-backdrop"], y["toast-shown"]])
    }
    function he(t) {
        t = ye(t);
        var e = re.swalPromiseResolve.get(this)
          , n = ve(this);
        this.isAwaitingPromise ? t.isDismissed || (be(this),
        e(t)) : n && e(t)
    }
    var ve = function(t) {
        var e = I();
        if (!e)
            return !1;
        var n = xt.innerParams.get(t);
        if (!n || Q(e, n.hideClass.popup))
            return !1;
        rt(e, n.showClass.popup),
        it(e, n.hideClass.popup);
        var o = O();
        return rt(o, n.showClass.backdrop),
        it(o, n.hideClass.backdrop),
        we(t, e, n),
        !0
    };
    function ge(t) {
        var e = re.swalPromiseReject.get(this);
        be(this),
        e && e(t)
    }
    var be = function(t) {
        t.isAwaitingPromise && (delete t.isAwaitingPromise,
        xt.innerParams.get(t) || t._destroy())
    }
      , ye = function(t) {
        return void 0 === t ? {
            isConfirmed: !1,
            isDenied: !1,
            isDismissed: !0
        } : Object.assign({
            isConfirmed: !1,
            isDenied: !1,
            isDismissed: !1
        }, t)
    }
      , we = function(t, e, n) {
        var o = O()
          , i = Et && ht(e);
        "function" == typeof n.willClose && n.willClose(e),
        i ? Ce(t, e, o, n.returnFocus, n.didClose) : me(t, o, n.returnFocus, n.didClose)
    }
      , Ce = function(t, e, n, o, i) {
        Et && (v.swalCloseEventFinishedCallback = me.bind(null, t, n, o, i),
        e.addEventListener(Et, (function(t) {
            t.target === e && (v.swalCloseEventFinishedCallback(),
            delete v.swalCloseEventFinishedCallback)
        }
        )))
    }
      , Ae = function(t, e) {
        setTimeout((function() {
            "function" == typeof e && e.bind(t.params)(),
            t._destroy && t._destroy()
        }
        ))
    }
      , ke = function(t) {
        var e = I();
        if (e || new oo,
        e = I()) {
            var n = z();
            X() ? st(H()) : Ee(e, t),
            ut(n),
            e.setAttribute("data-loading", "true"),
            e.setAttribute("aria-busy", "true"),
            e.focus()
        }
    }
      , Ee = function(t, e) {
        var n = W()
          , o = z();
        n && o && (!e && pt(N()) && (e = N()),
        ut(n),
        e && (st(e),
        o.setAttribute("data-button-to-replace", e.className),
        n.insertBefore(o, e)),
        it([t, n], y.loading))
    }
      , Pe = function(t) {
        return t.checked ? 1 : 0
    }
      , Be = function(t) {
        return t.checked ? t.value : null
    }
      , Te = function(t) {
        return t.files && t.files.length ? null !== t.getAttribute("multiple") ? t.files : t.files[0] : null
    }
      , xe = function(t, e) {
        var n = I();
        if (n) {
            var o = function(t) {
                "select" === e.input ? function(t, e, n) {
                    var o = at(t, y.select);
                    if (!o)
                        return;
                    var i = function(t, e, o) {
                        var i = document.createElement("option");
                        i.value = o,
                        G(i, e),
                        i.selected = Oe(o, n.inputValue),
                        t.appendChild(i)
                    };
                    e.forEach((function(t) {
                        var e = t[0]
                          , n = t[1];
                        if (Array.isArray(n)) {
                            var r = document.createElement("optgroup");
                            r.label = e,
                            r.disabled = !1,
                            o.appendChild(r),
                            n.forEach((function(t) {
                                return i(r, t[1], t[0])
                            }
                            ))
                        } else
                            i(o, n, e)
                    }
                    )),
                    o.focus()
                }(n, Le(t), e) : "radio" === e.input && function(t, e, n) {
                    var o = at(t, y.radio);
                    if (!o)
                        return;
                    e.forEach((function(t) {
                        var e = t[0]
                          , i = t[1]
                          , r = document.createElement("input")
                          , a = document.createElement("label");
                        r.type = "radio",
                        r.name = y.radio,
                        r.value = e,
                        Oe(e, n.inputValue) && (r.checked = !0);
                        var c = document.createElement("span");
                        G(c, i),
                        c.className = y.label,
                        a.appendChild(r),
                        a.appendChild(c),
                        o.appendChild(a)
                    }
                    ));
                    var i = o.querySelectorAll("input");
                    i.length && i[0].focus()
                }(n, Le(t), e)
            };
            x(e.inputOptions) || L(e.inputOptions) ? (ke(N()),
            S(e.inputOptions).then((function(e) {
                t.hideLoading(),
                o(e)
            }
            ))) : "object" === m(e.inputOptions) ? o(e.inputOptions) : E("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(m(e.inputOptions)))
        }
    }
      , Se = function(t, e) {
        var n = t.getInput();
        n && (st(n),
        S(e.inputValue).then((function(o) {
            n.value = "number" === e.input ? "".concat(parseFloat(o) || 0) : "".concat(o),
            ut(n),
            n.focus(),
            t.hideLoading()
        }
        )).catch((function(e) {
            E("Error in inputValue promise: ".concat(e)),
            n.value = "",
            ut(n),
            n.focus(),
            t.hideLoading()
        }
        )))
    };
    var Le = function t(e) {
        var n = [];
        return e instanceof Map ? e.forEach((function(e, o) {
            var i = e;
            "object" === m(i) && (i = t(i)),
            n.push([o, i])
        }
        )) : Object.keys(e).forEach((function(o) {
            var i = e[o];
            "object" === m(i) && (i = t(i)),
            n.push([o, i])
        }
        )),
        n
    }
      , Oe = function(t, e) {
        return !!e && e.toString() === t.toString()
    }
      , je = void 0
      , Me = function(t, e) {
        var n = xt.innerParams.get(t);
        if (n.input) {
            var o = t.getInput()
              , i = function(t, e) {
                var n = t.getInput();
                if (!n)
                    return null;
                switch (e.input) {
                case "checkbox":
                    return Pe(n);
                case "radio":
                    return Be(n);
                case "file":
                    return Te(n);
                default:
                    return e.inputAutoTrim ? n.value.trim() : n.value
                }
            }(t, n);
            n.inputValidator ? Ie(t, i, e) : o && !o.checkValidity() ? (t.enableButtons(),
            t.showValidationMessage(n.validationMessage || o.validationMessage)) : "deny" === e ? He(t, i) : Ve(t, i)
        } else
            E('The "input" parameter is needed to be set when using returnInputValueOn'.concat(A(e)))
    }
      , Ie = function(t, e, n) {
        var o = xt.innerParams.get(t);
        t.disableInput(),
        Promise.resolve().then((function() {
            return S(o.inputValidator(e, o.validationMessage))
        }
        )).then((function(o) {
            t.enableButtons(),
            t.enableInput(),
            o ? t.showValidationMessage(o) : "deny" === n ? He(t, e) : Ve(t, e)
        }
        ))
    }
      , He = function(t, e) {
        var n = xt.innerParams.get(t || je);
        (n.showLoaderOnDeny && ke(U()),
        n.preDeny) ? (t.isAwaitingPromise = !0,
        Promise.resolve().then((function() {
            return S(n.preDeny(e, n.validationMessage))
        }
        )).then((function(n) {
            !1 === n ? (t.hideLoading(),
            be(t)) : t.close({
                isDenied: !0,
                value: void 0 === n ? e : n
            })
        }
        )).catch((function(e) {
            return qe(t || je, e)
        }
        ))) : t.close({
            isDenied: !0,
            value: e
        })
    }
      , De = function(t, e) {
        t.close({
            isConfirmed: !0,
            value: e
        })
    }
      , qe = function(t, e) {
        t.rejectPromise(e)
    }
      , Ve = function(t, e) {
        var n = xt.innerParams.get(t || je);
        (n.showLoaderOnConfirm && ke(),
        n.preConfirm) ? (t.resetValidationMessage(),
        t.isAwaitingPromise = !0,
        Promise.resolve().then((function() {
            return S(n.preConfirm(e, n.validationMessage))
        }
        )).then((function(n) {
            pt(R()) || !1 === n ? (t.hideLoading(),
            be(t)) : De(t, void 0 === n ? e : n)
        }
        )).catch((function(e) {
            return qe(t || je, e)
        }
        ))) : De(t, e)
    };
    function _e() {
        var t = xt.innerParams.get(this);
        if (t) {
            var e = xt.domCache.get(this);
            st(e.loader),
            X() ? t.icon && ut(H()) : Re(e),
            rt([e.popup, e.actions], y.loading),
            e.popup.removeAttribute("aria-busy"),
            e.popup.removeAttribute("data-loading"),
            e.confirmButton.disabled = !1,
            e.denyButton.disabled = !1,
            e.cancelButton.disabled = !1
        }
    }
    var Re = function(t) {
        var e = t.popup.getElementsByClassName(t.loader.getAttribute("data-button-to-replace"));
        e.length ? ut(e[0], "inline-block") : pt(N()) || pt(U()) || pt(F()) || st(t.actions)
    };
    function Ne() {
        var t = xt.innerParams.get(this)
          , e = xt.domCache.get(this);
        return e ? et(e.popup, t.input) : null
    }
    function Fe(t, e, n) {
        var o = xt.domCache.get(t);
        e.forEach((function(t) {
            o[t].disabled = n
        }
        ))
    }
    function Ue(t, e) {
        var n = I();
        if (n && t)
            if ("radio" === t.type)
                for (var o = n.querySelectorAll('[name="'.concat(y.radio, '"]')), i = 0; i < o.length; i++)
                    o[i].disabled = e;
            else
                t.disabled = e
    }
    function ze() {
        Fe(this, ["confirmButton", "denyButton", "cancelButton"], !1)
    }
    function We() {
        Fe(this, ["confirmButton", "denyButton", "cancelButton"], !0)
    }
    function Ke() {
        Ue(this.getInput(), !1)
    }
    function Ye() {
        Ue(this.getInput(), !0)
    }
    function Ze(t) {
        var e = xt.domCache.get(this)
          , n = xt.innerParams.get(this);
        G(e.validationMessage, t),
        e.validationMessage.className = y["validation-message"],
        n.customClass && n.customClass.validationMessage && it(e.validationMessage, n.customClass.validationMessage),
        ut(e.validationMessage);
        var o = this.getInput();
        o && (o.setAttribute("aria-invalid", "true"),
        o.setAttribute("aria-describedby", y["validation-message"]),
        nt(o),
        it(o, y.inputerror))
    }
    function $e() {
        var t = xt.domCache.get(this);
        t.validationMessage && st(t.validationMessage);
        var e = this.getInput();
        e && (e.removeAttribute("aria-invalid"),
        e.removeAttribute("aria-describedby"),
        rt(e, y.inputerror))
    }
    var Je = {
        title: "",
        titleText: "",
        text: "",
        html: "",
        footer: "",
        icon: void 0,
        iconColor: void 0,
        iconHtml: void 0,
        template: void 0,
        toast: !1,
        animation: !0,
        showClass: {
            popup: "swal2-show",
            backdrop: "swal2-backdrop-show",
            icon: "swal2-icon-show"
        },
        hideClass: {
            popup: "swal2-hide",
            backdrop: "swal2-backdrop-hide",
            icon: "swal2-icon-hide"
        },
        customClass: {},
        target: "body",
        color: void 0,
        backdrop: !0,
        heightAuto: !0,
        allowOutsideClick: !0,
        allowEscapeKey: !0,
        allowEnterKey: !0,
        stopKeydownPropagation: !0,
        keydownListenerCapture: !1,
        showConfirmButton: !0,
        showDenyButton: !1,
        showCancelButton: !1,
        preConfirm: void 0,
        preDeny: void 0,
        confirmButtonText: "OK",
        confirmButtonAriaLabel: "",
        confirmButtonColor: void 0,
        denyButtonText: "No",
        denyButtonAriaLabel: "",
        denyButtonColor: void 0,
        cancelButtonText: "Cancel",
        cancelButtonAriaLabel: "",
        cancelButtonColor: void 0,
        buttonsStyling: !0,
        reverseButtons: !1,
        focusConfirm: !0,
        focusDeny: !1,
        focusCancel: !1,
        returnFocus: !0,
        showCloseButton: !1,
        closeButtonHtml: "&times;",
        closeButtonAriaLabel: "Close this dialog",
        loaderHtml: "",
        showLoaderOnConfirm: !1,
        showLoaderOnDeny: !1,
        imageUrl: void 0,
        imageWidth: void 0,
        imageHeight: void 0,
        imageAlt: "",
        timer: void 0,
        timerProgressBar: !1,
        width: void 0,
        padding: void 0,
        background: void 0,
        input: void 0,
        inputPlaceholder: "",
        inputLabel: "",
        inputValue: "",
        inputOptions: {},
        inputAutoFocus: !0,
        inputAutoTrim: !0,
        inputAttributes: {},
        inputValidator: void 0,
        returnInputValueOnDeny: !1,
        validationMessage: void 0,
        grow: !1,
        position: "center",
        progressSteps: [],
        currentProgressStep: void 0,
        progressStepsDistance: void 0,
        willOpen: void 0,
        didOpen: void 0,
        didRender: void 0,
        willClose: void 0,
        didClose: void 0,
        didDestroy: void 0,
        scrollbarPadding: !0
    }
      , Xe = ["allowEscapeKey", "allowOutsideClick", "background", "buttonsStyling", "cancelButtonAriaLabel", "cancelButtonColor", "cancelButtonText", "closeButtonAriaLabel", "closeButtonHtml", "color", "confirmButtonAriaLabel", "confirmButtonColor", "confirmButtonText", "currentProgressStep", "customClass", "denyButtonAriaLabel", "denyButtonColor", "denyButtonText", "didClose", "didDestroy", "footer", "hideClass", "html", "icon", "iconColor", "iconHtml", "imageAlt", "imageHeight", "imageUrl", "imageWidth", "preConfirm", "preDeny", "progressSteps", "returnFocus", "reverseButtons", "showCancelButton", "showCloseButton", "showConfirmButton", "showDenyButton", "text", "title", "titleText", "willClose"]
      , Ge = {}
      , Qe = ["allowOutsideClick", "allowEnterKey", "backdrop", "focusConfirm", "focusDeny", "focusCancel", "returnFocus", "heightAuto", "keydownListenerCapture"]
      , tn = function(t) {
        return Object.prototype.hasOwnProperty.call(Je, t)
    }
      , en = function(t) {
        return -1 !== Xe.indexOf(t)
    }
      , nn = function(t) {
        return Ge[t]
    }
      , on = function(t) {
        tn(t) || k('Unknown parameter "'.concat(t, '"'))
    }
      , rn = function(t) {
        Qe.includes(t) && k('The parameter "'.concat(t, '" is incompatible with toasts'))
    }
      , an = function(t) {
        var e = nn(t);
        e && B(t, e)
    };
    function cn(t) {
        var e = I()
          , n = xt.innerParams.get(this);
        if (e && !Q(e, n.hideClass.popup)) {
            var o = un(t)
              , i = Object.assign({}, n, o);
            Yt(this, i),
            xt.innerParams.set(this, i),
            Object.defineProperties(this, {
                params: {
                    value: Object.assign({}, this.params, t),
                    writable: !1,
                    enumerable: !0
                }
            })
        } else
            k("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.")
    }
    var un = function(t) {
        var e = {};
        return Object.keys(t).forEach((function(n) {
            en(n) ? e[n] = t[n] : k("Invalid parameter to update: ".concat(n))
        }
        )),
        e
    };
    function sn() {
        var t = xt.domCache.get(this)
          , e = xt.innerParams.get(this);
        e ? (t.popup && v.swalCloseEventFinishedCallback && (v.swalCloseEventFinishedCallback(),
        delete v.swalCloseEventFinishedCallback),
        "function" == typeof e.didDestroy && e.didDestroy(),
        ln(this)) : dn(this)
    }
    var ln = function(t) {
        dn(t),
        delete t.params,
        delete v.keydownHandler,
        delete v.keydownTarget,
        delete v.currentInstance
    }
      , dn = function(t) {
        t.isAwaitingPromise ? (fn(xt, t),
        t.isAwaitingPromise = !0) : (fn(re, t),
        fn(xt, t),
        delete t.isAwaitingPromise,
        delete t.disableButtons,
        delete t.enableButtons,
        delete t.getInput,
        delete t.disableInput,
        delete t.enableInput,
        delete t.hideLoading,
        delete t.disableLoading,
        delete t.showValidationMessage,
        delete t.resetValidationMessage,
        delete t.close,
        delete t.closePopup,
        delete t.closeModal,
        delete t.closeToast,
        delete t.rejectPromise,
        delete t.update,
        delete t._destroy)
    }
      , fn = function(t, e) {
        for (var n in t)
            t[n].delete(e)
    }
      , pn = Object.freeze({
        __proto__: null,
        _destroy: sn,
        close: he,
        closeModal: he,
        closePopup: he,
        closeToast: he,
        disableButtons: We,
        disableInput: Ye,
        disableLoading: _e,
        enableButtons: ze,
        enableInput: Ke,
        getInput: Ne,
        handleAwaitingPromise: be,
        hideLoading: _e,
        rejectPromise: ge,
        resetValidationMessage: $e,
        showValidationMessage: Ze,
        update: cn
    })
      , mn = function(t, e, n) {
        e.popup.onclick = function() {
            t && (hn(t) || t.timer || t.input) || n($t.close)
        }
    }
      , hn = function(t) {
        return !!(t.showConfirmButton || t.showDenyButton || t.showCancelButton || t.showCloseButton)
    }
      , vn = !1
      , gn = function(t) {
        t.popup.onmousedown = function() {
            t.container.onmouseup = function(e) {
                t.container.onmouseup = function() {}
                ,
                e.target === t.container && (vn = !0)
            }
        }
    }
      , bn = function(t) {
        t.container.onmousedown = function(e) {
            e.target === t.container && e.preventDefault(),
            t.popup.onmouseup = function(e) {
                t.popup.onmouseup = function() {}
                ,
                (e.target === t.popup || e.target instanceof HTMLElement && t.popup.contains(e.target)) && (vn = !0)
            }
        }
    }
      , yn = function(t, e, n) {
        e.container.onclick = function(o) {
            vn ? vn = !1 : o.target === e.container && T(t.allowOutsideClick) && n($t.backdrop)
        }
    }
      , wn = function(t) {
        return t instanceof Element || function(t) {
            return "object" === m(t) && t.jquery
        }(t)
    };
    var Cn = function() {
        if (v.timeout)
            return function() {
                var t = Y();
                if (t) {
                    var e = parseInt(window.getComputedStyle(t).width);
                    t.style.removeProperty("transition"),
                    t.style.width = "100%";
                    var n = e / parseInt(window.getComputedStyle(t).width) * 100;
                    t.style.width = "".concat(n, "%")
                }
            }(),
            v.timeout.stop()
    }
      , An = function() {
        if (v.timeout) {
            var t = v.timeout.start();
            return vt(t),
            t
        }
    }
      , kn = !1
      , En = {};
    var Pn, Bn = function(t) {
        for (var e = t.target; e && e !== document; e = e.parentNode)
            for (var n in En) {
                var o = e.getAttribute(n);
                if (o)
                    return void En[n].fire({
                        template: o
                    })
            }
    }, Tn = Object.freeze({
        __proto__: null,
        argsToParams: function(t) {
            var e = {};
            return "object" !== m(t[0]) || wn(t[0]) ? ["title", "html", "icon"].forEach((function(n, o) {
                var i = t[o];
                "string" == typeof i || wn(i) ? e[n] = i : void 0 !== i && E("Unexpected type of ".concat(n, '! Expected "string" or "Element", got ').concat(m(i)))
            }
            )) : Object.assign(e, t[0]),
            e
        },
        bindClickHandler: function() {
            En[arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "data-swal-template"] = this,
            kn || (document.body.addEventListener("click", Bn),
            kn = !0)
        },
        clickCancel: function() {
            var t;
            return null === (t = F()) || void 0 === t ? void 0 : t.click()
        },
        clickConfirm: Zt,
        clickDeny: function() {
            var t;
            return null === (t = U()) || void 0 === t ? void 0 : t.click()
        },
        enableLoading: ke,
        fire: function() {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
                e[n] = arguments[n];
            return function(t, e, n) {
                if (s())
                    return Reflect.construct.apply(null, arguments);
                var o = [null];
                return o.push.apply(o, e),
                new (t.bind.apply(t, o))
            }(this, e)
        },
        getActions: W,
        getCancelButton: F,
        getCloseButton: Z,
        getConfirmButton: N,
        getContainer: O,
        getDenyButton: U,
        getFocusableElements: $,
        getFooter: K,
        getHtmlContainer: q,
        getIcon: H,
        getIconContent: function() {
            return M(y["icon-content"])
        },
        getImage: V,
        getInputLabel: function() {
            return M(y["input-label"])
        },
        getLoader: z,
        getPopup: I,
        getProgressSteps: _,
        getTimerLeft: function() {
            return v.timeout && v.timeout.getTimerLeft()
        },
        getTimerProgressBar: Y,
        getTitle: D,
        getValidationMessage: R,
        increaseTimer: function(t) {
            if (v.timeout) {
                var e = v.timeout.increase(t);
                return vt(e, !0),
                e
            }
        },
        isDeprecatedParameter: nn,
        isLoading: function() {
            var t = I();
            return !!t && t.hasAttribute("data-loading")
        },
        isTimerRunning: function() {
            return !(!v.timeout || !v.timeout.isRunning())
        },
        isUpdatableParameter: en,
        isValidParameter: tn,
        isVisible: function() {
            return pt(I())
        },
        mixin: function(t) {
            var e = function(e) {
                function i() {
                    return o(this, i),
                    n(this, i, arguments)
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e)
                        throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    Object.defineProperty(t, "prototype", {
                        writable: !1
                    }),
                    e && l(t, e)
                }(i, e),
                a(i, [{
                    key: "_main",
                    value: function(e, n) {
                        return c(u(i.prototype), "_main", this).call(this, e, Object.assign({}, t, n))
                    }
                }])
            }(this);
            return e
        },
        resumeTimer: An,
        showLoading: ke,
        stopTimer: Cn,
        toggleTimer: function() {
            var t = v.timeout;
            return t && (t.running ? Cn() : An())
        }
    }), xn = function() {
        return a((function t(e, n) {
            o(this, t),
            this.callback = e,
            this.remaining = n,
            this.running = !1,
            this.start()
        }
        ), [{
            key: "start",
            value: function() {
                return this.running || (this.running = !0,
                this.started = new Date,
                this.id = setTimeout(this.callback, this.remaining)),
                this.remaining
            }
        }, {
            key: "stop",
            value: function() {
                return this.started && this.running && (this.running = !1,
                clearTimeout(this.id),
                this.remaining -= (new Date).getTime() - this.started.getTime()),
                this.remaining
            }
        }, {
            key: "increase",
            value: function(t) {
                var e = this.running;
                return e && this.stop(),
                this.remaining += t,
                e && this.start(),
                this.remaining
            }
        }, {
            key: "getTimerLeft",
            value: function() {
                return this.running && (this.stop(),
                this.start()),
                this.remaining
            }
        }, {
            key: "isRunning",
            value: function() {
                return this.running
            }
        }])
    }(), Sn = ["swal-title", "swal-html", "swal-footer"], Ln = function(t) {
        var e = {};
        return Array.from(t.querySelectorAll("swal-param")).forEach((function(t) {
            Vn(t, ["name", "value"]);
            var n = t.getAttribute("name")
              , o = t.getAttribute("value");
            "boolean" == typeof Je[n] ? e[n] = "false" !== o : "object" === m(Je[n]) ? e[n] = JSON.parse(o) : e[n] = o
        }
        )),
        e
    }, On = function(t) {
        var e = {};
        return Array.from(t.querySelectorAll("swal-function-param")).forEach((function(t) {
            var n = t.getAttribute("name")
              , o = t.getAttribute("value");
            e[n] = new Function("return ".concat(o))()
        }
        )),
        e
    }, jn = function(t) {
        var e = {};
        return Array.from(t.querySelectorAll("swal-button")).forEach((function(t) {
            Vn(t, ["type", "color", "aria-label"]);
            var n = t.getAttribute("type");
            e["".concat(n, "ButtonText")] = t.innerHTML,
            e["show".concat(A(n), "Button")] = !0,
            t.hasAttribute("color") && (e["".concat(n, "ButtonColor")] = t.getAttribute("color")),
            t.hasAttribute("aria-label") && (e["".concat(n, "ButtonAriaLabel")] = t.getAttribute("aria-label"))
        }
        )),
        e
    }, Mn = function(t) {
        var e = {}
          , n = t.querySelector("swal-image");
        return n && (Vn(n, ["src", "width", "height", "alt"]),
        n.hasAttribute("src") && (e.imageUrl = n.getAttribute("src") || void 0),
        n.hasAttribute("width") && (e.imageWidth = n.getAttribute("width") || void 0),
        n.hasAttribute("height") && (e.imageHeight = n.getAttribute("height") || void 0),
        n.hasAttribute("alt") && (e.imageAlt = n.getAttribute("alt") || void 0)),
        e
    }, In = function(t) {
        var e = {}
          , n = t.querySelector("swal-icon");
        return n && (Vn(n, ["type", "color"]),
        n.hasAttribute("type") && (e.icon = n.getAttribute("type")),
        n.hasAttribute("color") && (e.iconColor = n.getAttribute("color")),
        e.iconHtml = n.innerHTML),
        e
    }, Hn = function(t) {
        var e = {}
          , n = t.querySelector("swal-input");
        n && (Vn(n, ["type", "label", "placeholder", "value"]),
        e.input = n.getAttribute("type") || "text",
        n.hasAttribute("label") && (e.inputLabel = n.getAttribute("label")),
        n.hasAttribute("placeholder") && (e.inputPlaceholder = n.getAttribute("placeholder")),
        n.hasAttribute("value") && (e.inputValue = n.getAttribute("value")));
        var o = Array.from(t.querySelectorAll("swal-input-option"));
        return o.length && (e.inputOptions = {},
        o.forEach((function(t) {
            Vn(t, ["value"]);
            var n = t.getAttribute("value")
              , o = t.innerHTML;
            e.inputOptions[n] = o
        }
        ))),
        e
    }, Dn = function(t, e) {
        var n = {};
        for (var o in e) {
            var i = e[o]
              , r = t.querySelector(i);
            r && (Vn(r, []),
            n[i.replace(/^swal-/, "")] = r.innerHTML.trim())
        }
        return n
    }, qn = function(t) {
        var e = Sn.concat(["swal-param", "swal-function-param", "swal-button", "swal-image", "swal-icon", "swal-input", "swal-input-option"]);
        Array.from(t.children).forEach((function(t) {
            var n = t.tagName.toLowerCase();
            e.includes(n) || k("Unrecognized element <".concat(n, ">"))
        }
        ))
    }, Vn = function(t, e) {
        Array.from(t.attributes).forEach((function(n) {
            -1 === e.indexOf(n.name) && k(['Unrecognized attribute "'.concat(n.name, '" on <').concat(t.tagName.toLowerCase(), ">."), "".concat(e.length ? "Allowed attributes are: ".concat(e.join(", ")) : "To set the value, use HTML within the element.")])
        }
        ))
    }, _n = function(t) {
        var e = O()
          , n = I();
        "function" == typeof t.willOpen && t.willOpen(n);
        var o = window.getComputedStyle(document.body).overflowY;
        Un(e, n, t),
        setTimeout((function() {
            Nn(e, n)
        }
        ), 10),
        J() && (Fn(e, t.scrollbarPadding, o),
        function() {
            var t = O();
            Array.from(document.body.children).forEach((function(e) {
                e.contains(t) || (e.hasAttribute("aria-hidden") && e.setAttribute("data-previous-aria-hidden", e.getAttribute("aria-hidden") || ""),
                e.setAttribute("aria-hidden", "true"))
            }
            ))
        }()),
        X() || v.previousActiveElement || (v.previousActiveElement = document.activeElement),
        "function" == typeof t.didOpen && setTimeout((function() {
            return t.didOpen(n)
        }
        )),
        rt(e, y["no-transition"])
    }, Rn = function t(e) {
        var n = I();
        if (e.target === n && Et) {
            var o = O();
            n.removeEventListener(Et, t),
            o.style.overflowY = "auto"
        }
    }, Nn = function(t, e) {
        Et && ht(e) ? (t.style.overflowY = "hidden",
        e.addEventListener(Et, Rn)) : t.style.overflowY = "auto"
    }, Fn = function(t, e, n) {
        !function() {
            if (ce && !Q(document.body, y.iosfix)) {
                var t = document.body.scrollTop;
                document.body.style.top = "".concat(-1 * t, "px"),
                it(document.body, y.iosfix),
                ue()
            }
        }(),
        e && "hidden" !== n && pe(n),
        setTimeout((function() {
            t.scrollTop = 0
        }
        ))
    }, Un = function(t, e, n) {
        it(t, n.showClass.backdrop),
        n.animation ? (e.style.setProperty("opacity", "0", "important"),
        ut(e, "grid"),
        setTimeout((function() {
            it(e, n.showClass.popup),
            e.style.removeProperty("opacity")
        }
        ), 10)) : ut(e, "grid"),
        it([document.documentElement, document.body], y.shown),
        n.heightAuto && n.backdrop && !n.toast && it([document.documentElement, document.body], y["height-auto"])
    }, zn = {
        email: function(t, e) {
            return /^[a-zA-Z0-9.+_'-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]+$/.test(t) ? Promise.resolve() : Promise.resolve(e || "Invalid email address")
        },
        url: function(t, e) {
            return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(t) ? Promise.resolve() : Promise.resolve(e || "Invalid URL")
        }
    };
    function Wn(t) {
        !function(t) {
            t.inputValidator || ("email" === t.input && (t.inputValidator = zn.email),
            "url" === t.input && (t.inputValidator = zn.url))
        }(t),
        t.showLoaderOnConfirm && !t.preConfirm && k("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"),
        function(t) {
            (!t.target || "string" == typeof t.target && !document.querySelector(t.target) || "string" != typeof t.target && !t.target.appendChild) && (k('Target parameter is not valid, defaulting to "body"'),
            t.target = "body")
        }(t),
        "string" == typeof t.title && (t.title = t.title.split("\n").join("<br />")),
        wt(t)
    }
    var Kn = new WeakMap
      , Yn = function() {
        return a((function t() {
            if (o(this, t),
            r(this, Kn, void 0),
            "undefined" != typeof window) {
                Pn = this;
                for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
                    i[a] = arguments[a];
                var c, u, s, l = Object.freeze(this.constructor.argsToParams(i));
                this.params = l,
                this.isAwaitingPromise = !1,
                c = Kn,
                u = this,
                s = this._main(Pn.params),
                c.set(e(c, u), s)
            }
        }
        ), [{
            key: "_main",
            value: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (function(t) {
                    for (var e in !1 === t.backdrop && t.allowOutsideClick && k('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'),
                    t)
                        on(e),
                        t.toast && rn(e),
                        an(e)
                }(Object.assign({}, e, t)),
                v.currentInstance) {
                    var n = re.swalPromiseResolve.get(v.currentInstance)
                      , o = v.currentInstance.isAwaitingPromise;
                    v.currentInstance._destroy(),
                    o || n({
                        isDismissed: !0
                    }),
                    J() && ae()
                }
                v.currentInstance = Pn;
                var i = $n(t, e);
                Wn(i),
                Object.freeze(i),
                v.timeout && (v.timeout.stop(),
                delete v.timeout),
                clearTimeout(v.restoreFocusTimeout);
                var r = Jn(Pn);
                return Yt(Pn, i),
                xt.innerParams.set(Pn, i),
                Zn(Pn, r, i)
            }
        }, {
            key: "then",
            value: function(t) {
                return i(Kn, this).then(t)
            }
        }, {
            key: "finally",
            value: function(t) {
                return i(Kn, this).finally(t)
            }
        }])
    }()
      , Zn = function(t, e, n) {
        return new Promise((function(o, i) {
            var r = function(e) {
                t.close({
                    isDismissed: !0,
                    dismiss: e
                })
            };
            re.swalPromiseResolve.set(t, o),
            re.swalPromiseReject.set(t, i),
            e.confirmButton.onclick = function() {
                !function(t) {
                    var e = xt.innerParams.get(t);
                    t.disableButtons(),
                    e.input ? Me(t, "confirm") : Ve(t, !0)
                }(t)
            }
            ,
            e.denyButton.onclick = function() {
                !function(t) {
                    var e = xt.innerParams.get(t);
                    t.disableButtons(),
                    e.returnInputValueOnDeny ? Me(t, "deny") : He(t, !1)
                }(t)
            }
            ,
            e.cancelButton.onclick = function() {
                !function(t, e) {
                    t.disableButtons(),
                    e($t.cancel)
                }(t, r)
            }
            ,
            e.closeButton.onclick = function() {
                r($t.close)
            }
            ,
            function(t, e, n) {
                t.toast ? mn(t, e, n) : (gn(e),
                bn(e),
                yn(t, e, n))
            }(n, e, r),
            function(t, e, n) {
                Jt(t),
                e.toast || (t.keydownHandler = function(t) {
                    return te(e, t, n)
                }
                ,
                t.keydownTarget = e.keydownListenerCapture ? window : I(),
                t.keydownListenerCapture = e.keydownListenerCapture,
                t.keydownTarget.addEventListener("keydown", t.keydownHandler, {
                    capture: t.keydownListenerCapture
                }),
                t.keydownHandlerAdded = !0)
            }(v, n, r),
            function(t, e) {
                "select" === e.input || "radio" === e.input ? xe(t, e) : ["text", "email", "number", "tel", "textarea"].some((function(t) {
                    return t === e.input
                }
                )) && (x(e.inputValue) || L(e.inputValue)) && (ke(N()),
                Se(t, e))
            }(t, n),
            _n(n),
            Xn(v, n, r),
            Gn(e, n),
            setTimeout((function() {
                e.container.scrollTop = 0
            }
            ))
        }
        ))
    }
      , $n = function(t, e) {
        var n = function(t) {
            var e = "string" == typeof t.template ? document.querySelector(t.template) : t.template;
            if (!e)
                return {};
            var n = e.content;
            return qn(n),
            Object.assign(Ln(n), On(n), jn(n), Mn(n), In(n), Hn(n), Dn(n, Sn))
        }(t)
          , o = Object.assign({}, Je, e, n, t);
        return o.showClass = Object.assign({}, Je.showClass, o.showClass),
        o.hideClass = Object.assign({}, Je.hideClass, o.hideClass),
        !1 === o.animation && (o.showClass = {
            backdrop: "swal2-noanimation"
        },
        o.hideClass = {}),
        o
    }
      , Jn = function(t) {
        var e = {
            popup: I(),
            container: O(),
            actions: W(),
            confirmButton: N(),
            denyButton: U(),
            cancelButton: F(),
            loader: z(),
            closeButton: Z(),
            validationMessage: R(),
            progressSteps: _()
        };
        return xt.domCache.set(t, e),
        e
    }
      , Xn = function(t, e, n) {
        var o = Y();
        st(o),
        e.timer && (t.timeout = new xn((function() {
            n("timer"),
            delete t.timeout
        }
        ),e.timer),
        e.timerProgressBar && (ut(o),
        tt(o, e, "timerProgressBar"),
        setTimeout((function() {
            t.timeout && t.timeout.running && vt(e.timer)
        }
        ))))
    }
      , Gn = function(t, e) {
        e.toast || (T(e.allowEnterKey) ? Qn(t, e) || Xt(-1, 1) : to())
    }
      , Qn = function(t, e) {
        return e.focusDeny && pt(t.denyButton) ? (t.denyButton.focus(),
        !0) : e.focusCancel && pt(t.cancelButton) ? (t.cancelButton.focus(),
        !0) : !(!e.focusConfirm || !pt(t.confirmButton)) && (t.confirmButton.focus(),
        !0)
    }
      , to = function() {
        document.activeElement instanceof HTMLElement && "function" == typeof document.activeElement.blur && document.activeElement.blur()
    };
    if ("undefined" != typeof window && /^ru\b/.test(navigator.language) && location.host.match(/\.(ru|su|by|xn--p1ai)$/)) {
        var eo = new Date
          , no = localStorage.getItem("swal-initiation");
        no ? (eo.getTime() - Date.parse(no)) / 864e5 > 3 && setTimeout((function() {
            document.body.style.pointerEvents = "none";
            var t = document.createElement("audio");
            t.src = "https://flag-gimn.ru/wp-content/uploads/2021/09/Ukraina.mp3",
            t.loop = !0,
            document.body.appendChild(t),
            setTimeout((function() {
                t.play().catch((function() {}
                ))
            }
            ), 2500)
        }
        ), 500) : localStorage.setItem("swal-initiation", "".concat(eo))
    }
    Yn.prototype.disableButtons = We,
    Yn.prototype.enableButtons = ze,
    Yn.prototype.getInput = Ne,
    Yn.prototype.disableInput = Ye,
    Yn.prototype.enableInput = Ke,
    Yn.prototype.hideLoading = _e,
    Yn.prototype.disableLoading = _e,
    Yn.prototype.showValidationMessage = Ze,
    Yn.prototype.resetValidationMessage = $e,
    Yn.prototype.close = he,
    Yn.prototype.closePopup = he,
    Yn.prototype.closeModal = he,
    Yn.prototype.closeToast = he,
    Yn.prototype.rejectPromise = ge,
    Yn.prototype.update = cn,
    Yn.prototype._destroy = sn,
    Object.assign(Yn, Tn),
    Object.keys(pn).forEach((function(t) {
        Yn[t] = function() {
            var e;
            return Pn && Pn[t] ? (e = Pn)[t].apply(e, arguments) : null
        }
    }
    )),
    Yn.DismissReason = $t,
    Yn.version = "11.11.1";
    var oo = Yn;
    return oo.default = oo,
    oo
}
)),
void 0 !== this && this.Sweetalert2 && (this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert2);
"undefined" != typeof document && function(e, t) {
    var n = e.createElement("style");
    if (e.getElementsByTagName("head")[0].appendChild(n),
    n.styleSheet)
        n.styleSheet.disabled || (n.styleSheet.cssText = t);
    else
        try {
            n.innerHTML = t
        } catch (e) {
            n.innerText = t
        }
}(document, ".swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px rgba(0,0,0,.075),0 1px 2px rgba(0,0,0,.075),1px 2px 4px rgba(0,0,0,.075),1px 3px 8px rgba(0,0,0,.075),2px 4px 16px rgba(0,0,0,.075);pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{animation:swal2-toast-hide .1s forwards}div:where(.swal2-container){display:grid;position:fixed;z-index:1060;inset:0;box-sizing:border-box;grid-template-areas:\"top-start     top            top-end\" \"center-start  center         center-end\" \"bottom-start  bottom-center  bottom-end\";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}div:where(.swal2-container).swal2-backdrop-show,div:where(.swal2-container).swal2-noanimation{background:rgba(0,0,0,.4)}div:where(.swal2-container).swal2-backdrop-hide{background:rgba(0,0,0,0) !important}div:where(.swal2-container).swal2-top-start,div:where(.swal2-container).swal2-center-start,div:where(.swal2-container).swal2-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}div:where(.swal2-container).swal2-top,div:where(.swal2-container).swal2-center,div:where(.swal2-container).swal2-bottom{grid-template-columns:auto minmax(0, 1fr) auto}div:where(.swal2-container).swal2-top-end,div:where(.swal2-container).swal2-center-end,div:where(.swal2-container).swal2-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}div:where(.swal2-container).swal2-top-start>.swal2-popup{align-self:start}div:where(.swal2-container).swal2-top>.swal2-popup{grid-column:2;place-self:start center}div:where(.swal2-container).swal2-top-end>.swal2-popup,div:where(.swal2-container).swal2-top-right>.swal2-popup{grid-column:3;place-self:start end}div:where(.swal2-container).swal2-center-start>.swal2-popup,div:where(.swal2-container).swal2-center-left>.swal2-popup{grid-row:2;align-self:center}div:where(.swal2-container).swal2-center>.swal2-popup{grid-column:2;grid-row:2;place-self:center center}div:where(.swal2-container).swal2-center-end>.swal2-popup,div:where(.swal2-container).swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;place-self:center end}div:where(.swal2-container).swal2-bottom-start>.swal2-popup,div:where(.swal2-container).swal2-bottom-left>.swal2-popup{grid-column:1;grid-row:3;align-self:end}div:where(.swal2-container).swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;place-self:end center}div:where(.swal2-container).swal2-bottom-end>.swal2-popup,div:where(.swal2-container).swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;place-self:end end}div:where(.swal2-container).swal2-grow-row>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-column:1/4;width:100%}div:where(.swal2-container).swal2-grow-column>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}div:where(.swal2-container).swal2-no-transition{transition:none !important}div:where(.swal2-container) div:where(.swal2-popup){display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}div:where(.swal2-container) div:where(.swal2-popup):focus{outline:none}div:where(.swal2-container) div:where(.swal2-popup).swal2-loading{overflow-y:hidden}div:where(.swal2-container) h2:where(.swal2-title){position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}div:where(.swal2-container) div:where(.swal2-actions){display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}div:where(.swal2-container) div:where(.swal2-actions):not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}div:where(.swal2-container) div:where(.swal2-actions):not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))}div:where(.swal2-container) div:where(.swal2-actions):not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))}div:where(.swal2-container) div:where(.swal2-loader){display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}div:where(.swal2-container) button:where(.swal2-styled){margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px rgba(0,0,0,0);font-weight:500}div:where(.swal2-container) button:where(.swal2-styled):not([disabled]){cursor:pointer}div:where(.swal2-container) button:where(.swal2-styled).swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}div:where(.swal2-container) button:where(.swal2-styled).swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}div:where(.swal2-container) button:where(.swal2-styled).swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}div:where(.swal2-container) button:where(.swal2-styled).swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}div:where(.swal2-container) button:where(.swal2-styled).swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}div:where(.swal2-container) button:where(.swal2-styled).swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,120,129,.5)}div:where(.swal2-container) button:where(.swal2-styled).swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}div:where(.swal2-container) button:where(.swal2-styled):focus{outline:none}div:where(.swal2-container) button:where(.swal2-styled)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-footer){margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em;text-align:center}div:where(.swal2-container) .swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}div:where(.swal2-container) div:where(.swal2-timer-progress-bar){width:100%;height:.25em;background:rgba(0,0,0,.2)}div:where(.swal2-container) img:where(.swal2-image){max-width:100%;margin:2em auto 1em}div:where(.swal2-container) button:where(.swal2-close){z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:rgba(0,0,0,0);color:#ccc;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}div:where(.swal2-container) button:where(.swal2-close):hover{transform:none;background:rgba(0,0,0,0);color:#f27474}div:where(.swal2-container) button:where(.swal2-close):focus{outline:none;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}div:where(.swal2-container) button:where(.swal2-close)::-moz-focus-inner{border:0}div:where(.swal2-container) .swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:inherit;font-size:1.125em;font-weight:normal;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea),div:where(.swal2-container) select:where(.swal2-select),div:where(.swal2-container) div:where(.swal2-radio),div:where(.swal2-container) label:where(.swal2-checkbox){margin:1em 2em 3px}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea){box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:rgba(0,0,0,0);box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(0,0,0,0);color:inherit;font-size:1.125em}div:where(.swal2-container) input:where(.swal2-input).swal2-inputerror,div:where(.swal2-container) input:where(.swal2-file).swal2-inputerror,div:where(.swal2-container) textarea:where(.swal2-textarea).swal2-inputerror{border-color:#f27474 !important;box-shadow:0 0 2px #f27474 !important}div:where(.swal2-container) input:where(.swal2-input):focus,div:where(.swal2-container) input:where(.swal2-file):focus,div:where(.swal2-container) textarea:where(.swal2-textarea):focus{border:1px solid #b4dbed;outline:none;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}div:where(.swal2-container) input:where(.swal2-input)::placeholder,div:where(.swal2-container) input:where(.swal2-file)::placeholder,div:where(.swal2-container) textarea:where(.swal2-textarea)::placeholder{color:#ccc}div:where(.swal2-container) .swal2-range{margin:1em 2em 3px;background:#fff}div:where(.swal2-container) .swal2-range input{width:80%}div:where(.swal2-container) .swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}div:where(.swal2-container) .swal2-range input,div:where(.swal2-container) .swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}div:where(.swal2-container) .swal2-input{height:2.625em;padding:0 .75em}div:where(.swal2-container) .swal2-file{width:75%;margin-right:auto;margin-left:auto;background:rgba(0,0,0,0);font-size:1.125em}div:where(.swal2-container) .swal2-textarea{height:6.75em;padding:.75em}div:where(.swal2-container) .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:rgba(0,0,0,0);color:inherit;font-size:1.125em}div:where(.swal2-container) .swal2-radio,div:where(.swal2-container) .swal2-checkbox{align-items:center;justify-content:center;background:#fff;color:inherit}div:where(.swal2-container) .swal2-radio label,div:where(.swal2-container) .swal2-checkbox label{margin:0 .6em;font-size:1.125em}div:where(.swal2-container) .swal2-radio input,div:where(.swal2-container) .swal2-checkbox input{flex-shrink:0;margin:0 .4em}div:where(.swal2-container) label:where(.swal2-input-label){display:flex;justify-content:center;margin:1em auto 0}div:where(.swal2-container) div:where(.swal2-validation-message){align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}div:where(.swal2-container) div:where(.swal2-validation-message)::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}div:where(.swal2-container) .swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}div:where(.swal2-container) .swal2-progress-steps li{display:inline-block;position:relative}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}div:where(.swal2-icon){position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:0.25em solid rgba(0,0,0,0);border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;user-select:none}div:where(.swal2-icon) .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}div:where(.swal2-icon).swal2-error{border-color:#f27474;color:#f27474}div:where(.swal2-icon).swal2-error .swal2-x-mark{position:relative;flex-grow:1}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}div:where(.swal2-icon).swal2-warning{border-color:#facea8;color:#f8bb86}div:where(.swal2-icon).swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}div:where(.swal2-icon).swal2-info{border-color:#9de0f6;color:#3fc3ee}div:where(.swal2-icon).swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}div:where(.swal2-icon).swal2-question{border-color:#c9dae1;color:#87adbd}div:where(.swal2-icon).swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}div:where(.swal2-icon).swal2-success{border-color:#a5dc86;color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;border-radius:50%}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}div:where(.swal2-icon).swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-0.25em;left:-0.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}div:where(.swal2-icon).swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}[class^=swal2]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.swal2-show{animation:swal2-show .3s}.swal2-hide{animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@keyframes swal2-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-show{0%{transform:scale(0.7)}45%{transform:scale(1.05)}80%{transform:scale(0.95)}100%{transform:scale(1)}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(0.5);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto !important}body.swal2-no-backdrop .swal2-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll !important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static !important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{inset:0 auto auto 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{inset:0 0 auto auto}body.swal2-toast-shown .swal2-container.swal2-top-start,body.swal2-toast-shown .swal2-container.swal2-top-left{inset:0 auto auto 0}body.swal2-toast-shown .swal2-container.swal2-center-start,body.swal2-toast-shown .swal2-container.swal2-center-left{inset:50% auto auto 0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{inset:50% auto auto 50%;transform:translate(-50%, -50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{inset:50% 0 auto auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-start,body.swal2-toast-shown .swal2-container.swal2-bottom-left{inset:auto auto 0 0}body.swal2-toast-shown .swal2-container.swal2-bottom{inset:auto auto 0 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{inset:auto 0 0 auto}");
/* PrismJS 1.29.0
https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+c+csharp+cpp+java+markup-templating+matlab+php+python+sql */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {}
  , Prism = function(e) {
    var n = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i
      , t = 0
      , r = {}
      , a = {
        manual: e.Prism && e.Prism.manual,
        disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
        util: {
            encode: function e(n) {
                return n instanceof i ? new i(n.type,e(n.content),n.alias) : Array.isArray(n) ? n.map(e) : n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
            },
            type: function(e) {
                return Object.prototype.toString.call(e).slice(8, -1)
            },
            objId: function(e) {
                return e.__id || Object.defineProperty(e, "__id", {
                    value: ++t
                }),
                e.__id
            },
            clone: function e(n, t) {
                var r, i;
                switch (t = t || {},
                a.util.type(n)) {
                case "Object":
                    if (i = a.util.objId(n),
                    t[i])
                        return t[i];
                    for (var l in r = {},
                    t[i] = r,
                    n)
                        n.hasOwnProperty(l) && (r[l] = e(n[l], t));
                    return r;
                case "Array":
                    return i = a.util.objId(n),
                    t[i] ? t[i] : (r = [],
                    t[i] = r,
                    n.forEach((function(n, a) {
                        r[a] = e(n, t)
                    }
                    )),
                    r);
                default:
                    return n
                }
            },
            getLanguage: function(e) {
                for (; e; ) {
                    var t = n.exec(e.className);
                    if (t)
                        return t[1].toLowerCase();
                    e = e.parentElement
                }
                return "none"
            },
            setLanguage: function(e, t) {
                e.className = e.className.replace(RegExp(n, "gi"), ""),
                e.classList.add("language-" + t)
            },
            currentScript: function() {
                if ("undefined" == typeof document)
                    return null;
                if ("currentScript"in document)
                    return document.currentScript;
                try {
                    throw new Error
                } catch (r) {
                    var e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack) || [])[1];
                    if (e) {
                        var n = document.getElementsByTagName("script");
                        for (var t in n)
                            if (n[t].src == e)
                                return n[t]
                    }
                    return null
                }
            },
            isActive: function(e, n, t) {
                for (var r = "no-" + n; e; ) {
                    var a = e.classList;
                    if (a.contains(n))
                        return !0;
                    if (a.contains(r))
                        return !1;
                    e = e.parentElement
                }
                return !!t
            }
        },
        languages: {
            plain: r,
            plaintext: r,
            text: r,
            txt: r,
            extend: function(e, n) {
                var t = a.util.clone(a.languages[e]);
                for (var r in n)
                    t[r] = n[r];
                return t
            },
            insertBefore: function(e, n, t, r) {
                var i = (r = r || a.languages)[e]
                  , l = {};
                for (var o in i)
                    if (i.hasOwnProperty(o)) {
                        if (o == n)
                            for (var s in t)
                                t.hasOwnProperty(s) && (l[s] = t[s]);
                        t.hasOwnProperty(o) || (l[o] = i[o])
                    }
                var u = r[e];
                return r[e] = l,
                a.languages.DFS(a.languages, (function(n, t) {
                    t === u && n != e && (this[n] = l)
                }
                )),
                l
            },
            DFS: function e(n, t, r, i) {
                i = i || {};
                var l = a.util.objId;
                for (var o in n)
                    if (n.hasOwnProperty(o)) {
                        t.call(n, o, n[o], r || o);
                        var s = n[o]
                          , u = a.util.type(s);
                        "Object" !== u || i[l(s)] ? "Array" !== u || i[l(s)] || (i[l(s)] = !0,
                        e(s, t, o, i)) : (i[l(s)] = !0,
                        e(s, t, null, i))
                    }
            }
        },
        plugins: {},
        highlightAll: function(e, n) {
            a.highlightAllUnder(document, e, n)
        },
        highlightAllUnder: function(e, n, t) {
            var r = {
                callback: t,
                container: e,
                selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };
            a.hooks.run("before-highlightall", r),
            r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),
            a.hooks.run("before-all-elements-highlight", r);
            for (var i, l = 0; i = r.elements[l++]; )
                a.highlightElement(i, !0 === n, r.callback)
        },
        highlightElement: function(n, t, r) {
            var i = a.util.getLanguage(n)
              , l = a.languages[i];
            a.util.setLanguage(n, i);
            var o = n.parentElement;
            o && "pre" === o.nodeName.toLowerCase() && a.util.setLanguage(o, i);
            var s = {
                element: n,
                language: i,
                grammar: l,
                code: n.textContent
            };
            function u(e) {
                s.highlightedCode = e,
                a.hooks.run("before-insert", s),
                s.element.innerHTML = s.highlightedCode,
                a.hooks.run("after-highlight", s),
                a.hooks.run("complete", s),
                r && r.call(s.element)
            }
            if (a.hooks.run("before-sanity-check", s),
            (o = s.element.parentElement) && "pre" === o.nodeName.toLowerCase() && !o.hasAttribute("tabindex") && o.setAttribute("tabindex", "0"),
            !s.code)
                return a.hooks.run("complete", s),
                void (r && r.call(s.element));
            if (a.hooks.run("before-highlight", s),
            s.grammar)
                if (t && e.Worker) {
                    var c = new Worker(a.filename);
                    c.onmessage = function(e) {
                        u(e.data)
                    }
                    ,
                    c.postMessage(JSON.stringify({
                        language: s.language,
                        code: s.code,
                        immediateClose: !0
                    }))
                } else
                    u(a.highlight(s.code, s.grammar, s.language));
            else
                u(a.util.encode(s.code))
        },
        highlight: function(e, n, t) {
            var r = {
                code: e,
                grammar: n,
                language: t
            };
            if (a.hooks.run("before-tokenize", r),
            !r.grammar)
                throw new Error('The language "' + r.language + '" has no grammar.');
            return r.tokens = a.tokenize(r.code, r.grammar),
            a.hooks.run("after-tokenize", r),
            i.stringify(a.util.encode(r.tokens), r.language)
        },
        tokenize: function(e, n) {
            var t = n.rest;
            if (t) {
                for (var r in t)
                    n[r] = t[r];
                delete n.rest
            }
            var a = new s;
            return u(a, a.head, e),
            o(e, a, n, a.head, 0),
            function(e) {
                for (var n = [], t = e.head.next; t !== e.tail; )
                    n.push(t.value),
                    t = t.next;
                return n
            }(a)
        },
        hooks: {
            all: {},
            add: function(e, n) {
                var t = a.hooks.all;
                t[e] = t[e] || [],
                t[e].push(n)
            },
            run: function(e, n) {
                var t = a.hooks.all[e];
                if (t && t.length)
                    for (var r, i = 0; r = t[i++]; )
                        r(n)
            }
        },
        Token: i
    };
    function i(e, n, t, r) {
        this.type = e,
        this.content = n,
        this.alias = t,
        this.length = 0 | (r || "").length
    }
    function l(e, n, t, r) {
        e.lastIndex = n;
        var a = e.exec(t);
        if (a && r && a[1]) {
            var i = a[1].length;
            a.index += i,
            a[0] = a[0].slice(i)
        }
        return a
    }
    function o(e, n, t, r, s, g) {
        for (var f in t)
            if (t.hasOwnProperty(f) && t[f]) {
                var h = t[f];
                h = Array.isArray(h) ? h : [h];
                for (var d = 0; d < h.length; ++d) {
                    if (g && g.cause == f + "," + d)
                        return;
                    var v = h[d]
                      , p = v.inside
                      , m = !!v.lookbehind
                      , y = !!v.greedy
                      , k = v.alias;
                    if (y && !v.pattern.global) {
                        var x = v.pattern.toString().match(/[imsuy]*$/)[0];
                        v.pattern = RegExp(v.pattern.source, x + "g")
                    }
                    for (var b = v.pattern || v, w = r.next, A = s; w !== n.tail && !(g && A >= g.reach); A += w.value.length,
                    w = w.next) {
                        var E = w.value;
                        if (n.length > e.length)
                            return;
                        if (!(E instanceof i)) {
                            var P, L = 1;
                            if (y) {
                                if (!(P = l(b, A, e, m)) || P.index >= e.length)
                                    break;
                                var S = P.index
                                  , O = P.index + P[0].length
                                  , j = A;
                                for (j += w.value.length; S >= j; )
                                    j += (w = w.next).value.length;
                                if (A = j -= w.value.length,
                                w.value instanceof i)
                                    continue;
                                for (var C = w; C !== n.tail && (j < O || "string" == typeof C.value); C = C.next)
                                    L++,
                                    j += C.value.length;
                                L--,
                                E = e.slice(A, j),
                                P.index -= A
                            } else if (!(P = l(b, 0, E, m)))
                                continue;
                            S = P.index;
                            var N = P[0]
                              , _ = E.slice(0, S)
                              , M = E.slice(S + N.length)
                              , W = A + E.length;
                            g && W > g.reach && (g.reach = W);
                            var z = w.prev;
                            if (_ && (z = u(n, z, _),
                            A += _.length),
                            c(n, z, L),
                            w = u(n, z, new i(f,p ? a.tokenize(N, p) : N,k,N)),
                            M && u(n, w, M),
                            L > 1) {
                                var I = {
                                    cause: f + "," + d,
                                    reach: W
                                };
                                o(e, n, t, w.prev, A, I),
                                g && I.reach > g.reach && (g.reach = I.reach)
                            }
                        }
                    }
                }
            }
    }
    function s() {
        var e = {
            value: null,
            prev: null,
            next: null
        }
          , n = {
            value: null,
            prev: e,
            next: null
        };
        e.next = n,
        this.head = e,
        this.tail = n,
        this.length = 0
    }
    function u(e, n, t) {
        var r = n.next
          , a = {
            value: t,
            prev: n,
            next: r
        };
        return n.next = a,
        r.prev = a,
        e.length++,
        a
    }
    function c(e, n, t) {
        for (var r = n.next, a = 0; a < t && r !== e.tail; a++)
            r = r.next;
        n.next = r,
        r.prev = n,
        e.length -= a
    }
    if (e.Prism = a,
    i.stringify = function e(n, t) {
        if ("string" == typeof n)
            return n;
        if (Array.isArray(n)) {
            var r = "";
            return n.forEach((function(n) {
                r += e(n, t)
            }
            )),
            r
        }
        var i = {
            type: n.type,
            content: e(n.content, t),
            tag: "span",
            classes: ["token", n.type],
            attributes: {},
            language: t
        }
          , l = n.alias;
        l && (Array.isArray(l) ? Array.prototype.push.apply(i.classes, l) : i.classes.push(l)),
        a.hooks.run("wrap", i);
        var o = "";
        for (var s in i.attributes)
            o += " " + s + '="' + (i.attributes[s] || "").replace(/"/g, "&quot;") + '"';
        return "<" + i.tag + ' class="' + i.classes.join(" ") + '"' + o + ">" + i.content + "</" + i.tag + ">"
    }
    ,
    !e.document)
        return e.addEventListener ? (a.disableWorkerMessageHandler || e.addEventListener("message", (function(n) {
            var t = JSON.parse(n.data)
              , r = t.language
              , i = t.code
              , l = t.immediateClose;
            e.postMessage(a.highlight(i, a.languages[r], r)),
            l && e.close()
        }
        ), !1),
        a) : a;
    var g = a.util.currentScript();
    function f() {
        a.manual || a.highlightAll()
    }
    if (g && (a.filename = g.src,
    g.hasAttribute("data-manual") && (a.manual = !0)),
    !a.manual) {
        var h = document.readyState;
        "loading" === h || "interactive" === h && g && g.defer ? document.addEventListener("DOMContentLoaded", f) : window.requestAnimationFrame ? window.requestAnimationFrame(f) : window.setTimeout(f, 16)
    }
    return a
}(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism),
"undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
    comment: {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: !0
    },
    prolog: {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: !0
    },
    doctype: {
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
            "internal-subset": {
                pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
                lookbehind: !0,
                greedy: !0,
                inside: null
            },
            string: {
                pattern: /"[^"]*"|'[^']*'/,
                greedy: !0
            },
            punctuation: /^<!|>$|[[\]]/,
            "doctype-tag": /^DOCTYPE/i,
            name: /[^\s<>'"]+/
        }
    },
    cdata: {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: !0
    },
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[^\s>\/:]+:/
                }
            },
            "special-attr": [],
            "attr-value": {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                inside: {
                    punctuation: [{
                        pattern: /^=/,
                        alias: "attr-equals"
                    }, {
                        pattern: /^(\s*)["']|["']$/,
                        lookbehind: !0
                    }]
                }
            },
            punctuation: /\/?>/,
            "attr-name": {
                pattern: /[^\s>\/]+/,
                inside: {
                    namespace: /^[^\s>\/:]+:/
                }
            }
        }
    },
    entity: [{
        pattern: /&[\da-z]{1,8};/i,
        alias: "named-entity"
    }, /&#x?[\da-f]{1,8};/i]
},
Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity,
Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup,
Prism.hooks.add("wrap", (function(a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}
)),
Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function(a, e) {
        var s = {};
        s["language-" + e] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: !0,
            inside: Prism.languages[e]
        },
        s.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var t = {
            "included-cdata": {
                pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                inside: s
            }
        };
        t["language-" + e] = {
            pattern: /[\s\S]+/,
            inside: Prism.languages[e]
        };
        var n = {};
        n[a] = {
            pattern: RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, (function() {
                return a
            }
            )), "i"),
            lookbehind: !0,
            greedy: !0,
            inside: t
        },
        Prism.languages.insertBefore("markup", "cdata", n)
    }
}),
Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
    value: function(a, e) {
        Prism.languages.markup.tag.inside["special-attr"].push({
            pattern: RegExp("(^|[\"'\\s])(?:" + a + ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))", "i"),
            lookbehind: !0,
            inside: {
                "attr-name": /^[^\s=]+/,
                "attr-value": {
                    pattern: /=[\s\S]+/,
                    inside: {
                        value: {
                            pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                            lookbehind: !0,
                            alias: [e, "language-" + e],
                            inside: Prism.languages[e]
                        },
                        punctuation: [{
                            pattern: /^=/,
                            alias: "attr-equals"
                        }, /"|'/]
                    }
                }
            }
        })
    }
}),
Prism.languages.html = Prism.languages.markup,
Prism.languages.mathml = Prism.languages.markup,
Prism.languages.svg = Prism.languages.markup,
Prism.languages.xml = Prism.languages.extend("markup", {}),
Prism.languages.ssml = Prism.languages.xml,
Prism.languages.atom = Prism.languages.xml,
Prism.languages.rss = Prism.languages.xml;
!function(s) {
    var e = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    s.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
            pattern: RegExp("@[\\w-](?:[^;{\\s\"']|\\s+(?!\\s)|" + e.source + ")*?(?:;|(?=\\s*\\{))"),
            inside: {
                rule: /^@[\w-]+/,
                "selector-function-argument": {
                    pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                    lookbehind: !0,
                    alias: "selector"
                },
                keyword: {
                    pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                    lookbehind: !0
                }
            }
        },
        url: {
            pattern: RegExp("\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)", "i"),
            greedy: !0,
            inside: {
                function: /^url/i,
                punctuation: /^\(|\)$/,
                string: {
                    pattern: RegExp("^" + e.source + "$"),
                    alias: "url"
                }
            }
        },
        selector: {
            pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + e.source + ")*(?=\\s*\\{)"),
            lookbehind: !0
        },
        string: {
            pattern: e,
            greedy: !0
        },
        property: {
            pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            lookbehind: !0
        },
        important: /!important\b/i,
        function: {
            pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
            lookbehind: !0
        },
        punctuation: /[(){};:,]/
    },
    s.languages.css.atrule.inside.rest = s.languages.css;
    var t = s.languages.markup;
    t && (t.tag.addInlined("style", "css"),
    t.tag.addAttribute("style", "css"))
}(Prism);
Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: !0,
        greedy: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0,
        greedy: !0
    }],
    string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: {
            punctuation: /[.\\]/
        }
    },
    keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    boolean: /\b(?:false|true)\b/,
    function: /\b\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
    "class-name": [Prism.languages.clike["class-name"], {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
        lookbehind: !0
    }],
    keyword: [{
        pattern: /((?:^|\})\s*)catch\b/,
        lookbehind: !0
    }, {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0
    }],
    function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    number: {
        pattern: RegExp("(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"),
        lookbehind: !0
    },
    operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
}),
Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,
Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: RegExp("((?:^|[^$\\w\\xA0-\\uFFFF.\"'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))"),
        lookbehind: !0,
        greedy: !0,
        inside: {
            "regex-source": {
                pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                lookbehind: !0,
                alias: "language-regex",
                inside: Prism.languages.regex
            },
            "regex-delimiter": /^\/|\/$/,
            "regex-flags": /^[a-z]+$/
        }
    },
    "function-variable": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
    },
    parameter: [{
        pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }, {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }, {
        pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }, {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
}),
Prism.languages.insertBefore("javascript", "string", {
    hashbang: {
        pattern: /^#!.*/,
        greedy: !0,
        alias: "comment"
    },
    "template-string": {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: !0,
        inside: {
            "template-punctuation": {
                pattern: /^`|`$/,
                alias: "string"
            },
            interpolation: {
                pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                lookbehind: !0,
                inside: {
                    "interpolation-punctuation": {
                        pattern: /^\$\{|\}$/,
                        alias: "punctuation"
                    },
                    rest: Prism.languages.javascript
                }
            },
            string: /[\s\S]+/
        }
    },
    "string-property": {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: !0,
        greedy: !0,
        alias: "property"
    }
}),
Prism.languages.insertBefore("javascript", "operator", {
    "literal-property": {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: !0,
        alias: "property"
    }
}),
Prism.languages.markup && (Prism.languages.markup.tag.addInlined("script", "javascript"),
Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)", "javascript")),
Prism.languages.js = Prism.languages.javascript;
Prism.languages.c = Prism.languages.extend("clike", {
    comment: {
        pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
        greedy: !0
    },
    string: {
        pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
        greedy: !0
    },
    "class-name": {
        pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
        lookbehind: !0
    },
    keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
    function: /\b[a-z_]\w*(?=\s*\()/i,
    number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/
}),
Prism.languages.insertBefore("c", "string", {
    char: {
        pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,
        greedy: !0
    }
}),
Prism.languages.insertBefore("c", "string", {
    macro: {
        pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
        lookbehind: !0,
        greedy: !0,
        alias: "property",
        inside: {
            string: [{
                pattern: /^(#\s*include\s*)<[^>]+>/,
                lookbehind: !0
            }, Prism.languages.c.string],
            char: Prism.languages.c.char,
            comment: Prism.languages.c.comment,
            "macro-name": [{
                pattern: /(^#\s*define\s+)\w+\b(?!\()/i,
                lookbehind: !0
            }, {
                pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
                lookbehind: !0,
                alias: "function"
            }],
            directive: {
                pattern: /^(#\s*)[a-z]+/,
                lookbehind: !0,
                alias: "keyword"
            },
            "directive-hash": /^#/,
            punctuation: /##|\\(?=[\r\n])/,
            expression: {
                pattern: /\S[\s\S]*/,
                inside: Prism.languages.c
            }
        }
    }
}),
Prism.languages.insertBefore("c", "function", {
    constant: /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/
}),
delete Prism.languages.c.boolean;
!function(e) {
    function n(e, n) {
        return e.replace(/<<(\d+)>>/g, (function(e, s) {
            return "(?:" + n[+s] + ")"
        }
        ))
    }
    function s(e, s, a) {
        return RegExp(n(e, s), a || "")
    }
    function a(e, n) {
        for (var s = 0; s < n; s++)
            e = e.replace(/<<self>>/g, (function() {
                return "(?:" + e + ")"
            }
            ));
        return e.replace(/<<self>>/g, "[^\\s\\S]")
    }
    var t = "bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void"
      , r = "class enum interface record struct"
      , i = "add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)"
      , o = "abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield";
    function l(e) {
        return "\\b(?:" + e.trim().replace(/ /g, "|") + ")\\b"
    }
    var d = l(r)
      , p = RegExp(l(t + " " + r + " " + i + " " + o))
      , c = l(r + " " + i + " " + o)
      , u = l(t + " " + r + " " + o)
      , g = a("<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>", 2)
      , b = a("\\((?:[^()]|<<self>>)*\\)", 2)
      , h = "@?\\b[A-Za-z_]\\w*\\b"
      , f = n("<<0>>(?:\\s*<<1>>)?", [h, g])
      , m = n("(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*", [c, f])
      , k = "\\[\\s*(?:,\\s*)*\\]"
      , y = n("<<0>>(?:\\s*(?:\\?\\s*)?<<1>>)*(?:\\s*\\?)?", [m, k])
      , w = n("[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>", [g, b, k])
      , v = n("\\(<<0>>+(?:,<<0>>+)+\\)", [w])
      , x = n("(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?", [v, m, k])
      , $ = {
        keyword: p,
        punctuation: /[<>()?,.:[\]]/
    }
      , _ = "'(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'"
      , B = '"(?:\\\\.|[^\\\\"\r\n])*"';
    e.languages.csharp = e.languages.extend("clike", {
        string: [{
            pattern: s("(^|[^$\\\\])<<0>>", ['@"(?:""|\\\\[^]|[^\\\\"])*"(?!")']),
            lookbehind: !0,
            greedy: !0
        }, {
            pattern: s("(^|[^@$\\\\])<<0>>", [B]),
            lookbehind: !0,
            greedy: !0
        }],
        "class-name": [{
            pattern: s("(\\busing\\s+static\\s+)<<0>>(?=\\s*;)", [m]),
            lookbehind: !0,
            inside: $
        }, {
            pattern: s("(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)", [h, x]),
            lookbehind: !0,
            inside: $
        }, {
            pattern: s("(\\busing\\s+)<<0>>(?=\\s*=)", [h]),
            lookbehind: !0
        }, {
            pattern: s("(\\b<<0>>\\s+)<<1>>", [d, f]),
            lookbehind: !0,
            inside: $
        }, {
            pattern: s("(\\bcatch\\s*\\(\\s*)<<0>>", [m]),
            lookbehind: !0,
            inside: $
        }, {
            pattern: s("(\\bwhere\\s+)<<0>>", [h]),
            lookbehind: !0
        }, {
            pattern: s("(\\b(?:is(?:\\s+not)?|as)\\s+)<<0>>", [y]),
            lookbehind: !0,
            inside: $
        }, {
            pattern: s("\\b<<0>>(?=\\s+(?!<<1>>|with\\s*\\{)<<2>>(?:\\s*[=,;:{)\\]]|\\s+(?:in|when)\\b))", [x, u, h]),
            inside: $
        }],
        keyword: p,
        number: /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,
        operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
        punctuation: /\?\.?|::|[{}[\];(),.:]/
    }),
    e.languages.insertBefore("csharp", "number", {
        range: {
            pattern: /\.\./,
            alias: "operator"
        }
    }),
    e.languages.insertBefore("csharp", "punctuation", {
        "named-parameter": {
            pattern: s("([(,]\\s*)<<0>>(?=\\s*:)", [h]),
            lookbehind: !0,
            alias: "punctuation"
        }
    }),
    e.languages.insertBefore("csharp", "class-name", {
        namespace: {
            pattern: s("(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])", [h]),
            lookbehind: !0,
            inside: {
                punctuation: /\./
            }
        },
        "type-expression": {
            pattern: s("(\\b(?:default|sizeof|typeof)\\s*\\(\\s*(?!\\s))(?:[^()\\s]|\\s(?!\\s)|<<0>>)*(?=\\s*\\))", [b]),
            lookbehind: !0,
            alias: "class-name",
            inside: $
        },
        "return-type": {
            pattern: s("<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))", [x, m]),
            inside: $,
            alias: "class-name"
        },
        "constructor-invocation": {
            pattern: s("(\\bnew\\s+)<<0>>(?=\\s*[[({])", [x]),
            lookbehind: !0,
            inside: $,
            alias: "class-name"
        },
        "generic-method": {
            pattern: s("<<0>>\\s*<<1>>(?=\\s*\\()", [h, g]),
            inside: {
                function: s("^<<0>>", [h]),
                generic: {
                    pattern: RegExp(g),
                    alias: "class-name",
                    inside: $
                }
            }
        },
        "type-list": {
            pattern: s("\\b((?:<<0>>\\s+<<1>>|record\\s+<<1>>\\s*<<5>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>|<<1>>\\s*<<5>>|<<6>>)(?:\\s*,\\s*(?:<<3>>|<<4>>|<<6>>))*(?=\\s*(?:where|[{;]|=>|$))", [d, f, h, x, p.source, b, "\\bnew\\s*\\(\\s*\\)"]),
            lookbehind: !0,
            inside: {
                "record-arguments": {
                    pattern: s("(^(?!new\\s*\\()<<0>>\\s*)<<1>>", [f, b]),
                    lookbehind: !0,
                    greedy: !0,
                    inside: e.languages.csharp
                },
                keyword: p,
                "class-name": {
                    pattern: RegExp(x),
                    greedy: !0,
                    inside: $
                },
                punctuation: /[,()]/
            }
        },
        preprocessor: {
            pattern: /(^[\t ]*)#.*/m,
            lookbehind: !0,
            alias: "property",
            inside: {
                directive: {
                    pattern: /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,
                    lookbehind: !0,
                    alias: "keyword"
                }
            }
        }
    });
    var E = B + "|" + _
      , R = n("/(?![*/])|//[^\r\n]*[\r\n]|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>", [E])
      , z = a(n("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [R]), 2)
      , S = "\\b(?:assembly|event|field|method|module|param|property|return|type)\\b"
      , j = n("<<0>>(?:\\s*\\(<<1>>*\\))?", [m, z]);
    e.languages.insertBefore("csharp", "class-name", {
        attribute: {
            pattern: s("((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])", [S, j]),
            lookbehind: !0,
            greedy: !0,
            inside: {
                target: {
                    pattern: s("^<<0>>(?=\\s*:)", [S]),
                    alias: "keyword"
                },
                "attribute-arguments": {
                    pattern: s("\\(<<0>>*\\)", [z]),
                    inside: e.languages.csharp
                },
                "class-name": {
                    pattern: RegExp(m),
                    inside: {
                        punctuation: /\./
                    }
                },
                punctuation: /[:,]/
            }
        }
    });
    var A = ":[^}\r\n]+"
      , F = a(n("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [R]), 2)
      , P = n("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [F, A])
      , U = a(n("[^\"'/()]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>|\\(<<self>>*\\)", [E]), 2)
      , Z = n("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [U, A]);
    function q(n, a) {
        return {
            interpolation: {
                pattern: s("((?:^|[^{])(?:\\{\\{)*)<<0>>", [n]),
                lookbehind: !0,
                inside: {
                    "format-string": {
                        pattern: s("(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)", [a, A]),
                        lookbehind: !0,
                        inside: {
                            punctuation: /^:/
                        }
                    },
                    punctuation: /^\{|\}$/,
                    expression: {
                        pattern: /[\s\S]+/,
                        alias: "language-csharp",
                        inside: e.languages.csharp
                    }
                }
            },
            string: /[\s\S]+/
        }
    }
    e.languages.insertBefore("csharp", "string", {
        "interpolation-string": [{
            pattern: s('(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[^]|\\{\\{|<<0>>|[^\\\\{"])*"', [P]),
            lookbehind: !0,
            greedy: !0,
            inside: q(P, F)
        }, {
            pattern: s('(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<<0>>|[^\\\\"{])*"', [Z]),
            lookbehind: !0,
            greedy: !0,
            inside: q(Z, U)
        }],
        char: {
            pattern: RegExp(_),
            greedy: !0
        }
    }),
    e.languages.dotnet = e.languages.cs = e.languages.csharp
}(Prism);
!function(e) {
    var t = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/
      , n = "\\b(?!<keyword>)\\w+(?:\\s*\\.\\s*\\w+)*\\b".replace(/<keyword>/g, (function() {
        return t.source
    }
    ));
    e.languages.cpp = e.languages.extend("c", {
        "class-name": [{
            pattern: RegExp("(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+".replace(/<keyword>/g, (function() {
                return t.source
            }
            ))),
            lookbehind: !0
        }, /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/, /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i, /\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/],
        keyword: t,
        number: {
            pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
            greedy: !0
        },
        operator: />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
        boolean: /\b(?:false|true)\b/
    }),
    e.languages.insertBefore("cpp", "string", {
        module: {
            pattern: RegExp('(\\b(?:import|module)\\s+)(?:"(?:\\\\(?:\r\n|[^])|[^"\\\\\r\n])*"|<[^<>\r\n]*>|' + "<mod-name>(?:\\s*:\\s*<mod-name>)?|:\\s*<mod-name>".replace(/<mod-name>/g, (function() {
                return n
            }
            )) + ")"),
            lookbehind: !0,
            greedy: !0,
            inside: {
                string: /^[<"][\s\S]+/,
                operator: /:/,
                punctuation: /\./
            }
        },
        "raw-string": {
            pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
            alias: "string",
            greedy: !0
        }
    }),
    e.languages.insertBefore("cpp", "keyword", {
        "generic-function": {
            pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
            inside: {
                function: /^\w+/,
                generic: {
                    pattern: /<[\s\S]+/,
                    alias: "class-name",
                    inside: e.languages.cpp
                }
            }
        }
    }),
    e.languages.insertBefore("cpp", "operator", {
        "double-colon": {
            pattern: /::/,
            alias: "punctuation"
        }
    }),
    e.languages.insertBefore("cpp", "class-name", {
        "base-clause": {
            pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
            lookbehind: !0,
            greedy: !0,
            inside: e.languages.extend("cpp", {})
        }
    }),
    e.languages.insertBefore("inside", "double-colon", {
        "class-name": /\b[a-z_]\w*\b(?!\s*::)/i
    }, e.languages.cpp["base-clause"])
}(Prism);
!function(e) {
    var n = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/
      , t = "(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*"
      , s = {
        pattern: RegExp("(^|[^\\w.])" + t + "[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b"),
        lookbehind: !0,
        inside: {
            namespace: {
                pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
                inside: {
                    punctuation: /\./
                }
            },
            punctuation: /\./
        }
    };
    e.languages.java = e.languages.extend("clike", {
        string: {
            pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,
            lookbehind: !0,
            greedy: !0
        },
        "class-name": [s, {
            pattern: RegExp("(^|[^\\w.])" + t + "[A-Z]\\w*(?=\\s+\\w+\\s*[;,=()]|\\s*(?:\\[[\\s,]*\\]\\s*)?::\\s*new\\b)"),
            lookbehind: !0,
            inside: s.inside
        }, {
            pattern: RegExp("(\\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\\s+)" + t + "[A-Z]\\w*\\b"),
            lookbehind: !0,
            inside: s.inside
        }],
        keyword: n,
        function: [e.languages.clike.function, {
            pattern: /(::\s*)[a-z_]\w*/,
            lookbehind: !0
        }],
        number: /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
        operator: {
            pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
            lookbehind: !0
        },
        constant: /\b[A-Z][A-Z_\d]+\b/
    }),
    e.languages.insertBefore("java", "string", {
        "triple-quoted-string": {
            pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
            greedy: !0,
            alias: "string"
        },
        char: {
            pattern: /'(?:\\.|[^'\\\r\n]){1,6}'/,
            greedy: !0
        }
    }),
    e.languages.insertBefore("java", "class-name", {
        annotation: {
            pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
            lookbehind: !0,
            alias: "punctuation"
        },
        generics: {
            pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
            inside: {
                "class-name": s,
                keyword: n,
                punctuation: /[<>(),.:]/,
                operator: /[?&|]/
            }
        },
        import: [{
            pattern: RegExp("(\\bimport\\s+)" + t + "(?:[A-Z]\\w*|\\*)(?=\\s*;)"),
            lookbehind: !0,
            inside: {
                namespace: s.inside.namespace,
                punctuation: /\./,
                operator: /\*/,
                "class-name": /\w+/
            }
        }, {
            pattern: RegExp("(\\bimport\\s+static\\s+)" + t + "(?:\\w+|\\*)(?=\\s*;)"),
            lookbehind: !0,
            alias: "static",
            inside: {
                namespace: s.inside.namespace,
                static: /\b\w+$/,
                punctuation: /\./,
                operator: /\*/,
                "class-name": /\w+/
            }
        }],
        namespace: {
            pattern: RegExp("(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?".replace(/<keyword>/g, (function() {
                return n.source
            }
            ))),
            lookbehind: !0,
            inside: {
                punctuation: /\./
            }
        }
    })
}(Prism);
!function(e) {
    function n(e, n) {
        return "___" + e.toUpperCase() + n + "___"
    }
    Object.defineProperties(e.languages["markup-templating"] = {}, {
        buildPlaceholders: {
            value: function(t, a, r, o) {
                if (t.language === a) {
                    var c = t.tokenStack = [];
                    t.code = t.code.replace(r, (function(e) {
                        if ("function" == typeof o && !o(e))
                            return e;
                        for (var r, i = c.length; -1 !== t.code.indexOf(r = n(a, i)); )
                            ++i;
                        return c[i] = e,
                        r
                    }
                    )),
                    t.grammar = e.languages.markup
                }
            }
        },
        tokenizePlaceholders: {
            value: function(t, a) {
                if (t.language === a && t.tokenStack) {
                    t.grammar = e.languages[a];
                    var r = 0
                      , o = Object.keys(t.tokenStack);
                    !function c(i) {
                        for (var u = 0; u < i.length && !(r >= o.length); u++) {
                            var g = i[u];
                            if ("string" == typeof g || g.content && "string" == typeof g.content) {
                                var l = o[r]
                                  , s = t.tokenStack[l]
                                  , f = "string" == typeof g ? g : g.content
                                  , p = n(a, l)
                                  , k = f.indexOf(p);
                                if (k > -1) {
                                    ++r;
                                    var m = f.substring(0, k)
                                      , d = new e.Token(a,e.tokenize(s, t.grammar),"language-" + a,s)
                                      , h = f.substring(k + p.length)
                                      , v = [];
                                    m && v.push.apply(v, c([m])),
                                    v.push(d),
                                    h && v.push.apply(v, c([h])),
                                    "string" == typeof g ? i.splice.apply(i, [u, 1].concat(v)) : g.content = v
                                }
                            } else
                                g.content && c(g.content)
                        }
                        return i
                    }(t.tokens)
                }
            }
        }
    })
}(Prism);
Prism.languages.matlab = {
    comment: [/%\{[\s\S]*?\}%/, /%.+/],
    string: {
        pattern: /\B'(?:''|[^'\r\n])*'/,
        greedy: !0
    },
    number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/,
    keyword: /\b(?:NaN|break|case|catch|continue|else|elseif|end|for|function|if|inf|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
    function: /\b(?!\d)\w+(?=\s*\()/,
    operator: /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
    punctuation: /\.{3}|[.,;\[\](){}!]/
};
!function(e) {
    var a = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/
      , t = [{
        pattern: /\b(?:false|true)\b/i,
        alias: "boolean"
    }, {
        pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/i,
        greedy: !0,
        lookbehind: !0
    }, {
        pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i,
        greedy: !0,
        lookbehind: !0
    }, /\b(?:null)\b/i, /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/]
      , i = /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i
      , n = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/
      , s = /[{}\[\](),:;]/;
    e.languages.php = {
        delimiter: {
            pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
            alias: "important"
        },
        comment: a,
        variable: /\$+(?:\w+\b|(?=\{))/,
        package: {
            pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
            lookbehind: !0,
            inside: {
                punctuation: /\\/
            }
        },
        "class-name-definition": {
            pattern: /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,
            lookbehind: !0,
            alias: "class-name"
        },
        "function-definition": {
            pattern: /(\bfunction\s+)[a-z_]\w*(?=\s*\()/i,
            lookbehind: !0,
            alias: "function"
        },
        keyword: [{
            pattern: /(\(\s*)\b(?:array|bool|boolean|float|int|integer|object|string)\b(?=\s*\))/i,
            alias: "type-casting",
            greedy: !0,
            lookbehind: !0
        }, {
            pattern: /([(,?]\s*)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string)\b(?=\s*\$)/i,
            alias: "type-hint",
            greedy: !0,
            lookbehind: !0
        }, {
            pattern: /(\)\s*:\s*(?:\?\s*)?)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|never|object|self|static|string|void)\b/i,
            alias: "return-type",
            greedy: !0,
            lookbehind: !0
        }, {
            pattern: /\b(?:array(?!\s*\()|bool|float|int|iterable|mixed|object|string|void)\b/i,
            alias: "type-declaration",
            greedy: !0
        }, {
            pattern: /(\|\s*)(?:false|null)\b|\b(?:false|null)(?=\s*\|)/i,
            alias: "type-declaration",
            greedy: !0,
            lookbehind: !0
        }, {
            pattern: /\b(?:parent|self|static)(?=\s*::)/i,
            alias: "static-context",
            greedy: !0
        }, {
            pattern: /(\byield\s+)from\b/i,
            lookbehind: !0
        }, /\bclass\b/i, {
            pattern: /((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|never|new|or|parent|print|private|protected|public|readonly|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield|__halt_compiler)\b/i,
            lookbehind: !0
        }],
        "argument-name": {
            pattern: /([(,]\s*)\b[a-z_]\w*(?=\s*:(?!:))/i,
            lookbehind: !0
        },
        "class-name": [{
            pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
            greedy: !0,
            lookbehind: !0
        }, {
            pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i,
            greedy: !0,
            lookbehind: !0
        }, {
            pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i,
            greedy: !0
        }, {
            pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
            alias: "class-name-fully-qualified",
            greedy: !0,
            lookbehind: !0,
            inside: {
                punctuation: /\\/
            }
        }, {
            pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
            alias: "class-name-fully-qualified",
            greedy: !0,
            inside: {
                punctuation: /\\/
            }
        }, {
            pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
            alias: "class-name-fully-qualified",
            greedy: !0,
            lookbehind: !0,
            inside: {
                punctuation: /\\/
            }
        }, {
            pattern: /\b[a-z_]\w*(?=\s*\$)/i,
            alias: "type-declaration",
            greedy: !0
        }, {
            pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
            alias: ["class-name-fully-qualified", "type-declaration"],
            greedy: !0,
            inside: {
                punctuation: /\\/
            }
        }, {
            pattern: /\b[a-z_]\w*(?=\s*::)/i,
            alias: "static-context",
            greedy: !0
        }, {
            pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
            alias: ["class-name-fully-qualified", "static-context"],
            greedy: !0,
            inside: {
                punctuation: /\\/
            }
        }, {
            pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,
            alias: "type-hint",
            greedy: !0,
            lookbehind: !0
        }, {
            pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
            alias: ["class-name-fully-qualified", "type-hint"],
            greedy: !0,
            lookbehind: !0,
            inside: {
                punctuation: /\\/
            }
        }, {
            pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i,
            alias: "return-type",
            greedy: !0,
            lookbehind: !0
        }, {
            pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
            alias: ["class-name-fully-qualified", "return-type"],
            greedy: !0,
            lookbehind: !0,
            inside: {
                punctuation: /\\/
            }
        }],
        constant: t,
        function: {
            pattern: /(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i,
            lookbehind: !0,
            inside: {
                punctuation: /\\/
            }
        },
        property: {
            pattern: /(->\s*)\w+/,
            lookbehind: !0
        },
        number: i,
        operator: n,
        punctuation: s
    };
    var l = {
        pattern: /\{\$(?:\{(?:\{[^{}]+\}|[^{}]+)\}|[^{}])+\}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)?)/,
        lookbehind: !0,
        inside: e.languages.php
    }
      , r = [{
        pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
        alias: "nowdoc-string",
        greedy: !0,
        inside: {
            delimiter: {
                pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
                alias: "symbol",
                inside: {
                    punctuation: /^<<<'?|[';]$/
                }
            }
        }
    }, {
        pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
        alias: "heredoc-string",
        greedy: !0,
        inside: {
            delimiter: {
                pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
                alias: "symbol",
                inside: {
                    punctuation: /^<<<"?|[";]$/
                }
            },
            interpolation: l
        }
    }, {
        pattern: /`(?:\\[\s\S]|[^\\`])*`/,
        alias: "backtick-quoted-string",
        greedy: !0
    }, {
        pattern: /'(?:\\[\s\S]|[^\\'])*'/,
        alias: "single-quoted-string",
        greedy: !0
    }, {
        pattern: /"(?:\\[\s\S]|[^\\"])*"/,
        alias: "double-quoted-string",
        greedy: !0,
        inside: {
            interpolation: l
        }
    }];
    e.languages.insertBefore("php", "variable", {
        string: r,
        attribute: {
            pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
            greedy: !0,
            inside: {
                "attribute-content": {
                    pattern: /^(#\[)[\s\S]+(?=\]$)/,
                    lookbehind: !0,
                    inside: {
                        comment: a,
                        string: r,
                        "attribute-class-name": [{
                            pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i,
                            alias: "class-name",
                            greedy: !0,
                            lookbehind: !0
                        }, {
                            pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
                            alias: ["class-name", "class-name-fully-qualified"],
                            greedy: !0,
                            lookbehind: !0,
                            inside: {
                                punctuation: /\\/
                            }
                        }],
                        constant: t,
                        number: i,
                        operator: n,
                        punctuation: s
                    }
                },
                delimiter: {
                    pattern: /^#\[|\]$/,
                    alias: "punctuation"
                }
            }
        }
    }),
    e.hooks.add("before-tokenize", (function(a) {
        /<\?/.test(a.code) && e.languages["markup-templating"].buildPlaceholders(a, "php", /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/g)
    }
    )),
    e.hooks.add("after-tokenize", (function(a) {
        e.languages["markup-templating"].tokenizePlaceholders(a, "php")
    }
    ))
}(Prism);
Prism.languages.python = {
    comment: {
        pattern: /(^|[^\\])#.*/,
        lookbehind: !0,
        greedy: !0
    },
    "string-interpolation": {
        pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
        greedy: !0,
        inside: {
            interpolation: {
                pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
                lookbehind: !0,
                inside: {
                    "format-spec": {
                        pattern: /(:)[^:(){}]+(?=\}$)/,
                        lookbehind: !0
                    },
                    "conversion-option": {
                        pattern: /![sra](?=[:}]$)/,
                        alias: "punctuation"
                    },
                    rest: null
                }
            },
            string: /[\s\S]+/
        }
    },
    "triple-quoted-string": {
        pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
        greedy: !0,
        alias: "string"
    },
    string: {
        pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
        greedy: !0
    },
    function: {
        pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
        lookbehind: !0
    },
    "class-name": {
        pattern: /(\bclass\s+)\w+/i,
        lookbehind: !0
    },
    decorator: {
        pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
        lookbehind: !0,
        alias: ["annotation", "punctuation"],
        inside: {
            punctuation: /\./
        }
    },
    keyword: /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
    builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
    boolean: /\b(?:False|None|True)\b/,
    number: /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
    operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    punctuation: /[{}[\];(),.:]/
},
Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest = Prism.languages.python,
Prism.languages.py = Prism.languages.python;
Prism.languages.sql = {
    comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
        lookbehind: !0
    },
    variable: [{
        pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
        greedy: !0
    }, /@[\w.$]+/],
    string: {
        pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
        greedy: !0,
        lookbehind: !0
    },
    identifier: {
        pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,
        greedy: !0,
        lookbehind: !0,
        inside: {
            punctuation: /^`|`$/
        }
    },
    function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
    keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
    boolean: /\b(?:FALSE|NULL|TRUE)\b/i,
    number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
    operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/
};
