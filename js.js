const pricingConfig = {'ai-tools': 3200000, 'web': 3400000, 'python': 3300000, 'gamedev': 3600000};

const bind = (query, event, callback) => {
    const ele = document.querySelector(query)
    if (ele) {
        ele.addEventListener(event, callback)
    }
}

document.querySelectorAll('.card').forEach(card=>{
    const key = card.getAttribute('data-course');
    const p = pricingConfig[key] || Number(card.getAttribute('data-price')||0);
    const el = card.querySelector('.price .p');
    if(el && p){ el.textContent = p.toLocaleString('en-US'); }
});

function digitOnly(str){let out='';for(let i=0;i<str.length;i++){const c=str.charAt(i);if(c>='0'&&c<='9')out+=c;}return out;}

// ===== Modal logic =====
let currentCourseKey = null; 
let currentCourseTitle = null; 
let currentFee = 0; 
let appliedDiscount = 0;
let registrationData = {}; // To hold data for verification step

function openModal(key, title){
    currentCourseKey = key; 
    currentCourseTitle = title || key;
    currentFee = pricingConfig[key] || 0;
    appliedDiscount = 0;

    // Reset form fields
    document.getElementById('mf-name').value = '';
    document.getElementById('mf-mobile').value = '';
    document.getElementById('mf-mode').value = '';
    document.getElementById('mf-discount').value = '';
    document.getElementById('mf-discount-status').textContent = '';
    
    document.getElementById('modal-title').textContent = `ثبت‌نام — ${title}`;
    document.getElementById('mf-fee').value = currentFee.toLocaleString('fa-IR');
    document.getElementById('mf-amount').value = currentFee.toLocaleString('fa-IR');
    
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden'); 
    modal.setAttribute('aria-hidden','false');
}

function closeModal(){ 
    const modal = document.getElementById('modal'); 
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
        document.getElementById('verification-content').classList.add('hidden');
        document.getElementById('verification-success').classList.remove('hidden');
        document.getElementById('verification-title').textContent = 'موفقیت‌آمیز بود!';
        
        const { name, mobile, school } = lotteryUserData;
        const lines = [ 'شرکت در قرعه‌کشی', 'نام: ' + name, 'موبایل: ' + mobile, 'مدرسه: ' + school ];
        const text = lines.join('\n');
        const phone = '989121234567'; // Your WhatsApp number
        const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(text);
        
        setTimeout(() => {
            window.open(url, '_blank');
        }, 1000); // 1-second delay
        
        setTimeout(() => {
            closeVerificationModal();
        }, 3000); // 3-second total delay
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

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, '0');
    document.getElementById('timer-days').textContent = pad(days);
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

bind("#lottery-form", "submit", handleLotterySubmit)