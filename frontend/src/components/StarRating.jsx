import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ 
  rating = 0,
  totalStars = 5,
  size = 20,
  readonly = false,
  onRatingChange = () => {},
  className = ''
}) => {
  const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
  
  return (
    <div className={`inline-flex gap-1 ${className}`}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const fillPercentage = Math.min(100, Math.max(0, (roundedRating - index) * 100));
        
        return (
          <button
            key={index}
            type="button"
            disabled={readonly}
            onClick={() => !readonly && onRatingChange(starValue)}
            className={`relative ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
          >
            {/* Background star (gray) */}
            <Star 
              size={size}
              className="text-gray-300"
            />
            
            {/* Foreground star (filled) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star 
                size={size}
                className="text-yellow-400"
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;