DROP TABLE IF EXISTS order_items CASCADE;

CREATE TABLE
    order_items (
        id SERIAL PRIMARY KEY,
        order_id INT REFERENCES orders(id),
        item_id INT REFERENCES menu_items(id)
    );
