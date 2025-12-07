"use client"
import React, { useEffect, useState } from 'react'
import { IoCheckmarkDone } from "react-icons/io5"
import { useAgencyContext } from '../AgencyContext';
import { LuClock2 } from 'react-icons/lu';
import { TbCancel } from 'react-icons/tb';

function Stats() {
    const [stats, setStats] = useState({
        active: 0,
        inActive:0,
        verified:0,
        pending: 0,
        unverified:0
    })
    const {agents} = useAgencyContext();

    useEffect(()=>{
        const activeAgents = agents.filter((agent:any)=> agent.status==="Active").length
        const inActiveAgents = agents.filter((agent:any)=> agent.status==="Inactive").length
        const verifiedAgents = agents.filter((agent:any)=> agent.verification==="Verified").length
        const pendingAgents = agents.filter((agent:any)=> agent.verification==="Pending").length
        const unverifiedAgents = agents.filter((agent:any)=> agent.verification==="Unverified").length
        setStats({
            active: activeAgents,
            inActive: inActiveAgents,
            verified: verifiedAgents,
            pending: pendingAgents,
            unverified: unverifiedAgents
        })
    }, [agents])
  return (
    <div className="flex flex-wrap gap-3">
        <div
          className={`flex-1 bg-emerald-500/10 border-emerald-500/20 border px-4 py-2.5 rounded-sm flex items-center gap-2.5 transition-all hover:shadow-sm`}
        >
          <IoCheckmarkDone className={`w-5 h-5  text-emerald-500`} />
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium text-emerald-500`}>
              Active:
            </span>
            <span className={`text-lg font-bold text-emerald-500`}>
              {stats.active}
            </span>
          </div>
        </div>

          <div
          className={`flex-1 bg-red-500/10 border-red-500/20 border px-4 py-2.5 rounded-sm flex items-center gap-2.5 transition-all hover:shadow-sm`}
        >
          <TbCancel className={`w-5 h-5  text-red-500`} />
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium text-red-500`}>
               InActive::
            </span>
            <span className={`text-lg font-bold text-red-500`}>
              {stats.inActive}
            </span>
          </div>
        </div>

        <div
          className={`flex-1 bg-blue-500/10 border-blue-500/20 border px-4 py-2.5 rounded-sm flex items-center gap-2.5 transition-all hover:shadow-sm`}
        >
          <LuClock2  className={`w-5 h-5  text-blue-500`} />
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium text-blue-500`}>
             Pending:
            </span>
            <span className={`text-lg font-bold text-blue-500`}>
              {stats.pending}
            </span>
          </div>
        </div>
        
      <div
          className={`flex-1 bg-emerald-500/10 border-emerald-500/20 border px-4 py-2.5 rounded-sm flex items-center gap-2.5 transition-all hover:shadow-sm`}
        >
          <IoCheckmarkDone className={`w-5 h-5  text-emerald-500`} />
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium text-emerald-500`}>
              Verified:
            </span>
            <span className={`text-lg font-bold text-emerald-500`}>
              {stats.verified}
            </span>
          </div>
        </div>

        <div
          className={`flex-1 bg-red-500/10 border-red-500/20 border px-4 py-2.5 rounded-sm flex items-center gap-2.5 transition-all hover:shadow-sm`}
        >
          <TbCancel className={`w-5 h-5  text-red-500`} />
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium text-red-500`}>
              Unverified:
            </span>
            <span className={`text-lg font-bold text-red-500`}>
              {stats.unverified}
            </span>
          </div>
        </div>
    </div>
  )
}

export default Stats