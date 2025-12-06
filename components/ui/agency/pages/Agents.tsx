"use client"
import React, { useState } from 'react'
import  DataTable  from '../DataTable'
import { columns } from '../agents/columns'
import { useAgencyContext } from '../AgencyContext'
import { IoCloudDownloadOutline } from 'react-icons/io5'
import FilterOptions from '../agents/FilterOptions'
import { useGridApiRef/*, gridExportToCsv*/  } from '@mui/x-data-grid'

function Agents() {
  const {agents, setAgents, agentsTableSearchResults, isSearchingAgentsTable} = useAgencyContext()



const apiRef:any = useGridApiRef();

const exportCSV = () => {
  apiRef.current.exportDataAsCsv({
    fileName: "my-agents-table",
  });
};

  return (
    <div className='flex flex-col gap-5 p-6 font-mont bg-gray-100 h-[calc(100vh-100px)] overflow-y-auto'>
        <div className='flex items-center justify-between gap-3'>
            <div>
              <h1 className='text-4xl font-semibold font-noto text-black'>Agents</h1>
              <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, soluta?</p>
            </div>
            <button onClick={exportCSV} className='flex items-center gap-2 bg-emerald-700 p-3 rounded-lg text-white cursor-pointer'><IoCloudDownloadOutline /> Export Agents</button>
        </div>
        <FilterOptions />
        <DataTable apiRef={apiRef} columns={columns} rows={isSearchingAgentsTable ? agentsTableSearchResults : agents} />
    </div>
  )
}

export default Agents