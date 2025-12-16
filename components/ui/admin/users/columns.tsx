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
import { useAdminContext } from "../AdminContext";
import { Ban, HatGlasses, Motorbike, Store, Users } from "lucide-react";

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
                <span className={`flex items-center ${value==="Active"?"bg-emerald-700/30 text-emerald-700":"bg-red-700/30 text-red-700"} w-[fit-content] h-[24px] rounded-lg p-2 ${value==="Banned" && "gap-1"}  `}>{value==="Active"?<BsDot className={`text-2xl animate-pulse`} />:<Ban size={12} />}{value}</span>
            </div>
        }
    },
    { field: 'role', headerName: 'Role', 
        flex:1,
        renderCell: (params:any) =>{
           const value = params.value
            return <div className="flex items-center h-full">
                <span className={`flex items-center gap-1 /*${value==="Verified"?"bg-emerald-700/30 text-emerald-700":value==="Pending"?"bg-orange-600/30 text-orange-600":"bg-red-700/30 text-red-700"}*/ bg-emerald-700 text-white w-[fit-content] h-[24px] rounded-lg p-2   `}>{
                    value==="Customer" ? <Users size={16} /> :
                     value==="Store" ? <Store size={16} /> :
                     value==="Agency" ? <HatGlasses size={16} />:
                     <Motorbike size={16} />
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
            return <RowActions user={params.row} />
        }
    },
]




interface RowActionsProps {
    user?: any;
}
function RowActions({user}: RowActionsProps) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const {users, setUsers, setShowUserInfo, setSelectedUser, isSearchingUsersTable,  usersTableSearchResults, setUsersTableSearchResults} = useAdminContext()

  function handleUnban(){
    if(isSearchingUsersTable){
        const newusers = users.map((ag:any)=>{
        if(user.id===ag.id){
            return {...ag, status:"Active"}
           
        }else{
            return ag
        }
    })

    const newusersSearchResults = usersTableSearchResults.map((ag:any)=>{
        if(user.id===ag.id){
            return {...ag, status:"Active"}
        }else{
            return ag
        }
    })
    setUsersTableSearchResults(newusersSearchResults)
    setUsers(newusers)
    }else{
        const newusers = users.map((ag:any)=>{
        if(user.id===ag.id){
            return {...ag, status:"Active"}
        }else{
            return ag
        }
    })
    setUsers(newusers)
    }
    
  }

  function handleBan(){
    if(isSearchingUsersTable){
        const newusers = users.map((ag:any)=>{
        if(user.id===ag.id){
            return {...ag, status:"Banned"}
        }else{
            return ag
        }
    })

    const newusersSearchResults = usersTableSearchResults.map((ag:any)=>{
        if(user.id===ag.id){
            return {...ag, status:"Banned"}
        }else{
            return ag
        }
    })
    
    setUsersTableSearchResults(newusersSearchResults)
    setUsers(newusers)
    //console.log(newusers)
    }else{
        const newusers = users.map((ag:any)=>{
        if(user.id===ag.id){
            return {...ag, status:"Banned"}
        }else{
            return ag
        }
    })
    setUsers(newusers)
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
        <MenuItem className="flex items-center gap-1" onClick={handleUnban}><IoCheckmarkDone />Unban</MenuItem>
        <MenuItem className="flex items-center gap-1" onClick={handleBan}><TbCancel />Ban</MenuItem>
        <MenuItem className="flex items-center gap-1" onClick={() => {setShowUserInfo(true); setSelectedUser(user)}}><AiOutlineEye />View</MenuItem>
      </Menu>
    </ div>
  );
}
