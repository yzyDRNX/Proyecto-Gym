const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// Importa la conexión a MySQL (en lugar del modelo de Mongoose)
const pool = require("./config/db.js"); // Ajusta la ruta según tu estructura

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para procesar formularios
app.use(express.static(path.join(__dirname, "../public")));

// Ruta principal: Combina HTML + Datos desde MySQL
app.get("/", async (req, res) => {
    try {
        const htmlPath = path.join(__dirname, "../public/miembros.html");
        let html = fs.readFileSync(htmlPath, "utf8");

        // Obtener datos de MySQL
        const [miembros] = await pool.query("SELECT nombre, plan, expiracion FROM miembros");

        // Inyectar datos en el HTML
        const datosInyectados = `
            <script>
                window.datosMiembros = ${JSON.stringify(miembros)};
            </script>
        `;
        html = html.replace("</head>", `${datosInyectados}</head>`);
        
        res.send(html);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error al cargar la página");
    }
});


app.post("/", async (req, res) => {
    try {
        const { nombre, plan, fecha_inicio } = req.body;
        
        // Validación básica
        if (!nombre || !plan || !fecha_inicio) {
            return res.redirect("/?error=Faltan campos obligatorios");
        }

        // Calcular fecha de expiración
        const expiracion = calcularExpiracion(fecha_inicio, plan);

        // Insertar en la base de datos
        await pool.query(
            "INSERT INTO miembros (nombre, plan, expiracion) VALUES (?, ?, ?)",
            [nombre, plan, expiracion]
        );

        res.redirect("/?success=Miembro agregado correctamente");
    } catch (error) {
        console.error("Error al agregar miembro:", error);
        res.redirect("/?error=Error al agregar miembro: " + error.message);
    }
});

    function formatearFecha(fecha) {
        if (!fecha) return 'N/A';
        // Si la fecha es un string ISO (de la base de datos)
        if (typeof fecha === 'string' && fecha.includes('T')) {
            return fecha.split('T')[0];
        }
        // Si es un objeto Date
        if (fecha instanceof Date) {
            return fecha.toISOString().split('T')[0];
        }
        return 'N/A';
    }
    
    function calcularExpiracion(fechaInicio, plan) {
        const fecha = new Date(fechaInicio);
        
        switch(plan) {
            case 'Mensual':
                fecha.setMonth(fecha.getMonth() + 1);
                break;
            case 'Trimestral':
                fecha.setMonth(fecha.getMonth() + 3);
                break;
            case 'Semestral':
                fecha.setMonth(fecha.getMonth() + 6);
                break;
            case 'Anual':
                fecha.setFullYear(fecha.getFullYear() + 1);
                break;
            default:
                return null;
        }
        
        return fecha;
    }
// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});