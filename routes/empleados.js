const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos
router.get('/', (req, res) => {
  db.query('SELECT * FROM empleados', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// Agregar
router.post('/', (req, res) => {
  const { nombre, puesto, telefono } = req.body;
  db.query('INSERT INTO empleados (nombre, puesto, telefono) VALUES (?, ?, ?)', [nombre, puesto, telefono], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, nombre, puesto, telefono });
  });
});

// Editar
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, puesto, telefono } = req.body;
  db.query('UPDATE empleados SET nombre = ?, puesto = ?, telefono = ? WHERE id = ?', [nombre, puesto, telefono, id], (err) => {
    if (err) throw err;
    res.send('Empleado actualizado');
  });
});

// Eliminar
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM empleados WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.send('Empleado eliminado');
  });
});

module.exports = router;
