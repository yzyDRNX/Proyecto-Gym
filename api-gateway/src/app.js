require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql2/promise');

// Crear aplicación Express
const app = express();

// Configuración de middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Configuración de la base de datos MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gym_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Pool de conexiones MySQL
const pool = mysql.createPool(dbConfig);

// Ruta de prueba de conexión a DB
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({ success: true, message: 'Conexión a DB exitosa', result: rows[0].solution });
  } catch (error) {
    console.error('Error en DB:', error);
    res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
  }
});

// Ruta de login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Buscar usuario en la base de datos
    const [users] = await pool.query(
      'SELECT * FROM usuarios WHERE username = ?', 
      [username]
    );

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    const user = users[0];

    // 2. Verificar contraseña (en un caso real usa bcrypt.compare)
    if (password !== user.password) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    // 3. Respuesta exitosa (en producción usa JWT)
    res.json({
      success: true,
      user: {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// Ruta para servir el frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API Gateway corriendo en http://localhost:${PORT}`);
});

module.exports = app;