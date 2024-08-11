import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PaymentDto } from '@shared/dto/payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from '@shared/schemas/payment.schema';
import { Model, Error } from 'mongoose';
import { Book, BookDocument } from '@shared/schemas/book.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async saveOrder(arrPaymentDto: PaymentDto[]) {
    try {
      const result = await Promise.all(
        arrPaymentDto.map((payment) => this.paymentModel.create(payment)),
      );

      await Promise.all(
        arrPaymentDto.map((payment) =>
          this.bookModel.findByIdAndUpdate(payment.book_id, {
            $inc: { sold_stock: payment.amount },
          }),
        ),
      );

      return result;
    } catch (error) {
      //* 유효성 검사가 실패
      if (error instanceof Error.ValidationError) {
        throw new BadRequestException(
          'Validation failed: ' + JSON.stringify(error.errors),
        );
      } else {
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }
}
