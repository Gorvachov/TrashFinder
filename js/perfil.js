window.onload = () => {
    const n = localStorage.getItem("perfilNombre");
    const e = localStorage.getItem("perfilEmail");
    const dark = localStorage.getItem("darkMode");

    if (n) document.querySelector(".user-name").textContent = n;
    if (e) document.querySelector(".user-email").textContent = e;

    // Aplicar modo oscuro guardado
    if (dark === "true") {
        document.body.classList.add("dark-mode");
        document.getElementById("darkModeToggle").checked = true;
    }

    actualizarIconos();
};

const toggle = document.getElementById("darkModeToggle");

function actualizarIconos() {
    document.querySelectorAll(".icon-mode").forEach(icon => {
        const light = icon.dataset.light;
        const dark = icon.dataset.dark;
        icon.src = document.body.classList.contains("dark-mode") ? dark : light;
    });
}

toggle.addEventListener("change", () => {
    const isDark = toggle.checked;
    document.body.classList.toggle("dark-mode", isDark);
    localStorage.setItem("darkMode", isDark);
    actualizarIconos();
});

function cerrarSesion() {
    alert("Sesión cerrada");
}
