import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  receivePostRequest(parsedData : string):{response : string}[] {
    console.log(parsedData)
    return [
      {response : `hello! i'm Nest.js! this is what we got "${parsedData}"`}
    ]
  }
}

