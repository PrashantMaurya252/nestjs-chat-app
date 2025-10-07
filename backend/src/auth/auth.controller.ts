import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import { loginDto } from './dto/loginUser.dto';
import { type Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService,private readonly userService:UserService){}
    @Post('register')
    async register(@Body() registerUserDto:RegisterDto){

        const user = await this.authService.registerUser(registerUserDto)

        return user
    }

    @Post('login')
    async login(@Body() loginUserDto:loginDto,@Res() res:Response){
        const {user,token} = await this.authService.loginUser(loginUserDto)
        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge:1000*60*60*24
        })
        return res.status(200).json({user,token})
    }
}
