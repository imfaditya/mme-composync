import clsx from 'clsx';

interface InputProps {
  label?: string;
  errorMessage?: string;
  prefixContent?: 'phone' | 'website';
  optional?: boolean;
  containerClassName?: string;
  onChange?: (value: string) => void;
}

export const Input: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  label,
  errorMessage,
  required,
  prefixContent,
  optional,
  containerClassName,
  className,
  type,
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      const value = e.target.value.replace(/\D/g, '');
      onChange?.(value);
    } else {
      onChange?.(e);
    }
  };

  return (
    <div className={clsx('flex flex-col gap-2', containerClassName)}>
      {label && (
        <p className="text-primary-900 text-[13px] leading-[13px] font-medium">
          {label} {required && <span className="text-error-500">*</span>}
          {optional && (
            <span className="text-primary-400 font-normal">(optional)</span>
          )}
        </p>
      )}
      <div className="flex items-center">
        {prefixContent === 'phone' && (
          <div className="bg-primary-50 border border-primary-200 border-e-0 rounded-l-md px-[11px] h-[40px] flex items-center justify-center">
            <p className="text-[13px] text-primary-800 leading-[14px]">+62</p>
          </div>
        )}
        {prefixContent === 'website' && (
          <div className="bg-secondary-50 border border-secondary-600/20 border-e-0 rounded-l-md px-[11px] h-[40px] flex items-center justify-center">
            <p className="text-[13px] text-secondary-600 leading-[14px]">
              https://
            </p>
          </div>
        )}
        <input
          className={clsx(
            'bg-neutral-0 border w-full min-w-0 border-primary-100 rounded-md h-[40px] px-[12px] text-[13px] leading-[14px] !text-primary-900 focus-visible:outline-none focus-visible:border-secondary-600',
            prefixContent && 'rounded-l-none',
            prefixContent === 'phone' && 'border-s-primary-200',
            prefixContent === 'website' && 'border-s-secondary-600/20',
            className
          )}
          onChange={handleChange}
          {...props}
        />
      </div>
      {errorMessage && (
        <p className="text-[11px] leading-[13px] text-error-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
