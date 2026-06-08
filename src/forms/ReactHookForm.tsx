import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { formBaseSchema } from '../schemas/validation';
import { convertToBase64 } from '../utils/convertToBase64';
import { addSubmission } from '../store/formSlice';
import { PasswordStrength } from '../components/PasswordStrength';
import { z } from 'zod';

type FormData = z.infer<typeof formBaseSchema>;

export const ReactHookForm: React.FC<{ onSuccess: () => void }> = ({
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const availableCountries = useSelector(
    (state: RootState) => state.forms.countries
  );

  const [countrySearch, setCountrySearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(formBaseSchema),
    mode: 'onChange',
  });

  const currentPassword = watch('password', '');
  const filteredCountries = availableCountries.filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const onSubmit = async (data: FormData) => {
    const file = data.image instanceof FileList ? data.image[0] : data.image;

    const base64Str = await convertToBase64(file);

    dispatch(
      addSubmission({
        name: data.name,
        age: data.age,
        email: data.email,
        gender: data.gender,
        country: data.country,
        imageBase64: base64Str,
      })
    );

    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-h-[80vh] overflow-y-auto px-1"
    >
      {/* Name */}
      <div className="h-19">
        <label
          htmlFor="rhf-name"
          className="block text-sm font-medium text-text-secondary mb-0.5"
        >
          Name
        </label>
        <input
          id="rhf-name"
          {...register('name')}
          type="text"
          className="w-full rounded-lg border border-border bg-background-secondary px-3 py-1.5 text-foreground outline-none focus:border-accent"
        />
        <p className="text-xs text-danger mt-0.5 min-h-4">
          {(errors.name?.message as string) || ''}
        </p>
      </div>

      {/* Age & Country */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-19">
          <label
            htmlFor="rhf-age"
            className="block text-sm font-medium text-text-secondary mb-0.5"
          >
            Age
          </label>
          <input
            id="rhf-age"
            {...register('age')}
            type="number"
            className="w-full rounded-lg border border-border bg-background-secondary px-3 py-1.5 text-foreground outline-none focus:border-accent"
          />
          <p className="text-xs text-danger mt-0.5 min-h-4">
            {(errors.age?.message as string) || ''}
          </p>
        </div>

        <div className="h-19 relative">
          <label
            htmlFor="rhf-country"
            className="block text-sm font-medium text-text-secondary mb-0.5"
          >
            Country Autocomplete
          </label>
          <input
            id="rhf-country"
            type="text"
            value={countrySearch}
            onChange={(e) => {
              setCountrySearch(e.target.value);
              setValue('country', e.target.value, { shouldValidate: true });
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            className="w-full rounded-lg border border-border bg-background-secondary px-3 py-1.5 text-foreground outline-none focus:border-accent"
          />
          {showDropdown && filteredCountries.length > 0 && (
            <ul className="absolute left-0 right-0 z-10 max-h-32 overflow-y-auto mt-1 border border-border bg-card shadow-lg rounded-lg text-sm">
              {filteredCountries.map((c) => (
                <li
                  key={c}
                  onMouseDown={() => {
                    setCountrySearch(c);
                    setValue('country', c, { shouldValidate: true });
                  }}
                  className="px-3 py-1.5 hover:bg-surface cursor-pointer text-foreground"
                >
                  {c}
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs text-danger mt-0.5 min-h-4">
            {(errors.country?.message as string) || ''}
          </p>
        </div>
      </div>

      {/* Email */}
      <div className="h-19">
        <label
          htmlFor="rhf-email"
          className="block text-sm font-medium text-text-secondary mb-0.5"
        >
          Email
        </label>
        <input
          id="rhf-email"
          {...register('email')}
          type="email"
          className="w-full rounded-lg border border-border bg-background-secondary px-3 py-1.5 text-foreground outline-none focus:border-accent"
        />
        <p className="text-xs text-danger mt-0.5 min-h-4">
          {(errors.email?.message as string) || ''}
        </p>
      </div>

      {/* Passwords */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="rhf-password"
            className="block text-sm font-medium text-text-secondary mb-0.5"
          >
            Password
          </label>
          <input
            id="rhf-password"
            {...register('password')}
            type="password"
            className="w-full rounded-lg border border-border bg-background-secondary px-3 py-1.5 text-foreground outline-none focus:border-accent"
          />
          <p className="text-xs text-danger mt-0.5 min-h-4">
            {(errors.password?.message as string) || ''}
          </p>
        </div>
        <div>
          <label
            htmlFor="rhf-confirmPassword"
            className="block text-sm font-medium text-text-secondary mb-0.5"
          >
            Confirm Password
          </label>
          <input
            id="rhf-confirmPassword"
            {...register('confirmPassword')}
            type="password"
            className="w-full rounded-lg border border-border bg-background-secondary px-3 py-1.5 text-foreground outline-none focus:border-accent"
          />
          <p className="text-xs text-danger mt-0.5 min-h-4">
            {(errors.confirmPassword?.message as string) || ''}
          </p>
        </div>
      </div>
      <PasswordStrength value={currentPassword} />

      {/* Gender Picker */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">
          Gender
        </label>
        <div className="flex gap-4">
          {['male', 'female', 'other'].map((g) => (
            <label
              key={g}
              htmlFor={`rhf-gen-${g}`}
              className="flex items-center gap-1.5 text-sm capitalize text-text-secondary"
            >
              <input
                id={`rhf-gen-${g}`}
                {...register('gender')}
                type="radio"
                value={g}
                className="accent-accent"
              />
              {g}
            </label>
          ))}
        </div>
        <p className="text-xs text-danger mt-0.5 min-h-4">
          {(errors.gender?.message as string) || ''}
        </p>
      </div>

      {/* Image Upload Input */}
      <div>
        <label
          htmlFor="rhf-image"
          className="block text-sm font-medium text-text-secondary mb-0.5"
        >
          Profile Image
        </label>
        <input
          id="rhf-image"
          type="file"
          accept="image/*"
          className="w-full text-xs text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-surface file:text-foreground file:font-semibold"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setValue('image', file, { shouldValidate: true });
          }}
        />
        <p className="text-xs text-danger mt-0.5 min-h-4">
          {(errors.image?.message as string) || ''}
        </p>
      </div>

      {/* Terms & Conditions Box */}
      <div>
        <div className="flex items-center gap-2">
          <input
            id="rhf-terms"
            {...register('acceptTerms')}
            type="checkbox"
            className="accent-accent"
          />
          <label htmlFor="rhf-terms" className="text-xs text-text-secondary">
            I accept Terms and Conditions
          </label>
        </div>
        <p className="text-xs text-danger mt-0.5 min-h-4">
          {(errors.acceptTerms?.message as string) || ''}
        </p>
      </div>

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full py-2 text-white font-medium rounded-lg transition-colors cursor-pointer disabled:bg-text-disabled disabled:cursor-not-allowed bg-accent hover:bg-primary-hover"
      >
        Submit Form
      </button>
    </form>
  );
};
