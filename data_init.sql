-- Barber Shop Initial Data
-- Run this after creating the database to populate with sample data

USE barberdb;

-- Insert sample services (prices in INR)
INSERT INTO shop_services (name, price, duration) VALUES
('Classic Cut', 1500.00, 30),
('Beard Trim', 1200.00, 20),
('Hot Towel Shave', 2100.00, 45),
('Haircut & Beard', 2400.00, 60),
('Kids Cut', 1080.00, 25);

-- Insert sample barbers
INSERT INTO barbers (name, experience, image_url) VALUES
('John Smith', '10 years experience', ''),
('Mike Johnson', '7 years experience', ''),
('David Wilson', '5 years experience', ''),
('Tom Brown', '3 years experience', '');

-- Insert default time slots
INSERT INTO time_slots (slot_time, available) VALUES
('09:00', true),
('09:30', true),
('10:00', true),
('10:30', true),
('11:00', true),
('11:30', true),
('12:00', true),
('12:30', true),
('13:00', true),
('13:30', true),
('14:00', true),
('14:30', true),
('15:00', true),
('15:30', true),
('16:00', true),
('16:30', true),
('17:00', true),
('17:30', true);
