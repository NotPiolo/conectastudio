// Configuración de Firebase (debe coincidir con auth.js)
const firebaseConfig = {
  apiKey: "AIzaSyD0Hk8OWrqJroj5vwvxsjRbmRwlgKlXNbU",
  authDomain: "conectastudio-f6f25.firebaseapp.com",
  projectId: "conectastudio-f6f25",
  storageBucket: "conectastudio-f6f25.appspot.com",
  messagingSenderId: "147811460785",
  appId: "1:147811460785:web:08a9c5e6b543d6bc7a2490"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const basePath = window.location.hostname === 'localhost' ? '' : '/conectastudio';

// Mostrar datos del usuario
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // Actualizar perfil del usuario
    document.getElementById('user-avatar').src = user.photoURL || './images/default-avatar.png';
    document.getElementById('user-name').textContent = user.displayName || 'Usuario';
    document.getElementById('dashboard-title').textContent = `Bienvenido, ${user.displayName?.split(' ')[0] || 'Usuario'}`;
    
    // Aquí puedes cargar más datos del usuario desde Firestore si es necesario
  } else {
    // Redirigir a login si no está autenticado
    window.location.href = `${basePath}/login.html`;
  }
});

// Cerrar sesión
document.getElementById('sign-out').addEventListener('click', () => {
  firebase.auth().signOut().then(() => {
    window.location.href = './login.html';
  }).catch((error) => {
    console.error('Error al cerrar sesión:', error);
  });
});

// Aquí puedes añadir más lógica para cargar materias, tareas, etc.