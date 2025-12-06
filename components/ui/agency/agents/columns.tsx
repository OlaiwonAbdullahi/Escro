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
                <span className={`flex items-center gap-1 ${value==="Verified"?"bg-emerald-700/30 text-emerald-700":value==="Pending"?"bg-yellow-700/30 text-yellow-700":"bg-red-700/30 text-red-700"} w-[fit-content] h-[24px] rounded-lg p-2   `}>{
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
  const {agents, setAgents} = useAgencyContext()

  function handleApprove(){
    const newAgents = agents.map((ag:any)=>{
        if(agent===ag){
            return {...ag, verification:"Verified"}
        }else{
            return ag
        }
    })
    setAgents(newAgents)
  }

  function handleReject(){
    const newAgents = agents.map((ag:any)=>{
        if(agent===ag){
            return {...ag, verification:"Rejected"}
        }else{
            return ag
        }
    })
    setAgents(newAgents)
  }

  return (
    <div className="flex border-none outline-none focus:outline-none items-center h-full w-full">
      <HiOutlineDotsHorizontal
        className="text-2xl cursor-pointer"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem className="flex items-center gap-1" onClick={handleApprove}><IoCheckmarkDone />Approve</MenuItem>
        <MenuItem className="flex items-center gap-1" onClick={handleReject}><TbCancel />Reject</MenuItem>
        <MenuItem className="flex items-center gap-1" onClick={() => console.log(agent)}><AiOutlineEye />View</MenuItem>
      </Menu>
    </ div>
  );
}
