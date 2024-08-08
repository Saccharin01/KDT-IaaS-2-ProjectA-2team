import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { BooksService } from '../books.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Book, BookDocument, BookSchema } from '@shared/schemas/book.schema';
import mongoose, { Model } from 'mongoose';
import { bookArrayData, newBook, updateBook } from './dummybooks.spec';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BookDto } from '@shared/dto/book.dto';

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
      const updateData: BookDto = {
        _id: 3,
        title: 'Update',
        author: 'Harper Lee',
        price: 12.99,
        genre: 'Southern Gothic',
        hashtags: ['#안녕'],
        publisher: 'J.B. Lippincott & Co.',
        stock_quantity: 200,
        introduce: 'A novel about racial injustice in the Deep South.',
        remain_stock: 200,
        sold_stock: 0,
        arrival_date: '2024-07-23',
      };

      const expectedResult = {
        ...updateData,
        arrival_date: new Date('2024-07-23'),
      };
      const result = await service.updateBook(updateData);
      expect(result).toEqual(expectedResult);
    });

    it('없는 _id 업데이트 테스트', async () => {
      const copy = structuredClone(updateBook);
      copy._id = 4;

      await expect(service.updateBook(copy)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('데이터 유효성 검사 실패', async () => {
      const copy = structuredClone(updateBook);
      copy.sold_stock = -1;

      await expect(service.updateBook(copy)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('신규 데이터 저장하기', () => {
    const copy = structuredClone(newBook);
    delete copy._id;

    it('성공적으로 업데이트', async () => {
      const ressult = await service.createBook(copy);
      const expectedResult = {
        _id: 4,
        ...copy,
        arrival_date: new Date(newBook.arrival_date),
      };
      expect(ressult).toEqual(expectedResult);
    });

    it('유효성 검사', async () => {
      copy.sold_stock = -1;
      await expect(service.createBook(copy)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
