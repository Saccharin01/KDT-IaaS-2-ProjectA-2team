// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Input, InputSchema } from '@shared/input.schema';
import { UserData, UserDataSchema } from '@shared/userData.schema';
const url =
  'mongodb+srv://chousik01:70318202@cluster0.mmiiheq.mongodb.net/testCho';

@Module({
  imports: [
    MongooseModule.forRoot(url),
    MongooseModule.forFeature([
      { name: Input.name, schema: InputSchema, collection: Input.name },
      {
        name: UserData.name,
        schema: UserDataSchema,
        collection: UserData.name,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
