import { Injectable } from '@nestjs/common';
import LoginDTO from '@shared/dto/loginDTO';
import { JwtPayloadDTO } from './auth/dto/JwtPayloadDTO';
import { omit } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './auth/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(userDto: LoginDTO): Promise<boolean> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userDto.password, salt);

    //* 중복된 아이디가 있는지 검사
    if ((await this.checkDuplicate(userDto._id)) === false) {
      return false;
    }

    const createdUser = new this.userModel({
      _id: userDto._id,
      password: hashedPassword,
    });

    await createdUser.save();

    return true;
  }

  makeJWT(user: LoginDTO) {
    const payload: JwtPayloadDTO = omit(user, 'password');
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * * 유저 유효성 검사
   * * MongoDB를 통해, _id를 통해 유저 정보를 가져온다
   * * 가져온 정보를 통해 비밀번호를 비교
   * @param _id
   * @param password
   * @returns 유효한 접근이면 유저정보, 아니면 null
   */
  async validateUser(
    _id: string,
    password: string,
  ): Promise<JwtPayloadDTO | null> {
    const user = await this.userModel.findById(_id);
    if (user && (await bcrypt.compare(password, user.password))) {
      const jwtpayload: JwtPayloadDTO = omit(user, 'password');
      return jwtpayload;
    } else {
      return null;
    }
  }

  async checkDuplicate(id: string) {
    const result = await this.userModel.findById(id);
    return !result;
  }
}
