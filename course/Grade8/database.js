const mysql = require('mysql');
const fs = require('fs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'financeguru'
});

connection.connect((err) => {
    if (err) {
        console.error('Connection error:', err);
        return;
    }
    console.log('Succesful connection!');
});

const query = 'SELECT * FROM STUDENT'; // Thay đổi truy vấn tùy theo yêu cầu của bạn

connection.query(query, (err, results) => {
    if (err) {
        console.error('Query error:', err);
        return;
    }

    const jsonData = JSON.stringify(results);

    fs.writeFile('data.json', jsonData, (err) => {
        if (err) {
            console.error('File error:', err);
            return;
        }
        console.log('Save data to data.json!');
    });

    connection.end();
});