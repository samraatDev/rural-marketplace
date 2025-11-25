use tauri::State;
use crate::database::Database;
use crate::models::{Service, Order, HubStats};

// Create a struct to hold the database state
pub struct AppState {
    pub db: Database,
}

#[tauri::command]
pub fn get_services(state: State<AppState>) -> Result<Vec<Service>, String> {
    state.db.get_services().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn create_order(state: State<AppState>, order: Order) -> Result<i32, String> {
    state.db.create_order(order).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_hub_stats(state: State<AppState>) -> Result<HubStats, String> {
    state.db.get_stats().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
