import {
  Controller,
  Get,
  Put,
  Post,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentDto, PaymentDtoIncludeId } from '@shared/dto/payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  @Get()
  getPayments() {
    return this.paymentService.getPayments();
  }

  @Put()
  updateBook(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    paymentDto: PaymentDtoIncludeId,
  ) {
    return this.paymentService.updatePayment(paymentDto);
  }
  
  @Post()
  createBook(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    paymentDto: PaymentDto,
  ) {
    return this.paymentService.createPayment(paymentDto);
  }
}
