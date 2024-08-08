import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from '../search.controller';
import { ProxyModule } from '../../../proxy/proxy.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configOptions } from '@shared/config/env.config';

describe('SearchController', () => {
  let controller: SearchController;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProxyModule, ConfigModule.forRoot(configOptions)],
      controllers: [SearchController],
    }).compile();

    controller = module.get<SearchController>(SearchController);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Host Property Test', () => {
    expect(controller.host).toBe(configService.get('SEARCH_SERVICE_HOST'));
  });
});
