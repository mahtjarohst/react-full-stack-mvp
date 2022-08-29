DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL,
    firstName TEXT,
    lastName TEXT,
    userName TEXT,
    email TEXT
);

CREATE TABLE goals (
    id SERIAL,
    description TEXT,
    completed BOOLEAN
);


INSERT INTO users(firstName, lastName, userName, email) VALUES ('Matt', 'Rust', 'mrust', 'mrust@email.com');

INSERT INTO goals(description, completed) VALUES ('Become a better learner', FALSE);