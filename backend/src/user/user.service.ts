import { ConflictException, Injectable,NotFoundException,UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { loginDto } from 'src/auth/dto/loginUser.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma:PrismaService){}

    async registerUser(registerUserDto:RegisterDto){

        // checking for existing email

        const isEmailExist = await this.prisma.user.findFirst({
            where:{
                email:registerUserDto.email
            }
        })

        if(isEmailExist){
            throw new ConflictException("Email already exist ")
        }

        const hashedPassword = await bcrypt.hash(registerUserDto.password,10);

        const newUser = await this.prisma.user.create({
            data:{
                username:registerUserDto.username,
                email:registerUserDto.email,
                password:hashedPassword,
                profilePic:registerUserDto.profilePic || ''
            }
            
        })

        const {password,...newUserWithoutPassword} = newUser
        return newUserWithoutPassword
    }

    async loginUser(loginUserDto:loginDto){
        const user = await this.prisma.user.findFirst({where:{email:loginUserDto.email}})
        if(!user){
            throw new UnauthorizedException("Provided Credentials are wrong")
        }

        const passwordMatch = await bcrypt.compare(loginUserDto.password,user.password)

        if(!passwordMatch){
            throw new UnauthorizedException("Provided Credentials are wrong")
        }

        const {password,...userWithoutPassword} = user


        return userWithoutPassword
    }
}
