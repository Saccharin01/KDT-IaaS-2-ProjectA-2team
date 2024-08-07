import { ProxyService } from '../../proxy.service';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from '@shared/config/env.config';
import nock from 'nock';
import request from 'supertest';
import { HttpModule } from '@nestjs/axios';
import { TestController } from './TestController';

describe('ProxyController', () => {
  let app: INestApplication;
  //let configService: ConfigService;
  const mockResponse = { token: 'mock-token' };
  const serverUrl = 'http://example.com';
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(configOptions), HttpModule],
      controllers: [TestController],
      providers: [ProxyService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('GET 테스트', async () => {
    nock(serverUrl)
      .get('/test')
      .query({ redirect: 'dashboard' })
      .reply(200, mockResponse);

    const response = await request(app.getHttpServer())
      .get('/test?redirect=dashboard')
      .send();

    expect(response.body).toEqual(mockResponse);
  });

  /**
   * * POST로 요청을 보내, 요청 데이터의 본문 확인, 응답 데이터 본문 확인
   */
  it('POST 테스트', async () => {
    //* 요청받는 데이터가 맞는지 확인하고, Return
    nock(serverUrl)
      .post('/test')
      .query({ redirect: 'dashboard' })
      .reply(200, (uri, requestBody) => {
        expect(requestBody).toEqual(mockResponse);
        return mockResponse;
      });

    const response = await request(app.getHttpServer())
      .post('/test?redirect=dashboard')
      .send(mockResponse);

    //* 응답받은 데이터가 맞는지 확인
    expect(response.body).toEqual(mockResponse);
  });

  /**
   * * PUT로 요청을 보내, 요청 데이터의 본문 확인, 응답 데이터 본문 확인
   */
  it('PUT 테스트', async () => {
    //* 요청받는 데이터가 맞는지 확인하고, Return
    nock(serverUrl)
      .put('/test')
      .query({ redirect: 'dashboard' })
      .reply(200, (uri, requestBody) => {
        expect(requestBody).toEqual(mockResponse);
        return mockResponse;
      });

    const response = await request(app.getHttpServer())
      .put('/test?redirect=dashboard')
      .send(mockResponse);

    //* 응답받은 데이터가 맞는지 확인
    expect(response.body).toEqual(mockResponse);
  });
});
