import type { Metadata } from "next";
import React from "react";
import Footer from '@/components/shared/Footer';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;

  if (locale === 'ar') {
    return {
      title: ' المتجر الإداري | المتحدة للاستشارات المالية والإدارية',
      description:'متجر منصة المتحدون',
    };
  }

  return {
    title: 'HR store | United for F&A Consultants',
    description: 'sign up as a new user  on United for F&A Consultants platform',
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
