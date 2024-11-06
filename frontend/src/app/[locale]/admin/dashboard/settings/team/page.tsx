"use client";
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { DataTable } from '@/components/shared/Dashboard/DataTable';
import {Member,columns as MemberCoulmns} from '@/components/types/MembersTableColumns';
import BackButton from "@/components/shared/Dashboard/BackButton";
import {Button} from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useRouter} from '@/i18n/routing';
import {useQuery} from '@tanstack/react-query';
import { fetchTeamMembers,updateMembersImage } from '@/lib/api/settingsRequests';
import ChangeCoverImageForm from '@/components/shared/Dashboard/ChangeCoverImageForm';

export default function AdminMembersView () {
    const router = useRouter();
    const {data:data,isFetched,isLoading,isError,error} = useQuery({
        queryKey: ['members'],
        queryFn: fetchTeamMembers,
        staleTime: 1000*60*60,
        gcTime: 1000*60*60*24
    })

    const handleAddClick = ()=>{
        router.push('/admin/dashboard/settings/team/add')
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-full flex flex-row justify-between items-center'>
                <BackButton />
                <Button className='m-1 mr-[95px]' onClick={handleAddClick}><Plus/> Add Member</Button>
            </div>
    
            {isFetched && 
            <>
            <ChangeCoverImageForm imgLink={data.coverImage} uploadFunction={updateMembersImage} contentId={data._id} contentType={'members'}  />
            <DataTable columns={MemberCoulmns} data={data.members} />
            </>
            }
        </div>
    );
}