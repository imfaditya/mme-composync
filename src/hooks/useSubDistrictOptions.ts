import { useCallback, useEffect, useState } from 'react';

import { Option } from '@/types/option';

import { getSubDistricts } from '@/apis/addressApi/subDistrict';

export const useSubDistrictOptions = (idDistrict: string) => {
  const [subDistrictOptions, setSubDistrictOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchDistricts = useCallback(async () => {
    if (!idDistrict) {
      setSubDistrictOptions([]);
      return;
    }
    setIsLoading(true);
    getSubDistricts(idDistrict)
      .then((res) => {
        setSubDistrictOptions(
          res?.data?.result?.map((city) => ({
            label: city.text,
            value: city.id,
          }))
        );
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [idDistrict]);

  useEffect(() => {
    fetchDistricts();
  }, [fetchDistricts]);

  return {
    subDistrictOptions,
    isLoading,
    isError,
  };
};
