import { forwardRef, Module } from '@nestjs/common';
import { CommentModule } from '../comments/comment.module';
import { BloggerModule } from '../blogger/blogger.module';
import { DatabaseModule } from '../database/database.module';
import { PostController } from './post.controller';
import { postProviders } from './post.providers';
import { PostService } from './post.service';
import { AuthModule } from '../../infrastructure/auth/auth.module';
import { PostRepositoryTypeORM } from './post.repositoryTypeORM';

@Module({
  controllers: [PostController],
  imports: [DatabaseModule, forwardRef(() => BloggerModule), CommentModule, AuthModule],
  providers: [
    ...postProviders,
    PostService,
    PostRepositoryTypeORM,
  ],
  exports: [PostService, postProviders.find(p => p.provide === 'POST_REPOSITORY')],
})
export class PostModule {}