import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { BooksService } from '../books.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Book, BookDocument, BookSchema } from '@shared/schemas/book.schema';
import mongoose, { Model } from 'mongoose';
import { BookDto } from '@shared/dto/book.dto';

describe('BooksService', () => {
  let service: BooksService;
  let mongodb: MongoMemoryServer;
  let bookModel: Model<BookDocument>;

  const bookArrayData: BookDto[] = [
    {
      _id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 10.99,
      genre: 'Fiction',
      publisher: 'Scribner',
      stock_quantity: 100,
      introduce: 'A novel set in the Jazz Age on Long Island.',
      remain_stock: 100,
      sold_stock: 0,
      arrival_date: new Date('2024-07-23T00:00:00Z'),
      hashtags: 'init',
    },
    {
      _id: 2,
      title: '1984',
      author: 'George Orwell',
      price: 8.99,
      genre: 'Dystopian',
      publisher: 'Secker & Warburg',
      stock_quantity: 50,
      introduce: 'A novel about a dystopian future under totalitarian rule.',
      remain_stock: 50,
      sold_stock: 0,
      arrival_date: new Date('2024-07-23T00:00:00Z'),
      hashtags: 'bye',
    },
    {
      _id: 3,
      title: 'To Kill a Mockingbird',
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
    },
  ];

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
});
