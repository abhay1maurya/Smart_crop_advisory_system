/* ==================== FERTILIZER ADVISOR SCRIPT ==================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('KrishiSahayak Fertilizer Tool Loaded...');

    // Initialize UI Components
    initHeader();
    initMobileMenu();
    initLanguageToggle();
    initProfileDropdown();
    
    // Initialize Logic
    initFertilizerPrediction();
});

/* --- 1. Header Scroll Effect --- */
function initHeader() {
    const header = document.querySelector('.blog-header-section') || document.querySelector('.header-section');
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

    wrapper.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const flag = opt.getAttribute('data-flag');
            const lang = opt.getAttribute('data-lang').toUpperCase();
            
            btn.querySelector('.lang-flag').textContent = flag;
            btn.querySelector('.lang-code').textContent = lang;
            wrapper.classList.remove('active');
        });
    });

    document.addEventListener('click', () => wrapper.classList.remove('active'));
}

/* --- 4. Profile Dropdown --- */
function initProfileDropdown() {
    const wrapper = document.querySelector('.blog-profile-wrapper');
    const btn = document.getElementById('profileBtn');
    
    if (btn && wrapper) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            wrapper.classList.toggle('active');
        });
    }

    document.addEventListener('click', () => {
        if(wrapper) wrapper.classList.remove('active');
    });
}

/* --- 5. Fertilizer Prediction Logic (Simulation) --- */
function initFertilizerPrediction() {
    const form = document.getElementById('fertForm');
    const resultBox = document.getElementById('resultBox');
    const resetBtn = document.getElementById('resetToolBtn');
    const outputName = document.getElementById('fertOutput');
    const outputReason = document.getElementById('fertReason');
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // 1. Get Values
        const crop = document.getElementById('valCrop').value;
        const soil = document.getElementById('valSoil').value;
        const n = parseFloat(document.getElementById('valN').value);
        const p = parseFloat(document.getElementById('valP').value);
        const k = parseFloat(document.getElementById('valK').value);

        // Validation
        if(!crop || !soil) {
            alert("Please select both Crop and Soil type.");
            return;
        }

        // 2. Show Loading State (Simulated)
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing Soil...';
        btn.disabled = true;

        setTimeout(() => {
            // 3. Simple Mock Logic (Decision Tree Simulation)
            let prediction = "Urea"; 
            let reason = "Balanced mixture for general growth.";

            // Logic Simulation based on Nutrient Levels
            if (n < 50 && p < 50 && k < 50) {
                prediction = "NPK 14-35-14";
                reason = "Detected overall low nutrient levels. High Phosphorus needed for root development.";
            } else if (n < 40) {
                prediction = "Urea";
                reason = "Severe Nitrogen deficiency detected. Urea provides 46% Nitrogen for rapid vegetative growth.";
            } else if (p < 30) {
                prediction = "DAP (Di-ammonium Phosphate)";
                reason = "Phosphorus levels are critical. DAP helps in root establishment and flowering.";
            } else if (k < 30) {
                prediction = "MOP (Muriate of Potash)";
                reason = "Potassium deficiency detected. MOP improves disease resistance and water retention.";
            } else if (soil === "Sandy" && n < 60) {
                prediction = "Ammonium Sulphate";
                reason = "Sandy soils leach Nitrogen easily. Ammonium Sulphate is more stable.";
            } else if (crop === "Sugarcane") {
                prediction = "Urea + DAP";
                reason = "Sugarcane requires high Nitrogen and Phosphorus for stalk development.";
            } else if (n > 100 && p > 80 && k > 80) {
                prediction = "No Fertilizer Needed";
                reason = "Soil nutrients are sufficient for the selected crop. Adding more may cause toxicity.";
            } else {
                prediction = "NPK 20-20-20"; // General balanced
                reason = "Moderate maintenance dose required to sustain current fertility.";
            }

            // 4. Update UI
            outputName.textContent = prediction;
            outputReason.textContent = reason;
            resultBox.style.display = 'block';
            
            // Scroll to result
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Reset Button State
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500); 
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            form.reset();
            resultBox.style.display = 'none';
            form.scrollIntoView({ behavior: 'smooth' });
        });
    }
}