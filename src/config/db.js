// db.js
const mysql = require('mysql2/promise');  // ¡Agrega /promise aquí!

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "tu_basededatos",
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;