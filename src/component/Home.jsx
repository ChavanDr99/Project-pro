import React, { useState } from 'react'
import {HiChevronDoubleLeft} from 'react-icons/hi2' 
import {FaSearchengin} from 'react-icons/fa6' 
import {MdHome} from 'react-icons/md' 
import {motion}  from 'framer-motion'
import {Link} from 'react-router-dom'
import Logo from '../assets/logo3.png'
import { Routes,Route } from 'react-router-dom'
import Project1 from './Project1'
import Sign from './Sign'
import { useDispatch, useSelector } from 'react-redux'
import Userprofile1 from './Userprofile1'
import { SET_SEARCH_TERM } from '../context/action/SearchAc'


const Home = () => {

 const dispatch =useDispatch()
 
    const [isSidebar,setIssidebar]=useState(false)
   const user =useSelector((state)=>state.user?.user)
   const searchterm =useSelector((state) => state.searchterm?.searchterm?state.searchterm?.searchterm:"")
  return (
      <>
      <div whileTap={{scale:0.9}} className={`w-2 ${isSidebar ? "w-2":"flex-[.4] md:flex-[.2] "}
     min-h-screen max-h-screen relative bg-secondary px-3 flex flex-col items-center gap-4 transition-all duration-200 ease-in-out `}>
      
      <motion.div whileTap={{scale:0.9}} onClick={()=>setIssidebar(!isSidebar)}  className="w-8 h-8  bg-secondary rounded-tr-lg rounded-br-lg  absolute -right-7 mt-2 items-center justify-center cursor-pointer flex ">
        <HiChevronDoubleLeft className='text-white text-xl'/>
    </motion.div>
    <div className="overflow-hidden w-full  flex-col gap-4">
      <Link to={'/Home'}>
      <img src={Logo} alt="hello" className='object-contain w-full h-full mt-5 mb-5'/></Link>
      <Link to={'/SwamiProject'} >
        <div className='px-6 py-3 flex  items-center justify-center rounded-lg border border-gray-200 cursor-pointer group '>
          <p className='text-gray-400 hover:text-gray-200'>Start Code</p>
        </div>
      </Link>
      {user ? (
        <Link to={'/Home/project'}  className=' flex items-center justify-center gap-2   mt-2'>
<MdHome className='  text-primaryText text-2xl '/>
<p className='text-lg sm:text-xl text-primaryText'>Home</p>
        </Link>
      ):( <Link to={'/Home/auth'}  className=' flex items-center justify-center gap-2   mt-2'></Link>)}
    </div>
    </div>
    <div className="flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col   items-start justify-start px-4 md:px-12 py-4 md:py-12">
      <div className="w-full flex  items-center justify-between  gap-3 ">
        <div className=' bg-secondary w-full px-3 py-3 rounded-md flex items-center justify-start gap-3 overflow-auto'>
        <FaSearchengin className='text-2xl text-primaryText '/>
         <input value={searchterm} onChange={(e)=>dispatch(SET_SEARCH_TERM(e.target.value))} type='text' className='flex-2 text-xl bg-transparent  text-primaryText placeholder:text-gray-500 outline-none border-none placeholder:text-sm sm:placeholder:text-xl  ' placeholder="Search"/>
        </div>
        {!user &&(
          < motion.div whileTap={{scale:0.9}} className="flex items-center justify-center gap-3">
            <Link className='bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700' to={'/Home/auth'}>
signup
            </Link>
          </motion.div>

        )}
          {user && <Userprofile1 />}

      </div>
      <div className=" w-full">
    
      <Routes>
        <Route path='/*' element={<Project1/>}/>
        <Route path='/auth' element={<Sign/>}/>
      </Routes>

    
    </div>
    </div>
   
        </>

  )
}

export default Home
                                 