# Bharat Rentals - Desktop Hub Management

A professional desktop application for Bharat Rentals hub operators, built with Tauri and Rust.

## 🏗️ Architecture

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Rust (Tauri v2)
- **Database**: SQLite (local, offline-first)

## ✨ Features

- **Dashboard Overview**: Real-time stats on orders, revenue, and inventory.
- **Inventory Management**: Track available services and equipment.
- **Order Processing**: Create and manage rental orders.
- **Offline Support**: Works without internet connection using local SQLite database.
- **Native Performance**: Lightweight and fast.

## 🚀 Development

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Rust & Cargo](https://rustup.rs/)
- [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) (for Windows)

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run in development mode:
   ```bash
   npm run tauri dev
   ```

3. Build for production:
   ```bash
   npm run tauri build
   ```

## 🗄️ Database

The application uses a local SQLite database (`bharat_rentals.db`) which is automatically created and seeded with initial data on first run.

## 🛠️ Project Structure

- `src/` - Frontend source code (HTML, CSS, JS)
- `src-tauri/` - Rust backend source code
  - `src/models.rs` - Data structures
  - `src/database.rs` - SQLite operations
  - `src/commands.rs` - Tauri API commands
  - `src/lib.rs` - Main application logic
