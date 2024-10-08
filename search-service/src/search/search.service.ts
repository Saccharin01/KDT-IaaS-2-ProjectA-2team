import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  BookSearchQuery,
  BookSearchQueryFilter,
} from '@shared/query/bookSearch.query';
import { Book, BookDocument } from '@shared/schemas/book.schema';
import { Model } from 'mongoose';
import { ERR_MSG } from 'src/static/ERR_MSG';
/**
 * search 컨트롤러에서 라우팅 된 메서드의 비즈니스 로직을 정의하는 서비스.
 * 컨트롤러에서 @query 데코레이터로 처리한 쿼리스트링의 값이 넘어오고, 해당 값을 인자로
 * mongoose를 이용해 데이터베이스에서 검색 및 반환.
 */
@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  // searchBooksByTitle = async (query: string): Promise<SearchResponse> => {
  //   const searchRegex = new RegExp(query, 'i'); // 대소문자 구분 없이 검색

  //   try {
  //     const data = await this.bookModel
  //       .find({ title: { $regex: searchRegex } })
  //       .exec();
  //     // console.log('Found data:', data);
  //     return { incomeData: data };
  //   } catch (err) {
  //     console.error('Error fetching book by Title :', err);
  //     throw err; // 에러 발생 시 프로미스를 reject 상태로 만듭니다.
  //   }
  // };

  // searchBooksById = async (id: number): Promise<SearchResponse> => {
  //   try {
  //     // 숫자형 ID로 검색
  //     const data = await this.bookModel.findById({ _id: id }).exec();
  //     return { incomeData: data ? [data] : [] };
  //   } catch (err) {
  //     console.error('Error fetching book by ID :', err);
  //     throw new Error(`Error fetching book by ID :${err}`);
  //   }
  // };

  searchBooksByQuery(query: BookSearchQuery) {
    const { page } = query;

    //* 페이지 항목 수
    const limit = 10;
    const skip = (page - 1) * limit;

    const filterObj = BookSearchQueryFilter(query);

    try {
      return this.bookModel.find(filterObj).skip(skip).limit(limit).exec();
    } catch (error) {
      throw new HttpException(
        ERR_MSG.SEARCH_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
