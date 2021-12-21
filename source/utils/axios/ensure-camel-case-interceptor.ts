import { AxiosResponse } from 'axios';
import camelcaseKeysDeep from 'camelcase-keys-deep';

export const ensureCamelCaseInterceptor = <T extends object>(response: AxiosResponse<T>): AxiosResponse<T> => {
  response.data = camelcaseKeysDeep(response.data) as T;
  return response;
};
