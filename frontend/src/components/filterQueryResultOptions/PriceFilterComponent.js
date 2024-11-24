import React from 'react';

const PriceFilterComponent = ({ price, setPrice, isRTL = false }) => {
  const translations = {
    priceLabel: {
      en: "Price no greater than:",
      ar: "السعر لا يزيد عن:"
    },
    currency: {
      en: "$",
      ar:"ر.س" 
    }
  };

  const t = (key) => translations[key][isRTL ? 'ar' : 'en'];

  return (
    <div className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
      <label className="block">
        <span className="font-semibold text-gray-700">
          {t('priceLabel')}{' '}
          <span className="text-blue-600 font-bold">
            {/* {isRTL ? `${t('currency')}${price}` : `${price}${t('currency')}`} */}
            {price}{t('currency')}
          </span>
        </span>
      </label>
      
      <div className="relative pt-1">
        <input
          type="range"
          min={10}
          max={1000}
          step={10}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="
            w-full
            h-2
            bg-gray-200
            rounded-lg
            appearance-none
            cursor-pointer
            accent-blue-600
            focus:outline-none focus:ring-2 focus:ring-blue-500
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:bg-blue-600
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:hover:bg-blue-700
            [&::-webkit-slider-thumb]:shadow-md
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:bg-blue-600
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:transition-all
            [&::-moz-range-thumb]:hover:bg-blue-700
            [&::-moz-range-thumb]:shadow-md
          "
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        />
        
        {/* Price markers */}
        <div className={`flex justify-between mt-2 text-xs text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span>
            {isRTL ? `${t('currency')}10` : `10${t('currency')}`}
          </span>
          <span>
            {isRTL ? `${t('currency')}1000` : `1000${t('currency')}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceFilterComponent;