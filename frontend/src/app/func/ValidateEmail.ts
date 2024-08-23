/**
 * * 황재민
 * * 정규식을 통해 이메일 검증
 * @param email 
 * @returns 
 */
export function ValidateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
