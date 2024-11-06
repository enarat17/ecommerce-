"use client";
import { Mail, Facebook, Phone, MessageCircle, Home, MapPin, Clock } from 'lucide-react';
import HeaderSection from '@/components/shared/HeaderSection';
import NavigationWrapper from '@/components/shared/NavigationWrapper';
import InquiryForm from '@/components/InquiryForm';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useQuery} from '@tanstack/react-query';
import { fetchContactUsInfo } from '@/lib/api/generalRequests';
import { useTranslations } from 'next-intl';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import {useLocale} from 'next-intl';

export default function ContactUs() {
  const t = useTranslations('contact-us');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const{data:contactInfo,isFetched}=useQuery({
    queryKey: ['contactUsInfo'],
    queryFn:fetchContactUsInfo,
    staleTime: 1000*60*60,
    gcTime: 1000*60*60*24
  })


  const sendWhatsButton = (rtl : boolean) => {
    const phoneNumber = `+966${contactInfo.phone}`; // Your phone number in international format
    if (rtl) {
      window.open(`https://wa.me/${phoneNumber}`, '_blank');
    } else {
      window.open(`https://wa.me/${phoneNumber}`, '_blank');
    }
  }

  if (!isFetched) {
    return <LoadingSpinner />
  }



  return (
    <>
        <NavigationWrapper />
        <HeaderSection pageTitle={{en:'Complient', ar:'الشكاوي والإقتراحات'}} pageImage={isFetched && contactInfo.coverImage} breadCrumbArr={{en:['contact us'],ar:['تواصل معنا']}} breadCrumbLinkArr={['/contact-us']} />
        {isFetched && <div className="my-4 px-4 py-8 w-[90vw]">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl font-bold mb-6 text-center text-unitedPrimary ">{t('title')}</motion.h1>
            <div className='flex flex-row gap-8 justify-center flex-wrap'>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col bg-white shadow-md rounded-xl items-center py-4 px-12">
              <p className="text-lg font-semibold  leading-relaxed text-unitedPrimary text-center mb-8">{t('InquiryTitle')}</p>
              <InquiryForm locale={locale} />
            </motion.div>
           
          </div>
        </div>}
    </>
  );
}