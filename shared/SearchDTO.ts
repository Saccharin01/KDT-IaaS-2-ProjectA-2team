import { Document } from "mongoose";

export interface BookDTO extends Document {
    _id : number;
    title : string;
    author? : string;
    price: number;
    genre? : string;
    publisher? : string;
    explanation? : string;
    stock : number;
}

export interface SearchResponse {
  incomeData: BookDTO[]
}


