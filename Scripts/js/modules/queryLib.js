//*query framework
"use strict";

(function () {
    var dc = {
        query: function query(e) {
            return _query(document, e);
        },
        queries: function queries(e) {
            return _queries(document, e);
        },
        id: function id(e) {
            return getId(document, e);
        }
    };
    function getId(ele, trgt) {
        return querify(ele.getElementById(trgt));
    }
    function _query(ele, trgt) {
        return querify(ele.querySelector(trgt));
    }
    function _queries(ele, trgt) {
        return querify(ele.querySelectorAll(trgt));
    }

    function querify(ele) {
        if (!ele) return;
        ele.query = function (e) {
            return _query(ele, e);
        };
        ele.queries = function (e) {
            return _queries(ele, e);
        };
        return ele;
    }
    Object.prototype.query = dc.query;
    Object.prototype.queries = dc.queries;
    Object.prototype.id = dc.id;

    window.dc = dc;
})();

