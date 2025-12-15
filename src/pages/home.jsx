import { useAuth } from '@/authcontext'
import React, { useEffect } from 'react'
import Navbar from '@/components/ui/navbar'
import { Button } from '@/components/ui/button';
import { Plus, Smartphone, CircleEllipsis, Ellipsis, Repeat2, Laptop } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from '@/lib/utils';
import CollectionCard from '@/components/ui/collectioncard';


const Home = () => {
  const {authData} = useAuth();
  console.log(authData)
  return (
    <>
      <Navbar/>
      <p className='text-left text-sm text-gray-600 mt-4'>Start by creating a collection of all your current open tabs with a single tap</p>
      <Button className="w-full mt-4 items-center flex cursor-pointer">
        Create Collection
        <Plus></Plus>
      </Button>
      <div className='w-full h-[1px] bg-gray-200 mt-4'></div>
      <Tabs defaultValue="collections" className="w-full mt-4">
        <TabsList className="w-full">
          <TabsTrigger value="collections">Your Collections</TabsTrigger>
          <TabsTrigger value="report">Reports</TabsTrigger> 
        </TabsList>
        <TabsContent value="collections" className="flex flex-col gap-3">
          <CollectionCard/>
        </TabsContent>
        <TabsContent value="report">Change your password here.</TabsContent>
      </Tabs>


    </>
  )
}

export default Home