DROP TABLE IF EXISTS menu_item_reviews CASCADE;
CREATE TABLE
    menu_item_reviews (
        id SERIAL PRIMARY KEY,
        menu_item_id INT REFERENCES menu_items(id),
        rating SMALLINT,
        comments TEXT,
        user_id INT REFERENCES users(id)
    );
