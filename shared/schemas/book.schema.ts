import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BookDocument = Book & Document;

@Schema({ collection: "books_info" })
export class Book {
  @Prop({ required: true })
  _id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({
    required: true,
    //* 음수 금지
    min: 0,
  })
  price: number;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  publisher: string;

  @Prop({ required: true })
  introduce: string;

  @Prop({ required: true })
  hashtags: string[];

  @Prop({
    required: true,
    min: 0,
  })
  stock_quantity: number;

  @Prop({ required: true })
  arrival_date: Date;

  @Prop({
    required: true,
    min: 0,
  })
  remain_stock: number;

  @Prop({
    required: true,
    min: 0,
  })
  sold_stock: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
