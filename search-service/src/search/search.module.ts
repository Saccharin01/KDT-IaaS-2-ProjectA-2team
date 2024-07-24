import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from 'src/modules/Schema';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from '@shared/config/env.config';
// import path from 'path';
// import * as dotenv from "dotenv"

// dotenv.config({
//   path: path.resolve(process.cwd(), '.env')
// });
// const url = process.env.DATABASE_HOST
// const name = process.env.MODEL_NAME



// const url = "http://localhost:27017/"
@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forFeature([{ name: "book_info", schema: BookSchema }]),
    MongooseModule.forRoot(process.env.DATABASE_HOST)
  ],
  controllers : [SearchController],
  providers : [SearchService],
})
export class SearchModule {}