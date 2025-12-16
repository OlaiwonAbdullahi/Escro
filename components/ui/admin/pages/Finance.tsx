import React from 'react'
import FinanceTop from '../finance/FinanceTop'
import DataTable from '../DataTable'
import { columns } from '../finance/columns'
import { useAdminContext } from '../AdminContext'
import { useGridApiRef } from '@mui/x-data-grid'
import { IoCloudDownloadOutline } from 'react-icons/io5'
import FilterOptions from '../finance/FilterOptions'

function Finance() {
  const apiRef:any = useGridApiRef();
  
  const exportCSV = () => {
    apiRef.current.exportDataAsCsv({
      fileName: "Finances-table",
    });
  };
  const {transactions, isSearchingTransactions, transactionsSearchResults} = useAdminContext()
  return (
    <div className='flex flex-col gap-5 p-6 font-mont bg-gray-100 h-[calc(100vh-100px)] overflow-y-auto'>
        <div className='flex flex-wrap flex-col md:flex-row items-center justify-between gap-3'>
            <div className='flex-1 '>
              <h1 className='text-4xl font-semibold font-noto text-black'>Finance</h1>
              <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, soluta?</p>
            </div>
            <button onClick={exportCSV} className='flex-1 w-full md:max-w-[200px] flex items-center gap-2 bg-emerald-700 p-3 rounded-lg text-white cursor-pointer'><IoCloudDownloadOutline /> Export Transaction</button>
        </div>
        <FinanceTop />
        <FilterOptions />
        <DataTable apiRef={apiRef} rows={isSearchingTransactions ? transactionsSearchResults : transactions} columns={columns} />
    </div>
  )
}

export default Finance