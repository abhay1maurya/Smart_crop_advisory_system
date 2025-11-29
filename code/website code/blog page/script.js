// Toggle mobile navigation
document.getElementById('toggleNav').addEventListener('click', function() {
    document.getElementById('mainNav').classList.toggle('active');
});

// Follow button functionality
document.querySelectorAll('.btn-follow').forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('following')) {
            this.classList.remove('following');
            this.textContent = 'Follow';
        } else {
            this.classList.add('following');
            this.textContent = 'Following';
        }
    });
});

// Close mobile nav when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.getElementById('mainNav');
    const toggleBtn = document.getElementById('toggleNav');
    
    if (!nav.contains(event.target) && !toggleBtn.contains(event.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
    }
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Post Article Button Functionality
document.getElementById('postArticleBtn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Check if user is logged in (you would typically check authentication status)
    const isLoggedIn = false; // This would come from your authentication system
    
    if (!isLoggedIn) {
        // Show login modal or redirect to login page
        alert('Please login to post an article');
        // You can redirect to login page: window.location.href = '/login';
        // Or show a login modal
    } else {
        // Redirect to article creation page
        window.location.href = '/create-article';
        // Or show article creation modal
    }
});

// Search functionality
document.querySelector('.search-box input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const searchTerm = this.value.trim();
        if (searchTerm) {
            // Perform search - this would typically make an API call
            console.log('Searching for:', searchTerm);
            // window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
        }
    }
});

// Newsletter form submission
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    if (email) {
        // Simulate newsletter subscription
        console.log('Subscribing email:', email);
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Check if background image loaded successfully
function checkBackgroundImage() {
    const hero = document.querySelector('.hero');
    const img = new Image();
    img.src = 'blog page/rice land.jpg';
    
    img.onerror = function() {
        console.log('Background image failed to load, using gradient fallback');
        hero.style.background = 'linear-gradient(135deg, var(--primary), var(--accent))';
    };
    
    img.onload = function() {
        console.log('Background image loaded successfully');
    };
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Smart Crop Advisory website loaded successfully');
    checkBackgroundImage();
});
// Square Post Boxes Interactions
function initPostInteractions() {
    const likeButtons = document.querySelectorAll('.like-btn');
    const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
    const shareButtons = document.querySelectorAll('.share-btn');
    const viewAllBtn = document.querySelector('.view-all-btn');
    
    // Like button functionality
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isLiked = this.classList.contains('liked');
            const countElement = this.querySelector('.action-count');
            let count = parseInt(countElement.textContent);
            
            if (isLiked) {
                this.classList.remove('liked');
                count--;
                this.querySelector('i').className = 'far fa-heart';
            } else {
                this.classList.add('liked');
                count++;
                this.querySelector('i').className = 'fas fa-heart';
                this.classList.add('like-animate');
                setTimeout(() => this.classList.remove('like-animate'), 600);
            }
            
            countElement.textContent = count;
            this.setAttribute('data-likes', count);
        });
    });
    
    // Bookmark button functionality
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isBookmarked = this.classList.contains('bookmarked');
            
            if (isBookmarked) {
                this.classList.remove('bookmarked');
                this.querySelector('i').className = 'far fa-bookmark';
            } else {
                this.classList.add('bookmarked');
                this.querySelector('i').className = 'fas fa-bookmark';
                this.classList.add('bookmark-animate');
                setTimeout(() => this.classList.remove('bookmark-animate'), 600);
            }
        });
    });
    
    // Share button functionality
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postCard = this.closest('.post-card');
            const postTitle = postCard.querySelector('.post-title').textContent;
            const postUrl = window.location.href;
            
            if (navigator.share) {
                navigator.share({
                    title: postTitle,
                    url: postUrl
                });
            } else {
                navigator.clipboard.writeText(`${postTitle} - ${postUrl}`).then(() => {
                    alert('Post link copied to clipboard!');
                });
            }
        });
    });
    
    // View All Posts button
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            // Simulate loading more posts
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-arrow-right"></i> View All Posts';
                alert('More posts would be loaded here!');
            }, 1500);
        });
    }
    
    // Post tag click functionality
    const postTags = document.querySelectorAll('.post-tag');
    postTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent;
            alert(`Showing posts tagged with: ${tagText}`);
        });
    });
}

// Update DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Smart Crop Advisory website loaded successfully');
    checkBackgroundImage();
    initPostInteractions();
});