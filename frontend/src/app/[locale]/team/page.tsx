'use client';
import React from 'react';
import Image from 'next/image';
import NavigtionWrapper from '@/components/shared/NavigationWrapper';
import HeaderSection from '@/components/shared/HeaderSection';
import MemberCard from '@/components/team/MemberCard';
import FounderCard from '@/components/team/FounderCard';
import { useQueryClient,useQuery } from '@tanstack/react-query';
import {fetchTeamMembers} from '@/lib/api/settingsRequests';
import { useTranslations } from 'next-intl';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import {useLocale} from 'next-intl';
import {Crown,Users} from 'lucide-react';
import { Member } from '@/components/types/MembersTableColumns';
import { Key } from 'react';

export default function Team() {
    const locale = useLocale();
    const isRtl = locale === 'ar';
    const t = useTranslations('team')
    const {data:data,isLoading,isError,error,isFetched:membersFetched} = useQuery({
        queryKey: ['members'],
        queryFn: fetchTeamMembers,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 24
    })
    if (isLoading) return <LoadingSpinner  />
    // if (isError) return <p>Error</p>
    return (
        <>
            <NavigtionWrapper />
            <HeaderSection pageTitle={{en:'Team members', ar:'فريق العمل'}} pageImage={data.coverImage} breadCrumbArr={{en:[],ar:[]}} breadCrumbLinkArr={[]} />
            <section className="flex flex-col items-center text-center justify-center my-6 py-6 px-20 ">
                        <h1 className="text-4xl font-bold mb-6 text-unitedPrimary">
                            {!isRtl && <Crown size={32} className='inline mr-2 mb-2' />}
                            {t('title')}
                            {isRtl && <Crown size={32} className='inline ml-2 mb-2' />}
                            </h1>
                        <div className="grid grid-cols-1 gap-5 ">
                            {membersFetched && data.members.filter((member: { isFounder: any; }) => member.isFounder).map((member: Member, index: Key | null | undefined) => (
                                    <FounderCard
                                        key={index}
                                        isRtl={isRtl}
                                        member={member}
                                    />
                            ))}
                        </div>
                    </section>
                    <section className="flex flex-col items-center text-center justify-center  mt-3 mb-6 p-1 ">
                        <h1 className="text-2xl font-bold my-3 text-unitedPrimary">
                            {!isRtl && <Users size={32} className='inline mr-2 mb-2' />}
                            {t('subTitle')}
                            {isRtl && <Users size={32} className='inline ml-2 mb-2' />}
                            </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-8 w-full justify-items-center">
                        {membersFetched && data.members.filter((member: { isFounder: any; }) => !member.isFounder).map((member: Member, index: Key | null | undefined) => (
                            <MemberCard
                                key={index}
                                isRtl={isRtl}
                                member={member}
                            />
                        ))}
                        </div>
                    </section>
        </>
    )
}