export function ValidatePhoneNumber(phoneNumber: string): boolean {
  const phoneRegex = /^(01[016789]{1})-[0-9]{3,4}-[0-9]{4}$/;
  return phoneRegex.test(phoneNumber);
}
