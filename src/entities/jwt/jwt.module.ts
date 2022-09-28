import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { jwtProviders } from './jwt.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...jwtProviders],
  exports: [...jwtProviders],
})
export class JWTModule {}