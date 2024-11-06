"use client";
import React from "react";
import NavigationWrapper from "@/components/shared/NavigationWrapper";
import HeaderSection from "@/components/shared/HeaderSection";
import ServicesTabs from "@/components/shared/servicesPage/ServicesTabs";
import { useQuery } from "@tanstack/react-query";
import { fetchConsults } from "@/lib/api/consultsApi";
import { fetchHeaderImages } from "@/lib/api/settingsRequests";
import { useLocale } from "next-intl";

export default function ConsultsPage() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const {
    data: consults,
    isFetched,
    isError,
  } = useQuery({
    queryKey: ["consults"],
    queryFn: fetchConsults,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });

  const {data:headerImages,isFetched:HTFetched}=useQuery({
    queryKey:['headerImages'],
    queryFn:fetchHeaderImages,
    staleTime:1000 * 60 * 60,
    gcTime:1000 * 60 * 60 * 24,
  })

  return (
    <>
      <NavigationWrapper />
        <HeaderSection
          pageTitle={{ en: "Services", ar: "خدماتنا" }}
          pageImage={HTFetched && headerImages.servicesPage}
          breadCrumbArr={{ en: [], ar: [] }}
          breadCrumbLinkArr={[]}
        />
        {isFetched && (
          <div className="w-11/12 my-1">
            <ServicesTabs services={consults} isRtl={isRTL} />
          </div>
        )}
    </>
  );
}
