export const columns = [
    { field: 'id', 
        headerName: 'Transaction ID', 
        flex:1,
    },
    { field: 'type', 
        headerName: 'Type', 
        flex:1,
    },
    { field: 'user', 
        headerName: 'User', 
        flex:1,
        renderCell: (params:any) =>{
           const value = params.value
            return <div className="flex items-center h-full">
                {params.row.userPfp? <img src={params.row.userPfp} alt={value} className="w-8 h-8 rounded-full mr-2 object-cover"/> :
                <span className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xl text-gray-500 mr-2'>{value.charAt(0).toUpperCase()}</span>
                }
                <span>{value}</span>
            </div>
        }
    },
    { field: 'amount', 
        headerName: 'Amount', 
        flex:1,
        renderCell:(params:any)=>{
            const type = params.row.type
            return <span className={`${type==="Payout"?"text-red-700":"text-emerald-700"}`}>{params.value}</span>
        }
    },
    { field: 'date', 
        headerName: 'Date', 
        flex:1,
    },
    { field: 'status', 
        headerName: 'Status', 
        flex:1,
        renderCell: (params:any)=>{
            const status = params.value
            return <span className={`${status==="Completed"?"bg-emerald-700/20 text-emerald-700":status==="Processing"?"bg-yellow-700/20 text-orange-700":"bg-red-700/20 text-red-700"} rounded-xl p-2 text-sm`}>{params.value}</span>
        }
    },
]