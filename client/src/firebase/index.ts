// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'apartment-management-42b1a.firebaseapp.com',
  projectId: 'apartment-management-42b1a',
  storageBucket: 'apartment-management-42b1a.appspot.com',
  messagingSenderId: '480707102388',
  appId: '1:480707102388:web:ae322461f419870c9a39e1',
  measurementId: 'G-NBCL62BBZE',
  databaseURL: 'https://apartment-management-42b1a-default-rtdb.firebaseio.com',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
