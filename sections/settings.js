// Settings Section
const SettingsSection = {
    load: function() {
        const container = document.getElementById('content-container');
        container.innerHTML = `
            <section class="content-section">
                <div class="section-header">
                    <h2><i class="fas fa-cog"></i> Settings</h2>
                </div>
                <div class="settings-container">
                    <div class="settings-sidebar">
                        <button class="settings-tab active" data-tab="account">
                            <i class="fas fa-user"></i> Account
                        </button>
                        <button class="settings-tab" data-tab="privacy">
                            <i class="fas fa-lock"></i> Privacy
                        </button>
                        <button class="settings-tab" data-tab="notifications">
                            <i class="fas fa-bell"></i> Notifications
                        </button>
                        <button class="settings-tab" data-tab="appearance">
                            <i class="fas fa-palette"></i> Appearance
                        </button>
                        <button class="settings-tab" data-tab="security">
                            <i class="fas fa-shield-alt"></i> Security
                        </button>
                    </div>
                    <div class="settings-content">
                        <div id="account-settings" class="settings-tab-content active">
                            <h3><i class="fas fa-user"></i> Account Settings</h3>
                            <form class="settings-form" id="accountForm">
                                <div class="form-group">
                                    <label for="settings-name">Full Name</label>
                                    <input type="text" id="settings-name" value="Alex Johnson">
                                </div>
                                <div class="form-group">
                                    <label for="settings-email">Email Address</label>
                                    <input type="email" id="settings-email" value="alex@example.com">
                                </div>
                                <div class="form-group">
                                    <label for="settings-bio">Bio</label>
                                    <textarea id="settings-bio" rows="3">Digital enthusiast and nature lover</textarea>
                                </div>
                                <button type="submit" class="save-settings-btn">
                                    <i class="fas fa-save"></i> Save Changes
                                </button>
                            </form>
                        </div>
                        
                        <div id="privacy-settings" class="settings-tab-content">
                            <h3><i class="fas fa-lock"></i> Privacy Settings</h3>
                            <div class="privacy-options">
                                <div class="privacy-option">
                                    <h4>Profile Visibility</h4>
                                    <p>Who can see your profile</p>
                                    <select class="privacy-select">
                                        <option>Public</option>
                                        <option>Friends Only</option>
                                        <option>Private</option>
                                    </select>
                                </div>
                                <div class="privacy-option">
                                    <h4>Activity Status</h4>
                                    <p>Show when you're online</p>
                                    <label class="switch">
                                        <input type="checkbox" checked>
                                        <span class="slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <div id="notification-settings" class="settings-tab-content">
                            <h3><i class="fas fa-bell"></i> Notification Settings</h3>
                            <div class="privacy-options">
                                <div class="privacy-option">
                                    <h4>Email Notifications</h4>
                                    <p>Receive email notifications</p>
                                    <label class="switch">
                                        <input type="checkbox" checked>
                                        <span class="slider"></span>
                                    </label>
                                </div>
                                <div class="privacy-option">
                                    <h4>Push Notifications</h4>
                                    <p>Receive browser notifications</p>
                                    <label class="switch">
                                        <input type="checkbox" checked>
                                        <span class="slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <div id="appearance-settings" class="settings-tab-content">
                            <h3><i class="fas fa-palette"></i> Appearance</h3>
                            <div class="privacy-options">
                                <div class="privacy-option">
                                    <h4>Theme</h4>
                                    <p>Choose your preferred theme</p>
                                    <select class="privacy-select">
                                        <option>Dark (Default)</option>
                                        <option>Light</option>
                                        <option>System</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div id="security-settings" class="settings-tab-content">
                            <h3><i class="fas fa-shield-alt"></i> Security</h3>
                            <form class="settings-form" id="securityForm">
                                <div class="form-group">
                                    <label for="current-password">Current Password</label>
                                    <input type="password" id="current-password">
                                </div>
                                <div class="form-group">
                                    <label for="new-password">New Password</label>
                                    <input type="password" id="new-password">
                                </div>
                                <div class="form-group">
                                    <label for="confirm-password">Confirm Password</label>
                                    <input type="password" id="confirm-password">
                                </div>
                                <button type="submit" class="save-settings-btn">
                                    <i class="fas fa-key"></i> Update Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        this.setupEventListeners();
    },
    
    setupEventListeners: function() {
        // Tab switching
        document.querySelectorAll('.settings-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.dataset.tab;
                
                // Update active tab
                document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding content
                document.querySelectorAll('.settings-tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`${tabName}-settings`).classList.add('active');
            });
        });
        
        // Form submissions
        document.getElementById('accountForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Account settings saved!');
        });
        
        document.getElementById('securityForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Password updated successfully!');
        });
        
        // Toggle switches
        document.querySelectorAll('.switch input').forEach(switchInput => {
            switchInput.addEventListener('change', function() {
                console.log('Switch toggled:', this.checked);
            });
        });
    }
};

 