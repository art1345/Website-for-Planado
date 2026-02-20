// Messages Section
const MessagesSection = {
    conversations: [],
    currentConversation: null,
    
    load: function() {
        const container = document.getElementById('content-container');
        container.innerHTML = `
            <section class="content-section">
                <div class="section-header">
                    <h2><i class="fas fa-envelope"></i> Messages</h2>
                    <button class="new-message-btn" id="newMessageBtn">
                        <i class="fas fa-plus"></i> New Message
                    </button>
                </div>
                <div class="messages-container">
                    <div class="conversations-list" id="conversationsList"></div>
                    <div class="chat-area">
                        <div class="chat-header">
                            <div class="chat-user" id="chatHeader">
                                <img src="https://ui-avatars.com/api/?name=Sam+Wilson&background=2ecc71&color=fff" 
                                     alt="Select a conversation" class="chat-pic">
                                <div>
                                    <h3>Select a conversation</h3>
                                    <span class="chat-status">Click on a conversation to start chatting</span>
                                </div>
                            </div>
                        </div>
                        <div id="chatMessages" class="chat-messages">
                            <div class="message-placeholder">
                                <i class="fas fa-comments"></i>
                                <p>Select a conversation to view messages</p>
                            </div>
                        </div>
                        <div class="chat-input-area" style="display: none;" id="chatInputArea">
                            <input type="text" id="chatInput" placeholder="Type a message...">
                            <button id="sendMessage">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        this.loadConversations();
        this.setupEventListeners();
    },
    
    loadConversations: function() {
        this.conversations = [
            {
                id: 1,
                name: "Sam Wilson",
                profilePic: "https://ui-avatars.com/api/?name=Sam+Wilson&background=2ecc71&color=fff",
                lastMessage: "Hey! How are you doing today?",
                time: "2 min ago",
                unread: 3,
                messages: [
                    { text: "Hey Alex!", time: "10:00 AM", sender: "them" },
                    { text: "How are you doing today?", time: "10:00 AM", sender: "them" },
                    { text: "I'm good! Working on some new designs", time: "10:02 AM", sender: "me" }
                ]
            },
            {
                id: 2,
                name: "Taylor Swift",
                profilePic: "https://ui-avatars.com/api/?name=Taylor+Swift&background=e74c3c&color=fff",
                lastMessage: "Love the new photos you posted!",
                time: "1 hour ago",
                unread: 0,
                messages: [
                    { text: "Love the new photos you posted!", time: "9:30 AM", sender: "them" },
                    { text: "Thanks! Took them last weekend", time: "9:35 AM", sender: "me" }
                ]
            }
        ];
        
        const container = document.getElementById('conversationsList');
        container.innerHTML = this.conversations.map(conv => `
            <div class="conversation" data-id="${conv.id}">
                <img src="${conv.profilePic}" alt="${conv.name}" class="conversation-pic">
                <div class="conversation-info">
                    <div class="conversation-header">
                        <span class="conversation-name">${conv.name}</span>
                        <span class="conversation-time">${conv.time}</span>
                    </div>
                    <p class="conversation-preview">${conv.lastMessage}</p>
                </div>
                ${conv.unread > 0 ? `<span class="unread-count">${conv.unread}</span>` : ''}
            </div>
        `).join('');
    },
    
    loadConversation: function(conversationId) {
        const conversation = this.conversations.find(c => c.id == conversationId);
        if (!conversation) return;
        
        this.currentConversation = conversation;
        
        // Update header
        document.getElementById('chatHeader').innerHTML = `
            <img src="${conversation.profilePic}" alt="${conversation.name}" class="chat-pic">
            <div>
                <h3>${conversation.name}</h3>
                <span class="chat-status">Online</span>
            </div>
        `;
        
        // Show messages
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.innerHTML = conversation.messages.map(msg => `
            <div class="message ${msg.sender === 'me' ? 'sent' : 'received'}">
                <div class="message-text">${msg.text}</div>
                <div class="message-time">${msg.time}</div>
            </div>
        `).join('');
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Show input area
        document.getElementById('chatInputArea').style.display = 'flex';
    },
    
    setupEventListeners: function() {
        // New message button
        document.getElementById('newMessageBtn').addEventListener('click', () => {
            alert('New message modal would open here');
        });
        
        // Conversation click
        document.addEventListener('click', (e) => {
            const conversation = e.target.closest('.conversation');
            if (conversation) {
                document.querySelectorAll('.conversation').forEach(c => c.classList.remove('active'));
                conversation.classList.add('active');
                this.loadConversation(conversation.dataset.id);
            }
        });
        
        // Send message
        document.getElementById('sendMessage').addEventListener('click', () => this.sendMessage());
        
        // Enter key in chat input
        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    },
    
    sendMessage: function() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message || !this.currentConversation) return;
        
        // Add message to conversation
        const newMessage = {
            text: message,
            time: "Just now",
            sender: "me"
        };
        
        this.currentConversation.messages.push(newMessage);
        
        // Update UI
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.innerHTML += `
            <div class="message sent">
                <div class="message-text">${message}</div>
                <div class="message-time">Just now</div>
            </div>
        `;
        
        // Clear input
        input.value = '';
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Simulate reply
        setTimeout(() => {
            const reply = {
                text: "Got it! Thanks for the update.",
                time: "Just now",
                sender: "them"
            };
            
            this.currentConversation.messages.push(reply);
            
            messagesContainer.innerHTML += `
                <div class="message received">
                    <div class="message-text">${reply.text}</div>
                    <div class="message-time">${reply.time}</div>
                </div>
            `;
            
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
    }
};