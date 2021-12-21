import { asString as getEnvAsString } from 'utils/env';
import { AuthorizationClient } from './authorization-client';

export type AuthorizeResponse = {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
};

export const authorize = (): Promise<AuthorizeResponse> => AuthorizationClient.request<AuthorizeResponse>({
  method: 'POST',
  url: '/token',
  params: {
    client_id: getEnvAsString('TWITCH_CLIENT_ID'),
    client_secret: getEnvAsString('TWITCH_SECRET'),
    grant_type: 'client_credentials',
  },
})
  .then(({ data }) => data);
