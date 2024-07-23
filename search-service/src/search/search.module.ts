import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { MongooseModule } from '@nestjs/mongoose';

import * as dotEnv from 'dotenv'
dotEnv.config()

// const url = "http://localhost:27017/"
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL)
  ],
  controllers : [SearchController],
  providers : [SearchService],
})
export class SearchModule {}