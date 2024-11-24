import React from 'react';

const StarIcon = ({ filled }) => (
  <svg 
    className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const RatingFilterComponent = ({ setRatingsFromFilter, isRTL = false }) => {
  const translations = {
    rating: {
      en: "Rating",
      ar: "التقييم"
    }
  };

  const t = (key) => translations[key][isRTL ? 'ar' : 'en'];

  return (
    <div className={`space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
      <h3 className="font-semibold text-gray-700">
        {t('rating')}
      </h3>
      
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, idx) => {
          const ratingValue = 5 - idx;
          
          return (
            <div 
              key={idx}
              className={`
                flex items-center gap-3 
                ${isRTL ? 'flex-row-reverse' : 'flex-row'}
              `}
            >
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="
                    sr-only peer
                  "
                  onChange={e => setRatingsFromFilter((items) => ({
                    ...items,
                    [ratingValue]: e.target.checked
                  }))}
                />
                <div className="
                  w-5 h-5
                  border-2 border-gray-300
                  rounded
                  peer-checked:bg-blue-600
                  peer-checked:border-blue-600
                  after:content-['']
                  after:absolute
                  after:opacity-0
                  peer-checked:after:opacity-100
                  after:w-2 after:h-3
                  after:border-r-2 after:border-b-2
                  after:border-white
                  after:rotate-45
                  after:top-[2px]
                  after:left-[6px]
                  transition-all
                  duration-200
                  hover:border-blue-500
                  peer-focus:ring-2
                  peer-focus:ring-blue-500/50
                  peer-focus:ring-offset-2
                ">
                </div>
              </label>

              <div className={`flex gap-0.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                {Array.from({ length: 5 }).map((_, starIdx) => (
                  <StarIcon
                    key={starIdx}
                    filled={starIdx < ratingValue}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingFilterComponent;