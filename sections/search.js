// Search Section
const SearchSection = {
    load: function() {
        const container = document.getElementById('content-container');
        container.innerHTML = `
            <section class="content-section">
                <div class="section-header">
                    <h2><i class="fas fa-search"></i> Search</h2>
                </div>
                <div class="search-container">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" id="searchInput" placeholder="Search for people, posts, or photos...">
                        <button id="searchBtn">
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                    <div class="search-filters">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="people">People</button>
                        <button class="filter-btn" data-filter="posts">Posts</button>
                        <button class="filter-btn" data-filter="photos">Photos</button>
                    </div>
                    <div id="searchResults" class="search-results">
                        <div class="search-placeholder">
                            <i class="fas fa-search"></i>
                            <p>Search for anything above</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        this.setupEventListeners();
    },
    
    setupEventListeners: function() {
        // Search button
        document.getElementById('searchBtn').addEventListener('click', () => this.performSearch());
        
        // Enter key in search input
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                SearchSection.performSearch();
            });
        });
    },
    
    performSearch: function() {
        const query = document.getElementById('searchInput').value.trim();
        const filter = document.querySelector('.filter-btn.active').dataset.filter;
        const resultsContainer = document.getElementById('searchResults');
        
        if (!query) {
            resultsContainer.innerHTML = `
                <div class="search-placeholder">
                    <i class="fas fa-search"></i>
                    <p>Search for anything above</p>
                </div>
            `;
            return;
        }
        
        // Simulate search results
        const results = this.generateMockResults(query, filter);
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-placeholder">
                    <i class="fas fa-search"></i>
                    <p>No results found for "${query}"</p>
                </div>
            `;
        } else {
            resultsContainer.innerHTML = results.map(result => `
                <div class="result-card">
                    <div style="flex: 1;">
                        <div class="result-type">${result.type}</div>
                        <div class="result-title">${result.title}</div>
                        <div class="result-desc">${result.description}</div>
                    </div>
                    <button class="friend-action-btn">
                        <i class="fas fa-${result.icon}"></i>
                    </button>
                </div>
            `).join('');
        }
    },
    
    generateMockResults: function(query, filter) {
        const allResults = [
            {
                type: 'people',
                title: 'Sam Wilson',
                description: 'Digital Artist & Photographer',
                icon: 'user-plus'
            },
            {
                type: 'people',
                title: 'Sarah Wilson',
                description: 'UX Designer at TechCorp',
                icon: 'user-plus'
            },
            {
                type: 'posts',
                title: 'Beautiful Sunset',
                description: 'Just watched an amazing sunset at the beach...',
                icon: 'external-link-alt'
            },
            {
                type: 'posts',
                title: 'New Project Launch',
                description: 'Excited to announce our new project...',
                icon: 'external-link-alt'
            },
            {
                type: 'photos',
                title: 'Mountain Hike',
                description: 'Amazing view from the summit',
                icon: 'image'
            },
            {
                type: 'photos',
                title: 'City Lights',
                description: 'Night photography downtown',
                icon: 'image'
            }
        ];
        
        let filtered = allResults;
        
        if (filter !== 'all') {
            filtered = allResults.filter(result => result.type === filter);
        }
        
        return filtered.filter(result => 
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.description.toLowerCase().includes(query.toLowerCase())
        );
    }
};