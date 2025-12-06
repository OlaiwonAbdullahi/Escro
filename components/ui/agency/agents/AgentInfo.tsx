import React from 'react'


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useAgencyContext } from '../AgencyContext';


function AgentInfo() {
    const {setShowAgentInfo, selectedAgent} = useAgencyContext();
  return (
    <div className='fixed backdrop-blur-[20px] z-10 inset-0 flex items-center justify-center p-4'>
        <Card className='w-full md:w-[50vw]'>
            <CardHeader>
                <CardTitle>Agent Information</CardTitle>
                <CardDescription>Details about {selectedAgent.name}</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col items-center'>
                {/* Agent details go here */}
                {selectedAgent.pfp?<img src={selectedAgent.pfp} alt={selectedAgent.name} className="w-20 h-20 rounded-full mb-4 object-cover"/>:
                <span className='w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500 mb-4'>{selectedAgent.name.charAt(0).toUpperCase()}</span>
                }
                <p>Agent Name: {selectedAgent.name}</p>
                <p>Email: {selectedAgent.email}</p>
            </CardContent>
            <CardFooter className='flex flex-col md:flex-row gap-3'>
                <button onClick={() => setShowAgentInfo(false)} className='border border-emerald-700 text-emerald-700 w-full p-3 rounded-lg cursor-pointer'>Close</button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default AgentInfo