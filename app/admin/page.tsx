"use client"
import { AdminContextProvider } from '@/components/ui/admin/AdminContext'
import Header from '@/components/ui/admin/Header'
import Dashboard from '@/components/ui/admin/pages/Dashboard'
import Sidebar from '@/components/ui/admin/Sidebar'
import View from '@/components/ui/admin/View'
import React from 'react'

function page() {
  
  return (
    <AdminContextProvider>
      <div className='h-screen w-full flex'>
        <Sidebar />
        <div className='flex flex-col w-full md:w-[85vw]'>
          <Header />
          <View />
        </div>
      </div>
    </AdminContextProvider>
  )
}

export default page