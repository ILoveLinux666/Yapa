create table task (
       id SERIAL PRIMARY KEY,
       header VARCHAR(50) NOT NULL,
       content TEXT,
       state VARCHAR(25) NOT NULL,
       created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
