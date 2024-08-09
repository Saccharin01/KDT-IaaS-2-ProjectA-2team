import { Controller } from '@nestjs/common';
import { ProxyController } from '../../proxy/class/ProxyController';
import { ProxyService } from '../../proxy/proxy.service';
import { ConfigService } from '@nestjs/config';
import { PROXY_PATH } from '../../static/ProxyPath';

@Controller(PROXY_PATH.AUTH)
export class AuthController extends ProxyController {
  constructor(
    public readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    super(configService.get('AUTH_SERVICE_HOST'), proxyService);
  }
}
