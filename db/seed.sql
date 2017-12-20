DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,  
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  token VARCHAR NOT NULL
);

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  content VARCHAR,
  headline VARCHAR,
  url VARCHAR,
  user_id INT REFERENCES users (id),
  save_date VARCHAR
);



