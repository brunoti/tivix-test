import Router from '@koa/router';
import Koa from 'koa';
import { Context } from 'types';

import * as GamerController from './game-controller';

const router = new Router<Koa.DefaultState, Context>();

router.get('/games', GamerController.list);
router.get('/games/:id', GamerController.get);

export { router as GameRouter };
