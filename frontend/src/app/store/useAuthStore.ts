import {create} from'zustand'
import { persist } from 'zustand/middleware'

interface AuthState{
    user :{username:string,email:string} | null,
    token :string | null
    setUser:(user:{username:string,email:string},token:string)=>void
    logout:()=>void
}

export const useAuthStore = create(persist<AuthState>((set)=>({
    user:null,
    token:null,
    setUser:(user,token)=>set(()=>({user,token})),
    logout:()=>set(()=>({user:null,token:null}))
}),{name:"auth-storage"}))