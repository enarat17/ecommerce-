import React  from 'react';
import type { Metadata } from "next";
import Footer from '@/components/shared/Footer';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;

  if (locale === 'ar') {
    return {
      title: 'من نحن | المتحدة للاستشارات المالية والإدارية',
      description: 'تعرف على فريقنا ومهمتنا في المتحدة للاستشارات المالية والإدارية.',
    };
  }

  return {
    title: 'About Us | United for F&A Consultants',
    description: 'Learn about our team and our mission at United for F&A Consultants.',
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
