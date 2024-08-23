export type HeaderFilter = "text" | "range" | "select" | "array"

export interface ITableHeader {
  [column : string] : [string, HeaderFilter]
}

/**
 * * 황재민
 * * T는 객체가 들어온다.
 * * TableHeader는 [객체의 키(ㅅ)]
 */
export type TableHeader<T> = Partial<Record<keyof T, [string, HeaderFilter]>>