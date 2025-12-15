import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { useState } from 'react'
import { useAuth } from '@/authcontext'
import { Settings, Monitor, LogOut, SquareMenu } from "lucide-react"
import { useNavigate } from 'react-router'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


const Navbar = () => {
    const [profiledropdown, setprofiledropdown] = useState(false)
    const {authData} = useAuth()
    const navigate = useNavigate()

    function logout(){
        chrome.storage.local.clear()
        navigate('/auth')
    }
  return (
    <div className='flex justify-between items-center'>
    <div className='gap-2 flex items-center'>
      <img src="bwlogo.svg" alt="" className='max-w-[30px]'/>
      <p className='font-bold text-xl'>BrowseWind</p>
    </div>

    <div>
    <DropdownMenu>
        <DropdownMenuTrigger>
        <Avatar className="cursor-pointer" onClick={()=>setprofiledropdown(true)}>
            <AvatarImage src={authData.user.photoURL} />
            <AvatarFallback>{authData.user.fullname.split(" ")[0][0] + authData.user.fullname.split(" ")[1][0]}</AvatarFallback>
        </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={()=>navigate('/')}>
                <SquareMenu className='w-4 h-4'/>
                Collections
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={()=>navigate('/devices')}>
                <Monitor className='w-4 h-4'/>
                Devices
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={()=>navigate('/settings')}>
                <Settings className='w-4 h-4'/>
                Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" variant='destructive' onClick={logout}>
                <LogOut className='w-4 h-4'/>
                Logout  
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

        
    </div>
  </div>
  )
}

export default Navbar