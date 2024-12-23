const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const faker = require('faker');

const config = {
    host: 'db',
    database: 'desafio',
    user: 'root',
    password: 'root'
};

app.get('/', async (req, res) => {
    const connection = await mysql.createConnection(config);
    const name = faker.name.findName()

    await connection.execute('INSERT INTO people (name) VALUES (?)', [name]);
    const [rows] = await connection.execute('SELECT name FROM people');

    const namesList = rows.map(row => `<li>${row.name}</li>`).join('');
    res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);

    connection.end();
});

app.listen(3000, () => console.log('App running on http://localhost:3000'));
