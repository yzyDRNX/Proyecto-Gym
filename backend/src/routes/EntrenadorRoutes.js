// backend/src/routes/EntrenadorRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllEntrenadores,
  getEntrenadorById,
  createEntrenador,
  updateEntrenador,
  deleteEntrenador
} = require('../controllers/EntrenadorController');

// Rutas CRUD para "Entrenadores"
router.get('/', getAllEntrenadores);
router.get('/:id', getEntrenadorById);
router.post('/', createEntrenador);
router.put('/:id', updateEntrenador);
router.delete('/:id', deleteEntrenador);

module.exports = router;
