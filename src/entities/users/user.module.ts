import {ConfigModule} from '@nestjs/config'
import config from '../../configuration/config.configuration';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserMailIsExistRule, UserLoginIsExistRule, UserCodeIsConfirmedRule, UserMailCheckRule } from './customValidateUser';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserRepositoryTypeORM } from './user.repositoryTypeORM';
import { UserService } from './user.service';
import { UserRepositoryMongo } from './user.repositoryMongo';

@Module({
  controllers: [UserController],
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env', 
      isGlobal: true,
      load: [config],
    }),
  ],
  providers: [
    ...userProviders,
    UserService,
    UserMailIsExistRule,
    UserLoginIsExistRule,
    UserCodeIsConfirmedRule,
    UserMailCheckRule,
    UserRepositoryTypeORM,
    {
      provide: 'Repository',
      useClass: process.env.REPOSITORY === 'mongo' ? UserRepositoryMongo : UserRepositoryTypeORM,
    },
  ],
  exports: [
    userProviders.find(p => p.provide === 'USER_REPOSITORY'), 
    userProviders.find(v => v.provide === 'USER_MONGOOSE'),
  ],
})
export class UserModule {}