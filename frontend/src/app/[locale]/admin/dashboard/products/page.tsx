"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "@/components/shared/Dashboard/DataTable";
import {
  Product,
  columns as ProductCoulmns,
} from "@/components/types/ProductTableColumns";
import BackButton from "@/components/shared/Dashboard/BackButton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {useQuery} from '@tanstack/react-query';
import {getProducts} from '@/lib/api/productsApi';
import {useRouter} from '@/i18n/routing';
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function AdminProductsView() {
  const router = useRouter();
  
  const {data:products,isFetched}=useQuery({
    queryKey:['products'],
    queryFn:getProducts,
    staleTime:1000*60*60*30,
    gcTime:1000*60*60*24,
  })

  if(!isFetched) return(<LoadingSpinner/>)
  const handleAddClick = () => {
    router.replace('/admin/dashboard/products/add');
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <BackButton />
        <Button className="m-1 mr-[95px]" onClick={handleAddClick}>
          <Plus /> Add Product
        </Button>
      </div>
      {isFetched && <DataTable columns={ProductCoulmns} data={products} />}
    </div>
  );
}
