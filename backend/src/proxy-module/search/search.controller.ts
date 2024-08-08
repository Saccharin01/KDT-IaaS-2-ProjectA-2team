import { Controller } from '@nestjs/common';
import { ProxyController } from '../../proxy/class/ProxyController';
import { ProxyService } from '../../proxy/proxy.service';
import { ConfigService } from '@nestjs/config';
import { PROXY_PATH } from '../../static/ProxyPath';

@Controller(PROXY_PATH.SEARCH)
export class SearchController extends ProxyController {
  constructor(
    public readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    super(configService.get('SEARCH_SERVICE_HOST'), proxyService);
  }
}
