import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ collection: 'order_lists' })
export class Payment {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true})
  book_id: number;

  @Prop({ required: true})
  payment: string;

  @Prop({ required: true})
  amount: number;

  @Prop({ required: true})
  price: number;

  @Prop({ required: true})
  address: string;

  @Prop({ required: true})
  date: Date
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
