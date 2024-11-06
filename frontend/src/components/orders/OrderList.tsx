import OrderItem from './OrderItem';
import { Product } from '../types/ProductTableColumns';
interface Order {
  id: string;
  products: Product[]; 
  totalPrice: number;
  orderDate: string;
}

interface OrdersListProps {
  orders: Order[];
}

export default function OrdersList({ orders }: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-xl text-gray-600">You have not made any orders yet .</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))} */}
    </div>
  );
}