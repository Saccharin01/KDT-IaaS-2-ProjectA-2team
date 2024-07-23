import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { MongooseModule } from '@nestjs/mongoose';

import * as dotEnv from 'dotenv'
dotEnv.config()

const test = process.env.MONGO_URL

// const url = "http://localhost:27017/"
@Module({
  imports: [
    MongooseModule.forRoot(test)
  ],
  controllers : [SearchController],
  providers : [SearchService],
})
export class SearchModule {}