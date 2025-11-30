const btn = document.getElementById('mobileMenuBtn');
const body = document.body;
const nav = document.getElementById('primaryNav');

if (btn) {
  btn.addEventListener('click', () => {
    const open = body.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', String(open));
  });
}

// Cierra el menú al hacer clic en un enlace de navegación (en móvil)
if (nav) {
  nav.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName === 'A' && body.classList.contains('nav-open')) {
      body.classList.remove('nav-open');
      btn && btn.setAttribute('aria-expanded', 'false');
    }
  });
}
// Manejo del formulario de contacto
const contactoForm = document.getElementById('contactoForm');

if (contactoForm) {
  contactoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = {
      nombre: document.getElementById('nombre').value,
      apellido: document.getElementById('apellido').value,
      email: document.getElementById('email-contacto').value,
      asunto: document.getElementById('asunto').value,
      mensaje: document.getElementById('mensaje-contacto').value
    };
    
    console.log('📧 Formulario enviado:', formData);
    
    // Simular envío
    const submitBtn = contactoForm.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert('✅ ¡Mensaje enviado con éxito!\n\nGracias por contactarnos, ' + formData.nombre + '. Te responderemos pronto.');
      contactoForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}
