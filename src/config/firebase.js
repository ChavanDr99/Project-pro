import {getApps,getApp,initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBl1KKWJ8uI6BRJC3GjNTLP_TIGtUuUtgQ",
  authDomain: "projectpro-6a8c0.firebaseapp.com",
  projectId: "projectpro-6a8c0",
  storageBucket: "projectpro-6a8c0.appspot.com",
  messagingSenderId: "217051945821",
  appId: "1:217051945821:web:79f9d5dde8c7d0295f26b4",
  measurementId: "G-CEHLMVLL1T"
};

  const app =getApps.length>0 ? getApp() : initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db=getFirestore(app)
  export {app,auth,db};



  