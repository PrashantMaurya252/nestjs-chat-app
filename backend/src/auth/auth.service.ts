import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import { loginDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService,private readonly jwtService:JwtService){}
    async registerUser(registerUserDto:RegisterDto){

        const user = await this.userService.registerUser(registerUserDto)

        return user
    }

    async loginUser(loginUserDto:loginDto){

        const user = await this.userService.loginUser(loginUserDto)

        const payload = {sub:user.id,email:user.email,username:user.username}
        const token = await this.jwtService.signAsync(payload)

        return {user,token}

    }
}
