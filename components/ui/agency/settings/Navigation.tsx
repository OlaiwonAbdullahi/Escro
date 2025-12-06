import { IconBuilding } from '@tabler/icons-react';
import React, { useState } from 'react'
import { TbCancel } from 'react-icons/tb';

interface NavigationProps { 
    activeTab?: number
    setActiveTab?: any
}

function Navigation({activeTab, setActiveTab}: NavigationProps) {
    const tabs = [
        {   
            id: 0, label:"General", icon: IconBuilding,
        },
        {   
            id: 1, label:"Danger Zone", icon: TbCancel,

        }
    ]
  return (
    <div className="bg-white w-[fit-content] border border-emerald-500/30 rounded-lg p-1.5 inline-flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex cursor-pointer items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
  )
}

export default Navigation