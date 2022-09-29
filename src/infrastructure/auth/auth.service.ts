import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../../entities/users/user.entity';
import { JWT } from '../../entities/jwt/jwt.entity';
import { Repository } from 'typeorm';
import { AuthDto, RegistrationConfirmationDto, RegistrationDto, RegistrationEmailResendingDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import {v4} from 'uuid';
import { sendEmail } from './mail.adapter';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('JWT_REPOSITORY')
    private readonly jwtRepository: Repository<JWT>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const auth: User = await this.userRepository.findOne({where: {login: dto.login, password: dto.password}})
    if (auth) {
      const payload = {id: auth.id, login: auth.login}
      const accessToken = this.jwtService.sign(payload, {expiresIn: '10s'})
      const refreshToken = this.jwtService.sign(v4(), {expiresIn: '20s'})
      await this.jwtRepository.insert({userId: auth.id, refreshToken: refreshToken, revoke: false})
      return {
        accessToken,
        refreshToken
      }
    } 
    else {
      throw new HttpException('Auth not found', HttpStatus.UNAUTHORIZED);
    }
  }

  async registration(dto: RegistrationDto) {
    const newUser = new User()
    newUser.login = dto.login
    newUser.password = dto.password
    newUser.email = dto.email
    newUser.isActivated = false
    newUser.code = v4()
    let date = new Date
    newUser.createdAt = date.toISOString()
    await this.userRepository.insert(newUser)
    sendEmail(dto.email, newUser.code)
  }

  async registrationConfirmation(dto: RegistrationConfirmationDto) {
    const user: User = await this.userRepository.findOne({where: {code: dto.code}})
    if(user && user.isActivated === false) {
      const updateUser = {
        ...user,
        isActivated: true,
      }
      await this.userRepository.update(user.id, updateUser)
    } else {
      throw new HttpException('Code not correct', HttpStatus.NOT_FOUND)
    }
  }

  async registrationEmailResending(dto: RegistrationEmailResendingDto) {
    const user: User = await this.userRepository.findOne({where: {email: dto.email}})
    if(user && user.isActivated === false) {
      const updateUser = {
        ...user,
        code: v4(),
      }
      await this.userRepository.update(user.id, updateUser)
      sendEmail(dto.email, updateUser.code)
    }
  }

  async refreshTokens() {
    /*const refresh = await this.refreshTokensRepo.findByToken(refreshToken)
    if(!refresh) {
      throw new ForbiddenException()
    }

    const user = this.userRepository.findOne({
      where: {
        id: refresh.userId
      }
    })

    if(!user) {
      throw new ForbiddenException()
    }

    const payload = {id: user.id, login: Uuserser.login}
      const accessToken = this.jwtService.sign(payload)
      const newRefreshToken = "Some random string" //uuidv4()

    a*/
  }

  async logout() {

  }

  async authMe() {

  }
  
}