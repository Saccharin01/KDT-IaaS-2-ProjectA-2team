import { Document } from "mongoose";


 interface base {
  _id : number;
  title : string;
  author? : string;
  price: number;
  genre? : string;
  publisher? : string;
  explanation? : string;
  stock : number;  
}




export interface BookDTO extends Document{
  _id : number;
  title : string;
  author? : string;
  price: number;
  genre? : string;
  publisher? : string;
  introduce? : string;
  hashtags: string;
  arrival_date?: number;
  stock_quantity : number;
  Remain_stock?: number
  Sold_stock?: number
}

export interface SearchResponse {
  incomeData: BookDTO[]
}

export default base



