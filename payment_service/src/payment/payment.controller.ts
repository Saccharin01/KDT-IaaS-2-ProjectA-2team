import { Controller, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly PaymentService: PaymentService) {}

  @Get()
  getHello(): string {
    return this.PaymentService.getHello();
  }
  @Get('/test')
  async getTest() {
    const data = await this.PaymentService.testgetHello();
    return { result: data };
  }
}
