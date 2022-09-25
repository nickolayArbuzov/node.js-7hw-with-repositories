import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { Connection } from 'mongoose';
import { UserSchema } from './schema/user.schema';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USER_MONGOOSE',
    useFactory: (connection: Connection) => connection.model('Users', UserSchema),
    inject: ['DATABASE_MONGOOSE'],
  }
];