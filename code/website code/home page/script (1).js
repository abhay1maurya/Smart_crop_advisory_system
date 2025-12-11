// --- Location JS ---
function requestLocation() {
    const locText = document.getElementById('locationText');
    if (navigator.geolocation) {
        locText.innerText = "Locating...";
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    document.getElementById('locationText').innerText = "GPS Active";
    document.getElementById('weatherTemp').innerText = "28°C";
    alert("Location Access Granted! \nLat: " + position.coords.latitude + "\nLong: " + position.coords.longitude);
}
function showError(error) {
    document.getElementById('locationText').innerText = "Meerut";
    alert("Location access denied.");
}

// --- Slider Logic (Generic) ---
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
            const itemWidth = item.offsetWidth; 
            track.scrollTo({ left: item.offsetLeft - track.offsetLeft, behavior: 'smooth' });
        });
        dotsContainer.appendChild(dot);
    });

    track.addEventListener('scroll', () => {
        const scrollLeft = track.scrollLeft;
        const itemWidth = items[0].offsetWidth; 
        const index = Math.round(scrollLeft / itemWidth);
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach(d => d.classList.remove('active'));
        if(dots[index]) dots[index].classList.add('active');
    });
}

// --- Initialize Sliders ---
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('sliderTrack');
    window.slideLeft = function() {
        if(!track) return;
        const item = track.querySelector('.service-card');
        if(item) track.scrollBy({ left: -(item.offsetWidth + 20), behavior: 'smooth' });
    }
    window.slideRight = function() {
        if(!track) return;
        const item = track.querySelector('.service-card');
        if(item) track.scrollBy({ left: (item.offsetWidth + 20), behavior: 'smooth' });
    }
    setupSlider('sliderTrack', 'sliderDots');
    setupSlider('benefitsTrack', 'benefitsDots');
    setupSlider('expertsTrack', 'expertsDots');
    setupSlider('testimonialsTrack', 'testimonialsDots');
});

// --- Mobile Menu Interaction ---
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('mainNav');
    if(menuToggle) {
        const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});
        navLinks.forEach((l) => {
            l.addEventListener('click', () => {
                if (menuToggle.classList.contains('show')) {
                    bsCollapse.hide();
                }
            })
        });
    }
});

// --- Newsletter ---
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

// --- Follow Button ---
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

// --- Post Interaction ---
document.addEventListener('DOMContentLoaded', () => {
    const allCards = document.querySelectorAll('.blog-card-new');
    allCards.forEach(card => {
        const postId = card.getAttribute('data-id');
        const likeBtn = card.querySelector('.like-btn');
        const likeCountSpan = likeBtn.querySelector('.count'); 
        likeBtn.addEventListener('click', function() {
            this.classList.toggle('liked');
            const icon = this.querySelector('i');
            let currentCount = parseInt(likeCountSpan.innerText) || 0;
            if (this.classList.contains('liked')) {
                icon.classList.remove('far'); icon.classList.add('fas'); likeCountSpan.innerText = currentCount + 1;
            } else {
                icon.classList.remove('fas'); icon.classList.add('far'); likeCountSpan.innerText = Math.max(0, currentCount - 1);
            }
        });
        const commentToggleBtn = card.querySelector('.comment-btn');
        const commentSection = card.querySelector('.comment-section');
        commentToggleBtn.addEventListener('click', function() {
            this.classList.toggle('active-comment');
            commentSection.style.display = (commentSection.style.display === 'block') ? 'none' : 'block';
        });
        const postBtn = card.querySelector('.btn-post-comment');
        const input = card.querySelector('.comment-input');
        const list = card.querySelector('.comments-list');
        const commentCountSpan = card.querySelector('.comment-count');
        const addCommentToDOM = (text) => {
            const newComment = document.createElement('div');
            newComment.className = 'single-comment';
            newComment.innerHTML = `<span class="comment-user">You:</span> ${text}`;
            list.appendChild(newComment);
            list.scrollTop = list.scrollHeight;
        };
        const savedComments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
        savedComments.forEach(comment => addCommentToDOM(comment));
        let baseCount = parseInt(commentCountSpan.innerText) || 0; 
        commentCountSpan.innerText = baseCount + savedComments.length;
        postBtn.addEventListener('click', function() {
            const text = input.value.trim();
            if (text) {
                addCommentToDOM(text);
                const currentComments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
                currentComments.push(text);
                localStorage.setItem(`comments_${postId}`, JSON.stringify(currentComments));
                let currentCount = parseInt(commentCountSpan.innerText) || 0;
                commentCountSpan.innerText = currentCount + 1;
                input.value = '';
            }
        });
        const shareBtn = card.querySelector('.share-btn');
        shareBtn.addEventListener('click', function() { alert(`Link for ${postId} copied to clipboard!`); });
    });
});

// --- Manual Section ---
function showManual(featureId) {
    const panes = document.querySelectorAll('.manual-pane');
    panes.forEach(pane => pane.classList.remove('active'));
    const navs = document.querySelectorAll('.manual-nav-box');
    navs.forEach(nav => nav.classList.remove('active'));
    const targetPane = document.getElementById('manual-' + featureId);
    if(targetPane) targetPane.classList.add('active');
    navs.forEach(nav => {
        if(nav.getAttribute('onclick').includes(featureId)) {
            nav.classList.add('active');
        }
    });
}