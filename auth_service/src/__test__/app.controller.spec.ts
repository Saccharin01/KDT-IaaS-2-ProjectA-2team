import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import mongoose, { Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User, UserDocument, UserSchema } from '../auth/schemas/user.schema';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { INestApplication } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import request from 'supertest';

describe('AppController', () => {
  let userModel: Model<UserDocument>;
  let mongodb: MongoMemoryServer;
  let app: INestApplication;
  let service: AppService;
  let jwtService: JwtService;
  const TEST_KEY = 'TEST_KEY';

  beforeAll(async () => {
    mongodb = await MongoMemoryServer.create();
    const url = mongodb.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(url),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
          secret: TEST_KEY,
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = module.createNestApplication();
    app.init();

    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    service = module.get<AppService>(AppService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongodb.stop();
  });

  describe('POST login Test', () => {
    it('로그인이 성공했을 때', async () => {
      const dummyUser = {
        _id: 'dummy',
        password: '3333',
        phone: '010-0000-0000',
      };
      await service.create(dummyUser);

      //const expectValue = jwtService.sign(omit(dummyUser, 'password'));

      const response = await request(app.getHttpServer())
        .post('/login')
        .send(dummyUser)
        .set('Content-Type', 'application/json');

      const decodedToken = jwtService.decode(response.body.access_token);

      expect(response.status).toBe(201);
      expect(decodedToken).toHaveProperty('_id', 'dummy');
      expect(decodedToken).toHaveProperty('iat');
    });

    it('로그인이 실패했을 때', async () => {
      const dummyUser = {
        _id: 'dummy',
        password: '3333',
        phone: '010-0000-000',
      };
      await service.create(dummyUser);

      await request(app.getHttpServer())
        .post('/login')
        .send({
          _id: 'dummy',
          password: '2222',
        })
        .set('Content-Type', 'application/json')
        .expect(401);
    });
  });

  describe('POST signup Test', () => {
    it('회원가입 성공했을 때', async () => {
      const dummyUser = { _id: 'dummy', password: '3333' };

      const response = await request(app.getHttpServer())
        .post('/signup')
        .send(dummyUser)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
    });

    it('이미 존재하는 아이디가 있을 때', async () => {
      const dummyUser = {
        _id: 'dummy',
        password: '3333',
        phone: '010-0000-0000',
      };
      await service.create(dummyUser);

      const response = await request(app.getHttpServer())
        .post('/signup')
        .send(dummyUser)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(409);
    });
  });

  describe('Get checkId Test', () => {
    it('중복된 아이디가 없을 때', async () => {
      const response = await request(app.getHttpServer())
        .get('/checkId')
        .query({
          _id: 'test',
        })
        .send();

      expect(response.body).toEqual({ success: true });
    });

    it('중복된 아이디가 존재 할 때', async () => {
      const dummyUser = {
        _id: 'test',
        password: '3333',
        phone: '010-0000-0000',
      };
      await service.create(dummyUser);

      const response = await request(app.getHttpServer())
        .get('/checkId')
        .query({
          userId: 'test',
        })
        .send();

      expect(response.body).toEqual({ success: false });
    });
  });
});
