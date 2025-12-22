-- Create the database
CREATE DATABASE login_base;
GO

-- Switch to the newly created database
USE login_base;
GO

-- Create the users table
CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1,1),
    username NVARCHAR(100) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL,
    role NVARCHAR(50) NOT NULL CHECK (role IN ('Admin', 'User')),
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Create index for faster queries
CREATE INDEX idx_username ON users(username);
GO