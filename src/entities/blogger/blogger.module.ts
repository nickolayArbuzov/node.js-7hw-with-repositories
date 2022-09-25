import {ConfigModule} from '@nestjs/config'
import config from '../../configuration/config.configuration';
import { forwardRef, Module } from '@nestjs/common';
import { PostModule } from '../posts/post.module';
import { DatabaseModule } from '../database/database.module';
import { BloggerController } from './blogger.controller';
import { bloggerProviders } from './blogger.providers';
import { BloggerService } from './blogger.service';
import { BlogIsExistRule } from './customValidateBlog';
import { BlogRepositoryTypeORM } from './blog.repositoryTypeORM';
import { BlogRepositoryMongo } from './blog.repositoryMongo';

@Module({
  controllers: [BloggerController],
  imports: [DatabaseModule, forwardRef(() => PostModule)],
  providers: [
    ...bloggerProviders,
    BloggerService,
    BlogIsExistRule,
    {
      provide: 'Repository',
      useClass: process.env.REPOSITORY === 'mongo' ? BlogRepositoryMongo : BlogRepositoryTypeORM,
    },
  ],
  exports: [
    BloggerService, 
    bloggerProviders.find(b => b.provide==='BLOGGER_REPOSITORY'), 
    bloggerProviders.find(v => v.provide === 'BLOG_MONGOOSE'),
  ],
})
export class BloggerModule {}