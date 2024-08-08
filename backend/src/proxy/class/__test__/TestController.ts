import { Controller } from '@nestjs/common';
import { ProxyController } from '../ProxyController';
import { ProxyService } from '../../proxy.service';
import { ConfigService } from '@nestjs/config';

/**
 * ! JEST에 사용될 테스트 컨트롤러 사용 X
 */
@Controller()
export class TestController extends ProxyController {
  constructor(
    public readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    super('http://example.com', proxyService);
  }
}
