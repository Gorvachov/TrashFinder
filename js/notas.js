// HU-049 – Notas del personal sincronizadas con HU-050 (Historial)

const textoNota = document.getElementById("textoNota");
const btnGuardar = document.getElementById("btnGuardar");
const listaNotasHTML = document.getElementById("listaNotas");

// Cargar notas previas
let notas = JSON.parse(localStorage.getItem("notasRecolector") || "[]");

// Cargar historial previo (HU-050)
let historial = JSON.parse(localStorage.getItem("historialRecolector") || "[]");

function mostrarNotas() {
  listaNotasHTML.innerHTML = "";

  if (notas.length === 0) {
    listaNotasHTML.innerHTML = "<p>No hay notas registradas.</p>";
    return;
  }

  notas.forEach((n, index) => {
    const div = document.createElement("div");
    div.classList.add("nota");

    div.innerHTML = `
            <p>${n.texto}</p>
            <p class="fecha">${n.fecha}</p>
            <button class="btnEliminar" onclick="eliminarNota(${index})">Eliminar</button>
        `;

    listaNotasHTML.appendChild(div);
  });
}

function guardarNota() {
  const texto = textoNota.value.trim();

  if (texto === "") {
    alert("La nota no puede estar vacía.");
    return;
  }

  const nuevaNota = {
    texto,
    fecha: new Date().toLocaleString(),
  };

  // Guardar nota (HU-049)
  notas.unshift(nuevaNota);
  localStorage.setItem("notasRecolector", JSON.stringify(notas));

  // ----------- SINCRONIZAR CON HISTORIAL (HU-050) --------------
  const registroHistorial = {
    id: Date.now(),
    fecha: nuevaNota.fecha,
    ruta: "Nota Personal",
    contenedores: "-",
    incidencias: "-",
    estado: "nota",
    texto: nuevaNota.texto,
    tipo: "nota",
  };

  historial.unshift(registroHistorial);
  localStorage.setItem("historialRecolector", JSON.stringify(historial));
  // --------------------------------------------------------------

  textoNota.value = "";
  mostrarNotas();
}

function eliminarNota(i) {
  notas.splice(i, 1);
  localStorage.setItem("notasRecolector", JSON.stringify(notas));
  mostrarNotas();
}

btnGuardar.addEventListener("click", guardarNota);

mostrarNotas();
