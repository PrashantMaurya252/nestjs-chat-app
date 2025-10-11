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
    <div className="w-full h-screen flex">
      {/* LEFT SIDEBAR */}
      <div className="w-[30%] h-full border-r-2 flex flex-col">
        <div className="w-full h-[60px] flex justify-around items-center border-b">
          <span
            className={`font-semibold text-lg cursor-pointer ${
              tab === "chats" && "text-blue-600"
            }`}
            onClick={() => setTab("chats")}
          >
            Chats
          </span>
          <span
            className={`font-semibold text-lg cursor-pointer ${
              tab === "groups" && "text-blue-600"
            }`}
            onClick={() => setTab("groups")}
          >
            Groups
          </span>
          <span
            className={`font-semibold text-lg cursor-pointer ${
              tab === "notifications" && "text-blue-600"
            }`}
            onClick={() => setTab("notifications")}
          >
            Notifications
          </span>
        </div>

        <div className="flex-1 overflow-y-auto">
          <UserList
            users={usersList}
            setSelectedChat={setSelectedUser}
            selectedChat={selectedUser}
          />
        </div>
      </div>

      {/* RIGHT CONVERSATION */}
      <div className="w-[70%] h-full flex flex-col">
        {selectedUser ? (
          <Conversations selectedUser={selectedUser} messages={messages} />
        ) : (
          <div className="flex items-center justify-center text-gray-500 w-full h-full">
            Select a chat to start conversation
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatComponent