import React from 'react'


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAdminContext } from '../AdminContext'
function DisputesList() {
    const {disputes, setDisputes, isSearchingDisputes, disputesSearchResults, handleAlert, setDisputesSearchResults} = useAdminContext()

    function handleResolve(dispute:any){
        if(dispute.status!="Resolved"){
            if(isSearchingDisputes){
        
                const newDisputesSearchResults = disputesSearchResults.map((dis:any)=>{
            if(dis.disputeId===dispute.disputeId){
                return {...dis, status:"Resolved"}
            }else{
                return dis
            }
        })


                const newDisputes = disputes.map((dis:any)=>{
            if(dis.disputeId===dispute.disputeId){
                return {...dis, status:"Resolved"}
            }else{
                return dis
            }
        })

        setDisputesSearchResults(newDisputesSearchResults)
        setDisputes(newDisputes)
        handleAlert("Dispute Resolved!", "good")
            }else{
                const newDisputes = disputes.map((dis:any)=>{
            if(dis.disputeId===dispute.disputeId){
                return {...dis, status:"Resolved"}
            }else{
                return dis
            }
        })

        setDisputes(newDisputes)
        handleAlert("Dispute Resolved!", "good")
            }
        }else{
            handleAlert("Dispute Already Resolved!", "bad")
        }
    }

    function handleRequestInfo(){
        handleAlert("Requested Info!", "good")
    }
  return (
    <div className='flex flex-col gap-4'>
       { (!isSearchingDisputes && disputes.length!=0)?
        disputes.map((dispute:any, index:number)=>{
            return  <Card key={index}>
            <CardHeader>
                <div className='flex justify-between gap-3'> 
                    <div className='flex flex-col gap-1'>
                        <CardTitle>{dispute.disputeId}</CardTitle>
                        <CardDescription>Order: {dispute.orderId}</CardDescription>
                    </div>
                
                <span className={`${dispute.status==="Resolved"?"bg-emerald-500/30 text-emerald-500":"bg-yellow-500/30 text-orange-500"} flex items-center justify-center p-2 text-sm  rounded-full`}>{dispute.status}</span>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
                <div className='flex flex-col md:flex-row gap-3 flex-wrap'>
                    <Card className='flex-1 shadow-none border-none bg-gray-300/40'>
                        <CardHeader>
                            <CardDescription>Customer</CardDescription>
                            <CardTitle>{dispute.customer}</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className='flex-1 shadow-none border-none bg-gray-300/40'>
                        <CardHeader>
                            <CardDescription>{dispute.store?"Store":"Agency"}</CardDescription>
                            <CardTitle>{dispute.agency?dispute.agency:dispute.store}</CardTitle>
                        </CardHeader>
                    </Card>
                </div>

                <Card className='shadow-none border-orange-500/40 bg-orange-500/10'>
                    <CardHeader>
                        <CardDescription>Reason</CardDescription>
                        <CardTitle>{dispute.reason}</CardTitle>
                    </CardHeader>
                </Card>
            </CardContent>

            <CardFooter className='flex flex-col md:flex-row gap-3 flex-wrap'>
                <button onClick={()=>{handleResolve(dispute)}} className='w-full md:w-[fit-content] cursor-pointer bg-emerald-700 text-white p-3 rounded-lg cursor-pointer'>Resolve in favor of customer</button>
                <button onClick={()=>{handleResolve(dispute)}} className='w-full md:w-[fit-content] cursor-pointer bg-emerald-700 text-white p-3 rounded-lg cursor-pointer'>Resolve in favor of store</button>
                <button onClick={handleRequestInfo} className='w-full md:w-[fit-content] cursor-pointer border-emerald-700 border-[1px] text-emerald-700 p-3 rounded-lg cursor-pointer'>Request more info</button>
            </CardFooter>
        </Card>
        }):
        (isSearchingDisputes && disputesSearchResults.length!=0)?  disputesSearchResults.map((dispute:any, index:number)=>{
            return  <Card key={index}>
            <CardHeader>
                <div className='flex justify-between gap-3'> 
                    <div className='flex flex-col gap-1'>
                        <CardTitle>{dispute.disputeId}</CardTitle>
                        <CardDescription>Order: {dispute.orderId}</CardDescription>
                    </div>
                
                <span className={`${dispute.status==="Resolved"?"bg-emerald-500/30 text-emerald-500":"bg-yellow-500/30 text-orange-500"} flex items-center justify-center p-2 text-sm  rounded-full`}>{dispute.status}</span>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
                <div className='flex flex-col md:flex-row gap-3 flex-wrap'>
                    <Card className='flex-1 shadow-none border-none bg-gray-300/40'>
                        <CardHeader>
                            <CardDescription>Customer</CardDescription>
                            <CardTitle>{dispute.customer}</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className='flex-1 shadow-none border-none bg-gray-300/40'>
                        <CardHeader>
                            <CardDescription>{dispute.store?"Store":"Agency"}</CardDescription>
                            <CardTitle>{dispute.agency?dispute.agency:dispute.store}</CardTitle>
                        </CardHeader>
                    </Card>
                </div>

                <Card className='shadow-none border-orange-500/40 bg-orange-500/10'>
                    <CardHeader>
                        <CardDescription>Reason</CardDescription>
                        <CardTitle>{dispute.reason}</CardTitle>
                    </CardHeader>
                </Card>
            </CardContent>

            <CardFooter className='flex flex-col md:flex-row gap-3 flex-wrap'>
                <button onClick={()=>{handleResolve(dispute)}} className='w-full md:w-[fit-content] cursor-pointer bg-emerald-700 text-white p-3 rounded-lg cursor-pointer'>Resolve in favor of customer</button>
                <button onClick={()=>{handleResolve(dispute)}} className='w-full md:w-[fit-content] cursor-pointer bg-emerald-700 text-white p-3 rounded-lg cursor-pointer'>Resolve in favor of store</button>
                <button onClick={handleRequestInfo} className='w-full md:w-[fit-content] cursor-pointer border-emerald-700 border-[1px] text-emerald-700 p-3 rounded-lg cursor-pointer'>Request more info</button>
            </CardFooter>
        </Card>
        })
        :"No disputes"
       }
    </div>
  ) 
}

export default DisputesList



