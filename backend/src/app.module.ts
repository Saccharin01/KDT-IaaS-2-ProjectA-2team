import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from '@shared/config/env.config';
import { AdminModule } from './proxy-module/admin/admin.module';
import { SearchModule } from './proxy-module/search/search.module';
import { AuthModule } from './proxy-module/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    AdminModule,
    SearchModule,
    AuthModule,
  ],
})
export class AppModule {}
