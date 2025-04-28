import { useAuth } from '@/authcontext'
import React from 'react'
import { useNavigate } from 'react-router'

const Home = () => {
    const {authData} = useAuth()
  return (
    <div>{authData.user.fullname}</div>
  )
}

export default Home