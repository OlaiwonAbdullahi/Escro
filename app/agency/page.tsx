"use client"
import { AgencyContextProvider } from '@/components/ui/agency/AgencyContext'
import Header from '@/components/ui/agency/Header'
import Dashboard from '@/components/ui/agency/pages/Dashboard'
import Sidebar from '@/components/ui/agency/Sidebar'
import View from '@/components/ui/agency/View'
import React from 'react'

function page() {
  
  return (
    <AgencyContextProvider>
      <div className='h-screen w-full flex'>
        <Sidebar />
        <div className='flex flex-col w-[80vw]'>
          <Header />
          <View />
        </div>
      </div>
    </AgencyContextProvider>
  )
}

export default page