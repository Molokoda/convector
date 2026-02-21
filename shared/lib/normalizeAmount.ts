export function normalizeAmountInput(
  value: string,
  maxDigits: number = 10,
): string {
  if (value === '') return '';
  let s = value.replace(',', '.');
  s = s.replace(/[^\d.]/g, '');
  const dotIndex = s.indexOf('.');
  let before = dotIndex === -1 ? s : s.slice(0, dotIndex);
  const after =
    dotIndex === -1
      ? ''
      : s
          .slice(dotIndex + 1)
          .replace(/\D/g, '')
          .slice(0, 2);
  if (before.length > maxDigits) before = before.slice(0, maxDigits);
  if (dotIndex === -1) return before;
  const result = after.length ? `${before}.${after}` : `${before}.`;
  return result === '.' ? '' : result;
}
