import React from 'react'
import Messaging from '../messages/Messaging'

function Messages() {
  return (
    <div className='flex flex-col gap-5 p-6 font-mont bg-gray-100 h-[calc(100vh-100px)] overflow-y-auto'>
       {/*} <div>
            <h1 className='text-4xl font-semibold font-noto text-black'>Messages</h1>
            <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, soluta?</p>
        </div>*/}
        <Messaging />
    </div>
  )
}

export default Messages