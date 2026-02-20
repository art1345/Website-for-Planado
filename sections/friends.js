// Friends Section
const FriendsSection = {
    friends: [],
    pendingRequests: 3,

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

                <div id="addFriendPanel" class="add-friend-panel" style="display:none;">
                    <form id="addFriendForm" class="add-friend-form">
                        <input type="text" id="newFriendName" placeholder="Friend name" required>
                        <input type="text" id="newFriendBio" placeholder="Short bio" required>
                        <select id="newFriendStatus">
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                        </select>
                        <button type="submit" class="add-friend-btn">
                            <i class="fas fa-plus"></i> Save
                        </button>
                        <button type="button" id="cancelAddFriend" class="friend-action-btn" title="Cancel">
                            <i class="fas fa-times"></i>
                        </button>
                    </form>
                </div>

                <div class="friends-stats">
                    <div class="stat-card">
                        <h3 id="totalFriends">0</h3>
                        <p>Total Friends</p>
                    </div>
                    <div class="stat-card">
                        <h3 id="onlineFriends">0</h3>
                        <p>Online</p>
                    </div>
                    <div class="stat-card">
                        <h3 id="pendingRequests">0</h3>
                        <p>Pending Requests</p>
                    </div>
                </div>
                <div id="friendsList" class="friends-list"></div>
            </section>
        `;

        this.loadFriends();
        this.renderFriends();
        this.updateStats();
        this.setupEventListeners();
    },

    getDefaultFriends: function() {
        return [
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
    },

    loadFriends: function() {
        const savedFriends = localStorage.getItem('planadoFriends');
        const savedPending = localStorage.getItem('planadoPendingRequests');

        this.friends = savedFriends ? JSON.parse(savedFriends) : this.getDefaultFriends();
        this.pendingRequests = savedPending ? Number(savedPending) : 3;
    },

    saveFriends: function() {
        localStorage.setItem('planadoFriends', JSON.stringify(this.friends));
        localStorage.setItem('planadoPendingRequests', String(this.pendingRequests));
    },

    renderFriends: function(searchTerm = '') {
        const friendsList = document.getElementById('friendsList');
        const normalized = searchTerm.trim().toLowerCase();
        const visibleFriends = this.friends.filter(friend => {
            if (!normalized) return true;
            return friend.name.toLowerCase().includes(normalized) ||
                friend.bio.toLowerCase().includes(normalized);
        });

        if (visibleFriends.length === 0) {
            friendsList.innerHTML = `
                <div class="friend-card">
                    <div class="friend-info">
                        <div class="friend-name">No friends found</div>
                        <div class="friend-bio">Try a different name or add a new friend.</div>
                    </div>
                </div>
            `;
            return;
        }

        friendsList.innerHTML = visibleFriends.map(friend => `
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
                    <button class="friend-action-btn message-friend-btn" title="Message">
                        <i class="fas fa-comment"></i>
                    </button>
                    <button class="friend-action-btn remove-friend-btn" title="Remove">
                        <i class="fas fa-user-minus"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },

    updateStats: function() {
        const total = this.friends.length;
        const online = this.friends.filter(friend => friend.status === 'online').length;

        document.getElementById('totalFriends').textContent = String(total);
        document.getElementById('onlineFriends').textContent = String(online);
        document.getElementById('pendingRequests').textContent = String(this.pendingRequests);
    },

    createFriend: function(name, bio, status) {
        const newId = this.friends.length > 0 ? Math.max(...this.friends.map(friend => Number(friend.id) || 0)) + 1 : 1;
        return {
            id: newId,
            name: name,
            profilePic: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4a6fa5&color=fff`,
            bio: bio,
            status: status,
            mutualFriends: 0
        };
    },

    setupEventListeners: function() {
        const addFriendBtn = document.getElementById('addFriendBtn');
        const addFriendPanel = document.getElementById('addFriendPanel');
        const addFriendForm = document.getElementById('addFriendForm');
        const cancelAddFriend = document.getElementById('cancelAddFriend');
        const friendsSearch = document.getElementById('friendsSearch');
        const friendsList = document.getElementById('friendsList');

        addFriendBtn.addEventListener('click', () => {
            addFriendPanel.style.display = addFriendPanel.style.display === 'none' ? 'block' : 'none';
        });

        cancelAddFriend.addEventListener('click', () => {
            addFriendPanel.style.display = 'none';
            addFriendForm.reset();
        });

        addFriendForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('newFriendName').value.trim();
            const bio = document.getElementById('newFriendBio').value.trim();
            const status = document.getElementById('newFriendStatus').value;

            if (!name || !bio) return;

            const duplicate = this.friends.some(friend => friend.name.toLowerCase() === name.toLowerCase());
            if (duplicate) {
                alert('This friend already exists.');
                return;
            }

            this.friends.unshift(this.createFriend(name, bio, status));
            this.saveFriends();
            this.renderFriends(friendsSearch.value);
            this.updateStats();
            addFriendForm.reset();
            addFriendPanel.style.display = 'none';
        });

        friendsSearch.addEventListener('input', (e) => {
            this.renderFriends(e.target.value);
        });

        friendsList.addEventListener('click', (e) => {
            const card = e.target.closest('.friend-card');
            if (!card) return;

            const friendId = Number(card.dataset.id);
            const friend = this.friends.find(item => Number(item.id) === friendId);
            if (!friend) return;

            if (e.target.closest('.remove-friend-btn')) {
                this.friends = this.friends.filter(item => Number(item.id) !== friendId);
                this.saveFriends();
                this.renderFriends(friendsSearch.value);
                this.updateStats();
                return;
            }

            if (e.target.closest('.message-friend-btn')) {
                alert(`Start messaging ${friend.name}`);
            }
        });
    }
};
