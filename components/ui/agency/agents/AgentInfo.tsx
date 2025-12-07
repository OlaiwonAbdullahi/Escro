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

import { useAgencyContext } from '../AgencyContext';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { Mail } from 'lucide-react';
import {motion} from "framer-motion"
import { alertAnimation, others } from '../Animations';

function AgentInfo() {
    const {setShowAgentInfo, selectedAgent, projects} = useAgencyContext();
    const projectsWorkingOn = projects.filter((project:any)=>{
      if(selectedAgent.projectsWorkingOnId.find((id:string)=> id===project.id)){ 
        return project
      }
    })

    const completedProjects = projects.filter((project:any)=>{
      if(selectedAgent.projectsCompletedId.find((id:string)=> id===project.id)){ 
        return project
      }
    })

    console.log("Projects Working On:", projectsWorkingOn);
  return (
    <div className='fixed backdrop-blur-[20px] z-10 inset-0 flex items-center justify-end'>
        <motion.div
        initial={alertAnimation.initial}
        exit={alertAnimation.initial}
        animate={alertAnimation.animate}
        transition={{
        duration: 0.3,
        ease:"easeInOut"
        }}
        className='w-full h-full  md:w-[50vw]'
        >
          <Card className='w-full h-full rounded-none md:rounded-lg rounded-tr-none md:w-[50vw] '>
            <CardHeader>
                <CardTitle>Agent Information</CardTitle>
                <CardDescription>Details about {selectedAgent.name}</CardDescription>
            </CardHeader>
            <CardContent className='flex gap-3 flex-col overflow-y-auto w-full'>
                {/*Basic Info */}
                <Card className='w-full shadow-none'>
                  <CardHeader>
                    <CardTitle>Agent Details</CardTitle>
                  </CardHeader>
                  <CardContent className='flex flex-col gap-2'>
                    <div className='flex items-start gap-2'>
                      {selectedAgent.pfp?<img src={selectedAgent.pfp} alt={selectedAgent.name} className="w-15 h-15 rounded-full mb-4 object-cover"/>:
                        <span className='w-15 h-15 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500 mb-4'>{selectedAgent.name.charAt(0).toUpperCase()}</span>
                      }
                      <div className='flex flex-col gap-1'>
                        <span className='font-semibold text-lg'>{selectedAgent.name}</span>
                        <span className='flex items-center gap-1'><Mail className='w-4 h-4' />{selectedAgent.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Projects Working On */}
                <h1 className='text-start font-noto text-2xl'>Active Projects</h1>
                {projectsWorkingOn.length!=0? projectsWorkingOn.map((project:any, index:number) => (
                <Project key={index} name={project.name} client={project.client} progress={project.progress} date={project.date} status={project.status} />
            )): <p className='w-full h-full flex items-center justify-center'>No Active Projects</p>}

                {/* Completed Projects */}
                <h1 className='text-start font-noto text-2xl mt-4'>Completed Projects</h1>
                {completedProjects.length!=0? completedProjects.map((project:any, index:number) => (
                <Project key={index} name={project.name} client={project.client} progress={project.progress} date={project.date} status={project.status} />
            )): <p className='w-full h-full flex items-center justify-center'>No Completed Projects</p>}
            </CardContent>
            <CardFooter className='flex mt-auto flex-col md:flex-row gap-3'>
                <button onClick={() => setShowAgentInfo(false)} className='bg-emerald-700 text-white w-full p-3 rounded-lg cursor-pointer'>Close</button>
            </CardFooter>
        </Card>
        </motion.div>
    </div>
  )
}

export default AgentInfo






interface ProjectProps{
    name: string
    client: string
    progress: string
    date: string
    status: string
}


function Project({name, client, progress, date, status}: ProjectProps){
    return (
        <Card className='shadow-none bg-gray-100/80 w-full'>
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