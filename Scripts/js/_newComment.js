"use strict";

$(function () {
    var createElement = function createElement(creationString) {
        var destruct = creationString.split(/(?=\.|#|\{|\[)/);
        var node = document.createElement(destruct[0]);
        destruct.shift();

        destruct.forEach(function (i) {
            var value = i.substring(1);

            switch (i.charAt(0)) {
                case ".":
                    node.classList.add(value);
                    break;
                case "#":
                    node.id = value;
                    break;
                case "{":
                    value = value.slice(0, -1);
                    node.innerText = value;
                    break;
                case "[":
                    value = value.slice(0, -1);
                    value = value.split("=");
                    node.setAttribute(value[0], value[1]);
                    break;
            }
        });

        node.addChild = function () {
            for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
                children[_key] = arguments[_key];
            }

            children.forEach(function (child) {
                if (typeof child === "string") node.appendChild(createElement(child));
                if (child.nodeName) node.appendChild(child);
            });
            return node;
        };

        return node;
    };

    var comments = dc.query("#comments");
    if (comments) {
        (function () {
            var form = comments.query("form");
            var replys = comments.queries(".content button");

            var clearForm = function clearForm() {
                form.reset();
            };

            if (form) form.onsubmit = function (e) {
                e.preventDefault();
                validateSection(form).then(function () {
                    var formData = new FormData(e.target);
                    var formDataObject = {};
                    formData.forEach(function (key, value) {
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
                    }).then(function (response) {
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
                })["catch"](function () {
                    callModal.fail("لطفا عنوان و متن نظر را خالی نگذارید!");
                });
            };

            if (replys.length) replys.forEach(function (reply) {
                reply.onclick = function () {
                    callModal.custom(function (showModal, closeModal) {
                        var textarea = createElement("textarea");
                        textarea.id = "answer-message";
                        var replyForm = createElement("form.commentReplyForm").addChild("p{پاسخ خود را ثبت کنید}", textarea, "button{ثبت}");
                        var pCommentId = reply.dataset.pcommentid;
                        var url = reply.dataset.url;
                        replyForm.dataset.url = url;
                        replyForm.dataset.pcommentid = pCommentId;
                        replyForm.onsubmit = function (e) {
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
                            }).then(function (response) {
                                if (!response.ok) {
                                    callModal.fail("خطای سرور");
                                    console.log(response);
                                    return;
                                }
                                closeModal().then(function () {
                                    callModal.success("نظر شما با موفقیت ثبت شد!");
                                });
                                clearForm();
                            });
                        };
                        showModal(replyForm);
                        setValidations();
                    });
                };
            });
        })();
    }
});

