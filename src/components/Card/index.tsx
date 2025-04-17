import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface CardProps {
  className?: string;
}

export const Card: React.FC<PropsWithChildren<CardProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={clsx(
        'border border-primary-100 bg-neutral-0 rounded-xl',
        className
      )}
    >
      {children}
    </div>
  );
};
