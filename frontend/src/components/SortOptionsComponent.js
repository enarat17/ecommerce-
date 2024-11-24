import React from 'react';

const SortOptionsComponent = ({ setSortOption, isRTL = false }) => {
  const translations = {
    sortBy: {
      en: "SORT BY",
      ar: "ترتيب حسب"
    },
    priceLowToHigh: {
      en: "Price: Low To High",
      ar: "السعر: من الأقل إلى الأعلى"
    },
    priceHighToLow: {
      en: "Price: High To Low",
      ar: "السعر: من الأعلى إلى الأقل"
    },
    rating: {
      en: "Customer Rating",
      ar: "تقييم العملاء"
    },
    nameAZ: {
      en: "Name A-Z",
      ar: "الاسم من أ إلى ي"
    },
    nameZA: {
      en: "Name Z-A",
      ar: "الاسم من ي إلى أ"
    }
  };

  const t = (key) => translations[key][isRTL ? 'ar' : 'en'];

  return (
    <div className={`relative ${isRTL ? 'text-right' : 'text-left'}`}>
      <select
        onChange={(e) => setSortOption(e.target.value)}
        className={`
          w-full
          px-4
          py-2
          text-gray-700
          bg-white
          border
          border-gray-300
          rounded-md
          shadow-sm
          appearance-none
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          ${isRTL ? 'pr-4 pl-10' : 'pl-4 pr-10'}
        `}
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
      >
        <option value="">{t('sortBy')}</option>
        <option value="price_1">{t('priceLowToHigh')}</option>
        <option value="price_-1">{t('priceHighToLow')}</option>
        <option value="rating_-1">{t('rating')}</option>
        <option value="name_1">{t('nameAZ')}</option>
        <option value="name_-1">{t('nameZA')}</option>
      </select>
      
      {/* Custom arrow indicator */}
      <div className={`
        absolute
        inset-y-0
        ${isRTL ? 'left-0 pl-3' : 'right-0 pr-3'}
        flex
        items-center
        pointer-events-none
      `}>
        <svg
          className="w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SortOptionsComponent;