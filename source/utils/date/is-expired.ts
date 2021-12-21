import {
  addSeconds,
  isBefore,
} from 'date-fns/fp';
import { pipe } from 'utils/function';

type BySecondsParams = { when: Date, from: Date, seconds: number, threshold?: number };
export const bySeconds = ({ when, from, seconds, threshold = 0 }: BySecondsParams): boolean => pipe(
  when,
  addSeconds(seconds - threshold),
  isBefore(from),
);
