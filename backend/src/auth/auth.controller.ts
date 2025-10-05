import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService,private readonly userService:UserService){}
    @Post('register')
    async register(@Body() registerUserDto:RegisterDto){

        const user = await this.authService.registerUser(registerUserDto)

        return user
    }
}
