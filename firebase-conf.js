// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdzadn645vHWipDBrP64-oeAqU-T7CfUg",
  authDomain: "formulario-de-registro-60449.firebaseapp.com",
  projectId: "formulario-de-registro-60449",
  storageBucket: "formulario-de-registro-60449.firebasestorage.app",
  messagingSenderId: "611251484860",
  appId: "1:611251484860:web:7551d611d586fb0381b8b9",
  measurementId: "G-ZK8E11EL1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar Firebase
let app;
let db;
let auth;

try {
    app = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
    console.log("Firebase inicializado correctamente");
} catch (error) {
    console.error("Error inicializando Firebase:", error);
}

// Función para verificar autenticación
function checkAuth() {
    return new Promise((resolve) => {
        auth.onAuthStateChanged(user => {
            resolve(user);
        });
    });
}

// Función para obtener datos de residentes
async function getResidentes() {
    try {
        const querySnapshot = await db.collection("residentes").get();
        return querySnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        });
    } catch (error) {
        console.error("Error obteniendo residentes:", error);
        return [];
    }
}

// Función para agregar residente
async function addResidente(residente) {
    try {
        const docRef = await db.collection("residentes").add({
            ...residente,
            fechaRegistro: new Date()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error agregando residente:", error);
        throw error;
    }
}

// Función para eliminar residente
async function deleteResidente(id) {
    try {
        await db.collection("residentes").doc(id).delete();
        return true;
    } catch (error) {
        console.error("Error eliminando residente:", error);
        throw error;
    }
}