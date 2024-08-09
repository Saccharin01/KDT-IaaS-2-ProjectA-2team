import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserSchema } from '../auth/schemas/user.schema';

describe('AppService', () => {
  let service: AppService;
  let userModel: Model<UserDocument>;
  let mongodb: MongoMemoryServer;
  let jwtService: JwtService;
  const testKey = 'TEST_KEY';

  beforeAll(async () => {
    mongodb = await MongoMemoryServer.create();
    const url = mongodb.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(url),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
          secretOrPrivateKey: testKey,
        }),
      ],

      providers: [AppService],
    }).compile();

    jwtService = module.get<JwtService>(JwtService);
    service = module.get<AppService>(AppService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongodb.stop();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('AppService Create Method Test', async () => {
    const dummyUser = {
      _id: 'Create_User_Test',
      password: '3333',
      phone: '010-2222-2222',
    };

    expect(await service.create(dummyUser)).toBeTruthy();
  });

  it('AppServie Create Method Test : 이미 동일안 id가 존재할 때', async () => {
    const dummyUser = {
      _id: 'dummy',
      password: '3333',
      phone: '010-0000-0000',
    };
    const dummyUser2 = {
      _id: 'dummy',
      password: '4444',
      phone: '010-1111-2222',
    };

    expect(await service.create(dummyUser)).toBeTruthy();
    expect(await service.create(dummyUser2)).toBeFalsy();
  });

  //* 옳바른 Return값이 나오는지 테스트
  //* 평문화된 비밀번호가 해쉬화된 비밀번호를 비교
  it('AppService validateUser Method Corrcect Test', async () => {
    //* 비밀번호 해쉬화

    const user = {
      _id: 'test@example.com',
      password: 'password',
      phone: '010-0000-0000',
    };

    await service.create(user);

    expect(await service.validateUser(user._id, user.password)).toBeTruthy();
  });

  //* 비밀번호가 틀렸을 떄 null를 반환한다.
  it('AppService validateUser Method InCorrect Test', async () => {
    const user = {
      _id: 'test@example.com',
      password: 'password',
      phone: '010-0000-0000',
    };

    await service.create(user);

    expect(await service.validateUser('hello', 'hy')).toBeNull();
  });

  it('makeJWT Method Test', async () => {
    const user = {
      _id: 'test@example.com',
      password: 'password',
    };

    const payload = service.makeJWT(user);
    const decodePayload = jwtService.decode(payload.access_token);

    expect(decodePayload).toHaveProperty('_id', user._id);
    expect(decodePayload).toHaveProperty('iat');
  });

  describe('checkDuplicate 테스트', () => {
    const userObj = {
      _id: 'test@example.com',
      password: 'password',
    };

    it('중복된 아이디가 없을 떄', async () => {
      expect(await service.checkDuplicate(userObj._id)).toBeTruthy();
    });

    it('중복된 아이디가 존재할 때', async () => {
      const user = await userModel.create(userObj);
      await user.save();

      expect(await service.checkDuplicate(userObj._id)).toBeFalsy();
    });
  });
});
