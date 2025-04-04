const express = require('express');
const cors = require('cors');
const empleadosRoutes = require('./routes/empleados');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/empleados', empleadosRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
