import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatGateWay } from './chat.gateway';

@Module({
  imports:[PrismaModule],
  providers: [ChatService,ChatGateWay,ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
