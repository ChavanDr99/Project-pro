import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from 'react-icons/fa6'
import { FcSettings } from 'react-icons/fc'
import SplitPane from 'react-split-pane'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import Logo from '../assets/logo3.png'
import {Link} from 'react-router-dom'
import { AnimatePresence ,motion} from 'framer-motion';
import { MdCheck, MdEdit } from 'react-icons/md';
import { useSelector } from 'react-redux'
import Userprofile1 from './Userprofile1';
import { doc, setDoc } from 'firebase/firestore';
import {db } from '../config/firebase';




const SwamiProject = () => {
  const [html,sethtml]=useState("")
  const [css,setcss]=useState("")
  const [js,setjs]=useState("")
  const [op,setop]=useState("")
  const [istitle,setistitle]=useState("")
  const [title,settitle]=useState("Title")
  const[alert1,setalert1]=useState(false)
      const [alertmsg,setalertmsg]=useState(false)
  
  const user =useSelector((state)=>state.user?.user)
  useEffect(()=>{
updatefun()
  },[html,css,js])
  const updatefun=()=>{
const combineop=`
<html>
<head>
<style>${css}</style>
</head>
<body>
${html}
<script>
${js}
</script>
</body>
</html>
`;setop(combineop)}
const saveprogram= async()=>{
  const id= `${Date.now()}`
  const _doc={
    id:id,
    title:title, 
    html:html,
    css:css,
    js:js,
    op:op,user:user
  }
  await setDoc(doc(db,"Projects",id),_doc).then((res)=>{
setalert1(true)
setalertmsg("Project Saved...")
window.location.href = "/Home/project";
  }).catch((e)=>{
console.log(e)
  })
  setInterval(() => {
    setalert1(false)
  }, 3000);
}

  return (
    <> 
     <div className='text-white  md:w-screen  md:h-screen flex flex-col items-start justify-start'>
      {/* {alert} */}
      <AnimatePresence>
  {alert1 &&(
    <div className="fixed top-24 right-12 z-10">

     <div className=" bg-emerald-500 rounded-md px-4 py-2 text-primary font-semibold cursor-pointer hover:shadow-md shadow-emerald-500">
     <p className='text-lg text-primary'>{alertmsg}</p>
    </div>
    </div>
  )}
</AnimatePresence>
{/* <Alert status={"Success"} alertmsg={"Project Saved..."} */}
    <header className=' w-[40% ] md:w-full flex items-center justify-between px-4 md:px-12 py-4  '>
<div className="flex items-center justify-center gap-6">
<Link to={'/Home'}>
      <img src={Logo} alt="hello" className=' max-w-[100%] object-contain md:w-full md:h-full  '/></Link>

<div className='flex flex-col items-start justify-start'>
<div className="flex items-center justify-center gap-3">
<AnimatePresence>
  {istitle ?<><motion.input key={"TitleInput"} type="text " placeholder='Title' className='px-2 py-2  w-[55%] mb-3 md:mb-1  outline-2 first-letter:rounded-md bg-transparent md:w-auto text-primaryText text-base md:outline-none' value={title} onChange={(e)=>
    settitle(e.target.value)
}/>
  </>:(<>
  <motion.p key={"TitleLabel"} className='px-3 py-2 text-white text-sm md:text-lg'>
  { title}
    </motion.p>
    </>)}
</AnimatePresence>

<AnimatePresence>
  {istitle ?<>
  <motion.div className='cursor-pointer mr-10 mb-3 ' whileTap={{scale:0.9}}  key={"MDCheck"} onClick={()=>setistitle(false)}>
<MdCheck className='text-2xl    md:mb-0 text-green-500'/>
  </motion.div >
  </>:(<>
  <motion.div className='cursor-pointer' whileTap={{scale:0.9}}  key={"MDedit"} onClick={()=>setistitle(true)}>
<MdEdit className='text-2xl  text-blue-500 '/>
  </motion.div>
    </>)}
</AnimatePresence>
</div>
<div className="flex items-center justify-center px-3 -mt-2 gap-2">
<p className='text-primaryText text-sm'>{user?.displayName ?user?.displayName:`${user?.email.split('@')[0]}`}</p>
</div>
</div>
</div>
{/* {usrsec} */}
{user && (
  <div className=" md:flex-row items-center justify-center gap-4  flex flex-col  ">
  <motion.button onClick={()=>saveprogram()} whileTap={{scale:0.9}}  className='px-3 py-2 bg-primaryText cursor-pointer text-base text-primary rounded-md  '>
Save
  </motion.button>
<Userprofile1/>
</div>
)}

    </header>

      {/* {code} */}

    <div >
      {/* {hori} */}
      <SplitPane 
      split='horizontal'
      minSize={500}
      maxSize={-100}
      defaultSize={'50%'}
      >


      {/* {topcode} */}
      <SplitPane split='vertical' minSize={500}>
         {/* {html} */}
         <div className="w-full h-full flex flex-col items-start jutify-start">
          <div className="w-full flex items-center justify-between ">
            <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3  border-t-gray-500">
              <FaHtml5 className='text-xl text-red-500'/>
              <p className='text-primaryText font-semibold'>HTML </p>
            </div>
            <div className="cursor-pointer  flex items-center justify-center  gap-5 px-4 ">
<FcSettings className='text-xl text-primaryText'/>
<FaChevronDown className='text-xl text-primaryText'/>

            </div>
          </div>
          <div className='w-full px-2'>
          <CodeMirror
      value={html}
      height="600px"
      theme={'dark'}
      extensions={[javascript({ jsx: true })]}
      onChange={(val, viewUpdate)=>{
sethtml(val)
      }}
    />
          </div>
         </div>
      <SplitPane split='vertical' minSize={500}>
        {/* {css} */}
        <div className="w-full h-full flex flex-col items-start jutify-start">
          <div className="w-full flex items-center justify-between ">
            <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3  border-t-gray-500">
              <FaCss3 className='text-xl text-blue-500'/>
              <p className='text-primaryText font-semibold'>CSS </p>
            </div>
            <div className="cursor-pointer  flex items-center justify-center  gap-5 px-4 ">
<FcSettings className='text-xl text-primaryText'/>
<FaChevronDown className='text-xl text-primaryText'/>

            </div>
          </div>
          <div className='w-full px-2'>
          <CodeMirror
      value={css}
      height="600px"
      theme={'dark'}
      extensions={[javascript({ jsx: true })]}
      onChange={(val, viewUpdate)=>{
setcss(val)
      }}
    />
          </div>
         </div>
         {/* {java} */} 
         <div className="w-full h-full flex flex-col items-start jutify-start">
          <div className="w-full flex items-center justify-between ">
            <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3  border-t-gray-500">
              <FaJs className='text-xl text-yellow-500'/>
              <p className='text-primaryText font-semibold'>JS </p>
            </div>
            <div className="cursor-pointer  flex items-center justify-center  gap-5 px-4 ">
<FcSettings className='text-xl text-primaryText'/>
<FaChevronDown className='text-xl text-primaryText'/>

            </div>
          </div>
          <div className='w-full px-2'>
          <CodeMirror
      value={js}
      height="600px"
      theme={'dark'}
      extensions={[javascript({ jsx: true })]}
      onChange={(val, viewUpdate)=>{
setjs(val)
      }}
    />
          </div>
         </div>
      </SplitPane>
      </SplitPane>

      {/* {bottom} */}
          <div className='bg-white ' style={{overflow:'hidden',height:'100%'}}>
<iframe
title='Result'
srcDoc={op}
style={{border:'none',width:"100%" ,height:"100%"}}/>

          </div>

      </SplitPane>
    </div>
    </div>
    </>
  )
}

export default SwamiProject
