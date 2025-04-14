const db = require("../config/db");

// Obtener todos los miembros
exports.obtenerMiembros = async (req, res) => {
    try {
        const [rows] = await db.promise().query("SELECT * FROM miembros");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener miembros:", error);
        res.status(500).json({ error: "Error al obtener miembros" });
    }
};

// Agregar un nuevo miembro
exports.agregarMiembro = async (req, res) => {
    const { nombre, plan, expiracion } = req.body;
    try {
        await db.promise().query("INSERT INTO miembros (nombre, plan, expiracion) VALUES (?, ?, ?)", [nombre, plan, expiracion]);
        res.status(201).json({ mensaje: "Miembro agregado correctamente" });
    } catch (error) {
        console.error("Error al agregar miembro:", error);
        res.status(500).json({ error: "Error al agregar miembro" });
    }
};

// Actualizar un miembro
exports.actualizarMiembro = async (req, res) => {
    const { id } = req.params;
    const { nombre, plan, expiracion } = req.body;
    try {
        await db.promise().query("UPDATE miembros SET nombre = ?, plan = ?, expiracion = ? WHERE id = ?", [nombre, plan, expiracion, id]);
        res.json({ mensaje: "Miembro actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar miembro:", error);
        res.status(500).json({ error: "Error al actualizar miembro" });
    }
};

// Eliminar un miembro
exports.eliminarMiembro = async (req, res) => {
    const { id } = req.params;
    try {
        await db.promise().query("DELETE FROM miembros WHERE id = ?", [id]);
        res.json({ mensaje: "Miembro eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar miembro:", error);
        res.status(500).json({ error: "Error al eliminar miembro" });
    }
};
