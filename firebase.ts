// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCJwe3PGCrm4erGszos381MpF4VPoydnyI',
  authDomain: 'netflix-clone-tutorial-4c37d.firebaseapp.com',
  projectId: 'netflix-clone-tutorial-4c37d',
  storageBucket: 'netflix-clone-tutorial-4c37d.appspot.com',
  messagingSenderId: '157372664095',
  appId: '1:157372664095:web:83ddaa930aa4528d4e482a',
}

// Initialize Firebase
// check is a next-js thing, if getApps is already initialized than getApp() else initializeApp
// After you initialize a Firebase App object in your code, you can add and start using Firebase services.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
// initialize DataBase in our project
const db = getFirestore()
// initialize Authentication in our project
// this variable will be populated with info from the google acc. which logged in.
const auth = getAuth()

export default app
export { auth, db }
