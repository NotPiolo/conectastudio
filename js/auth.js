// Configuración de Firebase (reemplaza con tus propios datos)
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    projectId: "TU_PROYECTO",
    storageBucket: "TU_PROYECTO.appspot.com",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Configuración de FirebaseUI
const uiConfig = {
    signInSuccessUrl: 'dashboard.html',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    tosUrl: '<your-tos-url>',
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

// Inicializar FirebaseUI
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Manejar el estado de autenticación
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Usuario autenticado, redirigir al dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Mostrar el widget de autenticación
        ui.start('#firebaseui-auth-container', uiConfig);
        document.getElementById('loader').style.display = 'none';
    }
});