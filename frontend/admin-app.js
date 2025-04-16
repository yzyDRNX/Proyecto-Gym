// frontend/admin-app.js
const API_URL = "http://localhost:3003/api/entrenadores";

document.addEventListener("DOMContentLoaded", function () {
  // Referencias
  const btnAdd = document.getElementById("btn-add");
  const formAdd = document.getElementById("form-add");
  const formEdit = document.getElementById("form-edit");
  const modalDelete = document.getElementById("modal-delete");
  const btnDeleteConfirm = document.getElementById("btn-delete-confirm");
  const btnDeleteCancel = document.getElementById("btn-delete-cancel");
  const modalEdit = document.getElementById("modal-edit");
  const btnEditCancel = document.getElementById("btn-edit-cancel");
  const formAddElement = document.querySelector("#form-add form");

  let trainerCardToDelete = null;
  let trainerCardToEdit = null;

  // Mostrar/ocultar formulario de agregar
  btnAdd.addEventListener("click", function () {
    formAdd.classList.toggle("hidden");
  });

  // Delegación de eventos para editar/eliminar
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("icon-delete")) {
      trainerCardToDelete = e.target.closest(".trainer-card");
      modalDelete.classList.remove("hidden");
    }

    if (e.target.classList.contains("icon-edit")) {
      trainerCardToEdit = e.target.closest(".trainer-card");
      if (trainerCardToEdit) {
        const nombre = trainerCardToEdit.querySelector("h2").innerText;
        const paragraphs = trainerCardToEdit.querySelectorAll("p");
        const especialidad = paragraphs[0].innerText.split(": ")[1] || "";
        const experiencia = paragraphs[1].innerText.split(": ")[1] || "";
        const numero_telefonico = paragraphs[2].innerText.split(": ")[1] || "";
        const correo_electronico = paragraphs[3].innerText.split(": ")[1] || "";

        document.getElementById("edit-nombre").value = nombre;
        document.getElementById("edit-especialidad").value = especialidad;
        document.getElementById("edit-experiencia").value = experiencia;
        document.getElementById("edit-telefono").value = numero_telefonico;
        document.getElementById("edit-correo").value = correo_electronico;

        modalEdit.classList.remove("hidden");
      }
    }
  });

  // Confirmar eliminación
  btnDeleteConfirm.addEventListener("click", function () {
    if (trainerCardToDelete) {
      const trainerId = trainerCardToDelete.getAttribute("data-id");
      fetch(`${API_URL}/${trainerId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) throw new Error("Error al eliminar entrenador");
          return response.json();
        })
        .then(() => {
          trainerCardToDelete = null;
          modalDelete.classList.add("hidden");
          cargarEntrenadores();
        })
        .catch((error) => console.error("Error:", error));
    }
  });

  // Cancelar eliminación
  btnDeleteCancel.addEventListener("click", function () {
    modalDelete.classList.add("hidden");
    trainerCardToDelete = null;
  });

  // Confirmar edición
  formEdit.addEventListener("submit", function (e) {
    e.preventDefault();

    if (trainerCardToEdit) {
      const trainerId = trainerCardToEdit.getAttribute("data-id");
      const entrenadorActualizado = {
        nombre: document.getElementById("edit-nombre").value,
        especialidad: document.getElementById("edit-especialidad").value,
        experiencia: document.getElementById("edit-experiencia").value,
        numero_telefonico: document.getElementById("edit-telefono").value,
        correo_electronico: document.getElementById("edit-correo").value,
      };

      fetch(`${API_URL}/${trainerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entrenadorActualizado),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Error al actualizar entrenador");
          return response.json();
        })
        .then(() => {
          modalEdit.classList.add("hidden");
          trainerCardToEdit = null;
          cargarEntrenadores();
        })
        .catch((error) => console.error("Error:", error));
    }
  });

  // Cancelar edición
  btnEditCancel.addEventListener("click", function () {
    modalEdit.classList.add("hidden");
    trainerCardToEdit = null;
  });

  // Agregar entrenador
  formAddElement.addEventListener("submit", function (e) {
    e.preventDefault();

    const nuevoEntrenador = {
      nombre: formAddElement.nombre.value,
      especialidad: formAddElement.especialidad.value,
      experiencia: formAddElement.experiencia.value,
      numero_telefonico: formAddElement.numero_telefonico.value,
      correo_electronico: formAddElement.correo_electronico.value,
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoEntrenador),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al agregar entrenador");
        return response.json();
      })
      .then(() => {
        formAddElement.reset();
        formAdd.classList.add("hidden");
        cargarEntrenadores();
      })
      .catch((error) => console.error("Error:", error));
  });

  cargarEntrenadores();
});

function cargarEntrenadores() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      const trainersList = document.querySelector(".trainers-list");
      trainersList.innerHTML = "";

      data.forEach((entrenador) => {
        const card = document.createElement("div");
        card.classList.add("trainer-card");
        card.setAttribute("data-id", entrenador.id);
        card.innerHTML = `
          <h2>${entrenador.nombre}</h2>
          <p>Especialidad: ${entrenador.especialidad}</p>
          <p>Experiencia: ${entrenador.experiencia}</p>
          <p>Teléfono: ${entrenador.numero_telefonico}</p>
          <p>Correo: ${entrenador.correo_electronico}</p>
          <div class="actions">
            <span class="icon-edit">✎</span>
            <span class="icon-delete">🗑️</span>
          </div>`;
        trainersList.appendChild(card);
      });
    })
    .catch((error) => console.error("Error al cargar entrenadores:", error));
}
