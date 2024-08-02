import { Controller, Get, Query, Param} from '@nestjs/common';
import { SearchService } from './search.service';
/**
 * 프록시 서버에서 라우팅 된 로직을 분배하는 컨트롤러
 * * "baseURL"/search/books?title={"userInputQuery"}
 * 쿼리스트링의 key인 title이 하드 코딩 되어있기 때문에 해당 부분에 대한
 * 방법 강구 필요.
 */

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  
  
  //* books/122012032192
  //! books1120121321564987 이런 식으로 들어옴 위의 경우가 아님


  
  @Get('books:id')
  searchBookById(@Param('id') id: string) {

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    // ID를 숫자로 변환
    const parsedNum = Number(id)
    console.log(parsedNum)
    return this.searchService.searchBooksById(parsedNum);
  }





  @Get('books')
  searchBookByTitle(@Query() query: string) {
    console.log(`응애ㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐ : ${query}`)

    // if(query.startsWith(""))
      return this.searchService.searchBooksByTitle(query);
  }

}
