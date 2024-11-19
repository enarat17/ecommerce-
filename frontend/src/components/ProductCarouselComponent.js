import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductCarousel = ({ bestSellers = [], language = 'en', onProductClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isArabic = language === 'ar';

  const content = {
    en: {
      bestseller: "Bestseller in",
      category: "Category"
    },
    ar: {
      bestseller: "الأكثر مبيعاً في",
      category: "فئة"
    }
  };

  const text = content[language];

  useEffect(() => {
    if (bestSellers.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === bestSellers.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [bestSellers.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === bestSellers.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? bestSellers.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (bestSellers.length === 0) return null;

  return (
    <div className="relative w-full h-[300px] bg-gray-900 overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {bestSellers.map((item, idx) => (
          <div
            key={idx}
            className={`absolute w-full h-full transition-all duration-500 ease-in-out transform ${
              idx === currentSlide ? 'opacity-100 translate-x-0' : 
              idx < currentSlide ? 'opacity-0 -translate-x-full' : 
              'opacity-0 translate-x-full'
            }`}
          >
            {/* Image */}
            <img
              src={item.images?.[0]?.path}
              alt={item.name}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
            
            {/* Caption */}
            <div 
              className={`absolute bottom-0 w-full p-6 space-y-2 ${
                isArabic ? 'text-right' : 'text-left'
              }`}
            >
              <h3 
                onClick={() => onProductClick?.(item._id)}
                className="text-2xl font-bold text-white cursor-pointer hover:text-blue-400 transition-colors"
              >
                {`${text.bestseller} ${item.category} ${text.category}`}
              </h3>
              <p className="text-gray-200 line-clamp-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className={`absolute top-1/2 -translate-y-1/2 ${
          isArabic ? 'right-4' : 'left-4'
        } bg-gray-900/50 hover:bg-gray-900/75 text-white p-2 rounded-full transition-colors`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className={`absolute top-1/2 -translate-y-1/2 ${
          isArabic ? 'left-4' : 'right-4'
        } bg-gray-900/50 hover:bg-gray-900/75 text-white p-2 rounded-full transition-colors`}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {bestSellers.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentSlide ? 
              'bg-blue-500 w-4' : 
              'bg-gray-400 hover:bg-gray-300'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;