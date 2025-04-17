import clsx from 'clsx';
import { ArrowLeft, ArrowRight } from 'iconsax-reactjs';

import { Button } from '@/components/Button';

interface ActionProps {
  prevAction?: () => void;
  isLastStep?: boolean;
  isFirstStep?: boolean;
}

export const Action: React.FC<ActionProps> = ({
  prevAction,
  isLastStep,
  isFirstStep,
}) => {
  return (
    <div className="p-3.5 flex justify-end gap-2.5">
      <Button
        variant="secondary"
        className="flex items-center gap-[4px]"
        onClick={prevAction}
        disabled={isFirstStep}
      >
        <ArrowLeft
          size={14}
          className={clsx(
            'text-primary-700',
            isFirstStep && '!text-primary-400'
          )}
        />
        Previous
      </Button>
      {isLastStep ? (
        <Button variant="primary" type="submit">
          Save
        </Button>
      ) : (
        <Button
          variant="primary"
          className="flex items-center gap-[4px]"
          type="submit"
        >
          Next
          <ArrowRight size={14} className="text-neutral-0" />
        </Button>
      )}
    </div>
  );
};
