/* ==================== 1. GLOBAL UTILITY FUNCTIONS ==================== */

// --- A. Location Logic ---
function requestLocation() {
    const locText = document.getElementById('locationText');
    if (navigator.geolocation) {
        locText.innerText = "Locating...";
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                document.getElementById('locationText').innerText = "Fetching City...";
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`, {
                    headers: { 'User-Agent': 'KrishiSahayak-StudentProject' }
                })
                .then(res => res.json())
                .then(data => {
                    const address = data.address;
                    const cityName = address.city || address.town || address.village || address.county || "Unknown";
                    document.getElementById('locationText').innerText = cityName;
                    document.getElementById('weatherTemp').innerText = "28°C"; 
                    alert(`Success! Location detected: ${cityName}`);
                })
                .catch(err => {
                    console.error(err);
                    document.getElementById('locationText').innerText = "Loc Found";
                });
            },
            (error) => {
                locText.innerText = "Error";
                alert("Location access denied or failed.");
            },
            { enableHighAccuracy: false, timeout: 15000, maximumAge: 0 }
        );
    } else {
        alert("Geolocation is not supported.");
    }
}

// --- B. Tool Mastery Switcher ---
function switchMastery(toolId) {
    // Hide all panes
    document.querySelectorAll('.mastery-pane').forEach(pane => pane.classList.remove('active'));
    // Deactivate nav buttons
    document.querySelectorAll('.nav-item-card').forEach(item => item.classList.remove('active'));
    
    // Show target pane
    const targetPane = document.getElementById('mastery-' + toolId);
    if(targetPane) targetPane.classList.add('active');

    // Activate button
    document.querySelectorAll('.nav-item-card').forEach(item => {
        const clickAttr = item.getAttribute('onclick');
        if (clickAttr && clickAttr.includes(toolId)) item.classList.add('active');
    });
}

// --- C. Newsletter Logic ---
function subscribeNewsletter(form) {
    const btn = form.querySelector('.newsletter-btn');
    const icon = btn.querySelector('i');
    const input = form.querySelector('input');
    
    btn.style.transform = 'scale(0.9)';
    icon.classList.remove('fa-paper-plane');
    icon.classList.add('fa-spinner', 'fa-spin');
    
    setTimeout(() => {
        icon.classList.remove('fa-spinner', 'fa-spin');
        icon.classList.add('fa-check');
        btn.style.backgroundColor = '#28a745'; 
        btn.style.transform = 'scale(1)';
        input.value = '';
        input.placeholder = 'Thanks for subscribing!';
        setTimeout(() => {
            icon.classList.remove('fa-check');
            icon.classList.add('fa-paper-plane');
            btn.style.backgroundColor = ''; 
            input.placeholder = 'Your Email';
        }, 3000);
    }, 1500);
}

// --- D. Contact Form Logic ---
function submitContactForm(form) {
    const btn = form.querySelector('.btn-send');
    const originalText = btn.innerHTML;
    
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        btn.classList.remove('btn-orange');
        btn.classList.add('btn-success'); // Bootstrap green
        form.reset();
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.classList.remove('btn-success');
            btn.classList.add('btn-orange');
        }, 3000);
        
        alert("Thank you! We have received your message.");
    }, 1500);
}

// --- E. Slider Logic Helpers ---
const SCROLL_AMOUNT = 345;
function slideLeft() {
    const track = document.getElementById('sliderTrack');
    if(track) track.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
}
function slideRight() {
    const track = document.getElementById('sliderTrack');
    if(track) track.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
}


/* ==================== 2. DOM LOADED LOGIC ==================== */
document.addEventListener('DOMContentLoaded', () => {

    /* --- Mobile Menu --- */
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('mainNav');
    if(menuToggle) {
        const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});
        navLinks.forEach((l) => {
            l.addEventListener('click', () => {
                if (menuToggle.classList.contains('show')) bsCollapse.hide();
            })
        });
    }

    // Desktop hover dropdown support (non-invasive): opens dropdowns on hover using Bootstrap API
    try {
        if (typeof bootstrap !== 'undefined' && window.matchMedia('(min-width: 992px)').matches) {
            document.querySelectorAll('.navbar .dropdown').forEach(drop => {
                const toggle = drop.querySelector('.dropdown-toggle');
                if (!toggle) return;
                drop.addEventListener('mouseenter', () => {
                    const inst = bootstrap.Dropdown.getOrCreateInstance(toggle);
                    inst.show();
                });
                drop.addEventListener('mouseleave', () => {
                    const inst = bootstrap.Dropdown.getOrCreateInstance(toggle);
                    inst.hide();
                });
            });
        }
    } catch (e) {
        // Fail silently; do not throw if bootstrap API not available
        console.debug('Dropdown hover support skipped:', e);
    }

    /* --- Sliders (Dots Logic) --- */
    function setupSlider(trackId, dotsId) {
        const track = document.getElementById(trackId);
        const dotsContainer = document.getElementById(dotsId);
        if(!track || !dotsContainer) return;

        const items = Array.from(track.children);
        if(items.length === 0) return;

        dotsContainer.innerHTML = '';
        items.forEach((item, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if(index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                const scrollVal = (trackId === 'sliderTrack') ? index * SCROLL_AMOUNT : item.offsetLeft - track.offsetLeft;
                track.scrollTo({ left: scrollVal, behavior: 'smooth' });
            });
            dotsContainer.appendChild(dot);
        });

        track.addEventListener('scroll', () => {
            const scrollLeft = track.scrollLeft;
            const itemWidth = (trackId === 'sliderTrack') ? SCROLL_AMOUNT : items[0].offsetWidth;
            const index = Math.round(scrollLeft / itemWidth);
            const dots = dotsContainer.querySelectorAll('.slider-dot');
            dots.forEach(d => d.classList.remove('active'));
            if(dots[index]) dots[index].classList.add('active');
        });
    }

    setupSlider('sliderTrack', 'sliderDots');
    setupSlider('benefitsTrack', 'benefitsDots');
    setupSlider('expertsTrack', 'expertsDots');
    setupSlider('testimonialsTrack', 'testimonialsDots');

    /* --- Blog Logic --- */
    const allCards = document.querySelectorAll('.blog-card-new');
    allCards.forEach(card => {
        // Likes
        const likeBtn = card.querySelector('.like-btn');
        if (likeBtn) {
            const likeCountSpan = likeBtn.querySelector('.count');
            likeBtn.addEventListener('click', function() {
                this.classList.toggle('liked');
                const icon = this.querySelector('i');
                let currentCount = likeCountSpan ? (parseInt(likeCountSpan.innerText) || 0) : 0;

                if (this.classList.contains('liked')) {
                    if (icon) { icon.classList.remove('far'); icon.classList.add('fas'); }
                    currentCount += 1;
                } else {
                    if (icon) { icon.classList.remove('fas'); icon.classList.add('far'); }
                    currentCount = Math.max(0, currentCount - 1);
                }

                if (likeCountSpan) likeCountSpan.innerText = currentCount;
            });
        }

        // Comments toggle and post logic handled below (with safety + Enter-to-post)

        // Share
        const shareBtn = card.querySelector('.share-btn');
        if (shareBtn) {
            const copyToClipboard = (text) => {
                if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
                return new Promise((resolve, reject) => {
                    try {
                        const ta = document.createElement('textarea');
                        ta.value = text;
                        ta.setAttribute('readonly', '');
                        ta.style.position = 'absolute';
                        ta.style.left = '-9999px';
                        document.body.appendChild(ta);
                        ta.select();
                        document.execCommand('copy');
                        document.body.removeChild(ta);
                        resolve();
                    } catch (err) { reject(err); }
                });
            };

            shareBtn.addEventListener('click', function() {
                const url = window.location.href; // page-level copy
                const icon = this.querySelector('i');
                const originalClass = icon ? icon.className : null;

                copyToClipboard(url).then(() => {
                    if (icon) icon.className = 'fas fa-check';
                    this.classList.add('share-success');
                    this.setAttribute('title', 'Link copied!');
                    setTimeout(() => {
                        if (icon && originalClass) icon.className = originalClass;
                        this.classList.remove('share-success');
                        this.removeAttribute('title');
                    }, 1600);
                }).catch(err => {
                    console.error('Copy failed', err);
                    this.setAttribute('title', 'Copy failed');
                    setTimeout(() => this.removeAttribute('title'), 1600);
                });
            });
        }
    });

    /* --- Follow Button --- */
    document.querySelectorAll('.btn-follow').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const txt = (this.textContent || '').trim().toLowerCase();
            const isNowFollowing = !(txt === 'following' || txt === 'following\n' || txt === 'following ');
            this.classList.toggle('following', isNowFollowing);
            this.textContent = isNowFollowing ? 'Following' : 'Follow';
            this.setAttribute('aria-pressed', isNowFollowing ? 'true' : 'false');

            // Update profile 'Following' stat for immediate feedback
            const statsItems = document.querySelectorAll('.profile-stats .stat-item');
            for (const item of statsItems) {
                const label = item.querySelector('.stat-label');
                const val = item.querySelector('.stat-val');
                if (label && val && label.textContent.trim().toLowerCase() === 'following') {
                    let count = parseInt(val.textContent.replace(/\D/g, '')) || 0;
                    count = isNowFollowing ? count + 1 : Math.max(0, count - 1);
                    val.textContent = count;
                    break;
                }
            }
        });
    });

    // --- Add Enter key to post comments and safe null checks ---
    document.querySelectorAll('.blog-card-new').forEach(card => {
        const commentToggleBtn = card.querySelector('.comment-btn');
        const commentSection = card.querySelector('.comment-section');
        if (commentToggleBtn && commentSection) {
            commentToggleBtn.addEventListener('click', function() {
                this.classList.toggle('active-comment');
                commentSection.style.display = (commentSection.style.display === 'block') ? 'none' : 'block';
            });
        }

        const postBtn = card.querySelector('.btn-post-comment');
        const input = card.querySelector('.comment-input');
        const list = card.querySelector('.comments-list');
        const commentCountSpan = card.querySelector('.comment-count');

        if (input && postBtn) {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    postBtn.click();
                }
            });
        }

        if (postBtn) {
            postBtn.addEventListener('click', function() {
                if (input && input.value.trim()) {
                    const newComment = document.createElement('div');
                    newComment.className = 'single-comment';
                    newComment.innerHTML = `<span class="comment-user">You</span> ${escapeHtml(input.value)} <span class="comment-time" style="float:right; font-size:10px; color:#aaa;">Just now</span>`;
                    if (list) list.appendChild(newComment);
                    input.value = '';
                    if (commentCountSpan) {
                        let currentCount = parseInt(commentCountSpan.innerText) || 0;
                        commentCountSpan.innerText = currentCount + 1;
                    }
                }
            });
        }
    });

    // Escape helper to prevent XSS from comment input
    function escapeHtml(unsafe) {
        return unsafe.replace(/[&<"'>]/g, function(m) {
            return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m];
        });
    }

    // --- Video modal wiring ---
    document.querySelectorAll('.btn-hero-secondary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const videoSrc = this.getAttribute('data-video-src') || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
            const iframe = document.getElementById('manualVideoFrame');
            if (iframe) iframe.src = videoSrc;
            // show modal is handled by data-bs attributes; ensure src set before shown
        });
    });
    var videoModalEl = document.getElementById('videoModal');
    if (videoModalEl) {
        videoModalEl.addEventListener('hidden.bs.modal', function () {
            const iframe = document.getElementById('manualVideoFrame');
            if (iframe) iframe.src = '';
        });
    }

    // --- Language translation module ---
    const TRANSLATIONS = {
        en: {
            hero_title: 'Revolutionizing <br><span class="text-gradient">Indian Farming</span>',
            hero_desc: 'Maximize your yield with real-time weather tracking, soil analysis, and expert advisory—all in one smart platform.',
            serv_crop_title: 'Crop Recommendation', serv_crop_desc: 'Get AI-powered advice on the best crops to grow based on soil health and season.',
            serv_fert_title: 'Fertilizer Guide', serv_fert_desc: 'Optimize yield with precise fertilizer dosage and nutrient management plans.',
            serv_disease_title: 'Disease Detection', serv_disease_desc: 'Upload leaf photos to instantly identify plant diseases and get cure suggestions.',
            serv_weather_title: 'Weather Forecast', serv_weather_desc: 'Real-time weather updates and alerts to plan your farming activities better.',
            serv_bot_title: 'Kisan Chatbot', serv_bot_desc: 'Chat with our AI assistant in your local language to solve farming queries instantly.',
            serv_comm_title: 'Community', serv_comm_desc: 'Connect with other farmers, share success stories, and learn from experts.',
            welcome_title: 'Welcome To KrishiSahayak', welcome_desc_1: 'Your intelligent companion for modern, sustainable farming.',
            btn_contact_us: 'Contact Us', btn_send_msg: 'Send Message',
            contact_sub: '24/7 Support', contact_section_title: 'Get In Touch',
            ph_name: 'Your Name', ph_email: 'Your Email', ph_subject: 'Subject', ph_message: 'How can we help?',
            footer_desc: 'Your trusted partner in smart agriculture. We bring technology to the fields to ensure better yield and sustainable growth for every farmer.',
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
            hero_title: 'इनोवेटिव <br><span class="text-gradient">भारतीय कृषि</span>',
            hero_desc: 'रीयल‑टाइम मौसम, मिट्टी विश्लेषण और विशेषज्ञ सलाह के साथ अपनी पैदावार अधिकतम करें।',
            serv_crop_title: 'फसल सिफारिश', serv_crop_desc: 'मिट्टी और मौसम के आधार पर सर्वश्रेष्ठ फसलों की सलाह पाएं।',
            serv_fert_title: 'उर्वरक गाइड', serv_fert_desc: 'ठीक मात्र में उर्वरक उपयोग कर उपज बढ़ाएं।',
            serv_disease_title: 'रोग पहचान', serv_disease_desc: 'पत्ती की तस्वीर अपलोड करें और रोग का तुरंत पता लगाएं।',
            serv_weather_title: 'मौसम पूर्वानुमान', serv_weather_desc: 'रीयל‑टाइम मौसम अपडेट और अलर्ट।',
            serv_bot_title: 'किसान चैटबोट', serv_bot_desc: 'स्थानीय भाषा में सहायता के लिए चैट करें।',
            serv_comm_title: 'समुदाय', serv_comm_desc: 'किसानों से जुड़े और विशेषज्ञों से सीखें।',
            welcome_title: 'कृषि सहायक में आपका स्वागत है', welcome_desc_1: 'आधुनिक, टिकाऊ खेती के लिए आपका बौद्धिक साथी।',
            btn_contact_us: 'संपर्क करें', btn_send_msg: 'संदेश भेजें',
            contact_sub: '24/7 सहायता', contact_section_title: 'संपर्क करें',
            ph_name: 'आपका नाम', ph_email: 'आपका ईमेल', ph_subject: 'विषय', ph_message: 'हम आपकी कैसे मदद कर सकते हैं?',
            footer_desc: 'आपके खेतों के लिए विश्वसनीय तकनीकी साझेदार।',
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
            hero_title: 'ਕਿਸਾਨੀ ਨੂੰ ਨਵੀਂ ਦਿਸ਼ਾ<br><span class="text-gradient">ਭਾਰਤੀ ਖੇਤੀ</span>',
            hero_desc: 'ਰੇਅਲ-ਟਾਈਮ ਮੌਸਮ ਟਰੈਕਿੰਗ, ਮਿੱਟੀ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਮਾਹਿਰ ਸਲਾਹ ਨਾਲ ਆਪਣੀ ਫਸ ਦੀ ਉਪਜ ਵਧਾਓ।',
            serv_crop_title: 'ਫਸਲ ਸਿਫਾਰਿਸ਼', serv_crop_desc: "ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਅਤੇ ਮੌਸਮ ਦੇ ਆਧਾਰ 'ਤੇ ਸਭ ਤੋਂ ਵਧੀਆ ਫਸ ਸੁਝਾਅ ਪ੍ਰਾਪਤ ਕਰੋ।",
            serv_fert_title: 'ਖਾਦ ਮਾਰਗਦਰਸ਼ਨ', serv_fert_desc: 'ਸਹੀ ਖਾਦ ਮਾਤਰਾ ਨਾਲ ਉਪਜ ਵਧਾਓ।',
            serv_disease_title: 'ਰੋਗ ਪਛਾਣ', serv_disease_desc: 'ਪੱਤੇ ਦੀਆਂ ਤਸਵੀਰਾਂ ਅਪਲੋਡ ਕਰੋ ਅਤੇ ਰੋਗ ਪਤਾ ਲਗਾਓ।',
            serv_weather_title: 'ਮੌਸਮ ਅਨੁਮਾਨ', serv_weather_desc: 'ਰੀਅਲ-ਟਾਈਮ ਮੌਸਮ ਅਪਡੇਟ ਅਤੇ ਚੇਤਾਵਨੀਆਂ।',
            serv_bot_title: 'ਕਿਸਾਨ ਚੈਟਬੋਟ', serv_bot_desc: 'ਆਪਣੀ ਸਥਾਨਕ ਭਾਸ਼ਾ ਵਿੱਚ ਸਵਾਲ ਪੁੱਛੋ।',
            serv_comm_title: 'ਕميੂਨਿਟੀ', serv_comm_desc: 'ਹੋਰ ਕਿਸਾਨਾਂ ਨਾਲ ਜੁੜੋ ਅਤੇ ਵਿਸ਼ੇਸ਼ਗਿਆਂ ਤੋਂ ਸਿੱਖੋ।',
            welcome_title: 'ਕ੍ਰਿਸ਼ੀਸਹਾਇਕ ਵਿੱਚ ਸੁਆਗਤ ਹੈ', welcome_desc_1: 'ਆਧੁਨਿਕ ਅਤੇ ਟਿਕਾਊ ਖੇਤੀ ਲਈ ਤੁਹਾਡਾ ਸਹਿਯੋਗੀ।',
            btn_contact_us: 'ਸੰਪਰਕ ਕਰੋ', btn_send_msg: 'ਸੁਨੇਹਾ ਭੇਜੋ',
            contact_sub: '24/7 ਸਹਾਇਤਾ', contact_section_title: 'ਸੰਪਰਕ ਕਰੋ',
            ph_name: 'ਤੁਹਾਡਾ ਨਾਮ', ph_email: 'ਤੁਹਾਡੀ ਈਮੇਲ', ph_subject: 'ਵਿਸ਼ਾ', ph_message: 'ਅਸੀਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?',
            footer_desc: 'ਤੁਹਾਡੇ ਖੇਤਾਂ ਵਿੱਚ ਬੇਹਤਰ ਉਪਜ ਲਈ ਭਰੋਸੇਯੋਗ ਸਹਿਯੋਗੀ।',
            'benefits.title': 'ਸਮਾਰਟ ਕਰਾਪ ਸਲਾਹਕਾਰ ਕਿਉਂ ਵਰਤਣਾ?',
            'benefits.subtitle': 'ਆਮ, ਵਿਗਿਆਨ-ਆਧਾਰਤ ਸਲਾਹ ਜੋ ਪੈਦਾਵਾਰ ਵਧਾਉਂਦੀ ਅਤੇ ਲਾਗਤ ਘਟਾਉਂਦੀ ਹੈ।',
            'benefits.yield.title': 'ਫਸਲ ਵਾਧਾ',
            'benefits.yield.desc': 'ਸਹੀ ਫਸਲ ਨਾਲ ਉਪਜ ਵਿੱਚ 40% ਤੱਕ ਵਾਧਾ ਹੋ ਸਕਦਾ ਹੈ।',
            'benefits.cost.title': 'ਖ਼ਰਚ ਘਟਾਓ',
            'benefits.cost.desc': "ਗਲਤ ਫਸਲ 'ਤੇ ਉਪਜ ਤੇਖ਼ਰਚ ਬੰਦ ਕਰੋ।",
            'benefits.soil.title': 'ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਬਚਾਓ',
            'benefits.soil.desc': 'ਵਿਗਿਆਨਕ ਫਸਲ ਰੋਟੇਸ਼ਨ ਨਾਲ ਖ਼ਰਾਬੀ ਰੋਕੋ।'
        }
    };

    function translatePage(lang) {
        const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                // hero title contains HTML, allow innerHTML for it
                if (key === 'hero_title') el.innerHTML = dict[key];
                else el.textContent = dict[key];
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) el.setAttribute('placeholder', dict[key]);
        });
        localStorage.setItem('site_lang', lang);
    }

    function initSiteLanguage() {
        const wrapper = document.getElementById('siteLangToggle');
        if (!wrapper) return;
        const btn = wrapper.querySelector('.modern-lang-btn');
        const dropdown = wrapper.querySelector('.modern-lang-dropdown');

        function closeDropdown() { wrapper.classList.remove('open'); }
        function openDropdown() { wrapper.classList.add('open'); }

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            wrapper.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) closeDropdown();
        });

        wrapper.querySelectorAll('.lang-option').forEach(opt => {
            opt.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                const flag = this.getAttribute('data-flag') || '';
                const code = lang.toUpperCase();
                const flagSpan = wrapper.querySelector('.lang-flag');
                const codeSpan = wrapper.querySelector('.lang-code');
                wrapper.querySelectorAll('.lang-option').forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                if (flagSpan) flagSpan.textContent = flag;
                if (codeSpan) codeSpan.textContent = code;
                translatePage(lang);
                closeDropdown();
            });
        });

        const current = localStorage.getItem('site_lang') || 'en';
        const activeOpt = wrapper.querySelector(`.lang-option[data-lang="${current}"]`);
        if (activeOpt) activeOpt.click();
        else translatePage(current);
    }

    initSiteLanguage();

}); // end DOMContentLoaded