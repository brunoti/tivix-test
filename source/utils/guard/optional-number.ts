import { identity, any as some } from 'rambda';
import { Converter } from 'types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const optionalNumber: Converter<number> = (value: any) => {
  const forcesNull = [typeof value === 'boolean', Array.isArray(value)];
  if (some(identity, forcesNull)) {
    return null;
  }

  const casted = Number(value);
  if (Number.isNaN(casted)) {
    return null;
  }

  return casted as number;
};
