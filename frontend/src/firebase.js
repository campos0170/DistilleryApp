// src/firebase.js
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace these placeholders with your actual Firebase project settings
const firebaseConfig = {
    apiKey: "AIzaSyBboNDke-L92fAbSWTbaMMAtXU1Y-QOKQA",
    authDomain: "whiskeylistapp.firebaseapp.com",
    projectId: "whiskeylistapp",
    storageBucket: "whiskeylistapp.firebasestorage.app",
    messagingSenderId: "516864852458",
    appId: "1:516864852458:web:6380d4bd1033c422787293"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
