import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from '../admin.controller';
import { ProxyModule } from '../../../proxy/proxy.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configOptions } from '@shared/config/env.config';

describe('AdminController', () => {
  let controller: AdminController;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProxyModule, ConfigModule.forRoot(configOptions)],
      controllers: [AdminController],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Host Property Test', () => {
    expect(controller.host).toBe(configService.get('ADMIN_SERVICE_HOST'));
  });
});
