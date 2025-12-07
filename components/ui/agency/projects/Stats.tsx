import React, { useEffect, useState } from 'react'
import { IoCheckmarkDone } from "react-icons/io5"
import { useAgencyContext } from '../AgencyContext';
import { LuClock2 } from 'react-icons/lu';
import { TbCancel } from 'react-icons/tb';

function Stats() {
    const [stats, setStats] = useState({
        completed: 0,
        inProgress:0,
        cancelled:0
    })
    const {projects} = useAgencyContext();

    useEffect(()=>{
        const completedProjects = projects.filter((project:any)=> project.status==="Completed").length
        const inProgressProjects = projects.filter((project:any)=> project.status==="In Progress").length
        const cancelledProjects = projects.filter((project:any)=> project.status==="Cancelled").length
        setStats({
            completed: completedProjects,
            inProgress: inProgressProjects,
            cancelled: cancelledProjects
        })
    }, [projects])
  return (
    <div className="flex flex-wrap gap-3">
        <div
          className={`flex-1 bg-emerald-500/10 border-emerald-500/20 border px-4 py-2.5 rounded-sm flex items-center gap-2.5 transition-all hover:shadow-sm`}
        >
          <IoCheckmarkDone className={`w-5 h-5  text-emerald-500`} />
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium text-emerald-500`}>
              Completed:
            </span>
            <span className={`text-lg font-bold text-emerald-500`}>
              {stats.completed}
            </span>
          </div>
        </div>

        <div
          className={`flex-1 bg-blue-500/10 border-blue-500/20 border px-4 py-2.5 rounded-sm flex items-center gap-2.5 transition-all hover:shadow-sm`}
        >
          <LuClock2  className={`w-5 h-5  text-blue-500`} />
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium text-blue-500`}>
              In Progress:
            </span>
            <span className={`text-lg font-bold text-blue-500`}>
              {stats.inProgress}
            </span>
          </div>
        </div>

        <div
          className={`flex-1 bg-red-500/10 border-red-500/20 border px-4 py-2.5 rounded-sm flex items-center gap-2.5 transition-all hover:shadow-sm`}
        >
          <TbCancel className={`w-5 h-5  text-red-500`} />
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium text-red-500`}>
              Cancelled:
            </span>
            <span className={`text-lg font-bold text-red-500`}>
              {stats.cancelled}
            </span>
          </div>
        </div>
    </div>
  )
}

export default Stats