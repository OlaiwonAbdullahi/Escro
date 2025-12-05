"use client"
import React from 'react'
import ActiveProjects from './ActiveProjects'
import Services from './Services'



function DashboardThird() {
  return (
    <div className='flex gap-4'>
        <ActiveProjects />
        <Services />
    </div>
  )
}

export default DashboardThird