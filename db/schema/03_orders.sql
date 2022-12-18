DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE
    orders(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES users(id),
        completed BOOLEAN DEFAULT FALSE,
        order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
