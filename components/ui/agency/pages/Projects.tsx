import React from 'react'
import Projs from '../projects/Projs'
import Stats from '../projects/Stats'
import FilterOptions from '../projects/FilterOptions'
import { useAgencyContext } from '../AgencyContext';
import AgentInfo from '../agents/AgentInfo';
import { Plus } from 'lucide-react';
import CreateProjectModal from '../projects/CreateProjectModal';
function Projects() {
  const {setShowCreateProjectModal, showCreateProjectModal} = useAgencyContext()
  return <>
  {
    showCreateProjectModal && <CreateProjectModal setShowCreateProjectModal={setShowCreateProjectModal} />
  }
    <div className='flex flex-col gap-5 p-6 font-mont bg-gray-100 h-[calc(100vh-100px)] overflow-y-auto'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
                    <div className='flex-1 '>
                      <h1 className='text-4xl font-semibold font-noto text-black'>Agents</h1>
                      <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, soluta?</p>
                    </div>
                    <button onClick={() => setShowCreateProjectModal(true)} className='flex-1 max-w-[200px] flex items-center gap-2 bg-emerald-700 p-3 rounded-lg text-white cursor-pointer'><Plus /> Add Project</button>
                </div>
        <Stats />
        <FilterOptions />
        <Projs />
    </div>
  </>
}

export default Projects