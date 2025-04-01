import React from 'react'
import loading from './Spinner-2.gif'
function Spinner() {
  return (
    <div  className='text-center'>
    {/* <img src="" alt="wdcwdc" /> */}
  <img className='bg-blue-400  rounded-2xl'  src={loading} alt="loading"/>  
  </div>
  )
}

export default Spinner
