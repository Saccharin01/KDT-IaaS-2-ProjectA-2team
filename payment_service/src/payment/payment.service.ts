import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from '@shared/schemas/payment.schema';
import { Book, BookDocument } from '@shared/schemas/book.schema';
import { User, UserDocument } from '@shared/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private readonly PaymentModel: Model<PaymentDocument>,
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
  async testgetHello(): Promise<PaymentDocument[]> {
    const data = await this.PaymentModel.find().exec();
    return data;
  }
  async getCommentsWithUsers(): Promise<any[]> {
    return this.PaymentModel.aggregate([
      {
        $lookup: {
          from: 'users', // 컬렉션 이름
          localField: 'userId', // Comment 문서의 필드
          foreignField: '_id', // User 문서의 필드
          as: 'user', // 결합 결과를 저장할 필드 이름
        },
      },
      {
        $unwind: '$user', // 배열에서 단일 문서로 변환
      },
    ]).exec();
  }
}
