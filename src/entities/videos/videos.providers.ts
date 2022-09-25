import { DataSource } from 'typeorm';
import { Video } from './videos.entity';
import { Connection } from 'mongoose';
import { VideoSchema } from './schema/video.schema'

export const videoProviders = [
  {
    provide: 'VIDEO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Video),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'VIDEO_MONGOOSE',
    useFactory: (connection: Connection) => connection.model('Videos', VideoSchema),
    inject: ['DATABASE_MONGOOSE'],
  }
];