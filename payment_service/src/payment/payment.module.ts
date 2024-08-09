import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from '@shared/config/env.config';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from '@shared/schemas/payment.schema';
import { Book, BookSchema } from '@shared/schemas/book.schema';
import { User, UserSchema } from '@shared/schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRoot(process.env.DATABASE_HOST),
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      { name: Book.name, schema: BookSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],

  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
