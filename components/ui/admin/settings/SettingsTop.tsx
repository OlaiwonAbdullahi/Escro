"use client"
import { BanknoteArrowDown, BanknoteArrowUp, CircleStar, DatabaseZap, DollarSign, Motorbike, ServerCrash, ShieldAlert, Signature, Store, TriangleAlert, Users } from 'lucide-react'
import React from 'react'
import { FaArrowTrendUp } from 'react-icons/fa6'
import { GoProject } from 'react-icons/go'
import { IoIosTrendingUp, IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { LuClock4 } from 'react-icons/lu'
import { MdAttachMoney } from 'react-icons/md'

function SettingsTop() {
  return (
    <div className='flex flex-col md:flex-row gap-5 flex-wrap'>
      <div className='flex-1 w-full md:w-[23%] md:min-w-[250px] bg-white p-5 rounded-lg gap-5 flex flex-col cursor-pointer'>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-gray-700'>Active Incidents</p>
          <span className='text-xl bg-red-300/50 w-[40px] h-[40px] flex items-center justify-center text-red-900 rounded-lg'><TriangleAlert size={16} /></span>
        </div>
        <h1 className='font-space text-3xl font-bold'>5</h1>
        <div className='flex items-center justify-between gap-3'>
          <span className='flex items-center gap-3 bg-red-300/50 w-[fit-content] p-1 px-2 rounded-full text-red-900 font-bold'><FaArrowTrendUp />+2</span>
          <span className='text-gray-700'>This week</span>
        </div>
      </div>

      <div className='flex-1 w-full md:w-[23%] md:min-w-[250px] bg-white p-5 rounded-lg gap-5 flex flex-col cursor-pointer'>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-gray-700'>Security Threats</p>
          <span className='text-xl bg-red-300/50 w-[40px] h-[40px] flex items-center justify-center text-red-900 rounded-lg'><ShieldAlert size={16} /></span>
        </div>
        <h1 className='font-space text-3xl font-bold'>1</h1>
        <div className='flex items-center justify-between gap-3'>
          <span className='flex items-center gap-3 bg-red-300/50 w-[fit-content] p-1 px-2 rounded-full text-red-900 font-bold'><FaArrowTrendUp />+1</span>
          <span className='text-gray-700'>This Month</span>
        </div>
      </div>

      <div className='flex-1 w-full md:w-[23%] md:min-w-[250px] bg-white p-5 rounded-lg gap-5 flex flex-col cursor-pointer'>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-gray-700'>Server Alerts</p>
          <span className='text-xl bg-red-300/50 w-[40px] h-[40px] flex items-center justify-center text-red-900 rounded-lg'><ServerCrash  size={16} /></span>
        </div>
        <h1 className='font-space text-3xl font-bold'>2</h1>
        <div className='flex items-center justify-between gap-3'>
          <span className='flex items-center gap-3 bg-red-300/50 w-[fit-content] p-1 px-2 rounded-full text-red-900 font-bold'><FaArrowTrendUp />+2</span>
          <span className='text-gray-700'>This week</span>
        </div>
      </div>

      <div className='flex-1 w-full md:w-[23%] md:min-w-[250px] bg-white p-5 rounded-lg gap-5 flex flex-col cursor-pointer'>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-gray-700'>Database Issues</p>
          <span className='text-xl bg-red-300/50 w-[40px] h-[40px] flex items-center justify-center text-red-900 rounded-lg'><DatabaseZap  size={16} /></span>
        </div>
        <h1 className='font-space text-3xl font-bold'>2</h1>
        <div className='flex items-center justify-between gap-3'>
          <span className='flex items-center gap-3 bg-red-300/50 w-[fit-content] p-1 px-2 rounded-full text-red-900 font-bold'><FaArrowTrendUp />+1</span>
          <span className='text-gray-700'>This week</span>
        </div>
      </div>


    </div>
  )
}

export default SettingsTop