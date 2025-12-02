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

// Categories Slider Functionality
function initCategoriesSlider() {
    const categoriesContainer = document.querySelector('.categories-container');
    const categoryCards = document.querySelectorAll('.category-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const totalCards = categoryCards.length;
    let cardsPerView = 1;
    
    function updateCardsPerView() {
        if (window.innerWidth >= 769) {
            // Desktop: Calculate how many cards can fit
            const containerWidth = categoriesContainer.offsetWidth;
            const cardWidth = 280 + 25; // card width + gap
            cardsPerView = Math.floor(containerWidth / cardWidth);
        } else {
            // Mobile: Always show 1 card
            cardsPerView = 1;
        }
    }
    
    function updateSlider() {
        updateCardsPerView();
        
        // Update button states
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex >= totalCards - cardsPerView;
        }
        
        if (window.innerWidth <= 768) {
            // Mobile behavior
            categoryCards.forEach((card, index) => {
                card.classList.toggle('active', index === currentIndex);
            });
            
            // Scroll to active card
            if (categoriesContainer && categoryCards[currentIndex]) {
                const cardWidth = categoryCards[currentIndex].offsetWidth;
                categoriesContainer.scrollTo({
                    left: currentIndex * cardWidth,
                    behavior: 'smooth'
                });
            }
        } else {
            // Desktop behavior - scroll to show current index
            if (categoriesContainer && categoryCards[currentIndex]) {
                const cardWidth = categoryCards[0].offsetWidth + 25; // card width + gap
                categoriesContainer.scrollTo({
                    left: currentIndex * cardWidth,
                    behavior: 'smooth'
                });
            }
        }
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalCards - cardsPerView) {
                currentIndex++;
                updateSlider();
            }
        });
    }
    
    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCardsPerView();
            
            // Reset current index if it's out of bounds
            if (currentIndex > totalCards - cardsPerView) {
                currentIndex = Math.max(0, totalCards - cardsPerView);
            }
            
            updateSlider();
        }, 250);
    });
    
    // Handle scroll events for desktop
    if (window.innerWidth >= 769) {
        let scrollTimeout;
        categoriesContainer.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollPosition = categoriesContainer.scrollLeft;
                const cardWidth = categoryCards[0].offsetWidth + 25;
                const newIndex = Math.round(scrollPosition / cardWidth);
                
                if (newIndex !== currentIndex && newIndex >= 0 && newIndex <= totalCards - cardsPerView) {
                    currentIndex = newIndex;
                    updateSlider();
                }
            }, 100);
        });
    }
    
    // Initialize slider
    updateSlider();
}

// Square Post Boxes Interactions - Updated
function initPostInteractions() {
    const likeButtons = document.querySelectorAll('.like-btn');
    const commentButtons = document.querySelectorAll('.comment-btn');
    const shareButtons = document.querySelectorAll('.share-btn');
    const followButtons = document.querySelectorAll('.post-author .btn-follow');
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
    
    // Comment button functionality
    commentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postCard = this.closest('.post-card');
            const postTitle = postCard.querySelector('.post-title').textContent;
            
            this.classList.toggle('commented');
            this.querySelector('i').classList.toggle('far');
            this.querySelector('i').classList.toggle('fas');
            
            // Simulate comment functionality
            alert(`Comment section would open for: ${postTitle}`);
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
    
    // Follow button functionality for posts
    followButtons.forEach(button => {
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

// Article Engagement Functionality
function initArticleInteractions() {
    const articleLikeButtons = document.querySelectorAll('.article-engagement .like-btn');
    const articleCommentButtons = document.querySelectorAll('.article-engagement .comment-btn');
    const articleShareButtons = document.querySelectorAll('.article-engagement .share-btn');
    
    // Like button functionality for articles
    articleLikeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isLiked = this.classList.contains('liked');
            const countElement = this.querySelector('.engagement-count');
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
    
    // Comment button functionality for articles
    articleCommentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const articleCard = this.closest('.article-card');
            const articleTitle = articleCard.querySelector('.article-title').textContent;
            
            this.classList.toggle('commented');
            this.querySelector('i').classList.toggle('far');
            this.querySelector('i').classList.toggle('fas');
            
            // Simulate comment functionality
            alert(`Comment section would open for: ${articleTitle}`);
        });
    });
    
    // Share button functionality for articles
    articleShareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const articleCard = this.closest('.article-card');
            const articleTitle = articleCard.querySelector('.article-title').textContent;
            const articleUrl = window.location.href;
            
            if (navigator.share) {
                navigator.share({
                    title: articleTitle,
                    url: articleUrl
                });
            } else {
                navigator.clipboard.writeText(`${articleTitle} - ${articleUrl}`).then(() => {
                    alert('Article link copied to clipboard!');
                });
            }
        });
    });
}

// View More Articles Button Functionality
function initViewMoreArticles() {
    const viewMoreArticlesBtn = document.querySelector('.view-all-posts .view-all-btn');
    
    if (viewMoreArticlesBtn) {
        viewMoreArticlesBtn.addEventListener('click', function() {
            // Show loading state exactly like the posts section
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Simulate loading delay like the posts section
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-arrow-right"></i> View More Articles';
                // Simulate loading more articles
                alert('More articles would be loaded here!');
                // In a real implementation, you would:
                // 1. Make an API call to fetch more articles
                // 2. Append the new articles to the articles grid
                // 3. Update the button state if needed
            }, 1500);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Smart Crop Advisory website loaded successfully');
    checkBackgroundImage();
    initPostInteractions();
    initCategoriesSlider();
    initArticleInteractions();
    initViewMoreArticles();
});
function initCategoriesSlider() {
    // REMOVE THIS CHECK to allow slider on mobile:
    // if (window.innerWidth <= 768) {
    //     console.log('Mobile grid layout detected, skipping slider initialization');
    //     return;
    // }
    
    // ... rest of your existing slider code
}
function initCategoriesSlider() {
    const categoriesContainer = document.querySelector('.categories-container');
    const categoryCards = document.querySelectorAll('.category-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    // If no category cards found, exit
    if (!categoryCards.length) return;
    
    let currentIndex = 0;
    const totalCards = categoryCards.length;
    let cardsPerView = 1;
    
    function updateCardsPerView() {
        if (window.innerWidth >= 769) {
            // Desktop: Calculate how many cards can fit
            const containerWidth = categoriesContainer.offsetWidth;
            const cardWidth = 280 + 25; // card width + gap
            cardsPerView = Math.floor(containerWidth / cardWidth);
        } else {
            // Mobile: Always show 1 card
            cardsPerView = 1;
        }
    }
    
    function updateSlider() {
        updateCardsPerView();
        
        // Update button states
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex >= totalCards - cardsPerView;
        }
        
        if (window.innerWidth <= 768) {
            // Mobile behavior - scale and opacity transitions
            categoryCards.forEach((card, index) => {
                card.classList.toggle('active', index === currentIndex);
            });
            
            // Scroll to active card
            if (categoriesContainer && categoryCards[currentIndex]) {
                const cardWidth = categoryCards[currentIndex].offsetWidth + 20; // card width + margin
                categoriesContainer.scrollTo({
                    left: currentIndex * cardWidth,
                    behavior: 'smooth'
                });
            }
        } else {
            // Desktop behavior - scroll to show current index
            if (categoriesContainer && categoryCards[currentIndex]) {
                const cardWidth = categoryCards[0].offsetWidth + 25; // card width + gap
                categoriesContainer.scrollTo({
                    left: currentIndex * cardWidth,
                    behavior: 'smooth'
                });
            }
        }
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // ... rest of your existing slider code
}
// Categories Slider Functionality - Fixed for mobile
function initCategoriesSlider() {
    const categoriesContainer = document.querySelector('.categories-container');
    const categoryCards = document.querySelectorAll('.category-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!categoryCards.length) return;
    
    let currentIndex = 0;
    const totalCards = categoryCards.length;
    
    function updateSlider() {
        // Update button states
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex >= totalCards - 1;
        }
        
        if (window.innerWidth <= 768) {
            // Mobile behavior
            categoryCards.forEach((card, index) => {
                card.classList.toggle('active', index === currentIndex);
            });
            
            // Scroll to active card - FIXED CALCULATION
            if (categoriesContainer && categoryCards[currentIndex]) {
                const card = categoryCards[currentIndex];
                const containerWidth = categoriesContainer.offsetWidth;
                const cardWidth = card.offsetWidth;
                const cardMargin = 20; // Approximate margin from CSS
                const scrollPosition = currentIndex * (cardWidth + cardMargin);
                
                categoriesContainer.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            // Desktop behavior
            if (categoriesContainer && categoryCards[currentIndex]) {
                const cardWidth = categoryCards[0].offsetWidth + 25;
                categoriesContainer.scrollTo({
                    left: currentIndex * cardWidth,
                    behavior: 'smooth'
                });
            }
        }
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Next button click - FIXED
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalCards - 1) {
                currentIndex++;
                updateSlider();
            }
        });
    }
    
    // Previous button click - FIXED
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reset to first card on resize
            currentIndex = 0;
            updateSlider();
        }, 250);
    });
    
    // Handle scroll events for desktop only
    if (window.innerWidth >= 769) {
        let scrollTimeout;
        categoriesContainer.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollPosition = categoriesContainer.scrollLeft;
                const cardWidth = categoryCards[0].offsetWidth + 25;
                const newIndex = Math.round(scrollPosition / cardWidth);
                
                if (newIndex !== currentIndex && newIndex >= 0 && newIndex <= totalCards - 1) {
                    currentIndex = newIndex;
                    updateSlider();
                }
            }, 100);
        });
    }
    
    // Handle touch events for mobile swipe
    if (window.innerWidth <= 768) {
        let startX = 0;
        let endX = 0;
        
        categoriesContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        categoriesContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0 && currentIndex < totalCards - 1) {
                    // Swipe left - next
                    currentIndex++;
                } else if (diff < 0 && currentIndex > 0) {
                    // Swipe right - previous
                    currentIndex--;
                }
                updateSlider();
            }
        }
    }
    
    // Initialize slider
    updateSlider();
}