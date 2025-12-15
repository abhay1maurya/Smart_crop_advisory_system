/* ==================== BLOG PAGE JAVASCRIPT ==================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Blog page loaded successfully');
    
    // Initialize all functionality
    initHeader();
    initMobileMenu();
    initLanguageToggle();
    initProfileModal();
    initBlogInteractions();
    initCategoryFilter();
    initSearchFunctionality();
    initLoadMore();
    initNewsletter();
    initModals();
    initCreatePost();
});

/* --- 1. Header Initialization --- */
function initHeader() {
    // Add shadow on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.blog-header-section');
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
            }
        }
    });
    
    // Add active state to nav links
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.blog-nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

/* --- 2. Mobile Menu --- */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.blog-mobile-link');
    const mobileLangBtns = document.querySelectorAll('.blog-mobile-lang-btn');
    const currentLangSpan = document.querySelector('.blog-current-lang span');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target) && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileToggle.querySelector('i').classList.remove('fa-times');
                mobileToggle.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileToggle.querySelector('i').classList.remove('fa-times');
                mobileToggle.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
            });
        });
        
        // Mobile language selection
        mobileLangBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                if (currentLangSpan) {
                    currentLangSpan.textContent = lang.toUpperCase();
                }
                
                // Show confirmation
                const langText = this.textContent;
                alert(`Language changed to ${langText}`);
                
                // Close menu
                mobileMenu.classList.remove('active');
                mobileToggle.querySelector('i').classList.remove('fa-times');
                mobileToggle.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
            });
        });
    }
}

/* --- 3. Language Toggle --- */
/* --- 3. Modern Language Toggle Logic --- */
function initLanguageToggle() {
    const langWrapper = document.getElementById('modernLangToggle');
    // Guard clause in case element doesn't exist on page
    if (!langWrapper) return;

    const langBtn = langWrapper.querySelector('.modern-lang-btn');
    const langOptions = langWrapper.querySelectorAll('.lang-option');
    
    // Toggle Dropdown visibility
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langWrapper.classList.toggle('active');
    });

    // Handle Option Selection
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // 1. Get Data from clicked option
            const selectedLang = option.getAttribute('data-lang');
            const selectedFlag = option.getAttribute('data-flag');
            const selectedName = option.querySelector('.opt-name').textContent;

            // 2. Update Main Button UI
            langBtn.querySelector('.lang-flag').textContent = selectedFlag;
            langBtn.querySelector('.lang-code').textContent = selectedLang.toUpperCase();

            // 3. Update Visual Active State in Dropdown
            langOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');

            // 4. Close Dropdown
            langWrapper.classList.remove('active');

            // 5. Console log or trigger actual translation logic here
            console.log(`Language switched to: ${selectedLang} (${selectedName})`);
            
            // Example: If you were reloading page with ?lang=hi
            // window.location.search = `?lang=${selectedLang}`;
        });
    });

    // Close dropdown when clicking anywhere else on the page
    document.addEventListener('click', (e) => {
        if (!langWrapper.contains(e.target)) {
            langWrapper.classList.remove('active');
        }
    });
}
/* --- 4. Profile Modal --- */
/* --- 4. Profile Dropdown Logic --- */
function initProfileModal() {
    const profileWrapper = document.querySelector('.blog-profile-wrapper');
    const profileBtn = document.getElementById('profileBtn');
    const logoutBtn = document.querySelector('.btn-logout');

    if (profileBtn && profileWrapper) {
        // Toggle on click
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            profileWrapper.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileWrapper.contains(e.target)) {
                profileWrapper.classList.remove('active');
            }
        });
    }

    // Logout Functionality (Mock)
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if(confirm("Are you sure you want to logout?")) {
                alert("You have been logged out.");
                window.location.reload(); // Refresh page to simulate logout
            }
        });
    }
}
/* --- 5. Blog Interactions --- */
function initBlogInteractions() {
    const postCards = document.querySelectorAll('.blog-post-card');
    
    postCards.forEach(card => {
        // Like functionality
        const likeSpan = card.querySelector('.blog-post-stats span:first-child');
        if (likeSpan) {
            likeSpan.addEventListener('click', function(e) {
                e.stopPropagation();
                const icon = this.querySelector('i');
                const text = this.textContent.trim();
                const count = parseInt(text.replace(/\D/g, ''));
                
                if (icon.classList.contains('fas')) {
                    // Unlike
                    icon.className = 'fas fa-heart';
                    this.innerHTML = `<i class="fas fa-heart"></i> ${count - 1}`;
                    this.style.color = '';
                } else {
                    // Like
                    icon.className = 'fas fa-heart';
                    this.innerHTML = `<i class="fas fa-heart"></i> ${count + 1}`;
                    this.style.color = '#ff6b6b';
                }
            });
        }
        
        // Read more button
        const readBtn = card.querySelector('.blog-read-btn');
        if (readBtn) {
            readBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const postTitle = card.querySelector('.blog-post-title').textContent;
                openArticleModal(card);
            });
        }
        
        // Card click - open article modal
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.blog-read-btn') && !e.target.closest('.blog-post-stats')) {
                openArticleModal(this);
            }
        });
    });
}

/* --- 6. Category Filter --- */
function initCategoryFilter() {
    const categoryCards = document.querySelectorAll('.blog-category-card');
    const allPosts = document.querySelectorAll('.blog-post-card');
    
    let activeCategory = 'all';
    
    categoryCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Remove active class from all categories
            categoryCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked category
            this.classList.add('active');
            
            // Get category from card
            let category = 'all';
            if (index === 1) category = 'crops';
            else if (index === 2) category = 'fertilizer';
            else if (index === 3) category = 'pests';
            else if (index === 4) category = 'weather';
            else if (index === 5) category = 'ai';
            else if (index === 6) category = 'success';
            
            activeCategory = category;
            
            // Filter posts
            filterPostsByCategory(activeCategory);
        });
    });
    
    // Set first category as active on load
    if (categoryCards.length > 0) {
        categoryCards[0].classList.add('active');
    }
}

function filterPostsByCategory(category) {
    const allPosts = document.querySelectorAll('.blog-post-card');
    
    allPosts.forEach(post => {
        if (category === 'all' || post.getAttribute('data-category') === category) {
            post.style.display = 'block';
            setTimeout(() => {
                post.style.opacity = '1';
                post.style.transform = 'translateY(0)';
            }, 10);
        } else {
            post.style.opacity = '0';
            post.style.transform = 'translateY(20px)';
            setTimeout(() => {
                post.style.display = 'none';
            }, 300);
        }
    });
}

/* --- 7. Search Functionality --- */
function initSearchFunctionality() {
    const searchInput = document.querySelector('.blog-search-box input');
    const searchBtn = document.querySelector('.blog-search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const posts = document.querySelectorAll('.blog-post-card');
        let foundCount = 0;
        
        if (searchTerm === '') {
            // Reset to show all posts
            posts.forEach(post => {
                post.style.display = 'block';
                post.style.opacity = '1';
            });
            return;
        }
        
        posts.forEach(post => {
            const title = post.querySelector('.blog-post-title').textContent.toLowerCase();
            const excerpt = post.querySelector('.blog-post-excerpt').textContent.toLowerCase();
            const tag = post.querySelector('.blog-post-tag').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm) || tag.includes(searchTerm)) {
                post.style.display = 'block';
                post.style.opacity = '1';
                foundCount++;
            } else {
                post.style.opacity = '0';
                setTimeout(() => {
                    post.style.display = 'none';
                }, 300);
            }
        });
        
        // Show message if no results
        const container = document.getElementById('blogPostsContainer');
        let message = container.querySelector('.blog-no-results');
        
        if (foundCount === 0) {
            if (!message) {
                message = document.createElement('div');
                message.className = 'blog-no-results';
                message.innerHTML = `
                    <div style="text-align: center; padding: 40px; grid-column: 1 / -1;">
                        <i class="fas fa-search fa-3x mb-3" style="color: #ccc;"></i>
                        <h4 style="color: var(--primary-dark); margin-bottom: 10px;">No articles found</h4>
                        <p style="color: var(--dark-gray);">Try searching with different keywords</p>
                    </div>
                `;
                container.appendChild(message);
            }
        } else if (message) {
            message.remove();
        }
    }
}

/* --- 8. Load More Functionality --- */
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const postsContainer = document.getElementById('blogPostsContainer');
    
    if (loadMoreBtn && postsContainer) {
        // Initially hide some posts
        const allPosts = Array.from(postsContainer.children).filter(el => el.classList.contains('blog-post-card'));
        allPosts.slice(6).forEach(post => {
            post.style.display = 'none';
        });
        
        let currentPosts = 6;
        
        loadMoreBtn.addEventListener('click', function() {
            const hiddenPosts = allPosts.slice(currentPosts, currentPosts + 3);
            
            if (hiddenPosts.length === 0) {
                loadMoreBtn.innerHTML = 'No More Articles <i class="fas fa-check"></i>';
                loadMoreBtn.disabled = true;
                loadMoreBtn.style.opacity = '0.5';
                return;
            }
            
            // Show loading state
            const originalText = loadMoreBtn.innerHTML;
            loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            loadMoreBtn.disabled = true;
            
            // Simulate loading delay
            setTimeout(() => {
                hiddenPosts.forEach((post, index) => {
                    setTimeout(() => {
                        post.style.display = 'block';
                        setTimeout(() => {
                            post.style.opacity = '1';
                            post.style.transform = 'translateY(0)';
                        }, 10);
                    }, index * 100);
                });
                
                currentPosts += hiddenPosts.length;
                
                // Update button text
                loadMoreBtn.innerHTML = originalText;
                loadMoreBtn.disabled = false;
                
                // Hide button if no more posts
                if (currentPosts >= allPosts.length) {
                    loadMoreBtn.innerHTML = 'All Articles Loaded <i class="fas fa-check"></i>';
                    loadMoreBtn.disabled = true;
                    loadMoreBtn.style.opacity = '0.5';
                }
            }, 800);
        });
    }
}

/* --- 9. Newsletter --- */
function initNewsletter() {
    // Main newsletter
    const newsletterForm = document.querySelector('.blog-newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('.blog-newsletter-btn');
            
            if (!emailInput.value) {
                alert('Please enter your email address');
                return;
            }
            
            // Save original button state
            const originalText = submitBtn.innerHTML;
            const originalBg = submitBtn.style.background;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success state
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                submitBtn.style.background = '#28a745';
                submitBtn.disabled = true;
                emailInput.value = '';
                emailInput.placeholder = 'Thank you for subscribing!';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = originalBg;
                    submitBtn.disabled = false;
                    emailInput.placeholder = 'Your email address';
                }, 3000);
            }, 1500);
        });
    }
    
    // Footer newsletter
    const footerNewsletter = document.querySelector('.blog-footer-newsletter');
    if (footerNewsletter) {
        footerNewsletter.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            
            if (!emailInput.value) {
                return;
            }
            
            // Show loading on button
            const originalHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                emailInput.value = '';
                emailInput.placeholder = 'Subscribed!';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalHtml;
                    emailInput.placeholder = 'Your Email';
                }, 2000);
            }, 1000);
        });
    }
}

/* --- 10. Modals --- */
function initModals() {
    const articleModal = document.getElementById('articleModal');
    const modalFollowBtn = articleModal.querySelector('.blog-modal-follow-btn');
    
    if (modalFollowBtn) {
        modalFollowBtn.addEventListener('click', function() {
            if (this.textContent === 'Follow') {
                this.textContent = 'Following';
                this.style.background = 'var(--primary-green)';
                this.style.color = 'var(--white)';
            } else {
                this.textContent = 'Follow';
                this.style.background = 'transparent';
                this.style.color = 'var(--primary-green)';
            }
        });
    }
}

/* --- 11. Open Article Modal --- */
function openArticleModal(card) {
    const title = card.querySelector('.blog-post-title').textContent;
    const excerpt = card.querySelector('.blog-post-excerpt').textContent;
    const authorImg = card.querySelector('.blog-author-img').src;
    const authorName = card.querySelector('.blog-post-author h6').textContent;
    const authorRole = card.querySelector('.blog-post-author span').textContent;
    const tag = card.querySelector('.blog-post-tag').textContent;
    
    const articleModal = document.getElementById('articleModal');
    const modalTitle = articleModal.querySelector('#modalArticleTitle');
    const modalAuthorImg = articleModal.querySelector('#modalAuthorImg');
    const modalAuthorName = articleModal.querySelector('#modalAuthorName');
    const modalAuthorRole = articleModal.querySelector('#modalAuthorRole');
    const modalContent = articleModal.querySelector('#modalArticleContent');
    
    // Set modal content
    modalTitle.textContent = title;
    modalAuthorImg.src = authorImg;
    modalAuthorImg.alt = authorName;
    modalAuthorName.textContent = authorName;
    modalAuthorRole.textContent = authorRole;
    
    // Generate article content
    modalContent.innerHTML = `
        <p style="font-size: 16px; color: var(--dark-gray); margin-bottom: 20px; font-weight: 500;">${excerpt}</p>
        
        <h3>Detailed Analysis</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        
        <h3>Key Takeaways</h3>
        <ul>
            <li>Enhanced yield prediction through AI analysis</li>
            <li>Real-time monitoring capabilities for better decision making</li>
            <li>Cost-effective solutions for small and medium farmers</li>
            <li>Environmentally sustainable practices</li>
        </ul>
        
        <div style="background: var(--light-green); padding: 20px; border-radius: 10px; margin: 25px 0; border-left: 4px solid var(--primary-green);">
            <h4 style="color: var(--primary-dark); margin-bottom: 10px;">Expert Advice</h4>
            <p style="margin: 0;">Consult with local agricultural experts for region-specific advice before implementing new farming strategies.</p>
        </div>
        
        <p>This article is part of our "${tag}" series, providing in-depth analysis and practical guidance for modern farmers.</p>
    `;
    
    // Show modal
    articleModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close modal when clicking X
    const closeBtn = articleModal.querySelector('.blog-modal-close');
    closeBtn.addEventListener('click', function() {
        articleModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside
    articleModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* --- 12. Filter Posts Function (for category cards) --- */
function filterPosts(category) {
    filterPostsByCategory(category);
    
    // Update active category card
    const categoryCards = document.querySelectorAll('.blog-category-card');
    categoryCards.forEach(card => {
        card.classList.remove('active');
        const cardCategory = card.querySelector('h5').textContent.toLowerCase().replace(/\s+/g, '-');
        if (cardCategory === category || (category === 'all' && cardCategory === 'all-topics')) {
            card.classList.add('active');
        }
    });
}

/* --- 13. Create Post Logic --- */
function initCreatePost() {
    const headerBtn = document.getElementById('headerCreateBtn');
    const modal = document.getElementById('createPostModal');
    const closeBtn = document.getElementById('closeCreateModal');
    const cancelBtn = document.getElementById('cancelCreateBtn');
    const form = document.getElementById('createPostForm');
    const fileInput = document.getElementById('postImage');
    const imagePreview = document.getElementById('imagePreview');
    const uploadLabel = document.querySelector('.blog-file-upload-label');

    // Open Modal
    if (headerBtn && modal) {
        headerBtn.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close Modal Logic
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            // Optional: reset form
            // form.reset();
            // resetImagePreview();
        }
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    
    // Close on outside click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Image Preview Logic
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.style.backgroundImage = `url(${e.target.result})`;
                    imagePreview.style.display = 'block';
                    uploadLabel.style.display = 'none';
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // Reset Image Helper
    function resetImagePreview() {
        imagePreview.style.backgroundImage = '';
        imagePreview.style.display = 'none';
        uploadLabel.style.display = 'flex';
    }

    // Form Submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = form.querySelector('.blog-btn-publish');
            const originalText = btn.textContent;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publishing...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Published!';
                btn.style.background = '#28a745';
                
                setTimeout(() => {
                    alert('Your post has been submitted for review!');
                    closeModal();
                    form.reset();
                    resetImagePreview();
                    
                    // Reset Button
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 1000);
            }, 1500);
        });
    }
}