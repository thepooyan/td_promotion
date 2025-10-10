const bind = (query, event, callback) => {
    const ele = document.querySelector(query)
    if (ele) {
        ele.addEventListener(event, callback)
    }
}

function digitOnly(str){let out='';for(let i=0;i<str.length;i++){const c=str.charAt(i);if(c>='0'&&c<='9')out+=c;}return out;}

// ===== Modal logic =====
let currentCourseKey = null; 
let currentCourseTitle = null; 
let currentFee = 0; 
let appliedDiscount = 0;
let registrationData = {}; // To hold data for verification step

function openModal(e) {
    const key = e.target.dataset.course;
    const title = e.target.dataset.des;
    const currentFee = e.target.dataset.fee;
    if (!key || !title || !currentFee) throw new Error(`Open modal called with data-course: ${key} data-des: ${title} data-fee: ${currentFee}`)
    currentCourseKey = key; 
    currentCourseTitle = title;
    appliedDiscount = 0;

    // Reset form fields
    document.getElementById('mf-name').value = '';
    document.getElementById('mf-mobile').value = '';
    document.getElementById('mf-mode').value = '';
    document.getElementById('mf-discount').value = '';
    document.getElementById('mf-discount-status').textContent = '';
    
    document.getElementById('modal-title').innerHTML = `ثبت‌نام <br/> ${title}`;
    document.getElementById('mf-fee').value = currentFee.toLocaleString('fa-IR');
    document.getElementById('mf-amount').value = currentFee.toLocaleString('fa-IR');
    
    const modal = document.getElementById('promoModal');
    modal.classList.remove('hidden'); 
    modal.setAttribute('aria-hidden','false');
}

function closeModal(){ 
    const modal = document.getElementById('promoModal'); 
    modal.classList.add('hidden'); 
    modal.setAttribute('aria-hidden','true'); 
}

function applyDiscount() {
    const code = document.getElementById('mf-discount').value.trim().toUpperCase();
    const statusEl = document.getElementById('mf-discount-status');
    const validCodes = {
        'TAKHFIFAVAL': 0.10, // 10% discount
        'VIP20': 0.20, // 20% discount
        '2025': 0.10 // 10% discount for 2025
    };

    if (validCodes[code]) {
        const discountPercentage = validCodes[code];
        appliedDiscount = currentFee * discountPercentage;
        
        const finalAmount = currentFee - appliedDiscount;
        document.getElementById('mf-amount').value = finalAmount.toLocaleString('fa-IR');
        
        statusEl.textContent = `مبلغ ${appliedDiscount.toLocaleString('fa-IR')} تومان تخفیف اعمال شد!`;
        statusEl.style.color = 'var(--ok)';
    } else {
        appliedDiscount = 0; // Reset discount if code is invalid
        document.getElementById('mf-amount').value = currentFee.toLocaleString('fa-IR');
        statusEl.textContent = 'کد تخفیف نامعتبر است.';
        statusEl.style.color = 'var(--danger)';
    }
}

function handleModalSubmit(e){
    e.preventDefault();
    const name = (document.getElementById('mf-name').value||'').trim();
    const mobile = digitOnly((document.getElementById('mf-mobile').value||'').trim());
    const mode = document.getElementById('mf-mode').value||'';
    
    if(!(mobile.length===11 && mobile.indexOf('09')===0)) { alert('شماره موبایل معتبر نیست.'); return false; }
    
    const deadline = new Date('2025-10-25T23:59:59').getTime();
    if(Date.now() > deadline){ alert('مهلت ثبت‌نام تمام شده است.'); return false; }

    // Store data and open verification modal instead of redirecting
    const finalAmount = currentFee - appliedDiscount;
    registrationData = {
        course: currentCourseTitle, 
        key: currentCourseKey, 
        name, 
        mobile, 
        mode, 
        amount: String(finalAmount), 
        fee: String(currentFee), 
        discount: String(appliedDiscount)
    };

    closeModal(); // Close registration modal
    handleLotterySubmit(e, true); // Use lottery's verification flow for registration
    
    return false;
}

window.openModal = openModal; 
window.closeModal = closeModal; 
window.handleModalSubmit = handleModalSubmit;
window.applyDiscount = applyDiscount;

// ===== Lottery & Verification Logic =====
let verificationCode = null;
let lotteryUserData = {};
let isForRegistration = false;

function handleLotterySubmit(e, forRegistration = false){
    e.preventDefault();
    isForRegistration = forRegistration;
    
    if (!isForRegistration) {
    const form = document.getElementById('lottery-form');
    const name = (form.elements.name.value||'').trim();
    const mobile = digitOnly((form.elements.mobile.value||'').trim());
    const school = (form.elements.school.value||'').trim();

    if(!(mobile.length===11 && mobile.startsWith('09'))){ alert('شماره موبایل معتبر نیست.'); document.getElementById('lf-mobile').focus(); return false; }
    if(!name || !school){ alert('لطفاً تمام فیلدها را کامل کنید.'); return false; }
    
    lotteryUserData = { name, mobile, school };
    }
    
    // --- SMS Sending Simulation ---
    verificationCode = 1234; // Static code for testing
    console.log("Verification Code (for testing):", verificationCode);
    alert('(شبیه‌سازی) یک کد تایید به شماره شما ارسال شد.');
    // --- End Simulation ---

    openVerificationModal();
    return false;
}

function openVerificationModal() {
    // Reset to initial state before showing
    document.getElementById('verification-content').classList.remove('hidden');
    document.getElementById('verification-success').classList.add('hidden');
    document.getElementById('verification-title').textContent = 'اعتبارسنجی پیامکی';
    document.getElementById('vf-code').value = '';
    document.getElementById('vf-error').textContent = '';

    const modal = document.getElementById('verification-modal');
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
}

function closeVerificationModal(keepForm = false) {
    const modal = document.getElementById('verification-modal');
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    // Also reset the main form if it was a lottery submission
    if (!isForRegistration && !keepForm) {
        document.getElementById('lottery-form').reset();
    }
}

function handleVerificationSubmit(e) {
    e.preventDefault();
    const enteredCode = document.getElementById('vf-code').value;
    const errorEl = document.getElementById('vf-error');

    if (parseInt(enteredCode, 10) === verificationCode) {
    // Success
    errorEl.textContent = '';
    
    if (isForRegistration) {
        closeVerificationModal(true);
        openCartModal();
    } else {
        // Proceed with lottery
        const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#10b222" d="M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zM374 145.7c-10.7-7.8-25.7-5.4-33.5 5.3L221.1 315.2 169 263.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72c5 5 11.8 7.5 18.8 7s13.4-4.1 17.5-9.8L379.3 179.2c7.8-10.7 5.4-25.7-5.3-33.5z"/></svg>`
        const parser = new DOMParser()
        const svgElement = parser.parseFromString(svgStr, 'image/svg+xml').documentElement
        document.getElementById('verification-content').classList.add('hidden');
        document.getElementById('verification-success').classList.remove('hidden');
        document.querySelector('#verification-modal .note').classList.add('hidden')
        const successTitle = document.getElementById('verification-title');
        successTitle.textContent = 'موفقیت‌آمیز بود!';
        successTitle.insertBefore(svgElement, successTitle.firstChild)
        successTitle.classList.add("success")
        
        const { name, mobile, school } = lotteryUserData;
        alert(JSON.stringify(lotteryUserData, null, 2))
    }

    } else {
    // Failure
    errorEl.textContent = 'کد وارد شده صحیح نمی‌باشد.';
    }
    return false;
}

// ===== Cart Modal Functions =====
function openCartModal() {
    const summaryEl = document.getElementById('cart-summary');
    const { course, fee, discount, amount } = registrationData;

    summaryEl.innerHTML = `
        <div class="cart-row">
            <span class="label">دوره انتخابی:</span>
            <span class="value">${course}</span>
        </div>
        <div class="cart-row">
            <span class="label">شهریه پایه:</span>
            <span class="value">${parseInt(fee).toLocaleString('fa-IR')} تومان</span>
        </div>
        ${discount > 0 ? `
        <div class="cart-row">
            <span class="label">تخفیف:</span>
            <span class="value">- ${parseInt(discount).toLocaleString('fa-IR')} تومان</span>
        </div>
        ` : ''}
        <div class="cart-row cart-total" style="border-top: 2px solid var(--border); margin-top: 10px; padding-top: 10px;">
            <span class="label">مبلغ نهایی:</span>
            <span class="value">${parseInt(amount).toLocaleString('fa-IR')} تومان</span>
        </div>
    `;

    const modal = document.getElementById('cart-modal');
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
}

function closeCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
}

function proceedToPayment() {
    const orderId = 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    const params = new URLSearchParams({ orderId, ...registrationData });
    window.location.href = 'https://example.com/pay?' + params.toString();
}

// ===== Countdown Engine =====
function startHeroTimer() {
    const deadline = new Date('2025-10-25T23:59:59').getTime();
    
    const timerInterval = setInterval(() => {
    const now = Date.now();
    const timeLeft = deadline - now;

    if (timeLeft < 0) {
        clearInterval(timerInterval);
        document.getElementById('timer-days').textContent = '00';
        document.getElementById('timer-hours').textContent = '00';
        document.getElementById('timer-minutes').textContent = '00';
        document.getElementById('timer-seconds').textContent = '00';
        return;
    }

    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, '0');
    document.getElementById('timer-hours').textContent = pad(hours);
    document.getElementById('timer-minutes').textContent = pad(minutes);
    document.getElementById('timer-seconds').textContent = pad(seconds);
    }, 1000);
}

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', ()=>{ 
    startHeroTimer();
    const mainModal = document.getElementById('modal');
    const verificationModal = document.getElementById('verification-modal');
    const cartModal = document.getElementById('cart-modal');


    if(mainModal) {
    mainModal.addEventListener('click', (e)=>{ if(e.target.id==='modal') closeModal(); });
    }
    if(verificationModal) {
    verificationModal.addEventListener('click', (e) => { if (e.target.id === 'verification-modal') closeVerificationModal(); });
    }
    if(cartModal) {
    cartModal.addEventListener('click', (e) => { if (e.target.id === 'cart-modal') closeCartModal(); });
    }

    document.addEventListener('keydown', (e)=>{ 
    if(e.key==='Escape'){
        if(!mainModal.classList.contains('hidden')) closeModal();
        if(!verificationModal.classList.contains('hidden')) closeVerificationModal();
        if(!cartModal.classList.contains('hidden')) closeCartModal();
    }
    });

    // ===== FAQ Accordion =====
    document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        
        button.classList.toggle('active');

        if (button.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
        answer.style.maxHeight = '0px';
        }
    });
    });
});

const validEvents = ["click", "submit"]

validEvents.forEach(validEvent => {
    const events = document.querySelectorAll(`[class*="${validEvent}:"]`)
    events.forEach(click => {
        let classnames = click.className.split(" ")
        let events = classnames.filter(c => c.startsWith(`${validEvent}:`)).map(c => c.substring(validEvent.length + 1))
        events.forEach(event => {
            click.addEventListener(validEvent, eval(event))
        })
    })
})