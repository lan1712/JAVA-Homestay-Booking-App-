-- Update homestay images with real URLs from Unsplash
UPDATE homestays SET image_url = 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e' WHERE id = 1; -- Mountain View Retreat
UPDATE homestays SET image_url = 'https://images.unsplash.com/photo-1517942466277-e43de02c1d8d' WHERE id = 2; -- Hmong Heritage Home
UPDATE homestays SET image_url = 'https://images.unsplash.com/photo-1568051243858-533a607809a5' WHERE id = 3; -- Ancient Town Oasis
UPDATE homestays SET image_url = 'https://images.unsplash.com/photo-1595521624992-48a59aef95e3' WHERE id = 4; -- Riverside Bamboo Bungalow
UPDATE homestays SET image_url = 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4' WHERE id = 5; -- Beachfront Paradise
UPDATE homestays SET image_url = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791' WHERE id = 6; -- Dragon Bridge View
UPDATE homestays SET image_url = 'https://images.unsplash.com/photo-1544644181-1484b3fdfc32' WHERE id = 7; -- Mekong Riverside Cottage
UPDATE homestays SET image_url = 'https://images.unsplash.com/photo-1505993597083-3bd19fb75e57' WHERE id = 8; -- Coconut Palm Homestay
UPDATE homestays SET image_url = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688' WHERE id = 9; -- Urban Oasis Loft
UPDATE homestays SET image_url = 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2' WHERE id = 10; -- District 3 Heritage Home
UPDATE homestays SET image_url = 'https://images.unsplash.com/photo-1561649170-b9c45f6a54b9' WHERE id = 11; -- Old Quarter Courtyard Haven
UPDATE homestays SET image_url = 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6' WHERE id = 12; -- West Lake Garden Retreat

-- Add additional images for each homestay (for gallery view)
CREATE TABLE IF NOT EXISTS homestay_images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    homestay_id BIGINT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (homestay_id) REFERENCES homestays(id) ON DELETE CASCADE
);

-- Clear existing data if any
TRUNCATE TABLE homestay_images;

-- Insert multiple images for each homestay
-- Mountain View Retreat (Sapa)
INSERT INTO homestay_images (homestay_id, image_url, is_primary) VALUES
(1, 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e', TRUE),
(1, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b', FALSE),
(1, 'https://images.unsplash.com/photo-1501785888041-af3ef285b470', FALSE),
(1, 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8', FALSE),
(1, 'https://images.unsplash.com/photo-1501785888041-af3ef285b470', FALSE);

-- Hmong Heritage Home (Sapa)
INSERT INTO homestay_images (homestay_id, image_url, is_primary) VALUES
(2, 'https://images.unsplash.com/photo-1517942466277-e43de02c1d8d', TRUE),
(2, 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b', FALSE),
(2, 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3', FALSE),
(2, 'https://images.unsplash.com/photo-1510798831971-661eb04b3739', FALSE),
(2, 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3', FALSE);

-- Ancient Town Oasis (Hoi An)
INSERT INTO homestay_images (homestay_id, image_url, is_primary) VALUES
(3, 'https://images.unsplash.com/photo-1568051243858-533a607809a5', TRUE),
(3, 'https://images.unsplash.com/photo-1528127269322-539801943592', FALSE),
(3, 'https://images.unsplash.com/photo-1566073771259-6a8506099945', FALSE),
(3, 'https://images.unsplash.com/photo-1582582621959-48d27397dc69', FALSE),
(3, 'https://images.unsplash.com/photo-1568974088523-22d7d9a4215a', FALSE);

-- Riverside Bamboo Bungalow (Hoi An)
INSERT INTO homestay_images (homestay_id, image_url, is_primary) VALUES
(4, 'https://images.unsplash.com/photo-1595521624992-48a59aef95e3', TRUE),
(4, 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b', FALSE),
(4, 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c', FALSE),
(4, 'https://images.unsplash.com/photo-1588854337236-6889d631faa8', FALSE),
(4, 'https://images.unsplash.com/photo-1588854337189-7e9605e0a06b', FALSE);

-- Beachfront Paradise (Da Nang)
INSERT INTO homestay_images (homestay_id, image_url, is_primary) VALUES
(5, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4', TRUE),
(5, 'https://images.unsplash.com/photo-1540541338287-41700207dee6', FALSE),
(5, 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd', FALSE),
(5, 'https://images.unsplash.com/photo-1545579133-99bb5ab189bd', FALSE),
(5, 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b', FALSE);

-- Dragon Bridge View (Da Nang)
INSERT INTO homestay_images (homestay_id, image_url, is_primary) VALUES
(6, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791', TRUE),
(6, 'https://images.unsplash.com/photo-1564596823821-78f8c73925bf', FALSE),
(6, 'https://images.unsplash.com/photo-1566073771259-6a8506099945', FALSE),
(6, 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88', FALSE),
(6, 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d', FALSE);

-- Mekong Riverside Cottage (Mekong Delta)
INSERT INTO homestay_images (homestay_id, image_url, is_primary) VALUES
(7, 'https://images.unsplash.com/photo-1544644181-1484b3fdfc32', TRUE),
(7, 'https://images.unsplash.com/photo-1587550568808-1a2a0a0b3613', FALSE),
(7, 'https://images.unsplash.com/photo-1587550568670-35f488a60036', FALSE),
(7, 'https://images.unsplash.com/photo-1587550568624-53a803d8c91c', FALSE),
(7, 'https://images.unsplash.com/photo-1587550568502-9a854dcbf04c', FALSE);

-- Coconut Palm Homestay (Mekong Delta)
INSERT INTO homestay_images (homestay_id, image_url, is_primary) VALUES
(8, 'https://images.unsplash.com/photo-1505993597083-3bd19fb75e57', TRUE),
(8, 'https://images.unsplash.com/photo-1588159229515-aa7b1d8a5b1a', FALSE),
(8, 'https://images.unsplash.com/photo-1588159229478-fa939c1e5177', FALSE),
(8, 'https://images.unsplash.com/photo-1588159229437-11fa422a6c0e', FALSE),
(8, 'https://images.unsplash.com/photo-1588159229411-9e29bdc8c319', FALSE);

-- Urban Oasis Loft (Ho Chi Minh City)
INSERT INTO homestay_images (homestay_id, image_url, is_primary) VALUES
(9, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', TRUE),
(9, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', FALSE),
(9, 'https://images.unsplash.com/photo-1554995207-c18c203602cb', FALSE),
(9, 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9', FALSE),
(9, 'https://images.unsplash.com/photo-1505691938895-1758d7feb511', FALSE);

-- District 3 Heritage Home (Ho Chi Minh City)
INSERT INTO homestay_images (homestay_id, image_url, is_primary) VALUES
(10, 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2', TRUE),
(10, 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc', FALSE),
(10, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2', FALSE),
(10, 'https://images.unsplash.com/photo-1560448075-57d0285fc98b', FALSE),
(10, 'https://images.unsplash.com/photo-1560448075-d5f3e4582df1', FALSE);

-- Old Quarter Courtyard Haven (Hanoi)
INSERT INTO homestay_images (homestay_id, image_url, is_primary) VALUES
(11, 'https://images.unsplash.com/photo-1561649170-b9c45f6a54b9', TRUE),
(11, 'https://images.unsplash.com/photo-1582920980795-2f97b0834c58', FALSE),
(11, 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92', FALSE),
(11, 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92', FALSE),
(11, 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92', FALSE);

-- West Lake Garden Retreat (Hanoi)
INSERT INTO homestay_images (homestay_id, image_url, is_primary) VALUES
(12, 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6', TRUE),
(12, 'https://images.unsplash.com/photo-1598928636135-d146006ff4be', FALSE),
(12, 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c', FALSE),
(12, 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c', FALSE),
(12, 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c', FALSE);

-- Add featured image flags
ALTER TABLE homestays ADD COLUMN is_featured BOOLEAN DEFAULT FALSE;

-- Mark some homestays as featured
UPDATE homestays SET is_featured = TRUE WHERE id IN (1, 3, 5, 7, 9, 11);

-- Add amenities table for more detailed homestay information
CREATE TABLE IF NOT EXISTS amenities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50) NULL,
    category VARCHAR(50) NOT NULL
);

-- Clear existing data if any
TRUNCATE TABLE amenities;

-- Insert amenities
INSERT INTO amenities (name, icon, category) VALUES
('Free WiFi', 'wifi', 'BASIC'),
('Air Conditioning', 'air-conditioning', 'BASIC'),
('Hot Water', 'hot-water', 'BASIC'),
('TV', 'tv', 'BASIC'),
('Kitchen', 'kitchen', 'FACILITY'),
('Washing Machine', 'washing-machine', 'FACILITY'),
('Private Bathroom', 'bathroom', 'FACILITY'),
('Balcony', 'balcony', 'FACILITY'),
('Mountain View', 'mountain', 'VIEW'),
('Ocean View', 'ocean', 'VIEW'),
('Garden View', 'garden', 'VIEW'),
('City View', 'city', 'VIEW'),
('Breakfast Included', 'breakfast', 'MEAL'),
('Airport Pickup', 'airport', 'SERVICE'),
('Bicycle Rental', 'bicycle', 'SERVICE'),
('Tour Guide', 'guide', 'SERVICE');

-- Create junction table for homestay amenities
CREATE TABLE IF NOT EXISTS homestay_amenities (
    homestay_id BIGINT NOT NULL,
    amenity_id BIGINT NOT NULL,
    PRIMARY KEY (homestay_id, amenity_id),
    FOREIGN KEY (homestay_id) REFERENCES homestays(id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
);

-- Clear existing data if any
TRUNCATE TABLE homestay_amenities;

-- Assign amenities to homestays
-- Mountain View Retreat (Sapa)
INSERT INTO homestay_amenities (homestay_id, amenity_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 7), (1, 9), (1, 13), (1, 16);

-- Hmong Heritage Home (Sapa)
INSERT INTO homestay_amenities (homestay_id, amenity_id) VALUES
(2, 1), (2, 3), (2, 7), (2, 9), (2, 13), (2, 16);

-- Ancient Town Oasis (Hoi An)
INSERT INTO homestay_amenities (homestay_id, amenity_id) VALUES
(3, 1), (3, 2), (3, 3), (3, 4), (3, 7), (3, 8), (3, 11), (3, 13), (3, 15);

-- Riverside Bamboo Bungalow (Hoi An)
INSERT INTO homestay_amenities (homestay_id, amenity_id) VALUES
(4, 1), (4, 2), (4, 3), (4, 7), (4, 8), (4, 11), (4, 13), (4, 15);

-- Beachfront Paradise (Da Nang)
INSERT INTO homestay_amenities (homestay_id, amenity_id) VALUES
(5, 1), (5, 2), (5, 3), (5, 4), (5, 7), (5, 8), (5, 10), (5, 13), (5, 14);

-- Dragon Bridge View (Da Nang)
INSERT INTO homestay_amenities (homestay_id, amenity_id) VALUES
(6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (6, 7), (6, 8), (6, 12), (6, 13);

-- Mekong Riverside Cottage (Mekong Delta)
INSERT INTO homestay_amenities (homestay_id, amenity_id) VALUES
(7, 1), (7, 3), (7, 7), (7, 8), (7, 11), (7, 13), (7, 15), (7, 16);

-- Coconut Palm Homestay (Mekong Delta)
INSERT INTO homestay_amenities (homestay_id, amenity_id) VALUES
(8, 1), (8, 3), (8, 5), (8, 7), (8, 11), (8, 13), (8, 15);

-- Urban Oasis Loft (Ho Chi Minh City)
INSERT INTO homestay_amenities (homestay_id, amenity_id) VALUES
(9, 1), (9, 2), (9, 3), (9, 4), (9, 5), (9, 6), (9, 7), (9, 12), (9, 14);

-- District 3 Heritage Home (Ho Chi Minh City)
INSERT INTO homestay_amenities (homestay_id, amenity_id) VALUES
(10, 1), (10, 2), (10, 3), (10, 4), (10, 7), (10, 11), (10, 13);

-- Old Quarter Courtyard Haven (Hanoi)
INSERT INTO homestay_amenities (homestay_id, amenity_id) VALUES
(11, 1), (11, 2), (11, 3), (11, 4), (11, 7), (11, 11), (11, 13), (11, 15);

-- West Lake Garden Retreat (Hanoi)
INSERT INTO homestay_amenities (homestay_id, amenity_id) VALUES
(12, 1), (12, 2), (12, 3), (12, 4), (12, 5), (12, 7), (12, 8), (12, 11), (12, 13), (12, 15);

-- Create a view for homestay details with amenities
CREATE OR REPLACE VIEW homestay_details AS
SELECT 
    h.id,
    h.name,
    h.location,
    h.description,
    h.price,
    h.image_url,
    h.is_featured,
    h.created_at,
    GROUP_CONCAT(DISTINCT a.name ORDER BY a.category, a.name SEPARATOR ', ') AS amenities,
    COUNT(DISTINCT hi.id) AS image_count,
    COALESCE(AVG(r.rating), 0) AS average_rating,
    COUNT(DISTINCT r.id) AS review_count
FROM 
    homestays h
LEFT JOIN 
    homestay_amenities ha ON h.id = ha.homestay_id
LEFT JOIN 
    amenities a ON ha.amenity_id = a.id
LEFT JOIN 
    homestay_images hi ON h.id = hi.homestay_id
LEFT JOIN 
    bookings b ON h.id = b.homestay_id
LEFT JOIN 
    reviews r ON b.id = r.booking_id
GROUP BY 
    h.id, h.name, h.location, h.description, h.price, h.image_url, h.is_featured, h.created_at;

-- Show the updated homestay details
SELECT * FROM homestay_details;

-- Count the number of images
SELECT COUNT(*) AS 'Total Homestay Images' FROM homestay_images;

-- Show a summary of amenities by homestay
SELECT 
    h.name AS homestay_name,
    h.location,
    COUNT(ha.amenity_id) AS amenity_count,
    GROUP_CONCAT(a.name ORDER BY a.category, a.name SEPARATOR ', ') AS amenities
FROM 
    homestays h
JOIN 
    homestay_amenities ha ON h.id = ha.homestay_id
JOIN 
    amenities a ON ha.amenity_id = a.id
GROUP BY 
    h.id, h.name, h.location
ORDER BY 
    h.location, h.name;
