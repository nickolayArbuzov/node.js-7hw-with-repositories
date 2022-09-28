import { Module } from '@nestjs/common';
import { Config } from './configuration/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './entities/database/database.module';
import { BloggerModule } from './entities/blogger/blogger.module';
import { PostModule } from './entities/posts/post.module';
import { CommentModule } from './entities/comments/comment.module';
import { UserModule } from './entities/users/user.module';
import { VideoModule } from './entities/videos/videos.module';
import { AllDataModule } from './infrastructure/all-data/all-data.module';
import { AuthModule } from './infrastructure/auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
  ],
  imports: [
    Config,
    DatabaseModule,
    BloggerModule,
    PostModule,
    CommentModule,
    UserModule,
    VideoModule,
    AllDataModule,
    AuthModule,
  ],
})
export class AppModule {}

