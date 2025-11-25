pub mod models;
pub mod database;
pub mod commands;

use database::Database;
use commands::AppState;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Initialize database
    let db = Database::new("bharat_rentals.db".to_string());
    if let Err(e) = db.init() {
        eprintln!("Failed to initialize database: {}", e);
    }

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(AppState { db })
        .invoke_handler(tauri::generate_handler![
            commands::greet,
            commands::get_services,
            commands::create_order,
            commands::get_hub_stats
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
