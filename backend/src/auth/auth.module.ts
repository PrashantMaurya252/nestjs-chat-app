import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[ConfigModule.forRoot(), UserModule,JwtModule.register({
    global:true,
    secret:process.env.JWT_SECRET,
    signOptions:{expiresIn:'3600s'}
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
