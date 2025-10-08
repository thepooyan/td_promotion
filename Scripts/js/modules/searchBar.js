//search Bar
'use strict';

$(function () {
    var search = document.getElementById('search');
    if (search) {
        (function () {
            var inputTypeHandler = function inputTypeHandler(e) {
                clearTimeout(timeout);
                if (e.target.value.length > 2 && e.target.value !== currentSearch) {
                    timeout = setTimeout(function () {
                        asyncSearchFor(e.target.value).then(showSearchResult);
                    }, 500);
                }

                if (e.key === "Enter") {
                    searchFor(e.target.value);
                }
            };

            var searchFor = function searchFor(text) {
                if (!text) return;
                if (searchResult) {
                    if (searchResult.searchText === text) {
                        var activeCategories = searchResult.map(function (i) {
                            return i.Type;
                        });
                        setLocalStorage(activeCategories, activeCategories[0], searchResult.searchText);
                        location.href = '/search';
                    }
                } else {
                    setLocalStorage(null, null, text);
                    location.href = '/search';
                }
            };

            var asyncSearchFor = function asyncSearchFor(text) {
                currentSearch = text;
                search.classList.add('loading');
                return new Promise(function (resolve, reject) {
                    var data = { searchText: text };
                    var url = '/Home/HomeSearch';
                    $.get(url, data, function (response) {
                        response.searchText = text;
                        if (currentSearch === text) {
                            resolve(response);
                            search.classList.remove('loading');
                        } else reject();
                    });
                    //$.ajax({
                    //    method: 'Get',
                    //    url: '/Home/HomeSearch',
                    //    contentType: 'application/json',
                    //    data: {},
                    //    success: response => {
                    //        response.searchText = text;
                    //        if (currentSearch === text) {
                    //            resolve(response);
                    //            search.classList.remove('loading');
                    //        } else reject();
                    //    }
                    //})
                });
            };

            var showSearchResult = function showSearchResult(object) {
                if (object.length <= 1) return nothingFound(object);
                searchResult = object;
                var fragment = document.createDocumentFragment();
                object.forEach(function (item) {
                    var a = document.createElement('a');
                    a.href = item.Href;
                    a.innerHTML = 'نتایج برای ' + item.searchText + ' در دسته <span>' + item.CategoryName + '</span>'; /*(${ item.Count })*/
                    a.dataset.icon = item.Icon;
                    a.dataset.type = item.Type;
                    a.onclick = function (e) {
                        var activeCategories = object.map(function (i) {
                            return i.Type;
                        });
                        setLocalStorage(activeCategories, item.Type, item.searchText);
                    };

                    fragment.appendChild(a);
                });
                addOrReplaceChildern(searchContent, fragment);
            };

            var nothingFound = function nothingFound(object, isEmpty) {
                var span = document.createElement('span');
                span.innerText = 'متاسفانه نتیجه ای برای ' + object.searchText + ' یافت نشد! :/';
                searchContent.replaceChildren(span);
            };

            var addOrReplaceChildern = function addOrReplaceChildern(element, child) {
                if (element.childElementCount > 0) element.replaceChildren(child);else element.appendChild(child);
            };

            var setLocalStorage = function setLocalStorage(activeCategories, type, text) {
                localStorage.setItem("activeCategories", activeCategories);
                localStorage.setItem("type", type);
                localStorage.setItem("searchText", text);
            };

            var input = search.querySelector('input');
            var searchContent = search.querySelector('ul');
            var magnifire = search.querySelector('img');
            var currentSearch = undefined,
                searchResult = undefined;

            input.onkeyup = inputTypeHandler;
            magnifire.onclick = function () {
                return searchFor(input.value);
            };

            var timeout = undefined;
        })();
    }
});

