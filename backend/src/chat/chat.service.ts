import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {createConversationDTO} from './dto/createConversations.dto'

@Injectable()
export class ChatService {
    constructor(private prisma:PrismaService){}

    async createConversation(createConversation:createConversationDTO){
        return this.prisma.conversation.create({
            data:{
                name:createConversation.name,
                isGroup:createConversation.isGroup,
                groupAdmin:createConversation.groupAdmin,
                participants:{
                    create:createConversation?.userIds?.map((uid)=>({
                        user:{connect:{id:uid}}
                    }))
                }
            },
            include:{participants:{include:{user:true}}}
        })
    }

    async saveMessage(conversationId:string,senderId:string,text:string){
        if(!conversationId){

        }
        const message= await this.prisma.message.create({
            data:{conversationId,senderId,text},
            include:{sender:true}
        })

        return message
    }

    async getMessage(conversationId:string){
        return await this.prisma.message.findMany({
            where:{conversationId},
            orderBy:{createdAt:'asc'},
            include:{sender:true}
        })
    }

    async getUserConversations(userId:string){
        return await this.prisma.conversation.findMany({
            where:{
                participants:{some:{userId}},
            },
            include:{
                participants:{include:{user:true}},
                messages:{take:1,orderBy:{createdAt:'desc'}},
            }
        })
    }

    async updateUserStatus(userId:string,isOnline:boolean){
        await this.prisma.user.update({
            where:{id:userId},
            data:{isOnline,lastSeen:new Date()}
        })
    }

    async markMessageAsRead(conversationId:string,userId:string){
        await this.prisma.message.updateMany({
            where:{conversationId,NOT:{readBy:{has:userId}}},
            data:{readBy:{push:userId}}
        })
    }

    async sendMessage(
  senderId: string,
  receiverId: string,
  text: string,
  isGroup: boolean
) {
  // Step 1: Find an existing one-on-one conversation
  console.log("senderId",senderId,"receiverId",receiverId,"text",text,"isGroup",isGroup)
  let conversation = await this.prisma.conversation.findFirst({
    where: {
      isGroup: false,
      participants: {
        every: {
          userId: {
            in: [senderId, receiverId]
          }
        },
        // Ensure exactly 2 participants
        // Prisma doesn't support exact count in relation filter, so we'll check manually
      }
    },
    include: {
      participants: true,
      messages: true
    }
  });

  // Step 2: If conversation doesn't exist, create it
  if (!conversation) {
    conversation = await this.prisma.conversation.create({
      data: {
        isGroup: false,
        participants: {
          create: [
            { userId: senderId },
            { userId: receiverId }
          ]
        },
      },
      include: {
        participants: true,
        messages: true
      }
    });
  }

  // Step 3: Create the message
  const message = await this.prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderId,
      text,
    }
  });

  return message;
}

}
