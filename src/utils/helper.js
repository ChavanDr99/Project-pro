import {auth} from '../config/firebase.js'
import { GoogleAuthProvider, signInWithRedirect} from 'firebase/auth'

import { v4 as uuidv4 } from 'uuid';
const  googleAuthProvider = new GoogleAuthProvider()
export const SignIn =async()=>{
try{
 await signInWithRedirect(auth,googleAuthProvider).then(usercred=>{
    window.location.reload() })
 }
 catch (error) {
   console.error('Sign-in error:', error);
 }

}

export const menus = [
   { id: uuidv4(), name: 'Project', uri: '/Home/Project' },
   { id: uuidv4(), name: 'Collection', uri: '/Home/Collection' },
   { id: uuidv4(), name: 'Profile', uri: '/Home/Profile' },
  
 ];

 export const signout =async()=>{
await auth.signOut().then(()=>{
   window.location.reload();
})
 }