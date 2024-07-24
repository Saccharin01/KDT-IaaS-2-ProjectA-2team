import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from '@shared/config/env.config';

@Module({
  imports: [SearchModule, ConfigModule.forRoot(configOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


















// @Module({
//   imports: [SearchModule, ConfigModule.forRoot(configOptions)],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
