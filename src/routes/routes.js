const express = require("express");
const router = express.Router();

const db = require("../config/db.js");

// Ruta de prueba
router.get("/", (_req, res) => {
    res.send("Ruta funcionando correctamente");
});

// Obtener lista de miembros
router.get("/obtener", async (_req, res) => {
    try {
        const [rows] = await db.query("SELECT nombre, plan, expiracion FROM miembros");
        res.send(rows);
    } catch (error) {
        console.error("Error al obtener miembros:", error);
        res.status(500).send({ error: "Error en el servidor" });
    }
});

module.exports = router;