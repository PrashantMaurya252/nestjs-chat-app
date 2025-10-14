"use client";

import React, { useEffect, useState } from "react";
import { users } from "@/data/dummyData";
import UserList from "./UserList";
import Conversations from "./Conversations";
import { useAuthStore } from "@/app/store/useAuthStore";
import { socket } from "@/utils/socketConnection";
import axios from "axios";

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
}

export interface User {
  id: string;
  username: string;
  profilePic: string;
  lastMessage: string;
  lastSeen: string;
  messages: Message[];
}

const ChatComponent = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [tab, setTab] = useState("chats");
  const [selectedUser, setSelectedUser] = useState<User | null>();
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const { user } = useAuthStore();
  console.log("current user", user);

  // useEffect(() => {
  //   if (!user?.userId) return;

  //   // Connect once
  //   socket.connect();
  //   socket.emit("join", user.userId);

  //   // Event listeners
  //   // socket.on("online-users", setOnlineUsers);
  //   socket.on("receive-message", (msg) => {
  //     setMessages((prev) => {
  //       if (msg.conversationId === selectedUser?.id) {
  //         return [...prev, msg];
  //       }
  //       return prev;
  //     });
  //   });

  //   // socket.on("user-typing", ({ senderId }) => {
  //   //   setTypingUser(senderId);
  //   //   setTimeout(() => setTypingUser(null), 2000);
  //   // });

  //   // socket.on("messages-read", ({ conversationId, readerId }) => {
  //   //   console.log(`Conversation ${conversationId} read by ${readerId}`);
  //   // });

  //   return () => {
  //     socket.disconnect(); // Cleanup only when user changes or logs out
  //   };
  // }, [user?.userId]);

  useEffect(() => {

    if (tab === "chats" || tab === "groups") {
       if (user?.userId){
        const fetchUsers = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/user/all-users/${user?.userId}`
          );
          console.log(res.data);
          setUsersList(res.data);
        } catch (err) {
          console.error("Failed to fetch users:", err);
        }
      };

      fetchUsers();
       }
      
    }
  }, [tab]);

  useEffect(() => {
    if (selectedUser) {
      setMessages(selectedUser.messages);
    }
  }, [selectedUser]);

  const sendMessage = (text:string) => {
  if (!selectedUser) return;
  // const msg = {
  //   conversationId: selectedUser.id,
  //   senderId: user?.userId,
  //   receiverIds: [selectedUser.id], // single user test
  //   text: "Hello from frontend test!"
  // };

  const msg={
    senderId:user?.userId,
    receiverId:selectedUser.id,
    text:text,
    isGroup:false
  }
  socket.emit("send-message-testing", msg);
};

  console.log(selectedUser, messages);
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
          <Conversations selectedUser={selectedUser} messages={messages} sendMessage={sendMessage}/>
        ) : (
          <div className="flex items-center justify-center text-gray-500 w-full h-full">
            Select a chat to start conversation
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
