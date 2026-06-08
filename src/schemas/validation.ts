import { z } from 'zod';

export const COUNTRIES_LIST = [
  'Georgia',
  'United States',
  'Germany',
  'United Kingdom',
  'Canada',
  'France',
  'Japan',
];

const customEmailValidator = z.string().refine(
  (val) => {
    const parts = val.split('@');
    if (parts.length !== 2) return false;
    const [local, domain] = parts;
    if (!local || !domain) return false;
    return (
      domain.includes('.') && !domain.startsWith('.') && !domain.endsWith('.')
    );
  },
  {
    message:
      "Invalid email structure (must contain local part, '@', and domain with a dot)",
  }
);

export const formBaseSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .refine((val) => /^[A-Z]/.test(val), {
        message: 'First letter must be uppercase',
      }),
    age: z.coerce.number().min(0, 'Age cannot be negative'),
    email: customEmailValidator,
    gender: z
      .string()
      .min(1, 'Gender is required')
      .refine(
        (value) => ['male', 'female', 'other'].includes(value),
        'Invalid gender'
      ),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    country: z.string().refine((val) => COUNTRIES_LIST.includes(val), {
      message: 'Country must exist in the stored list',
    }),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the Terms and Conditions',
    }),
    image: z
      .any()
      .refine(
        (file) =>
          file instanceof File &&
          ['image/png', 'image/jpeg'].includes(file.type),
        'Only PNG or JPEG is allowed'
      )
      .refine(
        (file) => file instanceof File && file.size <= 2 * 1024 * 1024,
        'Max image size is 2MB'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export const evaluatePasswordStrength = (pass: string) => {
  return {
    hasNumber: /[0-9]/.test(pass),
    hasUpper: /[A-Z]/.test(pass),
    hasLower: /[a-z]/.test(pass),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>_]/.test(pass),
  };
};
