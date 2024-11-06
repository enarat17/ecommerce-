import Image from 'next/image';
import { Product } from '../types/ProductTableColumns';


interface Order {
  // id: string;
  product: Product;
  // totalPrice: number;
  // orderDate: string;
}

interface OrderItemProps {
  order: Order;
}

export default function OrderItem({ order }: OrderItemProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* <div className="p-4 bg-gray-50 border-b">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">ORDER PLACED</p>
            <p className="font-semibold">{new Date(order.orderDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">TOTAL</p>
            <p className="font-semibold">${order.totalPrice.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">ORDER # {order.id}</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        {order.product.map((product) => (
          <div key={product._id} className="flex items-center py-4 border-b last:border-b-0">
            <div className="flex-shrink-0 w-20 h-20 mr-4">
              <Image src={product.coverImage} alt={product.title_EN} width={80} height={80} className="object-cover" />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{product.title_EN}</h3>
              <p className="text-gray-600">${product.basic_version.price.toFixed(2) || product.open_version.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-50 border-t">
        <button className="text-blue-600 hover:text-blue-800 font-semibold">
          View order details
        </button>
      </div> */}
    </div>
  );
}