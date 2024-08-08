export type HeaderFilter = "text" | "range" | "select" | "array"

export interface ITableHeader {
  [column : string] : [string, HeaderFilter]
}

