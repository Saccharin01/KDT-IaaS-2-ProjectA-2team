import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from '@shared/schemas/payment.schema';
import { INestApplication } from '@nestjs/common';
import { dummyPaymentDto } from './dummydata';

describe('AppController', () => {
  let mongoDb: MongoMemoryServer;
  let app: INestApplication;

  beforeAll(async () => {
    mongoDb = await MongoMemoryServer.create();
    const url = mongoDb.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(url),
        MongooseModule.forFeature([
          { name: Payment.name, schema: PaymentSchema },
        ]),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await mongoDb.stop();
    await mongoose.disconnect();
  });

  describe('Post Test', () => {
    it('Correct Data', async () => {
      const response = await supertest(app.getHttpServer())
        .post('/')
        .send([dummyPaymentDto]);

      expect(response.status).toBe(400);
    });

    it('Validate Test: 불필요한 필드', async () => {
      const data = structuredClone(dummyPaymentDto) as any;
      data.incorrect = 'test';

      const response = await supertest(app.getHttpServer())
        .post('/')
        .send([data]);

      expect(response.status).toBe(400);
    });

    it('Validate Test: 필드 타입 유효성 검사', async () => {
      const data = structuredClone(dummyPaymentDto) as any;
      data.book_id = 'incoreect';

      const response = await supertest(app.getHttpServer())
        .post('/')
        .send([data]);

      expect(response.status).toBe(400);
    });
  });
});
