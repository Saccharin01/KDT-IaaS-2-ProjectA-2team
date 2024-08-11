import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configOptions } from '@shared/config/env.config';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from '@shared/schemas/payment.schema';
import { Book, BookSchema } from '@shared/schemas/book.schema';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_HOST'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
