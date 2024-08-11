import { TableHeader } from "../components/table/interface/ITable";
import { IFieldType } from "../components/table/interface/IField";
import { BookDto } from "@shared/dto/book.dto";

export const bookHeader: TableHeader<BookDto> = {
  _id: ["Id", "range"],
  title: ["Title", "text"],
  author: ["Author", "text"],
  price: ["Price", "range"],
  genre: ["Genre", "select"],
  publisher: ["Publisher", "select"],
  // introduce: ["Introduce", "text"],
  hashtags: ["Hashtags", "array"],
  stock_quantity: ["Stock Quantity", "range"],
  arrival_date: ["Arrival Date", "text"],
  remain_stock: ["Remain Stock", "range"],
  sold_stock: ["Sold Stock", "range"],
};

export const bookField: IFieldType = {
  title: "string",
  author: "string",
  price: "number",
  genre: "string",
  publisher: "string",
  introduce: "string",
  hashtags: "arr_string",
  stock_quantity: "number",
  arrival_date: "date",
  remain_stock: "number",
  sold_stock: "number",
};
