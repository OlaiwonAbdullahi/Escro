"use client"
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { LuUserRoundSearch } from "react-icons/lu";
import { IoPersonOutline } from 'react-icons/io5';
import { useAdminContext } from '../AdminContext';

function SearchBar({setConversation, setSelectedSomeone}:any) {
  const {users, setUsers, isSearching, setIsSearching, conversations, userInfo} = useAdminContext()
  const [searchResults, setSearchResults] = useState("")

  function handleSearch(value: string){
    if(value){
      setIsSearching(true)
      const newResults = users.filter((item:any)=>{
        return (item.name.toLowerCase().includes(value.toLowerCase()) || item.userName.toLowerCase().includes(value.toLowerCase())) && item.userName != userInfo.userName
      }) //looks for a matching name or username while also automatically removing the currrent user from the search

      if(newResults.length===0){ //if a match cant be found in users, check the conversations
        const newResultsGottenFromConversations = conversations.filter((item:any)=>{
          return item.name.toLowerCase().includes(value.toLowerCase())
        })
        //console.log(newResultsGottenFromConversations)
        setSearchResults(newResultsGottenFromConversations)
        return
      }
      

      setSearchResults(newResults)
    }else{
      setIsSearching(false)
    }
  }

  return (
    <div className='full relative flex flex-col'>
      <div className='w-full cursor-pointer bg-white gap-2 px-6 shadow-lg flex items-center justify-between rounded-lg'>
        <label htmlFor="search"><CiSearch /></label>
        <input placeholder='Search by name or username...' onChange={e=>{handleSearch(e.target.value)}} id='search' type="text" className='border-none outline-none w-full h-[60px]'  />
        <label htmlFor="search"><LuUserRoundSearch /></label>
    </div>
    {isSearching && <SearchResults setConversation={setConversation} setSelectedSomeone={setSelectedSomeone} results={searchResults} />}
    </div>
  )
}

export default SearchBar



function SearchResults({results, setConversation, setSelectedSomeone}:any) {  
  const {setIsSearching, conversations} = useAdminContext()
  function handleSelectConversation(item:any){
    const existingConversation = conversations.find((conv:any)=>conv.id===item.id) //checks if an existing conversation exists
    if(existingConversation){
      setConversation(existingConversation) //sets the conversation to the existing one if it exists
    }else{
      setConversation({...item, messages:[]}) //if not , creates a new conversation object and sets it
    }
}

  return <div className='z-10 absolute top-16 bg-white p-6 shadow-lg w-full h-[200px] flex flex-col gap-2 overflow-y-auto'>
    {results.length!=0 ? results.map((item:any, index:any)=>{
      return <div onClick={()=>{setSelectedSomeone(true); handleSelectConversation(item); setIsSearching(false)}} key={item.id} className='flex cursor-pointer rounded-lg gap-4 items-center bg-gray-500/15 p-3'>
        {
          item.pfp ? <img className='w-[40px] h-[40px] rounded-full' src={item.pfp} alt={item.name} />:
          <span className='w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center' > 
          <IoPersonOutline />
          </span>
        }
        <div className='flex flex-col'>
          <span className='font-semibold'>{item.name}</span>
          <span className='text-[#6B7280]'>{!item.type?`@${item.userName}`:"Group"}</span> 
        </div>
        <button className='ml-auto text-emerald-700 bg-emerald-700/20 p-2 rounded-lg font-bold cursor-pointer'>Message</button>
      </div>
    }):
    <div className='flex flex-col text-center w-full h-full items-center justify-center'>
      <p>No results found</p>
    </div>}
  </div>
}