import { authorize } from 'domain/authorization/authorization-service';
import Koa from 'koa';
import { Context } from 'types';
import { isExpired } from 'utils/date';

export const refreshTokenIfNeeded = (): Koa.Middleware<Koa.DefaultState, Context> => async (ctx, next) => {
  const shouldRefresh = isExpired.bySeconds({
    when: ctx.igdb.when,
    seconds: ctx.igdb.expiresIn,
    from: new Date(),
  });

  console.info('[AUTHORIZATION] SHOULD REFRESH', shouldRefresh);

  if (shouldRefresh) {
    console.info('[AUTHORIZATION] REFRESHING...');
    const data = await authorize();
    ctx.igdb = {
      ...data,
      when: new Date(),
    };
    console.info('[AUTHORIZATION] REFRESHED TO:', JSON.stringify(data, null, 2));
  }

  await next();
};
