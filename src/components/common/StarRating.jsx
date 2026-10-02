import React from 'react';
import { Star } from 'lucide-react';

export function StarRating({ rating = 5, totalStars = 5, reviewCount = null, size = 'sm' }) {
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const currentSize = iconSizes[size] || iconSizes.sm;

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center text-amber-400">
        {[...Array(totalStars)].map((_, index) => {
          const fillLevel = Math.max(0, Math.min(1, rating - index));
          return (
            <div key={index} className="relative">
              <Star className={`${currentSize} text-gray-200 fill-gray-200`} />
              {fillLevel > 0 && (
                <div
                  className="absolute top-0 left-0 overflow-hidden text-amber-400 fill-amber-400"
                  style={{ width: `${fillLevel * 100}%` }}
                >
                  <Star className={`${currentSize} fill-amber-400 text-amber-400`} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <span className="text-xs font-semibold text-brand-charcoal">
        {rating.toFixed(1)}
      </span>

      {reviewCount !== null && (
        <span className="text-xs text-brand-subtle">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
