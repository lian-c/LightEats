DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE
    users (
        id SERIAL PRIMARY,
        email VARCHAR(255) unique,
        password VARCHAR(255),
        phoneNumber VARCHAR(10) unique,
        name VARCHAR(255),
        createdAt DATE,
        status INT
    );
