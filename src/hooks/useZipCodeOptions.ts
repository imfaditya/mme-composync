import { useCallback, useEffect, useState } from 'react';

import { Option } from '@/types/option';

import { getZipCodes } from '@/apis/addressApi/zipCode';

export const useZipCodeOptions = (idCity: string, idDistrict: string) => {
  const [zipCodeOptions, setZipCodeOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchZipCodes = useCallback(async () => {
    if (!idDistrict || !idCity) {
      setZipCodeOptions([]);
      return;
    }
    setIsLoading(true);
    getZipCodes(idCity, idDistrict)
      .then((res) => {
        setZipCodeOptions(
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
  }, [idDistrict, idCity]);

  useEffect(() => {
    fetchZipCodes();
  }, [fetchZipCodes]);

  return {
    zipCodeOptions,
    isLoading,
    isError,
  };
};
