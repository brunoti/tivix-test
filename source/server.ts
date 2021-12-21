import { createServer, Server } from 'node:http';
import { defaultTo } from 'rambda';
import * as env from 'utils/env';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import responseTime from 'koa-response-time';
import database from 'database';
import Router from '@koa/router';
import { pipe } from 'utils/function';
import { Context, UnknownObject } from 'types';
import { createConnection } from 'typeorm';
import consoleStamp from 'console-stamp';
import { authorize } from 'domain/authorization/authorization-service';
import axios from 'axios';
import { refreshTokenIfNeeded } from 'middlewares';
import { GameRouter } from 'domain/game';

type App = {
  server: Server;
  koa: Koa;
};

const router = new Router<UnknownObject, Context>();

router.get('/test', async (ctx) => {
  const data = await authorize();
  ctx.body = data;
  ctx.status = 200;
});

const useAll = (instance: Koa) => {
  const middlewares: Koa.Middleware<UnknownObject, Context<UnknownObject>>[] = [
    responseTime(),
    cors(),
    helmet(),
    bodyParser(),
    refreshTokenIfNeeded(),
  ];

  const routers: Router.Middleware<UnknownObject, Context<UnknownObject>>[] = [
    router.routes(),
    router.allowedMethods({ throw: true }),
    GameRouter.routes(),
    GameRouter.allowedMethods({ throw: true }),
  ];

  middlewares.forEach(m => instance.use(m));

  instance.use((ctx, next) => next().catch((error) => {
    console.error({ ...error });
    if (axios.isAxiosError(error) && error.response) {
      ctx.body = error.response.data;
      ctx.status = error.response.status;
    } else {
      ctx.body = { message: 'Unknown error', error: error.message };
      ctx.status = 500;
    }
  }));

  routers.forEach(m => instance.use(m));

  return instance;
};

const addTimestapsToConsole = (): void => consoleStamp(console, {
  format: ':date(yyyy-mm-dd HH:MM:ss) :label',
});

const server = (instance: Koa) => createServer(instance.callback());
const app = (): App => pipe(
  new Koa(),
  useAll,
  koa => ({ koa, server: server(koa) }),
);

const startServer = (app: App): Promise<App> => new Promise((resolve, reject) => {
  const port = pipe(env.asNumber('PORT'), defaultTo(3000));

  app.server.addListener('error', error => reject(error));
  app.server.addListener('listening', () => resolve(app));
  app.server.listen(port);
});

const connectWithDatabase = (app: App) => createConnection(database).then((connection) => {
  // eslint-disable-next-line no-param-reassign
  app.koa.context.db = connection;
});

const authorizeIgdb = (app: App) => authorize().then((data) => {
  // eslint-disable-next-line no-param-reassign
  app.koa.context.igdb = {
    ...data,
    when: new Date(),
  };
});

const start = async (app: App): Promise<App> => {
  addTimestapsToConsole();

  console.info('[AUTHORIZATION] GETTING TOKEN');
  await authorizeIgdb(app);
  console.info('[AUTHORIZATION] GOT TOKEN', JSON.stringify(app.koa.context.igdb, null, 2));

  console.info('[DATABASE] CONNECTING');
  await connectWithDatabase(app);
  console.info('[DATABASE] CONNECTED');

  return startServer(app);
};

export { start, app };
