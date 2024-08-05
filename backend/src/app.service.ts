// import { InjectModel } from "@nestjs/mongoose";
// import {Injectable,Inject} from "@nestjs/common"
// import { DataBaseSetting } from "../../shared/dataBaseSetting";
// import { Model } from "mongoose";
// import {IName} from "../../shared/dataBaseSetting"

// @Injectable()
// export class AppService {
//   constructor(
//     @InjectModel(DataBaseSetting.name) private readonly TestModel:Model<IName>) {}


//   getHello(): string {
//     return 'Hello World!';
//   }


//  async receivePostRequest(parsedData : string):Promise<{response : string}[]> {
//     try {

//       await this.insertData(parsedData)
  
//       console.log(parsedData)

//       return [ {response : `hello! i'm Nest.js! this is what we got "${parsedData}"`} ]
      
//     } catch (error) {
//       console.error('Error saving data:', error);
//       throw new Error('Failed to save data');
//     }
//   }

//   async insertData(parsedData : string):Promise<void>{
//     await this.TestModel.create({name : parsedData})
//   }

// }




import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IName } from '../../shared/dataBaseSetting';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Test') private readonly TestModel: Model<IName>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async receivePostRequest(parsedData: string): Promise<{ response: string }[]> {
    try {
      await this.insertData(parsedData);
      console.log(parsedData);
      return [{ response: `Hello! I'm Nest.js! This is what we got: "${parsedData}"` }];
    } catch (error) {
      console.error('Error saving data:', error);
      throw new Error('Failed to save data');
    }
  }

  async insertData(parsedData: string): Promise<void> {
    await this.TestModel.create({ name: parsedData });
  }
}
