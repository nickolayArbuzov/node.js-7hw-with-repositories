import { DataSource } from 'typeorm';
import { Comment } from './comment.entity';
import { Connection } from 'mongoose';
import { CommentSchema } from './schema/comment.schema';

export const commentProviders = [
  {
    provide: 'COMMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Comment),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'COMMENT_MONGOOSE',
    useFactory: (connection: Connection) => connection.model('Comments', CommentSchema),
    inject: ['DATABASE_MONGOOSE'],
  }
];