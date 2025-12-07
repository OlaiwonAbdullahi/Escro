"use client"

import React, { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAgencyContext } from '../AgencyContext';

interface AddProjectProps{
    setShowCreateProjectModal: any
}

function CreateProjectModal({setShowCreateProjectModal}:AddProjectProps) {
  const {projects, setProjects, handleAlert} = useAgencyContext();
  const [newProject, setNewProject] = useState({
    name: "",
    client: "",
    date: "",
    progress: "0%",
    status: "In Progress"
  })

  function handlenewProject(){ 
    setProjects([...projects, newProject])
    setShowCreateProjectModal(false)
    handleAlert("Project Added!", "good")
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
            </CardContent>
            <CardFooter className='flex flex-col md:flex-row gap-3'>
                <button onClick={handlenewProject} className='bg-emerald-700 text-white w-full p-3 rounded-lg cursor-pointer'>Add New Project</button>
                <button onClick={()=>{setShowCreateProjectModal(false)}} className='border border-emerald-700 text-emerald-700 w-full p-3 rounded-lg cursor-pointer'>Cancel</button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default CreateProjectModal