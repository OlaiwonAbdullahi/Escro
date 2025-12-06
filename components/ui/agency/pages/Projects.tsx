import React from 'react'
import Projs from '../projects/Projs'
import Stats from '../projects/Stats'
import FilterOptions from '../projects/FilterOptions'
import { useAgencyContext } from '../AgencyContext';
import AgentInfo from '../agents/AgentInfo';
function Projects() {
  
  return <>
  
    <div className='flex flex-col gap-5 p-6 font-mont bg-gray-100 h-[calc(100vh-100px)] overflow-y-auto'>
        <div>
            <h1 className='text-4xl font-semibold font-noto text-black'>Projects</h1>
            <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, soluta?</p>
        </div>
        <Stats />
        <FilterOptions />
        <Projs />
    </div>
  </>
}

export default Projects