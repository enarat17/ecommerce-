"use client";
import HeaderSection from "@/components/shared/HeaderSection";
import OurFeatures from "@/components/shared/LandingPage/OurFeatures";
import { useQuery } from "@tanstack/react-query";
import { fetchAboutUsInfo } from "@/lib/api/generalRequests";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import NavigtionWrapper from "@/components/shared/NavigationWrapper";
import { MessageSquareText, Globe, Target, Eye } from "lucide-react";
import { motion} from "framer-motion";
import { useLocale } from "next-intl";
import { fetchHeaderImages } from "@/lib/api/settingsRequests";
import React from "react";

export default function AboutUs() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { data: aboutUs, isLoading } = useQuery({
    queryKey: ["about-us"],
    queryFn: fetchAboutUsInfo,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });

  const {data:headerImages,isFetched:HTFetched} = useQuery({
    queryKey:['headerImages'],
    queryFn:fetchHeaderImages,
})

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const iconAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.2, duration: 0.5 },
    },
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <NavigtionWrapper />
      <HeaderSection
        pageTitle={{ en: "About Us", ar: "من نحن" }}
        pageImage={HTFetched && headerImages.aboutUsPage}
        breadCrumbArr={{ en: [], ar: [] }}
        breadCrumbLinkArr={[]}
      />
      {!isLoading && (
        <div className="container w-[90vw] px-4 py-10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className={`mb-20 bg-white shadow-md p-4 rounded-xl relative ${
              isRtl ? "text-right" : "text-left"
            }`}
          >
            <motion.div
              variants={iconAnimation}
              className={`mb-5 absolute -top-[30px] ${
                isRtl ? "-right-[30px]" : "-left-[30px]"
              } `}
            >
              <Globe className="w-20 h-20 bg-white p-1 rounded-full text-unitedPrimary" />
            </motion.div>
            <h3 className="text-3xl font-semibold text-unitedPrimary mb-3 mt-10">
              {isRtl ? "نبذة عن مكتب المتحدون" : "About the Company"}
            </h3>
            <p className="text-lg text-gray-600">
              {isRtl ? aboutUs.aboutUs_AR : aboutUs.aboutUs_EN}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className={`mb-20 bg-white shadow-md p-4 rounded-xl relative ${
              isRtl ? "text-right" : "text-left"
            }`}
          >
            <motion.div
              variants={iconAnimation}
              className={`mb-5 absolute -top-[30px] ${
                isRtl ? "-right-[30px]" : "-left-[30px]"
              } `}
            >
              <Eye className="w-20 h-20 bg-white p-1 rounded-full text-unitedPrimary" />
            </motion.div>
            <h3 className="text-3xl font-semibold text-unitedPrimary mb-3 mt-10">
              {isRtl ? "رؤيتنا" : "Our Vision"}
            </h3>
            <p className="text-lg text-gray-600">
              {isRtl ? aboutUs.ourVision_AR : aboutUs.ourVision_EN}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className={`mb-20 bg-white shadow-md p-4 rounded-xl relative ${
              isRtl ? "text-right" : "text-left"
            }`}
          >
            <motion.div
              variants={iconAnimation}
              className={`mb-5 absolute -top-[30px] ${
                isRtl ? "-right-[30px]" : "-left-[30px]"
              } `}
            >
              <Target className="w-20 h-20 bg-white p-1 rounded-full text-unitedPrimary" />
            </motion.div>
            <h3 className="text-3xl font-semibold text-unitedPrimary mb-3 mt-10">
              {isRtl ? "اهدافنا" : "Our Goals"}
            </h3>
            <p className="text-lg text-gray-600">
              {isRtl ? aboutUs.goals_AR : aboutUs.goals_EN}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className={`mb-20 bg-white shadow-md p-4 rounded-xl relative ${
              isRtl ? "text-right" : "text-left"
            }`}
          >
            <motion.div
              variants={iconAnimation}
              className={`mb-5 p-3 rounded-full bg-white absolute -top-[30px] ${
                isRtl ? "-right-[30px]" : "-left-[30px]"
              } `}
            >
              <MessageSquareText className="w-14 h-14 text-unitedPrimary" />
            </motion.div>
            <h3 className="text-3xl font-semibold text-unitedPrimary mb-3 mt-10">
              {isRtl ? "رسالتنا" : "Our Message"}
            </h3>
            <p className="text-lg text-gray-600">
              {isRtl ? aboutUs.message_AR : aboutUs.message_EN}
            </p>
          </motion.div>

          <OurFeatures features={aboutUs.properties} locale={locale} />
        </div>
      )}
    </>
  );
}
