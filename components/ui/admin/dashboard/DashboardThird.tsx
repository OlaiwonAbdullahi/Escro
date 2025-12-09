"use client"
import React from 'react'
import ActiveProjects from './ActiveProjects'
import Services from './Services'
import UserDistribution from './UserDistribution'
import QuickActions from './QuickActions'



function DashboardThird() {
  return (
    <div className='flex flex-col md:flex-row gap-4'>
        <UserDistribution />
        <QuickActions />
        {/*<ActiveProjects />
        <Services />*/}
    </div>
  )
}

export default DashboardThird