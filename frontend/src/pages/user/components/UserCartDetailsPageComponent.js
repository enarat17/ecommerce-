
import { ShoppingCart, CreditCard, MapPin, Phone, AlertTriangle, CheckCircle } from 'lucide-react';
import CartItemComponent from "../../../components/CartItemComponent";
import { LanguageContext } from "../../../context/LanguageContext";

import { useEffect, useState ,useContext} from "react";

import { useNavigate } from "react-router-dom";

const translations = {
  en: {
    translation: {
      cartDetails: 'Cart Details',
      shipping: 'Shipping',
      name: 'Name',
      address: 'Address',
      phone: 'Phone',
      paymentMethod: 'Payment Method',
      paypal: 'PayPal',
      cashOnDelivery: 'Cash On Delivery (delivery may be delayed)',
      notDelivered: 'Not Delivered',
      notPaidYet: 'Not Paid Yet',
      orderSummary: 'Order Summary',
      itemsPrice: 'Items Price (after tax)',
      shipping: 'Shipping',
      tax: 'Tax',
      totalPrice: 'Total Price',
      placeOrder: 'Place Order',
      missingAddressWarning: 'In order to make an order, fill out your profile with correct address, city, etc.',
      addressIncomplete: 'Address Incomplete'
    }
  },
  ar: {
    translation: {
      cartDetails: 'تفاصيل العربة',
      shipping: 'الشحن',
      name: 'الاسم',
      address: 'العنوان',
      phone: 'الهاتف',
      paymentMethod: 'طريقة الدفع',
      paypal: 'PayPal',
      cashOnDelivery: 'الدفع عند الاستلام (قد يتأخر التوصيل)',
      notDelivered: 'لم يتم التوصيل',
      notPaidYet: 'لم يتم الدفع بعد',
      orderSummary: 'ملخص الطلب',
      itemsPrice: 'سعر المنتجات (بعد الضريبة)',
      shipping: 'الشحن',
      tax: 'الضريبة',
      totalPrice: 'السعر الإجمالي',
      placeOrder: 'تأكيد الطلب',
      missingAddressWarning: 'لإتمام الطلب، يرجى إكمال معلومات ملفك الشخصي بالعنوان والمدينة وغيرها',
      addressIncomplete: 'العنوان غير مكتمل'
    }
  }
};

const UserCartDetailsPageComponent = ({cartItems, itemsCount, cartSubtotal, userInfo,addToCart, removeFromCart, reduxDispatch , getUser, createOrder}) => {

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [userAddress, setUserAddress] = useState(false);
    const [missingAddress, setMissingAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("pp");
    const {language} = useContext(LanguageContext);
    const isRtl = language === 'ar';
    const t = translations[language].translation;
    const navigate = useNavigate();

    const changeCount = (productID, count) => {
        reduxDispatch(addToCart(productID, count));
    }

    const removeFromCartHandler = (productID, quantity, price) => {
        if (window.confirm("Are you sure?")) {
            reduxDispatch(removeFromCart(productID, quantity, price));
        }
    }

    useEffect(() => {
        getUser()
        .then((data) => {
            if (!data.address || !data.city || !data.country || !data.zipCode || !data.state || !data.phoneNumber) {
                setButtonDisabled(true);
                setMissingAddress(" .In order to make order, fill out your profile with correct address, city etc.");
            } else {
                setUserAddress({address: data.address, city: data.city, country: data.country, zipCode: data.zipCode, state: data.state, phoneNumber: data.phoneNumber})
                setMissingAddress(false);
            }
        })
        .catch((er) => console.log(er.response.data.message ? er.response.data.message : er.response.data));
    }, [userInfo._id])

    const orderHandler = () => {
        const orderData = {
            orderTotal: {
               itemsCount: itemsCount, 
               cartSubtotal: cartSubtotal,
            },
            cartItems: cartItems.map(item => {
                return {
                    productID: item.productID,
                    name: item.name,
                    price: item.price,
                    image: { path: item.image ? (item.image.path ?? null) : null },
                    quantity: item.quantity,
                    count: item.count,

                }
            }),
            paymentMethod: paymentMethod,
        }
       createOrder(orderData)
       .then(data => {
           if (data) {
               navigate("/user/order-details/" + data._id);
           }
       })
       .catch((err) => console.log(err));
    }

    const choosePayment = (e) => {
        setPaymentMethod(e.target.value);
    }

  return (
    <div 
      className={`container mx-auto p-6 ${isRtl ? 'rtl' : 'ltr'}`} 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('cartDetails')}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <MapPin className="mr-2" /> {t('shipping')}
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-bold">{t('name')}</span>: {userInfo.name} {userInfo.lastName}
                  </p>
                  <p>
                    <span className="font-bold">{t('address')}</span>: {userAddress.address} {userAddress.city} {userAddress.state} {userAddress.zipCode}
                  </p>
                  <p>
                    <span className="font-bold">{t('phone')}</span>: {userAddress.phoneNumber}
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <CreditCard className="mr-2" /> {t('paymentMethod')}
                </h2>
                <select 
                  onChange={choosePayment} 
                  className="w-full p-2 border rounded"
                >
                  <option value="pp">{t('paypal')}</option>
                  <option value="cod">{t('cashOnDelivery')}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {missingAddress && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center">
                  <AlertTriangle className="mr-2" />
                  <span>{t('notDelivered')} {missingAddress}</span>
                </div>
              )}
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center">
                <CheckCircle className="mr-2" />
                {t('notPaidYet')}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold p-6 border-b">{t('orderSummary')}</h2>
            {cartItems.map((item, idx) => (
              <div key={idx} className="border-b last:border-b-0">
                <CartItemComponent 
                  item={item} 
                  removeFromCartHandler={removeFromCartHandler} 
                  changeCount={changeCount} 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">{t('orderSummary')}</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>{t('itemsPrice')}</span>
              <span className="font-bold">${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('shipping')}</span>
              <span className="font-bold">{t('included')}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('tax')}</span>
              <span className="font-bold">{t('included')}</span>
            </div>
            <div className="flex justify-between text-red-600 font-bold">
              <span>{t('totalPrice')}</span>
              <span>${cartSubtotal.toFixed(2)}</span>
            </div>
            <button 
              onClick={orderHandler}
              disabled={buttonDisabled}
              className="w-full py-3 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 flex items-center justify-center"
            >
              <ShoppingCart className="mr-2" size={20} />
              {t('placeOrder')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCartDetailsPageComponent;
