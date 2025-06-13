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
  signInSuccessUrl: window.location.origin + '/conectastudio/dashboard.html',
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
      // Verificar autenticación
      if (authResult.user) {
        console.log('Usuario autenticado:', authResult.user.email);
        // Redirigir manualmente
        window.location.href = window.location.origin + '/conectastudio/dashboard.html';
      }
      return false; // Evitar redirección automática
    },
    uiShown: function() {
      document.getElementById('loader').style.display = 'none';
    }
  }
};

// Inicializar FirebaseUI
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Manejar estado de autenticación
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('Redirigiendo usuario autenticado...');
    window.location.href = window.location.origin + '/conectastudio/dashboard.html';
  } else {
    ui.start('#firebaseui-auth-container', uiConfig);
    document.getElementById('loader').style.display = 'none';
  }
});