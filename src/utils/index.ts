export const safeParseInt = (maybeNumber: string): number => {
  const num = parseInt(maybeNumber);
  if (isNaN(num)) {
    throw new Error(`Not a number: ${maybeNumber}`);
  }
  return num;
};
