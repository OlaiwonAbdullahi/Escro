"use client"
import React from 'react'
import { useAgencyContext } from './AgencyContext'
import {motion} from "framer-motion"
import { alertAnimation, menuAnimation, others } from './Animations'


function AlertModal() {
    const {alertInfo} = useAgencyContext()
  return (
    <motion.div
    initial={alertAnimation.initial}
    animate={alertAnimation.animate}
    exit={alertAnimation.initial}
    transition={{...others.transition, ease:"backInOut"}}
    className={`fixed top-30 z-200 text-white right-10 p-4 rounded-lg ${alertInfo.type==="bad"?"bg-red-700":"bg-emerald-700"}`}>
        <p>{alertInfo.title}</p>
    </motion.div>
  )
}

export default AlertModal