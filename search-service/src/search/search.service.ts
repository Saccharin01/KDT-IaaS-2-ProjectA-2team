import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SearchResponse, BookDTO } from '@shared/SearchDTO';
import { Model } from 'mongoose';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel('book_info') private readonly bookModel: Model<BookDTO>,
  ) {}

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
