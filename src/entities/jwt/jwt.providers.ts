import { DataSource } from 'typeorm';
import { JWT } from './jwt.entity';
import { Connection } from 'mongoose';
//import { CommentSchema } from './schema/comment.schema';

export const jwtProviders = [
  {
    provide: 'JWT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(JWT),
    inject: ['DATA_SOURCE'],
  },
];