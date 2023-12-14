import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {AnimatePresence, motion} from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa6';

import { Link } from 'react-router-dom';
import { menus, signout } from '../utils/helper';


const Userprofile1 = () => {
    const user =useSelector((state)=>state.user?.user)
    const[ismenu,setmenu]=useState(false)
  return (
    <div className='flex items-center justify-center gap-4 relative'>
    <div className="w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-400">
      {user?.photoURL ? (
        <motion.img
          whileTap={{ scale:.9 }}
          src={user?.photoURL}
          alt={user?.displayName}
          referrerPolicy='no-referrer'
          className='w-full h-full object-cover'  
        />
      ) : (
        <p className='text-2xl text-white font-semibold capitalize '>
          {user?.email[0]}
        </p>
      )}
    </div>
    <motion.div onClick={()=>setmenu(!ismenu)} whileTap={{scale:.9}}className='p-4 rounded-md flex items-center justify-center bg-secondary cursor-pointer'>
<FaChevronDown  className='text-primaryText'/>
    </motion.div>
   <AnimatePresence>
    {ismenu &&( <motion.div className='bg-secondary absolute top-16 right-0 px-4 py-3 rounded-xl z-10 shadow-md flex flex-col items-start justify-start gap-4 min-w-[225px]'>
  {menus && menus.map((menu) => (
    <Link to={menu.uri} key={menu.id} className='hover:bg-green text-primaryText text-lg md:hover:bg-[rgba(256,2566,256,0.05)] px-2 py-1 w-full rounded-md'>
      {menu.name}
    </Link>
  ))}
  <motion.p onClick={signout} whileTap={{scale:.9}}className='text-primaryText text-lg hover:bg-[rgba(256,2566,256,0.05)] px-2 py-1  w-full rounded-md cursor-pointer'>
Sign out
</motion.p>
</motion.div>)}
   </AnimatePresence>
  </div>
);
};
export default Userprofile1
