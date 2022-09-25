import { DataSource } from 'typeorm';
import { Post } from './post.entity';
import { Connection } from 'mongoose';
import { PostSchema } from './schema/post.schema';

export const postProviders = [
  {
    provide: 'POST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Post),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'POST_MONGOOSE',
    useFactory: (connection: Connection) => connection.model('Posts', PostSchema),
    inject: ['DATABASE_MONGOOSE'],
  }
];