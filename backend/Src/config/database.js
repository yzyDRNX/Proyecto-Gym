const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Power616',
  database: 'planes_db',
});

// Exporta la conexión sin conectarla directamente
module.exports = connection;