import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDvIX7cr-dC5lgviOMVErmMIm6pEBVVk2g",
    authDomain: "v-work9.firebaseapp.com",
    projectId: "v-work9",
    storageBucket: "v-work9.appspot.com",
    messagingSenderId: "670208798379",
    appId: "1:670208798379:web:db0737857fdaf9f59551ee",
    measurementId: "G-QD9M7GQG9F"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()

export const auth = firebase.auth()
export const storage = firebase.storage()
export const provider = new firebase.auth.GoogleAuthProvider();