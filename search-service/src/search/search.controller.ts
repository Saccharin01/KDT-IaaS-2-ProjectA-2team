import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}




  // ? /search/books?{someQuery} = {UserInputQuery}
  
  @Get('books')
  SearchResult(@Query('someQuery') query: string) {
    return this.searchService.searchBooks(query);
  }
}
