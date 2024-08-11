import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { ProxyModule } from 'src/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [PaymentController],
})
export class PaymentModule {}
