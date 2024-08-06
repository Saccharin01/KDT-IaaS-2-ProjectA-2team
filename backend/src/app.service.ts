import { InjectModel } from "@nestjs/mongoose";
import {Injectable} from "@nestjs/common"
import { Model } from "mongoose";
import {Input, InputDocument} from "@shared/input.schema"

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Input.name) private readonly TestModel:Model<InputDocument>) {}


  getHello(): string {
    return 'Hello World!';
  }
  async findAllData():Promise<{response : string[]}>{
    try {
      const data = await this.TestModel.find().exec()
      const result = data.map((element)=>element.toObject().name)
      return {response : result}
      
    } catch (err) {
      console.error('Error fetching Fail on Service :', err);
      throw err; 
    }
  }


 async receivePostRequest(parsedData : string):Promise<{response : string}[]> {
    try {

      await this.insertData(parsedData)
  
      console.log(parsedData)

      return [ {response : `hello! i'm Nest.js! this is what we got "${parsedData}"`} ]
      
    } catch (error) {
      console.error('Error saving data:', error);
      throw new Error('Failed to save data');
    }
  }

  async insertData(parsedData : string):Promise<void>{
    await this.TestModel.create({name : parsedData})
  }

}


