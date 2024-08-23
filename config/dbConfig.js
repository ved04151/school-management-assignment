const mysql = require('mysql2');
require("dotenv").config();

// Database and connection configuration
const databaseName = 'school_management';
const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
};

// Create a MySQL connection (without specifying a database)
const connection = mysql.createConnection(connectionConfig);

// Connect to MySQL
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL');
});

// Function to create database and table
const setupDatabase = async () => {
    try {
        // Create database if it doesn't exist
        const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
        await new Promise((resolve, reject) => {
            connection.query(createDatabaseQuery, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
        console.log(`Database ${databaseName} created or already exists`);

        // Use the database
        const useDatabaseQuery = `USE ${databaseName}`;
        await new Promise((resolve, reject) => {
            connection.query(useDatabaseQuery, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        // Create table if it doesn't exist
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS schools (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                latitude FLOAT NOT NULL,
                longitude FLOAT NOT NULL
            );
        `;
        await new Promise((resolve, reject) => {
            connection.query(createTableQuery, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
        console.log('Schools table created or already exists');
    } catch (err) {
        console.error('Error setting up database:', err);
    } finally {
        // Close the connection
        connection.end(err => {
            if (err) {
                console.error('Error closing the connection:', err);
            } else {
                console.log('MySQL connection closed');
            }
        });
    }
};

// Run the setup script
setupDatabase();

const db = mysql.createPool({
    host: 'localhost', // Change this to your DB host
    user: 'root',      // Change this to your DB user
    password: process.env.PASSWORD,      // Change this to your DB password
    database: 'school_management'
});

module.exports = db;


});

module.exports = db;

