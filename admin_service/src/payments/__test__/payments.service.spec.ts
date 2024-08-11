import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from '../payments.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import {
  Payment,
  PaymentDocument,
  PaymentSchema,
} from '@shared/schemas/payment.schema';
import mongoose, { Model } from 'mongoose';
import { dummyPaymentDto } from './dummyPayment';
import { PaymentDtoIncludeId } from '@shared/dto/payment.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let mongoDb: MongoMemoryServer;
  let paymentModel: Model<PaymentDocument>;

  beforeEach(async () => {
    mongoDb = await MongoMemoryServer.create();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongoDb.getUri()),
        MongooseModule.forFeature([
          { name: Payment.name, schema: PaymentSchema },
        ]),
      ],
      providers: [PaymentsService],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
    paymentModel = module.get<Model<PaymentDocument>>(
      getModelToken(Payment.name),
    );
  });

  afterEach(async () => {
    await mongoose.disconnect();
    await mongoDb.stop();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPayments Method Test', () => {
    it('비어있는 값 접근', async () => {
      const result = await service.getPayments();
      expect(result).toEqual([]);
    });

    it('값이 존재할 때', async () => {
      await paymentModel.create(dummyPaymentDto);
      const result = await service.getPayments();
      const data = result[0];

      expect(result.length).toBe(1);
      expect(data).toHaveProperty('_id');

      const copy = structuredClone(dummyPaymentDto) as any;
      copy._id = data._id;
      copy.date = new Date(dummyPaymentDto.date);

      expect(data).toEqual(copy);
    });
  });

  describe('updatePayment Method Test', () => {
    it('업데이트 데이터가 존재하지 않을 떄', async () => {
      const copy = structuredClone(dummyPaymentDto) as PaymentDtoIncludeId;
      copy._id = new mongoose.Types.ObjectId().toString();

      await expect(service.updatePayment(copy)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('데이터가 존재할 때', async () => {
      const copy = structuredClone(dummyPaymentDto) as PaymentDtoIncludeId;
      copy._id = new mongoose.Types.ObjectId() as any;
      await paymentModel.create(copy);

      const copy_2 = structuredClone(dummyPaymentDto) as PaymentDtoIncludeId;
      copy_2._id = copy._id.toString();
      const result = await service.updatePayment(copy_2);

      const json = await JSON.parse(JSON.stringify(result));

      expect(json).toEqual(copy_2);
    });
  });

  describe('createPayment Method Test', () => {
    it('새로 데이터 생성하기', async () => {
      const copy = structuredClone(dummyPaymentDto) as PaymentDtoIncludeId;

      const result = await service.createPayment(copy);
      
      const json = await JSON.parse(JSON.stringify(result));

      copy._id = result._id.toString();

      expect(json).toEqual(copy)
    })

    it('특정 필드가 존재하지 않을 떄', async () => {
      const copy = structuredClone(dummyPaymentDto) as PaymentDtoIncludeId;
      delete copy.address;

      expect(service.createPayment(copy)).rejects.toThrow(BadRequestException);
    })
  })
});
