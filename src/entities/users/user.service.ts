import { Inject, Injectable } from '@nestjs/common';
import { QueryUserDto } from '../../helpers/commonDTO/query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserRepositoryInterface } from './interface/repoInterface';
import { UserRepositoryTypeORM } from './user.repositoryTypeORM';

@Injectable()
export class UserService {
  constructor(
    @Inject('Repository')
    private userRepository: IUserRepositoryInterface,
  ) {}

  async findAllt () {
    return this.userRepository.findAllt()
  }

  async findAll(query: QueryUserDto) {
    return this.userRepository.findAll(query)
  }

  async findOneForCustomDecoratorByLogin(login: string) {
    return this.userRepository.findOneForCustomDecoratorByLogin(login)
  }

  async findOneForCustomDecoratorByEmail(email: string) {
    return this.userRepository.findOneForCustomDecoratorByEmail(email)
  }

  async findOneForCustomDecoratorByCode(code: string) {
    return this.userRepository.findOneForCustomDecoratorByCode(code)
  }

  async findOneForCustomDecoratorCheckMail(email: string) {
    return this.userRepository.findOneForCustomDecoratorCheckMail(email)
  }

  async createUser(dto: CreateUserDto) {
    return this.userRepository.createUser(dto)
  }

  async deleteUser(id: string){
    return this.userRepository.deleteUser(id)
  }
}