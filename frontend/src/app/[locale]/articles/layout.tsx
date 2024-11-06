import React  from 'react';
import type { Metadata } from "next";
import Footer from '@/components/shared/Footer';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;

  if (locale === 'ar') {
    return {
      title: ' المقالات | المتحدة للاستشارات المالية والإدارية',
      description: 'مقالات محاسبية وإدارية من المتحدة للاستشارات المالية والإدارية.',
    };
  }

  return {
    title: 'Articles | United for F&A Consultants',
    description: 'financial and diverse articles from United for F&A Consultants.',
  };
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <>
    <main className="flex flex-col items-center">
      {children}
    </main> 
    <Footer />
  </>
  );
}
