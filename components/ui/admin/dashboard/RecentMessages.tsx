"use client"
import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FiMessageSquare } from 'react-icons/fi'
import { useAdminContext } from '../AdminContext'

function RecentMessages() {
    const {setCurrentPage} = useAdminContext()
  return (
    <Card className='w-full md:w-[55%]'>
        <CardHeader>
            <CardTitle className='flex items-center justify-between gap-3'>
                <span>Recent Messages</span>
                <span onClick={()=>{setCurrentPage("Messages")}} className='cursor-pointer text-blue-600'>View All</span>
            </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-3 max-h-[430px] overflow-y-auto'>
            <Message name='John Doe' latestMessage='Hey, I wanted to check in about' time='2:15pm' />
            <Message name='Acme Corp' latestMessage='Can we schedule a review meeting?' time='2:15pm' />
        </CardContent>
    </Card>
  )
}

export default RecentMessages


interface MessageProps{
    name: string
    latestMessage: string
    time: string
}

function Message({name, latestMessage, time}: MessageProps){
    return <div className='flex items-start gap-3 cursor-pointer bg-gray-100 p-3 rounded-lg'>
        <span className='flex items-center justify-center w-[40px] h-[40px] bg-emerald-700 text-white rounded-full '>
            <FiMessageSquare />
        </span>
        <div>
            <h1 className='font-noto '>{name}</h1>
            <span className='text-sm'>{latestMessage.substring(0, 15)}...</span>
        </div>
        <span className='ml-auto text-sm text-gray-600'>{time}</span>
    </div>
}