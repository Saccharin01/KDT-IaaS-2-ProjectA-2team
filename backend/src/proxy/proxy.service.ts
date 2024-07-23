import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse, AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  private logger = new Logger(ProxyService.name);

  constructor(private readonly httpService: HttpService) {}

  //* GET 요청을 처리하는 메서드
  async proxyGetRequest(url: string, headers: Record<string, string>) {
    //* HTTP GET 요청을 보내고 응답을 기다립니다. firstValueFrom으로 Observable을 Promise로 변환합니다.
    const response: AxiosResponse = await firstValueFrom(
      this.httpService.get(url, { headers }).pipe(
        //* 에러처리
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new HttpException(
            error.response?.data || 'An error happened!',
            error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      ),
    );
    return response.data;
  }

  //* POST 요청을 처리하는 메서드
  async proxyPostRequest(
    url: string,
    data: any,
    headers: Record<string, string>,
  ) {
    const response = await firstValueFrom(
      this.httpService.post(url, data, { headers }).pipe(
        //* 에러처리
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new HttpException(
            error.response?.data || 'An error happened!',
            error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      ),
    );
    return response.data;
  }
}
