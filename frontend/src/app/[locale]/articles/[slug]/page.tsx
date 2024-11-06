"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/shared/Dashboard/BackButton";
import NavigationWrapper from "@/components/shared/NavigationWrapper";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import Link from "next/link";
import MoreLikeThis from "@/components/MoreLikeThis";
import { sanitizeHtml } from "@/components/Security/dompurify";
import HeaderSection from "@/components/shared/HeaderSection";
import PdfFlipBook from "@/components/shared/PdfFlipBook";
import { useQuery } from "@tanstack/react-query";
import { fetchHeaderImages } from "@/lib/api/settingsRequests";

export default function BlogPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const { data: blogData, isLoading } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () =>
      axios
        .get(`http://localhost:8000/api/v1/blogs/${slug}`)
        .then((response) => response.data.data.data),
    refetchOnWindowFocus: false,
  });
  const { data: headerImages, isFetched: headerImagesLoaded } = useQuery({
    queryKey: ["headerImages"],
    queryFn: fetchHeaderImages,
  });
  // const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  if (isLoading) {
    return (
      <div>
        <NavigationWrapper />
        <BackButton />
        <div className="container mx-auto py-8">
          <h1></h1>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <NavigationWrapper />
      <div className="flex flex-col items-center">
        <HeaderSection
          pageTitle={{ en: blogData.title_EN, ar: blogData.title_AR }}
          pageImage={headerImagesLoaded && headerImages.blogsPage}
          breadCrumbArr={{ en: [], ar: [] }}
          breadCrumbLinkArr={["/blogs"]}
        />
        <div className="lg:w-[1500px] md:w-[1000px] w-[600px] p-4 m-2 bg-slate-100/85 shadow-lg min-h-screen">
          <PdfFlipBook
            pdfName={`/documents/${encodeURIComponent(blogData.file)}`}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
