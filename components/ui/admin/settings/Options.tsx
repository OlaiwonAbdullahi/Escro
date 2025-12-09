import React from 'react'


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowRight, BanknoteX, ClipboardClock, Construction, DatabaseBackup, Megaphone, MonitorX, Power, UserLock } from 'lucide-react'
import { title } from 'process'
import { description } from '../BarChart'
import { useAdminContext } from '../AdminContext'
function Options() {
    const options = [
        {
            icon: Power ,
            title:"System Shutdown",
            description:"Immediately shut down the entire platform"
        },
        {
            icon: UserLock ,
            title:"Lock All Users",
            description:"Temporarily prevent all user access"
        },
        {
            icon: DatabaseBackup  ,
            title:"Database Rollback",
            description:"Restore database to previous state"
        },
        {
            icon: MonitorX ,
            title:"Suspend Orders",
            description:"Pause all order processing"
        },
        {
            icon: BanknoteX ,
            title:"Freeze Payouts",
            description:"Halt all financial transactions"
        },
        {
            icon: Megaphone ,
            title:"Global Announcement",
            description:"Broadcast message to all users"
        },
        {
            icon: Construction ,
            title:"Maintenance Mode",
            description:"Put the site in maintenance"
        },
        {
            icon: ClipboardClock ,
            title:"Audit Logs",
            description:"View all emergency actions"
        }
    ]

    const {handleAlert} = useAdminContext()
  return (
    <div className='flex flex-col gap-3'>
        <h1 className='font-noto text-2xl'>Emergency Options</h1>
        <div className='flex flex-wrap gap-3 flex-col md:flex-row'>
        {
            options.map((option:any, index:number)=>{
                const Icon = option.icon
                return <Card onClick={()=>{handleAlert(`${option.title}!`, "bad")}} key={index} className='shadow-none flex-1 cursor-pointer md:min-w-[250px] hover:scale-[1.02] transition-scale duration-300 ease-in-out'>
            <CardHeader>
                <div className='flex justify-between items-center gap-2'>
                    <span className='w-10 h-10 rounded-full bg-red-600/10 text-red-600 flex items-center justify-center'><Icon size={16} /></span>
                    <span className='w-10 h-10 rounded-lg bg-red-600/10 text-red-600 flex items-center justify-center'><ArrowRight size={16} /></span>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col gap-2'>
                <h2 className='font-noto text-xl'>{option.title}</h2>
                <p>{option.description}</p>
            </CardContent>
        </Card>
            })
        }
    </div>
</div>
  )
}

export default Options