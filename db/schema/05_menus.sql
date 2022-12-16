DROP TABLE IF EXISTS menus CASCADE;
CREATE TABLE
    menus(
        id SERIAL PRIMARY,
        restauraintId INT REFERENCES restauraint(id),
        BIGINTdescription TEXT,
        price INTEGER,
        cover_photo_url VARCHAR(255),
        thumbnail_url VARCHAR(255)
    );
