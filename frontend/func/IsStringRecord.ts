/**
 * * 황재민
 * * 유저 타입 가드
 * * 사용이유는 객체는 Record<string, string>으로 타입을 좁힌다(타입스크립트에서 중요한 개념, 꼭 공부하도록).
 * @param value 
 * @returns 
 */
export function IsStringRecord(value: object): value is Record<string, string> {
  return typeof value === 'object' && Object.values(value).every(v => typeof v === 'string');
}

//! Recrod<sring, string> 이란?
/**
 * const obj = {
 *  [key : string] : string,
 * }
 */