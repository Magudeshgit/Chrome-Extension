import React from 'react'
import { Button } from './button'
import { Laptop, Ellipsis, Info, Trash, SquareLibrary, List, SquarePen } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CollectionCard = () => {
  return (
    <div className='ring ring-gray-200 shadow-sm border-gray-200 rounded-lg p-3 hover:shadow-md hover:bg-gray-50 transition-all cursor-pointer'>
            <div className='flex items-center justify-between'>
              <p className='font-bold text-[16px]'>MeatySugar</p>
              <div className='text-[10px]'>
                <p className='text-gray-400'>3 days ago</p>
              </div>
            </div>
            <p className='text-xs text-gray-500 mt-2'>Browsed about the shortcoming of global warming and its effects</p>
            <div className='mt-4 flex justify-between items-center'>
              <div className='bg-gray-100 inline-flex gap-2 px-4 py-1 rounded-sm items-center'>
                  <Laptop className='w-4 h-4 bg'/>
                <p className='font-medium'>MG's Laptop</p>
              </div>
              <div className='flex gap-4'>
              <List className='w-4 h-4'/>
              <Dialog>
                <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">
                            <SquarePen className='w-4 h-4'/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DialogTrigger asChild>
                            <DropdownMenuItem className="cursor-pointer">
                                    <Info className='w-4 h-4'/>
                                    Details
                            </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem className="cursor-pointer" variant='destructive'>
                                <Trash className='w-4 h-4'/>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                <DialogContent className="sm:max-w-[425px] text-left">
                    <DialogHeader className="text-left">
                    <DialogTitle>Edit Session</DialogTitle>
                    <DialogDescription>
                        Make changes to your Session here. Click save when you're done.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                        Session Name
                        </Label>
                        <Input
                        id="name"
                        defaultValue=""
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                        Description
                        </Label>
                        <Input
                        id="username"
                        defaultValue=""
                        className="col-span-3"
                        />
                    </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Confirm</Button>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
              </div>
              {/* <div>
                <Button className="px-4 py-1 text-xs w-auto h-auto">
                  Restore
                  <Repeat2 className='w-4 h-4'/>
                </Button>
              </div> */}
            </div>

    </div>
  )
}

export default CollectionCard