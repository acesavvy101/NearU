import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA-zozM4BP6pmvXLaWSYB40Sw1JlajUa7s",
    authDomain: "nearu-5433d.firebaseapp.com",
    projectId: "nearu-5433d",
    storageBucket: "nearu-5433d.firebasestorage.app",
    messagingSenderId: "687544318472",
    appId: "1:687544318472:web:253149fe3ddbea54e92fbd",
    measurementId: "G-20J1QNS9ZW"
  };
const app = initializeApp(firebaseConfig);

// Long polling helps Firestore connect reliably inside Expo
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});