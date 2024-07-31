import { BookDTO } from '@shared/SearchDTO';
import { Schema } from 'mongoose';


export const BookSchema = new Schema<BookDTO>({
  _id: { type: Number, required: true },
  title: { type: String, required: true },
  author: { type: String },
  price: { type: Number, required: true },
  genre: { type: String },
  publisher: { type: String },
  introduce: { type: String },
  hashtags: { type: String, required: true },
  arrival_date: { type: Number },
  stock_quantity: { type: Number },
  Remain_stock: { type: Number },
  Sold_stock: { type: Number }
});
