"use client"

import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function Services() {
  return (
    <Card className='min-w-[200px] w-[45%]'>
        <CardHeader>
            <CardTitle>Services Offered</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-3 max-h-[430px] overflow-y-auto'>
            <Service name='Website Development' duration='4-6 weeks' price='$5000' />
            <Service name='App Development' duration='4-6 weeks' price='$50000' />
            <Service name='Smart Contract Development' duration='4-6 weeks' price='$150000' />
        </CardContent>
        <CardFooter>
            <button className='bg-emerald-700 text-white w-full p-3 rounded-lg cursor-pointer'>Add New Service</button>
        </CardFooter>
    </Card>
  )
}

export default Services

interface ServiceProps{
    name: string
    duration: string
    price: string
}

function Service({name, duration, price}: ServiceProps){
    return (
        <Card className='shadow-none'>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription className='flex items-center justify-between gap-3'>
                    <span>Starting at</span>
                    <span>{price}</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <span>Duration: {duration}</span>
            </CardContent>
        </Card>
    )
}