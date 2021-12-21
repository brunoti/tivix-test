/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthorizeResponse } from 'domain/authorization/authorization-service';
import { ParameterizedContext } from 'koa';

export type UnknownObject<T = unknown> = Record<string, T>;
export type ExtraContext<P = UnknownObject> = { params: P, igdb: AuthorizeResponse & { when: Date } };
export type Context<P = UnknownObject> = ParameterizedContext<UnknownObject, ExtraContext<P>>;
export type PaginableParams = { page: number, size: number };
export type Converter<T> = (value: any) => T | null;
export type WithToken<T> = T & {token: string}
export type WithPage<T> = T & PaginableParams
