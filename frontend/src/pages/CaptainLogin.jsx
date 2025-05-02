/* eslint-disable no-unused-vars */
import { React, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const { captain, setCaptain } = useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const captain = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

    if (response.status === 200) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
      <img className='w-18 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
       <form onSubmit={(e) => {submitHandler(e)}}>
        <h3 className='text-lg font-medium mb-2'>What's your email !</h3>
        <input 
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
          required 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          placeholder='example@email.com'/>

        <h3 className='text-lg font-medium mb-2'>Enter your password !</h3>
        <input 
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          required 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'/>

          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg'>
            Login
          </button>
       </form>
          <p className='text-center'>
            Join a fleet ? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link>
          </p>
      </div>
      <div>
        <Link to='/user-login' className='bg-[#925f00] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg'>
          Sign in as a User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin