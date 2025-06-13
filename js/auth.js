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

// Configuración mejorada de FirebaseUI
const uiConfig = {
  signInSuccessUrl: '/dashboard.html',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: {
        prompt: 'select_account'
      }
    }
  ],
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // Verificar si el usuario está autenticado
      if (authResult.user) {
        console.log('Usuario autenticado:', authResult.user.email);
        // Redirigir después de 1 segundo para asegurar la sesión
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1000);
      }
      return false; // Evitar redirección automática
    },
    uiShown: function() {
      document.getElementById('loader').style.display = 'none';
    }
  }
};

// Inicializar FirebaseUI
let ui = new firebaseui.auth.AuthUI(firebase.auth());

// Manejar estado de autenticación
firebase.auth().onAuthStateChanged((user) => {
  const authContainer = document.getElementById('firebaseui-auth-container');
  const loader = document.getElementById('loader');
  
  if (user) {
    console.log('Usuario ya autenticado:', user.email);
    window.location.href = 'dashboard.html';
  } else {
    if (authContainer && loader) {
      authContainer.style.display = 'block';
      loader.style.display = 'none';
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  }
});