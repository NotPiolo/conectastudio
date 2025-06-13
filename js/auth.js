// Configuración de Firebase (tus datos son correctos)
const firebaseConfig = {
  apiKey: "AIzaSyD0Hk8OWrqJroj5vwvxsjRbmRwlgKlXNbU", // Usa la clave correcta
  authDomain: "conectastudio-f6f25.firebaseapp.com",
  projectId: "conectastudio-f6f25",
  storageBucket: "conectastudio-f6f25.appspot.com", // Corregí esto
  messagingSenderId: "147811460785",
  appId: "1:147811460785:web:08a9c5e6b543d6bc7a2490"
};

// Elimina measurementId si no usas Analytics

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Configuración mejorada de FirebaseUI
const uiConfig = {
  signInSuccessUrl: 'https://notpiolo.github.io/conectastudio/dashboard.html',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: {
        prompt: 'select_account'
      }
    }
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // Redirigir manualmente para mayor control
      window.location.assign('https://notpiolo.github.io/conectastudio/dashboard.html');
      return false; // Evitar redirección automática
    },
    uiShown: function() {
      document.getElementById('loader').style.display = 'none';
    }
  },
  tosUrl: 'https://notpiolo.github.io/conectastudio/terms',
  privacyPolicyUrl: 'https://notpiolo.github.io/conectastudio/privacy'
};

// Inicializar FirebaseUI solo una vez
let ui = new firebaseui.auth.AuthUI(firebase.auth());
if (ui.isPendingRedirect()) {
  ui.start('#firebaseui-auth-container', uiConfig);
}

// Manejo mejorado del estado de autenticación
firebase.auth().onAuthStateChanged((user) => {
  const authContainer = document.getElementById('firebaseui-auth-container');
  const loader = document.getElementById('loader');
  
  if (user) {
    // Usuario autenticado
    authContainer.style.display = 'none';
    loader.style.display = 'none';
    window.location.href = 'https://notpiolo.github.io/conectastudio/dashboard.html';
  } else {
    // Mostrar interfaz de login
    authContainer.style.display = 'block';
    loader.style.display = 'none';
    
    // Inicializar UI solo si no está ya mostrándose
    if (!ui.isPendingRedirect()) {
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  }
});