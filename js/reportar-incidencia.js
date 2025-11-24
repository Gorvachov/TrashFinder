// Variables globales
let photoFile = null;
let currentLocation = { lat: null, lng: null };

// Referencias DOM
const photoInput = document.getElementById('foto-incidencia');
const photoUploadArea = document.getElementById('photoUploadArea');
const photoPreview = document.getElementById('photoPreview');
const previewImage = document.getElementById('previewImage');
const comentarioTextarea = document.getElementById('comentario');
const charCount = document.getElementById('charCount');
const formIncidencia = document.getElementById('formIncidencia');
const statusMessage = document.getElementById('statusMessage');
const incidentList = document.getElementById('incidentList');

// Obtener ubicación automáticamente al cargar
window.addEventListener('load', () => {
  obtenerUbicacion();
  cargarIncidenciasGuardadas();
});

// Click en el área de foto
photoUploadArea.addEventListener('click', () => {
  photoInput.click();
});

// Cuando se selecciona una foto
photoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    photoFile = file;
    const reader = new FileReader();
    
    reader.onload = (event) => {
      previewImage.src = event.target.result;
      photoPreview.classList.add('hidden');
      previewImage.classList.remove('hidden');
    };
    
    reader.readAsDataURL(file);
  }
});

// Contador de caracteres
comentarioTextarea.addEventListener('input', () => {
  const length = comentarioTextarea.value.length;
  charCount.textContent = length;
  
  if (length > 280) {
    charCount.style.color = '#FF8C42';
  } else {
    charCount.style.color = '#666';
  }
});

// Obtener ubicación
function obtenerUbicacion() {
  const locationText = document.getElementById('locationText');
  
  if ('geolocation' in navigator) {
    locationText.textContent = '📍 Obteniendo ubicación...';
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentLocation.lat = position.coords.latitude;
        currentLocation.lng = position.coords.longitude;
        
        document.getElementById('latitud').value = currentLocation.lat;
        document.getElementById('longitud').value = currentLocation.lng;
        
        locationText.textContent = `✅ Ubicación obtenida (${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)})`;
      },
      (error) => {
        locationText.textContent = '⚠️ No se pudo obtener ubicación';
        console.error('Error de geolocalización:', error);
      }
    );
  } else {
    locationText.textContent = '⚠️ Geolocalización no disponible';
  }
}

// Botón actualizar ubicación
document.getElementById('btnGetLocation').addEventListener('click', obtenerUbicacion);

// Enviar formulario
formIncidencia.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Validar que hay foto
  if (!photoFile) {
    mostrarEstado('⚠️ Debes agregar una foto', 'error');
    return;
  }
  
  // Recopilar datos
  const incidencia = {
    id: 'INC-' + Date.now(),
    foto: photoFile.name,
    fotoData: previewImage.src, // Base64 para demo
    categoria: document.getElementById('categoria').value,
    comentario: document.getElementById('comentario').value,
    latitud: currentLocation.lat,
    longitud: currentLocation.lng,
    estado: 'Pendiente',
    fecha: new Date().toLocaleString('es-PE'),
    recolector: 'Juan Pérez' // En producción vendría del usuario logueado
  };
  
  console.log('📤 Enviando incidencia:', incidencia);
  
  // Simular envío
  const btnEnviar = document.getElementById('btnEnviar');
  btnEnviar.disabled = true;
  btnEnviar.textContent = '⏳ Enviando...';
  
  setTimeout(() => {
    // Guardar en localStorage
    guardarIncidencia(incidencia);
    
    // Mostrar éxito
    mostrarEstado('✅ Incidencia enviada correctamente', 'success');
    
    // Actualizar lista
    cargarIncidenciasGuardadas();
    
    // Resetear formulario
    formIncidencia.reset();
    photoFile = null;
    previewImage.classList.add('hidden');
    photoPreview.classList.remove('hidden');
    charCount.textContent = '0';
    
    btnEnviar.disabled = false;
    btnEnviar.textContent = '📤 Enviar reporte';
    
    // Scroll al top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 1500);
});

// Guardar incidencia en localStorage
function guardarIncidencia(incidencia) {
  let incidencias = JSON.parse(localStorage.getItem('incidencias') || '[]');
  incidencias.unshift(incidencia); // Agregar al inicio
  localStorage.setItem('incidencias', JSON.stringify(incidencias));
}

// Cargar incidencias guardadas
function cargarIncidenciasGuardadas() {
  const incidencias = JSON.parse(localStorage.getItem('incidencias') || '[]');
  
  if (incidencias.length === 0) {
    incidentList.innerHTML = '<p class="dash-meta">No hay incidencias reportadas aún.</p>';
    return;
  }
  
  incidentList.innerHTML = incidencias.slice(0, 5).map(inc => `
    <article class="dash-card incident-card">
      <img src="${inc.fotoData}" alt="Incidencia" class="incident-thumb">
      <div class="incident-info">
        <p class="dash-route-title">${inc.id} - ${inc.categoria}</p>
        <p class="dash-route-meta">${inc.comentario.substring(0, 60)}...</p>
        <p class="dash-route-meta">📅 ${inc.fecha}</p>
        <span class="status-badge status-${inc.estado.toLowerCase()}">${inc.estado}</span>
      </div>
    </article>
  `).join('');
}

// Mostrar mensaje de estado
function mostrarEstado(mensaje, tipo) {
  statusMessage.textContent = mensaje;
  statusMessage.className = `status-message ${tipo}`;
  statusMessage.classList.remove('hidden');
  
  setTimeout(() => {
    statusMessage.classList.add('hidden');
  }, 4000);
}