"use client";
import { useState, useEffect, Key } from "react";
import { Blog } from "@/components/types/BlogTableColumns";
import Footer from "@/components/shared/Footer";
import BlogCard from "@/components/shared/BlogCard";
import axios from "axios";
import HeaderSection from "@/components/shared/HeaderSection";
import NavigationWrapper from "@/components/shared/NavigationWrapper";
import { useQuery } from "@tanstack/react-query";
import { fetchHeaderImages } from "@/lib/api/settingsRequests";
import { useLocale } from "next-intl";
import { fetchArticles } from "@/lib/api/blogsApi";
import React from "react";

export default function Blogs() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { data: headerImages, isLoading } = useQuery({
    queryKey: ["headerImages"],
    queryFn: fetchHeaderImages,
    staleTime:1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });

  const {data:articles,isFetched:articlesFetched} = useQuery({
    queryKey:['articles'],
    queryFn: fetchArticles,
    staleTime:1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  })
 

  return (
    <>
      <NavigationWrapper />
      <HeaderSection
          pageTitle={{ en: "Articles", ar: "المقالات" }}
          pageImage={!isLoading && headerImages.blogsPage}
          breadCrumbArr={{ en: [], ar: [] }}
          breadCrumbLinkArr={[]}
        />
        <div className="p-4 m-2 ">
          <div className="grid grid-cols-1 navbar:grid-cols-2 justify-items-center gap-5">
            {articlesFetched && articles.map((blog: Blog, id: Key | null | undefined) => (
              <BlogCard key={id} blog={blog} isRtl={isRtl} />
            ))}
          </div>
        </div>
    </>
  );
}
