import { AddressResponse, BackendResponse } from '@/types/api';

import addressApiInstance from './instance';

export const getSubDistricts = async (idDistrict: string) => {
  return addressApiInstance.get<BackendResponse<AddressResponse[]>>(
    '/kelurahan/get/',
    {
      params: {
        d_kecamatan_id: idDistrict,
      },
    }
  );
};
