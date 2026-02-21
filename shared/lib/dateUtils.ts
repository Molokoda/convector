export function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getTodayDateString(): string {
  return toDateString(new Date());
}
