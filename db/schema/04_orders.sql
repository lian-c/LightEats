DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE
    orders(
        id SERIAL PRIMARY,
        customerId INT REFERENCES users(id),
        restaurantId INT REFERENCES restaurants(id),
        total INT,
        status BOOLEAN
    );
