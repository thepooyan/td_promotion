let btnTab = document.querySelectorAll(".btn-tab");
let categorySection = document.querySelectorAll(".content-tab section");
let queryTab = document.querySelector(".query-tab");
let queryTabTxt = document.querySelector(".query-tab span");
let itemsTab = document.querySelector(".items-tab");
let titleQueryTab = document.querySelector(".title-query-tab");
let countItem = document.querySelectorAll(".count-item");
let sendBtnTab = document.querySelectorAll(".btn-filter-search button");
let formFilter = document.querySelectorAll(".filter-search");

function areThereActiveCategories() {
    let activeTab = localStorage.getItem('type');
    let activeCategoriesData = localStorage.getItem('activeCategories').split(',') || null;

    if (activeCategoriesData[0] === "null") {
        let cate = Object.keys(CATEGORIES);
        activeTab = cate[0];
        return [cate, activeTab]
    } else
        return [activeCategoriesData, activeTab]
}

const searchText = localStorage.getItem('searchText');
const CATEGORIES = {
    Courses: 0,
    Articles: 1,
    Films: 2,
    Project: 3,
    Ebooks: 4,
    Weblog: 5,
}
const [ activeCategories, activeTab ] = areThereActiveCategories();

if (!activeCategories.length) window.location.pathname = '/';


function activateTab(num) {
    btnTab[num].click();
}

//resposive code
btnTab.forEach(item => {
    let titleTab = item.querySelector('.title-tab')
    item.onclick = e => {
        queryTabTxt.innerHTML = titleTab.innerHTML;
    }
})
queryTab.addEventListener("click", function () {
    itemsTab.classList.toggle("active");
    titleQueryTab.classList.toggle("active");
})

function getCategory(cateName) {
    return new Promise(cateResolve => {

        const ID = CATEGORIES[cateName];

        function getMainData(category, searchText, pageNumber = 1) {

            let url = `/${category}/Education${category}`;
            let data = { searchText: searchText, pageNumber: pageNumber }

            return new Promise((mainDataResolve) => {
                $.get(url, data, function (response) {
                    categorySection[ID].innerHTML = response;
                    categorySection[ID].classList.remove('loading');
                    initCustomSelect();
                    mainDataResolve();
                })
            })

        }

        function getPageInation(category, pagenumber) {
            let urlGetPagination = `/${cateName}/GetPagination`;
            let data = {};
            let pageInationSec = categorySection[ID].querySelector('.TD-pagination');

            if (!pageInationSec) return

            switch (category) {
                case 'Project':
                    data = { kind: 3 };
                    break;
                case 'Ebooks':
                    data = {
                        Language: null,
                        PageSize: 12,
                    };
                    break;
            }
            data['searchText'] = searchText;
            data['pageNumber'] = pagenumber;

            $.get(urlGetPagination, data, function (response) {
                pageInationSec.innerHTML = response;
                categorySection[ID].classList.remove('loading');
            }).then(() => {
                let innerPageInations = categorySection[ID].querySelectorAll('.TD-pagination .page-link')

                innerPageInations.forEach(item => {
                    item.onclick = _ => {
                        categorySection[ID].classList.add('loading');
                        getMainData(cateName, searchText, item.dataset.pagenumber).then(_ => { getPageInation(cateName, item.dataset.pagenumber) })
                    }
                })
            })

        }

        getMainData(cateName, searchText).then(() => {
            cateResolve();
            getPageInation(cateName);
        })

    })
}

function getCounts() {
    Object.keys(CATEGORIES).forEach(cate => {
        if (activeCategories.filter(active => cate === active).length)
            getCount(cate);
        else
            setEmpty(cate);
    })

    function getCount(cate) {
        let url = `/${cate}/Get${cate}CountBySearchText`;
        let data = { searchText: searchText };

        $.ajax({
            url: url,
            data: data,
            type: "POST",
            success: function (response) {
                if (typeof response.count !== "number") return
                countItem[CATEGORIES[cate]].innerHTML = response.count;
            }
        })
    }

    function setEmpty(cate) {
        countItem[CATEGORIES[cate]].innerHTML = 0;
    }
}

async function startLoad() {
    callModal.spinner(async (done) => {
        //activate current tab
        let ID = CATEGORIES[activeTab];
        activateTab(ID);
        categorySection[ID].classList.remove('loading');

        await getCategory(activeTab);
        setSecondLayerSearchEvnt(activeTab);
        done();
        Object.keys(CATEGORIES).forEach(cate => {
            if (cate === activeTab) return
            getCategory(cate).then(() => {
                setSecondLayerSearchEvnt(cate);
            });
        })
    }, true)
}

function setSecondLayerSearchEvnt(categoryName) {
    const ID = CATEGORIES[categoryName];
    const url = `/${categoryName}/Education${categoryName}`;

    const filterBar = document.querySelectorAll(`.${categoryName} .filterBar`);
    filterBar.forEach(fb => {
        let button = fb.querySelector('button');
        let textInput = fb.querySelector('input');
        let category = fb.querySelector('select:first-child');

        button.onclick = e => {
            e.preventDefault();
            categorySection[ID].classList.add('loading');

            let data = {};
            data["searchText"] = textInput.value;
            data["categoryId"] = category.value;

            switch (ID) {
                case 2:
                    let publisher = fb.querySelector('#CompanyId');
                    data["companyId"] = publisher.value;
                    break;
                case 4:
                    let languege = fb.querySelector('#Language');
                    let categoryId = fb.querySelector('#EbookCategoryURL');
                    data["language"] = languege.value;
                    data["EbookCategoryURL"] = categoryId.value;
                    break;
            }

            $.get(url, data, function (response) {
                categorySection[ID].innerHTML = response;
                categorySection[ID].classList.remove('loading');
                initCustomSelect();
                setSecondLayerSearchEvnt(categoryName);
            })
        }
    })
}

getCounts();

$(document).ready(function () {
    startLoad();

    // ----star----
    $("[data-star]").each(function (index, item) {
        let rateStar = $(item).data("star");
        let children = $(item).children("i");

        for (let i = 0; i < rateStar; i++) {
            $(children[i]).addClass('active');
        }
    })

    let filterQuery = $(".filter-query");
    let overlay = $(".overlay")
    $(".title-filter-query").click(function () {
        filterquery();
    })
    $(".filter > div:first-child").click(function () {
        filterquery();
    })
    $(".close i").click(function () {
        closeFilter();
    })
    overlay.click(function () {
        closeFilter();
    })
    function filterquery() {
        filterQuery.addClass("show");

        $(document.body).addClass("active");
        overlay.addClass("active");
    }
    function closeFilter() {
        filterQuery.removeClass("show");
        $(document.body).removeClass("active");
        overlay.removeClass("active");
    }

    //getUp
    const getUp = dc.id("getUp");
    if (getUp) {
      const checkScroll = () => {
        if (window.scrollY > window.innerHeight) getUp.classList.add("active");
        else getUp.classList.remove("active");
      };

      window.addEventListener("scroll", checkScroll);
    }
})