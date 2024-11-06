"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import NavigtionWrapper from "@/components/shared/NavigationWrapper";
import Footer from "@/components/shared/Footer";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { fetchUserCart } from "@/lib/api/userApi";
import CartItemList from "@/components/Cart/CartItemsList";
import CartSummary from "@/components/Cart/CartSummary";
import {useLocale} from 'next-intl';

export default function Cart() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const {
    data: cartItems,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchUserCart,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });

  return (
    // <div className="flex flex-col min-h-screen bg-gray-100">
    <>
      <NavigtionWrapper />
      <main className="flex-grow container mx-auto px-4 py-8 min-h-[69vh]">
        <h1 className={`text-3xl font-bold mb-8 text-unitedPrimary ${isRtl && 'text-right'}`}>{isRtl ?'سلة التسوق':'Shopping Cart'}</h1>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className={`flex w-full flex-col items-center justify-center gap-8 ${isRtl ?'md:flex-row-reverse':'md:flex-row'}`}>
              <CartItemList items={cartItems} isRtl={isRtl} />
              {cartItems.length > 0 && <CartSummary items={cartItems} isRtl={isRtl} startingPrice={0} />}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
