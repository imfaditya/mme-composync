import { AddressResponse, BackendResponse } from '@/types/api';

import addressApiInstance from './instance';

export const getDistricts = async (idCity: string) => {
  return addressApiInstance.get<BackendResponse<AddressResponse[]>>(
    '/kecamatan/get/',
    {
      params: {
        d_kabkota_id: idCity,
      },
    }
  );
};
