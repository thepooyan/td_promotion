/*/*const { Alert } = require("../bootstrap");*/

let isReplay = {
    isReplay: false,
    user: "",
    id: null
};
let isEdit = {
    isEdit: false,
    id: null
};
$(function () {    
    scrollToEnd();
    var chat = $.connection.chatroomHub;
    $(document).on('submit', '.frm', function (e) {
        
        try {
            function sendForm() {
                var sendFile = undefined;
                $('#chat .frm').find('input[type="file"]').each(function () {
                    var file = $(this)[0].files[0];
                    if (file)
                        sendFile = file;
                });
                var isRecorder = false;
                if (audioRecorder.audioBlobs.length > 0) {
                    sendFile = audioRecorder.audioBlobs[0];
                    isRecorder = true;
                }

                // get data
                var CoursClassID = $('.frm [name="CourseClassID"]').val();
                var Message = $('.frm [name="Message"]').val();
                //-- check file exist
                if (!sendFile) {
                    var data = {
                        Message: Message,
                        CourseClassID: CoursClassID,
                        ReplayID: isReplay.id,
                        ID: isEdit.id
                    };
                    if (!isReplay.isReplay) {
                        data.ReplayID = null;
                    }
                    if (!isEdit.isEdit) {
                        data.ID = 0;
                    }
                    if (Message.trim()) {
                        chat.server.sendMessage(data);
                        setTimeout(() => {
                            setReplyEvnt();
                            setAllClickEvnts();
                            setReplyedToClickEvent();
                            setImageEventHandler();
                        }, 1000);
                        closeReply();
                    }

                }
                else { //--- upload file with ajax
                    var formData = new FormData();
                    if (isRecorder)
                        formData.append("File", sendFile, "blob.webm");
                    else
                        formData.append("File", sendFile);
                    formData.append("Message", Message);
                    formData.append("CourseClassID", CoursClassID);

                    var fileID = "temp" + (new Date()).getTime();
                    var message = {
                        UserID: $('#userId').val(),
                        Message: "?? ??? ?????"
                    };
                    const fileProgress = $('#fileProgress');
                    const fileProgressBar = $('#fileProgress > #progressBar');
                    $.ajax({
                        type: "POST",
                        url: "/Courses/UploadChat",
                        beforesend: function () {
                            $('#chat .veiw').append(createMessageBox(message, fileID));

                        },
                        xhr: function () {
                            var myXhr = $.ajaxSettings.xhr();
                            if (myXhr.upload) {
                                myXhr.upload.addEventListener("progress", function (event) {
                                    if (event.lengthComputable) {
                                        const percentComplete = Math.round((event.loaded / event.total) * 100);
                                        fileProgress.addClass('active');
                                        fileProgress.attr('data-value', percentComplete);
                                        fileProgressBar.css('width', `${percentComplete}%`);
                                    }
                                }, false);
                            }
                            return myXhr;
                        },
                        success: function (data) {
                            if (data.success) {
                                $('.' + fileID).remove();
                                setTimeout(() => {
                                    setReplyEvnt();
                                    setAllClickEvnts();
                                    setReplyedToClickEvent();
                                    setImageEventHandler();
                                }, 1000);
                                fileProgress.removeClass('active');
                                fileProgress.data('value', 0);
                                fileProgressBar.css('width', `${0}%`);
                            }
                            else {
                                alert("Error " + data.message)
                            }

                        },
                        error: function (error) {
                            fileProgress.removeClass('active');
                            fileProgress.data('value', 0);
                            fileProgressBar.css('width', `${0}%`);
                            alert('مشکلی در آپلود فایل رخ داد')
                        },
                        async: true,
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                    });
                    var options = {
                        body: message.Message,
                        icon: "/Content/images/Logo/notificationLogo.png",
                        vibrate: [100, 50, 100],
                        data: { primarykey: 1 }
                    }
                }

                $('#chatInput').val('').focus();
                hideFileModal();
                return false;
            }
            e.stopPropagation();
            e.preventDefault();
            if (audioRecorder.mediaRecorder && audioRecorder.mediaRecorder.state === 'recording') {
                audioRecorder.stop()
                    .then(audioAsblob => {
                        handleHidingRecordingControlButtons();
                        sendForm();
                    })
                    .catch(console.log);
            }
            else {
                sendForm();
            }
            // get file
            
        } catch (error) {
            callModal.notif(error.message)
        }
        
    })
    

    //$(document).on('keyup', '.frm [name="Message"]', function (evt) {
    //    if (evt.keyCode == 13 && !evt.shiftKey) {
    //        $('.frm').submit()
    //    }
    //})

    // Reference the auto-generated proxy for the hub.  
    // Create a function that the hub can call back to display messages.
    chat.client.NewMessage = function (message) {
        if (message.CourseClassID == $('#courseClassId').val()) {
            $('#chat .veiw').append(createMessageBox(message));
            setTimeout(() => {
                setReplyEvnt();
                setAllClickEvnts();
                setReplyedToClickEvent();
                setImageEventHandler();
            }, 1000);
        }
        //if (message.UserID != $('#userId').val() && message.CourseClassID == $('#courseClassId').val()) {
        //    Notification.requestPermission().then(permession => {
        //        if (permession === "default" || permession === "denied") {
        //            alert("لطفا ابتدادسترسی به نوتیفیکیشن خودرا قبول کنید تا نوتیفیکیشن های گروه برای شما ارسال شود.")
        //        }
        //        else {
        //            console.log(message)
        //            var options = {
        //                body: message.Message,
        //                icon: "/Content/images/Logo/notificationLogo.png",
        //                vibrate: [100, 50, 100],
        //                data: { primarykey: 1 }
        //            }
        //            var notification = new Notification(message.ClassName, options);
        //            notification.addEventListener("click", (e) => {
        //                window.location.href = ""
        //            })
        //        }
        //    })
        //}
        checkNewMessage(message.CoursClassID);
        scrollToEnd();
    };



    chat.client.EditMessage = function (message) {
        isEdit.isEdit = false;
        const chatView = $('#chat .veiw')[0];
        const messageBoxes = chatView.querySelectorAll(".message-box");
        messageBoxes.forEach(item => {
            if (item.id == message.ID) {
                var itemText = item.querySelector(".txt");
                itemText.textContent = message.Message;
            }
        })
    }

    chat.client.RemoveMessage = function (message) {       
        const chatView = $(`#chat .veiw .message-box[id="${message.ID}"]`);
        if (chatView.length) chatView.remove();
    }

    // Get the user name and store it to prepend to messages.

    // Set initial focus to message input box.  
    $('#chatInput').focus();
    $.connection.hub.disconnected(function () {
        setTimeout(function () {
            $.connection.hub.start().done();
        }, 500); // Restart connection after 5 seconds.
    });

    // Start the connection.
    $.connection.hub.start().done(console.log);

    $(document).on('change', '#imageFileChat', imageFileChat);
    $(document).on('change', '#videoFileChat', videoFileChat);
    $(document).on('change', '#customFileChat', customFileChat);
    let closeFileModal = document.querySelector('#closeFileModal');
    closeFileModal.addEventListener('click', hideFileModal);

    $(document).on('click', '[data-cid]', function () {
        var id = $(this).attr('data-cid');
        selectChat(id);
    })

    $('.frm > .fa-paperclip label').on("click", function (e) {
        e.stopPropagation();
        $(this).parents('.fa-paperclip').removeClass("active");
    });
    function setReplyedToClickEvent() {
        $('#chat > .veiw > div[id] a:not(.fileLink)').click(function (e) {
            e.preventDefault();
            let id = $(this).attr("href").replace("#", "");
            let repMsg = document.querySelector(`div[id='${id}']`);
            repMsg.scrollIntoView();
            $(repMsg).addClass("selected");
            setTimeout(function () {
                $(repMsg).removeClass("selected");
            }, 4000);
        });
    }
    setReplyedToClickEvent();

});

function createMessageBox(message, className) {
    var isMe = message.UserID == $('#userId').val();
    if (!className)
        className = "";

    if (!isMe)
        className += " others";
    if (message.ReplayID == null || message.ReplayID == 0) {

        return '<div class="message-box ' + className + '"id="' + message.ID + '">' +
            '<div class="icon"></div><div class="content" data-user="' + message.Name + '" data-time="' + message.CreateDateF + '"><div class="txt" data-id="' + message.ID + '">' + htmlEncode(message) + '</div><i class="fas fa-reply"></i></div>' +
            '</div>';
    }
    else {
        return '<div class="message-box ' + className + '"id="' + message.ID + '">' +
            '<div class="icon"></div><div class="content" data-user="' + message.Name +
            '" data-time="' + message.CreateDateF +
            '"><div class="txt" data-id="' + message.ID + '">' + htmlEncode(message) +
            '</div><i class="fas fa-reply"></i>' +
            '<a href = "#' + message.ReplayID + '" > ' + message.ReplayedName + '</a></div > ' +
            '</div>';
    }

}

function scrollToEnd() {
    try {
        $('#chat .veiw').scrollTop($('#chat .veiw')[0].scrollHeight)
    } catch { }
}
// This optional function html-encodes messages for display in the page.

function htmlEncode(message) {
    var encodedValue = $('<div />');

    if (message.Attachment && message.Attachment.length > 0) {
        switch (message.Attachment[0].FileType.toLowerCase()) {
            case "image":
                encodedValue[0].innerHTML = '<img src="' + message.Attachment[0].FileUrl + '" />';
                break;
            case "video":
                encodedValue[0].innerHTML = '<video controls poster="/Content/images/img/videoPoster.webp" preload="none"><source  src="' + message.Attachment[0].FileUrl + '" /></video>';
                break;
            case "audio":
                encodedValue[0].innerHTML = '<audio controls><source  src="' + message.Attachment[0].FileUrl + '" /></audio>';
                break;

            default:
                encodedValue[0].innerHTML = '<a download class="fileLink" href="' + message.Attachment[0].FileUrl + '">' + message.Attachment[0].FileUrl.split('/').pop() + '</a>';
                break;

        }
    }
    var value = message.Message.split('\n');  //replace /n with br tag  


    for (var i = 0; i < value.length; i++) {
        if (value[i] != '') {
            encodedValue[0].innerHTML += value[i];
            if (i != value.length - 1)
                encodedValue[0].innerHTML += '<br />';
        }
    }
    return encodedValue.html();
}


function selectChat(id) {
    $.get("/courses/getQuestionChatroomTab?renderScript=false&coursClassID=" + id, function (res) {
        $('#chatContianer').html(res)
    })
}

function checkNewMessage(id) {
    if (!$('#chatContianer').length || id == $('[name="CourseClassID"]').val())
        return;
    var onlyMyCourse = $('#onlyMyCourse').val();
    $.get('/teacher/getSideChat?onlyMyCourse=' + onlyMyCourse + '&coursClassID=' + id, function (res) {
        $('#chatSide').html(res)
    })
}

function setImageEventHandler() {
    var chatImages = chat.veiw.querySelectorAll('.content img');
    chatImages.forEach(function (img) {
        img.onclick = function (_) {
            callModal.image(img.src, { zoom: true });
        };
        img.onerror = function () {
            img.onclick = null;
            img.onerror = null;
            img.classList.add('unclickable');
        };
    });
}
/* preview modal */
function isValidImageMime(file) {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/bmp', 'image/gif'];
    return allowedMimeTypes.includes(file.type);
}
function isValidVideoMime(file) {
    const allowedMimeTypes = ['video/mp4'];
    return allowedMimeTypes.includes(file.type);
}
function isValidFile(file) {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const allowedExtensions  = ['mp4', 'zip' , 'mp3' , 'rar' , 'pdf'];
    return allowedExtensions.includes(fileExtension);
}
function imageFileChat() {
    var file = $('#imageFileChat')[0].files[0];
    if (isValidImageMime(file)) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var img = $('<img />');
            console.log(this.result)
            img.attr('src', this.result);
            $('#chatFilePreview').html(img);
            //---
            showFileModal();
        }
    }
    else {
        callModal.fail('فرمت فایل نامعتبر . فرمت های مجاز .png,.jpg,.bmp,.jpeg,.gif')
        $('#imageFileChat').val('');
        
    }
    

}

function customFileChat() {
    var file = $('#customFileChat')[0].files[0];
    if (isValidFile(file)) {
        var fileName = $('#customFileChat')[0].files[0].name;

        var preview = $('<div class="fileName"><i class="fas fa-file" ></i><span>' + fileName + '</span></div>');

        $('#chatFilePreview').html(preview);
        //---
        showFileModal();
    }
    else {
        callModal.fail('فرمت فایل نامعتبر . فرمت های مجاز .mp3,.mp4,.zip,.rar,.pdf');
        $('#customFileChat').val('');

    }
    
}

function videoFileChat() {
    var file = $('#videoFileChat')[0].files[0];
    if (isValidVideoMime(file)) {
        var url = URL.createObjectURL(file);
        var video = $('<video controls ></video>');
        var source = $('<source />');
        source.attr('src', url);
        video.append(source);
        $('#chatFilePreview').html(video);
        //---
        showFileModal();
    }
    else {
        callModal.fail('فرمت فایل نامعتبر . فرمت های مجاز .mp4');
        $('#videoFileChat').val('');

    }
    
}

function showFileModal() {
    $('#showFileModal').css('height', '33vh');
}

function hideFileModal() {
    $('#showFileModal').css('height', '0');
    $('#imageFileChat').val('');
    $('#videoFileChat').val('');
    $('#customFileChat').val('');
    audioRecorder.audioBlobs = [];
}

/* end preview modal*/

/* voice handler */

//View
var microphoneButton = document.querySelector(".start-recording-button");
var recordingControlButtonsContainer = document.querySelector(".recording-contorl-buttons-container");
var stopRecordingButton = document.querySelector(".stop-recording-button");
var cancelRecordingButton = document.querySelector(".cancel-recording-button");
var elapsedTimeTag = document.querySelector(".elapsed-time");
var textIndicatorOfAudiPlaying = document.querySelector(".text-indication-of-audio-playing");

//Listeners
microphoneButton.addEventListener("click", startAudioRecording);

//Listen to start recording button
//$(document).on('click', microphoneButton, startAudioRecording);

stopRecordingButton.addEventListener("click", stopAudioRecording)

//Listen to stop recording button
//$(document).on('click', stopRecordingButton, stopAudioRecording);

//Listen to cancel recording button
cancelRecordingButton.addEventListener("click", cancelAudioRecording)
$(document).on('click', cancelRecordingButton, cancelAudioRecording);



function playAudio(recorderAudioAsBlob) {

    var reader = new FileReader();

    //once content has been read
    reader.onload = (e) => {

        var base64URL = e.target.result;
        var audioElement = $('<audio controls></audio>')
        var sourceElement = $("<source />");
        $(audioElement).append($(sourceElement));


        sourceElement.attr("src", base64URL);


        var BlobType = recorderAudioAsBlob.type.includes(";") ?
            recorderAudioAsBlob.type.substr(0, recorderAudioAsBlob.type.indexOf(';')) : recorderAudioAsBlob.type;
        sourceElement.attr("type", BlobType);


        //audioElement.load();
        $('#chatFilePreview').html(audioElement);
        showFileModal();
    };

    reader.readAsDataURL(recorderAudioAsBlob);
}

/** Displays recording control buttons */
function handleDisplayingRecordingControlButtons() {
    //Hide the microphone button that starts audio recording
    if (window.innerWidth < 480) {
        $('#chatInput').hide();
        $('.fa-paperclip').css('margin-right', 'auto');
    }
    $(microphoneButton).hide();
    

    //Display the recording control buttons
    $(recordingControlButtonsContainer)[0].classList.remove("hide");

    //Handle the displaying of the elapsed recording time
    handleElapsedRecordingTime();
}

/** Hide the displayed recording control buttons */
function handleHidingRecordingControlButtons() {
    //Display the microphone button that starts audio recording
    if (window.innerWidth < 480) {
        $('#chatInput').show();
        $('.fa-paperclip').css('margin-right', '3px');
    }
    $(microphoneButton).show();

    //Hide the recording control buttons
    $(recordingControlButtonsContainer)[0].classList.add("hide");

    //stop interval that handles both time elapsed and the red dot
    clearInterval(elapsedTimeTimer);
}




/** Display the text indicator of the audio being playing in the background */
function displayTextIndicatorOfAudioPlaying() {
    $(textIndicatorOfAudiPlaying).removeClass("hide");
}

/** Hide the text indicator of the audio being playing in the background */
function hideTextIndicatorOfAudioPlaying() {
    $(textIndicatorOfAudiPlaying).addClass("hide");
}

//Controller

/** Stores the actual start time when an audio recording begins to take place to ensure elapsed time start time is accurate*/
var audioRecordStartTime;

/** Stores the maximum recording time in hours to stop recording once maximum recording hour has been reached */
var maximumRecordingTimeInHours = 1;

/** Stores the reference of the setInterval function that controls the timer in audio recording*/
var elapsedTimeTimer;


function startAudioRecording() {
    //start recording 
    audioRecorder.start()
        .then(() => {
            audioRecordStartTime = new Date();
            handleDisplayingRecordingControlButtons();
        })
        .catch(error => {
            console.log(error)
        });
}

function stopAudioRecording() {

    //stop the recording 
    audioRecorder.stop()
        .then(audioAsblob => {
            //Play recorder audio
            playAudio(audioAsblob);

            //hide recording control button
            handleHidingRecordingControlButtons();
        })
        .catch(console.log);
}

/** Cancel the currently started audio recording */
function cancelAudioRecording() {

    try {
        //cancel the recording using the audio recording API
        audioRecorder.stop()
            .then(audioAsblob => {
                audioRecorder.audioBlobs = [];
            })
        

        //hide recording control button & return record icon
        handleHidingRecordingControlButtons();
    } catch (e) { }
}



/** Computes the elapsed recording time since the moment the function is called in the format h:m:s*/
function handleElapsedRecordingTime() {
    //display inital time when recording begins
    displayElapsedTimeDuringAudioRecording("00:00");

    //create an interval that compute & displays elapsed time, as well as, animate red dot - every second
    elapsedTimeTimer = setInterval(() => {
        //compute the elapsed time every second
        var elapsedTime = computeElapsedTime(audioRecordStartTime); //pass the actual record start time
        //display the elapsed time
        displayElapsedTimeDuringAudioRecording(elapsedTime);
    }, 1000); //every second
}


function displayElapsedTimeDuringAudioRecording(elapsedTime) {
    //1. display the passed elapsed time as the elapsed time in the elapsedTime HTML element
    $(elapsedTimeTag).html(elapsedTime);

    //2. Stop the recording when the max number of hours is reached
    if (elapsedTimeReachedMaximumNumberOfHours(elapsedTime)) {
        stopAudioRecording();
    }
}


function elapsedTimeReachedMaximumNumberOfHours(elapsedTime) {
    //Split the elapsed time by the symbo :
    var elapsedTimeSplitted = elapsedTime.split(":");

    //Turn the maximum recording time in hours to a string and pad it with zero if less than 10
    var maximumRecordingTimeInHoursAsString = maximumRecordingTimeInHours < 10 ? "0" + maximumRecordingTimeInHours : maximumRecordingTimeInHours.toString();

    //if it the elapsed time reach hours and also reach the maximum recording time in hours return true
    if (elapsedTimeSplitted.length === 3 && elapsedTimeSplitted[0] === maximumRecordingTimeInHoursAsString)
        return true;
    else //otherwise, return false
        return false;
}

function computeElapsedTime(startTime) {
    //record end time
    var endTime = new Date();

    //time difference in ms
    var timeDiff = endTime - startTime;

    //convert time difference from ms to seconds
    timeDiff = timeDiff / 1000;

    //extract integer seconds that dont form a minute using %
    var seconds = Math.floor(timeDiff % 60); //ignoring uncomplete seconds (floor)

    //pad seconds with a zero if neccessary
    seconds = seconds < 10 ? "0" + seconds : seconds;

    //convert time difference from seconds to minutes using %
    timeDiff = Math.floor(timeDiff / 60);

    //extract integer minutes that don't form an hour using %
    var minutes = timeDiff % 60; //no need to floor possible incomplete minutes, becase they've been handled as seconds
    minutes = minutes < 10 ? "0" + minutes : minutes;

    //convert time difference from minutes to hours
    timeDiff = Math.floor(timeDiff / 60);

    //extract integer hours that don't form a day using %
    var hours = timeDiff % 24; //no need to floor possible incomplete hours, becase they've been handled as seconds

    //convert time difference from hours to days
    timeDiff = Math.floor(timeDiff / 24);

    // the rest of timeDiff is number of days
    var days = timeDiff; //add days to hours

    var totalHours = hours + (days * 24);
    totalHours = totalHours < 10 ? "0" + totalHours : totalHours;

    if (totalHours === "00") {
        return minutes + ":" + seconds;
    } else {
        return totalHours + ":" + minutes + ":" + seconds;
    }
}


//API to handle audio recording 

var audioRecorder = {
    /** Stores the recorded audio as Blob objects of audio data as the recording continues*/
    audioBlobs: [],/*of type Blob[]*/
    /** Stores the reference of the MediaRecorder instance that handles the MediaStream when recording starts*/
    mediaRecorder: null, /*of type MediaRecorder*/
    /** Stores the reference to the stream currently capturing the audio*/
    streamBeingCaptured: null, /*of type MediaStream*/
    /** Start recording the audio 
     * @returns {Promise} - returns a promise that resolves if audio recording successfully started
     */
    start: function () {
        //Feature Detection
        if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            //Feature is not supported in browser
            //return a custom error
            return Promise.reject(new Error('mediaDevices API or getUserMedia method is not supported in this browser.'));
        }

        else {
            //Feature is supported in browser

            //create an audio stream
            return navigator.mediaDevices.getUserMedia({ audio: true }/*of type MediaStreamConstraints*/)
                //returns a promise that resolves to the audio stream
                .then(stream /*of type MediaStream*/ => {

                    //save the reference of the stream to be able to stop it when necessary
                    audioRecorder.streamBeingCaptured = stream;

                    //create a media recorder instance by passing that stream into the MediaRecorder constructor
                    audioRecorder.mediaRecorder = new MediaRecorder(stream); /*the MediaRecorder interface of the MediaStream Recording
                    API provides functionality to easily record media*/

                    //clear previously saved audio Blobs, if any
                    audioRecorder.audioBlobs = [];

                    //add a dataavailable event listener in order to store the audio data Blobs when recording
                    audioRecorder.mediaRecorder.addEventListener("dataavailable", event => {
                        //store audio Blob object
                        audioRecorder.audioBlobs.push(event.data);
                    });

                    //start the recording by calling the start method on the media recorder
                    audioRecorder.mediaRecorder.start();
                });

            /* errors are not handled in the API because if its handled and the promise is chained, the .then after the catch will be executed*/
        }
    },
    /** Stop the started audio recording
     * @returns {Promise} - returns a promise that resolves to the audio as a blob file
     */
    stop: function () {
        //return a promise that would return the blob or URL of the recording
        return new Promise(resolve => {
            //save audio type to pass to set the Blob type
            var mimeType = audioRecorder.mediaRecorder.mimeType;

            //listen to the stop event in order to create & return a single Blob object
            audioRecorder.mediaRecorder.addEventListener("stop", () => {
                //create a single blob object, as we might have gathered a few Blob objects that needs to be joined as one
                var audioBlob = new Blob(audioRecorder.audioBlobs, { type: mimeType });

                //resolve promise with the single audio blob representing the recorded audio
                resolve(audioBlob);
            });
            audioRecorder.cancel();
        });
    },
    /** Cancel audio recording*/
    cancel: function () {
        //stop the recording feature
        audioRecorder.mediaRecorder.stop();

        //stop all the tracks on the active stream in order to stop the stream
        audioRecorder.stopStream();

        //reset API properties for next recording
        audioRecorder.resetRecordingProperties();
    },
    /** Stop all the tracks on the active stream in order to stop the stream and remove
     * the red flashing dot showing in the tab
     */
    stopStream: function () {
        //stopping the capturing request by stopping all the tracks on the active stream
        audioRecorder.streamBeingCaptured.getTracks() //get all tracks from the stream
            .forEach(track /*of type MediaStreamTrack*/ => track.stop()); //stop each one
    },
    /** Reset all the recording properties including the media recorder and stream being captured*/
    resetRecordingProperties: function () {
        audioRecorder.mediaRecorder = null;
        audioRecorder.streamBeingCaptured = null;

        /*No need to remove event listeners attached to mediaRecorder as
        If a DOM element which is removed is reference-free (no references pointing to it), the element itself is picked
        up by the garbage collector as well as any event handlers/listeners associated with it.
        getEventListeners(audioRecorder.mediaRecorder) will return an empty array of events.*/
    }
}

/* end */

// POOYAN
//! chat
const chat = dc.query('#chat');
chat.header = chat.query('#chat header')
chat.veiw = chat.query('.veiw');
chat.veiw.msgs = chat.queries('.veiw > div');
chat.veiw.context = chat.veiw.query('.context');
chat.form = chat.query('form');
chat.form.input = chat.form.query('.input');
chat.form.textarea = chat.form.query('textarea');
chat.reply = chat.query('.reply');
chat.getDown = chat.query('#chat .wrap .getDown');

let selectedMsg;

//getDonw button
chat.getDown.onclick = scrollToEnd;
//scroll events
chat.veiw.onscroll = () => {
    let scrollHeight = chat.veiw.scrollHeight - chat.veiw.offsetHeight - 5;
    //console.log(`${chat.veiw.scrollTop} of ${scrollHeight}`)
    if (chat.veiw.scrollTop >= scrollHeight) {
        chat.getDown.classList.remove('active')
    } else {
        chat.getDown.classList.add('active')
    }
}

//chat input details
chat.form.input.onkeydown = (e) => {
    // trap the return key being pressed
    if (e.keyCode === 13 && !e.shiftKey) {
        // prevent the default behaviour of return key pressed
        return false;
    }
}

chat.form.input.onkeyup = (e) => {
    e.preventDefault();
    let text = e.target.value;
    let parseText = text.replace(/(<br ?\/? ?>)+$/g, '');
    parseText = parseText.replace(/<br>/g, '\n');
    chat.form.textarea.value = parseText;

    if (text === '<br>') {
        e.target.value = '';
    }

    if (e.keyCode == 13 && !e.shiftKey) {
        $('.frm').submit()
        chat.form.input.value = '';
        //refresh massages object
        chat.veiw.msgs = chat.veiw.queries('.veiw > div');
        setAllClickEvnts();
        //setReplyedToClickEvent()
        chat.veiw.context.onclick = e => clickEvntHandler(e)
        setReplyEvnt();
        closeReply();

    }

}

//! -- RIGHT CLICK \ CLICK --
function setAllClickEvnts() {
    chat.veiw.msgs = chat.queries('.veiw > div');
    chat.veiw.msgs.forEach(item => {
        item.oncontextmenu = (e) => contextEvntHandler(e, item);
        item.onclick = (e) => clickEvntHandler(e);
        //setTouchEvnt(item);
    })
}
setAllClickEvnts();
chat.veiw.context.onclick = e => clickEvntHandler(e)

//function setTouchEvnt(item) {
//    let touchTimeout;
//    item.addEventListener('touchstart', (e) => {
//        touchTimeout = setTimeout(() => {
//            contextEvntHandler(e, item)
//            touchTimeout = null;
//        }, 150);
//    })
//    item.addEventListener('touchend', (e) => {
//        if (touchTimeout) {
//            clearTimeout(touchTimeout)
//            clickEvntHandler(e)
//        }
//    })
//    item.addEventListener('touchmove', () => {
//        clearTimeout(touchTimeout)
//    })
//}

function clickEvntHandler(e) {
    if (chat.veiw.context.contains(e.target)) {
        switch (e.target.id) {
            case 'delete':
                deleteMsg(selectedMsg)
                break;
            case 'edit':
                editMsg(selectedMsg)
                break;
            case 'reply':
                openReply(selectedMsg)
                break;
            default:
                return;
        }
    }
    chat.veiw.context.classList.remove('active', 'disableEditImage');
    if (selectedMsg) {
        selectedMsg.classList.remove('selected');
        selectedMsg = null;
    }
}

function contextEvntHandler(e, item) {
    e.returnValue = false;
    e.preventDefault();
    let pointX = e.clientX || e.touches[0].clientX;
    let pointY = e.clientY || e.touches[0].clientY;

    if (item.classList.contains('others'))
        chat.veiw.context.classList.add('others')
    else
        chat.veiw.context.classList.remove('others')

    let rightOffset = window.innerWidth - chat.getBoundingClientRect().right;

    let x = pointX - rightOffset - chat.veiw.context.clientWidth - 10;
    let y = window.pageYOffset - chat.offsetTop + chat.veiw.scrollTop + pointY - chat.header.clientHeight - 25;

    if (x < 0)
        x = 0;

    openContextMenu(x, y , item)
    if (selectedMsg) selectedMsg.classList.remove('selected')
    item.classList.add('selected')
    selectedMsg = item;
}
function editable(item) {
    if (item.querySelector('.content img,.content .fileLink,.content audio ,.content video')) {
        return false;
    }
    return true;
}
function openContextMenu(x, y , item) {
    chat.veiw.context.style.left = x + 'px';
    chat.veiw.context.style.top = y + 'px';
    chat.veiw.context.classList.add('active');
    if (!editable(item)) {
        chat.veiw.context.classList.add('disableEdit');
    }
    else{
        chat.veiw.context.classList.remove('disableEdit');
    }
}

function deleteMsg(msg) {
    var chatHub = $.connection.chatroomHub;
    var object = {
        ID: msg.id
    }
    msg.remove();
    chatHub.server.deleteMessage(object);
}

function editMsg(msg) {
    isEdit.isEdit = true;
    let selectedMessage = msg.querySelector('.txt');
    const Id = selectedMessage.dataset.id;
    chat.form.input.value = selectedMessage.innerHTML.trim();
    moveCarrotToEnd(chat.form.input)
    isEdit.id = Id;
    console.log(isEdit)
}

function moveCarrotToEnd(el) {

    const selection = window.getSelection();
    const range = document.createRange();
    selection.removeAllRanges();
    range.selectNodeContents(el);
    range.collapse(false);
    selection.addRange(range);

    el.focus();
}

//reply
function closeReply() {
    chat.reply.classList.add('closed')
    isReplay.isReplay = false;
}
function openReply(trg) {
    console.log(trg)
    chat.reply.classList.remove('closed');
    let clone = trg.cloneNode(true);
    chat.reply.query('div').replaceWith(clone)
    if (chat.reply.query('video')) {
        chat.reply.query('video').controls = false;
    }
    chat.form.query('form > div').focus();
    let id = chat.reply.query('.reply > div').id;
    //let id = chat.reply.query('.icon').dataset.id;
    let user = chat.reply.query('.icon').dataset.user;
    console.log(id)
    isReplay.user = user;
    isReplay.id = id;
    isReplay.isReplay = true;
}
function setReplyEvnt() {
    chat.veiw.msgs.forEach(item => {        
        const btn = item.querySelector('i');
        if(btn) btn.onclick = () => { openReply(item) };
    })
}

//let emojicontainer = document.querySelector(".emoji-container");
//let emojiItems = emojicontainer.querySelectorAll(".emoji-item");
//let emojiBtn = emojicontainer.querySelector("span");
let fileBtn = chat.form.query('.fa-paperclip');
//emojiItems.forEach(item => {
//    item.addEventListener("click", (item) => {
//        item.stopPropagation();
//        chat.form.textarea.value += item.target.innerHTML;
//    })
//})
//emojiBtn.addEventListener('click', function (e) {
//    e.stopPropagation();
//})
chat.addEventListener('click', function handleClick(event) {
    event.stopPropagation();
    //const clickedOnEmoji = event.target.classList.contains('emoji-list');
    const clickedOnFile = event.target.classList.contains('fa-paperclip');
    //if (!clickedOnEmoji) {
    //    emojiBtn.classList.remove("active");
    //}
    if (!clickedOnFile) {
        fileBtn.classList.remove("active");
    }
});
setReplyEvnt();
setImageEventHandler();
chat.reply.query('.reply > i ').onclick = closeReply;