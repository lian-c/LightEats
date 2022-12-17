DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE
    orders(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES users(id),
        estimated_time SMALLINT,
        total INT,
        status BOOLEAN,
        order_time TIMESTAMP
    );
