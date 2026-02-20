// JavaScript for Planado

// Gallery functionality
let images = [];
let updates = [];
let currentImageIndex = 0;
let currentUser = {
    name: "Alex Johnson",
    username: "@alexj",
    profilePic: "https://ui-avatars.com/api/?name=Alex+Johnson&background=4a6fa5&color=fff",
    bio: "Digital enthusiast and nature lover. Exploring the world one photo at a time.",
    location: "New York, USA",
    website: "https://alexjohnson.example.com",
    status: "Online"
};

// =================== SECTION MANAGEMENT ===================
let currentSection = 'home';

// Show Home Section (default)
function showHomeSection() {
    console.log("Loading Home Section");
    
    // Hide content container, show main
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('content-container').style.display = 'none';
    document.getElementById('content-container').innerHTML = '';
    
    currentSection = 'home';
    updateActiveNav('home');
}

// Show any other section
function showSection(sectionName) {
    console.log(`Loading ${sectionName} Section`);
    
    // Hide main, show content container
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('content-container').style.display = 'block';
    
    // Load section content
    let sectionContent = '';
    let iconName = sectionName;
    
    switch(sectionName) {
        case 'friends':
            sectionContent = `
                <div class="friends-stats">
                    <div class="stat-card">
                        <h3>12</h3>
                        <p>Total Friends</p>
                    </div>
                    <div class="stat-card">
                        <h3>8</h3>
                        <p>Online Now</p>
                    </div>
                    <div class="stat-card">
                        <h3>24</h3>
                        <p>Friend Requests</p>
                    </div>
                </div>
                <div class="friends-controls">
                    <input type="text" class="friends-search" placeholder="Search friends...">
                    <button class="add-friend-btn">
                        <i class="fas fa-user-plus"></i> Add Friend
                    </button>
                </div>
                <div class="friends-list">
                    <div class="friend-card">
                        <img src="https://ui-avatars.com/api/?name=Sam+Wilson&background=2ecc71&color=fff" 
                             alt="Friend" class="friend-pic">
                        <div class="friend-info">
                            <div class="friend-name">Sam Wilson</div>
                            <div class="friend-bio">Travel enthusiast and photographer</div>
                            <span class="friend-status">Online</span>
                        </div>
                        <div class="friend-actions">
                            <button class="friend-action-btn">
                                <i class="fas fa-comment"></i>
                            </button>
                            <button class="friend-action-btn">
                                <i class="fas fa-user-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="friend-card">
                        <img src="https://ui-avatars.com/api/?name=Taylor+Swift&background=e74c3c&color=fff" 
                             alt="Friend" class="friend-pic">
                        <div class="friend-info">
                            <div class="friend-name">Taylor Swift</div>
                            <div class="friend-bio">Music lover and songwriter</div>
                            <span class="friend-status offline">Offline</span>
                        </div>
                        <div class="friend-actions">
                            <button class="friend-action-btn">
                                <i class="fas fa-comment"></i>
                            </button>
                            <button class="friend-action-btn">
                                <i class="fas fa-user-minus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'search':
            sectionContent = `
                <div class="search-container">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Search for people, posts, or photos...">
                        <button><i class="fas fa-arrow-right"></i></button>
                    </div>
                    <div class="search-filters">
                        <button class="filter-btn active">All</button>
                        <button class="filter-btn">People</button>
                        <button class="filter-btn">Posts</button>
                        <button class="filter-btn">Photos</button>
                    </div>
                    <div class="search-results">
                        <div class="search-placeholder">
                            <i class="fas fa-search"></i>
                            <p>Enter a search term to find content</p>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'notifications':
            iconName = 'bell';
            sectionContent = `
                <div class="notifications-controls">
                    <button class="mark-all-read-btn">
                        <i class="fas fa-check-double"></i> Mark all as read
                    </button>
                    <select class="notifications-filter">
                        <option>All Notifications</option>
                        <option>Unread Only</option>
                    </select>
                </div>
                <div class="notifications-list">
                    <div class="notification-item unread">
                        <div class="notification-icon">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="notification-content">
                            <div class="notification-text">
                                <strong>Sam Wilson</strong> liked your photo
                            </div>
                            <div class="notification-time">5 minutes ago</div>
                        </div>
                        <div class="notification-actions">
                            <button class="action-btn">
                                <i class="fas fa-check"></i>
                            </button>
                        </div>
                    </div>
                    <div class="notification-item">
                        <div class="notification-icon">
                            <i class="fas fa-comment"></i>
                        </div>
                        <div class="notification-content">
                            <div class="notification-text">
                                <strong>Taylor Swift</strong> commented on your post
                            </div>
                            <div class="notification-time">2 hours ago</div>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'messages':
            iconName = 'envelope';
            sectionContent = `
                <div class="messages-controls">
                    <button class="new-message-btn">
                        <i class="fas fa-edit"></i> New Message
                    </button>
                </div>
                <div class="messages-container">
                    <div class="conversations-list">
                        <div class="conversation active">
                            <img src="https://ui-avatars.com/api/?name=Sam+Wilson&background=2ecc71&color=fff" 
                                 alt="User" class="conversation-pic">
                            <div class="conversation-info">
                                <div class="conversation-header">
                                    <div class="conversation-name">Sam Wilson</div>
                                    <div class="conversation-time">2 min ago</div>
                                </div>
                                <div class="conversation-preview">Hey! How are you doing?</div>
                            </div>
                            <span class="unread-count">3</span>
                        </div>
                    </div>
                    <div class="chat-area">
                        <div class="chat-header">
                            <div class="chat-user">
                                <img src="https://ui-avatars.com/api/?name=Sam+Wilson&background=2ecc71&color=fff" 
                                     alt="User" class="chat-pic">
                                <div>
                                    <div class="conversation-name">Sam Wilson</div>
                                    <div class="chat-status">Online</div>
                                </div>
                            </div>
                        </div>
                        <div class="chat-messages">
                            <div class="message received">
                                <div class="message-text">Hey! How are you doing?</div>
                                <div class="message-time">2:30 PM</div>
                            </div>
                        </div>
                        <div class="chat-input-area">
                            <input type="text" placeholder="Type a message...">
                            <button><i class="fas fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'gallery':
            iconName = 'images';
            sectionContent = `
                <div class="gallery-controls">
                    <button class="view-toggle active">
                        <i class="fas fa-th"></i> Grid
                    </button>
                    <button class="view-toggle">
                        <i class="fas fa-list"></i> List
                    </button>
                    <button class="sort-btn">
                        <i class="fas fa-sort-amount-down"></i> Sort
                    </button>
                </div>
                <div class="gallery">
                    <!-- Gallery will be populated by displayImages() -->
                </div>
            `;
            break;
        case 'settings':
            iconName = 'cog';
            sectionContent = `
                <div class="settings-container">
                    <div class="settings-sidebar">
                        <button class="settings-tab active" data-settings="profile">
                            <i class="fas fa-user"></i> Profile
                        </button>
                        <button class="settings-tab" data-settings="privacy">
                            <i class="fas fa-lock"></i> Privacy
                        </button>
                        <button class="settings-tab" data-settings="notifications">
                            <i class="fas fa-bell"></i> Notifications
                        </button>
                        <button class="settings-tab" data-settings="security">
                            <i class="fas fa-shield-alt"></i> Security
                        </button>
                    </div>
                    <div class="settings-content">
                        <div class="settings-tab-content active" id="profile-settings">
                            <h3><i class="fas fa-user"></i> Profile Settings</h3>
                            <form class="settings-form">
                                <div class="form-group">
                                    <label>Display Name</label>
                                    <input type="text" value="Alex Johnson">
                                </div>
                                <div class="form-group">
                                    <label>Email Address</label>
                                    <input type="email" value="alex@example.com">
                                </div>
                                <button type="submit" class="save-settings-btn">
                                    <i class="fas fa-save"></i> Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            break;
        default:
            sectionContent = '<h2>Section Not Found</h2>';
    }
    
    document.getElementById('content-container').innerHTML = `
        <div class="content-section">
            <div class="section-header">
                <h2><i class="fas fa-${iconName}"></i> ${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}</h2>
            </div>
            ${sectionContent}
        </div>
    `;
    
    currentSection = sectionName;
    updateActiveNav(sectionName);
}

// Update active navigation
function updateActiveNav(section) {
    // Remove active class from all nav items
    document.querySelectorAll('#sidebar nav ul li a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current section
    const activeLink = document.querySelector(`#sidebar nav ul li a[href="#${section}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// =================== SIDEBAR CONNECTION ===================
function setupSidebarNavigation() {
    console.log("Setting up sidebar navigation...");

    const sidebarLinks = document.querySelectorAll('#sidebar nav ul li a');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href') || '';

            // Keep SPA behavior for hash links, allow normal redirects for .html links
            if (href.startsWith('#')) {
                e.preventDefault();
                const section = href.substring(1);
                console.log(`Clicked on: ${section}`);

                if (section === 'home') {
                    showHomeSection();
                } else {
                    showSection(section);
                }
            }
        });
    });
}

// =================== CORE APP FUNCTIONS ===================
function applySavedThemePreference() {
    const savedPreference = localStorage.getItem('planadoThemePreference') || 'dark';
    const resolvedTheme = savedPreference === 'system'
        ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
        : savedPreference;

    document.body.setAttribute('data-theme', resolvedTheme);
}

function setupMobileSidebarToggle() {
    const headerControls = document.querySelector('.header-controls');
    const sidebar = document.getElementById('sidebar');
    if (!headerControls || !sidebar) return;

    let toggleBtn = document.getElementById('mobileMenuToggle');
    if (!toggleBtn) {
        toggleBtn = document.createElement('button');
        toggleBtn.id = 'mobileMenuToggle';
        toggleBtn.className = 'mobile-menu-toggle';
        toggleBtn.type = 'button';
        toggleBtn.setAttribute('aria-label', 'Open menu');
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        headerControls.insertBefore(toggleBtn, headerControls.firstChild);
    }

    let overlay = document.getElementById('mobileSidebarOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'mobileSidebarOverlay';
        overlay.className = 'mobile-sidebar-overlay';
        document.body.appendChild(overlay);
    }

    const closeMenu = () => document.body.classList.remove('sidebar-open');
    const toggleMenu = () => document.body.classList.toggle('sidebar-open');

    toggleBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    document.querySelectorAll('#sidebar nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

// Load data from localStorage
function loadData() {
    const savedImages = localStorage.getItem('planadoImages');
    const savedUpdates = localStorage.getItem('planadoUpdates');
    const savedUser = localStorage.getItem('planadoUser');
    
    if (savedImages) {
        images = JSON.parse(savedImages);
    }
    
    if (savedUpdates) {
        updates = JSON.parse(savedUpdates);
    }
    
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserProfile();
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('planadoImages', JSON.stringify(images));
    localStorage.setItem('planadoUpdates', JSON.stringify(updates));
    localStorage.setItem('planadoUser', JSON.stringify(currentUser));
}

// Initialize dummy data if none exists
function initializeDummyData() {
    if (images.length === 0) {
        const dummyImages = [
            {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                caption: 'Beautiful sunset at the beach. The colors were absolutely breathtaking!',
                date: '2 hours ago',
                author: {
                    name: "Alex Johnson",
                    profilePic: "https://ui-avatars.com/api/?name=Alex+Johnson&background=4a6fa5&color=fff"
                },
                likes: 42,
                likedBy: ["Alex Johnson", "Sam Wilson", "Taylor Swift", "Mike Ross", "Sarah Connor"],
                comments: [
                    {
                        text: 'Amazing view! Where was this taken?',
                        author: "Sam Wilson",
                        profilePic: "https://ui-avatars.com/api/?name=Sam+Wilson&background=2ecc71&color=fff",
                        date: '1 hour ago'
                    },
                    {
                        text: 'Wish I was there. This looks like paradise!',
                        author: "Taylor Swift",
                        profilePic: "https://ui-avatars.com/api/?name=Taylor+Swift&background=e74c3c&color=fff",
                        date: '45 minutes ago'
                    }
                ]
            },
            {
                src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                caption: 'City skyline at night. Never gets old.',
                date: 'Yesterday',
                author: {
                    name: "Sam Wilson",
                    profilePic: "https://ui-avatars.com/api/?name=Sam+Wilson&background=2ecc71&color=fff"
                },
                likes: 28,
                likedBy: ["Alex Johnson", "User Name", "Mike Ross"],
                comments: [
                    {
                        text: 'Stunning lights! Which city is this?',
                        author: "Alex Johnson",
                        profilePic: "https://ui-avatars.com/api/?name=Alex+Johnson&background=4a6fa5&color=fff",
                        date: 'Yesterday'
                    }
                ]
            },
            {
                src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                caption: 'Mountain hiking adventure with friends. What a journey!',
                date: '2 days ago',
                author: {
                    name: "Taylor Swift",
                    profilePic: "https://ui-avatars.com/api/?name=Taylor+Swift&background=e74c3c&color=fff"
                },
                likes: 56,
                likedBy: ["Alex Johnson", "Sam Wilson", "User Name", "John Doe", "Mike Ross", "Sarah Connor"],
                comments: [
                    {
                        text: 'Looks challenging! How long was the hike?',
                        author: "Alex Johnson",
                        profilePic: "https://ui-avatars.com/api/?name=Alex+Johnson&background=4a6fa5&color=fff",
                        date: '2 days ago'
                    },
                    {
                        text: 'Great shot. The view must have been worth it!',
                        author: "User Name",
                        profilePic: "https://ui-avatars.com/api/?name=Alex+Johnson&background=4a6fa5&color=fff",
                        date: '1 day ago'
                    }
                ]
            }
        ];
        
        images = dummyImages;
    }
    
    if (updates.length === 0) {
        const dummyUpdates = [
            {
                text: "Just got back from an amazing trip to the mountains! The fresh air and breathtaking views were exactly what I needed. Can't wait to share all the photos!",
                author: {
                    name: "Alex Johnson",
                    profilePic: "https://ui-avatars.com/api/?name=Alex+Johnson&background=4a6fa5&color=fff"
                },
                date: '4 hours ago',
                likes: 12,
                comments: 3
            },
            {
                text: "Working on a new project. Can't wait to share it with everyone next week! It's been months of hard work but finally coming together.",
                author: {
                    name: "Sam Wilson",
                    profilePic: "https://ui-avatars.com/api/?name=Sam+Wilson&background=2ecc71&color=fff"
                },
                date: 'Yesterday',
                likes: 8,
                comments: 1
            },
            {
                text: "Happy Friday everyone! What are your plans for the weekend? I'm thinking of trying that new restaurant downtown.",
                author: {
                    name: "Taylor Swift",
                    profilePic: "https://ui-avatars.com/api/?name=Taylor+Swift&background=e74c3c&color=fff"
                },
                date: '2 days ago',
                likes: 15,
                comments: 5
            }
        ];
        
        updates = dummyUpdates;
    }
}

// Update user profile display
function updateUserProfile() {
    document.getElementById('username').textContent = currentUser.name;
    document.getElementById('profile-pic').src = currentUser.profilePic;
    document.getElementById('modal-profile-name').textContent = currentUser.name;
    
    // Update all profile pictures for the current user
    document.querySelectorAll('.comment-profile-pic, .post-user-pic, .author-picture, .profile-main-pic').forEach(img => {
        if (img.id !== 'modal-author-pic') {
            img.src = currentUser.profilePic;
        }
    });
    
    // Update post user name
    const postUserName = document.querySelector('.post-user-name');
    if (postUserName) postUserName.textContent = currentUser.name;
    
    // Update mini profile in sidebar
    const miniUsername = document.querySelector('.mini-username');
    const miniProfilePic = document.querySelector('.mini-profile-pic');
    if (miniUsername) miniUsername.textContent = currentUser.name;
    if (miniProfilePic) miniProfilePic.src = currentUser.profilePic;
}

// Display updates in feed
function displayUpdates() {
    const updatesFeed = document.getElementById('updates-feed');
    if (!updatesFeed) return;
    
    updatesFeed.innerHTML = '';
    
    updates.forEach((update, index) => {
        const updateDiv = document.createElement('div');
        updateDiv.className = 'update';
        updateDiv.innerHTML = `
            <div class="update-header">
                <img src="${update.author.profilePic}" alt="${update.author.name}" class="update-profile-pic">
                <div>
                    <div class="update-author">${update.author.name}</div>
                    <div class="update-date">${update.date}</div>
                </div>
            </div>
            <p>${update.text}</p>
            <div class="update-footer">
                <button class="update-like-btn" data-index="${index}">
                    <i class="far fa-heart"></i> ${update.likes}
                </button>
                <span class="update-comments">
                    <i class="far fa-comment"></i> ${update.comments} comments
                </span>
            </div>
        `;
        updatesFeed.appendChild(updateDiv);
    });
    
    // Add event listeners for update likes
    document.querySelectorAll('.update-like-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            updates[index].likes += 1;
            this.innerHTML = `<i class="fas fa-heart"></i> ${updates[index].likes}`;
            this.style.color = '#e74c3c';
            saveData();
        });
    });
}

// Display images in gallery
function displayImages() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    images.forEach((image, index) => {
        const imagePost = document.createElement('div');
        imagePost.className = 'image-post';
        imagePost.innerHTML = `
            <img src="${image.src}" alt="${image.caption}" data-index="${index}">
            <div class="image-post-content">
                <div class="image-post-header">
                    <img src="${image.author.profilePic}" alt="${image.author.name}" class="author-profile-pic">
                    <span class="author-name">${image.author.name}</span>
                </div>
                <p class="image-caption-preview">${image.caption.substring(0, 30)}${image.caption.length > 30 ? '...' : ''}</p>
                <div class="image-post-footer">
                    <div class="image-post-likes">
                        <i class="fas fa-heart"></i> ${image.likes}
                    </div>
                    <div class="image-post-comments">
                        <i class="fas fa-comment"></i> ${image.comments.length}
                    </div>
                </div>
            </div>
        `;
        gallery.appendChild(imagePost);
    });

    // Add click event to images
    document.querySelectorAll('.image-post img').forEach(img => {
        img.addEventListener('click', function() {
            currentImageIndex = parseInt(this.dataset.index);
            openModal(images[currentImageIndex]);
        });
    });
}

// Modal functionality
function openModal(image) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const modalDate = document.getElementById('modal-date');
    const modalAuthorName = document.getElementById('modal-author-name');
    const modalAuthorPic = document.getElementById('modal-author-pic');
    const likeBtn = document.getElementById('like-btn');
    const likeCount = document.getElementById('like-count');
    const commentCount = document.getElementById('comment-count');
    const likedByList = document.getElementById('liked-by-list');

    modalImage.src = image.src;
    modalCaption.textContent = image.caption;
    modalDate.textContent = image.date;
    modalAuthorName.textContent = image.author.name;
    modalAuthorPic.src = image.author.profilePic;
    
    // Update like button state
    const hasLiked = image.likedBy.includes(currentUser.name);
    likeBtn.innerHTML = hasLiked ? 
        '<i class="fas fa-heart"></i><span>Unlike</span>' : 
        '<i class="far fa-heart"></i><span>Like</span>';
    likeBtn.classList.toggle('liked', hasLiked);
    
    likeCount.textContent = image.likes;
    commentCount.textContent = image.comments.length;
    
    // Update liked by list
    likedByList.textContent = image.likedBy.slice(0, 3).join(', ');
    if (image.likedBy.length > 3) {
        likedByList.textContent += ` and ${image.likedBy.length - 3} more`;
    }

    displayComments(image.comments);
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('image-modal').style.display = 'none';
}

// Comment functionality with profiles
function displayComments(comments) {
    const commentsList = document.getElementById('comments-list');
    if (!commentsList) return;
    
    commentsList.innerHTML = '';
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<p style="color: #aaa; text-align: center; padding: 20px;">No comments yet. Be the first to comment!</p>';
        return;
    }
    
    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `
            <img src="${comment.profilePic}" alt="${comment.author}" class="comment-profile-pic">
            <div class="comment-content">
                <span class="comment-author">${comment.author}</span>
                <p class="comment-text">${comment.text}</p>
                <small class="comment-date">${comment.date}</small>
            </div>
        `;
        commentsList.appendChild(commentDiv);
    });
    
    // Scroll to bottom of comments
    commentsList.scrollTop = commentsList.scrollHeight;
}

// =================== POST MODAL FUNCTIONALITY ===================

// Post Modal Tab Functionality
function setupPostModalTabs() {
    document.querySelectorAll('.post-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Update active tab
            document.querySelectorAll('.post-tab').forEach(t => {
                t.classList.remove('active');
            });
            this.classList.add('active');
            
            // Show corresponding form
            document.querySelectorAll('.post-form').forEach(form => {
                form.classList.remove('active');
            });
            document.querySelector(`.post-form[data-form="${tabName}"]`).classList.add('active');
            
            // Reset character counters
            if (tabName === 'update') {
                updateCharCount('modal-update-text', 'char-count');
            } else if (tabName === 'photo') {
                updateCharCount('modal-image-caption', 'caption-count');
            }
        });
    });
}

// Character Count for Textareas
function updateCharCount(textareaId, counterId) {
    const textarea = document.getElementById(textareaId);
    const counter = document.querySelector(`.${counterId}`);
    
    if (textarea && counter) {
        const maxLength = textareaId === 'modal-update-text' ? 500 : 300;
        
        textarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            counter.textContent = `${currentLength}/${maxLength}`;
            
            if (currentLength > maxLength * 0.9) {
                counter.style.color = '#e74c3c';
            } else if (currentLength > maxLength * 0.75) {
                counter.style.color = '#f39c12';
            } else {
                counter.style.color = '#888';
            }
        });
        
        // Initialize counter
        const currentLength = textarea.value.length;
        counter.textContent = `${currentLength}/${maxLength}`;
    }
}

// Image Upload Functionality
function initializeImageUpload() {
    const imageUpload = document.getElementById('modal-image-upload');
    const uploadContainer = document.getElementById('upload-container');
    const imagePreviews = document.getElementById('image-previews');
    const browseBtn = document.querySelector('.upload-browse-btn');
    
    if (!imageUpload || !uploadContainer || !imagePreviews || !browseBtn) {
        console.log('Some upload elements not found, retrying...');
        // Try again after a short delay
        setTimeout(initializeImageUpload, 100);
        return;
    }
    
    console.log('Initializing image upload functionality...');
    
    // Clear previous previews before adding new ones
    imageUpload.addEventListener('change', function(e) {
        console.log('File input changed, files:', e.target.files.length);
        handleFiles(e.target.files);
    });
    
    // Drag and drop functionality
    uploadContainer.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadContainer.classList.add('drag-over');
    });
    
    uploadContainer.addEventListener('dragleave', function() {
        uploadContainer.classList.remove('drag-over');
    });
    
    uploadContainer.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadContainer.classList.remove('drag-over');
        handleFiles(e.dataTransfer.files);
    });
    
    // Browse button functionality
    browseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        imageUpload.click();
    });
    
    function handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            // Validate file type
            if (!file.type.match('image.*')) {
                alert('Please select only image files.');
                continue;
            }
            
            // Validate file size (10MB = 10 * 1024 * 1024 bytes)
            if (file.size > 10 * 1024 * 1024) {
                alert(`File ${file.name} exceeds 10MB limit.`);
                continue;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                createPreviewItem(e.target.result, file.name);
            };
            
            reader.onerror = function(e) {
                console.error('Error reading file:', e);
                alert('Error reading file: ' + file.name);
            };
            
            reader.readAsDataURL(file);
        }
    }
    
    function createPreviewItem(imageSrc, fileName) {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = fileName;
        img.className = 'preview-image';
        
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = 'Ã—';
        removeBtn.title = 'Remove image';
        
        // Remove the preview item when clicked
        removeBtn.addEventListener('click', function() {
            previewItem.remove();
        });
        
        previewItem.appendChild(img);
        previewItem.appendChild(removeBtn);
        
        // Append the new preview item to the container
        imagePreviews.appendChild(previewItem);
    }
}

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// =================== EVENT LISTENER SETUP ===================

function setupEventListeners() {
    // Post button
    document.getElementById('post-btn').addEventListener('click', function() {
        document.getElementById('post-modal').style.display = 'block';
        
        // Initialize counters when modal opens
        setTimeout(() => {
            updateCharCount('modal-update-text', 'char-count');
            updateCharCount('modal-image-caption', 'caption-count');
        }, 100);
        
        // Re-initialize image upload when modal opens
        setTimeout(initializeImageUpload, 100);
    });
    
    // Image modal like functionality
    document.getElementById('like-btn').addEventListener('click', function() {
        const image = images[currentImageIndex];
        const hasLiked = image.likedBy.includes(currentUser.name);
        
        if (hasLiked) {
            // Unlike
            image.likes -= 1;
            image.likedBy = image.likedBy.filter(name => name !== currentUser.name);
            this.innerHTML = '<i class="far fa-heart"></i><span>Like</span>';
            this.classList.remove('liked');
        } else {
            // Like
            image.likes += 1;
            image.likedBy.push(currentUser.name);
            this.innerHTML = '<i class="fas fa-heart"></i><span>Unlike</span>';
            this.classList.add('liked');
        }
        
        document.getElementById('like-count').textContent = image.likes;
        
        // Update liked by list
        const likedByList = document.getElementById('liked-by-list');
        likedByList.textContent = image.likedBy.slice(0, 3).join(', ');
        if (image.likedBy.length > 3) {
            likedByList.textContent += ` and ${image.likedBy.length - 3} more`;
        }
        
        // Update gallery display
        displayImages();
        saveData();
    });
    
    // Comment functionality
    document.getElementById('comment-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const commentInput = document.getElementById('comment-input');
        const commentText = commentInput.value.trim();
        
        if (commentText) {
            const newComment = {
                text: commentText,
                author: currentUser.name,
                profilePic: currentUser.profilePic,
                date: 'Just now'
            };
            
            images[currentImageIndex].comments.push(newComment);
            displayComments(images[currentImageIndex].comments);
            commentInput.value = '';
            
            // Update comment count
            document.getElementById('comment-count').textContent = images[currentImageIndex].comments.length;
            
            // Update gallery to show comment count
            displayImages();
            saveData();
        }
    });
    
    // Profile functionality
    document.getElementById('user-profile').addEventListener('click', function() {
        document.getElementById('profile-modal').style.display = 'block';
        document.getElementById('profile-name').value = currentUser.name;
        document.getElementById('profile-username').value = currentUser.username;
        document.getElementById('profile-bio').value = currentUser.bio;
        document.getElementById('profile-location').value = currentUser.location;
        document.getElementById('profile-website').value = currentUser.website;
        document.getElementById('modal-profile-pic').src = currentUser.profilePic;
    });
    
    document.getElementById('profile-close').addEventListener('click', function() {
        document.getElementById('profile-modal').style.display = 'none';
    });
    
    document.getElementById('change-profile-pic').addEventListener('click', function() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        
        fileInput.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    currentUser.profilePic = e.target.result;
                    updateUserProfile();
                    document.getElementById('modal-profile-pic').src = currentUser.profilePic;
                    saveData();
                };
                reader.readAsDataURL(file);
            }
        };
        
        fileInput.click();
    });
    
    document.getElementById('profile-form').addEventListener('submit', function(e) {
        e.preventDefault();
        currentUser.name = document.getElementById('profile-name').value;
        currentUser.username = document.getElementById('profile-username').value;
        currentUser.bio = document.getElementById('profile-bio').value;
        currentUser.location = document.getElementById('profile-location').value;
        currentUser.website = document.getElementById('profile-website').value;
        
        updateUserProfile();
        document.getElementById('profile-modal').style.display = 'none';
        saveData();
    });
    
    // Feature buttons functionality
    document.querySelectorAll('.feature-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const feature = this.dataset.feature;
            alert(`Feature: ${feature} would be implemented here`);
        });
    });
    
    // Photo option buttons
    document.querySelectorAll('.photo-option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            alert(`${action} feature would be implemented here`);
        });
    });
    
    // Form submissions
    document.getElementById('modal-update-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const updateText = document.getElementById('modal-update-text').value;
        
        if (updateText.trim()) {
            // Create and display the update
            const newUpdate = {
                text: updateText,
                author: {
                    name: currentUser.name,
                    profilePic: currentUser.profilePic
                },
                date: 'Just now',
                likes: 0,
                comments: 0
            };
            
            // Add to updates array
            updates.unshift(newUpdate);
            displayUpdates();
            
            // Reset form
            document.getElementById('modal-update-text').value = '';
            const charCount = document.querySelector('.char-count');
            if (charCount) charCount.textContent = '0/500';
            
            // Close modal
            document.getElementById('post-modal').style.display = 'none';
            
            // Show success message
            showNotification('Post published successfully!');
            
            // Save data
            saveData();
        }
    });
    
    // Upload form submission
    document.getElementById('modal-upload-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const captionInput = document.getElementById('modal-image-caption');
        const caption = captionInput.value || "Untitled";
        const previews = document.querySelectorAll('.preview-item img');
        
        if (previews.length === 0) {
            alert('Please select at least one image to upload.');
            return;
        }
        
        // For demo purposes, use the first preview image
        const imageSrc = previews[0].src;
        
        const imageData = {
            src: imageSrc,
            caption: caption,
            date: 'Just now',
            author: {
                name: currentUser.name,
                profilePic: currentUser.profilePic
            },
            likes: 0,
            likedBy: [],
            comments: []
        };
        
        // Add to images array
        images.unshift(imageData);
        displayImages();
        
        // Reset form
        captionInput.value = '';
        const captionCount = document.querySelector('.caption-count');
        if (captionCount) captionCount.textContent = '0/300';
        const previewContainer = document.getElementById('image-previews');
        if (previewContainer) previewContainer.innerHTML = '';
        const uploadInput = document.getElementById('modal-image-upload');
        if (uploadInput) uploadInput.value = '';
        
        // Close modal
        document.getElementById('post-modal').style.display = 'none';
        
        // Show success message
        showNotification('Photos uploaded successfully!');
        
        // Save data
        saveData();
    });
    
    // Close buttons
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close post modal
    document.getElementById('post-close').addEventListener('click', function() {
        document.getElementById('post-modal').style.display = 'none';
    });
    
    // View toggle functionality
    document.querySelectorAll('.view-toggle').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.view-toggle').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Change gallery layout
            const gallery = document.getElementById('gallery');
            if (this.textContent.includes('List')) {
                gallery.style.gridTemplateColumns = '1fr';
            } else {
                gallery.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
            }
        });
    });
    
    // Refresh button
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
                displayUpdates();
                displayImages();
            }, 1000);
        });
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to log out?')) {
                // Clear authentication data
                if (typeof auth !== 'undefined') {
                    auth.logout();
                }
                // Clear local storage
                localStorage.removeItem('planadoCurrentUser');
                // Redirect to login page
                window.location.href = 'login.html';
            }
        });
    }
    
    // Click outside to close modals
    window.addEventListener('click', function(event) {
        const imageModal = document.getElementById('image-modal');
        const postModal = document.getElementById('post-modal');
        const profileModal = document.getElementById('profile-modal');
        
        if (event.target === imageModal) closeModal();
        if (event.target === postModal) postModal.style.display = 'none';
        if (event.target === profileModal) profileModal.style.display = 'none';
    });
    
    // Close modals with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.getElementById('post-modal').style.display = 'none';
            document.getElementById('profile-modal').style.display = 'none';
        }
    });
    
    // Save data before page unload
    window.addEventListener('beforeunload', saveData);
}

// =================== INITIALIZE APP ===================

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Planado App Initializing...');

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch((error) => {
            console.warn('Service Worker registration failed:', error);
        });
    }

    // Apply persisted appearance setting first
    applySavedThemePreference();
    setupMobileSidebarToggle();
    
    // Load user data from localStorage
    loadData();
    
    // Initialize data
    initializeDummyData();
    updateUserProfile();
    
    // Setup sidebar navigation
    setupSidebarNavigation();
    
    // Setup post modal tabs
    setupPostModalTabs();
    
    // Setup all event listeners
    setupEventListeners();
    
    // Display initial content (Home section)
    displayUpdates();
    displayImages();
    
    // Initialize image upload functionality
    setTimeout(initializeImageUpload, 500);
    
    // Set active nav item
    const homeLink = document.querySelector('#sidebar a[href="index.html"], #sidebar a[href="#home"]');
    if (homeLink) homeLink.classList.add('active');
    
    console.log('Planado App Initialized!');
});



