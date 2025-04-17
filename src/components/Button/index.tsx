import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'primary-outline' | 'danger-outline';
}

export const Button: React.FC<
  PropsWithChildren<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>>
> = ({
  children,
  variant = 'primary',
  disabled,
  className,
  type = 'button',
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        'text-xs font-medium py-2 px-2.5 rounded-[6px] leading-3 placeholder:text-primary-400',
        variant === 'primary' &&
          'bg-secondary-600 text-neutral-0 hover:bg-secondary-600/90',
        variant === 'secondary' &&
          'bg-neutral-0 border border-primary-300 text-primary-700 hover:bg-primary-300/10',
        variant === 'primary-outline' &&
          'border border-secondary-600 bg-secondary-50 hover:bg-secondary-600/10',
        variant === 'danger-outline' &&
          'border bg-error-50 border-error-500/20 hover:bg-error-500/10',
        variant === 'secondary' &&
          disabled &&
          '!bg-primary-50 !border-primary-200 !text-primary-400',
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
