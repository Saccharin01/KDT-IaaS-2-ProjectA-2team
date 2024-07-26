import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth.guard'; // 경로를 적절히 조정하세요
import { AuthService } from '../auth.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleOptions } from '../config/jwt.config';
import { User, UserSchema, UserDocument } from '../schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import mongoose, { Model } from 'mongoose';
import { JwtStrategy } from '../jwt.strategy';
import { configOptions } from '../config/env.config';

describe('Auth Module 통합 테스트', () => {
  let guard: JwtAuthGuard;
  let mongod: MongoMemoryServer;
  let validToken: string;

  beforeAll(async () => {
    //* 인메모리데이터베이스
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    //* AuthModule이 임포트하는 목록들을 그대로 기져온다, MongoDB설정 제외
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(configOptions),
        PassportModule,
        JwtModule.register(jwtModuleOptions),
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [AuthService, JwtStrategy],
    }).compile();

    //* 인메모리 데이터베이스에 임의이 데이터 저장
    const userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    const user = new userModel({
      _id: 'test@example.com',
      password: 'password',
    });
    await user.save();

    //* 작성한 사용자 정의 가드
    guard = new JwtAuthGuard();

    //* 유효한 토큰 생성
    validToken = jwt.sign(
      { _id: user._id, password: user.password },
      jwtModuleOptions.secret,
      { expiresIn: '1h' },
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  it('유효한 토큰을 검증하였을 때', async () => {
    //* AuthGuadr를 사용이 없음으로 임의로 context를 모킹하여 테스트한다.
    const context = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({
        headers: {
          authorization: `Bearer ${validToken}`,
        },
      }),
      getResponse: jest.fn().mockReturnValue({}),
    } as unknown as ExecutionContext;

    //* canActivate를 spy
    const canActivateSpy = jest.spyOn(
      AuthGuard('jwt').prototype,
      'canActivate',
    );

    await expect(guard.canActivate(context)).resolves.not.toThrow();
    expect(canActivateSpy).toHaveBeenCalledWith(context);
  });

  it('유효한 토큰이 아닐 때', async () => {
    const invalidToken = jwt.sign(
      { _id: '111', password: 'test' },
      'Invalid Secret',
      { expiresIn: '1h' },
    );

    const context = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({
        headers: {
          authorization: `Bearer ${invalidToken}`,
        },
      }),
      getResponse: jest.fn().mockReturnValue({}),
    } as unknown as ExecutionContext;

    const canActivateSpy = jest.spyOn(
      AuthGuard('jwt').prototype,
      'canActivate',
    );

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(canActivateSpy).toHaveBeenCalledWith(context);
  });
});
