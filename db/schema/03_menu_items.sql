DROP TABLE IF EXISTS menu_items CASCADE;

CREATE TABLE
    menu_items(
        id SERIAL PRIMARY,
        name VARCHAR((255)),
        description TEXT,
        price INT,
        food_photo_url TEXT,
        prep_time SMALLINT,
        available BOOLEAN
    );
