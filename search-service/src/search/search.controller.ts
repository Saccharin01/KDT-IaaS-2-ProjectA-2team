import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDTO } from "@shared/SearchDTO"




@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // ? /search/books?{someQuery} = {UserInputQuery}
  
  @Get('books')
  Result(@Query('title') query: string) {
    this.searchService.searchBooks(query)
    .then(data => data)
  }
}
