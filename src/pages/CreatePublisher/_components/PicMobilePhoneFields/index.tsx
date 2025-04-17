import { Control, Controller, useFieldArray } from 'react-hook-form';

import { PicAffiliationForm } from '@/schemas/picAffiliationSchema';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import clsx from 'clsx';
import { Add, Trash } from 'iconsax-reactjs';

interface PicMobilePhoneFieldsProps {
  control: Control<PicAffiliationForm>;
  index: number;
}

export const PicMobilePhoneFields: React.FC<PicMobilePhoneFieldsProps> = ({
  control,
  index,
}) => {
  const { append, remove, fields } = useFieldArray({
    control,
    name: `pic.${index}.phoneNumbers`,
  });

  const handleActionPhoneNumber = (index: number, isFirstField: boolean) => {
    if (isFirstField) {
      append({ value: '' });
    } else {
      remove(index);
    }
  };

  return (
    <div className="flex flex-col gap-5 col-span-2">
      {fields?.map((item, indexPhoneNumber) => {
        const isFirstField = indexPhoneNumber === 0;
        return (
          <Controller
            control={control}
            name={`pic.${index}.phoneNumbers.${indexPhoneNumber}.value`}
            key={item.id}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="flex items-end gap-5 col-span-2">
                <Input
                  label={indexPhoneNumber === 0 ? 'Phone Number' : undefined}
                  placeholder="e.g 81234567890"
                  type="number"
                  required
                  prefixContent="phone"
                  containerClassName="w-full"
                  onChange={onChange}
                  value={value}
                  errorMessage={error?.message}
                />
                <Button
                  onClick={() =>
                    handleActionPhoneNumber(indexPhoneNumber, isFirstField)
                  }
                  variant={isFirstField ? 'primary-outline' : 'danger-outline'}
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
  );
};
