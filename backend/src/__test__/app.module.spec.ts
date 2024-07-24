import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
// import { ProxyService } from '../proxy.service';
import request from 'supertest';
import LoginDTO from '@shared/dto/loginDTO';
import nock from 'nock';
import { ConfigService } from '@nestjs/config';
import PaymentDTO from '@shared/dto/paymentDTO';
import { AppModule } from '../app.module';

describe('Proxy Module 통합 테스트', () => {
  let app: INestApplication;
  let configService: ConfigService;
  //let proxyService: ProxyService;
  const mockResponse = { token: 'mock-token' };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true }));

    await app.init();

    //proxyService = module.get<ProxyService>(ProxyService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(async () => {
    await nock.cleanAll();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth Url 테스트', () => {
    const loginDTO: LoginDTO = { _id: 'testuser', password: 'password123' };
    // const headers = { 'content-Type': 'application/json' };

    it('Post Test', async () => {
      nock(configService.get('AUTH_SERVICE_HOST'))
        .post('/login', JSON.stringify(loginDTO))
        .query({ redirect: 'dashboard' }) // 쿼리 매개변수 추가
        .reply(200, mockResponse);

      const response = await request(app.getHttpServer())
        .post('/auth/login?redirect=dashboard')
        .send(loginDTO)
        .set('Content-Type', 'application/json');
      // .expect(201);

      expect(response.body).toEqual(mockResponse);
    });
  });

  describe('Search Url 테스트', () => {
    it('Get Test', async () => {
      nock(configService.get('SEARCH_SERVICE_HOST'))
        .get('/books')
        .query({ redirect: 'dashboard' })
        .reply(200, mockResponse);

      const response = await request(app.getHttpServer())
        .get('/search/books?redirect=dashboard')
        .send();

      expect(response.body).toEqual(mockResponse);
    });
  });

  describe('Payment Url 테스트', () => {
    it('Get Test', async () => {
      nock(configService.get('PAYMENT_SERVICE_HOST'))
        .get('/history')
        .query({
          userId: '{userId}',
          startDate: '{startDate}',
          endDate: '{endDate}',
        })
        .reply(200, mockResponse);

      const response = await request(app.getHttpServer())
        .get(
          '/payments/history?userId={userId}&startDate={startDate}&endDate={endDate}',
        )
        .send();

      expect(response.body).toEqual(mockResponse);
    });

    it('POST / Test', async () => {
      const payment: PaymentDTO = {
        user_id: 'test',
        book_id: 1,
        amount: 1,
        address: 'test',
        price: 1000,
        payment: 'test',
      };

      nock(configService.get('PAYMENT_SERVICE_HOST'))
        .post('/')
        .reply(200, mockResponse);

      const response = await request(app.getHttpServer())
        .post('/payments')
        .send(payment)
        .set('Content-Type', 'application/json');

      expect(response.body).toEqual(mockResponse);
    });

    it('POST /refund Test', async () => {
      const payment: PaymentDTO = {
        user_id: 'test',
        book_id: 1,
        amount: 1,
        address: 'test',
        price: 1000,
        payment: 'test',
      };

      nock(configService.get('PAYMENT_SERVICE_HOST'))
        .post('/refund')
        .reply(200, mockResponse);

      const response = await request(app.getHttpServer())
        .post('/payments/refund')
        .send(payment)
        .set('Content-Type', 'application/json');

      expect(response.body).toEqual(mockResponse);
    });
  });
});
