"use client"
import React, { useState } from 'react'
import SearchBar from './SearchBar'
import { CiSearch } from "react-icons/ci";
import Messages from './Messages';
import Conversation from './Conversation';

function Messaging() {
  const [selectedSomeone, setSelectedSomeone] = useState(false)
  const [conversation, setConversation] = useState({})
  return (
    <div className='w-full flex flex-col gap-3 h-full'>
        {
            !selectedSomeone && <SearchBar setConversation={setConversation} setSelectedSomeone={setSelectedSomeone} /> 
        }
       {
        selectedSomeone ? <Conversation setConversation={setConversation} conversation={conversation} setSelectedSomeone={setSelectedSomeone} /> : <Messages setSelectedSomeone={setSelectedSomeone} setConversation={setConversation} />
       }
    </div>
  )
}

export default Messaging