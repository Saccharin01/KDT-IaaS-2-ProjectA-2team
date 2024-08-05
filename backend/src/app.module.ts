// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Input, InputSchema} from "@shared/input.schema"
const url= 'mongodb+srv://chousik01:70318202@cluster0.mmiiheq.mongodb.net/'



@Module({
  imports: [
    MongooseModule.forRoot(url),
    MongooseModule.forFeature([{ name: Input.name, schema: InputSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
