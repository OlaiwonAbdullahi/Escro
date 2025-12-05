import React from 'react'
import RecentMessages from './RecentMessages'
import QuickActions from './QuickActions'

function DashboardFourth() {
  return (
    <div className='flex gap-4'>
        <RecentMessages />
        <QuickActions />
    </div>
  )
}

export default DashboardFourth