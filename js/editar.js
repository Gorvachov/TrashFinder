// ===== Helpers =====
const loadUsers = () => JSON.parse(localStorage.getItem("tf_users") || "[]");
const saveUsers = (u) => localStorage.setItem("tf_users", JSON.stringify(u));
const byId = (id) => document.getElementById(id);

// ===== Cargar datos del usuario logueado =====
window.addEventListener("DOMContentLoaded", () => {
    const emailSesion = localStorage.getItem("tf_session");
    const users = loadUsers();
    const me = users.find(u => u.email === emailSesion);

    if (!me) {
        alert("No hay sesión activa");
        window.location.href = "login.html";
        return;
    }

    // Rellenar campos
    byId("r-username").value = me.username || "";
    byId("r-nombres").value = me.nombres || "";
    byId("r-apepat").value = me.apepat || "";
    byId("r-apemat").value = me.apemat || "";
    byId("r-telefono").value = me.telefono || "";
    byId("r-email").value = me.email || "";
});

// ===== Guardar cambios (editar usuario) =====
function guardarDatos() {
    const mensajeError = byId("mensajeError");
    mensajeError.textContent = "";

    const emailSesion = localStorage.getItem("tf_session");
    const users = loadUsers();
    const idx = users.findIndex(u => u.email === emailSesion);

    if (idx === -1) {
        mensajeError.textContent = "Error: usuario no encontrado.";
        return;
    }

    // Editar usuario existente
    users[idx].username = byId("r-username").value.trim();
    users[idx].nombres  = byId("r-nombres").value.trim();
    users[idx].apepat   = byId("r-apepat").value.trim();
    users[idx].apemat   = byId("r-apemat").value.trim();
    users[idx].telefono = byId("r-telefono").value.trim();
    users[idx].email    = byId("r-email").value.trim().toLowerCase();

    // Validar obligatorios
    if (!users[idx].username || !users[idx].nombres || !users[idx].apepat || !users[idx].email) {
        mensajeError.textContent = "Por favor completa todos los campos obligatorios.";
        return;
    }

    // Guardar en storage
    saveUsers(users);

    // Actualizar sesión si cambió el email
    localStorage.setItem("tf_session", users[idx].email);

    // Actualizar datos de perfil
    localStorage.setItem("perfilNombre", `${users[idx].nombres} ${users[idx].apepat}`);
    localStorage.setItem("perfilEmail", users[idx].email);

    alert("Datos actualizados correctamente.");
    window.location.href = "perfil.html";
}

// ===== Modo oscuro =====
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
});

// ===== Volver =====
function volverPerfil() {
    window.location.href = "perfil.html";
}
