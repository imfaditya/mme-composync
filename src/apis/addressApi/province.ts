import { AddressResponse, BackendResponse } from '@/types/api';

import addressApiInstance from './instance';

export const getProvinces = async () => {
  return addressApiInstance.get<BackendResponse<AddressResponse[]>>(
    '/provinsi/get'
  );
};
