import { Test, TestingModule } from '@nestjs/testing';
import { configOptions } from '@shared/config/env.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('환경변수 제대로 읽어오는지 테스트를 시작합니다.', () => {
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(configOptions)],
    }).compile();

    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  it('환경 변수 테스트', () => {
    expect(configService).toBeDefined();

    // 예시로 설정 옵션 중 하나를 테스트합니다.
    const someConfigValue = configService.get<string>('DATABASE_HOST');
    expect(someConfigValue).toEqual(
      'mongodb+srv://<username>:<password>@cluster0.mmiiheq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    );
  });
});
