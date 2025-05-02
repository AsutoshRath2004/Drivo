/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserProtectWrapper = ({ children }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { user, setUser} = useContext(UserDataContext)
    const [ isLoadng, setIsLoading ] = useState(true)

    useEffect(() => {
      if( !token ) {
        navigate('/user-login')
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
        if( response.status === 200 ) {
          setUser(response.data.user)
          setIsLoading(false)
        }
    }).catch((error) => {
        console.log(error)
        localStorage.removeItem('token')
        navigate('/user-login')
    })
  })

    if( isLoadng ) {
      return (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      )
    }

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper