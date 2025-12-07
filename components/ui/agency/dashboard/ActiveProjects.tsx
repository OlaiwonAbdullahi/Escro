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
import { useAgencyContext } from '../AgencyContext';

function ActiveProjects() {
    const {projects} = useAgencyContext();
  return (
    <Card className='w-full md:w-[55%]'>
        <CardHeader>
            <CardTitle>Active Projects</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-3 h-[500px] overflow-y-auto'>
            {projects.length!=0? projects.map((project:any, index:number) => (
                <Project key={index} name={project.name} client={project.client} progress={project.progress} date={project.date} status={project.status} />
            )): <p className='w-full h-full flex items-center justify-center'>No Active Projects</p>}

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
                    <span className={`${status==="In Progress"?"bg-blue-300/50":status==="Completed"?"bg-green-300/50":"bg-red-300/50"} p-1 px-2 rounded-lg ${status==="In Progress"?"text-blue-900":status==="Completed"?"text-green-900":"text-red-900"}`}>{status}</span>
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
                        <span style={{width: progress}} className={`flex rounded-lg h-full bg-blue-500 transition-w duration-300 ease-in-out`} />
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