"use client"
import React, { useState } from 'react'
import { RiMenu2Fill, RiNotification2Line } from 'react-icons/ri'
import {AnimatePresence} from "framer-motion"
import MobileMenu from './MobileMenu'

function Header() {
  const [showMenu, setShowMenu] = useState(false)
  return <>
  <AnimatePresence>
    {showMenu && <MobileMenu setShowMenu={setShowMenu} />}
  </AnimatePresence>
    <div className='bg-emerald-700 flex items-center w-full h-[100px] /*border-l-[1px] border-gray-400*/ p-6 text-white font-mont'>
        <RiMenu2Fill onClick={()=>{setShowMenu(true)}} className='text-4xl md:hidden flex cursor-pointer' />
        <div className='flex items-center ml-auto gap-6'>
            <span className='text-2xl relative cursor-pointer'>
                <RiNotification2Line />
                <span className='absolute text-sm top-[-13px] right-[-5px] w-[20px] flex items-center justify-center h-[20px] bg-red-600 p-1 rounded-full'>6</span>
            </span>
            <span className='w-[50px] h-[50px] bg-gradient-to-l from-red-200 to-blue-300  inline-block rounded-full' />
        </div>
    </div>
  </>
}

export default Header