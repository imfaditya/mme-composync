import { useRef, useState } from 'react';
import { ArrowDown2 } from 'iconsax-reactjs';
import clsx from 'clsx';

import { Option } from '@/types/option';

import { Card } from '@/components/Card';

import { useClickOutside } from '@/hooks/useClickOutside';

interface DropdownProps {
  label: string;
  options: Option[];
  onSelect: (option: string) => void;
  selectedValue?: string;
  placeholder?: string;
  errorMessage?: string;
  required?: boolean;
  containerClassName?: string;
  emptyMessage?: string;
  isLoading?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
  selectedValue,
  placeholder,
  errorMessage,
  required,
  containerClassName,
  emptyMessage = 'No Options Available',
  isLoading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    onSelect(option.value);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useClickOutside(ref, () => {
    setIsOpen(false);
  });

  const displayLabel =
    options?.find((option) => option.value === selectedValue)?.label ?? '';

  return (
    <div className={clsx('flex flex-col gap-2', containerClassName)}>
      {label && (
        <p className="text-primary-900 text-[13px] leading-[13px] font-medium">
          {label} {required && <span className="text-error-500">*</span>}
        </p>
      )}
      <div className="relative" ref={ref}>
        <div
          className="relative flex items-center cursor-pointer"
          onClick={handleToggle}
        >
          <input
            readOnly
            value={displayLabel}
            placeholder={isLoading ? 'Loading...' : placeholder}
            className={clsx(
              'bg-neutral-0 w-full cursor-pointer pe-11 border border-primary-100 rounded-md h-[40px] px-[12px] text-[13px] leading-[14px] !text-primary-900 focus-visible:outline-none',
              isOpen && 'border-secondary-600'
            )}
          />
          <ArrowDown2 className="absolute right-3 text-primary-600" size={16} />
        </div>
        {isOpen && (
          <Card className="absolute z-10 mt-0.5 rounded-md w-full flex flex-col p-2.5 max-h-[190px] overflow-y-auto">
            {(options?.length === 0 || isLoading) && (
              <p className="text-[13px] leading-[14px] text-primary-800 py-2.5 text-center">
                {isLoading ? 'Fetching Data...' : emptyMessage}
              </p>
            )}

            {options?.map((option) => {
              const isSelected = selectedValue === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={clsx(
                    'text-[13px] leading-[14px] text-primary-800 py-2.5 px-5 rounded-md flex items-center justify-between hover:bg-primary-50/30',
                    isSelected && 'bg-primary-50 text-primary-900 font-medium'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <p>{option?.label}</p>
                  </div>
                </button>
              );
            })}
          </Card>
        )}
      </div>
      {errorMessage && (
        <p className="text-[11px] leading-[13px] text-error-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
