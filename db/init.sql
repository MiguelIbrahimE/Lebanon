CREATE TABLE tourism_destination (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO tourism_destination (name, image, description) VALUES
('Baalbek', '/baalbek.png', 'Discover the ancient Roman ruins.'),
('Cedars of God', '/cedars.png', 'Experience the iconic Lebanese cedar forest.'),
('Jeita Grotto', '/jeita.png', 'Explore the magical underground caves.');
