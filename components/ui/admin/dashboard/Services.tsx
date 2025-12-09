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
import AddNewServiceModal from './AddNewServiceModal';
import { useAdminContext } from '../AdminContext';
import { IoMdClose } from 'react-icons/io';


function Services() {
    const {services, setServices} = useAdminContext();
    const [showAddServiceModal, setShowAddServiceModal] = useState(false);
    const [showDeleteServiceModal, setShowDeleteServiceModal] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);

  return <>
  {showAddServiceModal && <AddNewServiceModal setShowAddServiceModal={setShowAddServiceModal} />}
  {showDeleteServiceModal && <DeleteServiceModal serviceToDelete={serviceToDelete} setShowDeleteServiceModal={setShowDeleteServiceModal} />}
    <Card className='w-full  md:w-[45%]'>
        <CardHeader>
            <CardTitle>Services Offered</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-3 h-[430px] overflow-y-auto'>
            {services.length!=0? services.map((service:any, index:number) => (
                <Service setServiceToDelete={setServiceToDelete} setShowDeleteServiceModal={setShowDeleteServiceModal} key={index} index={index} name={service.name} duration={service.duration} price={service.price} />
            )): <p className='w-full h-full flex items-center justify-center'>No Services</p>}
        </CardContent>
        <CardFooter>
            <button onClick={()=>{setShowAddServiceModal(true)}} className='bg-emerald-700 text-white w-full p-3 rounded-lg cursor-pointer'>Add New Service</button>
        </CardFooter>
    </Card>
  </>
}

export default Services

interface ServiceProps{
    name: string
    duration: string
    price: string
    setShowDeleteServiceModal: any
    index: number
    setServiceToDelete: any
}

function Service({name, duration, price, setShowDeleteServiceModal ,index, setServiceToDelete}: ServiceProps){
    const {services} = useAdminContext();
    return (
        <Card className='shadow-none'>
            <CardHeader>
                <CardTitle className='flex justify-between items-center'>{name} <IoMdClose onClick={()=>{setShowDeleteServiceModal(true); setServiceToDelete(services[index])}} className='cursor-pointer text-xl' /></CardTitle>
                <CardDescription className='flex items-center justify-between gap-3'>
                    <span>Starting at</span>
                    <span>{price}</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <span>Duration: {duration}</span>
            </CardContent>
        </Card>
    )
}

interface DeleteServiceProps{
    setShowDeleteServiceModal: any
    serviceToDelete: any
}
function DeleteServiceModal({setShowDeleteServiceModal, serviceToDelete}:DeleteServiceProps){
    const {services, setServices, handleAlert} = useAdminContext();
    
    function handleDeleteService(){
        const newServices = services.filter((service:any)=>{
            return service!=serviceToDelete
        })

        setServices(newServices)
        setShowDeleteServiceModal(false)
        handleAlert("Service Deleted!", "bad")
    }
   return <div className='fixed inset-0 backdrop-blur-[20px] flex items-center justify-center'>
            <Card className='w-[50vw]'>
                <CardHeader>
                    <CardTitle>Delete Service</CardTitle>
                    <CardDescription>Are you sure you want to delete this service?</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col gap-4'>
                    <h1 className='text-xl font-semibold'>{serviceToDelete.name}-{serviceToDelete.price}</h1>
                </CardContent>
                <CardFooter className='flex gap-3'>
                    <button onClick={handleDeleteService} className='bg-red-700 text-white w-full p-3 rounded-lg cursor-pointer'>Delete Service</button>
                    <button onClick={()=>{setShowDeleteServiceModal(false)}} className='border border-emerald-700 text-emerald-700 w-full p-3 rounded-lg cursor-pointer'>Cancel</button>
                </CardFooter>
            </Card>
        </div>
}