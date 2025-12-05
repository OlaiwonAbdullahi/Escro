import React from 'react'
import { useAgencyContext } from './AgencyContext'
import Dashboard from './pages/Dashboard'
import Agents from './pages/Agents'
import Projects from './pages/Projects'
import Messages from './pages/Messages'
import Settings from './pages/Settings'

function View() {
    const {currentPage, setCurrentPage} = useAgencyContext()
  return (
    currentPage === "Dashboard"? <Dashboard /> : 
    currentPage === "Agents"? <Agents /> : 
    currentPage === "Projects"? <Projects /> : 
    currentPage === "Messages"? <Messages /> : 
    currentPage === "Settings"? <Settings /> : 
    
    
    null
  )
}

export default View