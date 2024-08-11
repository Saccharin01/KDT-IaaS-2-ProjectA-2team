import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from '../payments.controller';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsService } from '../payments.service';
import { Payment, PaymentSchema } from '@shared/schemas/payment.schema';
import mongoose from 'mongoose';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { dummyPaymentDto } from './dummyPayment';
import { PaymentDtoIncludeId } from '@shared/dto/payment.dto';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: PaymentsService;
  let mongoDb: MongoMemoryServer;
  let app: INestApplication;

  beforeEach(async () => {
    mongoDb = await MongoMemoryServer.create();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongoDb.getUri()),
        MongooseModule.forFeature([
          { name: Payment.name, schema: PaymentSchema },
        ]),
      ],
      controllers: [PaymentsController],
      providers: [PaymentsService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<PaymentsService>(PaymentsService);
    controller = module.get<PaymentsController>(PaymentsController);
  });

  afterEach(async () => {
    await mongoose.disconnect();
    await mongoDb.stop();
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET TEST', () => {
    it('데이터 요청', async () => {
      const result = await service.createPayment(dummyPaymentDto);
      const res = await supertest(app.getHttpServer()).get('/payments');

      const json = await JSON.parse(JSON.stringify(result));

      expect(res.status).toBe(200);
      expect(res.body).toEqual([json]);
    });
  });

  describe('POST TEST', () => {
    it('옳바른 Body 데이터', async () => {
      const copy = structuredClone(dummyPaymentDto) as any;

      const res = await supertest(app.getHttpServer())
        .post('/payments')
        .send(copy);
      copy._id = res.body._id as any;
      expect(res.status).toBe(201);
      expect(res.body).toEqual(copy);
    });

    //* address가 비어 있는지 확인
    it('옳바르지 않는 Body 데이터', async () => {
      const copy = structuredClone(dummyPaymentDto) as PaymentDtoIncludeId;
      copy._id = new mongoose.Types.ObjectId().toString();
      copy.address = '';

      const res = await supertest(app.getHttpServer())
        .post('/payments')
        .send(copy);

      expect(res.status).toBe(400);
    });

    it('옳바르지 않는 Body 데이터 ( 잘못된 필드 )', async () => {
      const copy = structuredClone(dummyPaymentDto) as any;
      copy._id = new mongoose.Types.ObjectId().toString();
      copy.incorrect = true;

      const res = await supertest(app.getHttpServer())
        .post('/payments')
        .send(copy);

      expect(res.status).toBe(400);
    });
  });

  describe('PUT TEST', () => {
    it('옳바른 데이터 업데이트', async () => {
      const result = await service.createPayment(dummyPaymentDto);

      const copy = structuredClone(dummyPaymentDto) as PaymentDtoIncludeId;
      copy._id = result._id.toString();
      copy.amount = 3;
      const res = await supertest(app.getHttpServer())
        .put('/payments')
        .send(copy);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(copy);
    });

    //* address가 비어 있는지 확인
    it('옳바르지 않는 Body 데이터', async () => {
      const copy = structuredClone(dummyPaymentDto) as PaymentDtoIncludeId;
      copy._id = new mongoose.Types.ObjectId().toString();
      copy.address = '';

      const res = await supertest(app.getHttpServer())
        .put('/payments')
        .send(copy);

      expect(res.status).toBe(400);
    });

    it('옳바르지 않는 Body 데이터 ( 잘못된 필드 )', async () => {
      const copy = structuredClone(dummyPaymentDto) as any;
      copy._id = new mongoose.Types.ObjectId().toString();
      copy.incorrect = true;

      const res = await supertest(app.getHttpServer())
        .put('/payments')
        .send(copy);

      expect(res.status).toBe(400);
    });
  });
});
