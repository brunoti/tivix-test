import { defaultTo } from 'rambda';
import { pipe } from 'utils/function';
import { optionalString } from './optional-string';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ensureString = (value: any): string => pipe(value, optionalString, defaultTo(''));
