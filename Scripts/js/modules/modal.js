//modal
'use strict';

(function () {
    var modal = dc.query('#modal');
    modal.content = modal.query('.content');

    function scrollLockClousure() {
        var currentPos = undefined;

        function lock() {
            currentPos = document.documentElement.scrollTop;
            document.body.classList.add('locked');
            document.body.style.top = -currentPos + 'px';
            document.documentElement.style.scrollBehavior = "initial";
        }
        function unlock() {
            document.body.classList.remove('locked');
            document.body.style.top = null;
            document.documentElement.scrollTop = currentPos;
            document.documentElement.style.scrollBehavior = null;
        }

        return { lock: lock, unlock: unlock };
    }
    var scrollControl = scrollLockClousure();

    function callModal(content, className) {
        var lockScroll = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

        return prepearModal(className, function (start) {
            start(content);
        }, { scrollLock: lockScroll });
    }

    function prepearModal(className, additionalFunc) {
        var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        var close = _ref.close;
        var scrollLock = _ref.scrollLock;

        if (!close) close = 'overlay';if (!scrollLock) scrollLock = false;
        if (!additionalFunc && typeof className === 'function') {
            additionalFunc = className;
            className = undefined;
        }

        return new Promise(function (res) {

            modal.className = '';
            if (className) modal.className = className;

            switch (close) {
                case 'all':
                    modal.onclick = closeModal;
                    break;
                case 'overlay':
                    modal.onclick = function (e) {
                        if (!modal.content.contains(e.target)) closeModal();
                    };
                    break;
                case 'locked':
                    modal.onclick = null;
                    break;
            }

            function closeModal() {
                return new Promise(function (innerRes, innerRej) {
                    if (!modal.classList.contains('active')) return;
                    modal.addEventListener("transitionend", function () {
                        innerRes();
                        res();
                        scrollLock && scrollControl.unlock();
                    }, { once: true });
                    modal.classList.remove('active');
                });
            }
            function showModal(content) {
                if (typeof content === 'string') modal.content.innerHTML = content;else modal.content.replaceChildren(content);
                modal.classList.add('active');
                var closeModalBtn = document.querySelector('#closeModal');
                if (closeModalBtn) {
                    closeModalBtn.onclick = closeModal;
                }
                scrollLock && scrollControl.lock();
            }

            additionalFunc(showModal, closeModal);
        });
    }

    function scrollIntoVeiw(ele, callback) {
        if (!ele) return;

        function getOffsetTop(element) {
            return element ? element.offsetTop + getOffsetTop(element.offsetParent) : 0;
        }
        var targetOffset = getOffsetTop(ele) - window.innerHeight / 2 + ele.clientHeight / 2;
        var targetOffsetFloor = Math.floor(targetOffset);
        var doucmentHeight = document.documentElement.scrollHeight;
        var maxOffset = doucmentHeight - window.innerHeight;

        if (targetOffsetFloor < 0) targetOffsetFloor = 0;
        if (targetOffsetFloor > maxOffset) targetOffsetFloor = maxOffset;

        var onScroll = function onScroll() {
            var windowOffsetFloor = Math.floor(window.pageYOffset);
            if (windowOffsetFloor === targetOffsetFloor || windowOffsetFloor + 1 === targetOffsetFloor || windowOffsetFloor - 1 === targetOffsetFloor) {
                window.removeEventListener('scroll', onScroll);
                callback();
            }
        };
        window.addEventListener('scroll', onScroll);
        window.scrollTo({
            top: targetOffset,
            behavior: 'smooth'
        });
        onScroll();
    };

    //custom notifications
    function notif(content, className) {
        var duration = arguments.length <= 2 || arguments[2] === undefined ? 5000 : arguments[2];

        return prepearModal('notification ' + className, function (showModal, closeModal) {
            showModal(content);
            setTimeout(closeModal, duration);
        }, { close: 'all' });
    }
    function successFail(msg, duration, failed) {
        if (duration === undefined) duration = 5000;

        var content = document.createElement('div');
        var icon = document.createElement('i');
        var br = document.createElement('br');
        if (failed) {
            icon.className = "fas fa-times";
        } else {
            icon.className = 'fas fa-check-circle';
        }
        content.innerText = msg;
        content.appendChild(br);
        content.appendChild(icon);

        return notif(content, duration);
    }
    function confirm(text) {
        return new Promise(function (resolve, reject) {

            prepearModal('choice', function (showModal, closeModal) {
                var content = document.createElement('div');
                var buttonY = document.createElement('button');
                var buttonN = document.createElement('button');
                var span = document.createElement('span');

                span.innerText = text;
                buttonY.innerText = 'بله';
                buttonY.onclick = function () {
                    closeModal().then(resolve);
                };
                buttonY.className = 'button';
                buttonN.innerText = 'خیر';
                buttonN.onclick = function () {
                    closeModal().then(reject);
                };
                buttonN.className = "button reverse";

                content.appendChild(span);
                content.appendChild(buttonY);
                content.appendChild(buttonN);

                showModal(content);
            }).then(reject);
        });
    }
    function spinner(func) {
        return prepearModal('spinner', function (openModal, closeModal) {
            var container = document.createElement('div');
            var loader = document.createElement('div');
            loader.classList.add('loader');
            container.appendChild(loader);
            var text = document.createTextNode('لطفا صبر کنید...');
            container.appendChild(text);
            openModal(container);
            func && func(closeModal);
        }, { close: 'locked' });
    }
    function spinner2(func) {
        return prepearModal('spinner alt', function (openModal, closeModal) {
            var frg = document.createDocumentFragment();
            var img = document.createElement('img');img.src = '/Content/images/Logo/HoloG.png';
            var div = document.createElement('div');
            var span = document.createElement('span');
            var p = document.createElement('p');p.innerText = 'در حال بارگذاری ...';

            div.appendChild(span);div.appendChild(p);
            frg.appendChild(img);frg.appendChild(div);

            openModal(frg);
            func && func(closeModal);
        }, { close: 'locked' });
    }

    function image(src) {
        var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? { zoom: false } : arguments[1];

        var zoom = _ref2.zoom;

        var className = 'image ' + (zoom ? ' zoom' : '');
        var options = zoom ? { close: "all" } : undefined;
        return prepearModal(className, function (showModal, closeModal) {
            var img = document.createElement('img');
            img.src = src;
            showModal(img);
        }, options);
    }
    function guide(msg, element) {
        return new Promise(function (resolve, reject) {
            prepearModal('guide', function (showModal, closeModal) {
                var fragment = document.createDocumentFragment();
                var text = document.createTextNode(msg);
                var img = document.createElement('img');
                img.src = '/Content/images/img/swirlyArrow.png';
                var button = document.createElement('button');
                button.innerText = 'باشه!';
                button.onclick = closeModal;
                fragment.appendChild(text);
                fragment.appendChild(button);

                scrollIntoVeiw(element, function () {
                    var elementFinalPosition = element.getBoundingClientRect();

                    if (window.innerWidth > 830) {
                        var elementCenter = elementFinalPosition.left + element.offsetWidth / 2;
                        var screenDivide = window.innerWidth / 3;
                        var horizantalSection = Math.floor(elementCenter / screenDivide) + 1;

                        img.style.top = elementFinalPosition.top + element.offsetHeight / 2 - 30 + 'px';
                        switch (horizantalSection) {
                            case 1:
                                img.style.left = elementFinalPosition.right + 'px';
                                img.classList.add('flip');
                                break;
                            case 2:
                                img.style.right = window.innerWidth - elementFinalPosition.left + 'px';
                                modal.classList.add('left');
                                break;
                            case 3:
                                img.style.right = window.innerWidth - elementFinalPosition.left + 'px';
                                break;
                        }

                        if (1100 >= window.innerWidth && horizantalSection === 2) {
                            img.style.right = null;
                            img.style.left = elementFinalPosition.right + 'px';
                            img.classList.add('flip');
                            modal.classList.add('left');
                        }
                    } else {
                        var elementCenter = elementFinalPosition.top + element.offsetHeight / 2;
                        var screenDivide = window.innerHeight / 3;
                        var verticalSection = Math.floor(elementCenter / screenDivide) + 1;

                        img.style.right = window.innerWidth - element.getBoundingClientRect().right + element.offsetWidth / 2 - 60 + 'px';
                        switch (verticalSection) {
                            case 1:
                                img.style.bottom = elementFinalPosition.top - 20 + 'px';
                                modal.classList.add('bottom');
                                img.classList.add('toBottom');
                                break;
                            case 2:
                            case 3:
                                img.style.top = elementFinalPosition.bottom + 20 + 'px';
                                modal.classList.add('top');
                                img.classList.add('toTop');
                                break;
                        }
                    }

                    showModal(fragment);
                    modal.appendChild(img);
                });
            }, { scrollLock: true }).then(function () {
                modal.querySelector('img').remove();
                resolve();
            });
        });
    }
    function photoVeiwer(images, active) {
        return prepearModal('image photoVeiw', function (showModal, closeModal) {
            var frag = document.createDocumentFragment();
            var imagesDiv = document.createElement('div');
            var activeNum = undefined;

            imagesDiv.classList.add('cont');
            imagesDiv.onclick = closeModal;
            images.forEach(function (image, index) {
                var div = document.createElement('div');
                var img = document.createElement('img');
                img.src = image.getAttribute('src');

                if (img.src === active.src) {
                    img.classList.add('active');
                    activeNum = index;
                    rotateWheel(activeNum);
                }
                div.appendChild(img);
                imagesDiv.appendChild(div);
            });

            var next = document.createElement('i');next.className = 'fas fa-chevron-right';
            var prev = document.createElement('i');prev.className = 'fas fa-chevron-left';

            next.onclick = function () {
                activeNum--;
                if (activeNum < 0) activeNum = 0;
                rotateWheel(activeNum);
            };
            prev.onclick = function () {
                activeNum++;
                if (activeNum > images.length - 1) activeNum = images.length - 1;
                rotateWheel(activeNum);
            };

            function rotateWheel(number) {
                imagesDiv.style.left = '-' + (images.length - number - 1) * 100 + 'vw';
                images.forEach(function (img) {
                    return img.classList.remove('showing');
                });
                images[number].classList.add('showing');
            }

            frag.appendChild(next);
            frag.appendChild(imagesDiv);
            frag.appendChild(prev);

            showModal(frag);
        }, { scrollLock: true }).then(function () {
            images.forEach(function (img) {
                return img.classList.remove('showing');
            });
        });
    }
    function lockedVideo(id) {
        var video = undefined;
        return prepearModal('lockedVideo', function (showModal, closeModal) {
            var canvas = document.createElement('canvas');
            canvas.classList.add('video');
            canvas.id = id;
            debugger;
            showModal(canvas);
            video = new CanvasVideo(id);
        }, { scrollLock: true }).then(function () {
            video.kill();
        });
    }
    function fitContent(str){
        return callModal(str , "fitContent");
    }

    callModal.notif = notif;
    callModal.success = function (msg, duration) {
        return successFail(msg, duration, false);
    };
    callModal.fail = function (msg, duration) {
        return successFail(msg, duration, true);
    };
    callModal.confirm = confirm;
    callModal.custom = prepearModal;
    callModal.spinner = function (func) {
        var alt = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        if (!alt) spinner(func);else spinner2(func);
    };
    callModal.image = image;
    callModal.photoVeiwer = photoVeiwer;
    callModal.fitContent = fitContent;
    callModal.guide = guide;
    callModal.lockedVideo = lockedVideo;
    window.callModal = callModal;
})();

