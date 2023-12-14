import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate, useNavigate} from 'react-router-dom'
import Home from './component/Home'
import { auth,db } from './config/firebase';
import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import Spin from './component/Spin';
import { SET_USER } from './context/action/useraction';
import {useDispatch}from 'react-redux'
import SwamiProject from './component/SwamiProject';
import { SET_PROJECTS } from './context/action/ProjectAction';


const App = () => {
  const dispatch=useDispatch();
  const [isload,setload]=useState(true)
  const navigate= useNavigate();
   useEffect(()=>{
 const scribe =auth.onAuthStateChanged((usercred)=>{
  
  if (usercred){
    console.log(usercred?.providerData[0])
    setDoc(doc(db,"users",usercred?.uid), usercred?.providerData[0]).then(()=>{
dispatch(SET_USER(usercred?.providerData[0]));
navigate('/Home/project',{replace:true})
    })
  }
  else{
    navigate("/Home/auth",{replace:true})
  }
  setInterval(() => {
    setload(false)
  }, 1000);
 })
 return () => scribe();
   },[])

   useEffect(() => {
    // Create a query for the "Projects" collection, ordered by "id" in descending order
    const projectQuery = query(
      collection(db, 'Projects'),
      orderBy('id', 'desc')
    );

    // Subscribe to the query and listen for changes
    const unsubscribe = onSnapshot(projectQuery, (querySnapshot) => {
      // Map the query snapshot to an array of project data
      const projectList = querySnapshot.docs.map((doc) => doc.data());

      // Dispatch the project data to Redux using your SET_PROJECTS action
      dispatch(SET_PROJECTS(projectList));
      console.log(projectList)
    });


    // Return the unsubscribe function to stop listening when the component unmounts
    return unsubscribe;
  }, [dispatch]);

  return (
  
   <>
   {isload? <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
   <Spin/>
   </div>
   :
  <div className='w-screen h-screen flex items-start justify-start overflow-hidden'> 

  <Routes>
      <Route path='/Home/*' element={<Home/>}/>
      <Route path='/SwamiProject' element={<SwamiProject/>}/>
      <Route path='*' element={<Navigate to={'./Home'}/>}/>
    </Routes>
  
  </div>
  }
   </>
  
  )
}

export default App
