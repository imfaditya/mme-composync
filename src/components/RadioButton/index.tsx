import clsx from 'clsx';

import { Option } from '@/types/option';

interface RadioButtonProps {
  label?: string;
  errorMessage?: string;
  required?: boolean;
  options: Option[];
  selectedValue?: string | null;
  onSelect?: (value: string) => void;
  className?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  errorMessage,
  required,
  selectedValue,
  onSelect,
  options,
  className,
}) => {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      {label && (
        <p className="text-primary-900 text-[13px] leading-[13px] font-medium">
          {label} {required && <span className="text-error-500">*</span>}{' '}
        </p>
      )}
      <div className="flex gap-5 h-[40px]">
        {options?.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              type="button"
              className="flex gap-1.5 items-center"
              onClick={() => onSelect?.(option.value)}
              key={option.value}
            >
              <div className="w-[18px] h-[18px] bg-white border border-primary-300 p-0.5 rounded-full">
                <div
                  className={clsx(
                    'w-full h-full rounded-full',
                    isSelected && 'bg-secondary-600'
                  )}
                />
              </div>
              <p className="text-primary-800 text-[13px] leading-[14px]">
                {option.label}
              </p>
            </button>
          );
        })}
      </div>

      {errorMessage && (
        <p className="text-[11px] leading-[13px] text-error-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
