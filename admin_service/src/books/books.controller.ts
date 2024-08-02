import {
  Body,
  Controller,
  Get,
  ValidationPipe,
  Put,
  Post,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from '@shared/dto/book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  getBooks() {
    return this.bookService.getBooks();
  }

  @Put()
  updateBook(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true })) bookDto: BookDto,
  ) {
    return this.bookService.updateBook(bookDto);
  }

  @Post()
  createBook(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    bookDto: Omit<BookDto, '_id'>,
  ) {
    return this.bookService.createBook(bookDto);
  }
}
