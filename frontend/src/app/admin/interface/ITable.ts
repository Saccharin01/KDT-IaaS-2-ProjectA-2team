export type HeaderFilter = "text" | "range" | "select"

export interface ITableHeader {
  [column : string] : [string, HeaderFilter]
}

export const bookHeader: ITableHeader = {
  _id: ["Id", "range"],
  title: ["Title", "text"],
  author: ["Author", "text"],
  price: ["Price", "range"],
  genre: ["Genre", "select"],
  publisher: ["Publisher", "select"],
  introduce: ["Introduce", "text"],
  hashtags: ["Hashtags", "text"],
  stock_quantity: ["Stock Quantity", "range"],
  arrival_date: ["Arrival Date", "text"],
  remain_stock: ["Remain Stock", "range"],
  sold_stock: ["Sold Stock", "range"]
};
