import { Body, Controller, Get, ValidationPipe, Put } from '@nestjs/common';
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
  updateBooks(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true })) bookDto: BookDto,
  ) {
    return this.bookService.updateBook(bookDto);
  }
}
