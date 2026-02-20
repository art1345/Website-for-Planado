// Gallery Section
const GallerySection = {
    galleryImages: [],
    currentView: 'grid',
    currentSort: 'newest',

    load: function() {
        const container = document.getElementById('content-container');
        container.innerHTML = `
            <section class="content-section">
                <div class="section-header">
                    <h2><i class="fas fa-images"></i> Gallery</h2>
                    <div class="gallery-controls">
                        <button class="attach-btn" id="attachPhotoBtn">
                            <i class="fas fa-paperclip"></i> Attach Photo
                        </button>
                        <input type="file" id="galleryAttachInput" accept="image/*" multiple hidden>
                        <button class="view-toggle active" data-view="grid">
                            <i class="fas fa-th"></i> Grid
                        </button>
                        <button class="view-toggle" data-view="list">
                            <i class="fas fa-list"></i> List
                        </button>
                        <select class="sort-select" id="sortSelect">
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="popular">Most Popular</option>
                        </select>
                    </div>
                </div>
                <div id="galleryGrid" class="gallery"></div>
            </section>
        `;
        
        this.loadGallery();
        this.setupEventListeners();
    },
    
    loadGallery: function() {
        const savedImages = localStorage.getItem('planadoImages');
        const rawImages = savedImages ? JSON.parse(savedImages) : [];

        this.galleryImages = rawImages.map((image, index) => ({
            id: image.id || index + 1,
            src: image.src || '',
            caption: image.caption || 'Untitled post',
            likes: Number(image.likes || 0),
            comments: Array.isArray(image.comments) ? image.comments.length : Number(image.comments || 0),
            date: image.date || 'Just now',
            author: image.author?.name || image.author || 'Unknown',
            createdAt: Number(image.createdAt || 0) || (Date.now() - index)
        })).filter(image => image.src);

        this.renderGallery();
    },

    saveGallery: function() {
        const raw = this.galleryImages.map(image => ({
            id: image.id,
            src: image.src,
            caption: image.caption,
            likes: image.likes,
            comments: [],
            date: image.date,
            author: {
                name: image.author,
                profilePic: `https://ui-avatars.com/api/?name=${encodeURIComponent(image.author)}&background=4a6fa5&color=fff`
            },
            createdAt: image.createdAt,
            likedBy: []
        }));
        localStorage.setItem('planadoImages', JSON.stringify(raw));
    },

    renderGallery: function() {
        const galleryContainer = document.getElementById('galleryGrid');
        if (!galleryContainer) return;

        if (this.galleryImages.length === 0) {
            galleryContainer.classList.remove('list-view');
            galleryContainer.innerHTML = `
                <div class="content-section">
                    <p style="color:#999;">No gallery posts yet. Add a photo from Home to see it here.</p>
                </div>
            `;
            return;
        }

        const sorted = [...this.galleryImages];
        if (this.currentSort === 'newest') {
            sorted.sort((a, b) => b.createdAt - a.createdAt);
        } else if (this.currentSort === 'oldest') {
            sorted.sort((a, b) => a.createdAt - b.createdAt);
        } else if (this.currentSort === 'popular') {
            sorted.sort((a, b) => b.likes - a.likes);
        }

        galleryContainer.classList.toggle('list-view', this.currentView === 'list');

        galleryContainer.innerHTML = sorted.map(image => `
            <div class="image-post" data-id="${image.id}">
                <img src="${image.src}" alt="${image.caption}">
                <div class="image-post-content">
                    <div class="image-post-header">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(image.author)}&background=4a6fa5&color=fff" 
                             alt="${image.author}" class="author-profile-pic">
                        <span class="author-name">${image.author}</span>
                    </div>
                    <p class="image-caption-preview">${image.caption}</p>
                    <div class="image-post-footer">
                        <div class="image-post-likes">
                            <i class="fas fa-heart"></i> ${image.likes}
                        </div>
                        <div class="image-post-comments">
                            <i class="fas fa-comment"></i> ${image.comments}
                        </div>
                        <div class="image-post-date">
                            <i class="far fa-clock"></i> ${image.date}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },
    
    setupEventListeners: function() {
        // View toggle
        document.querySelectorAll('.view-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.view-toggle').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentView = btn.dataset.view === 'list' ? 'list' : 'grid';
                this.renderGallery();
            });
        });
        
        // Sort select
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderGallery();
        });

        const attachBtn = document.getElementById('attachPhotoBtn');
        const attachInput = document.getElementById('galleryAttachInput');

        if (attachBtn && attachInput) {
            attachBtn.addEventListener('click', () => {
                attachInput.click();
            });

            attachInput.addEventListener('change', (e) => {
                const files = Array.from(e.target.files || []);
                if (files.length === 0) return;

                const savedUser = localStorage.getItem('planadoUser');
                const user = savedUser ? JSON.parse(savedUser) : { name: 'You' };

                let processed = 0;
                files.forEach((file) => {
                    if (!file.type.startsWith('image/')) {
                        processed += 1;
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = (evt) => {
                        this.galleryImages.unshift({
                            id: Date.now() + processed,
                            src: evt.target.result,
                            caption: file.name,
                            likes: 0,
                            comments: 0,
                            date: 'Just now',
                            author: user.name || 'You',
                            createdAt: Date.now()
                        });

                        processed += 1;
                        if (processed === files.length) {
                            this.saveGallery();
                            this.renderGallery();
                            attachInput.value = '';
                        }
                    };
                    reader.onerror = () => {
                        processed += 1;
                        if (processed === files.length) {
                            this.saveGallery();
                            this.renderGallery();
                            attachInput.value = '';
                        }
                    };
                    reader.readAsDataURL(file);
                });
            });
        }
        
        // Image click (for modal)
        document.addEventListener('click', (e) => {
            const imagePost = e.target.closest('.image-post');
            if (imagePost) {
                // In a real app, this would open the image modal
                alert('Image modal would open here');
            }
        });
    }
};
