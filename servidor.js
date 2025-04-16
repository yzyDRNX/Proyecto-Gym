// servidor.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importar las rutas de entrenadores
const entrenadorRoutes = require('./backend/src/routes/EntrenadorRoutes');
// Usar las rutas en el path "/api/entrenadores"
app.use('/api/entrenadores', entrenadorRoutes);

// Ruta de prueba opcional
app.get('/', (req, res) => {
  res.send('¡Servidor de Entrenadores funcionando!');
});

// Puerto
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Servidor de entrenadores corriendo en el puerto ${PORT}`);
});
