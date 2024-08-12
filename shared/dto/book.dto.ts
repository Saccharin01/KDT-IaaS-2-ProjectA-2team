export interface BookDto {
  _id: number;
  title: string;
  author: string;
  price: number;
  genre: string;
  publisher: string;
  stock_quantity: number;
  introduce: string;
  hashtags: string[]; 
  arrival_date: string; 
  sold_stock: number; 
}