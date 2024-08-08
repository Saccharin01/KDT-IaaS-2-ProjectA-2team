import { Controller } from '@nestjs/common';
import { ProxyController } from '../../proxy/class/ProxyController';
import { ProxyService } from '../../proxy/proxy.service';
import { ConfigService } from '@nestjs/config';
import { PROXY_PATH } from '../../static/ProxyPath';

@Controller(PROXY_PATH.ADMIN)
export class AdminController extends ProxyController {
  constructor(
    public readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    super(configService.get('ADMIN_SERVICE_HOST'), proxyService);
  }
}
