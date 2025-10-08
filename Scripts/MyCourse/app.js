$(function () {

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
                setTimeout(() => { document.querySelector('.input.hidden').classList.remove('hidden'); }, 10);
            })
        })

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
                setTimeout(() => { item.parentElement.remove() }, 200);
            }
        }
        dc.queries('#practiceModal i.fa-times').forEach(item => {
            removerEvnt(item)
        })

        //put the name of uploaded file into the box!
        function inputChangeHandler(item) {
            item.addEventListener('change', (e) => {
                if (e.target.type === "file") {
                    let path = e.target.files[0].name;
                    item.parentElement.querySelector('span').innerHTML = path;
                    item.parentElement.classList.remove('errored');
                }
                
            })
        }
        dc.queries('#practiceModal input').forEach(item => { inputChangeHandler(item) })

        //remove red heighlights when ok
        dc.query('#practiceModal textarea').onkeydown = _ => {
            _.target.classList.remove('errored')
        }

        //clear all
        function clearPracticeForm() {
            dc.queries('#practiceModal .input label span').forEach(item => {
                item.innerHTML = '';
            })
            dc.query('#practiceModal').reset();
            dc.queries('#practiceModal .part').forEach(item => {
                let inputs = item.querySelectorAll('.input');
                if (inputs.length > 1) {

                    inputs.forEach((i, index) => {
                        if (index == inputs.length - 1) return
                        i.remove();
                    })
                    console.log(item)

                    // for (let m=0; m < inputs.length; m++) {
                    //   console.log(inputs[m])
                    // }
                }
            })
        }
        //get title
        function getTitle(string) {
            let title = string.match(/(?<=<title>).*?(?=<\/title>)/i)
            return title
        }

        //upload validations
        function isFormValid() {
            const form = dc.id("practiceModal");
            const text = form.query("textarea"); //not empty
            const pics = form.queries('input[id^=photo-]'); //between 2 - 20 mb
            const errorMsg = $('#errormessage'), msg = $('#message');
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
                if (!pic.files[0]) return
                if (pic.files[0].size < 2000 || pic.files[0].size > 2000000) {
                    throwErr("حجم عکس باید بین 2 کیلوبایت تا 2 مگابایت باشد", pic.parentElement);
                    arePicsValid = false
                }
            })
            if (!arePicsValid) return false

            return true
        }

        //upload submit
        var isInUpload = false;
        /* if ($('#practiceModal').length)*/
        $(document).on('submit', '#practiceModal', function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.preventDefault();

            if (!isFormValid()) return
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

            $('#practiceModal').find('[type="file"]').each(function (i) {
                if ($(this)[0].files.length > 0) {
                    data.append("file" + i, $(this)[0].files[0]);
                }
            });

            var removedAttachment = [];
            $('.removedAttachment').each(function () {
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
                complete: function () {
                    removeLoader();
                    isInUpload = false;
                },
                //end
                xhr: function () {
                    let xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            let percentComplete = evt.loaded / evt.total;
                            percentComplete = parseInt(percentComplete * 100);
                            setUploadPercent(percentComplete)
                        }
                    }, false);
                    return xhr;

                },
                success: function (response) {
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
                error: function (err) {
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


        $(document).on('click', '.deleteAttachment', function (e) {
            $(this).toggleClass('removedAttachment');
        })


        $(document).on('click', '[data-answereditid]', function () {
            var id = $(this).attr('data-answereditid');
            callModal.spinner(done => {

                $.get('/courses/getAnswerEditForm/' + id, function (result) {
                    done().then(() => {
                        callModal(result, 'fullscreen', true);
                    })
                })
            })

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
                callModal("پیام استاد:<br/> " + text).then(() => {
                    location.reload();
                })
            }
            if (title.classList?.contains("display")) {
                click.addEventListener("click", () => {
                    massageDisplayed(id);
                    title.classList.remove("display");
                }, { once: true })
            }
        })
        function massageDisplayed(id) {
            let courseClassId = teacherMsg.dataset.courseid;
            let url = '/Courses/ShowMessage';
            $.ajax({
                url: url,
                data: { messageId: id, courseClassId: courseClassId },
                type: "Post",
                success: function (response) {
                    if (!response.succes) return
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