// Variables globales
let photoFile = null;
let currentLocation = { lat: null, lng: null };

// Referencias DOM
const photoInput = document.getElementById('foto-contenedor');
const photoUploadArea = document.getElementById('photoUploadArea');
const photoPreview = document.getElementById('photoPreview');
const previewImage = document.getElementById('previewImage');
const comentarioTextarea = document.getElementById('comentario');
const charCount = document.getElementById('charCount');
const formContenedor = document.getElementById('formContenedor');
const statusMessage = document.getElementById('statusMessage');
const containerList = document.getElementById('containerList');

window.addEventListener('load', () => {
  obtenerUbicacion();
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