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
import { IoCalendarClearOutline } from 'react-icons/io5'

function ActiveProjects() {
  return (
    <Card className='min-w-[200px] w-[55%]'>
        <CardHeader>
            <CardTitle>Active Projects</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-3 max-h-[430px] overflow-y-auto'>
            <Project status='In Progress' name='Website Development' client="Acme Corp" date="Dec 15, 2025" progress={"50%"} />
            <Project status='Completed' name='App Development' client="Acme Corp" date="Dec 15, 2025" progress={"20%"} />
            
        </CardContent>
    </Card>
  )
}

export default ActiveProjects


interface ProjectProps{
    name: string
    client: string
    progress: string
    date: string
    status: string
}

function Project({name, client, progress, date, status}: ProjectProps){
    return (
        <Card className='shadow-none bg-gray-100/80'>
            <CardHeader>
                <CardTitle className='flex items-center justify-between gap-3'>
                    {name}
                    <span className={`bg-${status==="In Progress"?"blue":status==="Completed"?"green":"red"}-300/50 p-1 px-2 rounded-lg text-${status==="In Progress"?"blue":status==="Completed"?"green":"red"}-900`}>{status}</span>
                </CardTitle>
                <CardDescription>{client}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col'>
                    <div className='flex items-center justify-between gap-3'>
                        <span>Progress</span>
                        <span>{progress}</span>
                    </div>
                    <div className='mt-2 w-full h-[10px] flex items-center rounded-lg bg-gray-200'>
                        <span className={`block w-[${progress}] rounded-lg h-full bg-blue-500`} />
                    </div>
                    <div className='flex items-center mt-4 gap-2'>
                        <IoCalendarClearOutline />
                        <span>{date}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}