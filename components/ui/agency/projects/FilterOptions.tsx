import React from 'react'
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
import { useAgencyContext } from '../AgencyContext';


function FilterOptions() {
    const {projects, setProjects, setIsSearchingProjects, setprojectsSearchResults} = useAgencyContext()

    function handleSearch(value:string){
        setIsSearchingProjects(true)
        const newProjects = projects.filter((project:any)=>{
            if(project.name.toLowerCase().includes(value.toLowerCase())){
                return project
            }
        })
        setprojectsSearchResults(newProjects)
    
    
}

  return (
    <div className="bg-white border border-emerald-500/20 rounded-md p-4 cursor-pointer ">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search Projects..."
                onChange={e=>{handleSearch(e.target.value)}}
                className="w-full bg-gray-50 shadow-none border-gray-200 rounded-sm text-gray-900 placeholder-gray-400 pl-11 pr-4 py-2.5 h-9 focus:outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Status Filter */}
              <Select>
                <SelectTrigger className="w-[160px] h-9 font-mont bg-gray-50 border-gray-200 rounded-sm">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="active">Inactive</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Range Filter */}
              <Select >
                <SelectTrigger className="w-[160px] h-9 bg-gray-50 border-gray-200 rounded-sm">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

  )
}

export default FilterOptions