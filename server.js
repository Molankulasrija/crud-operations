
const express = require('express');
const app = express();
const mysql2 = require('mysql2');

const database = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'cricketers'
});

database.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        process.exit(1); // Exit if connection fails
    }
    console.log("MySQL connection successful");
});

app.get('/', (req, res) => {
    res.send('Hi from port 5000');
});

app.get('/createtable', (req, res) => {
    const sqlcommand = 'CREATE TABLE IF NOT EXISTS indiancricketers(jerseynumber INT, name VARCHAR(255))';
    database.query(sqlcommand, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Table not created');
        }
        res.send("Table created successfully");
        console.log(result);
    });
});

app.get('/addcricketer', (req, res) => {
    const cricketer = { jerseynumber: 7, name: "MS Dhoni" };
    const SQL_COMMAND = "INSERT INTO indiancricketers (jerseynumber, name) VALUES (?, ?)";
    database.query(SQL_COMMAND, [cricketer.jerseynumber, cricketer.name], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Something went wrong...");
        }
        console.log(result);
        res.send('Values are successfully stored...');
    });
});

app.get('/updatecricketer', (req, res) => {
    const jerseynumber = 45; // New jersey number
    const name = "rohit sharma"; // Name of the cricketer to update
    const SQL_COMMAND = "UPDATE indiancricketers SET jerseynumber = ? WHERE name = ?";
    const values = [jerseynumber, name];

    database.query(SQL_COMMAND, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Update is not successful');
        }
        console.log(result);
        res.send('Update is successful');
    });
});

app.get('/deletecricketer', (req, res) => {
    const jerseynumber = 7; // Jersey number of the cricketer to delete
    const SQL_COMMAND = "DELETE FROM indiancricketers WHERE jerseynumber = ?";
    const value = [jerseynumber];

    database.query(SQL_COMMAND, value, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
        console.log(result);
        res.send('Deleted successfully');
    });
});

app.listen(5000, () => {
    console.log("Server listening on port 5000...");
});
