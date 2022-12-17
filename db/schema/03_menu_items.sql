DROP TABLE IF EXISTS restaurants CASCADE;

CREATE TABLE
    restaurants(
        id SERIAL PRIMARY,
        name TEXT,
        owner INT REFERENCES users(id)
    );
