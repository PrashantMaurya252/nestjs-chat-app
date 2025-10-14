import React, { useState } from "react";
import { Message, User } from "./ChatComponent";

interface ConversationsProps {
  selectedUser: User | null | undefined;
  messages: Message[];
  sendMessage:(text:string)=>void
}

const Conversations = ({ selectedUser, messages,sendMessage }: ConversationsProps): React.ReactElement => {

  const [message,setMessage] = useState("")

  const handleSendMessage = ()=>{
    console.log("Typed Message ",message)
  }

  console.log(message)
  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="w-full h-[60px] bg-blue-500 text-white flex gap-3 items-center pl-4">
        <img
          src={selectedUser?.profilePic}
          alt="Profile Pic"
          className="w-[40px] h-[40px] rounded-full"
        />
        <span className="text-lg font-medium">{selectedUser?.username}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto bg-gray-100">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[60%] p-3 rounded-2xl ${
              msg.senderId === selectedUser?.id
                ? "bg-gray-300 self-start"
                : "bg-blue-500 text-white self-end"
            }`}
          >
            <p className="text-base">{msg.text}</p>
            <p className="text-xs text-right opacity-70">{msg.timestamp}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="w-full h-[60px] flex items-center gap-3 px-3 border-t bg-white">
        <input
          type="text"
          className="flex-1 border border-gray-400 rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
          onChange={(e)=>setMessage(e.target.value)}
          value={message}
        />
        <button className="bg-blue-600 text-white font-semibold rounded-2xl px-4 py-2 cursor-pointer" onClick={()=>{sendMessage(message)
          setMessage('')
        }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Conversations;
