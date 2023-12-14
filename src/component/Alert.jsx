import React from 'react'
import { motion } from 'framer-motion'

export const Alert = (status,alertmsg) => {
  return (
    <motion.div>
      {status === "Success" &&(
        <div className=" bg-emerald-500 rounded-md px-4 py-2 text-primary font-semibold cursor-pointer hover:shadow-md shadow-emerald-500">
            <p className='text-lg text-primary'>{alertmsg}</p></div>
      )}
    </motion.div>
  )
}

export default Alert
