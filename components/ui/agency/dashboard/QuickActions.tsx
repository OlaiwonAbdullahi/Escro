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
import CreateProjectModal from '../projects/CreateProjectModal';
import { useAgencyContext } from '../AgencyContext';

function QuickActions() {
  const {showCreateProjectModal, setShowCreateProjectModal} = useAgencyContext()
  return <>
    {showCreateProjectModal && <CreateProjectModal setShowCreateProjectModal={setShowCreateProjectModal}/>}
    <Card className='w-full md:w-[45%]'>
        <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-3 max-h-[430px] overflow-y-auto'>
            <button onClick={() => setShowCreateProjectModal(true)} className='bg-emerald-700 text-white w-full p-3 rounded-lg cursor-pointer'>Create New Project</button>
            <button className='bg-emerald-700 text-white w-full p-3 rounded-lg cursor-pointer'>Send Invoice</button>
            <button className='bg-emerald-700 text-white w-full p-3 rounded-lg cursor-pointer'>Schedule Meeting</button>
        </CardContent>
       
    </Card>
    </>
  
}

export default QuickActions