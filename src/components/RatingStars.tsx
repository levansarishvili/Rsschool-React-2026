import { Star } from 'lucide-react';

type PropsType = {
  rating: number;
};

export default function RatingStars({ rating }: PropsType) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 transition-all duration-200 ${
            i < Math.round(rating)
              ? 'text-amber-400 fill-amber-400 drop-shadow-xs'
              : 'text-border fill-transparent'
          }`}
        />
      ))}
    </div>
  );
}
