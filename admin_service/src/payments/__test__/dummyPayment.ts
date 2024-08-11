import { PaymentDto } from "@shared/dto/payment.dto";

export const dummyPaymentDto: PaymentDto = {
  user_id: "test",
  book_id: 1,
  address: 'testAddress',
  amount: 1,
  price: 1000,
  date: new Date().toISOString(),
  payment: 'card',
}