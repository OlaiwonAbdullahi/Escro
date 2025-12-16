"use client"

import { usePathname } from "next/navigation"
import {createContext, useContext, useState, ReactNode, useEffect} from "react"
import SERVICES from "@/components/ui/admin/data/services.json"
import PROJECTS from "@/components/ui/admin/data/projects.json"
import USERINFO from "@/components/ui/admin/data/userInfo.json"
import CONVERSATIONS from "@/components/ui/admin/data/conversations.json"
import USERS from "@/components/ui/admin/data/users.json"
import DISPUTES from "@/components/ui/admin/data/disputes.json"
import TRANSACTIONS from "@/components/ui/admin/data/transactions.json"
//import users from "@/components/ui/agency/data/users.json"

interface Props{
    children: ReactNode
}

const AdminContext = createContext<any>(null)

export const AdminContextProvider = ({children}:Props) =>{

    const [services, setServices]= useState(SERVICES)
    const [disputes, setDisputes] = useState(DISPUTES)
    const [transactions, setTransactions] = useState(TRANSACTIONS)
    const [isSearchingTransactions, setIsSearchingTransactions] = useState(false)
    const [transactionsSearchResults, setTransactionsSearchResults] = useState([])
    const [isSearchingDisputes, setIsSearchingDisputes] = useState(false)
    const [disputesSearchResults, setDisputesSearchResults] = useState([])
    const [projects, setProjects] = useState<any>()
    const [minimize, setMinimize] = useState(true)
    const [showUserInfo, setShowUserInfo] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedProject, setSelectedProject] = useState(null)
    const [currentPage, setCurrentPage] = useState("")
    const [showNotifications, setShowNotifications] = useState(false)
     useEffect(() => {
       //projects
        
        calculateProgress(PROJECTS)
        

    //currentpage
    const gotten = localStorage.getItem("admin-current-page")
    if (gotten) {
      setCurrentPage(JSON.parse(gotten))
    }else{
        setCurrentPage("Dashboard")
    }
  }, [])
    useEffect(()=>{
        localStorage.setItem("admin-current-page", JSON.stringify(currentPage))
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
    //const [users, setusers] = useState(users)
    const [usersTableSearchResults, setUsersTableSearchResults] = useState<any[]>([])
   const [isSearchingUsersTable, setIsSearchingUsersTable] = useState(false)
   const [usersFilterValue, setUsersFilterValue] = useState("")
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


    function handleFilterUsers(value:string){
           setIsSearchingUsersTable(true)
       const newUsers = users.filter((user:any)=>{
                if(user.role.toLowerCase() === value.toLowerCase()){
                    return user
                }
            })
          setUsersTableSearchResults(newUsers)
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
        /*users,
        setusers,*/
        usersTableSearchResults,
        setUsersTableSearchResults,
        isSearchingUsersTable, 
        setIsSearchingUsersTable,
        showUserInfo,  
        setShowUserInfo,
        selectedUser,
        setSelectedUser,
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
        calculateProgress,
        handleFilterUsers,
        usersFilterValue,
        setUsersFilterValue,
        disputes,
        setDisputes,
        isSearchingDisputes,
        setIsSearchingDisputes,
        disputesSearchResults,
        setDisputesSearchResults,
        transactions,
        setTransactions,
        isSearchingTransactions,
        setIsSearchingTransactions,
        transactionsSearchResults,
        setTransactionsSearchResults
    }

    return <AdminContext.Provider value={values}>
        {children}
    </AdminContext.Provider>
}


export const useAdminContext = () =>{
    return useContext(AdminContext)
}