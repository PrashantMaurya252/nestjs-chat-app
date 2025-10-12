import { Injectable,OnModuleDestroy,OnModuleInit } from '@nestjs/common';
import {PrismaClient} from '../../generated/prisma/index'


const prisma = new PrismaClient()

// prisma.$use(async(params,next)=>{
//     const result = await next(params)

//     if(params.model === 'User'){
//         if(Array.isArray(result)){
//             return result.map(({password,...rest })=>rest)
//         }else if(result && typeof result === 'object'){
//             const {password,...rest} = result
//             return rest
//         }
//     }
//     return result
// })

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit,OnModuleDestroy {
    async onModuleInit() {
        await this.$connect()
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }
}
