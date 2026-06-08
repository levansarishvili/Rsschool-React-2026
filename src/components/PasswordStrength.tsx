import React from 'react';
import { evaluatePasswordStrength } from '../schemas/validation';

export const PasswordStrength: React.FC<{ value: string }> = ({ value }) => {
  const strength = evaluatePasswordStrength(value);
  const checklist = [
    { label: '1 Number', valid: strength.hasNumber },
    { label: '1 Uppercase', valid: strength.hasUpper },
    { label: '1 Lowercase', valid: strength.hasLower },
    { label: '1 Special Char', valid: strength.hasSpecial },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 mt-1 p-2 bg-surface border border-border rounded-md text-xs">
      {checklist.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <span className={item.valid ? 'text-success' : 'text-text-muted'}>
            {item.valid ? '✓' : '○'}
          </span>
          <span className={item.valid ? 'text-foreground' : 'text-text-muted'}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
