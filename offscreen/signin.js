
const firebaseConfig = {
    apiKey: "AIzaSyD0qhoBxwOJ4b1QM4dLl3W3uHGOIKVr99s",
    authDomain: "chrome-extension-e8f45.firebaseapp.com",
    projectId: "chrome-extension-e8f45",
    storageBucket: "chrome-extension-e8f45.firebasestorage.app",
    messagingSenderId: "381658422267",
    appId: "1:381658422267:web:d59aca979636bdf7f0c95e",
    measurementId: "G-R7M2QEZ2Y7"
  };
  const app = firebase.initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)