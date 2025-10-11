import React from 'react'
import { User } from './ChatComponent'


interface UserListProps{
    users:User[],
    selectedChat:User | null | undefined,
    setSelectedChat: React.Dispatch<React.SetStateAction<User | null | undefined>>;
}
const UserList = ({users,selectedChat,setSelectedChat}:UserListProps):React.ReactElement => {
  console.log(users)
  return (
    <div className='w-full h-full'>
      <div className='w-full p-2 flex flex-col'>
        {users?.map((item,index)=>(
          <div key={item.id} className='w-full flex  items-center gap-2 h-[80px] p-2 hover:border-2 hover:rounded-2xl hover:cursor-pointer border-b-2 my-1' onClick={()=>setSelectedChat(item)}>
            <div className='w-[70px] h-[70px] rounded-full'>
              <img className='w-full h-full rounded-full' src={item.profilePic}/>
            </div>
            <div className='h-full flex flex-col w-full'>
              <h1 className='font-semibold'>{item.username}</h1>
              <p>{item.lastMessage}</p>
              <p className='self-end text-sm font-semibold '>Last Seen : {item.lastSeen}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList