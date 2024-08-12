import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from '@shared/schemas/payment.schema';
import { Model, Types } from 'mongoose';
import { PaymentDto, PaymentDtoIncludeId } from '@shared/dto/payment.dto';
import mongoose from 'mongoose';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,
  ) {}

  getPayments() {
    return this.paymentModel.find().select('-__v').lean();
  }

  async updatePayment(paymentDto: PaymentDtoIncludeId) {
    const { _id, date, ...anotherField } = paymentDto;
    let dateObj: Date | string;

    const objectId = new Types.ObjectId(_id);

    if (date === '') {
      dateObj = new Date();
    } else {
      dateObj = date;
    }

    try {
      const updatedPayment = await this.paymentModel
        .findByIdAndUpdate(
          objectId,
          { date: dateObj, ...anotherField },
          {
            new: true,
            runValidators: true,
          },
        )
        .select('-__v')
        .lean();

      if (!updatedPayment) {
        throw new NotFoundException(`Book with ID ${_id} not found`);
      }

      return updatedPayment;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        // 데이터 유효성 검사 실패 시 처리
        throw new BadRequestException(
          'Validation failed: ' + JSON.stringify(error.errors),
        );
      }
      // 그 외의 에러 처리
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async createPayment(paymentDto: PaymentDto) {
    const { date, ...anotherField } = paymentDto;
    let dateObj: Date | string;
    if (date === '') {
      dateObj = new Date();
    } else {
      dateObj = date;
    }

    try {
      const result = await this.paymentModel.create({
        date: dateObj,
        ...anotherField,
      });

      const obj = result.toObject();
      delete obj.__v;

      return obj;
    } catch (error) {
      //* 유효성 검사가 실패
      if (error instanceof mongoose.Error.ValidationError) {
        throw new BadRequestException(
          'Validation failed: ' + JSON.stringify(error.errors),
        );
      } else {
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }
}
