DROP DATABASE IF EXISTS republisher;
CREATE DATABASE republisher;

\c republisher;

-- DEFINE CUSTOM TYPES

CREATE TYPE accountStatus AS ENUM ('active', 'suspended', 'deleted');
CREATE TYPE rolesTypes AS ENUM ('admin', 'author', 'reader');

-- DEFINE TABLES

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title rolesTypes  NOT NULL,
    permissions SMALLINT[]  NOT NULL,
    createdAt TIMESTAMP DEFAULT now(),
    updatedAt TIMESTAMP DEFAULT now()
);

CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT now(),
    updatedAt TIMESTAMP DEFAULT now()
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    gender SMALLINT NOT NULL,
    roleId INTEGER REFERENCES roles(id) NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR  NOT NULL,
    verified SMALLINT DEFAULT 0  NOT NULL,
    status accountStatus DEFAULT 'active' NOT NULL,
    createdAt TIMESTAMP DEFAULT now(),
    updatedAt TIMESTAMP DEFAULT now()
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR  NOT NULL,
  description TEXT,
  content TEXT  NOT NULL,
  cover VARCHAR,
  userId INTEGER REFERENCES users(id) NOT NULL,
  createdAt TIMESTAMP DEFAULT now(),
  updatedAt TIMESTAMP DEFAULT now()
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id) NOT NULL,
    postId INTEGER REFERENCES posts(id) NOT NULL,
    content TEXT  NOT NULL,
    createdAt TIMESTAMP DEFAULT now(),
    updatedAt TIMESTAMP DEFAULT now()
);

-- SEED TABLES

INSERT INTO roles (title, permissions) VALUES
    ('admin', '{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}'),
    ('author', '{1, 2, 3, 4, 5, 8, 10}'),
    ('reader', '{4, 5, 8, 10}');

INSERT INTO permissions (title, description) VALUES
    ('POST', 'create a new post'),
    ('EDIT_POST', 'edit an existing post'),
    ('DELETE_POST', 'delete a post record'),
    ('VIEW_POST', 'view a post'),
    ('REVIEW_POST', 'review a post'),
    ('APPROVE_POST', 'approve a post'),
    ('GET_USERS', 'fetch system users'),
    ('GET_SINGLE_USER', 'get single user details'),
    ('SUSPEND_USER', 'suspend system user'),
    ('SEARCH', 'search content');

INSERT INTO users (firstname, lastname, gender, roleId, email, password) VALUES
    ('admin', 'User', 0, 1, 'admin@mail.com', 'password');