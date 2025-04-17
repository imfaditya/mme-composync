import { AddressResponse, BackendResponse } from '@/types/api';

import addressApiInstance from './instance';

export const getZipCodes = async (idCity: string, idDistrict: string) => {
  return addressApiInstance.get<BackendResponse<AddressResponse[]>>(
    '/kodepos/get/',
    {
      params: {
        d_kabkota_id: idCity,
        d_kecamatan_id: idDistrict,
      },
    }
  );
};
