import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider
    } 
    from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBfQpSB-QuK9vaguBIKfQOrjev2Ov0icX8",
    authDomain: "crwn-clothing-db-69832.firebaseapp.com",
    projectId: "crwn-clothing-db-69832",
    storageBucket: "crwn-clothing-db-69832.appspot.com",
    messagingSenderId: "258547352824",
    appId: "1:258547352824:web:e830635d7e8d3d7fd4270d"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);