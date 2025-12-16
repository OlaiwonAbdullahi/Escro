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
    const [projects, setProjects] = useState<any>()
    const [minimize, setMinimize] = useState(true)
    const [showAgentInfo, setShowAgentInfo] = useState(false)
    const [selectedAgent, setSelectedAgent] = useState(null)
    const [selectedProject, setSelectedProject] = useState(null)
    const [currentPage, setCurrentPage] = useState("")
    const [showNotifications, setShowNotifications] = useState(false)
     useEffect(() => {
       //projects
        
        calculateProgress(PROJECTS)
        

    //currentpage
    const gotten = localStorage.getItem("agency-current-page")
    if (gotten) {
      setCurrentPage(JSON.parse(gotten))
    }else{
        setCurrentPage("Dashboard")
    }
  }, [])
    useEffect(()=>{
        localStorage.setItem("agency-current-page", JSON.stringify(currentPage))
    }, [currentPage])

    function calculateProgress(projs:any){
        const newProjects = projs.map((proj:any)=>{
            const milestones = proj.milestones
            const completed = milestones.filter((mile:any)=>mile.completed===true)
            const progress = Math.trunc((completed.length/milestones.length) * 100)
            return {...proj, progress: `${progress}%`, status: `${(progress===100 && proj.status!="Cancelled")?"Completed":proj.status==="Cancelled"?"Cancelled":"In Progress"}`}
        })

        setProjects(newProjects)
    }
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
   const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
   const [showProjectInfo, setShowProjectInfo] = useState(false)
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
        setprojectsSearchResults,
        showCreateProjectModal,
        setShowCreateProjectModal,
        showNotifications,
        setShowNotifications,
        showProjectInfo,
        setShowProjectInfo,
        selectedProject,
        setSelectedProject,
        calculateProgress
    }

    return <AgencyContext.Provider value={values}>
        {children}
    </AgencyContext.Provider>
}


export const useAgencyContext = () =>{
    return useContext(AgencyContext)
}