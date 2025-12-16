/* ==================== DISEASE DOCTOR SCRIPT ==================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('KrishiSahayak Disease Doctor Loaded...');

    // Initialize UI Components
    initHeader();
    initMobileMenu();
    initLanguageToggle();
    initProfileDropdown();
    
    // Initialize Logic
    initDiseaseDetection();
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

/* --- 5. Disease Detection Logic --- */
function initDiseaseDetection() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const uploadContent = document.getElementById('uploadContent');
    const previewContainer = document.getElementById('previewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const removeImgBtn = document.getElementById('removeImgBtn');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultBox = document.getElementById('resultBox');
    const resetBtn = document.getElementById('resetToolBtn');
    
    // UI Elements for Result
    const diseaseName = document.getElementById('diseaseName');
    const confidenceVal = document.getElementById('confidenceValue');
    const confidenceBar = document.getElementById('confidenceBar');
    const treatmentAdvice = document.getElementById('treatmentAdvice');
    const diseaseTitle = document.querySelector('.disease-title');

    if (!dropZone) return;

    // A. Drag & Drop Effects
    dropZone.addEventListener('click', () => fileInput.click());
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            handleFile(fileInput.files[0]);
        }
    });

    // B. Handle File Selection
    function handleFile(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                uploadContent.style.display = 'none';
                previewContainer.style.display = 'flex';
                analyzeBtn.disabled = false;
                resultBox.style.display = 'none'; // Hide previous result if any
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file (JPG/PNG).');
        }
    }

    // C. Remove Image
    removeImgBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.value = '';
        imagePreview.src = '';
        previewContainer.style.display = 'none';
        uploadContent.style.display = 'block';
        analyzeBtn.disabled = true;
        resultBox.style.display = 'none';
    });

    // D. Analyze (Simulation)
    const diseaseDatabase = [
        { name: "Healthy Plant", treatment: "No action needed. Continue regular watering and monitoring.", type: "safe" },
        { name: "Late Blight", treatment: "Apply fungicides like Mancozeb or Chlorothalonil. Remove infected leaves immediately.", type: "danger" },
        { name: "Early Blight", treatment: "Use copper-based fungicides. Ensure proper spacing between plants for airflow.", type: "danger" },
        { name: "Leaf Curl Virus", treatment: "Control whiteflies using sticky traps or Neem oil. Remove infected plants.", type: "danger" }
    ];

    document.getElementById('diseaseForm').addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Show Loading
        const originalText = analyzeBtn.innerHTML;
        analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Examining Leaf...';
        analyzeBtn.disabled = true;

        setTimeout(() => {
            // 2. Simulate AI Result (Random Selection)
            const randomResult = diseaseDatabase[Math.floor(Math.random() * diseaseDatabase.length)];
            const randomConfidence = Math.floor(Math.random() * (98 - 85 + 1) + 85); // 85% to 98%

            // 3. Update UI
            diseaseName.textContent = randomResult.name;
            confidenceVal.textContent = randomConfidence + "%";
            confidenceBar.style.width = randomConfidence + "%";
            treatmentAdvice.textContent = randomResult.treatment;

            // Color Coding
            if(randomResult.type === "safe") {
                diseaseTitle.style.color = "#2ecc71"; // Green
                document.getElementById('resultTitle').textContent = "Plant Condition";
            } else {
                diseaseTitle.style.color = "#e74c3c"; // Red
                document.getElementById('resultTitle').textContent = "Disease Detected";
            }

            resultBox.style.display = 'block';
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Reset Button
            analyzeBtn.innerHTML = originalText;
            analyzeBtn.disabled = false;

        }, 2000); // 2 second delay
    });

    // E. Reset Tool
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            removeImgBtn.click();
            document.querySelector('.tool-card').scrollIntoView({ behavior: 'smooth' });
        });
    }
}