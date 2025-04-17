import { PicAffiliationForm } from '@/schemas/picAffiliationSchema';
import { PublisherInfoForm } from '@/schemas/publisherInfoSchema';

export type PublisherState = {
  publisherInfo: PublisherInfoForm;
  picAffiliations: PicAffiliationForm;
  validPublisherInfo: boolean;
  validPicAffiliations: boolean;
};
