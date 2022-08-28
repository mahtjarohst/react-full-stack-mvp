DROP TABLE IF EXISTS goalInfo;
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
    goal TEXT,
    steps TEXT,
    notes TEXT
);

INSERT INTO users(firstName, lastName, userName, email) VALUES ('Matt', 'Rust', 'mrust', 'mrust@email.com');

INSERT INTO goals(goal, steps, notes) VALUES ('Become a better learner', 'Ask questions, Ask for help, Take breaks', 'These are generic notes');