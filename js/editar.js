// ===== Helpers =====
const loadUsers = () => JSON.parse(localStorage.getItem("tf_users") || "[]");
const saveUsers = (users) => localStorage.setItem("tf_users", JSON.stringify(users));
const setSession = (email) => localStorage.setItem("tf_session", email);

const byId = (id) => document.getElementById(id);

// ===== Cargar datos previos (si el usuario volvió al formulario) =====
window.onload = () => {
    const campos = [
        "r-username",
        "r-nombres",
        "r-apepat",
        "r-apemat",
        "r-telefono",
        "r-email"
    ];

    campos.forEach(id => {
        const valor = localStorage.getItem("draft_" + id);
        if (valor) byId(id).value = valor;
    });
};

// ===== Guardar datos mientras escribe (modo borrador) =====
["r-username","r-nombres","r-apepat","r-apemat","r-telefono","r-email"].forEach(id => {
    const el = byId(id);
    el?.addEventListener("input", () => {
        localStorage.setItem("draft_" + id, el.value);
    });
});

// ===== Registrar usuario =====
function guardarDatos() {
    const mensajeError = byId("mensajeError");
    mensajeError.textContent = "";

    const user = {
        id: Date.now(),
        username: byId("r-username").value.trim(),
        nombres: byId("r-nombres").value.trim(),
        apepat: byId("r-apepat").value.trim(),
        apemat: byId("r-apemat").value.trim(),
        telefono: byId("r-telefono").value.trim(),
        email: byId("r-email").value.trim().toLowerCase()
    };

    if (!user.username || !user.nombres || !user.apepat || !user.email) {
        mensajeError.textContent = "Por favor completa todos los campos obligatorios.";
        return;
    }

    const users = loadUsers();

    if (users.some(u => u.email === user.email)) {
        mensajeError.textContent = "Ya existe una cuenta con este correo.";
        return;
    }

    users.push(user);
    saveUsers(users);
    setSession(user.email);

    // Guardar datos de perfil para otras vistas
    localStorage.setItem("perfilNombre", `${user.nombres} ${user.apepat}`);
    localStorage.setItem("perfilEmail", user.email);

    // Limpiar borradores
    ["r-username","r-nombres","r-apepat","r-apemat","r-telefono","r-email"].forEach(id => {
        localStorage.removeItem("draft_" + id);
    });

    // Redirigir
    window.location.href = "dashboard.html";
}

// ===== Dark mode global =====
document.addEventListener("DOMContentLoaded", () => {
    const dark = localStorage.getItem("darkMode");
    if (dark === "true") {
        document.body.classList.add("dark-mode");
    }
});

// ===== Volver =====
function volverPerfil() {
    window.location.href = "perfil.html";
}
