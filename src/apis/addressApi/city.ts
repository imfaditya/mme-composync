import { AddressResponse, BackendResponse } from '@/types/api';

import addressApiInstance from './instance';

export const getCities = async (idProvince: string) => {
  return addressApiInstance.get<BackendResponse<AddressResponse[]>>(
    '/kabkota/get/',
    {
      params: {
        d_provinsi_id: idProvince,
      },
    }
  );
};
