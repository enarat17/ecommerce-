import React, { useEffect, useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { LanguageContext } from "../../../context/LanguageContext";

const translations = {
  en: {
    myOrders: "My Orders",
    orderNumber: "#",
    user: "User",
    date: "Date",
    total: "Total",
    delivered: "Delivered",
    orderDetails: "Order Details",
    you: "You",
    goToOrder: "View Order",
  },
  ar: {
    myOrders: "طلباتي",
    orderNumber: "رقم",
    user: "المستخدم",
    date: "التاريخ",
    total: "المجموع",
    delivered: "تم التوصيل",
    orderDetails: "تفاصيل الطلب",
    you: "أنت",
    goToOrder: "عرض الطلب",
  }
};


const UserOrdersPageComponent = ({ getOrders }) => {
  const [orders, setOrders] = useState([]);
  const {language} = useContext(LanguageContext);
  const t = translations[language];
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    getOrders()
      .then(orders => setOrders(orders))
      .catch((er) => console.log(er));
  }, [getOrders]);

  return (
    <div className={` min-h-[60vh] bg-gradient-to-r from-blue-900/90 to-gray-900/90 bg- p-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`} dir={direction}>
      <h1 className="text-3xl font-bold mb-8 text-gray-200">
        {t.myOrders}
      </h1>
      
      <div className="bg-white  rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">{t.orderNumber}</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">{t.user}</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">{t.date}</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">{t.total}</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">{t.delivered}</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">{t.orderDetails}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, idx) => (
                <tr 
                  key={idx}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {t.you}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.orderTotal.cartSubtotal}
                  </td>
                  <td className="px-6 py-4">
                    {order.isDelivered ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      to={`/user/order-details/${order._id}`}
                      className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      {t.goToOrder}
                      {direction === 'rtl' ? (
                        <ChevronLeft className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserOrdersPageComponent;