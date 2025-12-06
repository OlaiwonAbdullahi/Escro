import React from 'react'
import { FaArrowTrendUp } from 'react-icons/fa6'
import { GoProject } from 'react-icons/go'
import { IoIosTrendingUp, IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { LuClock4 } from 'react-icons/lu'
import { MdAttachMoney } from 'react-icons/md'

function DashboardTop() {
  return (
    <div className='flex flex-col md:flex-row gap-5 flex-wrap'>
      <div className='flex-1 w-full md:w-[23%] min-w-[200px] bg-white p-5 rounded-lg gap-5 flex flex-col cursor-pointer'>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-gray-700'>Active Projects</p>
          <span className='text-xl bg-green-300/50 w-[40px] h-[40px] flex items-center justify-center text-green-900 rounded-lg'><GoProject /></span>
        </div>
        <h1 className='font-space text-3xl font-bold'>69</h1>
        <div className='flex items-center justify-between gap-3'>
          <span className='flex items-center gap-3 bg-green-300/50 w-[fit-content] p-1 px-2 rounded-full text-green-900 font-bold'><FaArrowTrendUp />+2</span>
          <span className='text-gray-700'>This week</span>
        </div>
      </div>

      <div className='flex-1 w-full md:w-[23%] min-w-[200px] bg-white p-5 rounded-lg gap-5 flex flex-col cursor-pointer'>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-gray-700'>Total Revenue</p>
          <span className='text-xl bg-green-300/50 w-[40px] h-[40px] flex items-center justify-center text-green-900 rounded-lg'><MdAttachMoney /></span>
        </div>
        <h1 className='font-space text-3xl font-bold'>$45,230</h1>
        <div className='flex items-center justify-between gap-3'>
          <span className='flex items-center gap-3 bg-green-300/50 w-[fit-content] p-1 px-2 rounded-full text-green-900 font-bold'><FaArrowTrendUp />+19%</span>
          <span className='text-gray-700'>vs last period</span>
        </div>
      </div>

      <div className='flex-1 w-full md:w-[23%] min-w-[200px] bg-white p-5 rounded-lg gap-5 flex flex-col cursor-pointer'>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-gray-700'>Pending Hours</p>
          <span className='text-xl bg-green-300/50 w-[40px] h-[40px] flex items-center justify-center text-green-900 rounded-lg'><LuClock4 /></span>
        </div>
        <h1 className='font-space text-3xl font-bold'>156</h1>
        <div className='flex items-center justify-between gap-3'>
          <span className='flex items-center gap-3 bg-green-300/50 w-[fit-content] p-1 px-2 rounded-full text-green-900 font-bold'><FaArrowTrendUp />+23</span>
          <span className='text-gray-700'>This week</span>
        </div>
      </div>

      <div className='flex-1 w-full md:w-[23%] min-w-[200px] bg-white p-5 rounded-lg gap-5 flex flex-col cursor-pointer'>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-gray-700'>Completed</p>
          <span className='text-xl bg-green-300/50 w-[40px] h-[40px] flex items-center justify-center text-green-900 rounded-lg'><IoMdCheckmarkCircleOutline /></span>
        </div>
        <h1 className='font-space text-3xl font-bold'>28</h1>
        <div className='flex items-center justify-between gap-3'>
          <span className='flex items-center gap-3 bg-green-300/50 w-[fit-content] p-1 px-2 rounded-full text-green-900 font-bold'><FaArrowTrendUp />+5</span>
          <span className='text-gray-700'>This month</span>
        </div>
      </div>
    </div>
  )
}

export default DashboardTop