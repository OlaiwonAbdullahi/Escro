"use client"
import React, { useState } from 'react'
import Navigation from '../settings/Navigation'
/*import GeneralSettings from '../settings/GeneralSettings';
import DangerZone from '../settings/DangerZone';*/
import Emergency from '../settings/Emergency';
import SettingsTop from '../settings/SettingsTop';
import Options from '../settings/Options';

function Settings() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className='flex flex-col gap-5 p-6 font-mont bg-gray-100 h-[calc(100vh-100px)] overflow-y-auto'>
        <div>
            <h1 className='text-4xl font-semibold font-noto text-black'>Settings</h1>
            <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, soluta?</p>
        </div>
       {/*} <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />*/}
        <SettingsTop />
        <Options />
        {/*
          activeTab === 0 && <Emergency />
        */}
    </div>
  )
}

export default Settings