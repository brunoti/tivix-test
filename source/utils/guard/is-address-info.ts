import { AddressInfo } from 'node:net';

export const isAddressInfo = (address: string | AddressInfo | null): address is AddressInfo =>
  !!(address as AddressInfo).port
    && !!(address as AddressInfo).address
    && !!(address as AddressInfo).family;
