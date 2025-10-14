import {WebSocketGateway,WebSocketServer,SubscribeMessage,OnGatewayConnection,OnGatewayDisconnect,MessageBody,ConnectedSocket} from '@nestjs/websockets'
import { Socket,Server } from 'socket.io'
import { ChatService } from './chat.service';

@WebSocketGateway({
    cors:{origin:process.env.FRONTEND_URL as string,credentials:true},
})

export class ChatGateWay implements OnGatewayConnection,OnGatewayDisconnect{
    @WebSocketServer() server:Server;
    private onlineUsers = new Map<string,string>()

    constructor(private readonly chatService:ChatService){}

     handleConnection(socket:Socket){
        console.log("Socket Id",socket.id)
    }

    async handleDisconnect(socket:Socket) {
        for(const [userId,sid] of this.onlineUsers.entries()){
            if(sid === socket.id){
                this.onlineUsers.delete(userId)
                await this.chatService.updateUserStatus(userId,false)
            }
        }
    this.server.emit('online-users',Array.from(this.onlineUsers.keys()))
    console.log("User disconnected",socket.id)
    }

    @SubscribeMessage('join')
    async handleJoin(@MessageBody() userId:string,@ConnectedSocket() socket:Socket){
        console.log("userId in handleJoin",userId,"socket",socket)
        this.onlineUsers.set(userId,socket.id)
        this.server.emit('online-users',Array.from(this.onlineUsers.keys()))
        // await this.chatService.updateUserStatus(userId,true)
    }

    @SubscribeMessage('send-message')
    async handleSendMessage(
        @MessageBody() data:{conversationId:string;senderId:string;receiverIds:string[];text:string},
    ){
        const {conversationId,senderId,receiverIds,text} = data

        const message = await this.chatService.saveMessage(conversationId,senderId,text)

        receiverIds?.forEach((rid)=>{
            const socketId=this.onlineUsers.get(rid)
            if(socketId){
                this.server.to(socketId).emit('receive-message',message)
            }
        })
    }

    @SubscribeMessage('send-message-testing')
    async handleSendMessageTesting(
        @MessageBody() data:{senderId:string;receiverId:string;text:string,isGroup:boolean},
    ){
        const {receiverId,senderId,isGroup,text} = data

        const message = await this.chatService.sendMessage(senderId,receiverId,text,isGroup)

        // receiverIds?.forEach((rid)=>{
        //     const socketId=this.onlineUsers.get(rid)
        //     if(socketId){
        //         this.server.to(socketId).emit('receive-message',message)
        //     }
        // })

        if(receiverId){
            const socketId = this.onlineUsers.get(receiverId)
            if(socketId){
                this.server.to(socketId).emit('receive-message',message)
            }
        }
    }

    // @SubscribeMessage('typing')
    // handleTyping(@MessageBody() data:{conversationId:string,senderId:string,receiverIds:string[]},){
    //     const {conversationId,senderId,receiverIds} = data;
    //     receiverIds?.forEach((rid)=>{
    //         const socketId = this.onlineUsers.get(rid)
    //         if(socketId){
    //             this.server.to(socketId).emit('typing',{conversationId,senderId})
    //         }
    //     })
    // }

    // @SubscribeMessage('mark-read')
    // async handleMarkAsRead(@MessageBody() data:{conversationId:string,userId:string,receiverIds:string[]}){
    //     await this.chatService.markMessageAsRead(data.conversationId,data.userId)


    //     data.receiverIds.forEach((rid)=>{
    //         const socketId = this.onlineUsers.get(rid)

    //         if(socketId){
    //             this.server.to(socketId).emit('messages-read',{
    //                 conversationId:data.conversationId,
    //                 readerId:data.userId
    //             })
    //         }
    //     })
    // }

    
}