/* eslint-disable no-unused-vars */
import { React, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()

    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

    if(response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
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
            New here ? <Link to='/user-signup' className='text-blue-600'>Create a new account</Link>
          </p>
      </div>
      <div>
        <Link to='/captain-login' className='bg-[#186603] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg'>
          Sign in as a Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin