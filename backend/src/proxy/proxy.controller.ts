import {
  Controller,
  Post,
  Body,
  Headers,
  Query,
  Get,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { ProxyService } from './proxy.service';
import LoginDTO from '@shared/dto/loginDTO';
import PaymentDTO from '@shared/dto/paymentDTO';
import { ConfigService } from '@nestjs/config';

@Controller()
export class ProxyController {
  constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * * 만약 http://localhost:3000/auth/login?name=John&age=30 으로 요청이 왔을 떄
   * * @Param('path') : 경로의 특정 부분을 변수로 받아 처리할 수 있게 함. 여기서는 :path 부분을 추출하여 path 변수에 저장 (login)
   * * @Query() : URL의 쿼리 문자열 부분을 객체로 받아 처리할 수 있게 함.  { name: 'John', age: '30' }가 된다.
   * * @Body() : 요청의 본문(body)을 추출하여 메서드 인자로 전달합니다. 또한, ValidationPipe를 사용하여 데이터 유효성을 검사
   * * ValidationPipe : forbidNonWhitelisted : 허용되지 않은 속성이 존재하면 요청이 거부되고 오류가 발생.
   * * @Headers() : 클라이언트가 보낸 HTTP 헤더를 객체로 받아 처리할 수 있게 함
   * @param path : 경로
   * @param query : 쿼리문의 객체
   * @param data : LoginDTO만 허용
   * @param headers : 요청 헤더
   * @returns 서비스에서 받은 응답
   */
  @Post('auth/:path')
  async proxyPostAuth(
    @Param('path') path: string,
    @Query() query: any,
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    data: LoginDTO,
    @Headers() headers: Record<string, string>,
  ) {
    const url = this.buildUrl('auth', path, query);
    return this.proxyService.proxyPostRequest(url, data, headers);
  }

  @Get('search/:path')
  async proxyGetSearch(
    @Param('path') path: string,
    @Query() query: any,
    @Headers() headers: any,
  ) {
    const url = this.buildUrl('search', path, query);
    return this.proxyService.proxyGetRequest(url, headers);
  }

  @Get('payments/:path')
  async proxyGetPayment(
    @Param('path') path: string,
    @Query() query: any,
    @Headers() headers: any,
  ) {
    const url = this.buildUrl('payments', path, query);
    return this.proxyService.proxyGetRequest(url, headers);
  }

  @Post(['payments', 'payments/:path'])
  async proxyPostPayment(
    @Param('path') path: string,
    @Query() query: any,
    @Body(new ValidationPipe({ forbidNonWhitelisted: true }))
    data: PaymentDTO,
    @Headers() headers: Record<string, string>,
  ) {
    const url = this.buildUrl('payments', path, query);
    return this.proxyService.proxyPostRequest(url, data, headers);
  }

  private buildUrl(
    service: string,
    path: string | undefined,
    query: any,
  ): string {
    const baseUrl = this.getServiceUrl(service);
    const encodedPath =
      path !== undefined
        ? path.split('/').map(encodeURIComponent).join('/')
        : '';
    const queryString = new URLSearchParams(query).toString();
    return `${baseUrl}/${encodedPath}${queryString ? '?' + queryString : ''}`;
  }

  // 서비스 URL을 반환하는 메서드입니다.
  getServiceUrl(service: string): string {
    switch (service) {
      case 'auth':
        return this.configService.get('AUTH_SERVICE_HOST');
      case 'payments':
        return this.configService.get('PAYMENT_SERVICE_HOST');
      case 'search':
        return this.configService.get('SEARCH_SERVICE_HOST');
      // 다른 서비스 추가 가능
      default:
        throw new Error('Unknown service');
    }
  }
}
