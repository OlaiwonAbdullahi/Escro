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
import { useAdminContext } from '../AdminContext';

function QuickActions() {
  const {setCurrentPage, handleFilterUsers, setUsersFilterValue} = useAdminContext()
  return <>
    
    <Card className='w-full md:w-[45%]'>
        <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-3 max-h-[430px] overflow-y-auto'>
            <button onClick={()=>{setCurrentPage("Users"); handleFilterUsers("Customer"); setUsersFilterValue("customer")}} className='bg-emerald-700 text-white w-full p-3 rounded-lg cursor-pointer'>Manage Customers</button>
            <button onClick={()=>{setCurrentPage("Users"); handleFilterUsers("Store"); setUsersFilterValue("store")}} className='bg-emerald-700 text-white w-full p-3 rounded-lg cursor-pointer'>Manage Stores</button>
            <button onClick={()=>{setCurrentPage("Users"); handleFilterUsers("Agency"); setUsersFilterValue("agency")}} className='bg-emerald-700 text-white w-full p-3 rounded-lg cursor-pointer'>Manage Agencies</button>
            <button onClick={()=>{setCurrentPage("Users"); handleFilterUsers("Courier"); setUsersFilterValue("courier")}} className='bg-emerald-700 text-white w-full p-3 rounded-lg cursor-pointer'>Manage Couriers</button>
            <button onClick={()=>{setCurrentPage("Settings")}} className='bg-emerald-700 text-white w-full p-3 rounded-lg cursor-pointer'>Platform Settings</button>
            <button onClick={()=>{setCurrentPage("Disputes")}} className='bg-emerald-700 text-white w-full p-3 rounded-lg cursor-pointer'>Settle Disputes</button>
        </CardContent>
       
    </Card>
    </>
  
}

export default QuickActions