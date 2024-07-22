import { Injectable } from "@nestjs/common";

// todo 몽구스에서 제공하는 메서드를 이용해봐야 함.
// todo search 서비스 상 데이터베이스에서 특정 정보를 검색 해보오는 로직은 많이 쓰일 것. 그렇다면 해당 부분을 모듈로 분리해야 할 것 같음.



@Injectable()
export class SearchService{
  searchBooks(query : string){

    return "test"
  }
}