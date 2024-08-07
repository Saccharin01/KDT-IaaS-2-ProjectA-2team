import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import UserDataInterface from './interface/userDataInterface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/input')
  findAllData() {
    return this.appService.findAllData();
  }

  @Post('/input')
  receivePostRequest(@Body() body: { data: string }) {
    const { data } = body;
    console.log(data);
    return this.appService.receivePostRequest(data);
  }
  @Post('/sign_up')
  async UserDataSubmit(@Body() body: UserDataInterface) {
    try {
      await this.appService.userDataInsert(body);
      return JSON.stringify({message : "weldone!"})
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to save user data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
