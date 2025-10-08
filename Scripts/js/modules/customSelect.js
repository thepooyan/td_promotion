'use strict';

function initCustomSelect() {
    var className = arguments.length <= 0 || arguments[0] === undefined ? 'select' : arguments[0];

    document.querySelectorAll('.' + className).forEach(function (wrapper) {
        if (wrapper.alreadyInit) return;

        var tag = document.createElement('span');
        var list = document.createElement('div');
        var options = wrapper.querySelectorAll('option');
        var select = wrapper.querySelector('select');
        if (!select || !options.length) {
            console.log('there should be a select tag inside <div class="' + className + '">...</div> for custom select to work.\nskipping this element:', wrapper);
        } else {
            (function () {
                var open = function open() {
                    var posY = wrapper.getBoundingClientRect().y;
                    var half = window.innerHeight / 2 - posY; //position relative to the center of the screen
                    var remainingBottom = window.innerHeight - posY;
                    var padding = 50;

                    if (half > 0) {
                        wrapper.style.setProperty('--height', remainingBottom - padding + 'px');
                        wrapper.classList.add('bottom');
                        wrapper.classList.remove('top');
                    } else {
                        wrapper.style.setProperty('--height', posY - padding + 'px');
                        wrapper.classList.add('top');
                        wrapper.classList.remove('bottom');
                    }
                    wrapper.classList.toggle('active');
                };

                var close = function close() {
                    wrapper.classList.remove('top');
                    wrapper.classList.remove('bottom');
                    wrapper.classList.remove('active');
                };

                var active = Object.values(options).find(function (opt) {
                    return opt.value === select.value;
                });

                list.classList.add('list');
                wrapper.value = active.value;
                tag.innerText = active.innerHTML;

                options.forEach(function (option) {
                    var span = document.createElement('span');
                    span.innerHTML = option.innerHTML;

                    span.onclick = function (_) {
                        tag.innerHTML = option.innerHTML;
                        wrapper.value = option.value;
                        wrapper.onchange && wrapper.onchange({ target: select });
                        select.value = option.value;
                        select.onchange && select.onchange({ target: select });
                    };

                    list.appendChild(span);
                });

                wrapper.appendChild(tag);
                wrapper.appendChild(list);

                document.addEventListener("click", function (e) {
                    if (wrapper.contains(e.target)) open();else close();
                });
            })();
        }
        wrapper.alreadyInit = true;
    });
}
initCustomSelect();
window.initCustomSelect = initCustomSelect;

