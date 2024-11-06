"use client";
import React from 'react';
import ClientCard from '@/components/ClientCard';
import { fetchClients } from '@/lib/api/settingsRequests';
import {useQuery} from '@tanstack/react-query';
import {useTranslations} from 'next-intl';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import NavigtionWrapper from '@/components/shared/NavigationWrapper';
import HeaderSection from '@/components/shared/HeaderSection';
import {useLocale} from 'next-intl';
import { Handshake } from 'lucide-react';
import {motion} from 'framer-motion';
import { Client } from '@/components/types/ClientTableColumns';
import { Key } from 'react';



export default function ClientList() {
    const t = useTranslations('client-list');
    const locale = useLocale();
    const isRtl = locale === 'ar';
    const {data:data,isLoading,isError,isFetched} = useQuery({
        queryKey: ['clients'],
        queryFn: fetchClients,
        staleTime: 1000*60*60,
        gcTime: 1000*60*60*24
    });
    if(isLoading) return <LoadingSpinner  />
    // if(isError) return <p>Error</p>
    return (
        <>
            <NavigtionWrapper />
            <HeaderSection pageTitle={{en:'Our clients', ar:'عملاءنا'}} pageImage={data.coverImage} breadCrumbArr={{en:[],ar:[]}} breadCrumbLinkArr={[]} />
                <section className="flex flex-col items-center px-4 py-8 w-[90vw]  my-6">
                    <div className="w-full flex flex-col items-center text-center  justify-center">
                            <h1 className="text-4xl text-unitedPrimary text font-bold mb-6">
                                {isRtl && <Handshake size={36} className='inline mr-5' />}
                                {t('title')}
                                {!isRtl && <Handshake size={36} className='inline ml-5'/>}
                            </h1>
                        <div className="flex flex-wrap gap-4 items-center justify-around w-full">
                            {isFetched && data.clients.map((client: Client, index: Key | null | undefined) => (
                                <motion.div
                                    key={index}
                                    initial={{ rotate:180, scale: 0 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    transition={{
                                        type: "just",
                                        stiffness: 120,
                                        damping: 20,
                                        duration: 0.3,
                                    }}
                                >
                                <ClientCard
                                    key={index}
                                    isRtl={isRtl}
                                    client={client}
                                />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
        </>
    );
}
