import { ITableHeader, TableHeader } from "../components/table/interface/ITable";
import { IFieldType } from "../components/table/interface/IField";
import { PaymentDto } from "@shared/dto/payment.dto";

export const paymentHeader: TableHeader<PaymentDto> = {
  //_id: ["Id", "range"],
  user_id: ["UserId", "text"],
  book_id: ["BookId", "text"],
  price: ["Price", "range"],
  // introduce: ["Introduce", "text"],
  payment: ["Payment", "text"],
  amount: ["Amount", "range"],
  date: ["Date", "text"],
  address: ["Address", "text"]
};

export const paymentField: IFieldType = {
  user_id: 'string',
  book_id: 'number',
  price: 'number',
  payment: 'string',
  amount: 'number',
  date: 'date',
  address: 'string'
};
