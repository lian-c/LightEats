DROP TABLE IF EXISTS order_items CASCADE;

CREATE TABLE
    order_items (
        id SERIAL PRIMARY,
        user_id INT references users(id),
        item_id INT references menu_items(id)
    );
