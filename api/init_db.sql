-- ReliefSense SQLite Database Schema
-- Humanitarian Agriculture IoT Platform
-- Created: 2025-09-30

-- Sensor Readings Table
CREATE TABLE IF NOT EXISTS sensor_readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    sensor_id TEXT NOT NULL,
    sensor_type TEXT NOT NULL CHECK(sensor_type IN ('temperature', 'humidity', 'co2', 'light', 'soil_moisture', 'ph')),
    value REAL NOT NULL,
    unit TEXT NOT NULL,
    status TEXT DEFAULT 'normal' CHECK(status IN ('normal', 'warning', 'critical')),
    location_id INTEGER,
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

-- Crop Cycles Table
CREATE TABLE IF NOT EXISTS crop_cycles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    crop_name TEXT NOT NULL,
    variety TEXT,
    plant_date DATE NOT NULL,
    expected_harvest_date DATE,
    actual_harvest_date DATE,
    status TEXT DEFAULT 'growing' CHECK(status IN ('planning', 'planted', 'growing', 'harvesting', 'completed')),
    location_id INTEGER,
    yield_kg REAL,
    notes TEXT,
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

-- Alert History Table
CREATE TABLE IF NOT EXISTS alert_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    alert_type TEXT NOT NULL CHECK(alert_type IN ('critical', 'warning', 'info')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    source TEXT,
    resolved BOOLEAN DEFAULT 0,
    resolved_at DATETIME,
    resolved_by TEXT
);

-- System Logs Table
CREATE TABLE IF NOT EXISTS system_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    level TEXT NOT NULL CHECK(level IN ('DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL')),
    service TEXT NOT NULL,
    message TEXT NOT NULL,
    details TEXT,
    ip_address TEXT
);

-- User Actions Table
CREATE TABLE IF NOT EXISTS user_actions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id TEXT NOT NULL,
    action_type TEXT NOT NULL,
    resource TEXT,
    details TEXT,
    ip_address TEXT
);

-- Locations Table (Refugee Camps, Community Gardens, etc.)
CREATE TABLE IF NOT EXISTS locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location_type TEXT CHECK(location_type IN ('refugee_camp', 'community_garden', 'training_center', 'distribution_point')),
    country TEXT,
    region TEXT,
    coordinates_lat REAL,
    coordinates_lng REAL,
    population INTEGER,
    active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Network Devices Table
CREATE TABLE IF NOT EXISTS network_devices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_name TEXT NOT NULL,
    device_type TEXT CHECK(device_type IN ('sensor_node', 'gateway', 'router', 'server', 'camera')),
    mac_address TEXT UNIQUE,
    ip_address TEXT,
    status TEXT DEFAULT 'online' CHECK(status IN ('online', 'offline', 'maintenance')),
    last_seen DATETIME,
    location_id INTEGER,
    firmware_version TEXT,
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_sensor_timestamp ON sensor_readings(timestamp);
CREATE INDEX IF NOT EXISTS idx_sensor_type ON sensor_readings(sensor_type);
CREATE INDEX IF NOT EXISTS idx_alert_timestamp ON alert_history(timestamp);
CREATE INDEX IF NOT EXISTS idx_alert_resolved ON alert_history(resolved);
CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON system_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_logs_level ON system_logs(level);
CREATE INDEX IF NOT EXISTS idx_crop_status ON crop_cycles(status);
CREATE INDEX IF NOT EXISTS idx_device_status ON network_devices(status);

-- Insert sample location data
INSERT INTO locations (name, location_type, country, region, population, coordinates_lat, coordinates_lng) VALUES
('Zaatari Camp - Agricultural Zone', 'refugee_camp', 'Jordan', 'Mafraq', 80000, 32.2942, 36.3267),
('Azraq Community Garden', 'community_garden', 'Jordan', 'Zarqa', 35000, 31.9008, 36.8261),
('Bekaa Valley Training Center', 'training_center', 'Lebanon', 'Bekaa', 450, 33.8462, 35.9016);

-- Insert sample sensor readings
INSERT INTO sensor_readings (sensor_id, sensor_type, value, unit, status, location_id) VALUES
('temp_01', 'temperature', 21.3, '°C', 'normal', 1),
('humid_01', 'humidity', 67.2, '%', 'normal', 1),
('co2_01', 'co2', 823, 'ppm', 'normal', 1),
('light_01', 'light', 24500, 'lux', 'normal', 1),
('temp_02', 'temperature', 18.7, '°C', 'normal', 2),
('humid_02', 'humidity', 71.5, '%', 'normal', 2);

-- Insert sample crop cycles
INSERT INTO crop_cycles (crop_name, variety, plant_date, expected_harvest_date, status, location_id, notes) VALUES
('Lettuce', 'Green Leaf', '2025-08-25', '2025-10-15', 'growing', 1, 'Health: Excellent | Water: Optimal | Harvest: 11 days'),
('Tomatoes', 'Cherry', '2025-07-28', '2025-10-10', 'harvesting', 1, 'Health: Good | Water: Monitor | Harvest: 16 days'),
('Carrots', 'Nantes', '2025-09-12', '2025-11-25', 'growing', 2, 'Health: Good | Water: Optimal | Harvest: 52 days');

-- Insert sample alerts
INSERT INTO alert_history (alert_type, title, message, source, resolved) VALUES
('warning', 'Water Level Low', 'Tank B water level below 20%', 'Water Management System', 0),
('info', 'Harvest Ready', 'Cherry tomatoes ready for harvest in Zone A', 'Crop Monitor', 0),
('critical', 'Temperature Alert', 'Greenhouse 3 temperature above threshold', 'Climate Control', 1);

-- Insert sample system logs
INSERT INTO system_logs (level, service, message, details) VALUES
('INFO', 'sensor-service', 'Sensor readings collected successfully', '{"count": 156, "duration_ms": 234}'),
('WARNING', 'water-system', 'Low water pressure detected', '{"pressure_psi": 12.3, "threshold": 15}'),
('ERROR', 'network', 'Connection timeout to sensor node', '{"node_id": "SN-047", "timeout_ms": 5000}');

-- Insert sample network devices
INSERT INTO network_devices (device_name, device_type, mac_address, ip_address, status, location_id, firmware_version) VALUES
('Gateway-Main', 'gateway', '00:1B:44:11:3A:B7', '192.168.1.1', 'online', 1, 'v2.3.1'),
('Sensor-Node-01', 'sensor_node', '00:1B:44:11:3A:C8', '192.168.1.101', 'online', 1, 'v1.8.2'),
('Sensor-Node-02', 'sensor_node', '00:1B:44:11:3A:D9', '192.168.1.102', 'online', 1, 'v1.8.2'),
('Router-Primary', 'router', '00:1B:44:11:3A:E1', '192.168.1.254', 'online', 1, 'v3.1.0');
