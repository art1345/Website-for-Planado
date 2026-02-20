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
