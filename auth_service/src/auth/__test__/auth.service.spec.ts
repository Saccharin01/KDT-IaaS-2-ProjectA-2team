import { Test } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('Auth Service Test', () => {
  let service: AuthService;
  let userModel: Model<UserDocument>;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    const module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongoUri),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  //* mongoose를 이용하여 테스트할 떄 꼭 서버를 닫아주어야한다.
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  it('validateUserById 옳게 된 접근 테스트', async () => {
    const user = new userModel({
      _id: 'test@example.com',
      password: 'password',
    });
    await user.save();

    const result = await service.validateUserById(user._id);

    expect(result).toEqual({
      _id: user._id,
    });
  });

  it('validateUserById 잘못된 접근 테스트', async () => {
    const user = new userModel({
      _id: 'test@example.com',
      password: 'password',
    });
    await user.save();

    const result = await service.validateUserById('TEST');

    expect(result).toBeNull();
  });
});
