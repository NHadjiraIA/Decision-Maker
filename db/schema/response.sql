DROP TABLE IF EXISTS responses CASCADE;
CREATE TABLE responses (
  response_id SERIAL PRIMARY KEY NOT NULL,
  response_position  INTEGER,
  visitor_name VARCHAR(255) NOT NULL,
  poll_id INTEGER REFERENCES polls(poll_id) ON DELETE CASCADE,
  choice_id INTEGER REFERENCES choices(choice_id) ON DELETE CASCADE
);
