'use client';
import React from "react";
import HeaderSection from "@/components/shared/HeaderSection";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import NavigationWrapper from "@/components/shared/NavigationWrapper";
import { getOneConsult } from "@/lib/api/consultsApi";
import { useQuery } from '@tanstack/react-query';
import { sanitizeHtml } from '@/components/Security/dompurify';
import { useLocale } from 'next-intl';
import {motion} from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { fetchHeaderImages } from "@/lib/api/settingsRequests";

export default function ServicePage({params}: {params: {slug: string}}) {

    const slug = params.slug;
    const locale = useLocale();
    const isRtl = locale === 'ar';

    const {data:service, isLoading, isError} = useQuery({
        queryKey:['accouning-service', slug],
        queryFn:() => getOneConsult(slug),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 24,
    })

    const {data:headerImages,isFetched:HTFetched} = useQuery({
        queryKey:['headerImages'],
        queryFn:fetchHeaderImages,
    })

    const sendWhatsButton = (rtl : boolean) => {
              const phoneNumber = '+966506049133'; // Your phone number in international format
              const messageEN = `I want a consult on ${service.title_EN}`;
              const messageAR = `أريد الاستشارة على ${service.title_AR}`;
              if (rtl) {
                window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageAR)}`, '_blank');
              } else {
                window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageEN)}`, '_blank');
              }
            }


    if(isLoading){
        return(
            <div className='w-full h-screen'>
                <LoadingSpinner />
            </div>
        )
    }


    return (
        <>
            <NavigationWrapper />
            <HeaderSection pageTitle={{en:service.title_EN,ar:service.title_AR}} pageImage={HTFetched && headerImages.accountingServices} breadCrumbArr={{en:['Services','ِAccounting Services'],ar:['الخدمات','الخدمات المحسابية ']}} breadCrumbLinkArr={['/services','/services/accounting-services']}/>
                <div className={`w-full flex items-center px-5 ${isRtl ? 'navbar:flex-row flex-col' : 'navbar:flex-row-reverse flex-col'}`}>
                <motion.div 
                    initial={{opacity:0,x:isRtl ? -100:100}}
                    animate={{opacity:1,x:0}}
                    transition={{duration:0.5,delay:0.5}}
                    className="w-[95%] mt-4 navbar:w-[50%] navbar:m-0 flex justify-center items-center">
                    <Image src={`/imgs/images/${service.coverImage}`} alt="Service Image" width={1000} height={1000} className="w-[700px] h-auto rounded-lg border-2 border-unitedSecondary" />
                </motion.div>
                <div className="w-[95%] navbar:w-[50%]">
                <motion.div 
                    initial={{opacity: 0, x: isRtl ? 100 : -100}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.5, delay: 0.5}}
                    className={`p-4 mt-8 ${isRtl ? 'navbar:ml-5': 'navbar:mr-2'} bg-white rounded-xl border border-unitedSecondary `}>
                    <h3 className={`text-2xl font-bold mb-6 text-unitedPrimary ${isRtl && 'text-right rtl-text'}`}>{isRtl ? "نبذة عن الخدمة" : "Brief about the service"}</h3>
                    <p className={`text-gray-700 font-semibold mb-6 ${isRtl && 'text-right rtl-text'}`}> {isRtl ? service.description_AR : service.description_EN }  </p>
                </motion.div>
                <motion.div 
                    initial={{opacity: 0, x: isRtl ? 100 : -100}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.5, delay: 0.5}}
                    className={` p-4 my-8 ${isRtl ? 'navbar:ml-5': 'navbar:mr-2'} bg-white rounded-xl border border-unitedSecondary `}>
                    <h3 className={`text-2xl font-bold mb-6 text-unitedPrimary ${isRtl && 'text-right rtl-text'}`}>{isRtl ? "ما الذي ستحصل عليه؟" : "What will you get ?"}</h3>
                    <div className={`text-gray-700 font-semibold mb-6 ${isRtl && 'text-right rtl-text'}`} dangerouslySetInnerHTML={{ __html: sanitizeHtml(isRtl ? service.body_AR : service.body_EN) }} />   
                </motion.div>
                </div>
                </div>
                <motion.div
                    initial={{opacity: 0, y: isRtl ? -100 : 100}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.5}}
                    className=" p-4 my-8 flex flex-row space-x-4 gap-8 items-center"
                    >
                    <Button
                        onClick={() => sendWhatsButton(isRtl)}
                        className="bg-unitedPrimary hover:bg-unitedPrimary/75">{isRtl ? 'ارسل لنا رسالة علي الواتساب' : 'Send us a message on whatsapp'}</Button>
                    <Link href="/contact-us" >
                        <Button className="bg-unitedPrimary hover:bg-unitedPrimary/75">{isRtl ?' عرض معلومات التواصل ':'View Contact info' } </Button>
                    </Link>
                </motion.div>
        </>
    );
}