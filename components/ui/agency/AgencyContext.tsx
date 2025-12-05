"use client"

import { usePathname } from "next/navigation"
import {createContext, useContext, useState, ReactNode, useEffect} from "react"

interface Props{
    children: ReactNode
}

const AgencyContext = createContext<any>(null)

export const AgencyContextProvider = ({children}:Props) =>{
   /* const location = usePathname()
    useEffect(()=>{
   let path = location
    if(path==="/"){
      setCurrentPage("Dashboard")
    }else{
      let newPath = path.split("")
      newPath = newPath.filter(item=>item!="/")
      path = newPath.join("")
      setCurrentPage(path)
    }
  }, [location])*/
  
    /*const [theme, setTheme] = useState<string>(()=>{
        const gotten = localStorage.getItem("agency-theme")
        if(gotten){
            return gotten
        }else{
            return "light"
        }
    })*/

    const [minimize, setMinimize] = useState(true)
    const [currentPage, setCurrentPage] = useState("Dashboard")

    const values = {
        /*theme,
        setTheme,*/
        minimize,
        setMinimize,
        currentPage,
        setCurrentPage
    }

    return <AgencyContext.Provider value={values}>
        {children}
    </AgencyContext.Provider>
}


export const useAgencyContext = () =>{
    return useContext(AgencyContext)
}