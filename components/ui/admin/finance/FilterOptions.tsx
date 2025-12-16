"use client"
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconAdjustmentsHorizontal, IconSearch } from '@tabler/icons-react'
import { useAdminContext } from '../AdminContext';


function FilterOptions() {
    const {transactions, 
      setTransactions, 
      transactionsSearchResults,
      setTransactionsSearchResults, 
      isSearchingTransactions,
      setIsSearchingTransactions
    } = useAdminContext()

      const [transactionsFilterValue, setTransactionsFilterValue] = useState("")

    function handleSearch(value:string){
        setIsSearchingTransactions(true)
    const newTransactions = transactions.filter((transaction:any)=>{
            if(transaction.user.toLowerCase().includes(value.toLowerCase())){
                return transaction
            }
        })
        setTransactionsSearchResults(newTransactions)
  }

  function handleFiltertransactions(value:string){
    setIsSearchingTransactions(true)
       const newTransactions = transactions.filter((transaction:any)=>{
                if(transaction.status.toLowerCase() === value.toLowerCase()){
                    return transaction
                }
            })
    setTransactionsSearchResults(newTransactions)
  }

  useEffect(()=>{
    if(transactionsFilterValue==="all"){
      setIsSearchingTransactions(false)
    }else if(!transactionsFilterValue){
      return
    } else{
      handleFiltertransactions(transactionsFilterValue)
    }
  }, [transactionsFilterValue])

  return (
    <div className="bg-white border border-emerald-500/20 rounded-md p-4 cursor-pointer ">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name..."
                onChange={e=>{handleSearch(e.target.value)}}
                className="w-full bg-gray-50 shadow-none border-gray-200 rounded-sm text-gray-900 placeholder-gray-400 pl-11 pr-4 py-2.5 h-9 focus:outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Status Filter */}
             {/*} <Select value={usersFilterValue} onValueChange={setUsersFilterValue}>
                <SelectTrigger className="flex-1 w-[160px] h-9 font-mont bg-gray-50 border-gray-200 rounded-sm">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>*/}

              {/* Date Range Filter */}
              <Select value={transactionsFilterValue} onValueChange={setTransactionsFilterValue} >
                <SelectTrigger className="flex-1 w-[160px] h-9 bg-gray-50 border-gray-200 rounded-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

  )
}

export default FilterOptions