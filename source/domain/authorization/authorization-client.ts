import axios from 'axios';
import { ensureCamelCaseInterceptor } from 'utils/axios';

export const AuthorizationClient = axios.create({
  baseURL: 'https://id.twitch.tv/oauth2',
  timeout: 3000,
});

AuthorizationClient.interceptors.response.use(ensureCamelCaseInterceptor);
