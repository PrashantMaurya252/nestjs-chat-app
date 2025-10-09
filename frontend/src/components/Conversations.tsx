import React from 'react'
import { Message, User } from './ChatComponent'

interface ConversationsProps{
  selectedUser:User | null | undefined
  messages:Message[]
}
const Conversations = ({selectedUser,messages}:ConversationsProps):React.ReactElement => {
  return (
    <div className='w-full h-full'>
      <div className='w-full h-[50px] bg-blue-400 text-white flex gap-2 items-center pl-4'>
        <img src={selectedUser?.profilePic} alt='Profile Pic' className='w-[40px] h-[40px] rounded-full'/>
        <span>{selectedUser?.username}</span>
      </div>
      <div className='w-full'>
        <div className='w-full flex flex-col'>
          {messages?.map((item,index)=>{})}
        </div>
      </div>
    </div>
  )
}

export default Conversations