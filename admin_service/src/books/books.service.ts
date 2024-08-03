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
import { pick } from 'lodash';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async getBooks() {
    return await this.bookModel.find().select('-__v').lean();
  }

  async updateBook(bookDto: BookDto) {
    const { _id, arrival_date, ...anotherField } = bookDto;
    let date: Date;

    if (arrival_date === '') {
      date = new Date();
    } else {
      date = new Date(arrival_date);
    }

    try {
      const updatedBook = await this.bookModel
        .findByIdAndUpdate(
          _id,
          { arrival_date: date, ...anotherField },
          {
            new: true,
            runValidators: true,
          },
        )
        .select('-__v')
        .lean();

      if (!updatedBook) {
        throw new NotFoundException(`Book with ID ${_id} not found`);
      }

      return updatedBook;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        // 데이터 유효성 검사 실패 시 처리
        throw new BadRequestException(
          'Validation failed: ' + JSON.stringify(error.errors),
        );
      }
      // 그 외의 에러 처리
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async createBook(bookDto: Omit<BookDto, '_id'>) {
    const { arrival_date, ...anotherField } = bookDto;
    let date: Date;
    if (arrival_date === '') {
      date = new Date();
    } else {
      date = new Date(arrival_date);
    }

    const lastBook = await this.bookModel.findOne({}).sort({ _id: -1 }).lean();
    const newId = lastBook._id ? lastBook._id + 1 : 1;

    try {
      //* 객체의 내부에 _doc 속성으로 실제 데이터가 저장

      const savedBook = new this.bookModel({
        _id: newId,
        arrival_date: date,
        ...anotherField,
      });

      //! _id필드를 따로 지정해줘야한다, 지정안해줄경우 빈 "" 값이 할당되어 에러가 발생한다.
      savedBook._id = newId;

      await savedBook.validate();
      await savedBook.save();

      return { _id: savedBook._id, ...pick(savedBook, Object.keys(bookDto)) };
    } catch (error) {
      //* 유효성 검사가 실패
      if (error instanceof mongoose.Error.ValidationError) {
        throw new BadRequestException(
          'Validation failed: ' + JSON.stringify(error.errors),
        );
      } else {
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }
}
