use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize)]
pub struct Service {
    pub id: Option<i32>,
    pub name: String,
    pub category: String,
    pub description: String,
    pub price_per_hour: f64,
    pub available: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Order {
    pub id: Option<i32>,
    pub service_id: i32,
    pub user_name: String,
    pub village: String,
    pub start_time: DateTime<Utc>,
    pub duration_hours: i32,
    pub total_price: f64,
    pub status: String, // "pending", "active", "completed"
}

#[derive(Debug, Serialize, Deserialize)]
pub struct HubStats {
    pub total_orders: i32,
    pub active_rentals: i32,
    pub revenue: f64,
}
