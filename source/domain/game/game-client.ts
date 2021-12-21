import { asString as getEnvAsString } from 'utils/env';
import apicalypse from 'apicalypse';

export const makeGameClient = ({ token }: { token: string }) => apicalypse({
  queryMethod: 'body',
  method: 'post',
  baseURL: 'https://api.igdb.com/v4',
  headers: {
    Accept: 'application/json',
    'Client-ID': getEnvAsString('TWITCH_CLIENT_ID'),
    Authorization: `Bearer ${token}`,
  },
  responseType: 'json',
  timeout: 3000,
});
