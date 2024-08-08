export interface IFieldType {
  [key: string]: 'string' | 'number' | 'boolean' | 'date' | 'arr_string' | 'none'; // 각 필드의 타입 지정
}