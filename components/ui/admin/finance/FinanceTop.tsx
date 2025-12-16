"use client"
import { BanknoteArrowDown, BanknoteArrowUp, CircleStar, DollarSign, Motorbike, Signature, Store, Users } from 'lucide-react'
import React from 'react'
import { FaArrowTrendUp } from 'react-icons/fa6'
import { GoProject } from 'react-icons/go'
import { IoIosTrendingUp, IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { LuClock4 } from 'react-icons/lu'
import { MdAttachMoney } from 'react-icons/md'

function FinanceTop() {
  return (
    <div className='flex flex-col md:flex-row gap-5 flex-wrap'>
      <div className='flex-1 w-full md:w-[23%] md:min-w-[250px] bg-white p-5 rounded-lg gap-5 flex flex-col cursor-pointer'>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-gray-700'>Total Revenue</p>
          <span className='text-xl bg-green-300/50 w-[40px] h-[40px] flex items-center justify-center text-green-900 rounded-lg'><DollarSign size={16} /></span>
        </div>
        <h1 className='font-space text-3xl font-bold'>$200,000</h1>
        <div className='flex items-center justify-between gap-3'>
          <span className='flex items-center gap-3 bg-green-300/50 w-[fit-content] p-1 px-2 rounded-full text-green-900 font-bold'><FaArrowTrendUp />+18.2%</span>
          <span className='text-gray-700'>This week</span>
        </div>
      </div>

      <div className='flex-1 w-full md:w-[23%] md:min-w-[250px] bg-white p-5 rounded-lg gap-5 flex flex-col cursor-pointer'>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-gray-700'>Commision Earned</p>
          <span className='text-xl bg-green-300/50 w-[40px] h-[40px] flex items-center justify-center text-green-900 rounded-lg'><BanknoteArrowDown size={16} /></span>
        </div>
        <h1 className='font-space text-3xl font-bold'>$20,000</h1>
        <div className='flex items-center justify-between gap-3'>
          <span className='flex items-center gap-3 bg-green-300/50 w-[fit-content] p-1 px-2 rounded-full text-green-900 font-bold'><FaArrowTrendUp />+10%</span>
          <span className='text-gray-700'>This Month</span>
        </div>
      </div>

      <div className='flex-1 w-full md:w-[23%] md:min-w-[250px] bg-white p-5 rounded-lg gap-5 flex flex-col cursor-pointer'>
        <div className='flex items-center justify-between gap-3'>
          <p className='text-gray-700'>Pendng Payouts</p>
          <span className='text-xl bg-green-300/50 w-[40px] h-[40px] flex items-center justify-center text-green-900 rounded-lg'><BanknoteArrowUp size={16} /></span>
        </div>
        <h1 className='font-space text-3xl font-bold'>$30,000</h1>
        <div className='flex items-center justify-between gap-3'>
          <span className='flex items-center gap-3 bg-green-300/50 w-[fit-content] p-1 px-2 rounded-full text-green-900 font-bold'><FaArrowTrendUp />+$2300</span>
          <span className='text-gray-700'>This week</span>
        </div>
      </div>


    </div>
  )
}

export default FinanceTop