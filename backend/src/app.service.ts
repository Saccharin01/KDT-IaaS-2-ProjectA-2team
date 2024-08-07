import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Input, InputDocument } from '@shared/input.schema';
import { UserData, UserDataDocument } from '@shared/userData.schema';
import UserDataInterface from './interface/userDataInterface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Input.name) private readonly TestModel: Model<InputDocument>,
    @InjectModel(UserData.name)
    private readonly UserModel: Model<UserDataDocument>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
  async findAllData(): Promise<{ response: string[] }> {
    try {
      const data = await this.TestModel.find().exec();
      const result = data.map((element) => element.toObject().name);
      return { response: result };
    } catch (err) {
      console.error('Error fetching Fail on Service :', err);
      throw err;
    }
  }

  async receivePostRequest(
    parsedData: string,
  ): Promise<{ response: string }[]> {
    try {
      await this.insertData(parsedData);

      console.log(parsedData);

      return [
        { response: `hello! i'm Nest.js! this is what we got "${parsedData}"` },
      ];
    } catch (error) {
      console.error('Error saving data:', error);
      throw new Error('Failed to save data');
    }
  }

  async insertData(parsedData: string): Promise<void> {
    await this.TestModel.create({ name: parsedData });
  }

  async userDataInsert(parsedData: UserDataInterface): Promise<void> {
    try {
      const { userId, password, nickname, budget } = parsedData;
      const Numbudget = Number(budget);

      if (isNaN(Numbudget)) {
        throw new Error('type Error');
      }
      const validData = {
        userId: userId,
        password: password,
        nickName: nickname,
        budget: Numbudget,
      };

      await this.UserModel.create(validData);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
