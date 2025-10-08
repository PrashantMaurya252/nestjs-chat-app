import React, { useEffect, useState } from 'react'
import { users } from '@/data/dummyData'



interface User{
    id: string,
    username: string,
    profilePic: string,
    lastMessage: string,
    lastSeen: string
}

interface Message{
    id: string,
    senderId: string,
    receiverId: string,
    text: string,
    timestamp: string,
}
const ChatComponent = () => {

    const [users,setUsers] = useState<User[]>([])
    const [messages,setMessages] = useState<Message[]>([])
    const [tab,setTab] = useState("chats")
    const [selectedUser,setSelectedUser] = useState<string>("")


    useEffect(()=>{
        if(tab === "chats" || tab === "groups"){
            setUsers(users)
        }
    },[tab])

    // useEffect(()=>{
    //     if(selectedUser){
    //         const filteredMessages
    //     }
    // },[selectedUser])
  return (
    <div className='w-full min-h-full flex '>
        <div className='w-[40%] h-full  border-r-2 '>
            <div className='w-full h-[60px] flex justify-around items-center'>
                <span className='font-semibold text-lg cursor-pointer' onClick={()=>setTab("chats")}>Chats</span>
                <span className='font-semibold text-lg cursor-pointer' onClick={()=>setTab("groups")}>Groups</span>
                <span className='font-semibold text-lg cursor-pointer' onClick={()=>setTab("notifications")}>Notifications</span>
            </div>
            <div className='w-full h-full'></div>
        </div>
        <div className='w-[60%] h-full '></div>
    </div>
  )
}

export default ChatComponent