import {ConfigModule} from '@nestjs/config'
import config from '../../configuration/config.configuration';
import { Module } from '@nestjs/common';
import { AuthModule } from '../../infrastructure/auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { CommentController } from './comment.controller';
import { commentProviders } from './comment.providers';
import { CommentRepositoryTypeORM } from './comment.repositoryTypeORM';
import { CommentService } from './comment.service';
import { CommentRepositoryMongo } from './comment.repositoryMongo';

@Module({
  controllers: [CommentController],
  imports: [DatabaseModule, AuthModule],
  providers: [
    ...commentProviders,
    CommentService,
    {
      provide: 'Repository',
      useClass: process.env.REPOSITORY === 'mongo' ? CommentRepositoryMongo : CommentRepositoryTypeORM,
    },
  ],
  exports: [
    CommentService, 
    commentProviders.find(b => b.provide==='COMMENT_REPOSITORY'),
    commentProviders.find(v => v.provide === 'COMMENT_MONGOOSE'),
  ]
})
export class CommentModule {}