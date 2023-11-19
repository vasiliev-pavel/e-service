// firebaseInit.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
import { getDatabase } from "firebase/database";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Экспортируйте другие сервисы по мере необходимости
export const database = getDatabase(app);
