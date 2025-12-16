/* ==================== CROP ADVISOR SCRIPT ==================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('KrishiSahayak Crop Tool Loaded...');

    // Initialize UI Components
    initHeader();
    initMobileMenu();
    initLanguageToggle();
    initProfileDropdown();
    
    // Initialize Logic
    initCropPrediction();
});

/* --- 1. Header Scroll Effect --- */
function initHeader() {
    const header = document.querySelector('.blog-header-section');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 50 
            ? '0 4px 15px rgba(0, 0, 0, 0.1)' 
            : '0 2px 15px rgba(0, 0, 0, 0.05)';
    });
}

/* --- 2. Mobile Menu --- */
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('active');
        toggle.querySelector('i').classList.toggle('fa-times');
        toggle.querySelector('i').classList.toggle('fa-bars');
    });

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.remove('active');
            toggle.querySelector('i').classList.remove('fa-times');
            toggle.querySelector('i').classList.add('fa-bars');
        }
    });
}

/* --- 3. Language Toggle --- */
function initLanguageToggle() {
    const wrapper = document.getElementById('modernLangToggle');
    if (!wrapper) return;
    
    const btn = wrapper.querySelector('.modern-lang-btn');
    
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        wrapper.classList.toggle('active');
    });

    // --- Simple Translation Module for Crop Page ---
    const TRANSLATIONS = {
        en: {
            'benefits.title': 'Why use Smart Crop Advisor?',
            'benefits.subtitle': 'Practical, science-backed advice to choose crops that maximize yield and reduce costs.',
            'benefits.yield.title': 'Maximize Yield',
            'benefits.yield.desc': 'Growing the right crop increases production by up to 40%.',
            'benefits.cost.title': 'Reduce Costs',
            'benefits.cost.desc': 'Stop wasting fertilizer on incompatible crops.',
            'benefits.soil.title': 'Protect Soil Health',
            'benefits.soil.desc': 'Prevent degradation with scientifically informed crop rotation.'
        },
        hi: {
            'benefits.title': 'स्मार्ट क्रॉप एडवाइजर क्यों उपयोग करें?',
            'benefits.subtitle': 'ऐसा व्यावहारिक, वैज्ञानिक सलाह जो उपज बढ़ाए और लागत घटाए।',
            'benefits.yield.title': 'उत्पादन बढ़ाएँ',
            'benefits.yield.desc': 'सही फसल उगाने से उत्पादन में 40% तक वृद्धि हो सकती है।',
            'benefits.cost.title': 'लागत कम करें',
            'benefits.cost.desc': 'गलत फसल पर उर्वरक खर्च बंद करें।',
            'benefits.soil.title': 'मृदा स्वास्थ्य सुरक्षित रखें',
            'benefits.soil.desc': 'वैज्ञानिक रोटेशन से मृदा क्षय रोकें।'
        },
        pa: {
            'benefits.title': 'ਸਮਾਰਟ ਕਰਾਪ ਸਲਾਹਕਾਰ ਕਿਉਂ ਵਰਤਣਾ?',
            'benefits.subtitle': 'ਆਮ, ਵਿਗਿਆਨ-ਆਧਾਰਤ ਸਲਾਹ ਜੋ ਪੈਦਾਵਾਰ ਵਧਾਉਂਦੀ ਅਤੇ ਲਾਗਤ ਘਟਾਉਂਦੀ ਹੈ।',
            'benefits.yield.title': 'ਫਸਲ ਵਾਧਾ',
            'benefits.yield.desc': 'ਸਹੀ ਫਸਲ ਨਾਲ ਉਪਜ ਵਿੱਚ 40% ਤੱਕ ਵਾਧਾ ਹੋ ਸਕਦਾ ਹੈ।',
            'benefits.cost.title': 'ਖ਼ਰਚ ਘਟਾਓ',
            'benefits.cost.desc': 'ਗਲਤ ਫਸਲ ' + 'ਤੇ ਉਪਜ ਤੇਖ਼ਰਚ ਬੰਦ ਕਰੋ।',
            'benefits.soil.title': 'ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਬਚਾਓ',
            'benefits.soil.desc': 'ਵਿਗਿਆਨਕ ਫਸਲ ਰੋਟੇਸ਼ਨ ਨਾਲ ਖ਼ਰਾਬੀ ਰੋਕੋ।'
        }
    };

    function translatePage(lang) {
        const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });
    }

    wrapper.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const flag = opt.getAttribute('data-flag');
            const lang = opt.getAttribute('data-lang');
            
            btn.querySelector('.lang-flag').textContent = flag;
            btn.querySelector('.lang-code').textContent = lang.toUpperCase();
            wrapper.classList.remove('active');

            try { localStorage.setItem('site_lang', lang); } catch (e) {}
            translatePage(lang);
        });
    });

    // Initialize language from localStorage
    const savedLang = localStorage.getItem('site_lang') || 'en';
    const selectedOpt = wrapper.querySelector(`.lang-option[data-lang="${savedLang}"]`);
    if (selectedOpt) {
        const flag = selectedOpt.getAttribute('data-flag');
        btn.querySelector('.lang-flag').textContent = flag;
        btn.querySelector('.lang-code').textContent = savedLang.toUpperCase();
        translatePage(savedLang);
    } else {
        translatePage('en');
    }

    document.addEventListener('click', () => wrapper.classList.remove('active'));
}

/* --- 4. Profile Dropdown --- */
function initProfileDropdown() {
    const wrapper = document.querySelector('.blog-profile-wrapper');
    const btn = document.getElementById('profileBtn');
    
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            wrapper.classList.toggle('active');
        });
    }

    document.addEventListener('click', () => {
        if(wrapper) wrapper.classList.remove('active');
    });
}

/* --- 5. Crop Prediction Logic (Simulation) --- */
function initCropPrediction() {
    const form = document.getElementById('cropForm');
    const resultBox = document.getElementById('resultBox');
    const resetBtn = document.getElementById('resetToolBtn');
    const outputText = document.getElementById('cropOutput');
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // 1. Get Values
        const n = parseFloat(document.getElementById('valN').value);
        const p = parseFloat(document.getElementById('valP').value);
        const k = parseFloat(document.getElementById('valK').value);
        const ph = parseFloat(document.getElementById('valPH').value);
        const rain = parseFloat(document.getElementById('valRain').value);

        // 2. Show Loading State (Simulated)
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        btn.disabled = true;

        setTimeout(() => {
            // 3. Simple Mock Logic (Decision Tree Simulation)
            let prediction = "Rice"; // Default

            // Basic Logic based on typical Indian Agriculture data
            if (n > 100 && rain > 150) {
                prediction = "Rice";
            } else if (n < 40 && p < 40 && k > 30) {
                prediction = "Chickpea";
            } else if (ph < 5.5 && rain > 200) {
                prediction = "Tea"; // Loves acidic soil
            } else if (rain < 70 && n > 20) {
                prediction = "Moth Beans"; // Drought resistant
            } else if (ph > 7.5) {
                prediction = "Barley"; // Tolerates alkali
            } else if (k > 50 && rain > 100) {
                prediction = "Banana";
            } else if (n > 80 && p > 40 && rain < 100) {
                prediction = "Maize";
            } else if (n < 50 && rain < 100) {
                prediction = "Kidney Beans";
            } else {
                prediction = "Wheat"; // Safe bet for moderate conditions
            }

            // 4. Update UI
            outputText.textContent = prediction;
            resultBox.style.display = 'block';
            
            // Scroll to result
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Reset Button State
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500); // 1.5 second delay to feel like "AI" processing
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            form.reset();
            resultBox.style.display = 'none';
            form.scrollIntoView({ behavior: 'smooth' });
        });
    }
}