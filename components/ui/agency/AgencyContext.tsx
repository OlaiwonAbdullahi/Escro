"use client"

import { usePathname } from "next/navigation"
import {createContext, useContext, useState, ReactNode, useEffect} from "react"
import SERVICES from "@/components/ui/agency/data/services.json"
import PROJECTS from "@/components/ui/agency/data/projects.json"
import USERINFO from "@/components/ui/agency/data/userInfo.json"
import CONVERSATIONS from "@/components/ui/agency/data/conversations.json"
import USERS from "@/components/ui/agency/data/users.json"
import AGENTS from "@/components/ui/agency/data/agents.json"

interface Props{
    children: ReactNode
}

const AgencyContext = createContext<any>(null)

export const AgencyContextProvider = ({children}:Props) =>{

    const [services, setServices]= useState(SERVICES)
    const [projects, setProjects] = useState(PROJECTS)
    const [minimize, setMinimize] = useState(true)
    const [showAgentInfo, setShowAgentInfo] = useState(false)
    const [selectedAgent, setSelectedAgent] = useState(null)
    const [currentPage, setCurrentPage] = useState("")
     useEffect(() => {
    const gotten = localStorage.getItem("agency-current-page")
    if (gotten) {
      setCurrentPage(JSON.parse(gotten))
    }
  }, [])
    useEffect(()=>{
        localStorage.setItem("agency-current-page", JSON.stringify(currentPage))
    }, [currentPage])
    const [alertInfo, setAlertInfo] = useState({title:"", type:""})
    const [showAlert, setShowAlert] = useState(false)
    const [userInfo, setUserInfo] = useState(USERINFO)
    const [conversations, setConversations] = useState(CONVERSATIONS)
    const [isSearching, setIsSearching] = useState(false)
    const [users, setUsers] = useState(USERS)
    const [agents, setAgents] = useState(AGENTS)
    const [agentsTableSearchResults, setAgentsTableSearchResults] = useState([])
   const [isSearchingAgentsTable, setIsSearchingAgentsTable] = useState(false)
   const [projectsSearchResults, setprojectsSearchResults] = useState([])
   const [isSearchingProjects, setIsSearchingProjects] = useState(false)
    function handleAlert(title:string, type:string){
        setAlertInfo({title, type})
        setShowAlert(true)

        setTimeout(()=>{
            setShowAlert(false)
        }, 3000)
    }

    const values = {
        /*theme,
        setTheme,*/
        minimize,
        setMinimize,
        currentPage,
        setCurrentPage,
        services,
        setServices,
        showAlert,
        setShowAlert,
        handleAlert,
        alertInfo,
        setAlertInfo,
        projects,
        setProjects,
        userInfo,
        setUserInfo,
        conversations,
        setConversations,
        isSearching,
        setIsSearching,
        users,
        setUsers,
        agents,
        setAgents,
        agentsTableSearchResults,
        setAgentsTableSearchResults,
        isSearchingAgentsTable, 
        setIsSearchingAgentsTable,
        showAgentInfo,  
        setShowAgentInfo,
        selectedAgent,
        setSelectedAgent,
        isSearchingProjects,
        setIsSearchingProjects,
        projectsSearchResults,
        setprojectsSearchResults
    }

    return <AgencyContext.Provider value={values}>
        {children}
    </AgencyContext.Provider>
}


export const useAgencyContext = () =>{
    return useContext(AgencyContext)
}