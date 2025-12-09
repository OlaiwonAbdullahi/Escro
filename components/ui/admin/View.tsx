"use client"
import React from 'react'
import { useAdminContext } from './AdminContext'
import Dashboard from './pages/Dashboard'
import Agents from './pages/Agents'
import Projects from './pages/Projects'
import Messages from './pages/Messages'
import Settings from './pages/Settings'
import AlertModal from './AlertModal'
import {AnimatePresence} from "framer-motion"
import Notifications from './pages/Notifications'
import Users from './pages/Users'
import Disputes from './pages/Disputes'
import Finance from './pages/Finance'

function View() {
    const {currentPage, setCurrentPage, showAlert} = useAdminContext()
  return <>
  <AnimatePresence>
    {
    showAlert && <AlertModal />
    }
  </AnimatePresence>
  {
    currentPage === "Dashboard"? <Dashboard /> : 
    currentPage === "Users"? <Users /> : 
    currentPage === "Disputes"? <Disputes /> : 
    currentPage === "Finance"? <Finance /> : 
    /*currentPage === "Projects"? <Projects /> : 
    currentPage === "Messages"? <Messages /> : 
    currentPage === "Notifications"? <Notifications /> : */
    currentPage === "Settings"? <Settings /> :   
    null
  }
  </>
}

export default View