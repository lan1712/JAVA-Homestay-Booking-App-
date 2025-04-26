-- Create the database
CREATE DATABASE IF NOT EXISTS good_place_travel_db;
USE good_place_travel_db;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS booking_services;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS homestays;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create homestays table
CREATE TABLE homestays (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create services table
CREATE TABLE services (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('BREAKFAST', 'LUNCH', 'DINNER', 'ENTERTAINMENT', 'OTHER') NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Create bookings table
CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    homestay_id BIGINT NOT NULL,
    checkin DATE NOT NULL,
    checkout DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'CANCELLED') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (homestay_id) REFERENCES homestays(id) ON DELETE CASCADE
);

-- Create booking_services table (junction table for many-to-many relationship)
CREATE TABLE booking_services (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT NOT NULL,
    service_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_homestay_location ON homestays(location);
CREATE INDEX idx_booking_user ON bookings(user_id);
CREATE INDEX idx_booking_homestay ON bookings(homestay_id);
CREATE INDEX idx_booking_status ON bookings(status);
CREATE INDEX idx_booking_dates ON bookings(checkin, checkout);

-- Insert sample data: Admin user
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@goodplacetravel.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'ADMIN');
-- Note: The password hash above is for 'password123'

-- Insert sample data: Regular users
INSERT INTO users (name, email, password, role) VALUES 
('John Doe', 'john@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'USER'),
('Jane Smith', 'jane@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'USER'),
('Bob Johnson', 'bob@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'USER');

-- Insert sample data: Homestays
INSERT INTO homestays (name, location, description, price, image_url) VALUES 
('Mountain View Retreat', 'Sapa, Vietnam', 'Experience the beauty of Sapa in this traditional homestay with breathtaking mountain views. Our family-owned property offers authentic local cuisine, cultural experiences, and comfortable accommodations.', 65.00, 'https://example.com/images/mountain-view.jpg'),
('Beachfront Paradise', 'Da Nang, Vietnam', 'Relax in our beachfront homestay with stunning ocean views. Just steps from the beach, this comfortable accommodation offers the perfect mix of local hospitality and modern amenities.', 85.00, 'https://example.com/images/beachfront.jpg'),
('Traditional Village Home', 'Hoi An, Vietnam', 'Stay in a traditional Vietnamese home in the heart of Hoi An\'s ancient town. Experience authentic local culture, home-cooked meals, and easy access to historical sites.', 55.00, 'https://example.com/images/village-home.jpg'),
('Riverside Bungalow', 'Mekong Delta, Vietnam', 'Our peaceful riverside bungalow offers a unique experience in the Mekong Delta. Wake up to river views, enjoy boat trips, and taste authentic southern Vietnamese cuisine.', 70.00, 'https://example.com/images/riverside.jpg'),
('City Center Apartment', 'Ho Chi Minh City, Vietnam', 'Modern apartment in the heart of Ho Chi Minh City. Perfect for travelers who want to experience urban Vietnamese life with all the comforts of home.', 90.00, 'https://example.com/images/city-apartment.jpg');

-- Insert sample data: Services
INSERT INTO services (name, type, price) VALUES 
('Breakfast Buffet', 'BREAKFAST', 10.00),
('Lunch Package', 'LUNCH', 15.00),
('Traditional Dinner', 'DINNER', 20.00),
('City Tour', 'ENTERTAINMENT', 30.00),
('Airport Pickup', 'OTHER', 25.00),
('Cooking Class', 'ENTERTAINMENT', 35.00),
('Laundry Service', 'OTHER', 8.00);

-- Insert sample data: Bookings
INSERT INTO bookings (user_id, homestay_id, checkin, checkout, total_price, status, created_at) VALUES 
(2, 1, '2023-06-15', '2023-06-20', 325.00, 'CONFIRMED', '2023-05-20 14:30:00'),
(3, 2, '2023-07-10', '2023-07-15', 425.00, 'PENDING', '2023-06-15 09:45:00'),
(4, 3, '2023-08-05', '2023-08-10', 275.00, 'CONFIRMED', '2023-07-01 16:20:00'),
(2, 4, '2023-09-20', '2023-09-25', 350.00, 'CANCELLED', '2023-08-15 11:10:00');

-- Insert sample data: Booking Services
INSERT INTO booking_services (booking_id, service_id, quantity) VALUES 
(1, 1, 5), -- Breakfast for 5 days
(1, 4, 1), -- One city tour
(2, 1, 5), -- Breakfast for 5 days
(2, 3, 2), -- Two traditional dinners
(3, 1, 5), -- Breakfast for 5 days
(3, 6, 1), -- One cooking class
(4, 1, 5), -- Breakfast for 5 days
(4, 5, 1); -- Airport pickup

-- Create a view for booking details
CREATE OR REPLACE VIEW booking_details AS
SELECT 
    b.id AS booking_id,
    u.name AS guest_name,
    u.email AS guest_email,
    h.name AS homestay_name,
    h.location AS homestay_location,
    b.checkin,
    b.checkout,
    b.total_price,
    b.status,
    b.created_at AS booking_date
FROM 
    bookings b
JOIN 
    users u ON b.user_id = u.id
JOIN 
    homestays h ON b.homestay_id = h.id;

-- Create a view for homestay statistics
CREATE OR REPLACE VIEW homestay_stats AS
SELECT 
    h.id AS homestay_id,
    h.name AS homestay_name,
    h.location,
    COUNT(b.id) AS total_bookings,
    SUM(CASE WHEN b.status = 'CONFIRMED' THEN 1 ELSE 0 END) AS confirmed_bookings,
    SUM(CASE WHEN b.status = 'CANCELLED' THEN 1 ELSE 0 END) AS cancelled_bookings,
    AVG(DATEDIFF(b.checkout, b.checkin)) AS avg_stay_duration,
    SUM(b.total_price) AS total_revenue
FROM 
    homestays h
LEFT JOIN 
    bookings b ON h.id = b.homestay_id
GROUP BY 
    h.id, h.name, h.location;

-- Create a stored procedure to get bookings by date range
DELIMITER //
CREATE PROCEDURE GetBookingsByDateRange(IN start_date DATE, IN end_date DATE)
BEGIN
    SELECT 
        bd.*
    FROM 
        booking_details bd
    WHERE 
        (bd.checkin BETWEEN start_date AND end_date) OR
        (bd.checkout BETWEEN start_date AND end_date) OR
        (bd.checkin <= start_date AND bd.checkout >= end_date);
END //
DELIMITER ;

-- Create a stored procedure to get user bookings
DELIMITER //
CREATE PROCEDURE GetUserBookings(IN user_email VARCHAR(255))
BEGIN
    SELECT 
        bd.*
    FROM 
        booking_details bd
    JOIN 
        users u ON bd.guest_email = u.email
    WHERE 
        u.email = user_email;
END //
DELIMITER ;

-- Create a trigger to update homestay availability
DELIMITER //
CREATE TRIGGER after_booking_insert
AFTER INSERT ON bookings
FOR EACH ROW
BEGIN
    -- Here you could update an availability table if you had one
    -- This is just a placeholder for demonstration
    -- INSERT INTO homestay_availability (homestay_id, date, is_available)
    -- SELECT NEW.homestay_id, date_range.date, 0
    -- FROM (
    --     SELECT DATE_ADD(NEW.checkin, INTERVAL n DAY) as date
    --     FROM (
    --         SELECT 0 as n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION
    --         SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9
    --     ) numbers
    --     WHERE DATE_ADD(NEW.checkin, INTERVAL n DAY) < NEW.checkout
    -- ) date_range
    -- ON DUPLICATE KEY UPDATE is_available = 0;
    
    -- For now, we'll just log the booking
    INSERT INTO booking_log (booking_id, action, action_time)
    VALUES (NEW.id, 'INSERT', NOW());
END //
DELIMITER ;

-- Create a booking log table for the trigger
CREATE TABLE booking_log (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT NOT NULL,
    action VARCHAR(50) NOT NULL,
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Grant privileges (adjust as needed for your environment)
GRANT ALL PRIVILEGES ON good_place_travel_db.* TO 'your_username'@'localhost';
FLUSH PRIVILEGES;

-- Show created tables
SHOW TABLES;

-- Confirmation message
SELECT 'Good Place Travel database has been successfully created!' AS Message;
