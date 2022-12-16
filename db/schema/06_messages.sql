DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE
    messages (
        id SERIAL PRIMARY,
        senderId INT REFERENCES users(id),
        recipientId INT REFERENCES users(id),
        content TEXT,
        createdAt TIMESTAMP
    );
