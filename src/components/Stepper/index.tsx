import { TickIcon } from '@/assets/icons';
import clsx from 'clsx';

interface StepperProps {
  steps: string[];
  activeStep: number;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
  return (
    <div className="flex items-center gap-2.5 flex-col sm:flex-row">
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const showSuccessIcon = index < activeStep;

        return (
          <div
            key={index}
            className={clsx(
              'flex sm:flex-row flex-col items-center gap-2.5',
              isActive && 'pointer-events-none'
            )}
          >
            <div className="flex items-center [&>p]:text-xs [&>p]:font-medium gap-2.5">
              {showSuccessIcon ? (
                <div className="bg-secondary-600 h-8 w-8 items-center justify-center rounded-md flex">
                  <img src={TickIcon} alt="Checklist" />
                </div>
              ) : (
                <p
                  className={clsx(
                    'text-neutral-50 w-8 h-8 flex items-center justify-center rounded-md',
                    isActive
                      ? 'bg-primary-950 text-neutral-0'
                      : 'bg-primary-50 text-primary-400'
                  )}
                >
                  {index + 1}
                </p>
              )}

              <p
                className={clsx(
                  'text-nowrap',
                  isActive || showSuccessIcon
                    ? 'text-primary-950'
                    : 'text-primary-400'
                )}
              >
                {step}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className="sm:w-[35px] bg-primary-300 sm:h-[1px] h-[35px] w-[1px]" />
            )}
          </div>
        );
      })}
    </div>
  );
};
