import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const CategoryCard = ({ 
  category, 
  language = 'en',
  onCategoryClick 
}) => {
  const isArabic = language === 'ar';
  const Chevron = isArabic ? ChevronLeft : ChevronRight;

  const content = {
    en: {
      viewProducts: "View Products",
      items: "items"
    },
    ar: {
      viewProducts: "عرض المنتجات",
      items: "منتج"
    }
  };

  const text = content[language];

  return (
    <div 
      onClick={() => onCategoryClick(category._id)}
      className="group relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer
                 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* Image Container */}
      <div className="aspect-square relative overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transform transition-transform duration-500 
                     group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent
                       opacity-80 group-hover:opacity-90 transition-opacity" />
      </div>

      {/* Content */}
      <div className={`absolute inset-0 p-6 flex flex-col justify-end ${
        isArabic ? 'text-right' : 'text-left'
      }`}>
        {/* Category Name */}
        <h3 className="text-2xl font-bold text-white mb-2 
                       transform transition-transform duration-300 
                       group-hover:translate-y-0"
        >
          {category.name}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 
                     transform transition-transform duration-300 
                     group-hover:translate-y-0"
        >
          {category.description}
        </p>

        {/* Product Count & CTA */}
        <div className={`flex items-center justify-between text-sm 
                        transform transition-all duration-300 
                        group-hover:translate-y-0 ${
                          isArabic ? 'flex-row-reverse' : ''
                        }`}
        >
          <span className="text-blue-400">
            {category.productCount} {text.items}
          </span>
          <div className={`flex items-center gap-1 text-white ${
            isArabic ? 'flex-row-reverse' : ''
          }`}>
            <span>{text.viewProducts}</span>
            <Chevron className="w-4 h-4 transform transition-transform duration-300 
                               group-hover:translate-x-1" />
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 border-4 border-blue-500 opacity-0 
                       group-hover:opacity-100 transition-opacity rounded-xl" />
      </div>
    </div>
  );
};

export default CategoryCard;