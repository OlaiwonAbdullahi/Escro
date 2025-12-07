import React from 'react'
import { TbShoppingBag } from 'react-icons/tb'
import { useAgencyContext } from './AgencyContext'
import { BsPerson } from 'react-icons/bs'
import { SlLogout } from 'react-icons/sl'
import { MdOutlineDashboard } from 'react-icons/md'
import { GrUserWorker } from 'react-icons/gr'
import { GoProject } from 'react-icons/go'
import { FiMessageSquare } from 'react-icons/fi'
import { IoSettingsOutline } from 'react-icons/io5'
import {motion} from 'framer-motion'
import { menuAnimation, others } from './Animations'
import { IoMdClose } from 'react-icons/io'


interface MobileMenuProps {
    setShowMenu: any;
}

function MobileMenu({setShowMenu}: MobileMenuProps) {
    const {currentPage, setCurrentPage} = useAgencyContext()
  return (
    <motion.div
    initial={menuAnimation.initial}
    animate={menuAnimation.animate}
    exit={menuAnimation.initial}
    transition={{
        duration: 0.5,
        ease:"easeInOut"
        }}
    className='fixed inset-0 z-10 bg-emerald-700 flex flex-col'>
               <div className='flex items-center justify-between gap-3 text-emerald-400 h-[100px] p-8 border-b-[1px] border-b-gray-400'>
                    <IoMdClose onClick={() => setShowMenu(false)} className='text-4xl cursor-pointer' />
                    <h1 className='font-noto flex items-center gap-2 text-3xl font-bold'>
                        <TbShoppingBag className="min-w-[30px] min-h-[30px]" />
                        Escro
                    </h1>
               </div>
                <div className='text-white font-mont p-4 flex flex-col gap-3 max-h-[70vh] overflow-y-auto'>
                    <span onClick={()=>{setCurrentPage("Dashboard"); setShowMenu(false)}} className={`flex items-center gap-2 text-md p-2 ${currentPage === "Dashboard" ? "bg-white/20" : ""} rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out`} ><MdOutlineDashboard /> Dashboard</span>
                    <span onClick={()=>{setCurrentPage("Agents"); setShowMenu(false)}} className={`flex items-center gap-2 text-md p-2 ${currentPage === "Agents" ? "bg-white/20" : ""} rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out`} ><GrUserWorker /> Agents</span>
                    <span onClick={()=>{setCurrentPage("Projects"); setShowMenu(false)}} className={`flex items-center gap-2 text-md p-2 ${currentPage === "Projects" ? "bg-white/20" : ""} rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out`} ><GoProject /> Projects</span>
                    <span onClick={()=>{setCurrentPage("Messages"); setShowMenu(false)}} className={`flex items-center gap-2 text-md p-2 ${currentPage === "Messages" ? "bg-white/20" : ""} rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out`} ><FiMessageSquare /> Messages</span>
                    <span onClick={()=>{setCurrentPage("Settings"); setShowMenu(false)}} className={`flex items-center gap-2 text-md p-2 ${currentPage === "Settings" ? "bg-white/20" : ""} rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out`} ><IoSettingsOutline /> Settings</span>
                </div>
                <div className='text-white font-mont p-4 flex flex-col gap-1 h-[fit-content]  border-t-[1px] border-t-gray-400 mt-auto'>
                    <span className='flex items-center gap-2 text-md p-2  rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out'><BsPerson /> Profile</span>
                    <span className='flex items-center gap-2 text-md p-2  rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out'><SlLogout /> Logout</span>
                </div>
    </motion.div>
  )
}

export default MobileMenu