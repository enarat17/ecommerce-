'use client';
import React from "react";
import NavigationWrapper from "@/components/shared/NavigationWrapper";
import Footer from "@/components/shared/Footer";
import HeaderSection from "@/components/shared/HeaderSection";
import {useLocale} from 'next-intl';
import {useQuery} from "@tanstack/react-query";
import {fetchTermsAndConditionsInfo} from "@/lib/api/settingsRequests";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { sanitizeHtml } from "@/components/Security/dompurify";
export default function TermsAndConditions() {
    const locale = useLocale();
    const isRtl = locale === 'ar';
    const {data:data,isLoading}=useQuery({
        queryKey: ['terms-conditions'],
        queryFn: fetchTermsAndConditionsInfo,
        staleTime: 60 * 60 * 60,
        gcTime: 60 * 60 * 60 * 24,
    })

    if(isLoading) return (
        <div className="flex flex-col justify-between min-h-screen ">
            <NavigationWrapper />
            <LoadingSpinner />
            <Footer />
        </div>
    )
    return (
        <>
            <NavigationWrapper />
            <HeaderSection pageTitle={{en:'Terms & Conditions', ar:'الشروط والاحكام'}} pageImage={data.coverImage} breadCrumbArr={{en:[],ar:[]}} breadCrumbLinkArr={[]} />
            <section className="bg-white p-8 w-[90vw] rounded-xl my-4 shadow-md">      
                <p  dangerouslySetInnerHTML={{__html:sanitizeHtml(isRtl ? data.description_AR : data.description_EN)}}
                    className={` text-left ${isRtl && 'text-right rtl-text'}  mb-6 text-unitedPrimary`} />
            </section>
        </>
    )
}