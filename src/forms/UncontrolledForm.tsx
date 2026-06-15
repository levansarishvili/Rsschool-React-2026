import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formBaseSchema } from '../schemas/validation';
import { addSubmission } from '../store/formSlice';
import { convertToBase64 } from '../utils/convertToBase64';
import { PasswordStrength } from '../components/PasswordStrength';
import type { RootState } from '../store/store';

export const UncontrolledForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const dispatch = useDispatch();
  const availableCountries = useSelector(
    (state: RootState) => state.forms.countries
  );

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [passValue, setPassValue] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = availableCountries.filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const file = fileInputRef.current?.files?.[0];

    const rawValues = {
      name: formData.get('name') as string,
      age: formData.get('age'),
      email: formData.get('email') as string,
      gender: formData.get('gender') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      country: countrySearch,
      acceptTerms: formData.get('acceptTerms') === 'on',
      image: file,
    };

    const result = formBaseSchema.safeParse(rawValues);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path.length > 0) {
          const key = String(issue.path[0]);
          errors[key] = issue.message;
        }
      });
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const base64Str = await convertToBase64(result.data.image);

    dispatch(
      addSubmission({
        name: result.data.name,
        age: result.data.age,
        email: result.data.email,
        gender: result.data.gender,
        country: result.data.country,
        imageBase64: base64Str,
      })
    );

    formRef.current.reset();
    setCountrySearch('');
    onSuccess();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-4 max-h-[80vh] overflow-y-auto px-1"
    >
      {/* Name */}
      <div className="h-19">
        <label
          htmlFor="unc-name"
          className="block text-sm font-medium text-text-secondary mb-0.5"
        >
          Name
        </label>
        <input
          id="unc-name"
          name="name"
          type="text"
          className="w-full rounded-lg border border-border bg-background-secondary px-3 py-1.5 text-foreground outline-none focus:border-primary"
        />
        <p className="text-xs text-danger mt-0.5 min-h-4">
          {formErrors.name || ''}
        </p>
      </div>

      {/* Age & Country */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-19">
          <label
            htmlFor="unc-age"
            className="block text-sm font-medium text-text-secondary mb-0.5"
          >
            Age
          </label>
          <input
            id="unc-age"
            name="age"
            type="number"
            className="w-full rounded-lg border border-border bg-background-secondary px-3 py-1.5 text-foreground outline-none focus:border-primary"
          />
          <p className="text-xs text-danger mt-0.5 min-h-4">
            {formErrors.age || ''}
          </p>
        </div>

        <div className="h-19 relative">
          <label
            htmlFor="unc-country"
            className="block text-sm font-medium text-text-secondary mb-0.5"
          >
            Country Autocomplete
          </label>
          <input
            id="unc-country"
            type="text"
            value={countrySearch}
            onChange={(e) => {
              setCountrySearch(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            className="w-full rounded-lg border border-border bg-background-secondary px-3 py-1.5 text-foreground outline-none focus:border-primary"
          />
          {showDropdown && filteredCountries.length > 0 && (
            <ul className="absolute left-0 right-0 z-10 max-h-32 overflow-y-auto mt-1 border border-border bg-card shadow-lg rounded-lg text-sm">
              {filteredCountries.map((c) => (
                <li
                  key={c}
                  onMouseDown={() => setCountrySearch(c)}
                  className="px-3 py-1.5 hover:bg-surface cursor-pointer text-foreground"
                >
                  {c}
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs text-danger mt-0.5 min-h-4">
            {formErrors.country || ''}
          </p>
        </div>
      </div>

      {/* Email */}
      <div className="h-19">
        <label
          htmlFor="unc-email"
          className="block text-sm font-medium text-text-secondary mb-0.5"
        >
          Email
        </label>
        <input
          id="unc-email"
          name="email"
          type="text"
          className="w-full rounded-lg border border-border bg-background-secondary px-3 py-1.5 text-foreground outline-none focus:border-primary"
        />
        <p className="text-xs text-danger mt-0.5 min-h-4">
          {formErrors.email || ''}
        </p>
      </div>

      {/* Passwords */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="unc-password"
            className="block text-sm font-medium text-secondary mb-0.5"
          >
            Password
          </label>
          <input
            id="unc-password"
            name="password"
            type="password"
            value={passValue}
            onChange={(e) => setPassValue(e.target.value)}
            className="w-full rounded-lg border border-border bg-background-secondary px-3 py-1.5 text-foreground outline-none focus:border-primary"
          />
          <p className="text-xs text-danger mt-0.5 min-h-4">
            {formErrors.password || ''}
          </p>
        </div>
        <div>
          <label
            htmlFor="unc-confirmPassword"
            className="block text-sm font-medium text-text-secondary mb-0.5"
          >
            Confirm Password
          </label>
          <input
            id="unc-confirmPassword"
            name="confirmPassword"
            type="password"
            className="w-full rounded-lg border border-border bg-background-secondary px-3 py-1.5 text-foreground outline-none focus:border-primary"
          />
          <p className="text-xs text-danger mt-0.5 min-h-4">
            {formErrors.confirmPassword || ''}
          </p>
        </div>
      </div>
      <PasswordStrength value={passValue} />

      {/* Gender Picker */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">
          Gender
        </label>
        <div className="flex gap-4">
          {['male', 'female', 'other'].map((g) => (
            <label
              key={g}
              htmlFor={`unc-gen-${g}`}
              className="flex items-center gap-1.5 text-sm capitalize text-text-secondary"
            >
              <input
                id={`unc-gen-${g}`}
                type="radio"
                name="gender"
                value={g}
                className="accent-primary"
              />
              {g}
            </label>
          ))}
        </div>
        <p className="text-xs text-danger mt-0.5 min-h-4">
          {formErrors.gender || ''}
        </p>
      </div>

      {/* File Image Field */}
      <div>
        <label
          htmlFor="unc-image"
          className="block text-sm font-medium text-text-secondary mb-0.5"
        >
          Profile Image
        </label>
        <input
          id="unc-image"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="w-full text-xs text-text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-surface file:text-foreground file:font-semibold"
        />
        <p className="text-xs text-danger mt-0.5 min-h-4">
          {formErrors.image || ''}
        </p>
      </div>

      {/* Terms & Conditions Box */}
      <div>
        <div className="flex items-center gap-2">
          <input
            id="unc-terms"
            type="checkbox"
            name="acceptTerms"
            className="accent-primary"
          />
          <label htmlFor="unc-terms" className="text-xs text-text-secondary">
            I accept Terms and Conditions
          </label>
        </div>
        <p className="text-xs text-danger mt-0.5 min-h-4">
          {formErrors.acceptTerms || ''}
        </p>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors cursor-pointer"
      >
        Submit Form
      </button>
    </form>
  );
};
