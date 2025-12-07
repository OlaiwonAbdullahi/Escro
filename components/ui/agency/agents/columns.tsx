"use client"
import { BsDot } from "react-icons/bs"
import { IoCheckmarkDone } from "react-icons/io5" 
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { LuClock2 } from "react-icons/lu";
import { TbCancel } from "react-icons/tb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { AiOutlineEye } from "react-icons/ai";
import { useAgencyContext } from "../AgencyContext";

export const columns = [
    { field: 'name', 
        headerName: 'Name', 
        flex:1,
        renderCell: (params:any) =>{
           const value = params.value
            return <div className="flex items-center h-full">
                {params.row.pfp? <img src={params.row.pfp} alt={value} className="w-8 h-8 rounded-full mr-2 object-cover"/> :
                <span className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xl text-gray-500 mr-2'>{value.charAt(0).toUpperCase()}</span>
                }
                <span>{value}</span>
            </div>
        }
    },
    { field: 'email', 
        headerName: 'Email', 
        flex:1,
    },
    { field: 'status', 
        headerName: 'Status', 
        flex:1,
        renderCell: (params:any) =>{
           const value = params.value
            return <div className="flex items-center h-full">
                <span className={`flex items-center ${value==="Active"?"bg-emerald-700/30 text-emerald-700":"bg-red-700/30 text-red-700"} w-[fit-content] h-[24px] rounded-lg p-2   `}><BsDot className={`text-2xl ${value==="Active" && "animate-pulse"}`} />{value}</span>
            </div>
        }
    },
    { field: 'verification', headerName: 'Verification', 
        flex:1,
        renderCell: (params:any) =>{
           const value = params.value
            return <div className="flex items-center h-full">
                <span className={`flex items-center gap-1 ${value==="Verified"?"bg-emerald-700/30 text-emerald-700":value==="Pending"?"bg-blue-700/30 text-blue-700":"bg-red-700/30 text-red-700"} w-[fit-content] h-[24px] rounded-lg p-2   `}>{
                    value==="Verified" ? <IoCheckmarkDone /> : value==="Pending" ? <LuClock2 /> : <TbCancel />
                }{value}</span>
            </div>
        }
    },
    { field: 'joined', 
        headerName: 'Joined Date', 
        flex:1,
    },
    { field: 'actions', 
        headerName: 'Actions', 
        flex:1,
        renderCell: (params:any) =>{
            return <RowActions agent={params.row} />
        }
    },
]




interface RowActionsProps {
    agent?: any;
}
function RowActions({agent}: RowActionsProps) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const {agents, setAgents, setShowAgentInfo, setSelectedAgent, isSearchingAgentsTable,  agentsTableSearchResults, setAgentsTableSearchResults} = useAgencyContext()

  function handleApprove(){
    if(isSearchingAgentsTable){
        const newAgents = agents.map((ag:any)=>{
        if(agent.name===ag.name){
            return {...ag, verification:"Verified"}
           
        }else{
            return ag
        }
    })

    const newAgentsSearchResults = agentsTableSearchResults.map((ag:any)=>{
        if(agent.name===ag.name){
            return {...ag, verification:"Verified"}
        }else{
            return ag
        }
    })
    setAgentsTableSearchResults(newAgentsSearchResults)
    setAgents(newAgents)
    }else{
        const newAgents = agents.map((ag:any)=>{
        if(agent.name===ag.name){
            return {...ag, verification:"Verified"}
        }else{
            return ag
        }
    })
    setAgents(newAgents)
    }
    
  }

  function handleReject(){
    if(isSearchingAgentsTable){
        const newAgents = agents.map((ag:any)=>{
        if(agent.name===ag.name){
            return {...ag, verification:"Unverified"}
        }else{
            return ag
        }
    })

    const newAgentsSearchResults = agentsTableSearchResults.map((ag:any)=>{
        if(agent.name===ag.name){
            return {...ag, verification:"Unverified"}
        }else{
            return ag
        }
    })
    
    setAgentsTableSearchResults(newAgentsSearchResults)
    setAgents(newAgents)
    }else{
        const newAgents = agents.map((ag:any)=>{
        if(agent.name===ag.name){
            return {...ag, verification:"Unverified"}
        }else{
            return ag
        }
    })
    setAgents(newAgents)
    }
  }

  return (
    <div className="flex border-none outline-none focus:outline-none items-center h-full w-full">
      <HiOutlineDotsHorizontal
        className="text-2xl cursor-pointer"
        onClick={(e:any) => setAnchorEl(e.currentTarget)}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem className="flex items-center gap-1" onClick={handleApprove}><IoCheckmarkDone />Approve</MenuItem>
        <MenuItem className="flex items-center gap-1" onClick={handleReject}><TbCancel />Reject</MenuItem>
        <MenuItem className="flex items-center gap-1" onClick={() => {setShowAgentInfo(true); setSelectedAgent(agent)}}><AiOutlineEye />View</MenuItem>
      </Menu>
    </ div>
  );
}
