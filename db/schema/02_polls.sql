DROP TABLE IF EXISTS polls CASCADE;
CREATE TABLE polls (
  poll_id SERIAL PRIMARY KEY NOT NULL,
  poll_question TEXT,
  administrative_link TEXT,
  submission_link TEXT,
  poll_code TEXT,
  user_email VARCHAR(255) NOT NULL
);
