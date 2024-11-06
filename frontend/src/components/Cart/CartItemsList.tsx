import CartItem from './CartItem';

interface CartItemsListProps {
    items: any[];
    isRtl: boolean;
}
export default function CartItemList({ items,isRtl}: CartItemsListProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-xl font-bold text-unitedPrimary">{isRtl ? 'لا يوجد منتجات في عربة التسوق الخاصة بك':'Your cart is empty'}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {items.map((item, index) => (
        <CartItem key={index} item={item.product} version={item.version} />
      ))}
    </div>
  );
}