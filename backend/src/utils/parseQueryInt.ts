export const parseQueryInt = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  defaultValue: number,
  maxValue?: number
) => {
  const parsed = parseInt(value);
  if (isNaN(parsed) || parsed <= 0) return defaultValue;
  return maxValue ? Math.min(parsed, maxValue) : parsed;
};
