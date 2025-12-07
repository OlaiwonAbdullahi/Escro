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

interface AddServiceProps{
    setShowAddServiceModal: any
}

function AddNewServiceModal({setShowAddServiceModal}:AddServiceProps) {
  const {services, setServices, handleAlert} = useAgencyContext();
  const [newService, setNewService] = useState({
    name: "",
    price: "",
    duration: ""
  })

  function handleNewService(){ 
    setServices([...services, newService])
    setShowAddServiceModal(false)
    handleAlert("Service Added!", "good")
  }
  return (
    <div className='fixed p-4 inset-0 backdrop-blur-[20px] flex items-center justify-center'>
        <Card className='w-full md:w-[50vw]'>
            <CardHeader>
                <CardTitle>Add New Service</CardTitle>
                <CardDescription>Fill in the details below to add a new service.</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <input value={newService.name} onChange={(e)=>{setNewService({...newService, name:e.target.value })}} type="text" placeholder='Service Name (e.g Frontend Development)' className='border p-2 rounded-lg w-full'/>
                <input value={newService.price} onChange={(e)=>{setNewService({...newService, price:e.target.value })}} type="text" placeholder='Starting Price (e.g $100)' className='border p-2 rounded-lg w-full'/>
                <input value={newService.duration} onChange={(e)=>{setNewService({...newService, duration:e.target.value })}} type="text" placeholder='Duration (e.g 1-2 days)' className='border p-2 rounded-lg w-full'/>
            </CardContent>
            <CardFooter className='flex flex-col md:flex-row gap-3'>
                <button onClick={handleNewService} className='bg-emerald-700 text-white w-full p-3 rounded-lg cursor-pointer'>Add New Service</button>
                <button onClick={()=>{setShowAddServiceModal(false)}} className='border border-emerald-700 text-emerald-700 w-full p-3 rounded-lg cursor-pointer'>Cancel</button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default AddNewServiceModal