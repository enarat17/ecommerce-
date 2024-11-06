'use client';
import HeaderSection from '@/components/shared/HeaderSection';
import JoinForm from '@/components/JoinForm';
import {useTranslations} from 'next-intl';
import NavigationWrapper from "@/components/shared/NavigationWrapper";
import {useQuery} from "@tanstack/react-query";
import { fetchHeaderImages } from '@/lib/api/settingsRequests';
import { motion } from 'framer-motion';

export default function JointUs() {
  const t = useTranslations('join-us');
  const {data:headerImages,isFetched} = useQuery({
    queryKey: ['headerImages'],
    queryFn: fetchHeaderImages,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  })
  return (
    <>
        <NavigationWrapper />
        <HeaderSection pageTitle={{en:'Join our team',ar:'انضم الي فريقنا'}} pageImage={isFetched && headerImages.loggingPage} breadCrumbArr={{en:[],ar:[]}} breadCrumbLinkArr={[]} />
        <motion.div
          className="my-4 px-4 py-8 w-[90vw] flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-3xl font-bold mb-6 text-center text-unitedPrimary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t("title")}
          </motion.h1>

          {/* <motion.p
            className="text-lg font-semibold leading-relaxed text-gray-700 text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {t("subTitle")}
          </motion.p> */}
            <JoinForm />
        </motion.div>
    </>
  );
}
