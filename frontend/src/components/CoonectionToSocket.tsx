'use client'

import { socket } from '@/utils/socketConnection';
import React, { useEffect } from 'react'

const CoonectionToSocket = () => {

//     useEffect(() => {
//   socket.emit('join', currentUser.id);

//   socket.on('online-users', setOnlineUsers);
//   socket.on('receive-message', (msg) => setMessages((prev) => [...prev, msg]));
//   socket.on('user-typing', ({ senderId }) => showTyping(senderId));

//   return () => {
//     socket.disconnect();
//   };
// }, []);
  return (
    <div>CoonectionToSocket</div>
  )
}

export default CoonectionToSocket