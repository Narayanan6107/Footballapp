import React, { useState } from 'react';
import '../styles/MilkProvider.css';

// --- Static Data for Consistency ---
const lowStockData = [
    { name: "Fresh Paneer", units: 12 },
    { name: "Flavored Yogurt", units: 8 },
    { name: "Desi Ghee", units: 5 },
];

const customerData = [
    { id: 1, name: 'Rajesh Kumar', area: 'HSR Layout, Bangalore', contact: 'rajesh@example.com', phone: '+91 98765 43210', subscription: 'Fresh Milk 1L', status: 'Active', joined: 'Jan 2025', details: 'High-value customer, prefers evening delivery.' },
    { id: 2, name: 'Priya Sharma', area: 'Koramangala, Bangalore', contact: 'priya@example.com', phone: '+91 98765 43211', subscription: 'Fresh Milk 1L', status: 'Active', joined: 'Feb 2025', details: 'Standard subscription, no issues.' },
    { id: 3, name: 'Amit Patel', area: 'Whitefield, Bangalore', contact: 'amit@example.com', phone: '+91 98765 43212', subscription: 'Milk 2L + Curd', status: 'Active', joined: 'Mar 2025', details: 'Large daily order, needs consistency.' },
    { id: 4, name: 'Sneha Reddy', area: 'Indiranagar, Bangalore', contact: 'sneha@example.com', phone: '+91 98765 43213', subscription: 'Fresh Milk 1L', status: 'Paused', joined: 'Apr 2025', details: 'Subscription paused due to vacation (until 15/01/2026).' },
];

// --- Modal Component for Add Product ---
const AddProductModal = ({ onClose, onSave }) => {
    // Simplified Modal with basic input
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>+ Add New Product</h3>
                <form>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" placeholder="e.g., Organic Cow Ghee 1kg" required />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select>
                            <option>Milk</option>
                            <option>Dairy</option>
                            <option>Ghee</option>
                        </select>
                    </div>
                    <div className="form-group-inline">
                        <div className="form-group">
                            <label>Price (₹)</label>
                            <input type="number" placeholder="550" required />
                        </div>
                        <div className="form-group">
                            <label>Stock (units)</label>
                            <input type="number" placeholder="50" required />
                        </div>
                    </div>
                    
                </form>
                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="btn-save" onClick={onSave}>Save Product</button>
                </div>
            </div>
        </div>
    );
};

// --- Customer Detail Component ---
const CustomerDetail = ({ customer, onBack }) => {
    if (!customer) return null;

    return (
        <div className="content-area customer-detail">
            <button className="back-button" onClick={onBack}>← Back to Customer List</button>
            <div className="customer-detail-header">
                <span className="initial-avatar large">{customer.name[0]}</span>
                <h2>{customer.name}</h2>
            </div>
            
            <div className="detail-grid">
                <div className="detail-card">
                    <h3>Contact Info</h3>
                    <p>📧 {customer.contact}</p>
                    <p>📱 {customer.phone}</p>
                    <p>📍 {customer.area}</p>
                </div>
                <div className="detail-card">
                    <h3>Subscription</h3>
                    <p className="sub-detail-text">**{customer.subscription}**</p>
                    <p>Status: <span className={`status-badge ${customer.status === 'Active' ? 'success' : 'warning'}`}>{customer.status}</span></p>
                    <p>Joined: {customer.joined}</p>
                </div>
                <div className="detail-card full-width">
                    <h3>Notes</h3>
                    <blockquote className="notes-box">{customer.details}</blockquote>
                </div>
            </div>

            <button className="action-btn primary large-btn" style={{marginTop: '20px'}}>Edit Customer Profile</button>
        </div>
    );
};

// --- Dashboard, Orders, Earnings, Settings components remain the same ---

const Dashboard = () => (
    <div className="content-area dashboard">
      <h2>Welcome back, Green Valley Dairy!</h2>
      {/* Top Stat Cards Grid */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <h3>Active Customers 🧑‍🤝‍🧑</h3>
          <p className="stat-number">248</p>
          <p className="stat-detail">⬆️ +12 this week</p>
        </div>
        <div className="stat-card">
          <h3>Today's Orders 🛒</h3>
          <p className="stat-number">108</p>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: '75%' }}></div>
          </div>
          <p className="stat-detail">75% completed</p>
        </div>
        <div className="stat-card primary">
          <h3>Revenue Today ₹</h3>
          <p className="stat-number-currency">₹6,800</p>
          <p className="stat-detail">⬆️ +8% from yesterday</p>
        </div>
        <div className="stat-card danger">
          <h3>Pending Orders ⚠️</h3>
          <p className="stat-number">27</p>
          <button className="attention-button">Need attention</button>
        </div>
      </div>
  
      {/* Low Stock Alert Section */}
      <div className="low-stock-alert-card">
          <div className="alert-header">
              <span className="alert-icon">⚠️ Low Stock Alert</span>
              <span className="item-count">{lowStockData.length} items</span>
          </div>
          <p>Products that need restocking</p>
          <div className="alert-list">
              {lowStockData.map((item, index) => (
                  <div key={index} className="alert-item">
                      <span>{item.name} - **{item.units} units left**</span>
                      <span className="status-badge warning">Low Stock</span>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );

const Products = ({ onAddProduct }) => (
  <div className="content-area products">
    <h2>Product Management</h2>
    <p>Manage your product inventory</p>
    <button className="add-product-btn" onClick={onAddProduct}>+ Add Product</button> {/* <-- Action Hooked Here */}
    <table className="data-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Fresh Full Cream Milk 1L</td>
          <td>Milk</td>
          <td>₹60</td>
          <td>150 units</td>
          <td><span className="status-badge success">In Stock</span></td>
          <td><button className="action-btn">✏️</button><button className="action-btn danger">🗑️</button></td>
        </tr>
        <tr>
          <td>Organic Toned Milk 1L</td>
          <td>Milk</td>
          <td>₹55</td>
          <td>120 units</td>
          <td><span className="status-badge success">In Stock</span></td>
          <td><button className="action-btn">✏️</button><button className="action-btn danger">🗑️</button></td>
        </tr>
        <tr>
          <td>Fresh Paneer 200g</td>
          <td>Dairy</td>
          <td>₹90</td>
          <td>12 units</td> 
          <td><span className="status-badge warning">Low Stock</span></td>
          <td><button className="action-btn">✏️</button><button className="action-btn danger">🗑️</button></td>
        </tr>
        <tr>
          <td>Pure Desi Ghee 500ml</td>
          <td>Ghee</td>
          <td>₹550</td>
          <td>45 units</td> 
          <td><span className="status-badge success">In Stock</span></td>
          <td><button className="action-btn">✏️</button><button className="action-btn danger">🗑️</button></td>
        </tr>
        <tr>
          <td>Flavored Yogurt 200g</td>
          <td>Dairy</td>
          <td>₹35</td>
          <td>8 units</td>
          <td><span className="status-badge danger">Very Low</span></td>
          <td><button className="action-btn">✏️</button><button className="action-btn danger">🗑️</button></td>
        </tr>
      </tbody>
    </table>
  </div>
);

const Orders = () => (
    // ... Orders component content remains the same ...
    <div className="content-area orders">
      <h2>Orders Management</h2>
      <p>View and manage customer orders</p>
      <div className="search-filter-bar">
        <input type="text" placeholder="Search orders..." />
        <select><option>All Orders</option></select>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ORD-2401</td>
            <td>Rajesh Kumar</td>
            <td>Fresh Milk 1L, Curd 500g</td>
            <td>2</td>
            <td>₹100</td>
            <td><span className="status-badge pending">Pending</span></td>
            <td><button className="action-btn success">Mark Packed</button></td>
          </tr>
          <tr>
            <td>ORD-2402</td>
            <td>Priya Sharma</td>
            <td>Fresh Milk 1L</td>
            <td>1</td>
            <td>₹60</td>
            <td><span className="status-badge packed">Packed</span></td>
            <td><button className="action-btn primary">Request Pickup</button></td>
          </tr>
          <tr>
            <td>ORD-2403</td>
            <td>Amit Patel</td>
            <td>Paneer 200g, Ghee 500ml</td>
            <td>2</td>
            <td>₹640</td>
            <td><span className="status-badge transit">In Transit</span></td>
            <td><span className="text-status">Partner Assigned</span></td>
          </tr>
          <tr>
            <td>ORD-2404</td>
            <td>Sneha Reddy</td>
            <td>Fresh Milk 2L</td>
            <td>1</td>
            <td>₹120</td>
            <td><span className="status-badge success">Delivered</span></td>
            <td><span className="text-status success">Complete</span></td>
          </tr>
        </tbody>
      </table>
    </div>
);

const Customers = ({ onCustomerSelect }) => (
    <div className="content-area customers">
      <h2>Customer List</h2>
      <p>Manage your customer base</p>
      <div className="customer-stats">
        <div className="stat-card">
          <h3>Total Customers</h3>
          <p className="stat-number">248</p>
        </div>
        <div className="stat-card success">
          <h3>Active</h3>
          <p className="stat-number">235</p>
          <p className="stat-detail">95%</p>
        </div>
        <div className="stat-card">
          <h3>Paused</h3>
          <p className="stat-number">13</p>
          <p className="stat-detail">5%</p>
        </div>
      </div>
      <table className="data-table customer-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Contact</th>
            <th>Subscription</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customerData.map((customer) => (
              <tr key={customer.id}>
                  <td><span className="initial-avatar">{customer.name[0]}</span> {customer.name}</td>
                  <td>{customer.contact}</td>
                  <td>{customer.subscription}</td>
                  <td><span className={`status-badge ${customer.status === 'Active' ? 'success' : 'warning'}`}>{customer.status}</span></td>
                  <td>{customer.joined}</td>
                  <td>
                      <button 
                          className="action-btn primary" 
                          onClick={() => onCustomerSelect(customer)} // <-- Action Hooked Here
                      >
                          View Details
                      </button>
                  </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
);

const Earnings = () => <div className="content-area"><h2>Earnings</h2></div>;
const Settings = () => <div className="content-area"><h2>Settings</h2></div>;


// --- Main Component ---
export const MilkProvider = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCustomer, setSelectedCustomer] = useState(null); // State for Customer Details
  const [isProductModalOpen, setIsProductModalOpen] = useState(false); // State for Add Product Modal

  // Helper function to render content based on current state
  const renderContent = () => {
    // Priority 1: Customer Detail View
    if (activeTab === 'Customers' && selectedCustomer) {
        return <CustomerDetail customer={selectedCustomer} onBack={() => setSelectedCustomer(null)} />;
    }

    // Priority 2: Main Tab Views
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Products':
        return <Products onAddProduct={() => setIsProductModalOpen(true)} />;
      case 'Orders':
        return <Orders />;
      case 'Customers':
        return <Customers onCustomerSelect={setSelectedCustomer} />;
      case 'Earnings':
        return <Earnings />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  // Helper function to handle sidebar navigation and reset customer view
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSelectedCustomer(null); // Reset detail view when switching tabs
  };

  const navItems = [
    { name: 'Dashboard', icon: '🏠' },
    { name: 'Products', icon: '📦' },
    { name: 'Orders', icon: '🛒' },
    { name: 'Customers', icon: '👥' },
    { name: 'Earnings', icon: '💰' },
    { name: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="milk-provider-portal">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          MilkMate
        </div>
        <p className="portal-label">Provider Portal</p>
        <nav className="nav-menu">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`nav-item ${activeTab === item.name ? 'active' : ''}`}
              onClick={() => handleTabChange(item.name)}
            >
              {item.icon} {item.name}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Header */}
        <header className="top-header">
          <h1>Welcome back, Green Valley Dairy!</h1>
          <div className="user-profile">
            <span className="notification-badge">3</span>
            <span className="user-avatar">G</span> Green Valley ...
          </div>
        </header>

        {/* Content Renderer */}
        {renderContent()}
      </main>

      {/* Modal is rendered outside main for positioning */}
      {isProductModalOpen && (
          <AddProductModal 
              onClose={() => setIsProductModalOpen(false)}
              onSave={() => {
                  alert('Product saved successfully!');
                  setIsProductModalOpen(false);
              }}
          />
      )}
    </div>
  );
};