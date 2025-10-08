function gudideDshboard() {
    let localStoregs = [];
    let guideBox = document.querySelectorAll(".guideBox");
    let playedAlarms = localStorage.getItem("playedAlarms");
    let alarmArray = JSON.parse(playedAlarms);
    if (alarmArray) {
        alarmArray.forEach(alarm => {
            if (alarm) {
                guideBox.forEach(item => {
                    let alarmAttention = item.querySelector(".alarm-attention");
                    alarmAttention.style.display = "none";
                })
            }
        })
    }
    console.log(Request.name)
    guideBox.forEach(item => {
        let video = item.querySelector("video");
        let showFileBtn = item.querySelector(".show-file-btn");
        // start/event
        showFileBtn.addEventListener("click", function () {
            let overlayGuideBox = item.querySelector(".overlay--guideBox");
            let alarmAttention = item.querySelector(".alarm-attention");
            let dataAlarm = alarmAttention?.getAttribute("data-alarm");
            localStoregs.push(dataAlarm)
            localStorage.setItem("playedAlarms", JSON.stringify(localStoregs));
            alarmAttention.style.display = "none";

            if (alarmArray && !alarmArray.includes(dataAlarm)) {
                alarmArray.push(dataAlarm);
            }
            if (video) {
                overlayGuideBox.classList.add("remove");
                video.play();
                video.addEventListener("ended", function () {
                    this.load();
                    overlayGuideBox.classList.remove("remove");
                })
            }
        })
    });
} gudideDshboard();