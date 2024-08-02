import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from '../books.controller';
import supertest from 'supertest';
import { INestApplication } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Book, BookDocument, BookSchema } from '@shared/schemas/book.schema';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { bookArrayData, newBook, updateBook } from './dummybooks.spec';
import mongoose from 'mongoose';
import { BooksService } from '../books.service';

describe('BooksController', () => {
  let controller: BooksController;
  let app: INestApplication;
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
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    app = module.createNestApplication();
    app.init();
    controller = module.get<BooksController>(BooksController);
    bookModel = module.get<Model<BookDocument>>(getModelToken(Book.name));

    await bookModel.create(bookArrayData);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongodb.stop();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Get Method Test', async () => {
    const response = await supertest(app.getHttpServer()).get('/books');
    expect(response.body.length).toBe(3);

    //! 응답받을 때, 문자열로 된 날짜를 다시 파싱해야한다.
    response.body.forEach((element) => {
      element.arrival_date = new Date(element.arrival_date);
    });

    expect(response.body).toEqual(bookArrayData);
  });

  describe('Put Method Test', () => {
    it('Success', async () => {
      const response = await supertest(app.getHttpServer())
        .put('/books')
        .send(updateBook);

      const expectedResult = {
        ...updateBook,
        arrival_date: new Date('2024-07-23'),
      };

      response.body.arrival_date = new Date(response.body.arrival_date);
      expect(response.body).toEqual(expectedResult);
    });

    it('존재하지 않는 Id', async () => {
      const copy = structuredClone(updateBook);
      copy._id = 4;

      const response = await supertest(app.getHttpServer())
        .put('/books')
        .send(copy);

      expect(response.status).toBe(500);
    });

    it('유효성 검사 실패', async () => {
      const copy = structuredClone(updateBook);
      copy.price = -1;

      const response = await supertest(app.getHttpServer())
        .put('/books')
        .send(copy);

      expect(response.status).toBe(400);
    });
  });

  describe('Post Method Test', () => {
    it('Success', async () => {
      const response = await supertest(app.getHttpServer())
        .post('/books')
        .send(newBook);

      expect(response.status).toBe(201);
    });

    it('유효성 검사 실패', async () => {
      const copy = structuredClone(updateBook);
      copy.price = -1;

      const response = await supertest(app.getHttpServer())
        .post('/books')
        .send(copy);

      expect(response.status).toBe(500);
    });
  });
});
