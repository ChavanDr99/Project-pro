import React, { useState } from 'react'
import {  FaEye, FaEyeSlash } from 'react-icons/fa6'
import {motion} from "framer-motion"
const User = ( {label,placeholder, ispass, setstatefunction, Icon,setemailstatus}) => {
    const [value ,setValue] =useState("")
    const [showpass,setshowpass]=useState(true)
    const [isemailV,setemailv]=useState(false)
    const handle=(e)=>{
setValue(e.target.value)
setstatefunction(e.target.value)
if(placeholder==="Email"){
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const status = re.test(value)
    setemailv(status)
    setemailstatus(status)
}
    }
  return (
    <div className='flex flex-col items-start justify-start gap-1'>
     <label className='text-sm text-gray-300'>{label}</label>
     <div className={`flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-gray-200 ${
        !isemailV && placeholder ==="Email" && value.length > 0 &&
        ""
     }`}>
        <Icon className='text-text555 text-2xl'/>
        <input onChange={handle} value={value} type={ispass && showpass ? 'password':'text'} placeholder={placeholder}className='flex-1 w-full h-full outline-none border-none bg-transparent text-text555 text-lg' />
{ispass &&(
    <motion.div  onClick={()=>setshowpass(!showpass)} whileTap={{scale:0.9}} className="cursor-pointer ">
   {showpass ?(
            <FaEyeSlash className='text-text555  text-2xl'/>
   ):(
    <FaEye className='text-text555  text-2xl'/>
   )}
    
</motion.div>
)}

     </div>
    </div>
  )
}

export default User
