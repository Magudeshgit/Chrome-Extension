import { useState, useEffect } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { LoginForm } from './components/login-form'
import { BrowserRouter,Routes, Route } from 'react-router'
import { useAuth, AuthProvider, RequireAuth } from './authcontext'
import Home from './pages/home'
import Auth from './pages/auth'
import SettingsPage from './pages/settings'
import DevicesPage from './pages/devices'
import Create_mgaccount from './components/create_mgaccount'


function App() {
  // chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
  // if (message.target == 'POPUP' && message.content == "USER") process_user_info(message.data.user)
  // })
  // chrome.runtime.sendMessage(
  //   {
  //     target: "BACKGROUND",
  //     content: "CHECK_AUTH_STATE"
  //   }
  //   )


  // function process_user_info(user)
  // {
  //     document.querySelector('.info').innerText = user.fullname
  // }

  return (
    <>
    <BrowserRouter>
        <AuthProvider>
          <Routes>
              <Route path='/auth' element={<Auth/>}/>
              <Route path='/createmgaccount' element={<Create_mgaccount/>}/>


              <Route path='/settings' element={<SettingsPage/>}/>
              <Route path='/devices' element={<DevicesPage/>}/>
              <Route path='*' element={<RequireAuth><Home/></RequireAuth>}/>
          </Routes>
        </AuthProvider>
    </BrowserRouter>
    </>
  )

}
export default App