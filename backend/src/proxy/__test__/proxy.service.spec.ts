import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse, AxiosHeaders } from 'axios';
import { of, throwError } from 'rxjs';
import { ProxyService } from '../proxy.service';
import { HttpException } from '@nestjs/common';

describe('ProxyService', () => {
  let service: ProxyService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProxyService,
        {
          //* get, post mock
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProxyService>(ProxyService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('Proxy Service Get 체크', () => {
    it('should return data on successful GET request', async () => {
      const result = { data: 'test' };
      const response: AxiosResponse = {
        data: result,
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders(),
        config: {
          headers: new AxiosHeaders(),
        },
      };

      //* observe 객체를 반환할 수 있게 of를 감싸준다.
      //* pipe로 읽어 결과를 반환할 수 있게한다.
      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

      expect(await service.proxyGetRequest('http://test.com', {})).toBe(result);
    });

    it('Proxy Service Get 예외처리', async () => {
      const errorResponse = {
        response: {
          data: 'error',
          status: 400,
          statusText: 'Bad Request',
          headers: {},
          config: {},
        },
      };

      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => throwError(() => errorResponse));

      await expect(
        service.proxyGetRequest('http://test.com', {}),
      ).rejects.toThrow(new HttpException('error', 400));
    });
  });

  describe('proxyPostRequest', () => {
    it('should return data on successful POST request', async () => {
      const result = { data: 'test' };
      const response: AxiosResponse = {
        data: result,
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders(),
        config: {
          headers: new AxiosHeaders(),
        },
      };

      jest
        .spyOn(httpService, 'post')
        .mockImplementationOnce(() => of(response));

      expect(await service.proxyPostRequest('http://test.com', {}, {})).toBe(
        result,
      );
    });

    it('should throw HttpException on POST request error', async () => {
      const errorResponse = {
        response: {
          data: 'error',
          status: 400,
          statusText: 'Bad Request',
          headers: {},
          config: {},
        },
      };

      jest
        .spyOn(httpService, 'post')
        .mockImplementationOnce(() => throwError(() => errorResponse));

      await expect(
        service.proxyPostRequest('http://test.com', {}, {}),
      ).rejects.toThrow(new HttpException('error', 400));
    });
  });
});
