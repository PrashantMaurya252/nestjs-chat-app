"use client" 
 
 import React, { useEffect, useState } from 'react'
import { users } from '@/data/dummyData'
import UserList from './UserList'
import Conversations from './Conversations'

export interface Message{
    id: string,
    senderId: string,
    receiverId: string,
    text: string,
    timestamp: string,
}

export interface User{
    id: string,
    username: string,
    profilePic: string,
    lastMessage: string,
    lastSeen: string,
    messages:Message[]
}


const ChatComponent = () => {

    const [usersList,setUsersList] = useState<User[]>([])
    const [messages,setMessages] = useState<Message[]>([])
    const [tab,setTab] = useState("chats")
    const [selectedUser,setSelectedUser] = useState<User | null>()


    useEffect(()=>{
        if(tab === "chats" || tab === "groups"){
            setUsersList(users)
        }
    },[tab])

    useEffect(()=>{
        if(selectedUser){
            setMessages(selectedUser.messages)
        }
    },[selectedUser])

    console.log(selectedUser,messages)
  return (
    <div className='w-full min-h-full flex '>
        <div className='w-[30%] h-full  border-r-2 '>
            <div className='w-full h-[60px] flex justify-around items-center'>
                <span className='font-semibold text-lg cursor-pointer' onClick={()=>setTab("chats")}>Chats</span>
                <span className='font-semibold text-lg cursor-pointer' onClick={()=>setTab("groups")}>Groups</span>
                <span className='font-semibold text-lg cursor-pointer' onClick={()=>setTab("notifications")}>Notifications</span>
            </div>
            <div className='w-full h-full'>
                <UserList users={usersList} setSelectedChat={setSelectedUser} selectedChat={selectedUser}/>
            </div>
        </div>
        <div className='w-[70%] h-full '>
            {selectedUser && <Conversations selectedUser={selectedUser} messages={messages}/>}
            
        </div>
    </div>
  )
}

export default ChatComponent