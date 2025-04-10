const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

// Ruta para la raíz de /api/planes
router.get('/', (req, res) => {
  res.send('Bienvenido a las rutas de planes');
});

// Rutas para los planes
router.post('/', planController.createPlan);
router.get('/all', planController.getPlans); // Cambié esta ruta para evitar conflicto con '/'
router.get('/:id', planController.getPlanById);
router.put('/:id', planController.updatePlan);
router.delete('/:id', planController.deletePlan);

module.exports = router;
