import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { createConversationDTO } from './dto/createConversations.dto';

@Controller('chat')
export class ChatController {
    constructor(private chatService:ChatService){}

    @Post('/create')
    async createConversation(@Body() body:createConversationDTO){
        return this.chatService.createConversation(body)
    }

    @Post('send')
    async sendMessage(@Body() body:{conversationId:string,senderId:string,text:string}){
        return this.chatService.saveMessage(body.conversationId,body.senderId,body.text)
    }

    @Get('messages/:id')
    async getMessages(@Param('id') id:string){
        return this.chatService.getMessage(id)
    }

    @Get('conversations/:userId')
    async getUserConversations(@Param('userId') userId:string){
        return this.chatService.getUserConversations(userId)
    }

    @Post('mark-read')
    async markMessagesAsRead(@Body() body:{conversationId:string,userId:string}){
        await this.chatService.markMessageAsRead(body.conversationId,body.userId)
        return {success:true}
    }

    @Get('/private-conversations/:userId1/:userId2')
    async getAllMessages(@Param('userId1') userId1:string,@Param('userId2') userId2:string){
        return this.chatService.findConversationBetweenTwo(userId1,userId2)
    }
}
