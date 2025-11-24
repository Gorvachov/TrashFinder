// HU-002 Capacitación – Gestión de cursos

const listaCursosHTML = document.getElementById("listaCursos");

// Cursos simulados
const cursos = [
  {
    id: 1,
    titulo: "Uso correcto del equipo de protección personal",
    video: "https://www.youtube.com/embed/0lZ1vV3RmZc",
    descripcion:
      "Aprende cómo utilizar guantes, mascarillas y chalecos reflectantes.",
  },
  {
    id: 2,
    titulo: "Protocolos de recolección segura",
    video: "https://www.youtube.com/embed/HY6z1DNl9ZM",
    descripcion: "Buenas prácticas para una recolección segura y eficiente.",
  },
  {
    id: 3,
    titulo: "Clasificación de residuos sólidos",
    video: "https://www.youtube.com/embed/TW9W6z3HnAI",
    descripcion: "Guía básica sobre cómo separar adecuadamente los residuos.",
  },
];

let completados = JSON.parse(localStorage.getItem("cursosCompletados") || "[]");

// Renderizar cursos
function mostrarCursos() {
  listaCursosHTML.innerHTML = "";

  cursos.forEach((c) => {
    const div = document.createElement("div");
    div.classList.add("curso");

    div.innerHTML = `
            <h4>${c.titulo} ${
      completados.includes(c.id)
        ? '<span class="check">✔ Completado</span>'
        : ""
    }</h4>
            
            <iframe width="100%" height="250" src="${
              c.video
            }" frameborder="0" allowfullscreen></iframe>

            <p>${c.descripcion}</p>

            <button 
                ${
                  completados.includes(c.id)
                    ? 'class="completado" disabled'
                    : ""
                } 
                onclick="completarCurso(${c.id})">
                ${
                  completados.includes(c.id)
                    ? "Completado"
                    : "Marcar como completado"
                }
            </button>
        `;

    listaCursosHTML.appendChild(div);
  });
}

function completarCurso(id) {
  if (!completados.includes(id)) {
    completados.push(id);
    localStorage.setItem("cursosCompletados", JSON.stringify(completados));
    mostrarCursos();
  }
}

mostrarCursos();
