import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '@shared/schemas/book.schema';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from '@shared/config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forRoot(process.env.DATABASE_HOST),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
