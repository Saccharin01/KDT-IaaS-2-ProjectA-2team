export function IsStringRecord(value: object): value is Record<string, string> {
  return typeof value === 'object' && Object.values(value).every(v => typeof v === 'string');
}