// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJBczTfKvptSZT1UkjUDJ70_JtSSD2ggM",
  authDomain: "poupancinha-aluno.firebaseapp.com",
  projectId: "poupancinha-aluno",
  storageBucket: "poupancinha-aluno.appspot.com",
  messagingSenderId: "1063439995105",
  appId: "1:1063439995105:web:89a89590595610ee8367a0",
  measurementId: "G-F36MWEH8SM"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;