import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from '@shared/config/env.config';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [PaymentModule, ConfigModule.forRoot(configOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
