// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseSetting, TestSchema} from '../../shared/dataBaseSetting';

@Module({
  imports: [
    MongooseModule.forRoot(DataBaseSetting.url),
    MongooseModule.forFeature([{ name: DataBaseSetting.name, schema: TestSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
