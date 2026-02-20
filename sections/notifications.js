// Notifications Section
const NotificationsSection = {
    load: function() {
        const container = document.getElementById('content-container');
        container.innerHTML = `
            <section class="content-section">
                <div class="section-header">
                    <h2><i class="fas fa-bell"></i> Notifications</h2>
                    <div class="notifications-controls">
                        <button class="mark-all-read-btn" id="markAllRead">
                            <i class="fas fa-check-double"></i> Mark all as read
                        </button>
                        <select class="notifications-filter" id="notificationsFilter">
                            <option value="all">All Notifications</option>
                            <option value="unread">Unread Only</option>
                            <option value="mentions">Mentions</option>
                            <option value="friends">Friend Requests</option>
                        </select>
                    </div>
                </div>
                <div id="notificationsList" class="notifications-list"></div>
            </section>
        `;
        
        this.loadNotifications();
        this.setupEventListeners();
    },
    
    loadNotifications: function() {
        const notifications = [
            {
                id: 1,
                type: 'friend',
                title: 'New Friend Request',
                message: 'Sam Wilson sent you a friend request',
                time: '2 minutes ago',
                read: false,
                icon: 'user-plus'
            },
            {
                id: 2,
                type: 'like',
                title: 'New Like',
                message: 'Taylor Swift liked your photo',
                time: '15 minutes ago',
                read: true,
                icon: 'heart'
            },
            {
                id: 3,
                type: 'comment',
                title: 'New Comment',
                message: 'Mike Ross commented on your post',
                time: '1 hour ago',
                read: false,
                icon: 'comment'
            },
            {
                id: 4,
                type: 'mention',
                title: 'You were mentioned',
                message: 'Sarah Connor mentioned you in a post',
                time: '3 hours ago',
                read: true,
                icon: 'at'
            }
        ];
        
        this.displayNotifications(notifications);
    },
    
    displayNotifications: function(notifications) {
        const container = document.getElementById('notificationsList');
        
        if (notifications.length === 0) {
            container.innerHTML = `
                <div class="notification-item">
                    <div class="notification-content">
                        <div class="notification-text">No notifications</div>
                    </div>
                </div>
            `;
            return;
        }
        
        container.innerHTML = notifications.map(notif => `
            <div class="notification-item ${notif.read ? '' : 'unread'}" data-id="${notif.id}">
                <div class="notification-icon">
                    <i class="fas fa-${notif.icon}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-text">
                        <strong>${notif.title}</strong><br>
                        ${notif.message}
                    </div>
                    <div class="notification-time">${notif.time}</div>
                </div>
                <div class="notification-actions">
                    ${!notif.read ? `
                        <button class="friend-action-btn mark-as-read" title="Mark as read">
                            <i class="fas fa-check"></i>
                        </button>
                    ` : ''}
                    <button class="friend-action-btn delete-notification" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },
    
    setupEventListeners: function() {
        // Mark all as read
        document.getElementById('markAllRead').addEventListener('click', () => {
            document.querySelectorAll('.notification-item').forEach(item => {
                item.classList.remove('unread');
            });
        });
        
        // Filter change
        document.getElementById('notificationsFilter').addEventListener('change', (e) => {
            // In a real app, this would filter notifications
            console.log('Filter changed to:', e.target.value);
        });
        
        // Mark as read individual
        document.addEventListener('click', (e) => {
            if (e.target.closest('.mark-as-read')) {
                const notification = e.target.closest('.notification-item');
                notification.classList.remove('unread');
            }
        });
    }
};