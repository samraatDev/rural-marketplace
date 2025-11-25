use rusqlite::{params, Connection, Result};
use crate::models::{Service, Order, HubStats};
use chrono::Utc;

pub struct Database {
    path: String,
}

impl Database {
    pub fn new(path: String) -> Self {
        Database { path }
    }

    pub fn init(&self) -> Result<()> {
        let conn = Connection::open(&self.path)?;

        conn.execute(
            "CREATE TABLE IF NOT EXISTS services (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                description TEXT NOT NULL,
                price_per_hour REAL NOT NULL,
                available BOOLEAN NOT NULL
            )",
            [],
        )?;

        conn.execute(
            "CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY,
                service_id INTEGER NOT NULL,
                user_name TEXT NOT NULL,
                village TEXT NOT NULL,
                start_time TEXT NOT NULL,
                duration_hours INTEGER NOT NULL,
                total_price REAL NOT NULL,
                status TEXT NOT NULL,
                FOREIGN KEY(service_id) REFERENCES services(id)
            )",
            [],
        )?;

        // Seed some data if empty
        let count: i32 = conn.query_row("SELECT COUNT(*) FROM services", [], |row| row.get(0))?;
        if count == 0 {
            self.seed_data(&conn)?;
        }

        Ok(())
    }

    fn seed_data(&self, conn: &Connection) -> Result<()> {
        let services = vec![
            ("Portable Generator 5kW", "energy", "Reliable power for home", 50.0, true),
            ("Solar Panel Kit", "energy", "Clean energy solution", 30.0, true),
            ("Autonomous Tractor", "vehicles", "Self-driving farm assistant", 500.0, true),
            ("Delivery Drone", "vehicles", "Fast payload delivery", 100.0, true),
            ("Crop Monitoring Bot", "robotics", "AI-powered health check", 150.0, true),
        ];

        for (name, cat, desc, price, avail) in services {
            conn.execute(
                "INSERT INTO services (name, category, description, price_per_hour, available) VALUES (?1, ?2, ?3, ?4, ?5)",
                params![name, cat, desc, price, avail],
            )?;
        }
        Ok(())
    }

    pub fn get_services(&self) -> Result<Vec<Service>> {
        let conn = Connection::open(&self.path)?;
        let mut stmt = conn.prepare("SELECT id, name, category, description, price_per_hour, available FROM services")?;
        
        let service_iter = stmt.query_map([], |row| {
            Ok(Service {
                id: row.get(0)?,
                name: row.get(1)?,
                category: row.get(2)?,
                description: row.get(3)?,
                price_per_hour: row.get(4)?,
                available: row.get(5)?,
            })
        })?;

        let mut services = Vec::new();
        for service in service_iter {
            services.push(service?);
        }
        Ok(services)
    }

    pub fn create_order(&self, order: Order) -> Result<i32> {
        let conn = Connection::open(&self.path)?;
        conn.execute(
            "INSERT INTO orders (service_id, user_name, village, start_time, duration_hours, total_price, status) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
            params![
                order.service_id,
                order.user_name,
                order.village,
                order.start_time.to_rfc3339(),
                order.duration_hours,
                order.total_price,
                order.status
            ],
        )?;
        
        Ok(conn.last_insert_rowid() as i32)
    }

    pub fn get_stats(&self) -> Result<HubStats> {
        let conn = Connection::open(&self.path)?;
        
        let total_orders: i32 = conn.query_row(
            "SELECT COUNT(*) FROM orders",
            [],
            |row| row.get(0),
        ).unwrap_or(0);

        let active_rentals: i32 = conn.query_row(
            "SELECT COUNT(*) FROM orders WHERE status = 'active'",
            [],
            |row| row.get(0),
        ).unwrap_or(0);

        let revenue: f64 = conn.query_row(
            "SELECT COALESCE(SUM(total_price), 0.0) FROM orders",
            [],
            |row| row.get(0),
        ).unwrap_or(0.0);

        Ok(HubStats {
            total_orders,
            active_rentals,
            revenue,
        })
    }
}
