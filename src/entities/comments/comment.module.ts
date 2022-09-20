import { Module } from '@nestjs/common';
import { AuthModule } from '../../infrastructure/auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { CommentController } from './comment.controller';
import { commentProviders } from './comment.providers';
import { CommentRepositoryTypeORM } from './comment.repositoryTypeORM';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentController],
  imports: [DatabaseModule, AuthModule],
  providers: [
    ...commentProviders,
    CommentRepositoryTypeORM,
    CommentService,
  ],
  exports: [CommentService, commentProviders.find(b => b.provide==='COMMENT_REPOSITORY')]
})
export class CommentModule {}