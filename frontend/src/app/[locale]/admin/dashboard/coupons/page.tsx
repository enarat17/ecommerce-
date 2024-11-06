"use client";
import { DataTable } from "@/components/shared/Dashboard/DataTable";
import {
  Coupon,
  columns as CouponColumns,
} from "@/components/types/CouponsTableColumns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter, usePathname } from "@/i18n/routing";
import BackButton from "@/components/shared/Dashboard/BackButton";
import {useQuery} from '@tanstack/react-query';
import { fetchCoupons } from "@/lib/api/couponApi";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function AdminCouponsView() {
//   const [Coupons, setCoupons] = useState<Coupon[]>([]);
  const router = useRouter();
  const {data:coupons,isFetched,isLoading} = useQuery({
    queryKey:['coupons'],
    queryFn:fetchCoupons,
    staleTime:1000 * 60 * 60,
    gcTime:1000 * 60 * 60 * 60,
  })

  const handleAddClick = () => {
    router.push('/admin/dashboard/coupons/add');
  };


  if(isLoading){return <LoadingSpinner />}
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <BackButton />
        <Button className="m-1 mr-[95px]" onClick={handleAddClick}>
          <Plus /> Add Coupon
        </Button>
      </div>
      {isFetched && <DataTable columns={CouponColumns} data={coupons} />}
    </div>
  );
}
