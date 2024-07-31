import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from '@shared/schemas/book.schema';
import { Model } from 'mongoose';
import { BookDto } from '@shared/dto/book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async getBooks(): Promise<BookDto[]> {
    return await this.bookModel.find().select('-__v').lean();
  }
}
