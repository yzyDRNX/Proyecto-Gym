require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Importa el middleware CORS
const db = require('./backend/Src/config/database');
const planRoutes = require('./backend/Src/routes/planRoutes.js');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.stack);
    process.exit(1);
  }
  console.log('Conexión exitosa a la base de datos.');
});

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Planes');
});

// Configurar las rutas
app.use('/api/planes', planRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Cerrar la conexión al detener el servidor
process.on('SIGINT', () => {
  db.end((err) => {
    if (err) {
      console.error('Error al cerrar la conexión a la base de datos:', err.stack);
    }
    console.log('Conexión a la base de datos cerrada.');
    process.exit(0);
  });
});