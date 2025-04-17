import { useCallback, useEffect, useState } from 'react';

import { Option } from '@/types/option';

import { getDistricts } from '@/apis/addressApi/district';

export const useDistrictOptions = (idCity: string) => {
  const [districtOptions, setDistrictOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchDistricts = useCallback(async () => {
    if (!idCity) {
      setDistrictOptions([]);
      return;
    }
    setIsLoading(true);
    getDistricts(idCity)
      .then((res) => {
        setDistrictOptions(
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
  }, [idCity]);

  useEffect(() => {
    fetchDistricts();
  }, [fetchDistricts]);

  return {
    districtOptions,
    isLoading,
    isError,
  };
};
