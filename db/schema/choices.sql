DROP TABLE IF EXISTS choices CASCADE;
CREATE TABLE choices (
  choice_id SERIAL PRIMARY KEY NOT NULL,
  choice_title TEXT,
  choice_description TEXT,
  poll_id INTEGER REFERENCES polls(poll_id) ON DELETE CASCADE
);
