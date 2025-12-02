// --- Slider Functions ---
const track = document.getElementById('sliderTrack');

function slideLeft() {
    if(!track) return;
    const item = track.querySelector('.service-card');
    if(item) {
        const itemWidth = item.offsetWidth;
        const gap = 20;
        track.scrollBy({ left: -(itemWidth + gap), behavior: 'smooth' });
    }
}

function slideRight() {
    if(!track) return;
    const item = track.querySelector('.service-card');
    if(item) {
        const itemWidth = item.offsetWidth;
        const gap = 20;
        track.scrollBy({ left: (itemWidth + gap), behavior: 'smooth' });
    }
}

// --- Initialize Dots ---
document.addEventListener('DOMContentLoaded', () => {
    if(!track) return;
    const cards = track.querySelectorAll('.service-card');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (cards.length > 0 && dotsContainer) {
        // Create dots based on card count
        cards.forEach((card, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if(index === 0) dot.classList.add('active');
            
            // Add click listener to dot
            dot.addEventListener('click', () => {
                const itemWidth = card.offsetWidth;
                const gap = 20;
                track.scrollTo({
                    left: index * (itemWidth + gap),
                    behavior: 'smooth'
                });
            });
            
            dotsContainer.appendChild(dot);
        });
        
        // Update active dot on scroll
        track.addEventListener('scroll', () => {
            const itemWidth = cards[0].offsetWidth;
            const gap = 20;
            const index = Math.round(track.scrollLeft / (itemWidth + gap));
            
            const dots = document.querySelectorAll('.slider-dot');
            dots.forEach(d => d.classList.remove('active'));
            if(dots[index]) dots[index].classList.add('active');
        });
    }
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

// --- Interactive Newsletter Function ---
function subscribeNewsletter(form) {
    const btn = form.querySelector('.newsletter-btn');
    const icon = btn.querySelector('i');
    const input = form.querySelector('input');
    
    // Animation start
    btn.style.transform = 'scale(0.9)';
    icon.classList.remove('fa-paper-plane');
    icon.classList.add('fa-spinner', 'fa-spin');
    
    setTimeout(() => {
        // Success
        icon.classList.remove('fa-spinner', 'fa-spin');
        icon.classList.add('fa-check');
        btn.style.backgroundColor = '#28a745'; // Success Green
        btn.style.transform = 'scale(1)';
        
        input.value = '';
        input.placeholder = 'Thanks for subscribing!';
        
        // Reset after 3 seconds
        setTimeout(() => {
            icon.classList.remove('fa-check');
            icon.classList.add('fa-paper-plane');
            btn.style.backgroundColor = ''; 
            input.placeholder = 'Your Email';
        }, 3000);
    }, 1500);
}

// --- Follow Button Toggle ---
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

// ==========================================================
// --- FIXED POST INTERACTION LOGIC (Isolation Guaranteed) ---
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    const allCards = document.querySelectorAll('.blog-card-new');

    allCards.forEach(card => {
        // We select elements specifically INSIDE this 'card' variable.
        // This guarantees that clicking one card's button NEVER affects another.
        
        const postId = card.getAttribute('data-id');
        
        // 1. ISOLATED LIKE BUTTON LOGIC
        const likeBtn = card.querySelector('.like-btn');
        const likeCountSpan = likeBtn.querySelector('.count'); 
        
        likeBtn.addEventListener('click', function() {
            // Toggle the visual class
            this.classList.toggle('liked');
            const icon = this.querySelector('i');
            
            // Get current number safely
            let currentCount = parseInt(likeCountSpan.innerText) || 0;

            if (this.classList.contains('liked')) {
                // If liked, fill the heart and INCREASE count
                icon.classList.remove('far');
                icon.classList.add('fas');
                likeCountSpan.innerText = currentCount + 1;
            } else {
                // If unliked, empty the heart and DECREASE count
                icon.classList.remove('fas');
                icon.classList.add('far');
                // Prevent negative numbers just in case
                likeCountSpan.innerText = Math.max(0, currentCount - 1);
            }
        });

        // 2. ISOLATED COMMENT SECTION TOGGLE
        const commentToggleBtn = card.querySelector('.comment-btn');
        const commentSection = card.querySelector('.comment-section');
        
        commentToggleBtn.addEventListener('click', function() {
            this.classList.toggle('active-comment');
            if (commentSection.style.display === 'block') {
                commentSection.style.display = 'none';
            } else {
                commentSection.style.display = 'block';
            }
        });

        // 3. ISOLATED POST COMMENT LOGIC
        const postBtn = card.querySelector('.btn-post-comment');
        const input = card.querySelector('.comment-input');
        const list = card.querySelector('.comments-list');
        const commentCountSpan = card.querySelector('.comment-count');
        
        // Function to add comment to this specific card's list
        const addCommentToDOM = (text) => {
            const newComment = document.createElement('div');
            newComment.className = 'single-comment';
            newComment.innerHTML = `<span class="comment-user">You:</span> ${text}`;
            list.appendChild(newComment);
            list.scrollTop = list.scrollHeight;
        };

        // Load saved comments specifically for this postId
        const savedComments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
        savedComments.forEach(comment => addCommentToDOM(comment));
        
        // Update Count based on saved data
        let baseCount = parseInt(commentCountSpan.innerText) || 0; 
        // Note: Logic assumes HTML static count didn't include saved ones initially.
        // If reloading, you might want to manage base count differently, 
        // but for now we append the saved count to the view.
        commentCountSpan.innerText = baseCount + savedComments.length;

        postBtn.addEventListener('click', function() {
            const text = input.value.trim();
            if (text) {
                addCommentToDOM(text);
                
                // Save to LocalStorage using unique ID
                const currentComments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
                currentComments.push(text);
                localStorage.setItem(`comments_${postId}`, JSON.stringify(currentComments));
                
                // Update the visual count ONLY for this card
                let currentCount = parseInt(commentCountSpan.innerText) || 0;
                commentCountSpan.innerText = currentCount + 1;

                input.value = '';
            }
        });

        // 4. ISOLATED SHARE BUTTON
        const shareBtn = card.querySelector('.share-btn');
        shareBtn.addEventListener('click', function() {
            alert(`Link for ${postId} copied to clipboard!`);
        });
    });
});