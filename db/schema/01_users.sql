DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) unique,
        password VARCHAR(255),
        name VARCHAR(255),
        phone_number VARCHAR(10) unique,
        role VARCHAR(255),
        status BOOLEAN DEFAULT TRUE
    );
