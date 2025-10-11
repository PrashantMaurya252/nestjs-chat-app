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
}
