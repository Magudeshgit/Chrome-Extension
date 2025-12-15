import Navbar from '@/components/ui/navbar'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from '@/authcontext'
import { Cog, Monitor } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

const SettingsPage = () => {
    const {authData} = useAuth()
  return (
    <>  
        <Navbar/>
        <div className='flex w-full flex-col items-center  mt-6'>
            <Avatar className="cursor-pointer w-20 h-20 ">
                <AvatarImage src={authData.user.photoURL} />
                <AvatarFallback className="text-2xl">{authData.user.fullname.split(" ")[0][0] + authData.user.fullname.split(" ")[1][0]}</AvatarFallback>
            </Avatar>
            <p className='text-xl font-bold mt-2'>{authData.user.fullname}</p>
            <p className='text-sm'>{authData.user.mail}</p>
            <p className='text-gray-400'>Last Authenticated: 9th March, 7:15pm</p>

            <Tabs defaultValue="collections" className="w-full mt-4">
            <TabsList className="w-full">
            <TabsTrigger value="collections">
                <Cog className='w-4 h-4'/>
                Configuration
            </TabsTrigger>
            <TabsTrigger value="report">
                <Monitor className='w-4 h-4'/>
                Devices
            </TabsTrigger> 
            </TabsList>
            <TabsContent value="collections" className="flex flex-col gap-3">
            </TabsContent>
            <TabsContent value="report">
            <div className='ring ring-gray-200 shadow-sm border-gray-200 rounded-lg p-3 hover:shadow-md hover:bg-gray-50 transition-all cursor-pointer'>
            <div className='flex items-center justify-between'>
              <p className='font-bold text-[16px]'>MG's Laptop</p>
              <div className='text-[10px]'>
                <p className='text-gray-400'>3 days ago</p>
              </div>
            </div>
            <p className='text-xs text-gray-500 mt-2 '>IP Address: 154.72.24.1</p>
            <p className='text-xs text-gray-500 '>Last Activity: 17th May, 2025</p>
            

            </div>
            </TabsContent>
            </Tabs>       
        </div>
    </>
  )
}

export default SettingsPage