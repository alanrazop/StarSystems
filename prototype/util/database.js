const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'mysql-starss.alwaysdata.net',
    user: 'starss',
    database: 'starss_db',
    password:'TECStar123.',
});

module.exports = pool.promise();