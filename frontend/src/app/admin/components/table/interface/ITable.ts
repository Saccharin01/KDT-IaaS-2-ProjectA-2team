export type HeaderFilter = "text" | "range" | "select"

export interface ITableHeader {
  [column : string] : [string, HeaderFilter]
}

