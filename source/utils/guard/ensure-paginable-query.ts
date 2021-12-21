import { defaultTo } from 'rambda';
import { PaginableParams, UnknownObject } from 'types';
import { pipe } from 'utils/function';
import { optionalNumber } from './optional-number';

export const ensurePaginableQuery = (query: UnknownObject): PaginableParams => ({
  page: pipe(optionalNumber(query.page), defaultTo(1)),
  size: pipe(optionalNumber(query.size), defaultTo(50)),
});
