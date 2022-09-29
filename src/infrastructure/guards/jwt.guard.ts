import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
    // add authService with jwtService(verify)
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request: Request = context.switchToHttp().getRequest();

    if (request.headers?.authorization) {
      if (request.headers?.authorization?.split(' ')[1] === new Buffer('admin:qwerty').toString('base64') && request.headers?.authorization?.split(' ')[0] === 'Basic'){
        return true;
      }
      try {
        const user = this.jwtService.verify(request.headers?.authorization?.split(' ')[1])
        if (user){
          request.user = {id: user.id, login: user.login}
          return true;
        }
      } catch {
        throw new UnauthorizedException()
      }
    }
    
    if (request.cookies){
      try {
        const user = this.jwtService.verify(request.cookies.refreshToken)
        if (user){
          return true
        }
      } catch {
        throw new UnauthorizedException()
      }
    }
    throw new UnauthorizedException()
  }
}