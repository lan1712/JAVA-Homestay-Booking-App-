-- Make sure we're using the right database
USE good_place_travel_db;

-- Clear existing data (if any)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE booking_services;
TRUNCATE TABLE bookings;
TRUNCATE TABLE services;
TRUNCATE TABLE homestays;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- Insert Admin and Regular Users
INSERT INTO users (name, email, password, role, created_at) VALUES 
-- Admin user (password: admin123)
('Admin User', 'admin@goodplacetravel.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'ADMIN', NOW()),
-- Regular users (password: password123)
('John Doe', 'john@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'USER', DATE_SUB(NOW(), INTERVAL 30 DAY)),
('Jane Smith', 'jane@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'USER', DATE_SUB(NOW(), INTERVAL 25 DAY)),
('Robert Johnson', 'robert@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'USER', DATE_SUB(NOW(), INTERVAL 20 DAY)),
('Emily Davis', 'emily@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'USER', DATE_SUB(NOW(), INTERVAL 15 DAY)),
('Michael Wilson', 'michael@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'USER', DATE_SUB(NOW(), INTERVAL 10 DAY)),
('Sarah Brown', 'sarah@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'USER', DATE_SUB(NOW(), INTERVAL 5 DAY));

-- Insert Homestays with detailed descriptions and realistic data
INSERT INTO homestays (name, location, description, price, image_url, created_at) VALUES 
-- Sapa Homestays
('Mountain View Retreat', 'Sapa, Vietnam', 
'Experience the breathtaking beauty of Sapa in our traditional homestay nestled among the terraced rice fields. Wake up to misty mountain views and enjoy authentic Hmong cuisine prepared by our family. Our homestay features comfortable beds with warm blankets, private bathrooms with hot water, and a communal area where you can interact with other travelers and learn about local culture. We offer guided trekking tours to nearby villages and can arrange transportation to and from Sapa town. Perfect for nature lovers and photographers!', 
65.00, 'https://images.unsplash.com/photo-1528127269322-539801943592', DATE_SUB(NOW(), INTERVAL 120 DAY)),

('Hmong Heritage Home', 'Sapa, Vietnam', 
'Stay with a local Hmong family in this authentic homestay that has been in our family for generations. Located in Cat Cat village, just a 15-minute walk from Sapa town, our homestay offers a perfect blend of traditional architecture and modern comforts. Enjoy home-cooked meals featuring fresh ingredients from our garden, learn to make traditional Hmong crafts, and experience the daily life of a Hmong family. Each room is decorated with handmade textiles and offers stunning views of the Muong Hoa Valley. We speak English and can arrange trekking tours to nearby attractions.', 
55.00, 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2', DATE_SUB(NOW(), INTERVAL 110 DAY)),

-- Hoi An Homestays
('Ancient Town Oasis', 'Hoi An, Vietnam', 
'Our family homestay is located in a 200-year-old traditional Vietnamese house just a 5-minute walk from Hoi An Ancient Town. The house has been carefully preserved and renovated to offer modern comforts while maintaining its historical charm. Each room features antique furniture, air conditioning, and private bathrooms. Enjoy breakfast in our peaceful garden courtyard and take advantage of our free bicycle rentals to explore the town. Our family has lived in Hoi An for generations and can provide insider tips on the best local restaurants, tailors, and hidden gems in the Ancient Town.', 
75.00, 'https://images.unsplash.com/photo-1570304816841-938e9e44d0a3', DATE_SUB(NOW(), INTERVAL 100 DAY)),

('Riverside Bamboo Bungalow', 'Hoi An, Vietnam', 
'Escape the hustle and bustle at our peaceful riverside retreat, located just 10 minutes by bicycle from Hoi An Ancient Town. Our bamboo bungalows are built in traditional Vietnamese style with modern amenities including air conditioning, hot water, and free Wi-Fi. Wake up to the sound of birds and enjoy breakfast on your private terrace overlooking the Thu Bon River. We offer cooking classes where you can learn to prepare Vietnamese dishes, as well as boat trips to explore the river and nearby fishing villages. The nearby beach is just a 15-minute bicycle ride away.', 
85.00, 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6', DATE_SUB(NOW(), INTERVAL 90 DAY)),

-- Da Nang Homestays
('Beachfront Paradise', 'Da Nang, Vietnam', 
'Our modern homestay is located just steps from My Khe Beach, voted one of the most beautiful beaches in the world. Each room offers ocean views, air conditioning, and private bathrooms with rainfall showers. Enjoy breakfast on our rooftop terrace overlooking the sea, and relax in our garden with hammocks and lounge chairs. We provide free beach towels, umbrellas, and chairs for our guests. Our location is perfect for beach lovers, with easy access to seafood restaurants and beach bars. We can arrange motorbike rentals and tours to nearby attractions like Marble Mountain and Ba Na Hills.', 
95.00, 'https://images.unsplash.com/photo-1540541338287-41700207dee6', DATE_SUB(NOW(), INTERVAL 80 DAY)),

('Dragon Bridge View', 'Da Nang, Vietnam', 
'Located in the heart of Da Nang city, our family homestay offers spectacular views of the famous Dragon Bridge. Watch the bridge light up and breathe fire on weekend nights from our rooftop garden. Our modern rooms feature comfortable beds, air conditioning, and private bathrooms. We serve a delicious breakfast featuring both Vietnamese and Western options. Our central location makes it easy to explore the city\'s attractions, with many restaurants, cafes, and shops within walking distance. Our family has lived in Da Nang for decades and can provide recommendations for the best local experiences.', 
80.00, 'https://images.unsplash.com/photo-1564596823821-78f8c73925bf', DATE_SUB(NOW(), INTERVAL 70 DAY)),

-- Mekong Delta Homestays
('Mekong Riverside Cottage', 'Mekong Delta, Vietnam', 
'Experience authentic Mekong Delta life at our riverside homestay, surrounded by tropical fruit orchards and rice paddies. Our traditional wooden cottages are built on stilts over the water, offering a unique and peaceful experience. Each cottage has a private balcony where you can fish directly from your room or simply relax in a hammock watching river life go by. We offer boat tours of the floating markets, cooking classes featuring Mekong specialties, and bicycle tours of the surrounding countryside. Meals are served family-style and feature fresh ingredients from our garden and the local market.', 
60.00, 'https://images.unsplash.com/photo-1587550568808-1a2a0a0b3613', DATE_SUB(NOW(), INTERVAL 60 DAY)),

('Coconut Palm Homestay', 'Mekong Delta, Vietnam', 
'Nestled among coconut palms and banana trees, our homestay offers an authentic glimpse into life in the Mekong Delta. The house is built in traditional southern Vietnamese style with modern amenities for your comfort. Wake up to the sounds of nature and enjoy a breakfast of tropical fruits from our garden. Join us for a boat trip through narrow canals, visit local cottage industries, or learn to cook regional specialties. In the evening, relax in hammocks and enjoy the symphony of frogs and crickets. We grow organic vegetables and fruits, and most meals feature produce from our garden or caught fresh from the river.', 
55.00, 'https://images.unsplash.com/photo-1588159229515-aa7b1d8a5b1a', DATE_SUB(NOW(), INTERVAL 50 DAY)),

-- Ho Chi Minh City Homestays
('Urban Oasis Loft', 'Ho Chi Minh City, Vietnam', 
'Our modern loft apartment is located in a historic building in District 1, the heart of Ho Chi Minh City. The space has been thoughtfully renovated to blend original architectural elements with contemporary design. High ceilings, large windows, and a minimalist aesthetic create a peaceful retreat from the bustling city. The apartment features air conditioning, a fully equipped kitchen, and a comfortable living area. Step outside and you\'re minutes away from major attractions, restaurants, and shopping. We provide a smartphone with unlimited data for guests to use during their stay, as well as recommendations for our favorite local spots.', 
100.00, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', DATE_SUB(NOW(), INTERVAL 40 DAY)),

('District 3 Heritage Home', 'Ho Chi Minh City, Vietnam', 
'Experience the charm of old Saigon in our family\'s heritage home in District 3, a residential area known for its tree-lined streets and colonial architecture. Our 1930s house features original tile floors, antique furniture, and a peaceful garden courtyard. Each room has air conditioning, comfortable beds, and modern bathrooms. We serve a delicious breakfast featuring Vietnamese coffee and traditional dishes. Our neighborhood offers a more authentic experience of daily life in Ho Chi Minh City, with local markets, street food vendors, and cafes frequented by locals rather than tourists. Yet we\'re just a short taxi ride from the main attractions in District 1.', 
85.00, 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc', DATE_SUB(NOW(), INTERVAL 30 DAY)),

-- Hanoi Homestays
('Old Quarter Courtyard Haven', 'Hanoi, Vietnam', 
'Our family homestay is located in a quiet alley in Hanoi\'s bustling Old Quarter, offering a peaceful retreat just steps away from the action. The 100-year-old house has been in our family for generations and features a traditional layout with rooms arranged around a central courtyard. Each room combines antique Vietnamese furniture with modern comforts like air conditioning and ensuite bathrooms. Enjoy breakfast in the courtyard and join us for family dinner to taste authentic northern Vietnamese cuisine. We\'re within walking distance of Hoan Kiem Lake, the Night Market, and many of Hanoi\'s top attractions.', 
70.00, 'https://images.unsplash.com/photo-1582920980795-2f97b0834c58', DATE_SUB(NOW(), INTERVAL 20 DAY)),

('West Lake Garden Retreat', 'Hanoi, Vietnam', 
'Escape the noise of the city at our tranquil homestay located near West Lake, Hanoi\'s largest lake. Our modern home features a lush garden where you can enjoy breakfast or relax with a book. Rooms are spacious and bright, with air conditioning, comfortable beds, and private bathrooms. We offer free bicycle rentals for exploring the scenic lake area, which is known for its temples, pagodas, and excellent restaurants. The Old Quarter is just a 15-minute taxi ride away, making this an ideal location for those who want to experience both the historic and modern sides of Hanoi. Our family speaks English and French and can help arrange tours and transportation.', 
75.00, 'https://images.unsplash.com/photo-1598928636135-d146006ff4be', DATE_SUB(NOW(), INTERVAL 10 DAY));

-- Insert Services
INSERT INTO services (name, type, price) VALUES 
-- Meal Services
('Daily Breakfast', 'BREAKFAST', 8.00),
('Traditional Lunch', 'LUNCH', 12.00),
('Family Dinner Experience', 'DINNER', 15.00),
('Vegetarian Meal Option', 'BREAKFAST', 10.00),
('Special Dietary Requirements', 'BREAKFAST', 12.00),

-- Entertainment Services
('Guided City Tour', 'ENTERTAINMENT', 25.00),
('Cooking Class', 'ENTERTAINMENT', 30.00),
('Traditional Craft Workshop', 'ENTERTAINMENT', 20.00),
('Bicycle Rental (per day)', 'ENTERTAINMENT', 5.00),
('Motorbike Rental (per day)', 'ENTERTAINMENT', 15.00),

-- Other Services
('Airport Pickup', 'OTHER', 20.00),
('Laundry Service', 'OTHER', 8.00),
('Massage & Spa Treatment', 'OTHER', 35.00),
('Language Translation', 'OTHER', 15.00),
('Guided Trekking (per person)', 'ENTERTAINMENT', 40.00);

-- Insert Bookings with different statuses
INSERT INTO bookings (user_id, homestay_id, checkin, checkout, total_price, status, created_at) VALUES 
-- Completed Bookings (in the past)
(2, 1, DATE_SUB(NOW(), INTERVAL 60 DAY), DATE_SUB(NOW(), INTERVAL 55 DAY), 325.00, 'CONFIRMED', DATE_SUB(NOW(), INTERVAL 90 DAY)),
(3, 3, DATE_SUB(NOW(), INTERVAL 45 DAY), DATE_SUB(NOW(), INTERVAL 40 DAY), 375.00, 'CONFIRMED', DATE_SUB(NOW(), INTERVAL 75 DAY)),
(4, 5, DATE_SUB(NOW(), INTERVAL 30 DAY), DATE_SUB(NOW(), INTERVAL 25 DAY), 475.00, 'CONFIRMED', DATE_SUB(NOW(), INTERVAL 60 DAY)),

-- Current Active Bookings
(5, 2, DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_ADD(NOW(), INTERVAL 3 DAY), 275.00, 'CONFIRMED', DATE_SUB(NOW(), INTERVAL 30 DAY)),
(6, 4, DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_ADD(NOW(), INTERVAL 4 DAY), 425.00, 'CONFIRMED', DATE_SUB(NOW(), INTERVAL 15 DAY)),

-- Upcoming Bookings
(2, 6, DATE_ADD(NOW(), INTERVAL 15 DAY), DATE_ADD(NOW(), INTERVAL 20 DAY), 400.00, 'CONFIRMED', DATE_SUB(NOW(), INTERVAL 10 DAY)),
(3, 8, DATE_ADD(NOW(), INTERVAL 30 DAY), DATE_ADD(NOW(), INTERVAL 35 DAY), 275.00, 'CONFIRMED', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(4, 10, DATE_ADD(NOW(), INTERVAL 45 DAY), DATE_ADD(NOW(), INTERVAL 50 DAY), 350.00, 'PENDING', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(5, 12, DATE_ADD(NOW(), INTERVAL 60 DAY), DATE_ADD(NOW(), INTERVAL 65 DAY), 375.00, 'PENDING', DATE_SUB(NOW(), INTERVAL 2 DAY)),

-- Cancelled Bookings
(6, 7, DATE_ADD(NOW(), INTERVAL 10 DAY), DATE_ADD(NOW(), INTERVAL 15 DAY), 300.00, 'CANCELLED', DATE_SUB(NOW(), INTERVAL 20 DAY)),
(7, 9, DATE_SUB(NOW(), INTERVAL 5 DAY), DATE_ADD(NOW(), INTERVAL 0 DAY), 500.00, 'CANCELLED', DATE_SUB(NOW(), INTERVAL 25 DAY));

-- Insert Booking Services (additional services booked with homestays)
INSERT INTO booking_services (booking_id, service_id, quantity) VALUES 
-- Services for Booking 1
(1, 1, 5), -- Daily Breakfast for 5 days
(1, 6, 1), -- One Guided City Tour
(1, 9, 5), -- Bicycle Rental for 5 days

-- Services for Booking 2
(2, 1, 5), -- Daily Breakfast for 5 days
(2, 3, 2), -- Two Family Dinner Experiences
(2, 7, 1), -- One Cooking Class

-- Services for Booking 3
(3, 1, 5), -- Daily Breakfast for 5 days
(3, 10, 5), -- Motorbike Rental for 5 days
(3, 13, 1), -- One Massage & Spa Treatment

-- Services for Booking 4
(4, 1, 5), -- Daily Breakfast for 5 days
(4, 8, 1), -- One Traditional Craft Workshop
(4, 11, 1), -- Airport Pickup

-- Services for Booking 5
(5, 1, 5), -- Daily Breakfast for 5 days
(5, 2, 3), -- Three Traditional Lunches
(5, 15, 2), -- Guided Trekking for 2 people

-- Services for Booking 6
(6, 1, 5), -- Daily Breakfast for 5 days
(6, 3, 3), -- Three Family Dinner Experiences
(6, 12, 1), -- Laundry Service

-- Services for Booking 7
(7, 1, 5), -- Daily Breakfast for 5 days
(7, 7, 1), -- One Cooking Class
(7, 9, 5), -- Bicycle Rental for 5 days

-- Services for Booking 8
(8, 4, 5), -- Vegetarian Meal Option for 5 days
(8, 14, 1), -- Language Translation
(8, 6, 1), -- One Guided City Tour

-- Services for Booking 9
(9, 1, 5), -- Daily Breakfast for 5 days
(9, 10, 5), -- Motorbike Rental for 5 days
(9, 11, 1); -- Airport Pickup

-- Create some sample reviews (this would require adding a reviews table first)
-- Let's create a reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- Insert sample reviews for completed bookings
INSERT INTO reviews (booking_id, rating, comment, created_at) VALUES
(1, 5, 'Amazing experience! The host family was incredibly welcoming and the mountain views were breathtaking. The traditional meals were delicious and authentic. Highly recommend the guided trekking tour to nearby villages.', DATE_SUB(NOW(), INTERVAL 54 DAY)),
(2, 4, 'We had a wonderful stay at the Ancient Town Oasis. The location was perfect - just a short walk to all the main attractions in Hoi An. The room was clean and comfortable, and the breakfast in the garden courtyard was a highlight. The only small issue was the noise from the street in the early morning.', DATE_SUB(NOW(), INTERVAL 39 DAY)),
(3, 5, 'The Beachfront Paradise truly lives up to its name! Waking up to ocean views every morning was incredible. The hosts went above and beyond to make our stay special, even arranging a surprise birthday cake for my partner. The location right on My Khe Beach is unbeatable.', DATE_SUB(NOW(), INTERVAL 24 DAY));

-- Add a few more users with different nationalities
INSERT INTO users (name, email, password, role, created_at) VALUES 
('Pierre Dubois', 'pierre@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'USER', DATE_SUB(NOW(), INTERVAL 8 DAY)),
('Akiko Tanaka', 'akiko@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'USER', DATE_SUB(NOW(), INTERVAL 7 DAY)),
('Carlos Rodriguez', 'carlos@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'USER', DATE_SUB(NOW(), INTERVAL 6 DAY));

-- Add some upcoming bookings for these new users
INSERT INTO bookings (user_id, homestay_id, checkin, checkout, total_price, status, created_at) VALUES 
(8, 11, DATE_ADD(NOW(), INTERVAL 20 DAY), DATE_ADD(NOW(), INTERVAL 25 DAY), 350.00, 'CONFIRMED', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(9, 2, DATE_ADD(NOW(), INTERVAL 25 DAY), DATE_ADD(NOW(), INTERVAL 30 DAY), 275.00, 'CONFIRMED', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(10, 5, DATE_ADD(NOW(), INTERVAL 30 DAY), DATE_ADD(NOW(), INTERVAL 35 DAY), 475.00, 'PENDING', DATE_SUB(NOW(), INTERVAL 2 DAY));

-- Add services for these new bookings
INSERT INTO booking_services (booking_id, service_id, quantity) VALUES 
-- Services for Booking 10
(10, 1, 5), -- Daily Breakfast for 5 days
(10, 7, 1), -- One Cooking Class
(10, 11, 1), -- Airport Pickup

-- Services for Booking 11
(11, 4, 5), -- Vegetarian Meal Option for 5 days
(11, 8, 1), -- One Traditional Craft Workshop
(11, 9, 5), -- Bicycle Rental for 5 days

-- Services for Booking 12
(12, 1, 5), -- Daily Breakfast for 5 days
(12, 3, 2), -- Two Family Dinner Experiences
(12, 13, 1); -- One Massage & Spa Treatment

-- Create a view for homestay ratings
CREATE OR REPLACE VIEW homestay_ratings AS
SELECT 
    h.id AS homestay_id,
    h.name AS homestay_name,
    h.location,
    COALESCE(AVG(r.rating), 0) AS average_rating,
    COUNT(r.id) AS review_count
FROM 
    homestays h
LEFT JOIN 
    bookings b ON h.id = b.homestay_id
LEFT JOIN 
    reviews r ON b.id = r.booking_id
GROUP BY 
    h.id, h.name, h.location;

-- Show some summary information
SELECT 'Data import complete!' AS Message;
SELECT COUNT(*) AS 'Total Users' FROM users;
SELECT COUNT(*) AS 'Total Homestays' FROM homestays;
SELECT COUNT(*) AS 'Total Bookings' FROM bookings;
SELECT COUNT(*) AS 'Total Services' FROM services;
SELECT COUNT(*) AS 'Total Reviews' FROM reviews;

-- Show booking status summary
SELECT 
    status, 
    COUNT(*) AS count,
    CONCAT(ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM bookings), 2), '%') AS percentage
FROM 
    bookings
GROUP BY 
    status;

-- Show top rated homestays
SELECT 
    homestay_name,
    location,
    average_rating,
    review_count
FROM 
    homestay_ratings
WHERE 
    review_count > 0
ORDER BY 
    average_rating DESC, review_count DESC
LIMIT 5;
