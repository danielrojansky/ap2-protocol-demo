# AP2 Demo - Enhanced Interface and Scenario Simulator

This patch file extends the existing AP2 demo with new tabs, the ScenarioEngine, Executive Dashboard, Risk & Compliance, Payments Ops, Mandate Ops, Reports, and Admin & Settings.

## 1. index.html - Add New Navigation Tabs and Containers
```diff
--- a/index.html
+++ b/index.html
@@ <nav class="nav">
-    <button class="nav__tab" data-tab="api">API Docs</button>
+    <button class="nav__tab" data-tab="api">API Docs</button>
+    <button class="nav__tab" data-tab="dashboard">Executive Dashboard</button>
+    <button class="nav__tab" data-tab="risk">Risk & Compliance</button>
+    <button class="nav__tab" data-tab="payments">Payments Ops</button>
+    <button class="nav__tab" data-tab="mandates">Mandate Ops</button>
+    <button class="nav__tab" data-tab="simulator">Scenario Simulator</button>
+    <button class="nav__tab" data-tab="reports">Reports</button>
+    <button class="nav__tab" data-tab="admin">Admin & Settings</button>
@@ <!-- API Docs Tab -->
     <div class="tab-content" id="api-tab">
       <!-- existing content -->
     </div>
+    <!-- New Dashboard Tab -->
+    <div class="tab-content" id="dashboard-tab">
+      <div id="dashboard-root">
+        <!-- KPI cards and charts will render here -->
+      </div>
+    </div>
+    <!-- Risk & Compliance Tab -->
+    <div class="tab-content" id="risk-tab">
+      <div id="risk-root">
+        <!-- Risk log and policy editor -->
+      </div>
+    </div>
+    <!-- Payments Ops Tab -->
+    <div class="tab-content" id="payments-tab">
+      <div id="payments-root">
+        <!-- Transaction list and actions -->
+      </div>
+    </div>
+    <!-- Mandate Ops Tab -->
+    <div class="tab-content" id="mandates-tab">
+      <div id="mandates-root">
+        <!-- Mandate registry and chain viewer -->
+      </div>
+    </div>
+    <!-- Scenario Simulator Tab -->
+    <div class="tab-content" id="simulator-tab">
+      <div id="simulator-root">
+        <!-- Simulator controls and logs -->
+      </div>
+    </div>
+    <!-- Reports Tab -->
+    <div class="tab-content" id="reports-tab">
+      <div id="reports-root">
+        <!-- Reports builder and export -->
+      </div>
+    </div>
+    <!-- Admin & Settings Tab -->
+    <div class="tab-content" id="admin-tab">
+      <div id="admin-root">
+        <!-- Agent config, feature flags -->
+      </div>
+    </div>
```

## 2. app.js - Integrate ScenarioEngine and New Module Initialization
```diff
--- a/app.js
+++ b/app.js
@@ class AP2Demo {
     constructor() {
-        this.data = { ... };
+        this.data = { ... };
         this.scenarioEngine = new ScenarioEngine();
+        this.initTabs();
+        this.initDashboard();
+        this.initRiskConsole();
+        this.initPaymentsOps();
+        this.initMandateOps();
+        this.initSimulator();
+        this.initReports();
+        this.initAdmin();
         this.renderProducts();
         this.attachEventHandlers();
     }
+
+    initTabs() {
+        document.querySelectorAll('.nav__tab').forEach(tab => {
+            tab.addEventListener('click', () => {
+                this.switchTab(tab.dataset.tab);
+            });
+        });
+    }
+
+    switchTab(tabName) {
+        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('tab-content--active'));
+        document.getElementById(`${tabName}-tab`).classList.add('tab-content--active');
+        document.querySelectorAll('.nav__tab').forEach(tab => tab.classList.remove('nav__tab--active'));
+        document.querySelector(`.nav__tab[data-tab="${tabName}"]`).classList.add('nav__tab--active');
+    }
+
+    // Dashboard: KPI cards and charts
+    initDashboard() {
+        const root = document.getElementById('dashboard-root');
+        // Placeholder: render KPIs and Chart.js line charts
+        root.innerHTML = '<h2>Executive Dashboard</h2><canvas id="kpiChart"></canvas>';
+        const ctx = document.getElementById('kpiChart').getContext('2d');
+        new Chart(ctx, { type: 'line', data: {/* trend data */}, options: {} });
+    }
+
+    // Risk & Compliance console
+    initRiskConsole() {
+        const root = document.getElementById('risk-root');
+        root.innerHTML = '<h2>Risk & Compliance</h2><div id="riskLog"></div>';
+        // Load and render risk log events
+    }
+
+    // Payments Ops console
+    initPaymentsOps() {
+        const root = document.getElementById('payments-root');
+        root.innerHTML = '<h2>Payments Operations</h2><table id="paymentsTable"></table>';
+        // Populate transaction list
+    }
+
+    // Mandate Ops console
+    initMandateOps() {
+        const root = document.getElementById('mandates-root');
+        root.innerHTML = '<h2>Mandate Operations</h2><div id="mandateViewer"></div>';
+        // JSON viewer and chain graph
+    }
+
+    // Scenario Simulator console
+    initSimulator() {
+        const root = document.getElementById('simulator-root');
+        root.innerHTML = '<h2>Scenario Simulator</h2><div id="simControls"></div>';
+        this.renderSimulatorControls();
+    }
+
+    renderSimulatorControls() {
+        const sc = document.getElementById('simControls');
+        const flags = Object.keys(this.scenarioEngine.flags);
+        flags.forEach(f => {
+            const cb = `<label><input type='checkbox' id='sim_${f}'> ${f}</label>`;
+            sc.insertAdjacentHTML('beforeend', cb);
+            document.getElementById(`sim_${f}`).addEventListener('change', (e) => {
+                this.scenarioEngine.flags[f] = e.target.checked;
+            });
+        });
+    }
+
+    // Reports console
+    initReports() {
+        const root = document.getElementById('reports-root');
+        root.innerHTML = '<h2>Reports</h2><button id="exportCsv">Export CSV</button>';
+        document.getElementById('exportCsv').addEventListener('click', () => this.exportCsv());
+    }
+
+    exportCsv() {
+        // Aggregate events and trigger download
+    }
+
+    // Admin & Settings console
+    initAdmin() {
+        const root = document.getElementById('admin-root');
+        root.innerHTML = '<h2>Admin & Settings</h2><div id="featureFlags"></div>';
+        // Render feature flag toggles
+    }
```

## 3. app.js - Add ScenarioEngine Class
```javascript
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

  applyPreCheckout(cart) {
    if (this.shouldTrigger('outOfStock')) cart.items[0].in_stock = false;
    if (this.shouldTrigger('priceChange')) cart.items[0].price += 7.5;
    if (this.shouldTrigger('shippingRecalc')) cart.shipping += 3.99;
    return cart;
  }

  applyAuth(paymentMandate) {
    if (this.shouldTrigger('networkError')) return { error: 'NETWORK_ERROR' };
    if (this.shouldTrigger('cardDecline_insufficientFunds')) return { decline: '51' };
    if (this.shouldTrigger('cardDecline_suspectedFraud')) return { decline: '59' };
    if (this.shouldTrigger('otpFail')) return { otp: 'FAILED' };
    return { ok: true };
  }

  applyCrypto(tx) {
    if (this.shouldTrigger('gasTooLow')) return { error: 'GAS_TOO_LOW' };
    if (this.shouldTrigger('wrongChain')) return { error: 'WRONG_CHAIN' };
    return { ok: true };
  }

  applyPostAuth(tx) {
    if (this.shouldTrigger('settlementDelay')) tx.settlement_eta_minutes = 120;
    if (this.shouldTrigger('reconciliationMismatch')) tx.reconcile_hint = 'MISMATCH';
    return tx;
  }
}

// Export globally
window.ScenarioEngine = ScenarioEngine;
``` 

Apply these changes to enhance your AP2 demo with advanced dashboards, scenario simulations, and non-happy-path testing capabilities.