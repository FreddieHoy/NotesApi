DROP DATABASE IF EXISTS api;

-- Create the db
CREATE DATABASE api;

-- Move into the db
\c api

-- drop tables if they exist 
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS notes;

-- (Re)Create Tables 

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(50),
  password VARCHAR(30)
);

CREATE TABLE notes (
  ID SERIAL PRIMARY KEY,
  userId VARCHAR(100) NOT NULL,
  heading VARCHAR(100) NOT NULL,
  content VARCHAR(450),
  toDoItem BOOLEAN NOT NULL,
  checked BOOLEAN
);