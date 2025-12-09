"use client"
import { CircleStar, DollarSign, Motorbike, Signature, Store, Users } from 'lucide-react'
import React from 'react'
import { FaArrowTrendUp } from 'react-icons/fa6'
import { GoProject } from 'react-icons/go'
import { IoIosTrendingUp, IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { LuClock4 } from 'react-icons/lu'
import { MdAttachMoney } from 'react-icons/md'

function DashboardTop() {
  return (
    <div className='flex flex-col md:flex-row gap-5 flex-wrap'>
      <div className='flex-1 w-full md:w-[23%] md:min-w-[250px] bg-white p-5 rounded-lg gap-5 flex flex-col cursor-pointer'>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-gray-700'>Total Users</p>
          <span className='text-xl bg-green-300/50 w-[40px] h-[40px] flex items-center justify-center text-green-900 rounded-lg'><Users size={16} /></span>
        </div>
        <h1 className='font-space text-3xl font-bold'>69</h1>
        <div className='flex items-center justify-between gap-3'>
          <span className='flex items-center gap-3 bg-green-300/50 w-[fit-content] p-1 px-2 rounded-full text-green-900 font-bold'><FaArrowTrendUp />+234</span>
          <span className='text-gray-700'>This week</span>
        </div>
      </div>

      <div className='flex-1 w-full md:w-[23%] md:min-w-[250px] bg-white p-5 rounded-lg gap-5 flex flex-col cursor-pointer'>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-gray-700'>Total Stores</p>
          <span className='text-xl bg-green-300/50 w-[40px] h-[40px] flex items-center justify-center text-green-900 rounded-lg'><Store size={16} /></span>
        </div>
        <h1 className='font-space text-3xl font-bold'>28</h1>
        <div className='flex items-center justify-between gap-3'>
          <span className='flex items-center gap-3 bg-green-300/50 w-[fit-content] p-1 px-2 rounded-full text-green-900 font-bold'><FaArrowTrendUp />+10</span>
          <span className='text-gray-700'>This Month</span>
        </div>
      </div>

      <div className='flex-1 w-full md:w-[23%] md:min-w-[250px] bg-white p-5 rounded-lg gap-5 flex flex-col cursor-pointer'>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-gray-700'>Total Orders</p>
          <span className='text-xl bg-green-300/50 w-[40px] h-[40px] flex items-center justify-center text-green-900 rounded-lg'><CircleStar size={16} /></span>
        </div>
        <h1 className='font-space text-3xl font-bold'>156</h1>
        <div className='flex items-center justify-between gap-3'>
          <span className='flex items-center gap-3 bg-green-300/50 w-[fit-content] p-1 px-2 rounded-full text-green-900 font-bold'><FaArrowTrendUp />+23</span>
          <span className='text-gray-700'>This week</span>
        </div>
      </div>

      <div className='flex-1 w-full md:w-[23%] md:min-w-[250px] bg-white p-5 rounded-lg gap-5 flex flex-col cursor-pointer'>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-gray-700'>Platform Revenue</p>
          <span className='text-xl bg-green-300/50 w-[40px] h-[40px] flex items-center justify-center text-green-900 rounded-lg'><DollarSign size={16} /></span>
        </div>
        <h1 className='font-space text-3xl font-bold'>$45,230</h1>
        <div className='flex items-center justify-between gap-3'>
          <span className='flex items-center gap-3 bg-green-300/50 w-[fit-content] p-1 px-2 rounded-full text-green-900 font-bold'><FaArrowTrendUp />+19%</span>
          <span className='text-gray-700'>This month</span>
        </div>
      </div>
      
      <div className='flex-1 w-full md:w-[23%] md:min-w-[250px] bg-white p-5 rounded-lg gap-5 flex flex-col cursor-pointer'>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-gray-700'>Active Couriers</p>
          <span className='text-xl bg-green-300/50 w-[40px] h-[40px] flex items-center justify-center text-green-900 rounded-lg'><Motorbike size={16} /></span>
        </div>
        <h1 className='font-space text-3xl font-bold'>28</h1>
        <div className='flex items-center justify-between gap-3'>
          <span className='flex items-center gap-3 bg-green-300/50 w-[fit-content] p-1 px-2 rounded-full text-green-900 font-bold'><FaArrowTrendUp />+5</span>
          <span className='text-gray-700'>This month</span>
        </div>
      </div>

      <div className='flex-1 w-full md:w-[23%] md:min-w-[250px] bg-white p-5 rounded-lg gap-5 flex flex-col cursor-pointer'>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-gray-700'>Pending Approvals</p>
          <span className='text-xl bg-green-300/50 w-[40px] h-[40px] flex items-center justify-center text-green-900 rounded-lg'><Signature size={16} /></span>
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