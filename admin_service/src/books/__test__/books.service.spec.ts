import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { BooksService } from '../books.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Book, BookDocument, BookSchema } from '@shared/schemas/book.schema';
import mongoose, { Model } from 'mongoose';
import { bookArrayData } from './dummybooks.spec';

describe('BooksService', () => {
  let service: BooksService;
  let mongodb: MongoMemoryServer;
  let bookModel: Model<BookDocument>;

  beforeAll(async () => {
    mongodb = await MongoMemoryServer.create();
    const url = mongodb.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(url),
        MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
      ],
      providers: [BooksService],
    }).compile();

    service = module.get<BooksService>(BooksService);
    bookModel = module.get<Model<BookDocument>>(getModelToken(Book.name));

    await bookModel.create(bookArrayData);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongodb.stop();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('데이터 가져오기', async () => {
    const getData = await service.getBooks();
    expect(getData.length).toBe(3);
    expect(getData).toEqual(bookArrayData);
  });

  describe('데이터 업데이트 하기', () => {
    it('성공적으로 업데이트', async () => {
      const updateData = {
        _id: 3,
        title: 'Update',
        author: 'Harper Lee',
        price: 12.99,
        genre: 'Southern Gothic',
        hashtags: '#안녕',
        publisher: 'J.B. Lippincott & Co.',
        stock_quantity: 200,
        introduce: 'A novel about racial injustice in the Deep South.',
        remain_stock: 200,
        sold_stock: 0,
        arrival_date: new Date('2024-07-23T00:00:00Z'),
      };

      const result = await service.updateBoook(updateData);
      expect(result).toEqual(updateData);
    });
  });
});
