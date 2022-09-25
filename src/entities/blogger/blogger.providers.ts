import { DataSource } from 'typeorm';
import { Blogger } from './blogger.entity';
import { Connection } from 'mongoose';
import { BlogSchema } from './schema/blog.schema';

export const bloggerProviders = [
  {
    provide: 'BLOGGER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Blogger),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'BLOG_MONGOOSE',
    useFactory: (connection: Connection) => connection.model('Blogs', BlogSchema),
    inject: ['DATABASE_MONGOOSE'],
  }
];