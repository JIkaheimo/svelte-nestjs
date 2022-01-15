import { Module } from '@nestjs/common';
import ConfigModule from './config/config.module';
import DatabaseModule from './database/database.module';
import { SubscribersModule } from './subscribers';

@Module({
  imports: [DatabaseModule, ConfigModule, SubscribersModule],
})
export class AppModule {}

export default AppModule;
