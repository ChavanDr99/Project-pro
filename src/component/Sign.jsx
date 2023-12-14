import React, { useState } from 'react'
import Logo from '../assets/logo3.png'
import User from './User'
import { FaEnvelope } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { MdPassword } from 'react-icons/md'
import {AnimatePresence, motion} from 'framer-motion'
import { SignIn} from '../utils/helper'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { fadeinout } from '../animations'

const Sign = () => {
    const [email,setemail] =useState("")
    const [pass,setpass] =useState("")
    const [getemailstatus,setemailstatus] =  useState(false)
    const [islogin,setlogin] =useState(true)
    const [alert,setalert]=useState(false)
    const [alert1,setalert1]=useState(false)
    const [alertmsg,setalertmsg]=useState(false)

    const createNuser= async()=>{
      if (getemailstatus){
        await createUserWithEmailAndPassword(auth,email,pass).then(usercred=>{
          if(usercred){
            console.log(usercred)
            setalert1(true)
            setalertmsg("Sign in Successfully")
            setlogin(!islogin)
         
          }
        }).catch((err)=>{
          console.log(err)
        })
      }
    }

    const loginwithEP= async()=>{
      if (getemailstatus){
        await signInWithEmailAndPassword(auth,email,pass).then(usercred=>{
          if(usercred){
            console.log(usercred)
          }
        }).catch((err)=>{
          console.log(err.message)
          if(err.message.includes("auth/invalid-login-credentials")){
            setalert(true)
            setalertmsg("Invalid User/Credentials")
          }
       else{
            setalert(true)
            setalertmsg("many Fail Login")
          }
          setInterval(() => {
            setalert(false)
          }, 8000);
        })
      }
    }
  return (
    <div className='w-full py-6 '>
        <img src={Logo} alt="logo" className='object-contaon w-32 opacity-70 h-auto' />
        
<AnimatePresence>
  {alert &&(
    <motion.div key={"alert message"} {...fadeinout}className='text-red-500 flex items-center justify-center'>
   {alertmsg}
    </motion.div>
  )}
</AnimatePresence>
<AnimatePresence>
  {alert1 &&(
    <motion.div key={"alert message"} {...fadeinout}className='text-green-500 flex items-center justify-center'>
   {alertmsg}
    </motion.div>
  )}
</AnimatePresence>


        <div className="w-full flex flex-col items-center justify-center py">
        <p className='py-12 text-2xl text-primaryText'> Join With Us!</p>
       
        <div className="px-8 w-full  md:w-auto py-4  rounded bg-secondary flex flex-col items-center justify-center gap-8  shadow-md  ">
        <User label="Email" placeholder="Email" ispass={false} key="Email" setstatefunction={setemail} Icon={FaEnvelope} setemailstatus={setemailstatus}/>
   
        <User label="Password" placeholder="Password" ispass={true} key="" setstatefunction={setpass} Icon={MdPassword}/>


       {!islogin ? (
         <motion.div onClick={createNuser} className='flex items-center justify-center rounded-lg w-full py-3 bg-emerald-600 cursor-pointer hover:bg-emerald-700'>
         <p className='text-xl text-white'>SignUp</p>
                 </motion.div>
       ):(
        <motion.div onClick={loginwithEP} className='flex items-center justify-center rounded-lg w-full py-3 bg-emerald-600 cursor-pointer hover:bg-emerald-700'>
        <p className='text-xl text-white'>Login</p>
                </motion.div>
       )}
       {!islogin ?(

           <p className="text-sm text-primaryText flex items-center justify-center gap-3">Already Have Account ! <span onClick={()=> setlogin(!islogin)} className='text-emerald-600 cursor-pointer'> Login Here</span></p>
           ):(
               
               <p className="text-sm text-primaryText flex items-center justify-center gap-3">Doesn't Have Account ! <span onClick={()=> setlogin(!islogin)} className='text-emerald-600 cursor-pointer'> SignUp</span></p>
       )}
<div className='text-white px-[50%]  border border-white flex'></div>
<motion.div onClick={SignIn} whileTap={{ scale: 0.9 }} className='flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.6)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer'>
    <FcGoogle className='text-3xl' />
    <p className='text-xl'>Sign in with Google</p>
</motion.div>
</div>

        </div>
      </div>
  )
  }

export default Sign
