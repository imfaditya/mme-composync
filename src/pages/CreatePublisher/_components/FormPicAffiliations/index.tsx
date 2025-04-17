import { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Add, Trash } from 'iconsax-reactjs';
import toast from 'react-hot-toast';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Dropdown } from '@/components/Dropdown';
import { Input } from '@/components/Input';
import { SectionTitle } from '@/components/SectionTitle';

import {
  picAffiliationDefaultValue,
  PicAffiliationForm,
  picAffiliationSchema,
} from '@/schemas/picAffiliationSchema';

import {
  CapacityOptions,
  GenderOptions,
  MechanicalSocietyOptions,
  PerformanceSocietyOptions,
  SynchronizationSocietyOptions,
} from '@/constants/Options';
import {
  defaultErrorToastOptions,
  defaultSuccessToastOptions,
} from '@/constants/ToastOption';

import { setPicAffiliations } from '@/stores/publisherSlice';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';

import { PicMobilePhoneFields } from '../PicMobilePhoneFields';
import { Action } from '../Action';

interface FormPicAffiliationsProps {
  handlePrev: () => void;
}

export const FormPicAffiliations: React.FC<FormPicAffiliationsProps> = ({
  handlePrev,
}) => {
  const picAffiliationDataFromRedux = useAppSelector(
    (state) => state.publisher.picAffiliations
  );
  const isPublisherInfoValid = useAppSelector(
    (state) => state.publisher.validPublisherInfo
  );
  const dispatch = useAppDispatch();

  const { control, handleSubmit, reset } = useForm<PicAffiliationForm>({
    resolver: zodResolver(picAffiliationSchema),
    defaultValues: picAffiliationDefaultValue,
  });

  const {
    append: appendPic,
    remove: removePic,
    fields: fieldsPic,
    replace: replacePic,
  } = useFieldArray({
    control,
    name: 'pic',
  });

  useEffect(() => {
    reset(picAffiliationDataFromRedux);
    replacePic(
      picAffiliationDataFromRedux.pic.map((pic) => ({
        ...pic,
        phoneNumbers: pic.phoneNumbers.map((phoneNumber) => ({
          ...phoneNumber,
        })),
      }))
    );
  }, [picAffiliationDataFromRedux, reset, replacePic]);

  const handleAddPic = () => {
    appendPic({
      email: '',
      gender: '',
      name: '',
      phoneNumbers: [{ value: '' }],
      role: '',
    });
  };

  const onSubmit = (data: PicAffiliationForm) => {
    if (!isPublisherInfoValid) {
      toast.error(
        'Please Fill In The Publisher Info First',
        defaultErrorToastOptions
      );
      return;
    }
    dispatch(setPicAffiliations(data));
    toast.success('All Data Has Been Saved', defaultSuccessToastOptions);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pt-5 px-5 pb-[30px] flex flex-col lg:flex-row gap-[30px] [&>*]:flex-1 border-b border-primary-100">
        {/* PIC Section */}
        <div>
          <SectionTitle title="PIC" />
          <div className="flex flex-col mt-5 gap-5">
            {fieldsPic.map((item, index) => {
              const isFirstField = index === 0;

              return (
                <Card
                  className="overflow-clip border-primary-200"
                  key={item.id}
                >
                  <p className="bg-primary-50 flex justify-between border-b border-primary-200 rounded-t-md text-primary-900 py-[20.5px] font-semibold px-[30px] leading-[18px]">
                    PIC {index + 1}
                    {!isFirstField && (
                      <Trash
                        size={18}
                        className="text-error-500 cursor-pointer"
                        onClick={() => removePic(index)}
                      />
                    )}
                  </p>
                  <div className="grid grid-cols-2 gap-5 pt-5 px-5 pb-[30px]">
                    <Controller
                      control={control}
                      name={`pic.${index}.name`}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Input
                          placeholder="e.g. CV Sinar Mulya"
                          label="Name"
                          required
                          containerClassName="col-span-2 md:col-span-1"
                          onChange={onChange}
                          value={value}
                          errorMessage={error?.message}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`pic.${index}.role`}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Input
                          placeholder="e.g. CV Sinar Mulya"
                          label="Role"
                          required
                          containerClassName="col-span-2 md:col-span-1"
                          onChange={onChange}
                          value={value}
                          errorMessage={error?.message}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`pic.${index}.gender`}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Dropdown
                          label="Gender"
                          required
                          placeholder="Select Gender"
                          options={GenderOptions}
                          onSelect={onChange}
                          selectedValue={value}
                          errorMessage={error?.message}
                          containerClassName="col-span-2 md:col-span-1"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`pic.${index}.email`}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Input
                          label="Email"
                          required
                          placeholder="e.g. CV Sinar Mulya"
                          containerClassName="col-span-2 md:col-span-1"
                          onChange={onChange}
                          value={value}
                          errorMessage={error?.message}
                        />
                      )}
                    />

                    <PicMobilePhoneFields control={control} index={index} />
                  </div>
                </Card>
              );
            })}
          </div>
          <Button
            variant="primary-outline"
            className="flex items-center text-[13px] gap-[5px] h-[40px] px-[12px] py-0 mt-5"
            onClick={handleAddPic}
          >
            <Add size={18} className="text-secondary-600" />
            <p className="text-secondary-600 text-[13px] leading-[14px] font-normal">
              Add Another PIC
            </p>
          </Button>
        </div>

        {/* Affiliation Section */}
        <div>
          <SectionTitle title="Affiliations" />
          <div className="flex flex-col gap-5 mt-5">
            <Controller
              control={control}
              name="capacity"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Dropdown
                  options={CapacityOptions}
                  label="Capacity"
                  placeholder="Select Capacity"
                  required
                  onSelect={onChange}
                  selectedValue={value}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="performanceSocietyAffiliation"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Dropdown
                  options={PerformanceSocietyOptions}
                  label="Performance Society Affiliation"
                  placeholder="Select Performance Society Affiliation"
                  required
                  onSelect={onChange}
                  errorMessage={error?.message}
                  selectedValue={value}
                />
              )}
            />
            <Controller
              control={control}
              name="mechanicalSocietyAffiliation"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Dropdown
                  options={MechanicalSocietyOptions}
                  label="Mechanical Society Affiliation"
                  placeholder="Select Mechanical Society Affiliation"
                  required
                  onSelect={onChange}
                  errorMessage={error?.message}
                  selectedValue={value}
                />
              )}
            />

            <Controller
              control={control}
              name="SynchronizationSocietyAffiliation"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Dropdown
                  options={SynchronizationSocietyOptions}
                  label="Synchronization Society Affiliation"
                  placeholder="Select Synchronization Society Affiliation"
                  required
                  onSelect={onChange}
                  errorMessage={error?.message}
                  selectedValue={value}
                />
              )}
            />
          </div>
        </div>
      </div>
      <Action isFirstStep={false} isLastStep={true} prevAction={handlePrev} />
    </form>
  );
};
