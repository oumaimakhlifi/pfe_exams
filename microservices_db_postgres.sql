SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET timezone = '+00:00';

-- Table pour Users (étudiants)
CREATE TABLE students (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP,
    image VARCHAR(255)
);

-- Données initiales
INSERT INTO students (name, last_name, email, created_at, image) VALUES
('Alice', 'Smith', 'alice@example.com', '2023-01-01 10:00:00', NULL),
('Bob', 'Jones', 'bob@example.com', '2023-01-02 15:00:00', NULL);
