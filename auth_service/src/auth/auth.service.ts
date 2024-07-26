import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { JwtPayloadDTO } from './dto/JwtPayloadDTO';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * * _id를 통해 유저 정보를 접근한다.
   * @param _id
   * @returns
   */
  async validateUserById(_id: string): Promise<JwtPayloadDTO | null> {
    const user = await this.userModel
      .findById(_id)
      .select('-password -__v')
      .lean();
    if (!user) {
      return null;
    }
    return user;
  }
}
