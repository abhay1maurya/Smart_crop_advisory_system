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
        if(item.getAttribute('onclick').includes(toolId)) item.classList.add('active');
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
        const likeCountSpan = likeBtn.querySelector('.count'); 
        likeBtn.addEventListener('click', function() {
            this.classList.toggle('liked');
            const icon = this.querySelector('i');
            let currentCount = parseInt(likeCountSpan.innerText) || 0;
            if (this.classList.contains('liked')) {
                icon.classList.remove('far'); icon.classList.add('fas'); 
                likeCountSpan.innerText = currentCount + 1;
            } else {
                icon.classList.remove('fas'); icon.classList.add('far'); 
                likeCountSpan.innerText = Math.max(0, currentCount - 1);
            }
        });

        // Comments Toggle
        const commentToggleBtn = card.querySelector('.comment-btn');
        const commentSection = card.querySelector('.comment-section');
        commentToggleBtn.addEventListener('click', function() {
            this.classList.toggle('active-comment');
            commentSection.style.display = (commentSection.style.display === 'block') ? 'none' : 'block';
        });

        // Post Comment
        const postBtn = card.querySelector('.btn-post-comment');
        const input = card.querySelector('.comment-input');
        const list = card.querySelector('.comments-list');
        const commentCountSpan = card.querySelector('.comment-count');

        postBtn.addEventListener('click', function() {
            if (input.value.trim()) {
                const newComment = document.createElement('div');
                newComment.className = 'single-comment';
                newComment.innerHTML = `<span class="comment-user">You</span> ${input.value} <span class="comment-time" style="float:right; font-size:10px; color:#aaa;">Just now</span>`;
                list.appendChild(newComment);
                input.value = '';
                let currentCount = parseInt(commentCountSpan.innerText) || 0;
                commentCountSpan.innerText = currentCount + 1;
            }
        });

        // Share
        const shareBtn = card.querySelector('.share-btn');
        shareBtn.addEventListener('click', function() {
            alert("Link copied to clipboard!");
        });
    });

    /* --- Follow Button --- */
    document.querySelectorAll('.btn-follow').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.innerText === 'Follow') {
                this.innerText = 'Following';
                this.classList.add('following');
            } else {
                this.innerText = 'Follow';
                this.classList.remove('following');
            }
        });
    });
});