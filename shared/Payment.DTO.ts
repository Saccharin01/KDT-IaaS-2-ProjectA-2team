export default interface Payment {
  user_id: string;
  book_id: string;
  price: number;
  address: string;
  amount: number;
  order_date: Date;
}