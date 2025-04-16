// backend/src/controllers/EntrenadorController.js

// Importar la conexión a la base de datos
const db = require('../database/db');

// Obtener todos los entrenadores
const getAllEntrenadores = async (req, res) => {
  try {
    // Ajusta 'entrenadores' al nombre real de tu tabla
    const [rows] = await db.query('SELECT * FROM entrenadores');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener entrenadores' });
  }
};

// Obtener un entrenador por ID
const getEntrenadorById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM entrenadores WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Entrenador no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener entrenador' });
  }
};

// Crear un nuevo entrenador
// Crear un nuevo entrenador
const createEntrenador = async (req, res) => {
  try {
    const { nombre, especialidad, experiencia, numero_telefonico, correo_electronico } = req.body;

    await db.query(
      'INSERT INTO entrenadores (nombre, especialidad, experiencia, numero_telefonico, correo_electronico) VALUES (?, ?, ?, ?, ?)',
      [nombre, especialidad, experiencia, numero_telefonico, correo_electronico]  // <-- IMPORTANTE: enviar el arreglo con valores
    );

    res.status(201).json({ message: 'Entrenador creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear entrenador' });
  }
};


// Actualizar un entrenador
const updateEntrenador = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, especialidad, experiencia, numero_telefonico, correo_electronico } = req.body;

    const [result] = await db.query(
      'UPDATE entrenadores SET nombre = ?, especialidad = ?, experiencia = ?, numero_telefonico = ?, correo_electronico = ? WHERE id = ?',
      [nombre, especialidad, experiencia, numero_telefonico, correo_electronico, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Entrenador no encontrado' });
    }

    res.json({ message: 'Entrenador actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar entrenador' });
  }
};

// Eliminar un entrenador
const deleteEntrenador = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM entrenadores WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Entrenador no encontrado' });
    }

    res.json({ message: 'Entrenador eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar entrenador' });
  }
};

// Exportar las funciones para usarlas en las rutas
module.exports = {
  getAllEntrenadores,
  getEntrenadorById,
  createEntrenador,
  updateEntrenador,
  deleteEntrenador
};
