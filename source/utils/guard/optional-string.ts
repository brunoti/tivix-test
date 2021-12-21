import { Converter } from 'types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const optionalString: Converter<string> = (value: any) => {
  if (typeof value === 'string') {
    return value as string;
  }

  return null;
};
