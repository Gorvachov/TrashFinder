window.onload = () => {

    // Cargar datos de sesión
    const users = JSON.parse(localStorage.getItem("tf_users") || "[]");
    const sessionEmail = localStorage.getItem("tf_session");
    const me = users.find(u => u.email === sessionEmail);

    // Construir nombre completo
    let nombreCompleto = "Usuario";
    let correo = "correo@no-registrado.com";

    if (me) {
        const nombre = me.nombres || "";
        const apellido = me.apepat || "";
        nombreCompleto = `${nombre} ${apellido}`.trim();
        correo = me.email || correo;
    }

    // Pintar datos en HTML
    const nameEl  = document.querySelector(".user-name");
    const emailEl = document.querySelector(".user-email");

    if (nameEl)  nameEl.textContent  = nombreCompleto;
    if (emailEl) emailEl.textContent = correo;
};

function volverPerfil() {
    window.location.href = "dashboard.html";
}

// Cerrar sesión
function cerrarSesion() {
    alert("Sesión cerrada");

    // borrar sesión real
    localStorage.removeItem("tf_session");

    // volver a login
    window.location.href = "login.html";
}




