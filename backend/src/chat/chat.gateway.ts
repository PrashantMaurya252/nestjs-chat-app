import {WebSocketGateway,WebSocketServer,SubscribeMessage,OnGatewayConnection,OnGatewayDisconnect,MessageBody,ConnectedSocket} from '@nestjs/websockets'
import { Socket,Server } from 'socket.io'

@WebSocketGateway({
    cors:{origin:process.env.FRONTEND_URL as string,credenials:true},
})

export class ChatGateWay implements OnGatewayConnection,OnGatewayDisconnect{
    @WebSocketServer() server:Server;
    private onlineUsers = new Map<string,string>()

     handleConnection(socket:Socket){
        console.log("Socket Id",socket.id)
    }

    handleDisconnect(socket:Socket) {
        for(const [userId,sid] of this.onlineUsers.entries()){
            if(sid === socket.id)  this.onlineUsers.delete(userId)
        }
    this.server.emit('online-users',Array.from(this.onlineUsers.keys()))
    console.log("User disconnected",socket.id)
    }

    @SubscribeMessage('join')
    handleJoin(@MessageBody() userId:string,@ConnectedSocket() socket:Socket){
        this.onlineUsers.set(userId,socket.id)
        this.server.emit('online-users',Array.from(this.onlineUsers.keys()))
    }

    @SubscribeMessage('send-message')
    handleSendMessage(
        @MessageBody() data:{conversationId:string;senderId:string;receiversId:string[];text:string},
    ){}
}