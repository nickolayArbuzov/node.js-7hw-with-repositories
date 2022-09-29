import { Module, forwardRef } from '@nestjs/common';
import { AllDataController } from './all-data.controller';
import { AllDataService } from './all-data.service';
import { VideoModule } from '../../entities/videos/videos.module';
import { BloggerModule } from '../../entities/blogger/blogger.module';
import { PostModule } from '../../entities/posts/post.module';
import { UserModule } from '../../entities/users/user.module';
import { CommentModule } from '../../entities/comments/comment.module';
import { JWTModule } from '../../entities/jwt/jwt.module';

@Module({
  controllers: [AllDataController],
  imports: [VideoModule, BloggerModule, PostModule, UserModule, CommentModule, JWTModule],
  providers: [
    AllDataService,
  ],
})
export class AllDataModule {}
