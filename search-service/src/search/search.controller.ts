import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
/**
 * 프록시 서버에서 라우팅 된 로직을 분배하는 컨트롤러
 * * "baseURL"/search/books?title={"userInputQuery"}
 * 쿼리스트링의 key인 title이 하드 코딩 되어있기 때문에 해당 부분에 대한
 * 방법 강구 필요.
 */
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('books')
  getHello(@Query('title') query: string) {
    return this.searchService.searchBooks(query);
  }
}
