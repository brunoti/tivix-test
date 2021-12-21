export const tap = (k: string) => <T>(b: T): T => {
  console.log(k, b);
  return b;
};
