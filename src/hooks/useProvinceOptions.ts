import { useCallback, useEffect, useState } from 'react';

import { getProvinces } from '@/apis/addressApi/province';

import { Option } from '@/types/option';

export const useProvinceOptions = () => {
  const [provinceOptions, setProvinceOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchProvinces = useCallback(async () => {
    setIsLoading(true);
    getProvinces()
      .then((res) => {
        setProvinceOptions(
          res?.data?.result?.map((province) => ({
            label: province.text,
            value: province.id,
          }))
        );
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

  return {
    provinceOptions,
    isLoading,
    isError,
  };
};
