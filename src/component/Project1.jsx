import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion} from 'framer-motion';
const Project1 = () => {
  const projects = useSelector((state) => state.projects?.projects);
  const searchterm =useSelector((state) => state.searchterm?.searchterm?state.searchterm?.searchterm:"")
  const [filetr,setfilter]= useState(null)
     
  useEffect(() => {
    if (searchterm?.length > 0) {
      const lowerCaseSearchterm = searchterm.toLowerCase();
      const filteredProjects = projects?.filter((project) => {
        const lowerCaseItem = project?.title.toLowerCase();
        return lowerCaseItem.includes(lowerCaseSearchterm);
      });
  
    
      setfilter(filteredProjects);
    } else {
     
      setfilter(null);
    }
  }, [searchterm, projects]);
  

  return (
    <div className='w-full py-6 flex items-center justify-center gap-4 flex-wrap'>
{filetr && filetr.length > 0 ? (
  filetr.map((project) => (
    <Projectcard key={project.id} project={project} />
  ))
) : (
  projects && projects.length > 0 ? (
    projects.map((project, index) => (
      <Projectcard key={project.id} project={project} index={index} />
    ))
  ) : (
    // Handle the case where both filetr and projects are empty or undefined
    <p>No projects to display.</p>
  )
)}

    </div>
  );
};

const Projectcard = ({ project, index }) => {
  const user =useSelector((state)=>state.user?.user)
  return (
    <motion.div  key={index} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}   transition={{duration:0.5,delay:index*0.5}}    className='w-full cursor-pointer md:w-[450px] h-[375px] bg-secondary rounded-md p-4 flex flex-col items-center justify-center gap-4'>  
  <div className='bg-primary w-full h-full rounded-md overflow-hidden  ' style={{overflow:'hidden',height:'100%'}}>
<iframe
title='Result'
srcDoc={project.op}
style={{border:'none',width:"100%" ,height:"100%"}}/>
  </div>
  <div className="flex  items-center justify-start gap-3 w-full ">

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
    <div>
      <p className='text-primaryText text-sm capitalize'>{project?.title}</p>
      <p className='text-primaryText text-sm'>{project?.user?.displayName ?project?.user?.displayName:`${project?.user?.email.split('@')[0]}`}</p>
    </div>
  </div>
    </motion.div>
  );
};

export default Project1;
