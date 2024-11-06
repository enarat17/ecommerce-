import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { calculateCartPrice, submitOrder ,applyCoupon} from '@/lib/api/userApi';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';

interface CartSummaryProps {
    items: any[];
    isRtl: boolean;
    startingPrice?:number;
}

export default function CartSummary({ items, isRtl,startingPrice }: CartSummaryProps) {
    const [coupon, setCoupon] = useState('');
    const queryClient = useQueryClient();

    const { data: data,isFetched } = useQuery({
        queryKey: ["cartPrice"],
        queryFn: calculateCartPrice,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 60 * 24,
    });


    const { mutate: applyCouponMutation }=useMutation({
        mutationFn: (couponCode: string ) => applyCoupon(couponCode),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cartPrice"] });
            toast({
                title: 'Coupon applied successfully',
            })
        },
    });

    const checkoutMutation = useMutation({
        mutationFn: (data: { items: any[], coupon: string }) => submitOrder(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cartPrice"] });
            // Handle successful checkout (e.g., show success message, clear cart, etc.)
        },
    });

    const handleCheckout = async () => {
        await checkoutMutation.mutateAsync({ items, coupon });
    };

    const handleApplyCoupon = () => {
        applyCouponMutation( coupon );
    };

    return (
        <div className="bg-white border-2 border-unitedSecondary rounded-xl p-6">
            <h2 className="text-2xl text-center text-unitedPrimary font-semibold mb-4">{isRtl ? 'إجمالي الطلب' : 'Order Summary'}</h2> 
            <div className={`mt-4 ${isRtl ? 'rtl' : 'ltr'}`}>
                <label htmlFor="coupon" className={`${isRtl && 'rtl-text'} block text-base font-medium text-gray-700`}>
                    {isRtl ? 'كود الخصم:' : 'Coupon Code:'}
                </label>
                <input
                    type="text"
                    id="coupon"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className={`${isRtl && 'rtl-text'} mt-2 p-1 w-full rounded-md border border-gray-300 shadow-sm `}
                    placeholder={isRtl ? 'أدخل كود الخصم' : 'Enter coupon code'}
                />
                <Button type='submit' onClick={handleApplyCoupon}>{isRtl ? 'تطبيق كود الخصم':'apply coupon'}</Button>
            </div>
            <div className="space-y-2">
                <div className="pt-2 mt-2">
                    <div className={`flex justify-between font-semibold ${isRtl && 'flex-row-reverse'}`}>
                        <span className={`${isRtl && 'rtl-text'}`}>{isRtl ? 'الإجمالي:' : 'Total:'}</span>
                        {isFetched && <span className={`${isRtl && 'rtl-text'}`}>{!isRtl && 'SAR'}{data.finalCartValue}{isRtl && 'ريال'}</span>} 
                    </div>
                </div>
            </div>
            <button
                className="w-full mt-6 bg-unitedPrimary hover:bg-cyan-700 text-white font-semibold py-3 rounded-md transition duration-300"
                onClick={handleCheckout}
                disabled={checkoutMutation.isPending}
            >
                {checkoutMutation.isPending
                    ? (isRtl ? 'جاري المعالجة...' : 'Processing...')
                    : (isRtl ? 'إنتقل إلي الدفع' : 'Proceed to Checkout')}
            </button>
            {checkoutMutation.isError && (
                <p className="mt-2 text-red-600">
                    {isRtl ? 'حدث خطأ أثناء المعالجة. يرجى المحاولة مرة أخرى.' : 'An error occurred during processing. Please try again.'}
                </p>
            )}
        </div>
    );
}