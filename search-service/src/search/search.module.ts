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
    MongooseModule.forFeature([{ name: 'book_info', schema: BookSchema }]),
    MongooseModule.forRoot(process.env.DATABASE_HOST),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
