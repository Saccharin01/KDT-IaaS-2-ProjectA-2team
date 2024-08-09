import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { ProxyModule } from '../../../proxy/proxy.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configOptions } from '@shared/config/env.config';

describe('AdminController', () => {
  let controller: AuthController;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProxyModule, ConfigModule.forRoot(configOptions)],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Host Property Test', () => {
    expect(controller.host).toBe(configService.get('AUTH_SERVICE_HOST'));
  });
});
