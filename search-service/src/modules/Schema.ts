import { Schema } from 'mongoose';


export const BookSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  author: { type: String},
  publisher: { type: String},
  genre: { type: String},
  price: { type: Number, required: true },
  explanation: { type: String},
  stock: { type: Number, required: true },
});
