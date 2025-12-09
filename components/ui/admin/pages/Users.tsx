"use client"
import React, { useState } from 'react'
import  DataTable  from '../DataTable'
import { columns } from '../users/columns'
import { useAdminContext } from '../AdminContext'
import { IoCloudDownloadOutline } from 'react-icons/io5'
import FilterOptions from '../users/FilterOptions'
import { useGridApiRef/*, gridExportToCsv*/  } from '@mui/x-data-grid'
import UserInfo from '../users/UserInfo'
import Stats from '../users/Stats'
import {AnimatePresence} from "framer-motion"

function Users() {
  const {users, setUsers, usersTableSearchResults, isSearchingUsersTable, showUserInfo} = useAdminContext()



const apiRef:any = useGridApiRef();

const exportCSV = () => {
  apiRef.current.exportDataAsCsv({
    fileName: "my-Users-table",
  });
};

  return <>
  <AnimatePresence>
    {
    showUserInfo && <UserInfo />
  }
  </AnimatePresence>
    <div className='flex flex-col gap-5 p-6 font-mont bg-gray-100 h-[calc(100vh-100px)] overflow-y-auto'>
        <div className='flex flex-wrap flex-col md:flex-row items-center justify-between gap-3'>
            <div className='flex-1 '>
              <h1 className='text-4xl font-semibold font-noto text-black'>Users</h1>
              <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, soluta?</p>
            </div>
            <button onClick={exportCSV} className='flex-1 w-full md:max-w-[200px] flex items-center gap-2 bg-emerald-700 p-3 rounded-lg text-white cursor-pointer'><IoCloudDownloadOutline /> Export Users</button>
        </div>
        <Stats />
        <FilterOptions />
        <DataTable apiRef={apiRef} columns={columns} rows={isSearchingUsersTable ? usersTableSearchResults : users} />
    </div>
  </>
}

export default Users