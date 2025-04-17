import { z } from 'zod';

export const publisherInfoSchema = z.object({
  control: z.string().min(1, 'Required.'),

  publisherName: z.string().min(1, 'Required.').min(3, 'Min. 3 characters.'),

  publisherCode: z
    .string()
    .min(1, 'Required.')
    .max(10, 'Max. 10 characters.')
    .refine((val) => /^[a-zA-Z0-9]*$/.test(val), {
      message: 'Alphanumeric only.',
    }),

  ipiNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{11}$/.test(val), {
      message: 'Must be 11 digits.',
    }),

  phoneNumbers: z.array(
    z.object({
      value: z.string().min(1, 'Required.'),
    })
  ),

  contactName: z.string().min(1, 'Required.').min(2, 'Min. 2 characters.'),

  email: z.string().min(1, 'Required.').email('Invalid email.'),

  website: z.string().optional(),

  correspondenceAddress: z
    .string()
    .min(1, 'Required.')
    .min(5, 'Min. 5 characters.'),

  province: z.string().min(1, 'Required.'),
  city: z.string().min(1, 'Required.'),
  district: z.string().min(1, 'Required.'),
  subdistrict: z.string().min(1, 'Required.'),
  postalCode: z.string().min(1, 'Required.'),

  rt: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{1,3}$/.test(val), {
      message: 'Max. 3 digits.',
    }),

  rw: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{1,3}$/.test(val), {
      message: 'Max. 3 digits.',
    }),
});

export type PublisherInfoForm = z.infer<typeof publisherInfoSchema>;

export const publisherInfoDefaultValues: PublisherInfoForm = {
  control: '',
  publisherName: '',
  publisherCode: '',
  ipiNumber: '',
  phoneNumbers: [{ value: '' }],
  contactName: '',
  email: '',
  website: '',
  correspondenceAddress: '',
  province: '',
  city: '',
  district: '',
  subdistrict: '',
  postalCode: '',
  rt: '',
  rw: '',
};
