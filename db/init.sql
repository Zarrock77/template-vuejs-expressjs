DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_database WHERE datname = 'mydb'
  ) THEN
    CREATE DATABASE mydb;
  END IF;
END $$;

\c mydb;


-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NULL, -- Email peut être NULL (pour les utilisateurs OAuth)
  password TEXT NULL, -- Password est obligatoire pour les utilisateurs non-OAuth
);