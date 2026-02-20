// Friends Section
const FriendsSection = {
    load: function() {
        const container = document.getElementById('content-container');
        container.innerHTML = `
            <section class="content-section">
                <div class="section-header">
                    <h2><i class="fas fa-users"></i> Friends</h2>
                    <div class="friends-controls">
                        <button class="add-friend-btn" id="addFriendBtn">
                            <i class="fas fa-user-plus"></i> Add Friend
                        </button>
                        <input type="text" class="friends-search" id="friendsSearch" placeholder="Search friends...">
                    </div>
                </div>
                <div class="friends-stats">
                    <div class="stat-card">
                        <h3 id="totalFriends">12</h3>
                        <p>Total Friends</p>
                    </div>
                    <div class="stat-card">
                        <h3 id="onlineFriends">8</h3>
                        <p>Online</p>
                    </div>
                    <div class="stat-card">
                        <h3 id="pendingRequests">3</h3>
                        <p>Pending Requests</p>
                    </div>
                </div>
                <div id="friendsList" class="friends-list"></div>
            </section>
        `;
        
        this.loadFriends();
        this.setupEventListeners();
    },
    
    loadFriends: function() {
        const friendsList = document.getElementById('friendsList');
        const friends = [
            {
                id: 1,
                name: "Sam Wilson",
                profilePic: "https://ui-avatars.com/api/?name=Sam+Wilson&background=2ecc71&color=fff",
                bio: "Digital Artist & Photographer",
                status: "online",
                mutualFriends: 24
            },
            {
                id: 2,
                name: "Taylor Swift",
                profilePic: "https://ui-avatars.com/api/?name=Taylor+Swift&background=e74c3c&color=fff",
                bio: "Music Producer & Singer",
                status: "online",
                mutualFriends: 18
            },
            {
                id: 3,
                name: "Mike Ross",
                profilePic: "https://ui-avatars.com/api/?name=Mike+Ross&background=3498db&color=fff",
                bio: "Software Developer",
                status: "offline",
                mutualFriends: 32
            },
            {
                id: 4,
                name: "Sarah Connor",
                profilePic: "https://ui-avatars.com/api/?name=Sarah+Connor&background=9b59b6&color=fff",
                bio: "Fitness Trainer",
                status: "online",
                mutualFriends: 15
            }
        ];
        
        friendsList.innerHTML = friends.map(friend => `
            <div class="friend-card" data-id="${friend.id}">
                <img src="${friend.profilePic}" alt="${friend.name}" class="friend-pic">
                <div class="friend-info">
                    <div class="friend-name">${friend.name}</div>
                    <div class="friend-bio">${friend.bio}</div>
                    <span class="friend-status ${friend.status}">
                        <i class="fas fa-circle"></i> ${friend.status}
                    </span>
                </div>
                <div class="friend-actions">
                    <button class="friend-action-btn" title="Message">
                        <i class="fas fa-comment"></i>
                    </button>
                    <button class="friend-action-btn" title="Remove">
                        <i class="fas fa-user-minus"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },
    
    setupEventListeners: function() {
        // Add friend button
        document.getElementById('addFriendBtn').addEventListener('click', function() {
            alert('Add friend feature would open here');
        });
        
        // Search functionality
        document.getElementById('friendsSearch').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const friendCards = document.querySelectorAll('.friend-card');
            
            friendCards.forEach(card => {
                const name = card.querySelector('.friend-name').textContent.toLowerCase();
                const bio = card.querySelector('.friend-bio').textContent.toLowerCase();
                
                if (name.includes(searchTerm) || bio.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
};