import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBR1vwr0Fe9dr3m__jZm23dzK_ZoQ1Qsjg",
  authDomain: "health-monitoring-app-336017.firebaseapp.com",
  projectId: "health-monitoring-app-336017",
  storageBucket: "health-monitoring-app-336017.appspot.com",
  messagingSenderId: "233202881824",
  appId: "1:233202881824:web:f079864218568b9b3df345",
  measurementId: "G-3DYGS4YCM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore();


export { auth, db, app };
