DROP TABLE IF EXISTS menu_item_favourites CASCADE;

CREATE TABLE
    menu_item_favourites (
        id SERIAL PRIMARY,
        user_id INT REFERENCES users(id),
        menu_item_id INT REFERENCES menu_items(id)
    );
