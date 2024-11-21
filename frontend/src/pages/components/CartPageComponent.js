import { ShoppingCart} from 'lucide-react';
import {useContext} from 'react';
import {LanguageContext} from '../../context/LanguageContext';
import CartItemComponent from "../../components/CartItemComponent";

const translations = {
  en: {
      shoppingCart: 'Shopping Cart',
      emptyCart: 'Your cart is empty',
      subtotal: 'Subtotal',
      product: 'Product',
      products: 'Products',
      price: 'Price',
      proceedToCheckout: 'Proceed To Checkout',
      removeFromCart: 'Remove from Cart',
      confirmRemove: 'Are you sure you want to remove this item?'
  },
  ar: {
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
  };

const CartPageComponent = ({
  addToCart,
  removeFromCart,
  cartItems,
  cartSubtotal,
  reduxDispatch,
}) => {

  const {language} = useContext(LanguageContext);
  const isRTL = language === 'ar';
  const t = translations[language];
  console.log(t);
  console.log(isRTL)
  const changeCount = (productID, count) => {
    reduxDispatch(addToCart(productID, count));
  };

  const removeFromCartHandler = (productID, quantity, price) => {
     if (window.confirm("Are you sure?")) {
         reduxDispatch(removeFromCart(productID, quantity, price));
     } 
  }

  return (
    <div className={`container mx-auto p-6 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t.shoppingCart}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {cartItems.length === 0 ? (
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
              {t.emptyCart}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow">
              {cartItems.map((item, idx) => (
                <CartItemComponent
                  key={idx}
                  item={item}
                  changeCount={changeCount}
                  removeFromCartHandler={removeFromCartHandler}
                  isRTL={isRTL}
                />
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">{t.subtotal}</h3>
            <p className="text-gray-600">
              {t.subtotal} ({cartItems.length} {(cartItems.length === 1 ? `${t.product}` : `${t.products}`)})
            </p>
          </div>
          <div className="mb-4">
            <span className="text-2xl font-bold">${cartSubtotal.toFixed(2)}</span>
          </div>
          <button 
            disabled={cartSubtotal === 0}
            className="w-full py-3 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 flex items-center justify-center"
          >
            <ShoppingCart className="mr-2" size={20} />
            {t.proceedToCheckout}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPageComponent;
