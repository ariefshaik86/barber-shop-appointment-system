# Database Setup Guide

## Problem: No Data Found in Database

The issue is that MySQL is not running or the database doesn't exist. Here's how to fix it:

## Step 1: Install and Start MySQL

### Option A: Install MySQL (if not already installed)
1. Download MySQL from: https://dev.mysql.com/downloads/mysql/
2. Install MySQL with default settings
3. Set root password (leave empty for development)

### Option B: Use XAMPP (Recommended for development)
1. Download XAMPP from: https://www.apachefriends.org/
2. Install XAMPP
3. Start XAMPP Control Panel
4. Start MySQL service

## Step 2: Create Database

### Method A: Using MySQL Command Line
```sql
mysql -u root -p
CREATE DATABASE barberdb;
USE barberdb;
```

### Method B: Using phpMyAdmin (comes with XAMPP)
1. Open http://localhost/phpmyadmin
2. Click "New" database
3. Enter name: `barberdb`
4. Click "Create"

## Step 3: Create Tables

Run this SQL script in MySQL:

```sql
USE barberdb;

-- Create barbers table
CREATE TABLE IF NOT EXISTS barbers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    experience VARCHAR(255),
    specialties TEXT
);

-- Create shop_services table
CREATE TABLE IF NOT EXISTS shop_services (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    price DOUBLE NOT NULL,
    duration INT NOT NULL
);

-- Create time_slots table
CREATE TABLE IF NOT EXISTS time_slots (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    slot_time VARCHAR(50) NOT NULL UNIQUE,
    available BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    service_name VARCHAR(100) NOT NULL,
    barber_name VARCHAR(100) NOT NULL,
    date_time DATETIME NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Step 4: Insert Sample Data

Run this SQL script:

```sql
USE barberdb;

-- Insert barbers
INSERT IGNORE INTO barbers (name, experience, specialties) VALUES
('John Smith', '10 years experience', 'Classic cuts, modern styles'),
('Mike Johnson', '8 years experience', 'Beard styling, hot towel shaves'),
('David Wilson', '12 years experience', 'Premium styling, color treatments'),
('Chris Brown', '5 years experience', 'Kids cuts, modern trends'),
('Tom Davis', '15 years experience', 'Traditional barbering, expert shaves');

-- Insert services
INSERT IGNORE INTO shop_services (name, price, duration) VALUES
('Classic Haircut', 800.0, 30),
('Beard Trim & Style', 500.0, 20),
('Hot Towel Shave', 600.0, 25),
('Hair & Beard Package', 1200.0, 45),
('Kids Haircut', 400.0, 20),
('Premium Styling', 1000.0, 40),
('Color Treatment', 1500.0, 60),
('Head Massage', 300.0, 15),
('Face Mask', 400.0, 20),
('Senior Citizen Cut', 600.0, 30);

-- Insert time slots (next 7 days from tomorrow)
-- This will be handled by the Spring Boot application
```

## Step 5: Verify Data

Check if data was inserted:

```sql
USE barberdb;

SELECT 'barbers' as table_name, COUNT(*) as record_count FROM barbers
UNION 
SELECT 'services' as table_name, COUNT(*) as record_count FROM shop_services
UNION 
SELECT 'time_slots' as table_name, COUNT(*) as record_count FROM time_slots
UNION 
SELECT 'bookings' as table_name, COUNT(*) as record_count FROM bookings;
```

Expected result:
- barbers: 5 records
- services: 10 records
- time_slots: 0 records (will be created by app)
- bookings: 0 records

## Step 6: Start Backend Application

Once MySQL is running and data is populated:

1. **Start Backend** (will create time slots automatically):
   ```bash
   cd c:/Users/USER/OneDrive/Desktop/new
   ./mvnw.cmd spring-boot:run
   ```

2. **Or use the batch file**:
   ```bash
   run_backend_simple.bat
   ```

## Step 7: Verify API Endpoints

Check these URLs in browser or with curl:

- Database Status: http://localhost:8080/api/database/status
- Health Check: http://localhost:8080/api/health
- API Info: http://localhost:8080/api

## Troubleshooting

### Issue: "Access denied for user 'root'@'localhost'"
- Reset MySQL root password or create a new user

### Issue: "Can't connect to MySQL server"
- Make sure MySQL service is running
- Check if MySQL is on port 3306

### Issue: "Database doesn't exist"
- Run the CREATE DATABASE command first

### Issue: "No data found"
- Run the INSERT scripts to populate data
- Check if tables were created properly

## Quick Start Commands

```bash
# 1. Start MySQL (XAMPP)
# Open XAMPP Control Panel → Start MySQL

# 2. Create database
mysql -u root -e "CREATE DATABASE barberdb;"

# 3. Run setup script
mysql -u root barberdb < database_setup.sql

# 4. Start backend
cd c:/Users/USER/OneDrive/Desktop/new
./mvnw.cmd spring-boot:run

# 5. Check data
curl http://localhost:8080/api/database/status
```

## Alternative: Use H2 Database (No MySQL Required)

If MySQL setup is problematic, you can switch to H2 database:

1. Update `application.properties`:
```properties
# H2 Database Configuration
spring.datasource.url=jdbc:h2:mem:barberdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
```

2. Restart the application - H2 will work without any setup!
