import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment, PaymentSchema } from '@shared/schemas/payment.schema';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from '@shared/config/env.config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRoot(process.env.DATABASE_HOST),
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],

  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
