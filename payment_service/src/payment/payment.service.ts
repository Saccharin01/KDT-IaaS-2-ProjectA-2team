import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from '@shared/schemas/payment.schema';
import { Model } from 'mongoose';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private readonly PaymenyModel: Model<PaymentDocument>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async testgetHello(): Promise<PaymentDocument[]> {
    const data = this.PaymenyModel.find().exec();

    return data;
  }
}
