"use client"
import React, { useEffect, useState } from 'react'
import { IoCheckmarkDone } from "react-icons/io5"
import { useAdminContext } from '../AdminContext';
import { LuClock2 } from 'react-icons/lu';
import { TbCancel } from 'react-icons/tb';
import { Ban, HatGlasses, Motorbike, Store, Users } from 'lucide-react';

function Stats() {
    const [stats, setStats] = useState({
        customers:0,
        agencies:0,
        couriers:0,
        stores:0,
        banned:0
    })
    const {users} = useAdminContext();

    useEffect(()=>{
        const customers = users.filter((user:any)=> user.role==="Customer").length
        const agencies = users.filter((user:any)=> user.role==="Agency").length
        const couriers = users.filter((user:any)=> user.role==="Courier").length
        const stores = users.filter((user:any)=> user.role==="Store").length
        const banned = users.filter((user:any)=> user.status==="Banned").length
      //  const unverifiedusers = users.filter((user:any)=> user.role==="Unverified").length
        setStats({
            customers,
            agencies,
            couriers,
            stores,
            banned
        })
    }, [users])
  return (
    <div className="flex flex-wrap gap-3">
        <div
          className={`flex-1 bg-emerald-500/10 border-emerald-500/20 border px-4 py-2.5 rounded-sm flex items-center gap-2.5 transition-all hover:shadow-sm`}
        >
          <Users size={16} className="text-emerald-700" />
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium text-emerald-500`}>
              Customers:
            </span>
            <span className={`text-lg font-bold text-emerald-500`}>
              {stats.customers}
            </span>
          </div>
        </div>

        <div
          className={`flex-1 bg-emerald-500/10 border-emerald-500/20 border px-4 py-2.5 rounded-sm flex items-center gap-2.5 transition-all hover:shadow-sm`}
        >
          <Store size={16} className="text-emerald-700" />
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium text-emerald-500`}>
              Stores:
            </span>
            <span className={`text-lg font-bold text-emerald-500`}>
              {stats.stores}
            </span>
          </div>
        </div>

        <div
          className={`flex-1 bg-emerald-500/10 border-emerald-500/20 border px-4 py-2.5 rounded-sm flex items-center gap-2.5 transition-all hover:shadow-sm`}
        >
          <HatGlasses size={16} className="text-emerald-700" />
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium text-emerald-500`}>
              Agencies:
            </span>
            <span className={`text-lg font-bold text-emerald-500`}>
              {stats.agencies}
            </span>
          </div>
        </div>

        <div
          className={`flex-1 bg-emerald-500/10 border-emerald-500/20 border px-4 py-2.5 rounded-sm flex items-center gap-2.5 transition-all hover:shadow-sm`}
        >
          <Motorbike size={16} className="text-emerald-700" />
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium text-emerald-500`}>
              Couriers:
            </span>
            <span className={`text-lg font-bold text-emerald-500`}>
              {stats.couriers}
            </span>
          </div>
        </div>

        <div
          className={`flex-1 bg-red-500/10 border-red-500/20 border px-4 py-2.5 rounded-sm flex items-center gap-2.5 transition-all hover:shadow-sm`}
        >
          <Ban size={16} className='text-red-500' />
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium text-red-500`}>
              Banned:
            </span>
            <span className={`text-lg font-bold text-red-500`}>
              {stats.banned}
            </span>
          </div>
        </div>

        
    </div>
  )
}

export default Stats