DROP TABLE IF EXISTS menu_items CASCADE;

CREATE TABLE
    menu_items(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        price INT,
        food_photo_url TEXT,
        prep_time SMALLINT,
        available BOOLEAN DEFAULT TRUE
    );
