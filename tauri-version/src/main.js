const { invoke } = window.__TAURI__.core;

// State
let services = [];
let orders = [];

// DOM Elements
const views = document.querySelectorAll('.view');
const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('page-title');
const modal = document.getElementById('order-modal');
const orderServiceSelect = document.getElementById('order-service');

// Initialization
window.addEventListener('DOMContentLoaded', async () => {
  setupNavigation();
  setupModal();
  await refreshData();

  // Auto-refresh every 30 seconds
  setInterval(refreshData, 30000);
});

// Navigation
function setupNavigation() {
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = item.dataset.tab;

      // Update active state
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      // Show view
      views.forEach(view => view.classList.remove('active'));
      const view = document.getElementById(`view-${tab}`);
      if (view) view.classList.add('active');

      // Update title
      pageTitle.textContent = item.textContent.trim();
    });
  });
}

// Data Fetching
async function refreshData() {
  try {
    const stats = await invoke('get_hub_stats');
    updateStats(stats);

    services = await invoke('get_services');
    renderInventory();
    updateServiceSelect();

    // Mock fetching orders for now since we don't have a get_orders command yet
    // In a real app, we would add get_orders to commands.rs
    // orders = await invoke('get_orders'); 
    renderOrders();

  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

function updateStats(stats) {
  document.getElementById('stat-orders').textContent = stats.total_orders;
  document.getElementById('stat-active').textContent = stats.active_rentals;
  document.getElementById('stat-revenue').textContent = stats.revenue.toLocaleString('en-IN');
}

// Rendering
function renderInventory() {
  const grid = document.getElementById('inventory-grid');
  grid.innerHTML = services.map(service => `
        <div class="inventory-item">
            <div class="item-badge">${service.category}</div>
            <h3>${service.name}</h3>
            <p style="color: var(--text-secondary); font-size: 0.875rem; margin: 0.5rem 0;">
                ${service.description}
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                <span style="font-weight: 600;">₹${service.price_per_hour}/hr</span>
                <span style="color: ${service.available ? 'var(--success)' : 'var(--text-secondary)'}">
                    ${service.available ? '● Available' : '○ Rented'}
                </span>
            </div>
        </div>
    `).join('');
}

function renderOrders() {
  // Mock orders for demonstration if empty
  if (orders.length === 0) {
    const tbody = document.getElementById('recent-orders-table');
    tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: var(--text-secondary);">
                    No recent orders found. Create one to get started!
                </td>
            </tr>
        `;
    return;
  }

  // Render actual orders would go here
}

// Modal Handling
function setupModal() {
  const btn = document.getElementById('new-order-btn');
  const closeBtn = document.getElementById('close-modal');
  const form = document.getElementById('order-form');

  btn.addEventListener('click', () => {
    modal.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const serviceId = parseInt(document.getElementById('order-service').value);
    const service = services.find(s => s.id === serviceId);
    const duration = parseInt(document.getElementById('order-duration').value);

    const order = {
      service_id: serviceId,
      user_name: document.getElementById('order-user').value,
      village: document.getElementById('order-village').value,
      start_time: new Date().toISOString(), // Rust expects RFC3339
      duration_hours: duration,
      total_price: service.price_per_hour * duration,
      status: "active"
    };

    try {
      await invoke('create_order', { order });
      modal.classList.remove('active');
      form.reset();
      await refreshData();
      alert('Order created successfully!');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order: ' + error);
    }
  });
}

function updateServiceSelect() {
  orderServiceSelect.innerHTML = services
    .filter(s => s.available)
    .map(s => `<option value="${s.id}">${s.name} (₹${s.price_per_hour}/hr)</option>`)
    .join('');
}

// Refresh button
document.getElementById('refresh-btn').addEventListener('click', refreshData);
