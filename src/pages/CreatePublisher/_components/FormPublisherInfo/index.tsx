import { useEffect } from 'react';
import { Add, Trash } from 'iconsax-reactjs';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import toast from 'react-hot-toast';

import { Button } from '@/components/Button';
import { Dropdown } from '@/components/Dropdown';
import { Input } from '@/components/Input';
import { RadioButton } from '@/components/RadioButton';
import { SectionTitle } from '@/components/SectionTitle';

import {
  publisherInfoDefaultValues,
  PublisherInfoForm,
  publisherInfoSchema,
} from '@/schemas/publisherInfoSchema';

import { ControlOptions } from '@/constants/Options';

import { useProvinceOptions } from '@/hooks/useProvinceOptions';
import { useCityOptions } from '@/hooks/useCityOptions';
import { useDistrictOptions } from '@/hooks/useDistrictOptions';
import { useSubDistrictOptions } from '@/hooks/useSubDistrictOptions';
import { useZipCodeOptions } from '@/hooks/useZipCodeOptions';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

import { setPublisherInfo } from '@/stores/publisherSlice';

import {
  defaultErrorToastOptions,
  defaultSuccessToastOptions,
} from '@/constants/ToastOption';

import { Action } from '../Action';

interface FormPublisherInfoProps {
  handleNext: () => void;
}

export const FormPublisherInfo: React.FC<FormPublisherInfoProps> = ({
  handleNext,
}) => {
  const publisherDataFromRedux = useAppSelector(
    (state) => state.publisher.publisherInfo
  );
  const dispatch = useAppDispatch();

  const { control, handleSubmit, watch, reset, setValue } =
    useForm<PublisherInfoForm>({
      resolver: zodResolver(publisherInfoSchema),
      defaultValues: publisherDataFromRedux ?? publisherInfoDefaultValues,
    });

  const { provinceOptions, isLoading: loadingProvinces } = useProvinceOptions();
  const { cityOptions, isLoading: loadingCities } = useCityOptions(
    watch('province')
  );
  const { districtOptions, isLoading: loadingDistricts } = useDistrictOptions(
    watch('city')
  );
  const { subDistrictOptions, isLoading: loadingSubDistricts } =
    useSubDistrictOptions(watch('district'));
  const { zipCodeOptions, isLoading: loadingZipCodes } = useZipCodeOptions(
    watch('city'),
    watch('district')
  );

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'phoneNumbers',
  });

  useEffect(() => {
    reset(publisherDataFromRedux);
    replace(
      publisherDataFromRedux.phoneNumbers.map((item) => ({
        value: item.value,
      }))
    );
  }, [publisherDataFromRedux, reset, replace]);

  const handleActionPhoneNumber = (index: number, isFirstField: boolean) => {
    if (isFirstField) {
      append({ value: '' });
    } else {
      remove(index);
    }
  };

  const onSubmit = (data: PublisherInfoForm) => {
    dispatch(setPublisherInfo(data));
    if (data === publisherDataFromRedux) {
      toast.error('No Changes Detected', defaultErrorToastOptions);
      return;
    }
    toast.success('Publisher Info Has Been Saved', defaultSuccessToastOptions);
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pt-5 px-5 pb-[30px] flex flex-col gap-[30px] border-b border-primary-100">
        {/* General Section */}
        <div>
          <SectionTitle title="General" />
          <div className="flex items-start [&>*:nth-child(even)]:flex-1 md:[&>*:nth-child(odd)]:w-[150px] [&>*]:w-full md:flex-row flex-col gap-5 mt-5">
            <Controller
              control={control}
              name="control"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <RadioButton
                  options={ControlOptions}
                  label="Control"
                  required
                  onSelect={onChange}
                  selectedValue={value}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="publisherName"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input
                  label="Publisher Name"
                  required
                  placeholder="e.g. CV Sinar Mulya"
                  onChange={onChange}
                  value={value}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="publisherCode"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input
                  label="Publisher Code"
                  required
                  placeholder="e.g. ABC"
                  onChange={onChange}
                  value={value}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="ipiNumber"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input
                  optional
                  label="IPI Number"
                  placeholder="Must be 11 Digits"
                  type="number"
                  onChange={onChange}
                  value={value}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Contact & Address */}
        <div>
          <SectionTitle title="Contact & Address" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
            <div className="flex flex-col gap-5 col-span-2">
              {fields?.map((item, index) => {
                const isFirstField = index === 0;
                return (
                  <Controller
                    control={control}
                    name={`phoneNumbers.${index}.value`}
                    key={item.id}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <div className="flex items-end gap-5 col-span-2">
                        <Input
                          label={index === 0 ? 'Phone Number' : undefined}
                          placeholder="e.g 81234567890"
                          type="number"
                          prefixContent="phone"
                          required
                          containerClassName="w-full"
                          onChange={onChange}
                          value={value}
                          errorMessage={error?.message}
                        />
                        <Button
                          onClick={() =>
                            handleActionPhoneNumber(index, isFirstField)
                          }
                          variant={
                            isFirstField ? 'primary-outline' : 'danger-outline'
                          }
                          className={clsx(
                            'h-[40px] !px-[11px]',
                            error?.message && 'mb-[21px]'
                          )}
                        >
                          {isFirstField ? (
                            <Add size={18} className="text-secondary-600" />
                          ) : (
                            <Trash size={18} className="text-error-500" />
                          )}
                        </Button>
                      </div>
                    )}
                  />
                );
              })}
            </div>

            <Controller
              control={control}
              name="contactName"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input
                  containerClassName="col-span-2"
                  label="Contact Name"
                  required
                  placeholder="e.g Soleh Solihun"
                  onChange={onChange}
                  value={value}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input
                  type="email"
                  label="Email"
                  required
                  placeholder="e.g. johndoe123@gmail.com"
                  containerClassName="col-span-2"
                  onChange={onChange}
                  value={value}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="website"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input
                  label="Website"
                  optional
                  placeholder="Website Link"
                  prefixContent="website"
                  containerClassName="col-span-2"
                  onChange={onChange}
                  value={value}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="correspondenceAddress"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input
                  label="Correspondence Address"
                  required
                  placeholder="e.g. Jalan Kalibata Utara No. 2"
                  containerClassName="col-span-2"
                  onChange={onChange}
                  value={value}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="province"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Dropdown
                  options={provinceOptions}
                  label="Province"
                  placeholder="Select Province"
                  containerClassName="col-span-2 md:col-span-1"
                  required
                  onSelect={(value) => {
                    onChange(value);
                    setValue('city', '');
                    setValue('district', '');
                    setValue('subdistrict', '');
                    setValue('postalCode', '');
                  }}
                  selectedValue={value}
                  isLoading={loadingProvinces}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="city"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Dropdown
                  options={cityOptions}
                  label="City"
                  placeholder="Select City"
                  containerClassName="col-span-2 md:col-span-1"
                  required
                  onSelect={(value) => {
                    onChange(value);
                    setValue('district', '');
                    setValue('subdistrict', '');
                    setValue('postalCode', '');
                  }}
                  selectedValue={value}
                  errorMessage={error?.message}
                  isLoading={loadingCities}
                  emptyMessage={
                    watch('province') ? undefined : 'Select Province First'
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="district"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Dropdown
                  options={districtOptions}
                  label="District"
                  placeholder="Select District"
                  containerClassName="col-span-2 lg:col-span-1"
                  required
                  onSelect={(value) => {
                    onChange(value);
                    setValue('subdistrict', '');
                    setValue('postalCode', '');
                  }}
                  selectedValue={value}
                  errorMessage={error?.message}
                  isLoading={loadingDistricts}
                  emptyMessage={watch('city') ? undefined : 'Select City First'}
                />
              )}
            />
            <Controller
              control={control}
              name="subdistrict"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Dropdown
                  options={subDistrictOptions}
                  label="Subdistrict"
                  placeholder="Select Subdistrict"
                  containerClassName="col-span-2 lg:col-span-1"
                  onSelect={(value) => {
                    onChange(value);
                    setValue('postalCode', '');
                  }}
                  required
                  selectedValue={value}
                  errorMessage={error?.message}
                  isLoading={loadingSubDistricts}
                  emptyMessage={
                    watch('district') ? undefined : 'Select District First'
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="postalCode"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Dropdown
                  options={zipCodeOptions}
                  label="Postal Code"
                  placeholder="Select Postal Code"
                  containerClassName="col-span-2 lg:col-span-1"
                  onSelect={onChange}
                  required
                  selectedValue={value}
                  errorMessage={error?.message}
                  isLoading={loadingZipCodes}
                  emptyMessage={
                    watch('subdistrict')
                      ? undefined
                      : 'Select Subdistrict First'
                  }
                />
              )}
            />
            <div className="flex col-span-2 lg:col-span-1 gap-5 [&>*]:w-full">
              <Controller
                control={control}
                name="rt"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Input
                    label="RT"
                    placeholder="e.g. 001"
                    optional
                    onChange={onChange}
                    type="number"
                    value={value}
                    errorMessage={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="rw"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Input
                    label="RW"
                    placeholder="e.g. 002"
                    optional
                    type="number"
                    onChange={onChange}
                    value={value}
                    errorMessage={error?.message}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <Action isFirstStep={true} isLastStep={false} />
    </form>
  );
};
