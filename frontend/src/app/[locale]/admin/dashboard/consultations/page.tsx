"use client";
import { DataTable } from "@/components/shared/Dashboard/DataTable";
import {
  columns as ConsultaionCoulmns,
} from "@/components/types/ConsultationTableColumns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BackButton from "@/components/shared/Dashboard/BackButton";
import {useQuery,useQueryClient,useMutation} from "@tanstack/react-query";
import { useRouter } from "@/i18n/routing";
import { fetchConsults } from "@/lib/api/consultsApi";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function AdminConsultationView() {
  const router = useRouter();
  const {data:services,isFetched,isError}=useQuery({
    queryKey: ['consults'],
    queryFn: fetchConsults,
    staleTime:1000*60*60*30,
    gcTime:1000*60*60*24,
  })
  const handleAddClick = () => {
    router.replace('/admin/dashboard/consultations/add');
  };

  if(!isFetched) return(<LoadingSpinner/>)
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <BackButton />
        <Button className="m-1 mr-[95px]" onClick={handleAddClick}>
          <Plus /> Add Service
        </Button>
      </div>
      {isFetched && <DataTable columns={ConsultaionCoulmns} data={services}  />}
    </>
  );
}
