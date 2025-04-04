const API_URL = "http://localhost:3000/api/empleados";

// Cargar empleados al cargar la página
document.addEventListener("DOMContentLoaded", obtenerEmpleados);

const form = document.getElementById("empleadoForm");

// Agregar o actualizar empleado
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("id").value;
    const nombre = document.getElementById("nombre").value;
    const puesto = document.getElementById("puesto").value;
    const telefono = document.getElementById("telefono").value;

    const empleado = { nombre, puesto, telefono };

    if (id) {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(empleado),
        });
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(empleado),
        });
    }

    form.reset();
    obtenerEmpleados();
});

// Obtener empleados y mostrarlos
async function obtenerEmpleados() {
    const res = await fetch(API_URL);
    const empleados = await res.json();
    const tbody = document.getElementById("empleadosTabla");
    tbody.innerHTML = "";

    empleados.forEach((empleado) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${empleado.id}</td>
            <td>${empleado.nombre}</td>
            <td>${empleado.puesto}</td>
            <td>${empleado.telefono}</td>
            <td>
                <button onclick="editarEmpleado(${empleado.id}, '${empleado.nombre}', '${empleado.puesto}', '${empleado.telefono}')">✏️ Editar</button>
                <button onclick="eliminarEmpleado(${empleado.id})">❌ Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Editar empleado (carga en el formulario)
function editarEmpleado(id, nombre, puesto, telefono) {
    document.getElementById("id").value = id;
    document.getElementById("nombre").value = nombre;
    document.getElementById("puesto").value = puesto;
    document.getElementById("telefono").value = telefono;
}

// Eliminar empleado
async function eliminarEmpleado(id) {
    if (confirm("¿Estás seguro de eliminar este empleado?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        obtenerEmpleados();
    }
}
