import { Star } from 'lucide-react';

type PropsType = {
  rating: number;
};

export default function RatingStars({ rating }: PropsType) {
  return (
    <div className="flex items-center gap-0.5 bg-background border border-foreground px-1.5 py-0.5 rounded-xs shadow-[1px_1px_0px_0px_rgba(43,41,39,1)]">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`size-2.5 ${
            i < Math.round(rating)
              ? 'stroke-foreground fill-accent'
              : 'stroke-text-disabled fill-transparent'
          }`}
        />
      ))}
    </div>
  );
}
