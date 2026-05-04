-- Complete Barber Shop Database Setup Script
-- Run this script to create database, tables, and insert sample data

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS barberdb;
USE barberdb;

-- Drop tables if they exist (for fresh setup)
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS time_slots;
DROP TABLE IF EXISTS shop_services;
DROP TABLE IF EXISTS barbers;

-- Create barbers table
CREATE TABLE barbers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    experience VARCHAR(255),
    specialties TEXT
);

-- Create shop_services table
CREATE TABLE shop_services (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    price DOUBLE NOT NULL,
    duration INT NOT NULL
);

-- Create time_slots table
CREATE TABLE time_slots (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    slot_time VARCHAR(50) NOT NULL UNIQUE,
    available BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create bookings table
CREATE TABLE bookings (
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

-- Insert sample barbers
INSERT INTO barbers (name, experience, specialties) VALUES
('John Smith', '10 years experience', 'Classic cuts, modern styles'),
('Mike Johnson', '8 years experience', 'Beard styling, hot towel shaves'),
('David Wilson', '12 years experience', 'Premium styling, color treatments'),
('Chris Brown', '5 years experience', 'Kids cuts, modern trends'),
('Tom Davis', '15 years experience', 'Traditional barbering, expert shaves');

-- Insert sample services
INSERT INTO shop_services (name, price, duration) VALUES
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

-- Generate time slots for next 7 days
-- This creates 126 time slots (7 days × 18 slots per day from 9 AM to 6 PM)
INSERT INTO time_slots (slot_time, available) VALUES
('2026-05-05 09:00:00', TRUE), ('2026-05-05 09:30:00', TRUE), ('2026-05-05 10:00:00', TRUE), ('2026-05-05 10:30:00', TRUE),
('2026-05-05 11:00:00', TRUE), ('2026-05-05 11:30:00', TRUE), ('2026-05-05 12:00:00', TRUE), ('2026-05-05 12:30:00', TRUE),
('2026-05-05 13:00:00', TRUE), ('2026-05-05 13:30:00', TRUE), ('2026-05-05 14:00:00', TRUE), ('2026-05-05 14:30:00', TRUE),
('2026-05-05 15:00:00', TRUE), ('2026-05-05 15:30:00', TRUE), ('2026-05-05 16:00:00', TRUE), ('2026-05-05 16:30:00', TRUE),
('2026-05-05 17:00:00', TRUE), ('2026-05-05 17:30:00', TRUE),

('2026-05-06 09:00:00', TRUE), ('2026-05-06 09:30:00', TRUE), ('2026-05-06 10:00:00', TRUE), ('2026-05-06 10:30:00', TRUE),
('2026-05-06 11:00:00', TRUE), ('2026-05-06 11:30:00', TRUE), ('2026-05-06 12:00:00', TRUE), ('2026-05-06 12:30:00', TRUE),
('2026-05-06 13:00:00', TRUE), ('2026-05-06 13:30:00', TRUE), ('2026-05-06 14:00:00', TRUE), ('2026-05-06 14:30:00', TRUE),
('2026-05-06 15:00:00', TRUE), ('2026-05-06 15:30:00', TRUE), ('2026-05-06 16:00:00', TRUE), ('2026-05-06 16:30:00', TRUE),
('2026-05-06 17:00:00', TRUE), ('2026-05-06 17:30:00', TRUE),

('2026-05-07 09:00:00', TRUE), ('2026-05-07 09:30:00', TRUE), ('2026-05-07 10:00:00', TRUE), ('2026-05-07 10:30:00', TRUE),
('2026-05-07 11:00:00', TRUE), ('2026-05-07 11:30:00', TRUE), ('2026-05-07 12:00:00', TRUE), ('2026-05-07 12:30:00', TRUE),
('2026-05-07 13:00:00', TRUE), ('2026-05-07 13:30:00', TRUE), ('2026-05-07 14:00:00', TRUE), ('2026-05-07 14:30:00', TRUE),
('2026-05-07 15:00:00', TRUE), ('2026-05-07 15:30:00', TRUE), ('2026-05-07 16:00:00', TRUE), ('2026-05-07 16:30:00', TRUE),
('2026-05-07 17:00:00', TRUE), ('2026-05-07 17:30:00', TRUE),

('2026-05-08 09:00:00', TRUE), ('2026-05-08 09:30:00', TRUE), ('2026-05-08 10:00:00', TRUE), ('2026-05-08 10:30:00', TRUE),
('2026-05-08 11:00:00', TRUE), ('2026-05-08 11:30:00', TRUE), ('2026-05-08 12:00:00', TRUE), ('2026-05-08 12:30:00', TRUE),
('2026-05-08 13:00:00', TRUE), ('2026-05-08 13:30:00', TRUE), ('2026-05-08 14:00:00', TRUE), ('2026-05-08 14:30:00', TRUE),
('2026-05-08 15:00:00', TRUE), ('2026-05-08 15:30:00', TRUE), ('2026-05-08 16:00:00', TRUE), ('2026-05-08 16:30:00', TRUE),
('2026-05-08 17:00:00', TRUE), ('2026-05-08 17:30:00', TRUE),

('2026-05-09 09:00:00', TRUE), ('2026-05-09 09:30:00', TRUE), ('2026-05-09 10:00:00', TRUE), ('2026-05-09 10:30:00', TRUE),
('2026-05-09 11:00:00', TRUE), ('2026-05-09 11:30:00', TRUE), ('2026-05-09 12:00:00', TRUE), ('2026-05-09 12:30:00', TRUE),
('2026-05-09 13:00:00', TRUE), ('2026-05-09 13:30:00', TRUE), ('2026-05-09 14:00:00', TRUE), ('2026-05-09 14:30:00', TRUE),
('2026-05-09 15:00:00', TRUE), ('2026-05-09 15:30:00', TRUE), ('2026-05-09 16:00:00', TRUE), ('2026-05-09 16:30:00', TRUE),
('2026-05-09 17:00:00', TRUE), ('2026-05-09 17:30:00', TRUE),

('2026-05-10 09:00:00', TRUE), ('2026-05-10 09:30:00', TRUE), ('2026-05-10 10:00:00', TRUE), ('2026-05-10 10:30:00', TRUE),
('2026-05-10 11:00:00', TRUE), ('2026-05-10 11:30:00', TRUE), ('2026-05-10 12:00:00', TRUE), ('2026-05-10 12:30:00', TRUE),
('2026-05-10 13:00:00', TRUE), ('2026-05-10 13:30:00', TRUE), ('2026-05-10 14:00:00', TRUE), ('2026-05-10 14:30:00', TRUE),
('2026-05-10 15:00:00', TRUE), ('2026-05-10 15:30:00', TRUE), ('2026-05-10 16:00:00', TRUE), ('2026-05-10 16:30:00', TRUE),
('2026-05-10 17:00:00', TRUE), ('2026-05-10 17:30:00', TRUE),

('2026-05-11 09:00:00', TRUE), ('2026-05-11 09:30:00', TRUE), ('2026-05-11 10:00:00', TRUE), ('2026-05-11 10:30:00', TRUE),
('2026-05-11 11:00:00', TRUE), ('2026-05-11 11:30:00', TRUE), ('2026-05-11 12:00:00', TRUE), ('2026-05-11 12:30:00', TRUE),
('2026-05-11 13:00:00', TRUE), ('2026-05-11 13:30:00', TRUE), ('2026-05-11 14:00:00', TRUE), ('2026-05-11 14:30:00', TRUE),
('2026-05-11 15:00:00', TRUE), ('2026-05-11 15:30:00', TRUE), ('2026-05-11 16:00:00', TRUE), ('2026-05-11 16:30:00', TRUE),
('2026-05-11 17:00:00', TRUE), ('2026-05-11 17:30:00', TRUE);

-- Display setup completion message
SELECT 'Database setup completed successfully!' as message;
SELECT 'Tables created and sample data inserted' as status;

-- Show record counts
SELECT 'barbers' as table_name, COUNT(*) as record_count FROM barbers
UNION 
SELECT 'services' as table_name, COUNT(*) as record_count FROM shop_services
UNION 
SELECT 'time_slots' as table_name, COUNT(*) as record_count FROM time_slots
UNION 
SELECT 'bookings' as table_name, COUNT(*) as record_count FROM bookings;
