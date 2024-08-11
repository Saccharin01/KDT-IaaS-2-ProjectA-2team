import { Body, Controller, Post, ParseArrayPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { PaymentDto } from '@shared/dto/payment.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //* 데이터 저장 중 오류가 발생되면 HttpException trow 된다.
  //! 배열 유효성검사
  @Post()
  async processPayment(
    @Body(
      new ParseArrayPipe({
        forbidNonWhitelisted: true,
        whitelist: true,
        items: PaymentDto,
      }),
    )
    arrPaymentDto: PaymentDto[],
  ) {
    await this.appService.saveOrder(arrPaymentDto);
    return;
  }
}
