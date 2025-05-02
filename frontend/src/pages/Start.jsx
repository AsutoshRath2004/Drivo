import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <>
      <div className='bg-cover bg-center bg-[url("/project.webp")] h-screen pt-8 flex justify-between flex-col w-full'>
        <img className='w-20 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
        <div className='bg-white pb-7 py-4 px-4'>
          <h2 className='text-3xl font-semibold'>Get Started with Uber</h2>
          <Link to='/user-login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4'>Continue</Link>
        </div>
      </div>
    </>
  )
}

export default Start