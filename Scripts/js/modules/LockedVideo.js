let defaultUrl = '/PackageHome/GetVideoSrcByVideoId';

function createEle(className) {
    let ele = document.createElement('div');
    ele.classList.add(className);
    return ele
}

function removeDecimal(number, howMuch) {
    return Math.trunc(number * Math.pow(10, howMuch)) / Math.pow(10, howMuch);
}

function preventIfDoubleClick(func) {
    let clickClousure;

    return e => {
        clearTimeout(clickClousure);
        clickClousure = setTimeout(() => {
            if (e.detail !== 1) return
            func(e);
        }, 200);}
}

class CanvasVideo {
    animationAuthorization = true;
    spentTime = new TimeCapsule(0);
    disapearTime = 1500;
    dragState = false;
    get isDragging() {
        return this.dragState
    }
    set isDragging(bool) {
        this.dragState = bool;
        if (bool)
            this.progressBar.classList.add('bold');
        else
            this.progressBar.classList.remove('bold');
    }
    isPlaying = false;
    isMobile = /Android|iPhone/i.test(navigator.userAgent);
    // isMobile = true;
    isLandscape = false;
    hover = {
        amount: 2000,
        timeout: null,
        isShow: false,
        countdown: () => {
            clearTimeout(this.hover.timeout);
            this.hover.timeout = setTimeout(() => {
                this.hover.hide();
            }, this.hover.amount);
        },
        show: () => {
            this.container.classList.add('hover');
            this.hover.isShow = true;
        },
        hide: () => {
            if (!this.isPlaying) return
            this.container.classList.remove('hover');
            this.hover.isShow = false;
        }
    };

    constructor(id,canvasId, url,callback) {
        url = url ?? defaultUrl;

        this.id = id;
        this.canvas = dc.id(canvasId);
        this.canvasClone = this.canvas.cloneNode();

        this.video = document.createElement('video');
        this.video.style.display = "none";
        this.video.addEventListener('ended', () => { this.finished() });
        document.body.appendChild(this.video);
        this.container = createEle('canvasPlayer');

        //create ads
        this.ads = createEle('adsVideoContainer');
        this.adsVideo = document.createElement('video');
        this.adsVideo.controls = false;
        this.adsVideo.addEventListener('ended', () => {
            this.stopAds();
        })
        this.adsVideo.classList.add('exception');
        this.container.appendChild(this.ads);
        this.ads.appendChild(this.adsVideo);
        this.adsOptions = {
            played: false,
            isVisible: false,
            displayTime : 10
        };

        //create ads alert
        this.adsAlert = {
            element: createEle('adsAlert'),
            interval: null,
            started : false,
            countdown: () => {
                if (this.adsAlert.show) {
                    if (!this.adsAlert.started && this.adsAlert.adsAlertCounter > 0) {
                        this.adsAlert.interval = setInterval(() => {

                            if (this.adsAlert.adsAlertCounter > 0) {
                                this.adsAlert.adsAlertCounter--;
                                this.adsAlert.element.dataset.time = this.adsAlert.adsAlertCounter;
                            }
                            if (this.adsAlert.adsAlertCounter === 0) {
                                this.adsAlert.element.classList.remove('active');
                                clearInterval(this.adsAlert.interval);
                                this.toggleVideoPlay();
                                this.adsOptions.played = true;
                                this.ads.classList.add('active');
                                this.adsVideo.play();
                                setTimeout(() => {
                                    this.adsStopButton.classList.add('active');
                                }, 5000);
                            }   

                        }, 1000)
                    }
                    else {
                        clearInterval(this.adsAlert.interval)
                    }
                    this.adsAlert.started = !this.adsAlert.started;
                }
                
            },
            adsAlertCounter: 5,
            show : false
        }
        this.container.appendChild(this.adsAlert.element);

        //create ads stop button
        this.adsStopButton = createEle('stopAds');
        this.adsStopButton.innerHTML = 'رد کردن تبلیغ';
        this.adsStopButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.stopAds();
            this.adsStopButton.classList.remove('active');
        });
        this.container.appendChild(this.adsStopButton);
        
            
        $.ajax({
            url: url,
            method: 'POST',
            data: JSON.stringify({ videoId: id }),
            contentType: 'application/json',
            success: data => {
                if (!data.src) {
                    this.container.classList.add('notFound')
                }
                this.video.src = data.src;
                //data.adsSrc = "https://www.tahlildadeh.com/Files/Videos/52024-10-13-12-29-16.mp4";
                //data.adsDisplayTime = 60;
                if (data.adsSrc) {
                    this.adsOptions.displayTime = data.adsDisplayTime;
                    this.adsVideo.src = data.adsSrc;
                    this.adsOptions.isVisible = true;
                }
                if (callback) callback(data, id)
            }
        })
        let checkVideoReady = setInterval(() => {
            if (this.video.readyState > 0) {
                this.wholeTime = new TimeCapsule(this.video.duration);
                this.controlBar.dataset.wholetime = this.wholeTime.getByMinute();
                this.controlBar.dataset.spenttime = this.spentTime.getByMinute();

                if (this.adsOptions.isVisible && this.adsOptions.displayTime > this.video.duration) {
                    this.adsOptions.isVisible = false;
                }
                this.canvasClone.width = this.video.videoWidth;
                this.canvasClone.height = this.video.videoHeight;
                clearInterval(checkVideoReady)
            }
        }, 200);

        //create container
        
        this.container.appendChild(this.canvasClone);
        this.hover.show();

        this.container.onmousemove = () => {
            this.hover.show();
            this.hover.countdown();
        }
        this.container.onmouseout = () => {
            this.hover.hide();
        }
        this.container.ondblclick = e => {
            if (this.controlBar.contains(e.target)) return;
            this.toggleFullscreen();
        }
        this.container.onclick = e => {
            this.hover.countdown();
            if (this.controlBar.contains(e.target)) return;
            if (this.isDragging) return;
            this.toggleVideoPlay();
            if (this.isPlaying) {
                this.hover.countdown();
                this.#showNotif({ icon: this.playButton.dataset.icon })
            } else {
                this.hover.show();
                this.#showNotif({ icon: this.playButton.dataset.altIcon })
            }
        }

        

        //create control bar
        this.controlBar = createEle('controlBar')
        this.container.appendChild(this.controlBar);

        //create progress bar
        this.progressBar = createEle('progressBar')
        this.progressBar.onclick = e => {
            let progress = (e.layerX / this.progressBar.clientWidth) * 100;
            this.jumpVideo({ timestamp: (progress * this.wholeTime.time) / 100 });
            this.progressBar.style.setProperty('--progress', progress);
            if (this.video.paused) {
                this.toggleVideoPlay()
            }
            if (this.canPlayAds() && Math.floor(this.video.currentTime) > this.adsOptions.displayTime) {
                this.playAds();
            }
        }
        const startDrag = e => {
            this.isDragging = true;
            const ref = () => {
                window.removeEventListener('mousemove', dragProgressLine);
                window.removeEventListener('touchmove', dragProgressLine);
                this.toggleVideoPlay();
                setTimeout(() => {
                    this.isDragging = false;
                }, 0);
            }
            window.addEventListener('mousemove', dragProgressLine);
            window.addEventListener('touchmove', dragProgressLine);
            window.addEventListener('mouseup', ref, { once: true });
            window.addEventListener('touchend', ref, { once: true });
        }
        this.progressBar.onmousedown = startDrag;
        this.progressBar.ontouchstart = startDrag;
        let that = this;
        let lineTouched;
        function dragProgressLine(e) {
            e.preventDefault();
            clearTimeout(lineTouched);
            if (!that.video.paused) {
                that.toggleVideoPlay()
            }
            let progress = dragLine(e, that.progressBar)
            let lastProgress;
            that.progressBar.style.setProperty('--progress', progress);
            let spentTimeString = TimeCapsule.clockify((progress * that.wholeTime.time) / 100);
            that.controlBar.dataset.spenttime = spentTimeString;

            lineTouched = setTimeout(() => {
                if (progress === lastProgress) return
                that.jumpVideo({ timestamp: (progress * that.wholeTime.time) / 100 });
                lastProgress = progress;
            }, 100);
        }
        function dragLine(event, ele) {
            let clientX = event.clientX || event.touches[0].clientX;
            let rect = ele.getBoundingClientRect();
            let left = rect.left;
            let width = ele.clientWidth;
            let amount = clientX - left;
            if (amount < 0) amount = 0;
            if (amount > width) amount = width;
            let percent = removeDecimal(amount / width * 100, 2);
            return percent
        }
        this.controlBar.appendChild(this.progressBar);

        //create buttons
        this.fullscButton = this.#createButton('', () => { this.toggleFullscreen() }, { className: "fullsc", altIcon: '' });
        this.settingButton = this.#createButton('', () => { this.settingButton.classList.toggle('open') }, { className: "setting" });
        this.volumeButton = this.#createButton('', null, { altIcon: '', className: 'volume' });
        this.#createButton('', () => {
            this.#showNotif({ icon: "" });
            this.jumpVideo({ amount: 15 });
            if (this.canPlayAds() && Math.floor(this.video.currentTime) > this.adsOptions.displayTime) {
                this.playAds();
            }
        });
        this.#createButton('', () => {
            this.#showNotif({ icon: "" });
            this.jumpVideo({ amount: -15 })
            if (this.canPlayAds() && Math.floor(this.video.currentTime) > this.adsOptions.displayTime) {
                this.playAds();
            }
        });
        this.playButton = this.#createButton('', () => {
            this.toggleVideoPlay()
            if (this.isPlaying)
                this.#showNotif({ icon: this.playButton.dataset.icon })
            else
                this.#showNotif({ icon: this.playButton.dataset.altIcon })
        }, { altIcon: '' });

        //volume 
        this.volumeBar = createEle('volumeBar');
        this.volumeBar.onclick = e => {
            let progress = (e.layerX / this.volumeBar.clientWidth) * 100;
            this.changeVolume(progress);
            this.volumeBar.style.setProperty('--progress', progress);
        }
        this.volumeButton.appendChild(this.volumeBar);
        this.volumeButton.onclick = e => {
            if (this.volumeBar.contains(e.target)) return
            this.toggleMute();
        }
        this.volumeBar.onmousedown = e => {
            this.volumeButton.classList.add('dragging');
            window.addEventListener('mousemove', volumeDrag);
            window.addEventListener('mouseup', () => {
                window.removeEventListener('mousemove', volumeDrag);
                this.volumeButton.classList.remove('dragging');
            })
        }
        function volumeDrag(e) {
            let progress = dragLine(e, that.volumeBar);
            if (progress || progress === 0) {
                that.changeVolume(progress)
                that.volumeBar.style.setProperty('--progress', progress);
            }
        }

        //notif part
        this.notif = createEle('notif');
        this.notif.addEventListener('animationend', () => {
            this.notif.className = 'notif';
        })
        this.container.appendChild(this.notif);

        //setting menu
        this.settingMenu = document.createElement('div');
        let speeds = [.5, .75, 1, 1.25, 1.5, 1.75, 2];
        speeds = speeds.map(i => {
            let li = document.createElement('li');
            li.innerText = i;
            if (i === 1)
                li.classList.add('active')
            li.onclick = () => {
                this.changeSpeed(i);
                this.#showNotif({ text: i });
                speeds.forEach(item => item.classList.remove('active'));
                li.classList.add('active');
            }
            this.settingMenu.appendChild(li);
            return li
        })
        this.settingButton.appendChild(this.settingMenu);

        if (this.isMobile) {
            this.container.classList.add('mobile');
            this.container.onclick = preventIfDoubleClick(e => {
                this.hover.countdown();
                if (this.controlBar.contains(e.target)) return

                if (this.hover.isShow) {
                    this.hover.hide();
                } else {
                    this.hover.show();
                }
            })
            this.container.onmousemove = null;
            this.container.onmouseout = null;
            this.container.ondblclick = e => {
                if (e.clientX > this.container.clientWidth / 2) {
                    this.heighlight(true);
                    this.jumpVideo({ amount: 10 });
                } else {
                    this.heighlight(false);
                    this.jumpVideo({ amount: -10 });
                }
            }
            //alt play icon
            this.altPlay = createEle('play');
            this.altPlay.dataset.icon = '';
            this.altPlay.dataset.altIcon = '';
            this.altPlay.onclick = () => { this.toggleVideoPlay() };
            this.container.appendChild(this.altPlay);
        }

        this.canvas.replaceWith(this.container);
        
    }

    
    //inner methods
    #paintCanvas = () => {
        let context = this.canvasClone.getContext('2d');
        context.drawImage(this.video, 0, 0, this.canvasClone.width, this.canvasClone.height);

        // change the timestamp
        this.spentTime.set(Math.floor(this.video.currentTime));
        this.controlBar.dataset.spenttime = this.spentTime.getByMinute();
        let progress = (this.video.currentTime / this.wholeTime.time) * 100;
        
        this.progressBar.style.setProperty('--progress', progress);
        if (this.canPlayAds() && Math.floor(this.video.currentTime) === this.adsOptions.displayTime - 5) {
            this.playAds();
        }
        

        if (this.animationAuthorization)
            requestAnimationFrame(this.#paintCanvas);
    }
    #createButton = (icon, onclick, { className, altIcon } = {}) => {
        let button = document.createElement('button');
        button.dataset.icon = icon;
        if (className)
            button.className = className;
        if (altIcon)
            button.dataset.altIcon = altIcon;
        if (typeof onclick === 'function')
            button.onclick = () => { onclick(button) };

        this.controlBar.appendChild(button);
        return button
    }

    //control methods
    #showNotif({ icon, text } = {}) {
        if (icon) {
            this.notif.dataset.icon = icon;
            this.notif.innerText = '';
        }
        if (text) {
            this.notif.dataset.icon = '';
            this.notif.innerText = text;
        }
        this.notif.classList.add('show');
    }
    heighlight(right) {
        if (right) {
            this.notif.classList.add('right');
        } else {
            this.notif.classList.add('left');
        }
        this.notif.classList.add('show');
        this.notif.innerText = '';
        this.notif.removeAttribute('data-icon')
    }
    toggleVideoPlay() {
        this.playButton.classList.toggle('active');
        this.altPlay?.classList.toggle('active');
        if (this.isPlaying) {
            this.video.pause();
            this.animationAuthorization = false;
        } else {
            this.video.play();
            this.animationAuthorization = true;
            this.#paintCanvas();
        }
        this.isPlaying = !this.isPlaying;
        //this.adsAlert.countdown();
    }
    stopVideo() {
        this.playButton.classList.remove('active');
        this.altPlay?.classList.remove('active');
        this.video.pause();
        this.animationAuthorization = false;
        this.isPlaying = false;
    }
    stopAds() {
        this.ads.classList.remove('active');
        this.adsVideo.pause();
        this.toggleVideoPlay();
    }
    canPlayAds() {
        if (this.adsOptions.isVisible && !this.adsOptions.played && !this.adsAlert.show) {
            return true;
        }
        else {
            return false;
        }
    }
    playAds() {
        this.adsAlert.show = true;
        this.adsAlert.element.classList.add('active');
        this.adsAlert.element.dataset.time = this.adsAlert.adsAlertCounter;
        this.adsAlert.countdown();
    }
    finished() {
        this.toggleVideoPlay();
        this.hover.show();
    }
    toggleFullscreen = () => {
        const openFullscreen = () => {
            let dc = document.documentElement;
            if (dc.requestFullscreen) {
                dc.requestFullscreen();
            } else if (dc.webkitRequestFullscreen) { /* Safari */
                dc.webkitRequestFullscreen();
            } else if (dc.msRequestFullscreen) { /* IE11 */
                dc.msRequestFullscreen();
            }
        }
        const closeFullscreen = () => {
            let dc = document;
            if (dc.exitFullscreen) {
                dc.exitFullscreen();
            } else if (dc.webkitExitFullscreen) { /* Safari */
                dc.webkitExitFullscreen();
            } else if (dc.msExitFullscreen) { /* IE11 */
                dc.msExitFullscreen();
            }
        }
        let isFull = this.fullscButton.classList.toggle('active');
        this.container.classList.toggle('fullscreen');

        if (isFull) {
            openFullscreen();
        } else {
            closeFullscreen();
        }
        if (this.isMobile)
            this.toggleRotateScreen()
    }
    jumpVideo = ({ amount, timestamp }) => {
        if (amount) 
            this.video.currentTime += amount;
        else if (timestamp)
            this.video.currentTime = timestamp;
        if (!this.isPlaying)
            this.#paintCanvas(); //refresh the picutre on the frame

    }
    changeVolume = (amount1_100) => {
        this.video.volume = amount1_100 / 100;
        if (this.video.muted)
            this.toggleMute()
    }
    toggleMute = () => {
        this.volumeButton.classList.toggle('active')
        this.volumeBar.classList.toggle('muted')
        this.video.muted = !this.video.muted;
    }
    changeSpeed(amount) {
        this.video.playbackRate = amount;
    }
    toggleRotateScreen() {
        if (screen.orientation.type.split('-')[0] === 'portrait' && !this.isLandscape) {
            screen.orientation.lock('landscape').then(res => {
                if (res)
                    this.isLandscape = true;
            })
        }
        if (screen.orientation.type.split('-')[0] === 'landscape' && this.isLandscape) {
            screen.orientation.unlock();
            this.isLandscape = false;
        }
    }
    kill() {
        this.container.remove();
        this.video.remove();
    }
}

window.CanvasVideo = CanvasVideo;