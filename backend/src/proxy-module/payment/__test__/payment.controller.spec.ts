import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from '../payment.controller';
import { ProxyModule } from '../../../proxy/proxy.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configOptions } from '@shared/config/env.config';

describe('PaymentController', () => {
  let controller: PaymentController;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProxyModule, ConfigModule.forRoot(configOptions)],
      controllers: [PaymentController],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Host Property Test', () => {
    expect(controller.host).toBe(configService.get('PAYMENT_SERVICE_HOST'));
  });
});
