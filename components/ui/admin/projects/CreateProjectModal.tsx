"use client"

import React, { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAdminContext } from '../AdminContext';
import { X } from 'lucide-react';

interface AddProjectProps{
    setShowCreateProjectModal: any
}

function CreateProjectModal({setShowCreateProjectModal}:AddProjectProps) {
  const {projects, setProjects, handleAlert} = useAdminContext();
  const [milestones, setMilestones] = useState<any[]>([])
  const [isReady, setIsReady] = useState(false)
  
  const [mileText, setMileText] = useState("") 
  const [newProject, setNewProject] = useState({
    id:`${projects.length}`,
    name: "",
    client: "",
    date: "",
    progress: "0%",
    status: "In Progress",
    milestones: [{title:"", completed: false}]
  })

  useEffect(()=>{
    if(newProject.name && newProject.client && newProject.date && milestones.length!=0){
      setIsReady(true)
    }else{
      setIsReady(false)
    }
  }, [newProject])

   useEffect(()=>{
    if(newProject.name && newProject.client && newProject.date && milestones.length!=0){
      setIsReady(true)
    }else{
      setIsReady(false)
    }
  }, [milestones])

 

  function handlenewProject(){ 
    setProjects([...projects, {...newProject, milestones:milestones}])
    setShowCreateProjectModal(false)
    handleAlert("Project Added!", "good")
  }

  function handleMilestone(milestone:string){
    setMilestones([...milestones, {title:milestone, completed:false}])
    setMileText("")
  }

  function handleRemoveMileStone(mile:any){
    const newMileStones = milestones.filter((milestone:any)=> milestone!=mile)
    setMilestones(newMileStones)
  }
  return (
    <div className='fixed p-4 inset-0 backdrop-blur-[20px] z-20 flex items-center justify-center'>
        <Card className='w-full md:w-[50vw]'>
            <CardHeader>
                <CardTitle>Add New Project</CardTitle>
                <CardDescription>Fill in the details below to add a new project.</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <input value={newProject.name} onChange={(e)=>{setNewProject({...newProject, name:e.target.value })}} type="text" placeholder='Project Name (e.g Frontend Development)' className='border p-2 rounded-lg w-full'/>
                <input value={newProject.client} onChange={(e)=>{setNewProject({...newProject, client:e.target.value })}} type="text" placeholder='Client Name (e.g. Ryan LLC)' className='border p-2 rounded-lg w-full' />
                <input value={newProject.date} onChange={(e)=>{setNewProject({...newProject, date:e.target.value })}} type="date"  className='border p-2 rounded-lg w-full' />
                <input onKeyDown={(e:any)=>{e.key==="Enter" && handleMilestone(e.target.value)}} value={mileText} onChange={(e)=>{setMileText(e.target.value)}} type="text" placeholder='Add Milestone...'  className='border p-2 rounded-lg w-full' />
                <Card className='shadow-none bg-gray-100'>
                  <CardContent className='flex flex-wrap gap-3'>
                    {
                      milestones.length!=0? milestones.map((mile:any, index:any)=>{
                        return <span onClick={()=>{handleRemoveMileStone(mile)}} key={index} className='flex items-center gap-1 bg-white p-1 w-[fit-content] cursor-pointer rounded-lg'><X size={16} /> {mile.title}</span>
                      }):"No Milestones"
                    }
                  </CardContent>
                </Card>
            </CardContent>
            <CardFooter className='flex flex-col md:flex-row gap-3'>
                <button disabled={!isReady} onClick={handlenewProject} className='bg-emerald-700 disabled:bg-gray-100 disabled:text-emerald-700 transition duration-300 ease-in-out text-white w-full p-3 rounded-lg cursor-pointer'>Add New Project</button>
                <button onClick={()=>{setShowCreateProjectModal(false)}} className='border border-emerald-700 text-emerald-700 w-full p-3 rounded-lg cursor-pointer'>Cancel</button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default CreateProjectModal