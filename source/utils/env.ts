/* eslint-disable @typescript-eslint/no-explicit-any */
import { pipe } from 'utils/function';
import * as dotenv from 'dotenv';

dotenv.config();

const available = {
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
  TWITCH_SECRET: process.env.TWITCH_SECRET,
};

type Env = keyof typeof available;
type Converter<T> = (value: any) => T | null;

const optionalNumber: Converter<number> = (value: any) => {
  const casted = Number(value);
  if (Number.isNaN(casted)) {
    return null;
  }

  return casted as number;
};

const optionalString: Converter<string> = (value: any) => {
  if (typeof value === 'string') {
    return value as string;
  }

  return null;
};

const optionalBoolean: Converter<boolean> = (value: any) => {
  if (value === true || value === false) {
    return value as boolean;
  }

  return null;
};

function as<T>(key: Env, convert: Converter<T>) {
  const current = available[key];
  return pipe(
    current,
    convert,
  );
}

const asNumber = (key: Env): number | null => as<number>(key, optionalNumber);
const asString = (key: Env): string | null => as<string>(key, optionalString);
const asBoolean = (key: Env): boolean | null => as<boolean>(key, optionalBoolean);

export { asNumber, asString, asBoolean };
