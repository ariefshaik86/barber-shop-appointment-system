-- Initialize Barber Shop Database Data

-- Check and insert barbers
INSERT IGNORE INTO barbers (name, experience, specialties) VALUES
('John Smith', '10 years experience', 'Classic cuts, modern styles'),
('Mike Johnson', '8 years experience', 'Beard styling, hot towel shaves'),
('David Wilson', '12 years experience', 'Premium styling, color treatments'),
('Chris Brown', '5 years experience', 'Kids cuts, modern trends'),
('Tom Davis', '15 years experience', 'Traditional barbering, expert shaves');

-- Check and insert services
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

-- Generate time slots for next 7 days
-- This will be handled by the application since it requires dynamic date calculation
