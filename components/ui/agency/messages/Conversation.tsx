import React, { useState } from 'react'
import { BsArrowLeft, BsCameraVideo } from 'react-icons/bs'
import { CiCamera } from 'react-icons/ci'
import { FaMicrophone } from 'react-icons/fa'
import { GiPaperClip } from 'react-icons/gi'
import { IoIosMore, IoMdSend } from 'react-icons/io'
import { IoPersonOutline } from 'react-icons/io5'
import { LuPhone } from 'react-icons/lu'
import { TbMessageDots } from 'react-icons/tb'
import { useAgencyContext } from '../AgencyContext'





function Conversation({conversation, setSelectedSomeone, setConversation}:any) {
   const [newText, setNewText] = useState("")
   const {userInfo, setConversations, conversations} = useAgencyContext()
    function handleSendMessage(){
        setNewText("")
        let newConversations
        const newMessage = {text:newText, timestamp: new Date(), sender:userInfo.userName} //create a new message
        //console.log(conversation)
        setConversation((prev:any)=>({
            ...prev,
            messages:[...prev.messages, newMessage ]
        })) //set the conversation state to include the new message

        //check if this conversation is in the conversations array
        const existingConvo = conversations.find((item:any)=>item.userName===conversation.userName)

        if(existingConvo){ //if it exists
            newConversations = conversations.map((item:any)=>{
            if(item.userName===conversation.userName){
                return {...item, messages:[...item.messages, newMessage]} //find the conversation in the array and add the new message
            }else{
                return item 
            }
         })
         setConversations(newConversations)
        }else{ //if not
            setConversations((prev:any)=> ([...prev, {...conversation, messages:[newMessage], type:"regular"}])) //add a new conversation with the new message as the only message
        }
        //console.log(newConversations)
        
    }

  return (
    <div className='bg-white relative shadow-lg rounded-lg h-full p-4 gap-3 flex flex-col'>
        {/* top bar*/}
        <div className='flex items-center gap-3'>
            <BsArrowLeft onClick={()=>{setSelectedSomeone(false)}} className='text-xl cursor-pointer' />
            <div className='flex items-center gap-3 cursor-pointer'>
                 { 
                    conversation.pfp ? <img className='w-[40px] h-[40px] rounded-full' src={conversation.pfp} alt={conversation.name} />:
                    <span className='w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center' > 
                    <IoPersonOutline />
                    </span>
                }
                <div className='flex flex-col'>
                    <span>{conversation.name}</span>
                    {conversation.type==="regular" && <span className='text-gray-500'>{conversation.lastSeen}</span>}
                </div>
            </div>

           {/*} <div className='flex items-center gap-5 ml-auto'>
                <LuPhone className='text-xl cursor-pointer' />
                <BsCameraVideo className='text-xl cursor-pointer' />
                <IoIosMore className='text-xl cursor-pointer' />
            </div>*/}
        </div>

        {/*middle part*/}
        <div className='bg-gray-200 w-full h-[80%] p-4 flex flex-col rounded-lg overflow-y-auto'>
            {
                conversation.messages.length===0 ? <NoMessages /> :
                conversation.messages.map((item: any, index: any)=>{
                    if(item.sender===conversation.userName){
                        return <div key={index} className='mb-2 flex flex-col w-1/2'>
                        <span className='bg-gray-400 text-white p-2 rounded-lg w-full block'>{item.text}</span>
                        <span className='ml-auto text-gray-700 text-sm'>{new Date(item.timestamp).toLocaleString()}</span>
                    </div>
                    }else{
                        return <div key={index} className='mb-2 flex flex-col w-1/2 ml-auto'>
                        <span className='bg-emerald-700 text-white p-2 rounded-lg w-full block'>{item.text}</span>
                        <span className='mr-auto text-gray-700 text-sm'>{new Date(item.timestamp).toLocaleString()}</span>
                    </div>
                    }
                })
            }
        </div>

        {/*bottom part */}
        <div className='w-full h-[60px] flex items-center p-2 gap-3'>
            <GiPaperClip className='text-4xl text-emerald-700 bg-gray-200 p-2 rounded-full cursor-pointer' />
            <CiCamera className='text-4xl text-emerald-700 bg-gray-200 p-2 rounded-full cursor-pointer' />
            <textarea id='messagebox' placeholder='Type a new message...' value={newText} onChange={(e)=>{setNewText(e.target.value)}} className='bg-gray-200 resize-none h-full w-[90%] outline-none border-none p-2' />
            {newText ? <IoMdSend onClick={handleSendMessage} className='cursor-pointer bg-emerald-700 text-white text-3xl p-2 rounded-full' />:<FaMicrophone className='cursor-pointer bg-emerald-700 text-white text-3xl p-2 rounded-full' />}
        </div>
    </div>
  )
}

export default Conversation

function NoMessages(){
    return <div className='flex text-center gap-1 flex-col items-center justify-center w-full h-full'>
        <TbMessageDots className='text-5xl text-gray-500/50 rounded-[50%]' />
        <h2 className='text-xl font-semibold'>No messages yet</h2>
        <p className='text-[#6B7280]'>Start the conversation</p>
    </div>
}
