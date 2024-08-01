import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from '@shared/schemas/book.schema';
import { Model } from 'mongoose';
import { BookDto } from '@shared/dto/book.dto';
import mongoose from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async getBooks(): Promise<BookDto[]> {
    return await this.bookModel.find().select('-__v').lean();
  }

  async updateBook(bookDto: BookDto): Promise<BookDto> {
    const { _id, ...anotherField } = bookDto;
    try {
      const updatedBook = await this.bookModel
        .findByIdAndUpdate(_id, anotherField, {
          new: true,
          runValidators: true,
        })
        .select('-__v')
        .lean();

      if (!updatedBook) {
        throw new NotFoundException(`Book with ID ${_id} not found`);
      }

      return updatedBook;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        // 데이터 유효성 검사 실패 시 처리
        throw new BadRequestException('Invalid data format');
      }
      // 그 외의 에러 처리
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
