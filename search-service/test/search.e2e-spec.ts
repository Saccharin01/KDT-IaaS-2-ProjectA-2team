import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'; // 기본 import 방식으로 수정
import { SearchModule } from '../src/search/search.module'; // `search.module.ts`의 경로가 올바른지 확인

describe('SearchService E2E Tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SearchModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('/books?title=알아두면 (GET) - should return books data', async () => {
  //   const response = await request(app.getHttpServer())
  //     .get('/books?title=알아두면') // 쿼리 파라미터를 URL에 직접 추가
  //     .expect(200);
    
  //   // 실제 응답 형식에 맞게 조정
  //   expect(response.body).toEqual({
  //     incomeData: [
  //       {
  //         Remain_stock: 0,
  //         Sold_stock: 0,
  //         Stock_quantity: 3000,
  //         _id: 2407194,
  //         arrival_date: "2024-07-23T00:00:00.000Z",
  //         author: "찰스 브라메스코 저자(글)",
  //         genre: "예술/대중문화",
  //         introduce: "",
  //         price: 17820,
  //         publisher: "오브제",
  //         title: "알아두면 쓸모 있는 클래식 잡학사전",
  //       }
  //     ]
  //   });
  // });

  it('/books/2407196 (GET) - should return book details', async () => {
    const response = await request(app.getHttpServer())
      .get('/books/2407196') // 경로에 ID를 포함한 요청
      .expect(200);
    
    // 실제 응답 형식에 맞게 조정
    expect(response.body).toEqual({ 
      incomeData: [
        {
          _id: 2407196,
          title: "그림 속 보석 이야기",
          author: "민은미 저자(글)",
          publisher: "제이앤제이제이(디지털북스)",
          genre: "예술/대중문화",
          price: 19800,
          introduce: "주얼리는 인류 역사가 흐르는 동안 늘 사람과 함께 해왔다. 이 책은 우리에게 레오나르도 다빈치에서 클림트까지 주얼리로 그림을 읽는 시간 여행을 하게 해준다.",
          hashtags: [
            "#예술",
            "#디자인",
            "#보석",
            "#주얼리",
            "#이니셜",
            "#역사"
          ],
          arrival_date: "2024-07-23T00:00:00.000Z",
          Stock_quantity: 3000,
          Remain_stock: 0,
          Sold_stock: 0,
        }
      ]
    });
  });

  afterAll(async () => {
    await app.close(); // NestJS 애플리케이션 종료
  });
});
