import Router from '@koa/router';
import Koa from 'koa';
import { Context } from 'types';
import { ensurePaginableQuery } from 'utils/guard';
import { ensureString } from 'utils/guard/ensure-string';
import * as GameService from './game-service';

export const list: Router.Middleware<Koa.DefaultState, Context> = async (context) => {
  const pagination = ensurePaginableQuery(context.query);
  const result = await GameService.list({
    token: context.igdb.accessToken,
    page: pagination.page,
    size: pagination.size,
    search: ensureString(context.query.search),
  });
  context.body = result;
  context.status = 200;
};

export const get: Router.Middleware<Koa.DefaultState, Context<{ id: number }>> = async (context) => {
  const result = await GameService.get({
    token: context.igdb.accessToken,
    id: context.params.id,
  });
  context.body = result[0];
  context.status = 200;
};
