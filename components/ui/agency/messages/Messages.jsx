import React, { useEffect, useState } from 'react'
import { TbMessageDots } from "react-icons/tb";
import { TbMessagePlus } from "react-icons/tb";
import { IoPersonOutline } from 'react-icons/io5';
//import CreateGroupModal from './CreateGroupModal';
import { useAgencyContext } from '../AgencyContext';

function Messages({setSelectedSomeone, setConversation}) {
    const {conversations, setConversations} = useAgencyContext()
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false)
  return <>
  {showCreateGroupModal && <CreateGroupModal setShowCreateGroupModal={setShowCreateGroupModal} />}
    <div className='bg-white flex flex-col gap-3 relative shadow-lg rounded-lg h-full p-6 overflow-y-auto'>
        {conversations.length===0 ? <NoMessages />:
        conversations.map((item, index)=>{
          return <div onClick={()=>{setSelectedSomeone(true); setConversation(item)}} className='w-full h-[30px] flex items-center gap-3 p-2 rounded-lg cursor-pointer h-[70px] bg-gray-200' key={item.id}>
            { item.type==="regular" &&
              item.pfp ? <img className='w-[40px] h-[40px] rounded-full' src={item.pfp} alt={item.name} />:
              <span className='w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center' > 
              <IoPersonOutline />
              </span>
            }
              <div className='flex flex-col'>
                    <span>{item.name}</span>
                    <span className='text-gray-500'>{item.messages[item.messages.length - 1].text.substring(0, 10)}...</span>
                </div>

                <span className='ml-auto text-sm text-gray-500 mb-7'>{new Date(item.messages[item.messages.length-1].timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
          </div>
        })
        }


       {/*<TbMessagePlus onClick={()=>{setShowCreateGroupModal(true)}} className='absolute right-10 bottom-10 text-5xl bg-emerald-700 text-white p-3 rounded-full cursor-pointer'/>*/}
    </div>
  </>
}

export default Messages

function NoMessages(){
    return <div className='flex text-center gap-1 flex-col items-center justify-center w-full h-full'>
        <TbMessageDots className='text-7xl bg-[#2D3FE3]/15 p-3 text-gray-500/50 rounded-[50%]' />
        <h2 className='text-xl font-semibold'>No conversations yet</h2>
        <p className='text-[#6B7280]'>Start Chatting by searching for users or create a group</p>
    </div>
}
