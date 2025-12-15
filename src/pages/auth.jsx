import { LoginForm } from '@/components/login-form'
import {React, useState} from 'react'

const Auth = (props) => {
  const [, setPagetype] = useState()
  return (
  <div className='flex flex-col items-center'>
    <div className='flex items-center gap-2 mx-auto'>
      <img src="bwlogo.svg" alt="logo" className='w-11 drop-shadow-lg' />
      <div>
      <p className='font-bold text-2xl'>BrowseWind</p>
      <p className='font-medium tracking-wide'>Revive Your Browser</p>
      </div>
    </div>
    <LoginForm className="mt-6"/>
  </div>
  )
}

export default Auth