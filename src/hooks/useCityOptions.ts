import { useCallback, useEffect, useState } from 'react';

import { Option } from '@/types/option';

import { getCities } from '@/apis/addressApi/city';

export const useCityOptions = (idProvince: string) => {
  const [cityOptions, setCityOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchCities = useCallback(async () => {
    if (!idProvince) {
      setCityOptions([]);
      return;
    }
    setIsLoading(true);
    getCities(idProvince)
      .then((res) => {
        setCityOptions(
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
  }, [idProvince]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  return {
    cityOptions,
    isLoading,
    isError,
  };
};
