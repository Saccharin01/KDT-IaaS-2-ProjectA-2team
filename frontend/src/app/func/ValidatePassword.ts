export function ValidatePassword(password: string) {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
  return passwordRegex.test(password);
}