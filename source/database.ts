import * as env from 'utils/env';
import { pipe } from 'utils/function';
import { defaultTo } from 'rambda';
import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const database: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  port: pipe(env.asNumber('DB_PORT'), defaultTo(5432)),
  host: pipe(env.asString('DB_HOST'), defaultTo('127.0.0.1')),
  username: pipe(env.asString('DB_USER'), defaultTo('')),
  password: pipe(env.asString('DB_PASSWORD'), defaultTo('')),
  database: pipe(env.asString('DB_NAME'), defaultTo('')),
  entities: [
    'source/domain/**/*-entity.ts',
  ],
  migrations: [],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
};

export = database;
