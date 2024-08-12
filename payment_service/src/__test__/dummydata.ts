import { PaymentDto } from '@shared/dto/payment.dto';

export const dummyPaymentDto: PaymentDto = {
  book_id: 1,
  user_id: '안녕',
  price: 22000,
  address: 'test',
  payment: 'test',
  amount: 1,
  date: new Date().toISOString(),
};

export const dummyBook = {
  _id: 1,
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  price: 10.99,
  genre: 'Fiction',
  publisher: 'Scribner',
  stock_quantity: 100,
  introduce: 'A novel set in the Jazz Age on Long Island.',
  remain_stock: 100,
  sold_stock: 0,
  arrival_date: new Date(),
  hashtags: ['init'],
};
