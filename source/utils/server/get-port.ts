import { Server } from 'node:http';
import { isAddressInfo } from 'utils/guard';

export const getPort = (server: Server): string => {
  const result = server.address();
  if (isAddressInfo(result)) {
    return String(result.port);
  }
  return 'PORT_NOT_FOUND';
};
