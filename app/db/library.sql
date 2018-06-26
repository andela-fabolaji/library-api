DROP DATABASE IF EXISTS library;
CREATE DATABASE library;

\c library;

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    gender SMALLINT
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  authorId INTEGER REFERENCES authors(id),
  publishedOn DATE
);

INSERT INTO authors (name, gender) VALUES
    ('John Doe', 1),
    ('Michael Smith', 1),
    ('Joan Watson', 0);

INSERT INTO books (name, authorId, publishedOn) VALUES
    ('Time Changes Yesterday', 1, '2016-02-12'),
    ('Redeeming Time', 2, '2018-04-10'),
    (E'Today\'s Yesterday', 1, '2010-01-01'),
    ('Thinking fast and slow', 3, '2001-08-18');