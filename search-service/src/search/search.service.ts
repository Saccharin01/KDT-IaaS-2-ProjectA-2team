import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SearchResponse, BookDTO } from '@shared/SearchDTO';
import { Book } from '@shared/schemas/book.schema';
import { Model } from 'mongoose';
/**
 * search 컨트롤러에서 라우팅 된 메서드의 비즈니스 로직을 정의하는 서비스.
 * 컨트롤러에서 @query 데코레이터로 처리한 쿼리스트링의 값이 넘어오고, 해당 값을 인자로
 * mongoose를 이용해 데이터베이스에서 검색 및 반환.
 */
@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDTO>) {}

  searchBooks = async (query: string): Promise<SearchResponse> => {
    const searchRegex = new RegExp(query, 'i'); // 대소문자 구분 없이 검색

    try {
      const data = await this.bookModel
        .find({ title: { $regex: searchRegex } })
        .exec();
      console.log('Found data:', data);
      return { incomeData: data };
    } catch (err) {
      console.error('Error fetching books:', err);
      throw err; // 에러 발생 시 프로미스를 reject 상태로 만듭니다.
    }
  };
}
