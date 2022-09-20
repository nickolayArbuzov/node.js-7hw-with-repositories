import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserMailIsExistRule, UserLoginIsExistRule, UserCodeIsConfirmedRule, UserMailCheckRule } from './customValidateUser';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserRepositoryTypeORM } from './user.repositoryTypeORM';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule],
  providers: [
    ...userProviders,
    UserService,
    UserMailIsExistRule,
    UserLoginIsExistRule,
    UserCodeIsConfirmedRule,
    UserMailCheckRule,
    UserRepositoryTypeORM,
  ],
  exports: [userProviders.find(p => p.provide === 'USER_REPOSITORY')],
})
export class UserModule {}