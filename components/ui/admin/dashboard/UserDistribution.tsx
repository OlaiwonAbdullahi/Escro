import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HatGlasses, Motorbike, Store, Users } from 'lucide-react'
import { useAdminContext } from '../AdminContext'
function UserDistribution() {
  const {setCurrentPage, users, handleFilterUsers, setUsersFilterValue} = useAdminContext()

  const [stats, setStats] = useState({
          customers:0,
          agencies:0,
          couriers:0,
          stores:0,
          banned:0
      })
  
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
    <Card className='w-full md:w-[55%]'>
        <CardHeader>
            <CardTitle className='flex items-center justify-between gap-3'>
                <span>User Distribution</span>
                <span onClick={()=>{setCurrentPage("Users");handleFilterUsers("All"); setUsersFilterValue("all")}} className='cursor-pointer text-blue-600'>View All</span>
            </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-wrap gap-3'>
          <Card className='shadow-none w-[fit-content] flex-1'>
            <CardContent className='flex flex-col items-center gap-2'>
              <span className='flex items-center justify-center rounded-lg w-10 h-10 p-2 bg-emerald-700 text-white'>
                <Users size={16} />
              </span>
              <h2 className='font-space text-xl'>Customers</h2>
              <span className='text-sm'>{stats.customers}</span>
            </CardContent>
          </Card>
          <Card className='shadow-none w-[fit-content] flex-1'>
            <CardContent className='flex flex-col items-center gap-2'>
              <span className='flex items-center justify-center rounded-lg w-10 h-10 p-2 bg-emerald-700 text-white'>
                <Store size={16} />
              </span>
              <h2 className='font-space text-xl'>Stores</h2>
              <span className='text-sm'>{stats.stores}</span>
            </CardContent>
          </Card>
          
          <Card className='shadow-none w-[fit-content] flex-1'>
            <CardContent className='flex flex-col items-center gap-2'>
              <span className='flex items-center justify-center rounded-lg w-10 h-10 p-2 bg-emerald-700 text-white'>
                <HatGlasses size={16} />
              </span>
              <h2 className='font-space text-xl'>Agencies</h2>
              <span className='text-sm'>{stats.agencies}</span>
            </CardContent>
          </Card>
          
          <Card className='shadow-none w-[fit-content] flex-1'>
            <CardContent className='flex flex-col items-center gap-2'>
              <span className='flex items-center justify-center rounded-lg w-10 h-10 p-2 bg-emerald-700 text-white'>
                <Motorbike size={16} />
              </span>
              <h2 className='font-space text-xl'>Couriers</h2>
              <span className='text-sm'>{stats.couriers}</span>
            </CardContent>
          </Card>
        </CardContent>
    </Card>
  )
}

export default UserDistribution

