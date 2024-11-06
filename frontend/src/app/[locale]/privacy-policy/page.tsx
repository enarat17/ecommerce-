'use client';
import React from "react";
import NavigationWrapper from "@/components/shared/NavigationWrapper";
import HeaderSection from "@/components/shared/HeaderSection";
import {useLocale} from 'next-intl';
import {useQuery} from "@tanstack/react-query";
import {fetchPrivacyPolicyInfo} from "@/lib/api/settingsRequests";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { sanitizeHtml } from "@/components/Security/dompurify";
export default function PrivacyPolicy() {
    const locale = useLocale();
    const isRtl = locale === 'ar';
    const {data:data,isLoading}=useQuery({
        queryKey: ['privacy-policy'],
        queryFn: fetchPrivacyPolicyInfo,
        staleTime: 60 * 60 * 60,
        gcTime: 60 * 60 * 60 * 24,
    })

    if(isLoading) return (
        <div className="flex flex-col justify-between min-h-screen ">
            <LoadingSpinner  />
        </div>
    )
    return (
        <>
            <NavigationWrapper />
            <HeaderSection pageTitle={{en:'Privacy Policy', ar:'سياسة الخصوصية'}} pageImage={data.coverImage} breadCrumbArr={{en:[],ar:[]}} breadCrumbLinkArr={[]} />
            <section className="bg-white p-8 w-[90vw] rounded-xl my-4 shadow-md">      
                <p dangerouslySetInnerHTML={{__html: sanitizeHtml(isRtl ? data?.description_AR : data?.description_EN)}} 
                    className={`text-lg text-left ${isRtl && 'text-right rtl-text'} mb-6 text-unitedPrimary`} />
            </section>
        </>
    )
}