import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBB0aQIfPdGN19ShLCDzShXVj2kMIWPghU',
  authDomain: 'challenge-07-28150.firebaseapp.com',
  projectId: 'challenge-07-28150',
  storageBucket: 'challenge-07-28150.firebasestorage.app',
  messagingSenderId: '214438557386',
  appId: '1:214438557386:web:4f6b1a4787c28712646633',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
