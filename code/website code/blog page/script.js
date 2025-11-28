// Sample blog posts data with authors and engagement metrics
const blogPosts = [
    {
        id: 1,
        title: "Best Practices for Crop Rotation in Indian Agriculture",
        category: "Crop Planning",
        date: "2023-10-15",
        excerpt: "Learn how proper crop rotation can improve soil health, reduce pests, and increase yields for small-scale farmers.",
        author: {
            name: "Dr. Priya Sharma",
            role: "Agronomist",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        image: "https://images.unsplash.com/photo-1592982537447-7448a4615bd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        likes: 142,
        shares: 28,
        comments: 19,
        views: 1250,
        readTime: "5 min read",
        isPopular: true
    },
    {
        id: 2,
        title: "Optimizing Fertilizer Use for Maximum Yield",
        category: "Fertilizer",
        date: "2023-10-10",
        excerpt: "Discover how our AI system calculates the perfect fertilizer mix for your specific soil conditions and crop type.",
        author: {
            name: "Rajesh Patel",
            role: "Soil Scientist",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        image: "https://images.unsplash.com/photo-1586771107445-d3ca888129fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        likes: 98,
        shares: 15,
        comments: 12,
        views: 890,
        readTime: "6 min read",
        isPopular: true
    },
    {
        id: 3,
        title: "Identifying Common Pest Infestations in Wheat Crops",
        category: "Pest Management",
        date: "2023-10-05",
        excerpt: "Early detection is key to preventing crop damage. Learn to identify signs of common wheat pests.",
        author: {
            name: "Dr. Anjali Singh",
            role: "Entomologist",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        image: "https://images.unsplash.com/photo-1610041321325-9d5f2c63b665?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        likes: 76,
        shares: 22,
        comments: 8,
        views: 720,
        readTime: "4 min read",
        isPopular: false
    },
    {
        id: 4,
        title: "How Weather Forecasts Can Improve Farming Decisions",
        category: "Weather",
        date: "2023-09-28",
        excerpt: "Using accurate weather data to plan irrigation, harvesting, and other critical farming activities.",
        author: {
            name: "Mohan Das",
            role: "Meteorologist",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        likes: 115,
        shares: 31,
        comments: 14,
        views: 980,
        readTime: "7 min read",
        isPopular: true
    },
    {
        id: 5,
        title: "AI-Powered Soil Analysis for Better Crop Selection",
        category: "AI in Agriculture",
        date: "2023-09-22",
        excerpt: "Our system analyzes soil samples to recommend the most suitable crops for your land.",
        author: {
            name: "Dr. Kumar",
            role: "AI Specialist",
            avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        likes: 89,
        shares: 18,
        comments: 11,
        views: 810,
        readTime: "5 min read",
        isPopular: false
    },
    {
        id: 6,
        title: "Farmer Success Story: Doubling Yield with SCAS",
        category: "Success Stories",
        date: "2023-09-15",
        excerpt: "Read how a marginal farmer from Punjab increased his income using our advisory system.",
        author: {
            name: "Harpreet Singh",
            role: "Farmer & Contributor",
            avatar: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        likes: 167,
        shares: 45,
        comments: 23,
        views: 1420,
        readTime: "8 min read",
        isPopular: true
    },
    {
        id: 7,
        title: "Water Conservation Techniques for Sustainable Farming",
        category: "Sustainable Agriculture",
        date: "2023-09-10",
        excerpt: "Practical methods to reduce water usage while maintaining healthy crop growth.",
        author: {
            name: "Dr. Meera Iyer",
            role: "Water Management Expert",
            avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        image: "https://images.unsplash.com/photo-1569336415961-5d176ce66e85?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        likes: 94,
        shares: 26,
        comments: 15,
        views: 760,
        readTime: "6 min read",
        isPopular: false
    },
    {
        id: 8,
        title: "Understanding Soil pH and Its Impact on Crop Health",
        category: "Crop Planning",
        date: "2023-09-05",
        excerpt: "How to test and adjust soil pH for optimal plant growth and nutrient absorption.",
        author: {
            name: "Dr. Arjun Reddy",
            role: "Soil Chemist",
            avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        likes: 81,
        shares: 14,
        comments: 9,
        views: 690,
        readTime: "4 min read",
        isPopular: false
    },
    {
        id: 9,
        title: "Natural Pest Control Methods for Organic Farming",
        category: "Pest Management",
        date: "2023-08-28",
        excerpt: "Environmentally friendly approaches to managing pests without chemical pesticides.",
        author: {
            name: "Neha Gupta",
            role: "Organic Farming Expert",
            avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        likes: 123,
        shares: 33,
        comments: 17,
        views: 1050,
        readTime: "5 min read",
        isPopular: false
    },
    {
        id: 10,
        title: "The Future of Precision Agriculture in India",
        category: "AI in Agriculture",
        date: "2023-08-20",
        excerpt: "How technology is transforming traditional farming practices for better efficiency.",
        author: {
            name: "Dr. Sanjay Verma",
            role: "Agricultural Technologist",
            avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        likes: 156,
        shares: 42,
        comments: 28,
        views: 1320,
        readTime: "7 min read",
        isPopular: true
    }
];

// Utility function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Function to render blog posts dynamically
function renderPosts(posts) {
    const postsGrid = document.getElementById('postsGrid');
    const noPostsMessage = document.getElementById('noPostsMessage');
    
    // Clear existing posts
    postsGrid.innerHTML = '';
    
    // Show no posts message if no posts found
    if (posts.length === 0) {
        noPostsMessage.style.display = 'block';
        return;
    }
    
    noPostsMessage.style.display = 'none';
    
    // Render each post
    posts.forEach(post => {
        const postCard = document.createElement('article');
        postCard.className = 'post-card';
        
        postCard.innerHTML = `
            <div class="post-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="post-content">
                <div class="post-author">
                    <img src="${post.author.avatar}" alt="${post.author.name}" class="post-author-avatar">
                    <div class="post-author-info">
                        <h4>${post.author.name}</h4>
                        <p>${post.author.role}</p>
                    </div>
                    <button class="post-follow-btn">Follow</button>
                </div>
                <span class="post-category">${post.category}</span>
                <h3 class="post-title">${post.title}</h3>
                <div class="post-date">
                    <i class="far fa-calendar"></i>
                    ${formatDate(post.date)} • ${post.readTime}
                </div>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-actions">
                    <a href="#" class="post-read-more">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                    <div class="social-actions">
                        <button class="social-btn like-btn" data-post="${post.id}">
                            <i class="far fa-heart"></i> ${post.likes}
                        </button>
                        <button class="social-btn share-btn" data-post="${post.id}">
                            <i class="far fa-share-square"></i> ${post.shares}
                        </button>
                        <button class="social-btn comment-btn" data-post="${post.id}">
                            <i class="far fa-comment"></i> ${post.comments}
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        postsGrid.appendChild(postCard);
    });
    
    // Add event listeners for social actions
    addSocialActionListeners();
}

// Function to add event listeners for like, share, comment buttons
function addSocialActionListeners() {
    // Like button functionality
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = this.getAttribute('data-post');
            this.classList.toggle('liked');
            const icon = this.querySelector('i');
            const currentCount = parseInt(this.textContent.match(/\d+/)[0]);
            
            if (this.classList.contains('liked')) {
                icon.className = 'fas fa-heart';
                this.innerHTML = `<i class="fas fa-heart"></i> ${currentCount + 1}`;
            } else {
                icon.className = 'far fa-heart';
                this.innerHTML = `<i class="far fa-heart"></i> ${currentCount - 1}`;
            }
        });
    });
    
    // Share button functionality
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = this.getAttribute('data-post');
            const post = blogPosts.find(p => p.id == postId);
            
            // Simple share simulation
            alert(`Sharing: "${post.title}"\n\nShare this article with other farmers!`);
            
            // Update share count
            const currentCount = parseInt(this.textContent.match(/\d+/)[0]);
            this.innerHTML = `<i class="far fa-share-square"></i> ${currentCount + 1}`;
        });
    });
    
    // Comment button functionality
    document.querySelectorAll('.comment-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = this.getAttribute('data-post');
            const comment = prompt('Add your comment:');
            if (comment) {
                alert('Thank you for your comment!');
                const currentCount = parseInt(this.textContent.match(/\d+/)[0]);
                this.innerHTML = `<i class="far fa-comment"></i> ${currentCount + 1}`;
            }
        });
    });
    
    // Follow button functionality
    document.querySelectorAll('.post-follow-btn, .follow-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent.includes('Follow')) {
                this.innerHTML = '<i class="fas fa-check"></i> Following';
                this.style.background = 'var(--text-gray)';
            } else {
                this.innerHTML = '<i class="fas fa-plus"></i> Follow';
                this.style.background = '';
            }
        });
    });
}

// Function to render categories dynamically
function renderCategories() {
    const categoryList = document.getElementById('categoryList');
    
    // Get unique categories and count posts in each
    const categories = {};
    blogPosts.forEach(post => {
        if (categories[post.category]) {
            categories[post.category]++;
        } else {
            categories[post.category] = 1;
        }
    });
    
    // Create "All" category
    const allItem = document.createElement('li');
    allItem.innerHTML = `
        <a href="#" class="category-filter active" data-category="all">
            All Categories
            <span class="category-count">${blogPosts.length}</span>
        </a>
    `;
    categoryList.appendChild(allItem);
    
    // Create category items
    for (const category in categories) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <a href="#" class="category-filter" data-category="${category}">
                ${category}
                <span class="category-count">${categories[category]}</span>
            </a>
        `;
        categoryList.appendChild(listItem);
    }
}

// Function to render popular posts
function renderPopularPosts() {
    const popularPostsContainer = document.getElementById('popularPosts');
    
    // Filter popular posts
    const popularPosts = blogPosts.filter(post => post.isPopular);
    
    // Render each popular post
    popularPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'popular-post';
        
        postElement.innerHTML = `
            <div class="popular-post-content">
                <h4 class="popular-post-title">${post.title}</h4>
                <div class="popular-post-date">
                    <i class="far fa-calendar"></i>
                    ${formatDate(post.date)}
                </div>
            </div>
        `;
        
        popularPostsContainer.appendChild(postElement);
    });
}

// Function to filter posts by category
function filterByCategory(category) {
    if (category === 'all') {
        return blogPosts;
    }
    return blogPosts.filter(post => post.category === category);
}

// Function to search posts by title, excerpt, or category
function searchPosts(query) {
    if (!query) {
        return blogPosts;
    }
    
    const lowerCaseQuery = query.toLowerCase();
    return blogPosts.filter(post => 
        post.title.toLowerCase().includes(lowerCaseQuery) || 
        post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
        post.category.toLowerCase().includes(lowerCaseQuery) ||
        post.author.name.toLowerCase().includes(lowerCaseQuery)
    );
}

// Function to filter by quick filters
function filterByQuickFilter(filter) {
    if (filter === 'all') return blogPosts;
    
    const filterMap = {
        'crop': ['Crop Planning', 'Sustainable Agriculture'],
        'pest': ['Pest Management'],
        'weather': ['Weather'],
        'tech': ['AI in Agriculture']
    };
    
    return blogPosts.filter(post => 
        filterMap[filter].includes(post.category)
    );
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Render initial content
    renderPosts(blogPosts);
    renderCategories();
    renderPopularPosts();
    
    // Set up category filter event listeners
    const categoryFilters = document.querySelectorAll('.category-filter');
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all filters
            categoryFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Get category to filter by
            const category = this.getAttribute('data-category');
            
            // Filter and render posts
            const filteredPosts = filterByCategory(category);
            renderPosts(filteredPosts);
        });
    });
    
    // Set up search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    const performSearch = () => {
        const query = searchInput.value;
        const searchedPosts = searchPosts(query);
        renderPosts(searchedPosts);
    };
    
    searchInput.addEventListener('input', performSearch);
    searchBtn.addEventListener('click', performSearch);
    
    // Quick filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const filteredPosts = filterByQuickFilter(filter);
            renderPosts(filteredPosts);
        });
    });
    
    // Mobile menu toggle functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Popular posts toggle functionality
    const popularPostsToggle = document.getElementById('popularPostsToggle');
    const popularPostsContent = document.getElementById('popularPostsContent');
    
    popularPostsToggle.addEventListener('click', function() {
        popularPostsContent.classList.toggle('collapsed');
        this.textContent = popularPostsContent.classList.contains('collapsed') ? '+' : '−';
    });
    
    // Categories toggle functionality
    const categoriesToggle = document.getElementById('categoriesToggle');
    const categoriesContent = document.getElementById('categoriesContent');
    
    categoriesToggle.addEventListener('click', function() {
        categoriesContent.classList.toggle('collapsed');
        this.textContent = categoriesContent.classList.contains('collapsed') ? '+' : '−';
    });
    
    // View options (grid/list)
    const viewOptions = document.querySelectorAll('.view-option');
    const postsGrid = document.getElementById('postsGrid');
    
    viewOptions.forEach(option => {
        option.addEventListener('click', function() {
            viewOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.getAttribute('data-view');
            if (view === 'list') {
                postsGrid.classList.add('list-view');
            } else {
                postsGrid.classList.remove('list-view');
            }
        });
    });
    
    // Newsletter subscription
    const subscribeBtn = document.querySelector('.subscribe-btn');
    subscribeBtn.addEventListener('click', function() {
        const emailInput = this.parentElement.querySelector('input');
        if (emailInput.value) {
            alert('Thank you for subscribing to our farming insights!');
            emailInput.value = '';
        } else {
            alert('Please enter your email address.');
        }
    });
});