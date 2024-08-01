import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from 'src/modules/Schema';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from '@shared/config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forFeature([{ name: process.env.MODEL_NAME, schema: BookSchema, collection: process.env.MODEL_NAME}]),
    MongooseModule.forRoot(process.env.DATABASE_HOST),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
