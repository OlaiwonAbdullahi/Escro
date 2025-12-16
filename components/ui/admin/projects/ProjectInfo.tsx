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
import { Checkbox } from "@/components/ui/checkbox"

import { useAdminContext } from '../AdminContext';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { Mail } from 'lucide-react';
import {motion} from "framer-motion"
import { alertAnimation, others } from '../Animations';

function ProjectInfo() {
    const {setShowProjectInfo, selectedProject, projects, setProjects, setSelectedProject, calculateProgress, handleAlert} = useAdminContext();
     const [showCancelProjectModal, setShowCancelProjectModal] = useState(false)
   

    function handleUpdateMilestone(project:any, milestone:any){
        const completed = milestone.completed
        let newProjects = projects.map((proj:any)=>{
            if(proj.id===project.id){
                let milestones = proj.milestones
                milestones = milestones.map((mile:any)=>{
                    if(mile===milestone){
                        return {...mile, completed:!completed}
                    }else{
                        return mile
                    }
                })


                const allCompleted = milestones.filter((mile:any)=>mile.completed===true)
                const progress = Math.trunc((allCompleted.length/milestones.length) * 100)
                setSelectedProject({...proj, milestones: milestones, progress:`${progress}%`})
                return {...proj, milestones: milestones}
            }else{
                return proj
            }
        })
 
        calculateProgress(newProjects)
        

        //setProjects(newProjects)
    }


    function handleCancelProject(){
        const newProjects = projects.map((proj:any)=>{
            if(proj.id===selectedProject.id){
                return {...proj, status:"Cancelled"}
            }else{
                return proj
            }
        })
        setSelectedProject((prev:any)=>({...prev, status:"Cancelled"}))
        setProjects(newProjects)
        setShowCancelProjectModal(false)
        handleAlert("Project Cancelled", "bad")
    }

   

  return <>
  {
    showCancelProjectModal && <CancelProjectModal projectToCancel={selectedProject} setShowCancelProjectModal={setShowCancelProjectModal} handleCancelProject={handleCancelProject}  />
  }
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
                <CardTitle>{selectedProject.name}</CardTitle>
                <CardDescription>{selectedProject.client}</CardDescription>
            </CardHeader>
            <CardContent className='flex gap-3 flex-col overflow-y-auto w-full'>
                {/*Project Info */}
                <div className='flex flex-col'>
                    <div className='flex items-center justify-between gap-3'>
                        <span>Progress</span>
                        <span>{selectedProject.progress}</span>
                    </div>
                    <div className='mt-2 w-full h-[10px] flex items-center rounded-lg bg-gray-200'>
                        <span style={{width: selectedProject.progress}} className={`flex rounded-lg h-full bg-blue-500 transition-w duration-300 ease-in-out`} />
                    </div>
                    <div className='flex items-center mt-4 gap-2'>
                        <IoCalendarClearOutline />
                        <span>{selectedProject.date}</span>
                    </div>
                </div>
                <h1 className='text-start font-noto text-2xl'>Milestones</h1>
                {
                    selectedProject.milestones.map((mile:any, index:number)=>(
                        <label key={index} className={`flex items-center gap-1 cursor-pointer ${selectedProject.status==="Cancelled"&&"text-gray-500"}`}>
                    <Checkbox  disabled={selectedProject.status==="Cancelled"} onClick={()=>{handleUpdateMilestone(selectedProject, mile)}} checked={mile.completed} className='data-[state=checked]:bg-emerald-700 data-[state=checked]:border-none' />
                    <span>{mile.title}</span>
                </label>
                    ))
                }
                
            </CardContent>
            <CardFooter className='flex mt-auto flex-col gap-3'>
                <button onClick={() => setShowProjectInfo(false)} className='bg-emerald-700 text-white w-full p-3 rounded-lg cursor-pointer'>Close</button>
                <button disabled={selectedProject.status==="Cancelled"} onClick={()=>{setShowCancelProjectModal(true)}} className='bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white w-full p-3 rounded-lg cursor-pointer'>Cancel Project</button>
            </CardFooter>
        </Card>
        </motion.div>
    </div>
  </>
}

export default ProjectInfo







interface DeleteServiceProps{
    setShowCancelProjectModal: any
    projectToCancel: any
    handleCancelProject: any
}
function CancelProjectModal({setShowCancelProjectModal, projectToCancel, handleCancelProject}:DeleteServiceProps){
    const {services, setServices, handleAlert} = useAdminContext();
    
   /* function handleDeleteService(){
        const newServices = services.filter((service:any)=>{
            return service!=ProjctToDelete
        })

        setServices(newServices)
        setShowCancelProjectModal(false)
        handleAlert("Service Deleted!", "bad")
    }*/
   return <div className='fixed z-30 inset-0 backdrop-blur-[20px] flex items-center justify-center'>
            <Card className='w-[50vw]'>
                <CardHeader>
                    <CardTitle>Cancel Project</CardTitle>
                    <CardDescription>Are you sure you want to cancel this projcet? (This action is irreversible)</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col gap-4'>
                    <h1 className='text-xl font-semibold'>{projectToCancel.name}-{projectToCancel.client}</h1>
                </CardContent>
                <CardFooter className='flex gap-3'>
                    <button onClick={handleCancelProject} className='bg-red-700 text-white w-full p-3 rounded-lg cursor-pointer'>Cancel Project</button>
                    <button onClick={()=>{setShowCancelProjectModal(false)}} className='border border-emerald-700 text-emerald-700 w-full p-3 rounded-lg cursor-pointer'>Cancel</button>
                </CardFooter>
            </Card>
        </div>
}