/* =========================================================
   KRISHI SAHAYAK BLOG - FINAL CLEAN JS
   Farmer’s Corner + Expert Insights (NO ERRORS)
   ========================================================= */

/* ================= DOM READY ================= */
document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initMobileMenu();
    initLanguageToggle();
    initProfileModal();

    initFarmersCornerLoadMore();   // Farmer only
    showExpertInsightsAlways();    // Expert always visible
    initArticlesLoadMore();        // Load more articles

    initCategoryFilter();          // Farmer + Expert
    initSearchFunctionality();     // Farmer only

    initReadPostModal();           // Read Post / Read Article
    initArticleModalClose();
    initNewsletter();
    initCreatePost();
});

/* ================= HEADER ================= */
function initHeader() {
    const header = document.querySelector(".blog-header-section");
    if (!header) return;

    window.addEventListener("scroll", () => {
        header.style.boxShadow =
            window.scrollY > 50
                ? "0 4px 15px rgba(0,0,0,.15)"
                : "0 2px 15px rgba(0,0,0,.05)";
    });
}

/* ================= MOBILE MENU ================= */
function initMobileMenu() {
    const toggle = document.getElementById("mobileToggle");
    const menu = document.getElementById("mobileMenu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
        document.body.style.overflow = menu.classList.contains("active")
            ? "hidden"
            : "";

        toggle.querySelector("i").className =
            menu.classList.contains("active")
                ? "fas fa-times"
                : "fas fa-bars";
    });
}

/* ================= LANGUAGE ================= */
function initLanguageToggle() {
    const wrapper = document.getElementById("modernLangToggle");
    if (!wrapper) return;

    const btn = wrapper.querySelector(".modern-lang-btn");

    btn.addEventListener("click", e => {
        e.stopPropagation();
        wrapper.classList.toggle("active");
    });

    document.addEventListener("click", () =>
        wrapper.classList.remove("active")
    );
}

/* ================= PROFILE ================= */
function initProfileModal() {
    const wrapper = document.querySelector(".blog-profile-wrapper");
    const btn = document.getElementById("profileBtn");

    if (!wrapper || !btn) return;

    btn.addEventListener("click", e => {
        e.stopPropagation();
        wrapper.classList.toggle("active");
    });

    document.addEventListener("click", () =>
        wrapper.classList.remove("active")
    );
}

/* =========================================================
   FARMER’S CORNER LOAD MORE (MAIN REQUIREMENT)
   ========================================================= */
function initFarmersCornerLoadMore() {
    const farmerPosts = Array.from(
        document.querySelectorAll(".farmer-post")
    );
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const showLessBtn = document.getElementById("showLessBtn");

    if (!farmerPosts.length || !loadMoreBtn || !showLessBtn) return;

    const STEP = 3;
    let visible = STEP;

    // Initial
    farmerPosts.forEach((post, index) => {
        post.style.display = index < visible ? "block" : "none";
    });

    if (farmerPosts.length <= STEP) {
        loadMoreBtn.style.display = "none";
        showLessBtn.style.display = "none";
        return;
    }

    // Load More button click
    loadMoreBtn.addEventListener("click", () => {
        visible += STEP;

        farmerPosts.forEach((post, index) => {
            if (index < visible) post.style.display = "block";
        });

        if (visible >= farmerPosts.length) {
            loadMoreBtn.style.display = "none";
        }
        showLessBtn.style.display = "block";
    });

    // Show Less button click
    showLessBtn.addEventListener("click", () => {
        visible = STEP;

        farmerPosts.forEach((post, index) => {
            post.style.display = index < visible ? "block" : "none";
        });

        loadMoreBtn.style.display = "block";
        showLessBtn.style.display = "none";
    });
}

/* ================= EXPERT INSIGHTS ================= */
function showExpertInsightsAlways() {
    document
        .querySelectorAll(".expert-articles-section .blog-post-card")
        .forEach(post => (post.style.display = "block"));
}

/* ================= CATEGORY FILTER (Farmer + Expert Articles) ================= */
function initCategoryFilter() {
    const categories = document.querySelectorAll(".blog-category-card");
    const farmerPosts = document.querySelectorAll(".farmer-post");
    const expertArticles = document.querySelectorAll(".expert-card-style");

    if (!categories.length) return;

    categories.forEach(cat => {
        cat.addEventListener("click", () => {
            categories.forEach(c => c.classList.remove("active"));
            cat.classList.add("active");

            const key = cat.innerText.toLowerCase();

            // Filter farmer posts
            farmerPosts.forEach(post => {
                const postCat = post.dataset.category || "";
                post.style.display =
                    key.includes("all") || postCat.includes(key)
                        ? "block"
                        : "none";
            });

            // Filter expert articles
            expertArticles.forEach(article => {
                const articleCat = article.dataset.category || "";
                article.style.display =
                    key.includes("all") || articleCat.includes(key)
                        ? "block"
                        : "none";
            });
        });
    });
}

/* ================= SEARCH (Farmer only) ================= */
function initSearchFunctionality() {
    const input = document.querySelector(".blog-search-box input");
    const btn = document.querySelector(".blog-search-btn");
    const farmerPosts = document.querySelectorAll(".farmer-post");

    if (!input || !btn || !farmerPosts.length) return;

    const search = () => {
        const term = input.value.toLowerCase();

        farmerPosts.forEach(post => {
            post.style.display = post.innerText
                .toLowerCase()
                .includes(term)
                ? "block"
                : "none";
        });
    };

    btn.addEventListener("click", search);
    input.addEventListener("keyup", e => e.key === "Enter" && search());
}

/* =========================================================
   READ POST / READ ARTICLE → MODAL (FINAL FIX)
   ========================================================= */
function initReadPostModal() {
    const modal = document.getElementById("articleModal");
    if (!modal) return;

    const modalTitle = document.getElementById("modalArticleTitle");
    const modalContent = document.getElementById("modalArticleContent");
    const modalImage = document.getElementById("modalPostImage");
    const modalAuthor = document.getElementById("modalAuthorName");
    const modalRole = document.getElementById("modalAuthorRole");
    const modalAuthorImg = document.getElementById("modalAuthorImg");
    const shareBtn = document.getElementById("modalShareBtn");
    const likeBtn = document.getElementById("modalLikeBtn");
    const likeCountEl = document.getElementById("modalLikeCount");
    const followBtn = modal.querySelector(".blog-modal-follow-btn");
    let sharePayload = {};
    let likeCount = 0;
    let liked = false;
    let isFollowing = false;

    const renderFollowState = () => {
        if (!followBtn) return;
        followBtn.textContent = isFollowing ? "Following" : "Follow";
        followBtn.classList.toggle("following", isFollowing);
        followBtn.setAttribute("aria-pressed", String(isFollowing));
    };

    document.querySelectorAll(".blog-read-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation();

            const card = btn.closest(".blog-post-card");
            const titleFromDom = card?.querySelector(".blog-post-title")?.textContent?.trim() || "Post";
            const contentFromDom = card?.querySelector(".blog-post-excerpt")?.textContent?.trim() || "";
            const authorFromDom = card?.querySelector(".blog-post-author h6")?.textContent?.trim() || "Author";
            const roleFromDom = card?.querySelector(".blog-post-author span")?.textContent?.trim() || "";
            const imageFromDom = card?.querySelector(".blog-post-image img")?.getAttribute("src") || "";

            const title = btn.dataset.title || titleFromDom;
            const contentText = btn.dataset.content || contentFromDom;

            modalTitle.textContent = title;
            modalContent.textContent = contentText;

            const imageToUse = btn.dataset.image || imageFromDom;
            if (imageToUse) {
                modalImage.src = imageToUse;
                modalImage.style.display = "block";
            } else {
                modalImage.style.display = "none";
            }

            modalAuthor.textContent = btn.dataset.author || authorFromDom;
            modalRole.textContent = btn.dataset.role || roleFromDom;
            modalAuthorImg.src =
                "https://randomuser.me/api/portraits/men/85.jpg";

            likeCount = parseInt(btn.dataset.likes || likeCountEl?.textContent || "0", 10) || 0;
            liked = false;
            if (likeCountEl) likeCountEl.textContent = likeCount;
            if (likeBtn) likeBtn.querySelector("i").className = "far fa-heart";

            isFollowing = false;
            renderFollowState();

            sharePayload = {
                title,
                text:
                    contentText.length > 160
                        ? `${contentText.substring(0, 157)}...`
                        : contentText,
                url: window.location.href
            };

            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    likeBtn?.addEventListener("click", () => {
        if (!likeCountEl) return;
        liked = !liked;
        likeCount += liked ? 1 : -1;
        likeCountEl.textContent = likeCount;
        likeBtn.querySelector("i").className = liked ? "fas fa-heart" : "far fa-heart";
    });

    followBtn?.addEventListener("click", () => {
        isFollowing = !isFollowing;
        renderFollowState();
    });

    shareBtn?.addEventListener("click", async () => {
        if (!sharePayload.title) return;

        const fallbackText = `${sharePayload.title}\n\n${sharePayload.text}\n${sharePayload.url}`;

        if (navigator.share) {
            try {
                await navigator.share(sharePayload);
                return;
            } catch (err) {
                // user cancelled or share failed; continue to fallback
            }
        }

        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(fallbackText);
                alert("Link copied. Share it anywhere!");
                return;
            } catch (err) {
                // clipboard failed; continue to alert
            }
        }

        alert("Sharing not supported on this browser. Copy this:\n\n" + fallbackText);
    });
}

/* ================= MODAL CLOSE ================= */
function initArticleModalClose() {
    const modal = document.getElementById("articleModal");
    if (!modal) return;

    modal.querySelector(".blog-modal-close").addEventListener("click", close);
    modal.addEventListener("click", e => e.target === modal && close);

    function close() {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

/* ================= NEWSLETTER ================= */
function initNewsletter() {
    document
        .querySelectorAll(".blog-newsletter-form, .blog-footer-newsletter")
        .forEach(form => {
            form.addEventListener("submit", e => {
                e.preventDefault();
                alert("Subscribed successfully!");
                form.reset();
            });
        });
}

/* ================= CREATE POST MODAL ================= */
function initCreatePost() {
    const modal = document.getElementById("createPostModal");
    if (!modal) return;

    const form = document.getElementById("createPostForms");
    const fileInput = document.getElementById("postImage");
    const preview = document.getElementById("imagePreview");
    const uploadLabelText = document.querySelector(".blog-file-upload-label span");

    const resetImagePreview = () => {
        if (!preview) return;
        preview.style.backgroundImage = "";
        preview.classList.remove("has-image");
        preview.innerHTML = "";
        if (uploadLabelText) uploadLabelText.textContent = "Upload Cover Image";
        if (fileInput) fileInput.value = "";
    };

    document.getElementById("headerCreateBtn")?.addEventListener("click", open);
    document.getElementById("sectionCreateBtn")?.addEventListener("click", open);
    document.getElementById("closeCreateModal")?.addEventListener("click", close);
    document.getElementById("closeCreateModalBtn")?.addEventListener("click", close);
    document.getElementById("cancelCreateBtn")?.addEventListener("click", close);

    modal.addEventListener("click", e => {
        if (e.target === modal) close();
    });

    fileInput?.addEventListener("change", () => {
        const file = fileInput.files?.[0];
        if (!file) {
            resetImagePreview();
            return;
        }
        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            resetImagePreview();
            return;
        }

        const reader = new FileReader();
        reader.onload = e => {
            if (!preview) return;
            preview.style.backgroundImage = `url('${e.target.result}')`;
            preview.classList.add("has-image");
            preview.innerHTML = "";
            if (uploadLabelText) uploadLabelText.textContent = file.name;
        };
        reader.readAsDataURL(file);
    });

    function open() {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function close() {
        modal.classList.remove("active");
        document.body.style.overflow = "";
        form?.reset();
        resetImagePreview();
    }
}

/* ================= EXPERT ARTICLES LOAD MORE ================= */
function initArticlesLoadMore() {
    const loadMoreBtn = document.getElementById("loadMoreArticlesBtn");
    const moreArticlesGrid = document.getElementById("moreArticlesGrid");

    if (!loadMoreBtn || !moreArticlesGrid) return;

    loadMoreBtn.addEventListener("click", () => {
        const isHidden = moreArticlesGrid.style.display === "none";
        moreArticlesGrid.style.display = isHidden ? "grid" : "none";
        loadMoreBtn.innerHTML = isHidden 
            ? 'Show Less Articles <i class="fas fa-arrow-up"></i>' 
            : 'Read More Articles <i class="fas fa-arrow-down"></i>';
    });
}