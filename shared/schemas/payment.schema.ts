import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PaymentDocument = Payment & Document;

@Schema({ collection: "Payments" })
export class Payment {
  @Prop({ required: true })
  user_id: string;
  @Prop({ required: true })
  book_id: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  amount: number;
  @Prop({ required: true })
  order_date: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
