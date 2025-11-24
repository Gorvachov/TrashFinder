// HU-050 – Historial + Notas integradas

const listaHTML = document.getElementById("listaHistorial");

// Cargar historial desde localStorage
let historial = JSON.parse(localStorage.getItem("historialRecolector") || "[]");

function renderHistorial() {
  listaHTML.innerHTML = "";

  if (historial.length === 0) {
    listaHTML.innerHTML = "<p>No hay registros en el historial.</p>";
    return;
  }

  historial.forEach((h) => {
    // Determinar estilo según tipo
    let estadoClass =
      h.estado === "completado"
        ? "ok"
        : h.estado === "advertencia"
        ? "warn"
        : h.estado === "error"
        ? "err"
        : h.estado === "nota"
        ? "note"
        : "";

    const div = document.createElement("div");
    div.classList.add("entry");

    // Si el registro viene de notas.js
    if (h.tipo === "nota") {
      div.innerHTML = `
                <h4>📝 Nota personal
                    <span class="estado note">NOTA</span>
                </h4>

                <div class="details">
                    <p><strong>Fecha:</strong> ${h.fecha}</p>
                    <p>${h.texto}</p>
                </div>
            `;
    } else {
      // Actividad normal (ruta, incidencias)
      div.innerHTML = `
                <h4>${h.ruta}
                    <span class="estado ${estadoClass}">
                        ${h.estado.toUpperCase()}
                    </span>
                </h4>

                <div class="details">
                    <p><strong>Fecha:</strong> ${h.fecha}</p>
                    <p><strong>Contenedores atendidos:</strong> ${
                      h.contenedores
                    }</p>
                    <p><strong>Incidencias:</strong> ${h.incidencias}</p>
                </div>
            `;
    }

    listaHTML.appendChild(div);
  });
}

renderHistorial();
