import { z } from 'zod';

export const picAffiliationSchema = z.object({
  pic: z.array(
    z.object({
      name: z.string().min(1, 'Required.').min(2, 'Min. 2 characters.'),
      role: z.string().min(1, 'Required.'),
      gender: z.string().min(1, 'Required.'),
      email: z.string().min(1, 'Required.').email('Invalid email.'),
      phoneNumbers: z.array(
        z.object({
          value: z.string().min(1, 'Required.'),
        })
      ),
    })
  ),
  capacity: z.string().min(1, 'Required.'),
  performanceSocietyAffiliation: z.string().min(1, 'Required.'),
  mechanicalSocietyAffiliation: z.string().min(1, 'Required.'),
  SynchronizationSocietyAffiliation: z.string().min(1, 'Required.'),
});

export type PicAffiliationForm = z.infer<typeof picAffiliationSchema>;

export const picAffiliationDefaultValue: PicAffiliationForm = {
  pic: [
    {
      name: '',
      role: '',
      gender: '',
      email: '',
      phoneNumbers: [{ value: '' }],
    },
  ],
  capacity: '',
  performanceSocietyAffiliation: '',
  mechanicalSocietyAffiliation: '',
  SynchronizationSocietyAffiliation: '',
};
