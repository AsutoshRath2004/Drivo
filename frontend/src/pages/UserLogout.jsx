import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then((res) => {
    if(res.status === 200) {
      localStorage.removeItem('token')
      navigate('/user-login')
    }
  })

  return (
    <></>
  )
}

export default UserLogout