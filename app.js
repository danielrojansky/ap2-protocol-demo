// AP2 Protocol Demo Application
class AP2Demo {
    constructor() {
        this.data = {
            "products": [
                {
                    "id": "1",
                    "name": "Wireless Headphones",
                    "description": "Premium noise-canceling wireless headphones with 30-hour battery life",
                    "price": 99.99,
                    "category": "electronics",
                    "merchant_id": "demo_merchant",
                    "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
                    "in_stock": true,
                    "features": ["Noise Canceling", "30hr Battery", "Quick Charge"]
                },
                {
                    "id": "2", 
                    "name": "Smart Watch",
                    "description": "Feature-rich smartwatch with health tracking and GPS",
                    "price": 199.99,
                    "category": "electronics",
                    "merchant_id": "demo_merchant",
                    "image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
                    "in_stock": true,
                    "features": ["Heart Rate Monitor", "GPS", "Water Resistant"]
                },
                {
                    "id": "3",
                    "name": "Coffee Maker",
                    "description": "Automatic drip coffee maker with programmable timer",
                    "price": 79.99,
                    "category": "appliances", 
                    "merchant_id": "demo_merchant",
                    "image_url": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
                    "in_stock": true,
                    "features": ["Programmable", "Auto Shut-off", "12 Cup Capacity"]
                },
                {
                    "id": "4",
                    "name": "Bluetooth Speaker",
                    "description": "Portable wireless speaker with 360-degree sound",
                    "price": 59.99,
                    "category": "electronics",
                    "merchant_id": "demo_merchant", 
                    "image_url": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
                    "in_stock": true,
                    "features": ["360° Sound", "Waterproof", "12hr Battery"]
                },
                {
                    "id": "5",
                    "name": "Laptop Stand",
                    "description": "Adjustable aluminum laptop stand for ergonomic viewing",
                    "price": 29.99,
                    "category": "accessories",
                    "merchant_id": "demo_merchant",
                    "image_url": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
                    "in_stock": true,
                    "features": ["Adjustable Height", "Aluminum Build", "Portable"]
                },
                {
                    "id": "6",
                    "name": "Wireless Charger",
                    "description": "Fast wireless charging pad compatible with all Qi devices",
                    "price": 19.99,
                    "category": "electronics",
                    "merchant_id": "demo_merchant",
                    "image_url": "https://images.unsplash.com/photo-1572649830236-5d467e5056dd?w=300&h=300&fit=crop", 
                    "in_stock": true,
                    "features": ["Fast Charging", "Qi Compatible", "LED Indicator"]
                }
            ],
            "paymentMethods": [
                {
                    "id": "card_1",
                    "type": "card",
                    "name": "Visa",
                    "last_four": "4242",
                    "token": "tok_visa_4242",
                    "is_tokenized": true,
                    "supports_otp": true
                },
                {
                    "id": "card_2", 
                    "type": "card",
                    "name": "Mastercard",
                    "last_four": "8888",
                    "token": "tok_mc_8888",
                    "is_tokenized": true,
                    "supports_otp": true
                },
                {
                    "id": "crypto_1",
                    "type": "crypto",
                    "name": "USDC Wallet", 
                    "address": "0x1234...5678",
                    "token": "tok_usdc_wallet",
                    "is_tokenized": false,
                    "supports_otp": false
                },
                {
                    "id": "bank_1",
                    "type": "bank_transfer",
                    "name": "Chase Bank",
                    "account_ending": "1234",
                    "token": "tok_chase_1234", 
                    "is_tokenized": false,
                    "supports_otp": true
                }
            ],
            "samplePrompts": [
                "I want to buy wireless headphones",
                "Show me coffee makers under $100", 
                "I need a smartwatch for fitness tracking",
                "Find me the cheapest bluetooth speaker",
                "I want to buy electronics under $50",
                "Show me all available products"
            ],
            "agents": [
                {
                    "id": "shopping_agent",
                    "name": "Shopping Agent",
                    "description": "Orchestrates the shopping process and user interaction",
                    "status": "online",
                    "capabilities": ["intent_creation", "cart_selection", "payment_orchestration"]
                },
                {
                    "id": "merchant_agent", 
                    "name": "Merchant Agent",
                    "description": "Handles product search and cart creation",
                    "status": "online",
                    "capabilities": ["product_search", "cart_creation", "mandate_signing"]
                },
                {
                    "id": "payment_processor",
                    "name": "Payment Processor",
                    "description": "Processes payments and handles authentication", 
                    "status": "online",
                    "capabilities": ["payment_processing", "otp_challenges", "receipt_generation"]
                },
                {
                    "id": "credentials_provider",
                    "name": "Credentials Provider", 
                    "description": "Manages user payment credentials and methods",
                    "status": "online",
                    "capabilities": ["credential_management", "payment_method_selection"]
                }
            ]
        };

        this.state = this.buildInitialState();
        this.scenarioEngine = new ScenarioEngine();

        this.init();
    }

    buildInitialState() {
        return {
            currentTab: 'shop',
            cart: [],
            currentMandates: {
                intent: null,
                cart: null,
                payment: null
            },
            agentStatus: {
                shopping_agent: 'online',
                merchant_agent: 'online',
                payment_processor: 'online',
                credentials_provider: 'online'
            },
            currentFlow: {
                step: 0,
                steps: ['user_intent', 'intent_mandate', 'product_search', 'cart_creation', 'payment_authorization', 'transaction_complete']
            },
            timeline: [],
            chatHistory: [
                { type: 'system', message: "Hello! I'm your AI shopping assistant. Tell me what you'd like to buy.", timestamp: new Date() }
            ],
            selectedPaymentMethod: null
        };
    }

    init() {
        this.setupEventListeners();
        this.renderProducts();
        this.renderAgents();
        this.renderPromptButtons();
        this.updateFlowVisualization();
        this.renderMandateInspector();
        // Initialize enhanced modules (no-op placeholders to avoid breaking existing UI)
        this.initDashboard();
        this.initRiskConsole();
        this.initPaymentsOps();
        this.initMandateOps();
        this.initSimulator();
        this.initReports();
        this.initAdmin();
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav__tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Product filters
        document.getElementById('category-filter').addEventListener('change', () => this.filterProducts());
        document.getElementById('price-filter').addEventListener('input', (e) => {
            document.getElementById('price-value').textContent = e.target.value;
            this.filterProducts();
        });

        // Chat functionality
        document.getElementById('send-message').addEventListener('click', () => this.sendChatMessage());
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendChatMessage();
        });

        // Mandate inspector
        document.querySelectorAll('.mandate-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchMandateTab(e.target.dataset.mandate));
        });

        document.getElementById('export-mandates').addEventListener('click', () => this.exportMandates());

        // Payment modal
        document.getElementById('close-payment-modal').addEventListener('click', () => this.closePaymentModal());
        document.getElementById('cancel-payment').addEventListener('click', () => this.closePaymentModal());
        document.getElementById('verify-otp').addEventListener('click', () => this.verifyOTP());

        // Reset button
        const resetBtn = document.getElementById('reset-app');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetApp());
        }
    }

    switchTab(tabName) {
        // Update nav buttons
        document.querySelectorAll('.nav__tab').forEach(tab => {
            tab.classList.remove('nav__tab--active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('nav__tab--active');

        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('tab-content--active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('tab-content--active');

        this.state.currentTab = tabName;

        // If navigating to checkout, render checkout view
        if (tabName === 'checkout') {
            this.renderCheckout();
        }
        // No special side effects for other new tabs
    }

    renderProducts() {
        const grid = document.getElementById('product-grid');
        grid.innerHTML = this.data.products.map(product => {
            // Create a simple icon based on product category and name
            let icon = '🎧'; // default
            if (product.name.toLowerCase().includes('headphones')) icon = '🎧';
            else if (product.name.toLowerCase().includes('watch')) icon = '⌚';
            else if (product.name.toLowerCase().includes('coffee')) icon = '☕';
            else if (product.name.toLowerCase().includes('speaker')) icon = '🔊';
            else if (product.name.toLowerCase().includes('stand')) icon = '💻';
            else if (product.name.toLowerCase().includes('charger')) icon = '🔌';

            return `
                <div class="product-card" data-category="${product.category}" data-price="${product.price}">
                    <div class="product-thumb">${icon}</div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-features">
                            ${product.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                        </div>
                        <div class="product-footer">
                            <span class="product-price">$${product.price}</span>
                            <button class="btn btn--primary btn--sm" onclick="demo.addToCart('${product.id}')">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    filterProducts() {
        const category = document.getElementById('category-filter').value;
        const maxPrice = parseFloat(document.getElementById('price-filter').value);

        document.querySelectorAll('.product-card').forEach(card => {
            const cardCategory = card.dataset.category;
            const cardPrice = parseFloat(card.dataset.price);

            const matchesCategory = !category || cardCategory === category;
            const matchesPrice = cardPrice <= maxPrice;

            card.style.display = matchesCategory && matchesPrice ? 'block' : 'none';
        });
    }

    addToCart(productId) {
        const product = this.data.products.find(p => p.id === productId);
        if (!product) return;

        // Check if already in cart
        const existingItem = this.state.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.state.cart.push({ ...product, quantity: 1 });
        }

        this.updateCart();
        this.addToTimeline('Product added to cart', `${product.name} added`);
        this.addAgentRequest(`Product added: ${product.name}`);
    }

    updateCart() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const totalAmount = document.getElementById('total-amount');

        if (this.state.cart.length === 0) {
            cartItems.innerHTML = '<p class="text-secondary">Cart is empty</p>';
            cartTotal.style.display = 'none';
            return;
        }

        const total = this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        cartItems.innerHTML = this.state.cart.map(item => `
            <div class="cart-item">
                <div>
                    <div class="cart-item-name">${item.name}</div>
                    <div class="text-secondary">Qty: ${item.quantity}</div>
                </div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');

        totalAmount.textContent = total.toFixed(2);
        cartTotal.style.display = 'block';
    }

    resetApp() {
        // Close any open modals
        this.closePaymentModal();

        // Reset state
        this.state = this.buildInitialState();

        // Reset UI sections
        // Chat
        const chatHistory = document.getElementById('chat-history');
        if (chatHistory) {
            chatHistory.innerHTML = `
                <div class="chat-message chat-message--system">
                    <strong>Shopping Agent:</strong> Hello! I'm your AI shopping assistant. Tell me what you'd like to buy.
                </div>
            `;
        }

        // Cart sidebar
        const cartItems = document.getElementById('cart-items');
        if (cartItems) cartItems.innerHTML = '<p class="text-secondary">Cart is empty</p>';
        const cartTotal = document.getElementById('cart-total');
        if (cartTotal) cartTotal.style.display = 'none';

        // Timeline
        const timeline = document.getElementById('timeline');
        if (timeline) timeline.innerHTML = '<p class="text-secondary">No active transactions</p>';

        // Agent monitor
        const monitor = document.getElementById('agent-monitor');
        if (monitor) monitor.innerHTML = '<p class="text-secondary">No agent requests</p>';

        // Mandate inspector
        this.renderMandateInspector();
        this.updateFlowVisualization();

        // Checkout tab (if open)
        const checkoutEmpty = document.getElementById('checkout-empty');
        const checkoutWrap = document.getElementById('checkout-table-wrapper');
        if (checkoutEmpty) checkoutEmpty.style.display = 'block';
        if (checkoutWrap) checkoutWrap.style.display = 'none';

        // Return to Shop tab
        this.switchTab('shop');
    }

    // Checkout management rendering
    renderCheckout() {
        const emptyEl = document.getElementById('checkout-empty');
        const tableWrap = document.getElementById('checkout-table-wrapper');
        const tbody = document.getElementById('checkout-table-body');
        const subtotalEl = document.getElementById('checkout-subtotal');
        const taxEl = document.getElementById('checkout-tax');
        const shippingEl = document.getElementById('checkout-shipping');
        const grandTotalEl = document.getElementById('checkout-grandtotal');

        if (!emptyEl || !tableWrap) return; // Not on page yet

        if (this.state.cart.length === 0) {
            emptyEl.style.display = 'block';
            tableWrap.style.display = 'none';
            return;
        }

        emptyEl.style.display = 'none';
        tableWrap.style.display = 'block';

        tbody.innerHTML = this.state.cart.map(item => {
            const lineTotal = (item.price * item.quantity).toFixed(2);
            return `
                <tr data-id="${item.id}" style="border-bottom:1px solid var(--color-card-border-inner);">
                    <td style="padding:8px;">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="text-secondary">Unit: $${item.price.toFixed(2)}</div>
                    </td>
                    <td style="padding:8px;">$${item.price.toFixed(2)}</td>
                    <td style="padding:8px;">
                        <div class="flex gap-8">
                            <button class="btn btn--secondary btn--sm" data-action="decrement">-</button>
                            <span style="min-width:24px; text-align:center;">${item.quantity}</span>
                            <button class="btn btn--secondary btn--sm" data-action="increment">+</button>
                        </div>
                    </td>
                    <td style="padding:8px;">$${lineTotal}</td>
                    <td style="padding:8px;">
                        <button class="btn btn--outline btn--sm" data-action="remove">Remove</button>
                    </td>
                </tr>
            `;
        }).join('');

        // Attach action handlers
        tbody.querySelectorAll('button[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tr = e.target.closest('tr');
                const id = tr?.dataset.id;
                if (!id) return;
                const action = e.target.getAttribute('data-action');
                if (action === 'increment') this.updateCartItemQuantity(id, 1);
                if (action === 'decrement') this.updateCartItemQuantity(id, -1);
                if (action === 'remove') this.removeFromCart(id);
                this.renderCheckout();
                this.updateCart();
            });
        });

        const subtotal = this.state.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
        const tax = subtotal * 0.08;
        const shipping = subtotal > 50 ? 0 : (this.state.cart.length > 0 ? 9.99 : 0);
        const grand = subtotal + tax + shipping;

        subtotalEl.textContent = subtotal.toFixed(2);
        taxEl.textContent = tax.toFixed(2);
        shippingEl.textContent = shipping.toFixed(2);
        grandTotalEl.textContent = grand.toFixed(2);

        // Top action buttons
        const continueBtn = document.getElementById('checkout-continue-shopping');
        const proceedBtn = document.getElementById('checkout-proceed');
        if (continueBtn) continueBtn.onclick = () => this.switchTab('shop');
        if (proceedBtn) proceedBtn.onclick = () => this.manualCheckout();
    }

    updateCartItemQuantity(productId, delta) {
        const item = this.state.cart.find(i => i.id === productId);
        if (!item) return;
        item.quantity += delta;
        if (item.quantity <= 0) {
            this.state.cart = this.state.cart.filter(i => i.id !== productId);
        }
    }

    removeFromCart(productId) {
        this.state.cart = this.state.cart.filter(i => i.id !== productId);
        this.addToTimeline('Item removed', `Removed product ${productId} from cart`);
        this.addAgentRequest(`Cart item removed: ${productId}`);
    }

    manualCheckout() {
        // Ensure cart mandate exists from current cart contents
        const products = this.state.cart.map(({ id, name, price }) => ({ id, name, price }));
        if (products.length === 0) return;
        // Apply scenario pre-checkout adjustments
        const cartMandate = this.createCartMandate(products);
        cartMandate.contents = this.scenarioEngine.applyPreCheckout(cartMandate.contents);
        this.state.currentMandates.cart = cartMandate;
        this.updateMandateInspector();
        this.initiatePayment();
    }

    // Enhanced modules - safe placeholders
    initDashboard() {
        const root = document.getElementById('dashboard-root');
        if (!root) return;
        root.innerHTML = '<div class="text-secondary">KPIs and charts will appear here.</div>';
    }

    initRiskConsole() {
        const root = document.getElementById('risk-root');
        if (!root) return;
        root.innerHTML = '<div class="text-secondary">Risk log and policy editor coming soon.</div>';
    }

    initPaymentsOps() {
        const root = document.getElementById('payments-root');
        if (!root) return;
        root.innerHTML = '<div class="text-secondary">Transactions will list here.</div>';
    }

    initMandateOps() {
        const root = document.getElementById('mandates-root');
        if (!root) return;
        root.innerHTML = '<div class="text-secondary">Mandate registry viewer coming soon.</div>';
    }

    initSimulator() {
        const root = document.getElementById('simulator-root');
        if (!root) return;
        root.innerHTML = '<div id="simControls"></div>';
        this.renderSimulatorControls();
    }

    renderSimulatorControls() {
        const sc = document.getElementById('simControls');
        if (!sc) return;
        sc.innerHTML = '';
        const mkToggle = (key, label) => {
            const id = `sim_${key}`;
            sc.insertAdjacentHTML('beforeend', `<label style="display:inline-flex; align-items:center; gap:6px; margin:4px 8px 4px 0;"><input type="checkbox" id="${id}"> ${label}</label>`);
            const el = document.getElementById(id);
            if (el) el.addEventListener('change', (e) => { this.scenarioEngine.flags[key] = e.target.checked; });
        };
        mkToggle('randomize', 'Randomize');
        mkToggle('outOfStock', 'Out of stock');
        mkToggle('priceChange', 'Price change');
        mkToggle('shippingRecalc', 'Shipping recalculation');
        mkToggle('cardDecline_insufficientFunds', 'Card decline: Insufficient funds');
        mkToggle('cardDecline_suspectedFraud', 'Card decline: Suspected fraud');
        mkToggle('otpFail', 'OTP fail');
        mkToggle('networkError', 'Network error');
        mkToggle('gasTooLow', 'Crypto: gas too low');
        mkToggle('wrongChain', 'Crypto: wrong chain');
        mkToggle('settlementDelay', 'Settlement delay');
        mkToggle('reconciliationMismatch', 'Reconciliation mismatch');
    }

    initReports() {
        const root = document.getElementById('reports-root');
        if (!root) return;
        root.innerHTML = '<button class="btn btn--secondary btn--sm" id="exportCsv">Export CSV</button>';
        const btn = document.getElementById('exportCsv');
        if (btn) btn.addEventListener('click', () => this.exportCsv());
    }

    exportCsv() {
        const lines = ['timestamp,event,description'];
        this.state.timeline.forEach(t => {
            const row = `${t.timestamp},${t.event.replaceAll(',', ';')},${t.description.replaceAll(',', ';')}`;
            lines.push(row);
        });
        const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ap2_timeline_${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    initAdmin() {
        const root = document.getElementById('admin-root');
        if (!root) return;
        root.innerHTML = '<div class="text-secondary">Feature flags and settings will appear here.</div>';
    }

    addAgentRequest(message) {
        const monitor = document.getElementById('agent-monitor');
        const timestamp = new Date().toLocaleTimeString();
        
        const requestDiv = document.createElement('div');
        requestDiv.className = 'agent-request';
        requestDiv.innerHTML = `<strong>${timestamp}</strong><br>${message}`;
        
        monitor.insertBefore(requestDiv, monitor.firstChild);
        
        // Keep only last 5 requests
        const requests = monitor.querySelectorAll('.agent-request');
        if (requests.length > 5) {
            requests[requests.length - 1].remove();
        }
        
        // Clear "no requests" message
        const noRequests = monitor.querySelector('.text-secondary');
        if (noRequests) noRequests.remove();
    }

    renderAgents() {
        const agentList = document.getElementById('agent-list');
        agentList.innerHTML = this.data.agents.map(agent => `
            <div class="agent-item">
                <div>
                    <div class="agent-name">${agent.name}</div>
                    <div class="text-secondary" style="font-size: var(--font-size-xs);">${agent.description}</div>
                </div>
                <div class="status status--success">Online</div>
            </div>
        `).join('');
    }

    renderPromptButtons() {
        const container = document.getElementById('prompt-buttons');
        container.innerHTML = this.data.samplePrompts.map(prompt => `
            <button class="prompt-btn" onclick="demo.useSamplePrompt('${prompt}')">${prompt}</button>
        `).join('');
    }

    useSamplePrompt(prompt) {
        document.getElementById('chat-input').value = prompt;
        this.sendChatMessage();
    }

    async sendChatMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        if (!message) return;

        // Add user message to chat
        this.addChatMessage('user', message);
        input.value = '';

        // Process the message through the agent flow
        await this.processShoppingIntent(message);
    }

    addChatMessage(type, message, data = null) {
        const chatHistory = document.getElementById('chat-history');
        const timestamp = new Date().toLocaleTimeString();
        
        let messageClass = `chat-message--${type}`;
        let sender = type === 'user' ? 'You' : type === 'system' ? 'Shopping Agent' : 'Agent';
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${messageClass}`;
        
        if (data && type === 'agent') {
            messageDiv.innerHTML = `
                <strong>${sender}:</strong> ${message}
                <div style="margin-top: 8px; font-size: var(--font-size-xs); background: var(--color-background); padding: 8px; border-radius: 4px;">
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
        }
        
        chatHistory.appendChild(messageDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;

        this.state.chatHistory.push({ type, message, data, timestamp: new Date() });
    }

    async processShoppingIntent(userMessage) {
        // Step 1: Create Intent Mandate
        await this.sleep(500);
        this.updateFlowStep(1);
        
        const intentMandate = this.createIntentMandate(userMessage);
        this.state.currentMandates.intent = intentMandate;
        this.updateMandateInspector();
        
        this.addChatMessage('agent', 'I\'ve created an intent mandate based on your request. Let me search for products...', intentMandate);
        this.addToTimeline('Intent Mandate Created', 'User shopping intent processed');
        this.addAgentRequest(`Intent created: ${userMessage}`);

        // Step 2: Product Search
        await this.sleep(1000);
        this.updateFlowStep(2);
        
        const matchingProducts = this.searchProducts(userMessage, intentMandate.max_amount);
        this.addChatMessage('agent', `Found ${matchingProducts.length} matching products. Creating cart options...`);
        this.addToTimeline('Product Search Complete', `${matchingProducts.length} products found`);
        this.addAgentRequest(`Product search: ${matchingProducts.length} products found`);

        // Step 3: Create Cart Mandate
        await this.sleep(800);
        this.updateFlowStep(3);
        
        if (matchingProducts.length > 0) {
            const cartMandate = this.createCartMandate(matchingProducts);
            this.state.currentMandates.cart = cartMandate;
            this.updateMandateInspector();
            
            this.addChatMessage('agent', 'I\'ve created a cart with the best matching products. Would you like to proceed with payment?');
            this.addToTimeline('Cart Mandate Created', 'Shopping cart prepared');
            this.addAgentRequest(`Cart created with ${matchingProducts.length} items`);
            
            // Show products in a nice format
            const productList = matchingProducts.map(p => `• ${p.name} - $${p.price}`).join('\n');
            this.addChatMessage('system', `Cart Contents:\n${productList}\nTotal: $${cartMandate.contents.total}`);
            
            // Auto-proceed to payment after a moment
            setTimeout(() => this.initiatePayment(), 2000);
        } else {
            this.addChatMessage('agent', 'Sorry, I couldn\'t find any products matching your criteria. Please try a different search.');
            this.resetFlow();
        }
    }

    createIntentMandate(userMessage) {
        const maxAmount = this.extractMaxAmount(userMessage) || 200;
        const categories = this.extractCategories(userMessage);
        
        return {
            id: this.generateUUID(),
            user_cart_confirmation_required: true,
            natural_language_description: userMessage,
            max_amount: maxAmount,
            merchants: ["demo_merchant"],
            categories: categories,
            intent_expiry: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
            user_signature: "sig_" + this.generateUUID().substring(0, 8),
            timestamp: new Date().toISOString()
        };
    }

    createCartMandate(products) {
        const subtotal = products.reduce((sum, p) => sum + p.price, 0);
        const tax = subtotal * 0.08; // 8% tax
        const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
        const total = subtotal + tax + shipping;

        return {
            contents: {
                id: this.generateUUID(),
                items: products.map(p => ({
                    product_id: p.id,
                    name: p.name,
                    price: p.price,
                    quantity: 1
                })),
                subtotal: Math.round(subtotal * 100) / 100,
                tax: Math.round(tax * 100) / 100,
                shipping: Math.round(shipping * 100) / 100,
                total: Math.round(total * 100) / 100,
                currency: "USD",
                merchant_name: "Demo Merchant",
                cart_expiry: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
                payment_methods_accepted: ["card", "crypto", "bank_transfer"]
            },
            merchant_authorization: "jwt_" + this.generateUUID().substring(0, 16),
            timestamp: new Date().toISOString()
        };
    }

    createPaymentMandate(paymentMethodId) {
        const cartMandate = this.state.currentMandates.cart;
        if (!cartMandate) return null;

        return {
            contents: {
                payment_mandate_id: this.generateUUID(),
                cart_mandate_id: cartMandate.contents.id,
                payment_method_token: paymentMethodId,
                amount: cartMandate.contents.total,
                currency: "USD",
                merchant_id: "demo_merchant",
                timestamp: new Date().toISOString()
            },
            user_authorization: "auth_" + this.generateUUID().substring(0, 12),
            risk_data: {
                ip_address: "192.168.1.1",
                device_fingerprint: "fp_" + this.generateUUID().substring(0, 8),
                geolocation: "San Francisco, CA"
            },
            timestamp: new Date().toISOString()
        };
    }

    searchProducts(query, maxAmount) {
        const queryLower = query.toLowerCase();
        const searchTerms = queryLower.split(' ').filter(term => term.length > 2);
        
        return this.data.products.filter(product => {
            const matchesPrice = product.price <= maxAmount;
            
            // Enhanced search logic - more flexible matching
            const productText = [
                product.name,
                product.description,
                product.category,
                ...product.features
            ].join(' ').toLowerCase();
            
            // Check if any search term matches any part of the product text
            const matchesQuery = searchTerms.length === 0 || searchTerms.some(term => {
                return productText.includes(term) || 
                       product.name.toLowerCase().includes(term) ||
                       product.description.toLowerCase().includes(term) ||
                       product.category.toLowerCase().includes(term) ||
                       product.features.some(feature => feature.toLowerCase().includes(term));
            });
            
            // Also check for common synonyms and related terms
            const hasRelevantKeywords = this.checkRelevantKeywords(queryLower, product);
            
            return matchesPrice && (matchesQuery || hasRelevantKeywords);
        }).slice(0, 3); // Limit to 3 products for demo
    }

    checkRelevantKeywords(query, product) {
        const productName = product.name.toLowerCase();
        const productDesc = product.description.toLowerCase();
        
        // Define keyword mappings for better search
        const keywordMaps = {
            'headphones': ['wireless headphones', 'headphone', 'audio', 'noise'],
            'wireless': ['wireless headphones', 'wireless charger', 'bluetooth'],
            'watch': ['smart watch', 'smartwatch', 'fitness', 'health'],
            'coffee': ['coffee maker', 'coffee machine', 'drip'],
            'speaker': ['bluetooth speaker', 'wireless speaker', 'sound', 'audio'],
            'laptop': ['laptop stand', 'stand', 'computer'],
            'charger': ['wireless charger', 'charging', 'qi'],
            'bluetooth': ['bluetooth speaker', 'wireless'],
            'fitness': ['smart watch', 'health', 'tracking'],
            'sound': ['speaker', 'headphones', 'audio'],
            'electronics': ['headphones', 'watch', 'speaker', 'charger']
        };
        
        for (const [keyword, relatedTerms] of Object.entries(keywordMaps)) {
            if (query.includes(keyword)) {
                return relatedTerms.some(term => 
                    productName.includes(term) || productDesc.includes(term)
                );
            }
        }
        
        return false;
    }

    extractMaxAmount(message) {
        const match = message.match(/under\s+\$?(\d+)/i) || message.match(/\$(\d+)/);
        return match ? parseInt(match[1]) : null;
    }

    extractCategories(message) {
        const categories = [];
        if (/headphone|audio|speaker|sound|wireless|bluetooth/i.test(message)) categories.push('electronics');
        if (/watch|smart|fitness|health/i.test(message)) categories.push('electronics');
        if (/coffee|maker|kitchen|drip/i.test(message)) categories.push('appliances');
        if (/stand|laptop|desk|computer/i.test(message)) categories.push('accessories');
        if (/electronics?|electronic/i.test(message)) categories.push('electronics');
        return categories.length > 0 ? categories : [];
    }

    async initiatePayment() {
        this.updateFlowStep(4);
        this.addChatMessage('agent', 'Initiating payment process. Please select your payment method.');
        this.addToTimeline('Payment Initiated', 'Payment method selection required');
        this.addAgentRequest('Payment process initiated');
        
        this.showPaymentModal();
    }

    showPaymentModal() {
        const modal = document.getElementById('payment-modal');
        const paymentMethods = document.getElementById('payment-methods');
        
        paymentMethods.innerHTML = this.data.paymentMethods.map(method => `
            <div class="payment-method" data-method-id="${method.id}">
                <input type="radio" name="payment_method" value="${method.id}" id="method_${method.id}">
                <div class="payment-method-info">
                    <div class="payment-method-name">${method.name}</div>
                    <div class="payment-method-details">
                        ${method.type === 'card' ? `•••• ${method.last_four}` : 
                          method.type === 'crypto' ? method.address : 
                          `Account •••• ${method.account_ending}`}
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners to payment methods
        document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', () => {
                document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('payment-method--selected'));
                method.classList.add('payment-method--selected');
                method.querySelector('input').checked = true;
                this.state.selectedPaymentMethod = method.dataset.methodId;
                
                // Auto-proceed after selection
                setTimeout(() => this.processPayment(), 1000);
            });
        });

        modal.classList.remove('hidden');
    }

    async processPayment() {
        if (!this.state.selectedPaymentMethod) return;

        const paymentMethod = this.data.paymentMethods.find(m => m.id === this.state.selectedPaymentMethod);
        
        // Create payment mandate
        const paymentMandate = this.createPaymentMandate(this.state.selectedPaymentMethod);
        this.state.currentMandates.payment = paymentMandate;
        this.updateMandateInspector();

        this.addToTimeline('Payment Mandate Created', `Using ${paymentMethod.name}`);
        this.addAgentRequest(`Payment method selected: ${paymentMethod.name}`);

        // Show OTP step if payment method supports it
        if (paymentMethod.supports_otp) {
            document.getElementById('payment-method-step').classList.add('hidden');
            document.getElementById('otp-step').classList.remove('hidden');
            this.addToTimeline('OTP Challenge Sent', 'Verification code sent to device');
            this.addAgentRequest('OTP verification required');
        } else {
            // Process crypto payment directly
            await this.completePayment();
        }
    }

    async verifyOTP() {
        const otpInput = document.getElementById('otp-input');
        const otp = otpInput.value.trim();
        
        if (otp.length !== 6) {
            alert('Please enter a 6-digit OTP code');
            return;
        }

        // Simulate OTP verification
        await this.sleep(1000);
        
        if (otp === '123456' || otp.length === 6) { // Accept any 6-digit code for demo
            this.addToTimeline('OTP Verified', 'Payment authorized');
            this.addAgentRequest('OTP verification successful');
            await this.completePayment();
        } else {
            alert('Invalid OTP code. Please try again.');
        }
    }

    async completePayment() {
        this.updateFlowStep(5);
        
        // Simulate payment processing
        await this.sleep(1500);
        
        const cartMandate = this.state.currentMandates.cart;
        const paymentMethod = this.data.paymentMethods.find(m => m.id === this.state.selectedPaymentMethod);
        
        // Show success step
        document.getElementById('otp-step').classList.add('hidden');
        document.getElementById('success-step').classList.remove('hidden');
        
        // Generate receipt
        const receipt = document.getElementById('receipt');
        receipt.innerHTML = `
            <h4 style="margin-bottom: 12px;">Transaction Receipt</h4>
            <div class="receipt-item"><span>Transaction ID:</span><span>tx_${this.generateUUID().substring(0, 8)}</span></div>
            <div class="receipt-item"><span>Date:</span><span>${new Date().toLocaleDateString()}</span></div>
            <div class="receipt-item"><span>Payment Method:</span><span>${paymentMethod.name}</span></div>
            <div class="receipt-item"><span>Subtotal:</span><span>$${cartMandate.contents.subtotal}</span></div>
            <div class="receipt-item"><span>Tax:</span><span>$${cartMandate.contents.tax}</span></div>
            <div class="receipt-item"><span>Shipping:</span><span>$${cartMandate.contents.shipping}</span></div>
            <div class="receipt-total"><span>Total:</span><span>$${cartMandate.contents.total}</span></div>
        `;

        this.addToTimeline('Payment Complete', `$${cartMandate.contents.total} charged successfully`);
        this.addChatMessage('agent', 'Payment successful! Your transaction has been completed.');
        this.addAgentRequest(`Transaction completed: $${cartMandate.contents.total}`);
        
        // Close modal after a delay
        setTimeout(() => {
            this.closePaymentModal();
            this.resetFlow();
        }, 5000);
    }

    closePaymentModal() {
        document.getElementById('payment-modal').classList.add('hidden');
        
        // Reset modal steps
        document.getElementById('payment-method-step').classList.remove('hidden');
        document.getElementById('otp-step').classList.add('hidden');
        document.getElementById('success-step').classList.add('hidden');
        
        this.state.selectedPaymentMethod = null;
    }

    updateFlowStep(step) {
        this.state.currentFlow.step = step;
        this.updateFlowVisualization();
    }

    updateFlowVisualization() {
        document.querySelectorAll('.flow-step').forEach((stepEl, index) => {
            if (index < this.state.currentFlow.step) {
                stepEl.classList.add('flow-step--active');
            } else {
                stepEl.classList.remove('flow-step--active');
            }
        });

        // Update mandate chain
        document.querySelectorAll('.chain-step').forEach((stepEl, index) => {
            if (index < this.state.currentFlow.step - 1) {
                stepEl.classList.add('chain-step--active');
            } else {
                stepEl.classList.remove('chain-step--active');
            }
        });
    }

    resetFlow() {
        this.state.currentFlow.step = 0;
        this.updateFlowVisualization();
    }

    addToTimeline(event, description) {
        const timestamp = new Date().toLocaleTimeString();
        this.state.timeline.unshift({ event, description, timestamp });
        
        const timeline = document.getElementById('timeline');
        timeline.innerHTML = this.state.timeline.map(item => `
            <div class="timeline-item">
                <div class="timeline-time">${item.timestamp}</div>
                <div class="timeline-event">${item.event}</div>
                <div class="text-secondary">${item.description}</div>
            </div>
        `).join('');
    }

    switchMandateTab(mandateType) {
        // Update tab buttons
        document.querySelectorAll('.mandate-tab').forEach(tab => {
            tab.classList.remove('mandate-tab--active');
        });
        document.querySelector(`[data-mandate="${mandateType}"]`).classList.add('mandate-tab--active');

        // Update panels
        document.querySelectorAll('.mandate-panel').forEach(panel => {
            panel.classList.remove('mandate-panel--active');
        });
        document.getElementById(`${mandateType}-mandate-panel`).classList.add('mandate-panel--active');
    }

    updateMandateInspector() {
        // Update mandate JSON displays
        const intentJson = document.getElementById('intent-mandate-json');
        const cartJson = document.getElementById('cart-mandate-json');
        const paymentJson = document.getElementById('payment-mandate-json');

        intentJson.textContent = this.state.currentMandates.intent ? 
            JSON.stringify(this.state.currentMandates.intent, null, 2) : 
            'No intent mandate generated yet';

        cartJson.textContent = this.state.currentMandates.cart ? 
            JSON.stringify(this.state.currentMandates.cart, null, 2) : 
            'No cart mandate generated yet';

        paymentJson.textContent = this.state.currentMandates.payment ? 
            JSON.stringify(this.state.currentMandates.payment, null, 2) : 
            'No payment mandate generated yet';

        // Update validation status
        this.updateValidationStatus();
        
        // Update mandate preview in agent interface
        const mandatePreview = document.getElementById('mandate-preview');
        const currentMandate = this.state.currentMandates.payment || 
                             this.state.currentMandates.cart || 
                             this.state.currentMandates.intent;
        
        if (currentMandate) {
            mandatePreview.innerHTML = `<pre>${JSON.stringify(currentMandate, null, 2).substring(0, 200)}...</pre>`;
        } else {
            mandatePreview.innerHTML = '<p class="text-secondary">No active mandate</p>';
        }
    }

    updateValidationStatus() {
        const intentValidation = document.getElementById('intent-validation');
        const cartValidation = document.getElementById('cart-validation');
        const paymentValidation = document.getElementById('payment-validation');

        // Update based on current mandates
        if (this.state.currentMandates.intent) {
            intentValidation.textContent = 'Valid';
            intentValidation.className = 'status status--success';
        }

        if (this.state.currentMandates.cart) {
            cartValidation.textContent = 'Valid';
            cartValidation.className = 'status status--success';
        }

        if (this.state.currentMandates.payment) {
            paymentValidation.textContent = 'Valid';
            paymentValidation.className = 'status status--success';
        }
    }

    renderMandateInspector() {
        this.updateMandateInspector();
    }

    exportMandates() {
        const mandates = {
            intent: this.state.currentMandates.intent,
            cart: this.state.currentMandates.cart,
            payment: this.state.currentMandates.payment,
            exported_at: new Date().toISOString()
        };

        const dataStr = JSON.stringify(mandates, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `ap2_mandates_${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // Utility functions
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the demo when the page loads
let demo;
document.addEventListener('DOMContentLoaded', () => {
    demo = new AP2Demo();
});

// Make demo available globally for onclick handlers
window.demo = demo;

// ScenarioEngine implementation
class ScenarioEngine {
    constructor() {
        this.flags = {
            randomize: false,
            outOfStock: false,
            priceChange: false,
            shippingRecalc: false,
            cardDecline_insufficientFunds: false,
            cardDecline_suspectedFraud: false,
            otpFail: false,
            networkError: false,
            gasTooLow: false,
            wrongChain: false,
            settlementDelay: false,
            reconciliationMismatch: false
        };
        this.rates = {
            otpDeliveryFailRate: 0.05,
            networkDropRate: 0.02
        };
        this.seed = 42;
    }

    random() {
        const x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }

    shouldTrigger(key) {
        if (!this.flags[key]) return false;
        if (!this.flags.randomize) return true;
        const rate = this.rates[key] || 0.1;
        return this.random() < rate;
    }

    applyPreCheckout(contents) {
        const updated = { ...contents };
        if (this.shouldTrigger('outOfStock') && updated.items?.length) {
            updated.items[0].in_stock = false;
        }
        if (this.shouldTrigger('priceChange') && updated.items?.length) {
            updated.items[0].price = Math.round((updated.items[0].price + 7.5) * 100) / 100;
            updated.subtotal = Math.round(updated.items.reduce((s, it) => s + it.price * (it.quantity || 1), 0) * 100) / 100;
            updated.tax = Math.round(updated.subtotal * 0.08 * 100) / 100;
            updated.total = Math.round((updated.subtotal + updated.tax + updated.shipping) * 100) / 100;
        }
        if (this.shouldTrigger('shippingRecalc')) {
            updated.shipping = Math.round((updated.shipping + 3.99) * 100) / 100;
            updated.total = Math.round((updated.subtotal + updated.tax + updated.shipping) * 100) / 100;
        }
        return updated;
    }
}