import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/input')
  findAllData(){
    return this.appService.findAllData();
  }



  @Post('/input')
  receivePostRequest(@Body() body : { data : string }){
    const {data} = body
    console.log(data)
    return this.appService.receivePostRequest(data)
  }
}
