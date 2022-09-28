import {ConfigModule} from '@nestjs/config'
import config from '../../configuration/config.configuration';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { VideoRepositoryMongo } from './video.repositoryMongo';
import { VideoRepositoryTypeORM } from './video.repositoryTypeORM';
import { VideoController } from './videos.controller';
import { videoProviders } from './videos.providers';
import { VideoService } from './videos.service';

const moduleData = {
  controllers: [VideoController],
  imports: [
    DatabaseModule, 
  ],
  providers: [
    ...videoProviders,
    VideoService,
    {
      provide: 'Repository',
      useClass: process.env.REPOSITORY === 'mongo' ? VideoRepositoryMongo : VideoRepositoryTypeORM,
    },
  ],
  exports: [
    VideoService, 
    videoProviders.find(v => v.provide === 'VIDEO_REPOSITORY'), 
    videoProviders.find(v => v.provide === 'VIDEO_MONGOOSE'),
  ]
}


@Module(moduleData)
export class VideoModule {}