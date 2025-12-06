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

function Sidebar() {
    const {currentPage, setCurrentPage} = useAgencyContext()
  return (
    <div className='h-screen bg-emerald-700  w-[20vw] max-w-[320px] flex flex-col border-black'>
        <h1 className='text-emerald-400 h-[100px] p-8 border-b-[1px] border-b-gray-400 font-noto flex items-center gap-2 text-3xl font-bold'>
            <TbShoppingBag />
            Escro
        </h1>
        <div className='text-white font-mont p-4 flex flex-col gap-3 max-h-[70vh] overflow-y-auto'>
            <span onClick={()=>setCurrentPage("Dashboard")} className={`flex items-center gap-2 text-md p-2 ${currentPage === "Dashboard" ? "bg-white/20" : ""} rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out`} ><MdOutlineDashboard /> Dashboard</span>
            <span onClick={()=>setCurrentPage("Agents")} className={`flex items-center gap-2 text-md p-2 ${currentPage === "Agents" ? "bg-white/20" : ""} rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out`} ><GrUserWorker /> Agents</span>
            <span onClick={()=>setCurrentPage("Projects")} className={`flex items-center gap-2 text-md p-2 ${currentPage === "Projects" ? "bg-white/20" : ""} rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out`} ><GoProject /> Projects</span>
            <span onClick={()=>setCurrentPage("Messages")} className={`flex items-center gap-2 text-md p-2 ${currentPage === "Messages" ? "bg-white/20" : ""} rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out`} ><FiMessageSquare /> Messages</span>
            <span onClick={()=>setCurrentPage("Settings")} className={`flex items-center gap-2 text-md p-2 ${currentPage === "Settings" ? "bg-white/20" : ""} rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out`} ><IoSettingsOutline /> Settings</span>
        </div>
        <div className='text-white font-mont p-4 flex flex-col gap-1 h-[fit-content]  border-t-[1px] border-t-gray-400 mt-auto'>
            <span className='flex items-center gap-2 text-md p-2  rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out'><BsPerson /> Profile</span>
            <span className='flex items-center gap-2 text-md p-2  rounded-lg cursor-pointer hover:bg-white/20 transition-bg duration-300 ease-in-out'><SlLogout /> Logout</span>
        </div>
    </div>
  )
}

export default Sidebar