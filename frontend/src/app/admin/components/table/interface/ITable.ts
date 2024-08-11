export type HeaderFilter = "text" | "range" | "select" | "array"

export interface ITableHeader {
  [column : string] : [string, HeaderFilter]
}

export type TableHeader<T> = Partial<Record<keyof T, [string, HeaderFilter]>>;