import { Test, TestingModule } from '@nestjs/testing';
import { ProxyService } from '../proxy.service';
import { ProxyController } from '../proxy.controller';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from '@shared/config/env.config';
import { ConfigService } from '@nestjs/config';
import nock from 'nock';
import LoginDTO from '@shared/dto/loginDTO';
import PaymentDTO from '@shared/dto/paymentDTO';
import { HttpModule } from '@nestjs/axios';

describe('Proxy Controller Test', () => {
  let proxyController: ProxyController;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(configOptions), HttpModule],
      providers: [ProxyService, ProxyController],
    }).compile();

    proxyController = module.get<ProxyController>(ProxyController);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('getServiceUrl Method 테스트', () => {
    it('auth url 테스트', () => {
      expect(proxyController.getServiceUrl('auth')).toBeDefined();
      expect(proxyController.getServiceUrl('search')).toBeDefined();
      expect(proxyController.getServiceUrl('payments')).toBeDefined();
    });
  });

  describe('Auth 요청시 테스트', () => {
    it('Post 요청 시', async () => {
      const result = { success: true };
      const loginDTO: LoginDTO = { _id: 'test', password: 'test' };
      const headers = { 'Content-Type': 'application/json' };
      nock(configService.get('AUTH_SERVICE_HOST'))
        .post('/login', JSON.stringify(loginDTO))
        .reply(200, result);

      expect(
        await proxyController.proxyPostAuth(
          'login',
          undefined,
          loginDTO,
          headers,
        ),
      ).toStrictEqual(result);
    });
  });

  describe('Search 요청시 테스트', () => {
    it('Get 요청 시', async () => {
      const result = { success: true };

      nock(configService.get('SEARCH_SERVICE_HOST'))
        .get('/search')
        .reply(200, result);

      expect(
        await proxyController.proxyGetSearch('search', undefined, undefined),
      ).toStrictEqual(result);
    });
  });

  describe('Payment 요청시 테스트', () => {
    it('Get 요청 시', async () => {
      const result = { success: true };

      nock(configService.get('PAYMENT_SERVICE_HOST'))
        .get('/payments')
        .reply(200, result);

      expect(
        await proxyController.proxyGetPayment('payments', undefined, undefined),
      ).toStrictEqual(result);
    });

    it('Post 요청 시', async () => {
      const result = { success: true };
      const payment: PaymentDTO = {
        user_id: '1111',
        book_id: 2222,
        address: '안녕',
        payment: '카드',
        price: 1111,
        amount: 3333,
      };
      const headers = { 'Content-Type': 'application/json' };

      nock(configService.get('PAYMENT_SERVICE_HOST'))
        .post('/payments', JSON.stringify(payment))
        .reply(200, result);

      expect(
        await proxyController.proxyPostPayment(
          'payments',
          undefined,
          payment,
          headers,
        ),
      ).toStrictEqual(result);
    });
  });
});
