import { Test } from '@nestjs/testing';
import { AppService } from '../app.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Model } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import {
  Payment,
  PaymentSchema,
  PaymentDocument,
} from '@shared/schemas/payment.schema';
import { dummyBook, dummyPaymentDto } from './dummydata';
import { omit } from 'lodash';
import { Book, BookSchema, BookDocument } from '@shared/schemas/book.schema';

describe('App Service Test', () => {
  let service: AppService;
  let mongoDb: MongoMemoryServer;
  let paymentModel = Model<PaymentDocument>;
  let bookModel: Model<BookDocument>;

  beforeAll(async () => {
    mongoDb = await MongoMemoryServer.create();
    const url = mongoDb.getUri();

    const module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(url),
        MongooseModule.forFeature([
          { name: Payment.name, schema: PaymentSchema },
          { name: Book.name, schema: BookSchema },
        ]),
      ],
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
    paymentModel = module.get<Model<PaymentDocument>>(
      getModelToken(Payment.name),
    );
    bookModel = module.get<Model<BookDocument>>(getModelToken(Book.name));
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoDb.stop();
  });

  describe('saveOrder', () => {
    it('Correct Validation Data', async () => {
      const copy = structuredClone(dummyPaymentDto);

      const book = new bookModel(dummyBook);
      book._id = dummyBook._id;

      await book.save();

      const result = await service.saveOrder([copy]);
      //! toObject를 사용해 자바스크립트 객체로 만들어 줘야 한다.
      const expoectResult = result.map((data) =>
        omit(data.toObject(), ['_id', '__v']),
      );

      copy.date = new Date(copy.date) as any;
      expect(expoectResult).toEqual([copy]);

      const data = await paymentModel.findById(result[0].id).lean();
      expect(data).toStrictEqual(result[0].toObject());

      const amout = await (await bookModel.findById(book._id)).sold_stock;

      expect(amout).toBe(1);
    });
  });
});
