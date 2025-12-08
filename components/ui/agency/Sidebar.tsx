"use client"
import React, { useState } from 'react'
import { TbShoppingBag } from "react-icons/tb";
import { MdOutlineDashboard } from "react-icons/md";
import { GrUserWorker } from 'react-icons/gr';
import { GoProject } from 'react-icons/go';
import { FiMessageSquare } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { BsPerson } from 'react-icons/bs';
import { SlLogout } from 'react-icons/sl';
import { useAgencyContext } from './AgencyContext';
import { Bell } from 'lucide-react';

function Sidebar() {
    const {currentPage, setCurrentPage} = useAgencyContext()
  return (
    <div className='hidden h-screen bg-emerald-700  w-[15vw] min-w-[160px] max-w-[320px] md:flex flex-col border-black'>
        <h1 className='text-emerald-400 h-[100px] p-8 border-b-[1px] border-b-gray-400 font-noto flex items-center gap-2 text-3xl font-bold'>
            <TbShoppingBag className="min-w-[30px] min-h-[30px]" />
            Escro
        </h1>
        <div className='text-white font-mont p-4 flex flex-col gap-3 max-h-[70vh] overflow-y-auto'>
            <span onClick={()=>setCurrentPage("Dashboard")} className={`flex items-center gap-2 text-md p-2 ${currentPage === "Dashboard" ? "bg-white/20" : ""} rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out`} ><MdOutlineDashboard className='min-w-[15px] min-h-[15px]' /> Dashboard</span>
            <span onClick={()=>setCurrentPage("Agents")} className={`flex items-center gap-2 text-md p-2 ${currentPage === "Agents" ? "bg-white/20" : ""} rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out`} ><GrUserWorker className='min-w-[15px] min-h-[15px]' /> Agents</span>
            <span onClick={()=>setCurrentPage("Projects")} className={`flex items-center gap-2 text-md p-2 ${currentPage === "Projects" ? "bg-white/20" : ""} rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out`} ><GoProject className='min-w-[15px] min-h-[15px]' /> Projects</span>
            <span onClick={()=>setCurrentPage("Messages")} className={`flex items-center gap-2 text-md p-2 ${currentPage === "Messages" ? "bg-white/20" : ""} rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out`} ><FiMessageSquare className='min-w-[15px] min-h-[15px]' /> Messages</span>
           {/* <span onClick={()=>setCurrentPage("Notifications")} className={`flex items-center gap-2 text-md p-2 ${currentPage === "Notifications" ? "bg-white/20" : ""} rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out`} ><Bell   size={17} /> Notifications</span>*/}
            <span onClick={()=>setCurrentPage("Settings")} className={`flex items-center gap-2 text-md p-2 ${currentPage === "Settings" ? "bg-white/20" : ""} rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out`} ><IoSettingsOutline className='min-w-[15px] min-h-[15px]' /> Settings</span>
        </div>
        <div className='text-white font-mont p-4 flex flex-col gap-1 h-[fit-content]  border-t-[1px] border-t-gray-400 mt-auto'>
            <span className='flex items-center gap-2 text-md p-2  rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out'><BsPerson className='min-w-[15px] min-h-[15px]' /> Profile</span>
            <span className='flex items-center gap-2 text-md p-2  rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out'><SlLogout className='min-w-[15px] min-h-[15px]' /> Logout</span>
        </div>
    </div>
  )
}

export default Sidebar