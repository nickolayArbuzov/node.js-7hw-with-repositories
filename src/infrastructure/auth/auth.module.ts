import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTModule } from '../../entities/jwt/jwt.module';
import { UserModule } from '../../entities/users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    JWTModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
    })
  ],
  providers: [
    AuthService, 
  ],
  exports: [JwtModule]
})
export class AuthModule {}
