// filepath: c:\Users\96119\Downloads\Planes-service\backend\Src\controllers\planController.js
const Plan = require('../models/plan'); // Importa el modelo Plan

module.exports = {
  // Crear un nuevo plan
  createPlan: (req, res) => {
    const planData = req.body; // Datos enviados en el cuerpo de la solicitud
    Plan.create(planData, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al crear el plan' });
      }
      res.status(201).json({ message: 'Plan creado exitosamente', data: result });
    });
  },

  // Obtener todos los planes
  getPlans: (req, res) => {
    Plan.getAll((err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener los planes' });
      }
      res.json(results); // Devuelve todos los planes en formato JSON
    });
  },

  // Obtener un plan por ID
  getPlanById: (req, res) => {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL
    Plan.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener el plan' });
      }
      if (!result) {
        return res.status(404).json({ error: 'Plan no encontrado' });
      }
      res.json(result); // Devuelve el plan encontrado
    });
  },

  // Actualizar un plan
  updatePlan: (req, res) => {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL
    const planData = req.body; // Datos enviados en el cuerpo de la solicitud
    Plan.update(id, planData, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al actualizar el plan' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Plan no encontrado para actualizar' });
      }
      res.json({ message: 'Plan actualizado exitosamente', data: result });
    });
  },

  // Eliminar un plan
  deletePlan: (req, res) => {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL
    Plan.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al eliminar el plan' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Plan no encontrado para eliminar' });
      }
      res.json({ message: 'Plan eliminado exitosamente', data: result });
    });
  },

  // Obtener un plan con datos del miembro
  getPlanWithMember: (req, res) => {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL
    // Aquí puedes implementar la lógica para obtener el plan con datos del miembro
    res.json({ message: `Datos del plan con ID ${id} y su miembro` });
  },
};