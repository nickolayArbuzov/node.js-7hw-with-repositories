import { ConfigModule } from '@nestjs/config';
import config from './config.configuration';

export const Config = ConfigModule.forRoot({
    envFilePath: '.env', 
    isGlobal: true,
    load: [config],
});