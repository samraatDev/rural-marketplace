# Bharat Rentals - Dual Frontend Marketplace

This repository contains two versions of the Bharat Rentals marketplace, designed to serve different user needs in the rural India ecosystem.

## 📂 Project Structure

### 1. [Web Version](./web-version/)
**Target Audience:** Customers / End Users
- **Tech Stack:** HTML5, CSS3, JavaScript (Vanilla)
- **Features:**
  - Mobile-first responsive design
  - Service browsing and discovery
  - Coverage map
  - Educational content
  - Accessible on any device with a browser

### 2. [Desktop Version (Tauri)](./tauri-version/)
**Target Audience:** Hub Operators / Administrators
- **Tech Stack:** Rust, Tauri, SQLite, HTML/CSS/JS
- **Features:**
  - Offline-first architecture
  - Inventory management
  - Order processing
  - Local database sync
  - Native system integration

## 🚀 Getting Started

### Web Version
Navigate to the `web-version` directory and open `index.html` in your browser.

### Desktop Version
Navigate to the `tauri-version` directory and follow the build instructions:
```bash
cd tauri-version
npm install
npm run tauri dev
```

## 🤝 Contribution
Please refer to the specific README files in each directory for detailed contribution guidelines.
