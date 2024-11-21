import React, { useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import RemoveFromCartComponent from "./RemoveFromCartComponent";

const translations = {
  en: {
    translation: {
      shoppingCart: 'Shopping Cart',
      emptyCart: 'Your cart is empty',
      subtotal: 'Subtotal',
      product: 'Product',
      products: 'Products',
      price: 'Price',
      proceedToCheckout: 'Proceed To Checkout',
      removeFromCart: 'Remove from Cart',
      confirmRemove: 'Are you sure you want to remove this item?'
    }
  },
  ar: {
    translation: {
      shoppingCart: 'عربة التسوق',
      emptyCart: 'عربة التسوق فارغة',
      subtotal: 'المجموع الفرعي',
      product: 'منتج',
      products: 'منتجات',
      price: 'السعر',
      proceedToCheckout: 'المتابعة إلى الدفع',
      removeFromCart: 'إزالة من العربة',
      confirmRemove: 'هل أنت متأكد من إزالة هذا المنتج؟'
    }
  }
}

const CartItemComponent = ({ item, removeFromCartHandler = false, orderCreated = false, changeCount = false ,isRTL}) => {
  const t = translations[isRTL ? 'ar' : 'en'].translation;
  const handleQuantityChange = (newQuantity) => {
    if (changeCount) {
      changeCount(item.productID, newQuantity);
    }
  };

  const handleRemove = () => {
    if (removeFromCartHandler && window.confirm(t.confirmRemove)) {
      removeFromCartHandler(item.productID, item.quantity, item.price);
    }
  };
  return (
    <>
      <div className={`flex items-center p-4 border-b ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="w-24 h-24 mr-4 ml-4">
        <img 
          src={item.image?.path ?? '/placeholder-image.png'} 
          alt={item.name} 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className={`flex-grow ${isRTL ? 'text-right' : 'text-left'}`}>
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">{t.price}: ${item.price}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => handleQuantityChange(Math.max(1, item.quantity - 1))}
          disabled={orderCreated || item.quantity <= 1}
          className="p-2 bg-gray-200 rounded-full disabled:opacity-50"
        >
          <Minus size={16} />
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button 
          onClick={() => handleQuantityChange(Math.min(item.count, item.quantity + 1))}
          disabled={orderCreated || item.quantity >= item.count}
          className="p-2 bg-gray-200 rounded-full disabled:opacity-50"
        >
          <Plus size={16} />
        </button>
      </div>
      {removeFromCartHandler && (
        <button 
          onClick={handleRemove}
          className={`ml-4 mr-4 text-red-500 hover:bg-red-50 p-2 rounded-full ${isRTL ? 'mr-4' : 'ml-4'}`}
          aria-label={t.removeFromCart}
        >
          <Trash2 size={20} />
        </button>
      )}
    </div>
    </>
  );
};

export default CartItemComponent;
