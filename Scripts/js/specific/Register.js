$(document).on("blur", "#Mobile", function () {
    var str = $("#Mobile").val();
    let validPhone = /^(([0|+])\d+)$/.test(str);
    //if (!str.startsWith("09") || str.length != 11) {
    if (!validPhone) {
        $('[data-valmsg-for="Mobile"]').text("شماره وارد شده معتبر نمی باشد").removeClass('field-validation-valid').addClass('field-validation-error');
    } else {
        $.ajax({
            url: "@Url.Action("validPhone", "User")",
            data: { "Mobile": str }
            , type: "get"
            , success: function (data) {
                $('[data-valmsg-for="Mobile"]').text(data).removeClass('field-validation-valid').addClass('field-validation-error');
            },
        });
    }
});
$(document).on("blur", "#UserName", function () {
    var str = $("#UserName").val();
    if (str.length < 3 || str.length > 100) {
        $('[data-valmsg-for="UserName"]').text("نام کاربری باید بین 3 تا 100 حرف باشد.").removeClass('field-validation-valid').addClass('field-validation-error');
    } else {
        $.ajax({
            url: "@Url.Action("validUserName", "User")"
                , data: { "UserName": str }
            , type: "get"
            , success: function (data) {
                $('[data-valmsg-for="UserName"]').text(data).removeClass('field-validation-valid').addClass('field-validation-error');
            },
        });
    }
});
$(document).on("blur", "#Password,#PasswordRetry", function () {
    let pass = $("#Password").val();
    let passRe = $("#PasswordRetry").val();
    if ((pass == "" && passRe != "") || (pass == "" && passRe != "") || (pass != passRe))
        $("span[data-valmsg-for='PasswordRetry']").text("تکرار کلمه عبور صحیح نیست.").removeClass('field-validation-valid').addClass('field-validation-error');
    if (pass == "" && passRe == "") {
        $("span[data-valmsg-for='Password']").text("کلمه عبور را وارد کنید").removeClass('field-validation-valid').addClass('field-validation-error');
        $("span[data-valmsg-for='PasswordRetry']").text('').removeClass('field-validation-error').addClass('field-validation-valid');
    }
});
$("#dWarning").hide();
var d = $("#Day");
var m = $("#Mounth");
var y = $("#Year");
