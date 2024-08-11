import { Body, Logger, Post, Put } from '@nestjs/common';
import { ProxyService } from 'src/proxy/proxy.service';
import { Get, Param, Query, Headers } from '@nestjs/common';

export class ProxyController {
  host: string;
  protected readonly logger = new Logger(ProxyController.name);

  constructor(
    host: string | undefined,
    public proxyService: ProxyService,
  ) {
    if (host === undefined) throw new Error('Host undefined');
    this.host = host;
  }

  buildUrl(path: string | undefined, query: any): string {
    const encodedPath =
      path !== undefined
        ? path.split('/').map(encodeURIComponent).join('/')
        : '';
    const queryString = new URLSearchParams(query).toString();
    return `${this.host}/${encodedPath}${queryString ? '?' + queryString : ''}`;
  }

  //* Get 요청
  @Get([':basePath*',''])
  getProxy(
    @Param('basePath') basePath: string,
    @Param() params: Record<string, any>,
    @Query() query: any,
    @Headers() headers: Record<string, string>,
  ) {
    const path = basePath ? basePath : '';
    const remainingPath = params[0] ? params[0] : '';
    const fullPath = path + remainingPath;

    const url = this.buildUrl(fullPath, query);
    return this.proxyService.proxyGetRequest(url, headers);
  }

  //* Post 요청
  @Post([':basePath*', ''])
  postProxy(
    @Param('basePath') basePath: string,
    @Param() params: Record<string, any>,
    @Query() query: any,
    @Body() data: unknown,
    @Headers() headers: Record<string, string>,
  ) {
    const path = basePath ? basePath : '';
    const remainingPath = params[0] ? params[0] : '';
    const fullPath = path + remainingPath;

    const url = this.buildUrl(fullPath, query);
    return this.proxyService.proxyPostRequest(url, data, headers);
  }

  //* Put 요청
  @Put([':basePath*', ''])
  putProxy(
    @Param('basePath') basePath: string,
    @Param() params: Record<string, any>,
    @Query() query: any,
    @Body() data: unknown,
    @Headers() headers: Record<string, string>,
  ) {
    const path = basePath ? basePath : '';
    const remainingPath = params[0] ? params[0] : '';
    const fullPath = path + remainingPath;

    const url = this.buildUrl(fullPath, query);
    return this.proxyService.proxyPutRequest(url, data, headers);
  }
}
