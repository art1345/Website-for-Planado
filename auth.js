// Authentication System for Planado

// User management
class AuthSystem {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = this.loadCurrentUser();
        this.init();
    }

    // Load users from localStorage
    loadUsers() {
        const users = localStorage.getItem('planadoUsers');
        if (users) {
            return JSON.parse(users);
        } else {
            // Default demo users
            const defaultUsers = [
                {
                    id: 1,
                    firstName: 'Alex',
                    lastName: 'Johnson',
                    email: 'alex@example.com',
                    password: 'demo123',
                    profilePic: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=4a6fa5&color=fff',
                    username: '@alexj',
                    bio: 'Digital enthusiast and nature lover. Exploring the world one photo at a time.',
                    location: 'New York, USA',
                    website: 'https://alexjohnson.example.com',
                    status: 'Online',
                    createdAt: new Date().toISOString(),
                    isDemo: true
                },
                {
                    id: 2,
                    firstName: 'Sam',
                    lastName: 'Wilson',
                    email: 'sam@example.com',
                    password: 'demo123',
                    profilePic: 'https://ui-avatars.com/api/?name=Sam+Wilson&background=2ecc71&color=fff',
                    username: '@samw',
                    bio: 'Adventure seeker and photography enthusiast.',
                    location: 'Los Angeles, USA',
                    website: '',
                    status: 'Online',
                    createdAt: new Date().toISOString(),
                    isDemo: true
                },
                {
                    id: 3,
                    firstName: 'Taylor',
                    lastName: 'Swift',
                    email: 'taylor@example.com',
                    password: 'demo123',
                    profilePic: 'https://ui-avatars.com/api/?name=Taylor+Swift&background=e74c3c&color=fff',
                    username: '@taylors',
                    bio: 'Music lover and travel enthusiast.',
                    location: 'Nashville, USA',
                    website: 'https://taylorswift.com',
                    status: 'Online',
                    createdAt: new Date().toISOString(),
                    isDemo: true
                }
            ];
            this.saveUsers(defaultUsers);
            return defaultUsers;
        }
    }

    // Load current user from localStorage
    loadCurrentUser() {
        const user = localStorage.getItem('planadoCurrentUser');
        return user ? JSON.parse(user) : null;
    }

    // Save users to localStorage
    saveUsers(users = this.users) {
        localStorage.setItem('planadoUsers', JSON.stringify(users));
    }

    // Save current user
    saveCurrentUser(user) {
        this.currentUser = user;
        localStorage.setItem('planadoCurrentUser', JSON.stringify(user));
    }

    // Clear current user (logout)
    clearCurrentUser() {
        this.currentUser = null;
        localStorage.removeItem('planadoCurrentUser');
    }

    // Generate user profile picture
    generateProfilePic(name) {
        const colors = ['4a6fa5', '2ecc71', 'e74c3c', '9b59b6', 'f39c12', '1abc9c'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${randomColor}&color=fff&bold=true`;
    }

    // Generate username from name
    generateUsername(firstName, lastName) {
        const base = `${firstName.toLowerCase()}${lastName.charAt(0).toLowerCase()}`;
        let username = `@${base}`;
        let counter = 1;
        
        // Check if username exists
        while (this.users.some(user => user.username === username)) {
            username = `@${base}${counter}`;
            counter++;
        }
        
        return username;
    }

    // Validate email format
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate password strength
    validatePassword(password) {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
        };

        return {
            valid: Object.values(requirements).every(req => req),
            requirements
        };
    }

    // Check if email exists
    emailExists(email) {
        return this.users.some(user => user.email.toLowerCase() === email.toLowerCase());
    }

    // Register new user
    register(userData) {
        const { firstName, lastName, email, password } = userData;
        
        // Validate data
        if (!this.validateEmail(email)) {
            return { success: false, message: 'Please enter a valid email address' };
        }

        if (this.emailExists(email)) {
            return { success: false, message: 'Email already registered' };
        }

        const passwordValidation = this.validatePassword(password);
        if (!passwordValidation.valid) {
            return { success: false, message: 'Password does not meet requirements' };
        }

        // Create new user
        const newUser = {
            id: this.users.length + 1,
            firstName,
            lastName,
            email: email.toLowerCase(),
            password, // In real app, this should be hashed
            profilePic: this.generateProfilePic(`${firstName} ${lastName}`),
            username: this.generateUsername(firstName, lastName),
            bio: `Hello! I'm ${firstName} ${lastName}. Just joined Planado!`,
            location: '',
            website: '',
            status: 'Online',
            createdAt: new Date().toISOString(),
            isDemo: false
        };

        // Add to users array
        this.users.push(newUser);
        this.saveUsers();

        // Auto login after registration
        this.saveCurrentUser(newUser);

        return { 
            success: true, 
            message: 'Account created successfully!',
            user: newUser
        };
    }

    // Login user
    login(email, password) {
        const user = this.users.find(u => 
            u.email.toLowerCase() === email.toLowerCase() && 
            u.password === password
        );

        if (user) {
            this.saveCurrentUser(user);
            return { success: true, user };
        } else {
            return { success: false, message: 'Invalid email or password' };
        }
    }

    // Logout user
    logout() {
        this.clearCurrentUser();
        return { success: true, message: 'Logged out successfully' };
    }

    // Update user profile
    updateProfile(userId, updates) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updates };
            this.saveUsers();
            
            // Update current user if it's the same user
            if (this.currentUser && this.currentUser.id === userId) {
                this.saveCurrentUser(this.users[userIndex]);
            }
            
            return { success: true, user: this.users[userIndex] };
        }
        return { success: false, message: 'User not found' };
    }

    // Initialize authentication system
    init() {
        // Check if user is logged in on main page
        if (window.location.pathname.includes('index.html') || 
            window.location.pathname === '/' || 
            window.location.pathname === '') {
            
            if (!this.currentUser) {
                // Redirect to login if not authenticated
                window.location.href = 'login.html';
            } else {
                // Initialize user data on main page
                this.initializeUserData();
            }
        }
    }

    // Initialize user data on main page
    initializeUserData() {
        // This will be called from the main script.js
        console.log('User authenticated:', this.currentUser);
    }
}

// Create global auth instance
const auth = new AuthSystem();

// Login page functionality
if (window.location.pathname.includes('login.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const loginForm = document.getElementById('login-form');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const rememberMe = document.getElementById('remember-me');
        const loginBtn = document.getElementById('login-btn');
        const loginBtnText = document.getElementById('login-btn-text');
        const loginSpinner = document.getElementById('login-spinner');
        const errorMessage = document.getElementById('error-message');
        const successMessage = document.getElementById('success-message');
        const demoAccounts = document.querySelectorAll('.demo-account');

        // Load saved email if remember me was checked
        const savedEmail = localStorage.getItem('planadoRememberEmail');
        if (savedEmail) {
            emailInput.value = savedEmail;
            rememberMe.checked = true;
        }

        // Demo account click
        demoAccounts.forEach(account => {
            account.addEventListener('click', function() {
                const email = this.dataset.email;
                const password = this.dataset.password;
                
                emailInput.value = email;
                passwordInput.value = password;
                
                // Highlight the selected demo account
                demoAccounts.forEach(a => a.style.borderColor = '#333');
                this.style.borderColor = '#4a6fa5';
                this.style.background = 'rgba(74, 111, 165, 0.1)';
                
                showMessage(successMessage, 'Demo account loaded. Click "Log In" to continue.');
            });
        });

        // Login form submission
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            
            // Validate inputs
            if (!email || !password) {
                showMessage(errorMessage, 'Please fill in all fields');
                return;
            }

            if (!auth.validateEmail(email)) {
                showMessage(errorMessage, 'Please enter a valid email address');
                return;
            }

            // Show loading state
            loginBtn.disabled = true;
            loginBtnText.textContent = 'Logging in...';
            loginSpinner.style.display = 'inline-block';

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Attempt login
            const result = auth.login(email, password);

            if (result.success) {
                // Save email if remember me is checked
                if (rememberMe.checked) {
                    localStorage.setItem('planadoRememberEmail', email);
                } else {
                    localStorage.removeItem('planadoRememberEmail');
                }

                showMessage(successMessage, 'Login successful! Redirecting...');
                
                // Redirect to main page after delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showMessage(errorMessage, result.message || 'Invalid email or password');
                
                // Reset button state
                loginBtn.disabled = false;
                loginBtnText.textContent = 'Log In';
                loginSpinner.style.display = 'none';
            }
        });

        // Input validation
        [emailInput, passwordInput].forEach(input => {
            input.addEventListener('input', function() {
                hideMessage(errorMessage);
                hideMessage(successMessage);
            });
        });

        // Forgot password
        document.getElementById('forgot-password').addEventListener('click', function(e) {
            e.preventDefault();
            const email = emailInput.value.trim();
            
            if (!email || !auth.validateEmail(email)) {
                showMessage(errorMessage, 'Please enter your email address first');
                return;
            }

            showMessage(successMessage, `Password reset instructions sent to ${email}`);
        });

        // Social login buttons
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
                showMessage(successMessage, `${provider} login would be implemented in a real application`);
            });
        });

        // Helper functions for messages
        function showMessage(element, text) {
            element.textContent = text;
            element.style.display = 'block';
            setTimeout(() => {
                element.style.opacity = '1';
            }, 10);
        }

        function hideMessage(element) {
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.display = 'none';
            }, 300);
        }
    });
}

// Signup page functionality
if (window.location.pathname.includes('signup.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const signupForm = document.getElementById('signup-form');
        const firstNameInput = document.getElementById('first-name');
        const lastNameInput = document.getElementById('last-name');
        const emailInput = document.getElementById('signup-email');
        const passwordInput = document.getElementById('signup-password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const termsCheckbox = document.getElementById('terms');
        const signupBtn = document.getElementById('signup-btn');
        const signupBtnText = document.getElementById('signup-btn-text');
        const signupSpinner = document.getElementById('signup-spinner');
        const errorMessage = document.getElementById('error-message');
        const successMessage = document.getElementById('success-message');
        const passwordRequirements = document.getElementById('password-requirements');
        const requirementItems = {
            length: document.getElementById('req-length'),
            uppercase: document.getElementById('req-uppercase'),
            lowercase: document.getElementById('req-lowercase'),
            number: document.getElementById('req-number'),
            special: document.getElementById('req-special')
        };

        // Password validation real-time feedback
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const validation = auth.validatePassword(password);
            
            // Update requirement indicators
            Object.keys(validation.requirements).forEach(key => {
                if (validation.requirements[key]) {
                    requirementItems[key].classList.add('valid');
                } else {
                    requirementItems[key].classList.remove('valid');
                }
            });
            
            // Check password match
            validatePasswordMatch();
        });

        confirmPasswordInput.addEventListener('input', validatePasswordMatch);

        function validatePasswordMatch() {
            const password = passwordInput.value;
            const confirm = confirmPasswordInput.value;
            
            if (confirm && password !== confirm) {
                confirmPasswordInput.style.borderColor = '#e74c3c';
            } else if (confirm) {
                confirmPasswordInput.style.borderColor = '#2ecc71';
            } else {
                confirmPasswordInput.style.borderColor = '#333';
            }
        }

        // Email validation
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && auth.validateEmail(email)) {
                if (auth.emailExists(email)) {
                    this.style.borderColor = '#e74c3c';
                    showMessage(errorMessage, 'This email is already registered');
                } else {
                    this.style.borderColor = '#2ecc71';
                    hideMessage(errorMessage);
                }
            }
        });

        // Terms and Privacy links
        document.getElementById('terms-link').addEventListener('click', function(e) {
            e.preventDefault();
            showMessage(successMessage, 'Terms of Service would be displayed here');
        });

        document.getElementById('privacy-link').addEventListener('click', function(e) {
            e.preventDefault();
            showMessage(successMessage, 'Privacy Policy would be displayed here');
        });

        // Social signup buttons
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
                showMessage(successMessage, `${provider} signup would be implemented in a real application`);
            });
        });

        // Signup form submission
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const firstName = firstNameInput.value.trim();
            const lastName = lastNameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            // Validate inputs
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                showMessage(errorMessage, 'Please fill in all fields');
                return;
            }

            if (!termsCheckbox.checked) {
                showMessage(errorMessage, 'Please agree to the Terms of Service and Privacy Policy');
                return;
            }

            if (password !== confirmPassword) {
                showMessage(errorMessage, 'Passwords do not match');
                return;
            }

            const passwordValidation = auth.validatePassword(password);
            if (!passwordValidation.valid) {
                showMessage(errorMessage, 'Password does not meet all requirements');
                return;
            }

            // Show loading state
            signupBtn.disabled = true;
            signupBtnText.textContent = 'Creating account...';
            signupSpinner.style.display = 'inline-block';

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Attempt registration
            const result = auth.register({
                firstName,
                lastName,
                email,
                password
            });

            if (result.success) {
                showMessage(successMessage, 'Account created successfully! Redirecting...');
                
                // Redirect to main page after delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                showMessage(errorMessage, result.message);
                
                // Reset button state
                signupBtn.disabled = false;
                signupBtnText.textContent = 'Create Account';
                signupSpinner.style.display = 'none';
            }
        });

        // Input validation on change
        [firstNameInput, lastNameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
            input.addEventListener('input', function() {
                hideMessage(errorMessage);
                hideMessage(successMessage);
                this.style.borderColor = '#333';
            });
        });

        // Helper functions for messages
        function showMessage(element, text) {
            element.textContent = text;
            element.style.display = 'block';
            setTimeout(() => {
                element.style.opacity = '1';
            }, 10);
        }

        function hideMessage(element) {
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.display = 'none';
            }, 300);
        }
    });
}

// Export auth system for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { auth };
} else {
    window.auth = auth;
}