import React, { useEffect, useState } from 'react';
import type { SavedSubmission } from '../store/formSlice';

interface Props {
  item: SavedSubmission;
}

export const SubmissionCard: React.FC<Props> = ({ item }) => {
  const [isRecent, setIsRecent] = useState(false);

  useEffect(() => {
    const checkRecent = () => {
      setIsRecent(Date.now() - item.submittedAt < 4000);
    };

    checkRecent();
    const interval = setInterval(checkRecent, 1000);

    return () => clearInterval(interval);
  }, [item.submittedAt]);

  return (
    <div
      className={`p-5 rounded-xl border transition-all duration-500 bg-card shadow-sm flex flex-col gap-4 ${
        isRecent
          ? 'border-warning ring-2 ring-warning/30 scale-[1.02]'
          : 'border-border'
      }`}
    >
      <div className="flex gap-4 items-center">
        <img
          src={item.imageBase64}
          alt={item.name}
          className="w-14 h-14 object-cover rounded-full border border-border bg-surface"
        />

        <div className="overflow-hidden">
          <h3 className="font-bold text-lg text-foreground truncate">
            {item.name}
          </h3>
          <p className="text-xs text-text-muted truncate">
            {item.email}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 text-xs border-t border-surface pt-3 text-text-secondary">
        <p>
          <span className="text-text-muted">Age:</span> {item.age}
        </p>

        <p>
          <span className="text-text-muted">Gender:</span>{' '}
          <span className="capitalize">{item.gender}</span>
        </p>

        <p className="col-span-2 truncate">
          <span className="text-text-muted">Country:</span>{' '}
          {item.country}
        </p>
      </div>
    </div>
  );
};
