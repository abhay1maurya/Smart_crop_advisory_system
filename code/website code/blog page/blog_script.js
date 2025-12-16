/* ==================== BLOG PAGE JAVASCRIPT - FIXED & ROBUST ==================== */

// Global State "Database"
let blogPostsData = [];
let currentActivePostId = null;

// Wait for the HTML to be fully ready before running any code
document.addEventListener('DOMContentLoaded', function() {
    console.log('KrishiSahayak Blog Script Loaded...');

    try {
        // 1. Initialize Data
        initDataModel();
        
        // 2. Initialize UI Components
        initHeader();
        initMobileMenu();
        initLanguageToggle();
        initProfileModal();
        
        // 3. Initialize Core Features
        initCategoryFilter();
        initSearchFunctionality();
        initLoadMore();
        initNewsletter();
        
        // 4. Initialize Interactions
        initCardInteractions();
        initCreatePost();
        initArticleModalLogic();

        console.log('All modules initialized successfully.');
    } catch (error) {
        console.error('CRITICAL ERROR initializing blog script:', error);
    }
});

/* --- Helper: Safe Element Selector (Prevents Crashes) --- */
function safeGetText(parent, selector) {
    const el = parent.querySelector(selector);
    return el ? el.innerText.trim() : '';
}

function safeGetSrc(parent, selector) {
    const el = parent.querySelector(selector);
    return el ? el.src : ''; // Returns empty string if image missing
}

/* --- 1. Data Model Initialization --- */
function initDataModel() {
    const postCards = document.querySelectorAll('.blog-post-card');
    
    if (postCards.length === 0) {
        console.warn('No blog posts found! Check your HTML class names.');
        return;
    }

    postCards.forEach((card, index) => {
        // Generate a unique ID for every card found
        const uniqueId = `post-${index}`;
        card.setAttribute('data-id', uniqueId);

        // Extract Data safely
        const title = safeGetText(card, '.blog-post-title');
        const excerpt = safeGetText(card, '.blog-post-excerpt');
        const authorName = safeGetText(card, '.blog-post-author h6');
        const authorRole = safeGetText(card, '.blog-post-author span');
        const authorImg = safeGetSrc(card, '.blog-author-img');
        const postImg = safeGetSrc(card, '.blog-post-image img');
        
        // Parse Likes/Comments (Remove non-numbers to be safe)
        const stats = card.querySelectorAll('.blog-post-stats span');
        let likeCount = 0;
        let commentCount = 0;

        if (stats.length >= 2) {
            likeCount = parseInt(stats[0].innerText.replace(/\D/g, '')) || 0;
            commentCount = parseInt(stats[1].innerText.replace(/\D/g, '')) || 0;
        }

        // Store in Global Array
        blogPostsData.push({
            id: uniqueId,
            title: title,
            excerpt: excerpt,
            // Mock Content
            content: `
                <p class="lead" style="font-size:1.1rem; color:#555; margin-bottom:20px;">${excerpt}</p>
                <p><strong>(Full article content for "${title}")</strong></p>
                <p>Sustainable farming is crucial for the future. This article explores how modern techniques can be combined with traditional wisdom.</p>
                <h4>Key Highlights:</h4>
                <ul>
                    <li>Proper soil preparation increases yield by 20%.</li>
                    <li>Water management is key during dry seasons.</li>
                    <li>Organic fertilizers provide long-term soil health.</li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            `,
            author: { name: authorName, role: authorRole, img: authorImg },
            image: postImg,
            stats: { 
                likes: likeCount, 
                comments: commentCount, 
                isLiked: false,
                isFollowing: false // Track per-post follow state
            },
            comments: [] 
        });
    });
    console.log(`Initialized ${blogPostsData.length} blog posts.`);
}

/* --- 2. Header & Scroll Effect --- */
function initHeader() {
    const header = document.querySelector('.blog-header-section');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
        }
    });

    // Active Link Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.blog-nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

/* --- 3. Mobile Menu (Forced Logic) --- */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileToggle || !mobileMenu) return;

    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('active');
        
        const icon = mobileToggle.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            // Menu Open
            icon.className = 'fas fa-times'; // Switch to X icon
            mobileMenu.style.right = '0'; // Force CSS
            document.body.style.overflow = 'hidden'; // Stop scrolling
        } else {
            // Menu Closed
            icon.className = 'fas fa-bars'; // Switch to Hamburger
            mobileMenu.style.right = '-100%'; // Force CSS
            document.body.style.overflow = ''; // Allow scrolling
        }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            
            mobileMenu.classList.remove('active');
            mobileMenu.style.right = '-100%';
            mobileToggle.querySelector('i').className = 'fas fa-bars';
            document.body.style.overflow = '';
        }
    });
}

/* --- 4. Language Toggle --- */
function initLanguageToggle() {
    const langWrapper = document.getElementById('modernLangToggle');
    if (!langWrapper) return;

    const langBtn = langWrapper.querySelector('.modern-lang-btn');
    const langOptions = langWrapper.querySelectorAll('.lang-option');
    
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langWrapper.classList.toggle('active');
    });

    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const flag = option.getAttribute('data-flag');
            const code = option.getAttribute('data-lang');

            // Update Main Button
            langBtn.querySelector('.lang-flag').textContent = flag;
            langBtn.querySelector('.lang-code').textContent = code.toUpperCase();
            
            // Visual Active State
            langOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Close Dropdown
            langWrapper.classList.remove('active');

            // Persist and translate
            try { localStorage.setItem('site_lang', code); } catch (e) {}
            translatePage(code);
            
            // Debug
            console.log(`Language changed to: ${code}`);
        });
    });

    // Mobile menu language buttons
    document.querySelectorAll('.blog-mobile-lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            // reflect in header buttons and translate
            const activeOpt = langWrapper.querySelector(`.lang-option[data-lang="${lang}"]`);
            if (activeOpt) activeOpt.click();
            else {
                try { localStorage.setItem('site_lang', lang); } catch (e) {}
                translatePage(lang);
            }

            // Close mobile menu
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                mobileMenu.style.right = '-100%';
                const mobileToggle = document.getElementById('mobileToggle');
                if (mobileToggle) mobileToggle.querySelector('i').className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!langWrapper.contains(e.target)) {
            langWrapper.classList.remove('active');
        }
    });

    // --- Translation Module ---
    const TRANSLATIONS = {
        en: {
            nav_home: 'Home', nav_blog: 'Blog', nav_contact: 'Contact Us',
            btn_create: 'Create', btn_share_story: 'Share Your Story',
            hero_title: 'Smart Farming <br><span class="blog-text-gradient">Insights & Knowledge</span>',
            hero_desc: 'Discover AI-powered agricultural knowledge, expert articles, and farming success stories from across India.',
            search_ph: 'Search articles, crops, techniques...', btn_search: '',
            categories_title: 'Explore Categories', categories_sub: 'Browse through our curated collection of farming knowledge',
            farmers_corner: "Farmer's Corner", farmers_corner_sub: "Real stories and tips from farmers like you.",
            lbl_select_lang: 'Select Language'
        },
        hi: {
            nav_home: 'होम', nav_blog: 'ब्लॉग', nav_contact: 'संपर्क करें',
            btn_create: 'बनाएँ', btn_share_story: 'अपनी कहानी साझा करें',
            hero_title: 'स्मार्ट फार्मिंग <br><span class="blog-text-gradient">जानकारी और ज्ञान</span>',
            hero_desc: 'AI-समर्थित कृषि ज्ञान, विशेषज्ञ लेख और देशभर के किसानों की सफल कहानियाँ खोजें।',
            search_ph: 'लेख, फसलें, तकनीकें खोजें...', btn_search: '',
            categories_title: 'श्रेणियाँ देखें', categories_sub: 'हमारे क्यूरेट किए गए कृषि ज्ञान को ब्राउज़ करें',
            farmers_corner: 'किसानों का कोना', farmers_corner_sub: 'किसानों से वास्तविक कहानियाँ और सुझाव।',
            lbl_select_lang: 'भाषा चुनें'
        },
        pa: {
            nav_home: 'ਹੋਮ', nav_blog: 'ਬਲੌਗ', nav_contact: 'ਸੰਪਰਕ ਕਰੋ',
            btn_create: 'ਬਣਾਓ', btn_share_story: 'ਆਪਣੀ ਕਹਾਣੀ ਸਾਂਝੀ ਕਰੋ',
            hero_title: 'ਸਮਾਰਟ ਫਾਰਮਿੰਗ <br><span class="blog-text-gradient">ਜਾਣਕਾਰੀਆਂ ਅਤੇ ਗਿਆਨ</span>',
            hero_desc: 'AI-ਸਹਿਯੋਗੀ ਕਿਸਾਨੀ ਗਿਆਨ, ਵਿਸ਼ੇਸ਼ਗਿਆ ਲੇਖ ਅਤੇ ਦੇਸ਼ ਭਰ ਦੇ ਕਿਸਾਨਾਂ ਦੀਆਂ ਕਾਮਯਾਬੀ ਕਹਾਣੀਆਂ ਵੇਖੋ।',
            search_ph: 'ਲੇਖ, ਫਸਲਾਂ, ਤਕਨੀਕਾਂ ਖੋਜੋ...', btn_search: '',
            categories_title: 'ਸ਼੍ਰੇਣੀਆਂ ਖੋਜੋ', categories_sub: 'ਸਾਡੀ ਚੁਣੀ ਹੋਈ ਕਿਸਾਨੀ ਜਾਣਕਾਰੀ ਨੂੰ ਵੇਖੋ',
            farmers_corner: 'ਕਿਸਾਨਾਂ ਦਾ ਕੋਨਾ', farmers_corner_sub: 'ਕਿਸਾਨਾਂ ਵੱਲੋਂ ਅਸਲੀ ਕਹਾਣੀਆਂ ਅਤੇ ਸੁਝਾਅ।',
            lbl_select_lang: 'ਭਾਸ਼ਾ ਚੁਣੋ'
        }
    };

    function translatePage(lang) {
        const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                if (key === 'hero_title') el.innerHTML = dict[key];
                else el.textContent = dict[key];
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) el.setAttribute('placeholder', dict[key]);
        });
        try { localStorage.setItem('site_lang', lang); } catch (e) {}
    }

    // Initialize language from localStorage
    const savedLang = localStorage.getItem('site_lang') || 'en';
    const selectedOpt = langWrapper.querySelector(`.lang-option[data-lang="${savedLang}"]`);
    if (selectedOpt) selectedOpt.click();
    else translatePage(savedLang);
}

/* --- 5. Profile Modal --- */
function initProfileModal() {
    const profileWrapper = document.querySelector('.blog-profile-wrapper');
    const profileBtn = document.getElementById('profileBtn');
    const dropdown = document.getElementById('profileDropdown');
    
    if (!profileBtn || !profileWrapper) return;

    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileWrapper.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!profileWrapper.contains(e.target)) {
            profileWrapper.classList.remove('active');
        }
    });
    
    // Logout Button Mock
    const logoutBtn = document.querySelector('.btn-logout');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            alert('Logged out successfully!');
            profileWrapper.classList.remove('active');
        });
    }
}

/* --- 6. Card Interactions (Opening Modal & Liking) --- */
function initCardInteractions() {
    const postCards = document.querySelectorAll('.blog-post-card');

    postCards.forEach(card => {
        // --- A. Opening Modal (Clicking Card) ---
        card.addEventListener('click', (e) => {
            // Don't open modal if they clicked the 'Like' text specifically
            if (e.target.closest('.blog-post-stats')) return;

            const postId = card.getAttribute('data-id');
            openArticleModal(postId);
        });

        // --- B. Read More Button ---
        const readBtn = card.querySelector('.blog-read-btn');
        if(readBtn) {
            readBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent double firing
                const postId = card.getAttribute('data-id');
                openArticleModal(postId);
            });
        }

        // --- C. Like Button (On Card) ---
        const likeBtn = card.querySelector('.blog-post-stats span:first-child');
        if(likeBtn) {
            likeBtn.style.cursor = 'pointer'; // Make sure it looks clickable
            likeBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Don't open modal
                const postId = card.getAttribute('data-id');
                const post = blogPostsData.find(p => p.id === postId);
                
                if(post) {
                    togglePostLike(post);
                } else {
                    console.error('Post data not found for ID:', postId);
                }
            });
        }
    });
}

/* --- 7. Article Modal Logic --- */
function initArticleModalLogic() {
    const modal = document.getElementById('articleModal');
    if(!modal) return;

    const closeBtn = modal.querySelector('.blog-modal-close');
    
    // Close Logic
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        currentActivePostId = null;
    };

    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    
    // Close if clicking outside content
    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
    });

    // --- Modal Like Button ---
    const modalLikeBtn = document.getElementById('modalLikeBtn');
    if(modalLikeBtn) {
        modalLikeBtn.addEventListener('click', () => {
            if (!currentActivePostId) return;
            const post = blogPostsData.find(p => p.id === currentActivePostId);
            if (post) {
                togglePostLike(post);
                updateModalUI(post); // Refresh Modal UI immediately
            }
        });
    }

    // --- Modal Comment System ---
    const postCommentBtn = document.getElementById('modalPostCommentBtn');
    const commentInput = document.getElementById('modalCommentInput');

    const handleComment = () => {
        if (!currentActivePostId) return;
        const text = commentInput.value.trim();
        if (!text) return;

        const post = blogPostsData.find(p => p.id === currentActivePostId);
        if (post) {
            // Add comment
            post.comments.unshift({
                user: 'You',
                text: text,
                avatar: 'https://randomuser.me/api/portraits/men/85.jpg'
            });
            post.stats.comments++;

            // Update UI
            renderComments(post.comments);
            document.getElementById('modalCommentCount').textContent = post.stats.comments;
            commentInput.value = '';

            // Update Card on background
            updateCardUI(post);
        }
    };

    if(postCommentBtn) postCommentBtn.addEventListener('click', handleComment);
    if(commentInput) {
        commentInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleComment();
        });
    }

    // --- Modal Share Button ---
    const modalShareBtn = document.getElementById('modalShareBtn');
    if(modalShareBtn) {
        const copyToClipboard = (text) => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                return navigator.clipboard.writeText(text);
            }
            // Fallback: temporary textarea
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
                } catch (err) {
                    reject(err);
                }
            });
        };

        modalShareBtn.addEventListener('click', () => {
            const url = window.location.href;
            const span = modalShareBtn.querySelector('span');
            const originalText = span ? span.textContent : '';

            // Prefer native share dialog when available
            if (navigator.share && currentActivePostId) {
                const post = blogPostsData.find(p => p.id === currentActivePostId) || {};
                navigator.share({ title: post.title || document.title, text: post.excerpt || post.title || '', url })
                    .then(() => {
                        if (span) span.textContent = 'Shared!';
                        modalShareBtn.classList.add('share-success');
                        setTimeout(() => {
                            if (span) span.textContent = originalText;
                            modalShareBtn.classList.remove('share-success');
                        }, 1600);
                    })
                    .catch(err => {
                        // If native share fails (user cancelled or not supported), fall back
                        copyToClipboard(url).then(() => {
                            if (span) span.textContent = 'Copied!';
                            modalShareBtn.classList.add('share-success');
                            setTimeout(() => {
                                if (span) span.textContent = originalText;
                                modalShareBtn.classList.remove('share-success');
                            }, 1600);
                        }).catch(() => {
                            if (span) span.textContent = 'Copy failed';
                            setTimeout(() => { if (span) span.textContent = originalText; }, 1600);
                        });
                    });
                return;
            }

            // Fallback: copy to clipboard
            copyToClipboard(url).then(() => {
                if (span) span.textContent = 'Copied!';
                modalShareBtn.classList.add('share-success');

                // Replace icon with check for brief moment (if icon exists)
                const icon = modalShareBtn.querySelector('i');
                if (icon) {
                    const oldClass = icon.className;
                    icon.className = 'fas fa-check';
                    setTimeout(() => { icon.className = oldClass; }, 1600);
                }

                setTimeout(() => {
                    if (span) span.textContent = originalText;
                    modalShareBtn.classList.remove('share-success');
                }, 1600);
            }).catch(err => {
                console.error('Failed to copy link', err);
                // Fallback UI: briefly show error text
                if (span) {
                    const prev = span.textContent;
                    span.textContent = 'Copy failed';
                    setTimeout(() => { span.textContent = prev; }, 1600);
                }
            });
        });
    }

    // --- Modal Follow Button (per-post follow state) ---
    const modalFollowBtn = document.querySelector('.blog-modal-follow-btn');
    if (modalFollowBtn) {
        modalFollowBtn.addEventListener('click', function() {
            if (!currentActivePostId) return;
            const post = blogPostsData.find(p => p.id === currentActivePostId);
            if (!post) return;

            // Toggle per-post follow flag
            post.stats.isFollowing = !post.stats.isFollowing;
            const following = !!post.stats.isFollowing;

            // Update only this modal button
            this.classList.toggle('following', following);
            this.textContent = following ? 'Following' : 'Follow';
            this.setAttribute('aria-pressed', following ? 'true' : 'false');

            // Update profile 'Following' stat visually (feedback only)
            const statsItems = document.querySelectorAll('.profile-stats .stat-item');
            for (const item of statsItems) {
                const label = item.querySelector('.stat-label');
                const val = item.querySelector('.stat-val');
                if (label && val && label.textContent.trim().toLowerCase() === 'following') {
                    let count = parseInt(val.textContent.replace(/\D/g, '')) || 0;
                    count = following ? count + 1 : Math.max(0, count - 1);
                    val.textContent = count;
                    break;
                }
            }

            // If there were per-card follow buttons associated with this author, update them here
            // (We try to match by author name to be safe)
            const authorName = post.author && post.author.name;
            if (authorName) {
                document.querySelectorAll('.blog-post-card').forEach(card => {
                    const nameEl = card.querySelector('.blog-post-author h6');
                    if (nameEl && nameEl.textContent.trim() === authorName) {
                        const cardFollowBtn = card.querySelector('.btn-follow');
                        if (cardFollowBtn) {
                            cardFollowBtn.classList.toggle('following', following);
                            cardFollowBtn.textContent = following ? 'Following' : 'Follow';
                            cardFollowBtn.setAttribute('aria-pressed', following ? 'true' : 'false');
                        }
                    }
                });
            }
        });
    }
}

/* --- Helper: Open Modal --- */
function openArticleModal(postId) {
    const post = blogPostsData.find(p => p.id === postId);
    if (!post) {
        console.error('Cannot open modal: Post not found');
        return;
    }

    currentActivePostId = postId;
    const modal = document.getElementById('articleModal');

    // Populate Content
    document.getElementById('modalArticleTitle').textContent = post.title;
    document.getElementById('modalAuthorName').textContent = post.author.name;
    document.getElementById('modalAuthorRole').textContent = post.author.role;
    document.getElementById('modalAuthorImg').src = post.author.img;
    
    const modalImg = document.getElementById('modalPostImage');
    if(post.image) {
        modalImg.src = post.image;
        modalImg.style.display = 'block';
    } else {
        modalImg.style.display = 'none';
    }
    
    document.getElementById('modalArticleContent').innerHTML = post.content;

    // Set Initial Stats State
    updateModalUI(post);
    renderComments(post.comments);

    // Show Modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/* --- Helper: Toggle Like Logic (Syncs Data & UI) --- */
function togglePostLike(post) {
    // Flip state
    post.stats.isLiked = !post.stats.isLiked;

    // Adjust count and clamp to >= 0
    post.stats.likes += post.stats.isLiked ? 1 : -1;
    if (post.stats.likes < 0) post.stats.likes = 0;

    // Update card UI immediately
    updateCardUI(post);

    // If modal for this post is open, update modal UI as well
    if (currentActivePostId === post.id) {
        updateModalUI(post);
    }
}

/* --- Helper: Update Card UI --- */
function updateCardUI(post) {
    const card = document.querySelector(`.blog-post-card[data-id="${post.id}"]`);
    if (!card) return;

    const likeSpan = card.querySelector('.blog-post-stats span:first-child');
    const commentSpan = card.querySelector('.blog-post-stats span:last-child');

    // Update Like Icon & Text
    if (post.stats.isLiked) {
        likeSpan.innerHTML = `<i class="fas fa-heart" style="color: #ff6b6b;"></i> ${post.stats.likes}`;
    } else {
        likeSpan.innerHTML = `<i class="far fa-heart"></i> ${post.stats.likes}`;
    }

    // Update Comment Text
    commentSpan.innerHTML = `<i class="fas fa-comment"></i> ${post.stats.comments}`;
}

/* --- Helper: Update Modal UI --- */
function updateModalUI(post) {
    const likeBtn = document.getElementById('modalLikeBtn');
    const likeCount = document.getElementById('modalLikeCount');
    const commentCount = document.getElementById('modalCommentCount');

    likeCount.textContent = post.stats.likes;
    commentCount.textContent = post.stats.comments;

    // Update Like Button (count + visual)
    if (post.stats.isLiked) {
        likeBtn.classList.add('liked');
        likeBtn.innerHTML = `<i class="fas fa-heart"></i> <span id="modalLikeCount">${post.stats.likes}</span> Likes`;
    } else {
        likeBtn.classList.remove('liked');
        likeBtn.innerHTML = `<i class="far fa-heart"></i> <span id="modalLikeCount">${post.stats.likes}</span> Likes`;
    }

    // Update Follow Button (per-post state)
    const followBtn = document.querySelector('.blog-modal-follow-btn');
    if (followBtn) {
        const following = !!post.stats.isFollowing;
        followBtn.classList.toggle('following', following);
        followBtn.textContent = following ? 'Following' : 'Follow';
        followBtn.setAttribute('aria-pressed', following ? 'true' : 'false');
        followBtn.title = following ? 'You are following this author' : 'Follow this author';
    }
}

/* --- Helper: Render Comments --- */
function renderComments(comments) {
    const list = document.getElementById('modalCommentsList');
    list.innerHTML = '';

    if (comments.length === 0) {
        list.innerHTML = '<p style="text-align:center; color:#999; margin-top:10px;">No comments yet.</p>';
        return;
    }

    comments.forEach(c => {
        const html = `
            <div class="single-comment">
                <img src="${c.avatar}" class="comment-avatar">
                <div class="comment-content">
                    <span class="comment-author">${c.user}</span>
                    <p>${c.text}</p>
                </div>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', html);
    });
}

/* --- 8. Category Filter --- */
function initCategoryFilter() {
    const categoryCards = document.querySelectorAll('.blog-category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            // Visual Active State
            categoryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            // Logic
            const categoryName = card.querySelector('h5').innerText.toLowerCase();
            let filterKey = 'all';

            if(categoryName.includes('crop')) filterKey = 'crops';
            else if(categoryName.includes('fertilizer')) filterKey = 'fertilizer';
            else if(categoryName.includes('pest')) filterKey = 'pests';
            else if(categoryName.includes('weather')) filterKey = 'weather';
            else if(categoryName.includes('ai')) filterKey = 'ai';
            else if(categoryName.includes('success')) filterKey = 'success';

            // Filter
            const posts = document.querySelectorAll('.blog-post-card');
            posts.forEach(post => {
                const postCat = post.getAttribute('data-category');
                if (filterKey === 'all' || postCat === filterKey) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
}

/* --- 9. Search Functionality --- */
function initSearchFunctionality() {
    const input = document.querySelector('.blog-search-box input');
    const btn = document.querySelector('.blog-search-btn');
    if (!input || !btn) return;

    const performSearch = () => {
        const term = input.value.trim().toLowerCase();
        const posts = document.querySelectorAll('.blog-post-card');

        posts.forEach(post => {
            const title = post.querySelector('.blog-post-title').innerText.toLowerCase();
            if (term === '' || title.includes(term)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    };

    btn.addEventListener('click', performSearch);
    input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

/* --- 10. Load More Button (Mock) --- */
function initLoadMore() {
    const btn = document.querySelector('.blog-load-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        setTimeout(() => {
            btn.innerHTML = 'No more posts available';
            btn.disabled = true;
            btn.style.opacity = '0.7';
        }, 1500);
    });
}

/* --- 11. Newsletter Form --- */
function initNewsletter() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // If it looks like a newsletter form (has email input but no password)
        if(form.querySelector('input[type="email"]') && !form.querySelector('input[type="password"]')) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for subscribing to KrishiSahayak!');
                form.reset();
            });
        }
    });
}

/* --- 12. Create Post Modal --- */
function initCreatePost() {
    const modal = document.getElementById('createPostModal');
    if(!modal) return;

    const btns = [document.getElementById('headerCreateBtn'), document.getElementById('sectionCreateBtn')];
    const closeBtn = document.getElementById('closeCreateModal');
    const cancelBtn = document.getElementById('cancelCreateBtn');
    const form = document.getElementById('createPostForm');
    
    // Toggle Functions
    const showModal = () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    const hideModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Listeners
    btns.forEach(b => { if(b) b.addEventListener('click', showModal); });
    if(closeBtn) closeBtn.addEventListener('click', hideModal);
    if(cancelBtn) cancelBtn.addEventListener('click', hideModal);
    
    // Image Preview Logic
    const fileInput = document.getElementById('postImage');
    const preview = document.getElementById('imagePreview');
    const label = document.querySelector('.blog-file-upload-label');
    
    if(fileInput && preview) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if(file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    preview.style.backgroundImage = `url(${ev.target.result})`;
                    preview.style.display = 'block';
                    if(label) label.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Submit Logic
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.blog-btn-publish');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Publishing...';
            
            setTimeout(() => {
                alert('Success! Your post has been submitted for review.');
                hideModal();
                form.reset();
                if(preview) {
                    preview.style.display = 'none';
                    if(label) label.style.display = 'flex';
                }
                submitBtn.innerText = originalText;
            }, 1500);
        });
    }
}