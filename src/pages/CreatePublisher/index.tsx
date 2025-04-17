import { FC, useState } from 'react';

import { MainLayout } from '@/components/MainLayout';
import { Stepper } from '@/components/Stepper';

import { PublisherFormEnum } from '@/constants/PublisherFormEnum';

import { FormPublisherInfo } from './_components/FormPublisherInfo';
import { FormPicAffiliations } from './_components/FormPicAffiliations';

const steps = [
  PublisherFormEnum.PublisherInfo,
  PublisherFormEnum.PicAffiliations,
];

export const CreatePublisher: FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  return (
    <MainLayout title="Create Publisher">
      <div className="w-full flex items-center justify-center py-[17px] border-b border-primary-100">
        <Stepper
          steps={steps}
          activeStep={activeStep}
          className="border-b border-primary-100"
        />
      </div>

      {PublisherFormEnum.PublisherInfo === steps[activeStep] && (
        <FormPublisherInfo handleNext={handleNext} />
      )}
      {PublisherFormEnum.PicAffiliations === steps[activeStep] && (
        <FormPicAffiliations handlePrev={handlePrev} />
      )}
    </MainLayout>
  );
};
