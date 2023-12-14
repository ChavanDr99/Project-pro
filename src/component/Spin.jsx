import React from 'react'
import {Triangle  } from  'react-loader-spinner'
const Spin = () => {
  return (
    <Triangle
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="triangle-loading"
    wrapperStyle={{}}
    wrapperClassName=""
    visible={true}
  />
  )
}

export default Spin
