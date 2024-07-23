import { Injectable } from "@nestjs/common";
// import mongoose from "mongoose";
// import { BookSchema } from "../modules/Schema";
import { SearchDTO, SearchResponse , BookDTO} from "@shared/SearchDTO";
import { BookModel } from 'src/modules/Model';


// todo 몽구스에서 제공하는 메서드를 이용해봐야 함.
// todo search 서비스 상 데이터베이스에서 특정 정보를 검색 해보오는 로직은 많이 쓰일 것. 그렇다면 해당 부분을 모듈로 분리해야 할 것 같음.


@Injectable()
export class SearchService{
  
  searchBooks = async (query: string): Promise<SearchResponse> => {
    // const model = mongoose.model(modelName, BookSchema, modelName);
    const searchRegex = new RegExp(query, 'i'); // 대소문자 구분 없이 검색
    
    try {
      const data = await BookModel.find({ title: { $regex: searchRegex } }).exec();
      console.log('Found data:', data);
      return {incomeData: data};
    } catch (err) {
      console.error('Error fetching books:', err);
      throw err; // 에러 발생 시 프로미스를 reject 상태로 만듭니다.
    }
  };
}

