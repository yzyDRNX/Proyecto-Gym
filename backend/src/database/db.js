// backend/src/database/database.js

// Importar mysql2 en modo promesas y dotenv para leer el .env
const mysql = require('mysql2/promise');
require('dotenv').config();

// Crear el pool de conexiones utilizando las variables de entorno
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Exportar el pool para usarlo en otras partes del proyecto
module.exports = pool;
