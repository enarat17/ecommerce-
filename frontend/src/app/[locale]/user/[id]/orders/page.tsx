"use client";

import { useQuery } from '@tanstack/react-query';
import NavigtionWrapper from '@/components/shared/NavigationWrapper';
import Footer from '@/components/shared/Footer';
import OrdersList from '@/components/orders/OrderList';
import { fetchUserOrders } from '@/lib/api/userApi';

export default function Orders() {
  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchUserOrders,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigtionWrapper />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
        {isLoading ? (
          <div className="text-center">Loading your orders...</div>
        ) : isError ? (
          <div className="text-center text-red-500">Error loading orders. Please try again.</div>
        ) : (
          <OrdersList orders={orders || []} />
        )}
      </main>
      <Footer />
    </div>
  );
}