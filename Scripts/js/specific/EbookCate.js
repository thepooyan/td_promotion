$(document).ready(function () {
    $(".send-btn").click(function (e) {
        e.preventDefault();
        var slug = $("#Slug").val();
        var mode = $("#Mode").val();
        var pageNumber = $("#PageNumber").val();
        var searchText = $("#SearchText").val();
        var language = $("#Language").val();
        var ebookCategoryURL = $("#EbookCategoryURL").val();
        var orderBy = $("#OrderBy").val();
        if (searchText != "" || language != "" || ebookCategoryURL != "" || orderBy != "") {
            pageNumber = "";
        }

        var queryString = "?Mode=" + mode + "&SearchText=" + searchText + "&Language=" + language + "&EbookCategoryURL=" + ebookCategoryURL + "&OrderBy=" + orderBy;
        var slugUrl = slug != "" ? "/" + slug : "";
        if (ebookCategoryURL != slug) {
            slugUrl = "";
        }

        var url = "/EBookCategory" + slugUrl + queryString;
        window.location.href = url;
    });
});