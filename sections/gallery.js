// Gallery Section
const GallerySection = {
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
        // Use images from main app or load specific gallery data
        const galleryContainer = document.getElementById('galleryGrid');
        
        // Sample gallery images (in a real app, this would come from your main images array)
        const galleryImages = [
            {
                id: 1,
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                caption: 'Beautiful sunset at the beach',
                likes: 42,
                comments: 5,
                date: '2 hours ago',
                author: 'Alex Johnson'
            },
            {
                id: 2,
                src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                caption: 'City skyline at night',
                likes: 28,
                comments: 3,
                date: 'Yesterday',
                author: 'Sam Wilson'
            },
            {
                id: 3,
                src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                caption: 'Mountain hiking adventure',
                likes: 56,
                comments: 8,
                date: '2 days ago',
                author: 'Taylor Swift'
            }
        ];
        
        galleryContainer.innerHTML = galleryImages.map(image => `
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
            btn.addEventListener('click', function() {
                document.querySelectorAll('.view-toggle').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const gallery = document.getElementById('galleryGrid');
                if (this.dataset.view === 'list') {
                    gallery.style.gridTemplateColumns = '1fr';
                    gallery.classList.add('list-view');
                } else {
                    gallery.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
                    gallery.classList.remove('list-view');
                }
            });
        });
        
        // Sort select
        document.getElementById('sortSelect').addEventListener('change', function() {
            // In a real app, this would sort the gallery
            console.log('Sort by:', this.value);
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