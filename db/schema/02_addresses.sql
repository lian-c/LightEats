DROP TABLE IF EXISTS addresses CASCADE;

CREATE TABLE
    addresses (
        id SERIAL PRIMARY,
        userId INT references users(id),
        address1 VARCHAR(255),
        address1 VARCHAR(255),
        city VARCHAR(255),
        province VARCHAR(255),
        country VARCHAR(255),
        buzzer TEXT
    );
