// ===== Menú móvil
const btn = document.getElementById('mobileMenuBtn');
const body = document.body;
const nav = document.getElementById('primaryNav');

btn?.addEventListener('click', () => {
  const open = body.classList.toggle('nav-open');
  btn.setAttribute('aria-expanded', String(open));
});

// Cerrar drawer al hacer click en un enlace
nav?.addEventListener('click', (e) => {
  const t = e.target;
  if (t.tagName === 'A' && body.classList.contains('nav-open')) {
    body.classList.remove('nav-open');
    btn?.setAttribute('aria-expanded', 'false');
  }
});

// ===== Flujo: Empieza ahora -> Splash -> Login
const startBtn = document.getElementById('startBtn');
const splash = document.getElementById('splash');
const auth = document.getElementById('auth');

function showSplash() {
  splash.classList.remove('hidden');
  body.classList.add('lock'); // evita scroll
}

function hideSplashAndShowLogin() {
  splash.classList.add('hidden');
  auth.classList.remove('hidden');
  auth.setAttribute('aria-hidden', 'false');
  // Enfocar el primer campo
  const firstInput = auth.querySelector('input[name="email"]');
  setTimeout(() => firstInput?.focus(), 50);
}

startBtn?.addEventListener('click', () => {
  showSplash();
  // Simula carga (ajusta duración si quieres)
  setTimeout(hideSplashAndShowLogin, 1600);
});

// ===== Login: mostrar/ocultar contraseña
const togglePwd = document.getElementById('togglePwd');
const pwdInput = document.getElementById('passwordInput');

togglePwd?.addEventListener('click', () => {
  const isPassword = pwdInput.type === 'password';
  pwdInput.type = isPassword ? 'text' : 'password';
  togglePwd.setAttribute('aria-label', isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña');
});

// (Opcional) prevenir submit real por ahora
document.querySelector('.auth-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Inicio de sesión simulado ✅');
});
