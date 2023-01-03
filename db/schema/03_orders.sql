DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE
    orders(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        order_status VARCHAR(255), -- new, processing, completed
        order_time TIMESTAMP DEFAULT now(),
        completed_time TIMESTAMP
    );
