"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from '@/components/shared/Dashboard/DataTable';
import { Client, columns as ClientColumns } from '@/components/types/ClientTableColumns';
import BackButton from "@/components/shared/Dashboard/BackButton";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useRouter, usePathname } from '@/i18n/routing';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchClients, updateClientsImage } from '@/lib/api/settingsRequests';
import Link from 'next/link';
import ChangeCoverImageForm from '@/components/shared/Dashboard/ChangeCoverImageForm';

export default function ClientListView() {
    const router = useRouter();
    const pathname = usePathname();
    const { data: data, isFetched, isError } = useQuery({
        queryKey: ['clients'],
        queryFn: fetchClients,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 24
    });

    const handleAddClient = () => {
        
        router.push('/admin/dashboard/settings/client-list/add');
    };

    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-full flex flex-row justify-between items-center'>
                <BackButton />
                <Button className='m-1 mr-[95px]' onClick={handleAddClient}>
                    <Plus /> Add Client
                </Button>
            </div>
            {isFetched && 
            <>
                <ChangeCoverImageForm imgLink={data.coverImage} uploadFunction={updateClientsImage} contentId={data._id} contentType={'clients'}  />
                <DataTable columns={ClientColumns} data={data.clients} />
            </>
            }
            
        </div>
    );
}