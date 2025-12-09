import React from 'react'


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Dot } from 'lucide-react'
function FloatingCard() {
  return (
    <Card className='fixed w-[80vw] z-20 max-h-[400px] md:w-[300px] top-16 right-3 md:right-25'>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Recent notifications</CardDescription>
        </CardHeader>
        <CardContent className='p-2 notis  mt-[-15px] h-full overflow-y-auto flex flex-col gap-2'>
          <Notification notis="New project assigned to you" time="2 hours ago" viewed={false}/>
          <Notification notis="Meeting scheduled with client" time="1 day ago" viewed={true}/>
          <Notification notis="Invoice #12345 paid" time="3 days ago" viewed={true}/>
         {/*} <p>No new notifications</p>*/}
        </CardContent>
    </Card>
  )
}

export default FloatingCard


interface NotificationProps{
  notis: string
  time: string
  viewed: boolean
}
function Notification({notis, time, viewed}: NotificationProps){
  return <Card className={`shadow-none relative ${!viewed?"bg-gray-100/80":""}`}>
    {
      !viewed && <Dot className='absolute text-sm top-[-13px] right-[-5px] text-red-600' strokeWidth={10} />
    }
    <CardHeader>
      <CardTitle className='text-sm'>{notis}</CardTitle>
      <CardDescription>{time}</CardDescription>
    </CardHeader>
  </Card>
}