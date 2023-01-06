-- Active: 1672696047897@@138.197.130.58@5432@midterm@public
DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE
    messages (
        id SERIAL PRIMARY KEY,
        orderId INT,
        userId INT,
        content TEXT,
        date TIMESTAMP DEFAULT NOW(),
        status VARCHAR(255)
    );
