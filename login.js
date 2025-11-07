// Ajusta el tiempo de splash (ms)
const SPLASH_MS = 1800;

window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const auth   = document.getElementById('auth');
  const body   = document.body;

  setTimeout(() => {
    splash.classList.add('hidden');   // oculta la pantalla verde
    auth.classList.remove('hidden');  // muestra el login
    auth.setAttribute('aria-hidden', 'false');
    body.classList.remove('lock');    // vuelve a permitir scroll
    auth.querySelector('input[type="email"]')?.focus();
  }, SPLASH_MS);
});
