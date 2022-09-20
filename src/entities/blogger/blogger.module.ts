import { forwardRef, Module } from '@nestjs/common';
import { PostModule } from '../posts/post.module';
import { DatabaseModule } from '../database/database.module';
import { BloggerController } from './blogger.controller';
import { bloggerProviders } from './blogger.providers';
import { BloggerService } from './blogger.service';
import { BlogIsExistRule } from './customValidateBlog';
import { BlogRepositoryTypeORM } from './blog.repositoryTypeORM';


@Module({
  controllers: [BloggerController],
  imports: [DatabaseModule, forwardRef(() => PostModule)],
  providers: [
    ...bloggerProviders,
    BloggerService,
    BlogRepositoryTypeORM,
    BlogIsExistRule,
  ],
  exports: [BloggerService, bloggerProviders.find(b => b.provide==='BLOGGER_REPOSITORY')],
})
export class BloggerModule {}