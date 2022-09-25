import { DataSource } from 'typeorm';
import * as mongoose from 'mongoose';

import { Blogger } from '../blogger/blogger.entity';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';
import { Video } from '../videos/videos.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASS,
        database: process.env.POSTGRES_DB,
        entities: [Blogger, User, Post, Comment, Video],
        synchronize: true,
        ssl: {rejectUnauthorized: false}
      });
      return dataSource.initialize();
    },
  },
  {
    provide: 'DATABASE_MONGOOSE',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(`mongodb+srv://admin:admin@cluster0.scloq.mongodb.net/?retryWrites=true&w=majority`),
  },
];