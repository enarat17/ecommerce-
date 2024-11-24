import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const ProductForListComponent = ({ 
  productId, 
  name, 
  description, 
  price, 
  images, 
  rating, 
  reviewsNumber,
  isRTL = false 
}) => {
  const renderStars = () => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'fill-gray-200 text-gray-200'
        }`}
      />
    ));
  };

  return (
    <div className={`w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden 
      my-4 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1
      ${isRTL ? 'rtl' : 'ltr'}`}
    >
      {/* Image Container */}
      <div className="aspect-square relative overflow-hidden">
        <img
          crossOrigin="anonymous"
          src={images[0] ? images[0].path : ''}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {name}
        </h2>
        
        <p className="text-sm text-gray-600 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center space-x-2">
          <div className="flex space-x-0.5">
            {renderStars()}
          </div>
          <span className="text-sm text-gray-500">
            ({reviewsNumber})
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-gray-900">
            ${price}
          </span>
          
          <Link 
            to={`/product-details/${productId}`}
            className="px-4 py-1.5 bg-red-600 text-white text-sm rounded-md 
              hover:bg-red-700 transition-colors duration-300
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            {isRTL ? "عرض المنتج" : "View Product"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductForListComponent;