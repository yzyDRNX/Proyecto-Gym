const db = require('../config/database'); // Importa la conexión MySQL

const Plan = {
  // Método para obtener todos los planes
  getAll: (callback) => {
    const query = 'SELECT * FROM planes';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener los planes:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  // Método para obtener un plan por ID
  getById: (id, callback) => {
    const query = 'SELECT * FROM planes WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error al obtener el plan:', err);
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  },

  // Método para crear un nuevo plan
  create: (planData, callback) => {
    const query = 'INSERT INTO planes (nombre, descripcion, precio, duracion) VALUES (?, ?, ?, ?)';
    const { nombre, descripcion, precio, duracion } = planData; // Eliminado miembro_id
    db.query(query, [nombre, descripcion, precio, duracion], (err, results) => {
      if (err) {
        console.error('Error al crear el plan:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  // Método para actualizar un plan
  update: (id, planData, callback) => {
    const query = 'UPDATE planes SET nombre = ?, descripcion = ?, precio = ?, duracion = ? WHERE id = ?';
    const { nombre, descripcion, precio, duracion } = planData; // Eliminado miembro_id
    db.query(query, [nombre, descripcion, precio, duracion, id], (err, results) => {
      if (err) {
        console.error('Error al actualizar el plan:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  // Método para eliminar un plan
  delete: (id, callback) => {
    const query = 'DELETE FROM planes WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error al eliminar el plan:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
};

module.exports = Plan;