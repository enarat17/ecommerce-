import React  from 'react';
import type { Metadata } from "next";
import Footer from '@/components/shared/Footer';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;

  if (locale === 'ar') {
    return {
      title: ' تسجيل دخول | المتحدة للاستشارات المالية والإدارية',
      description: 'تسجيل الدخول الي حسابك في منصة المتحدة للاستشارات المالية والإدارية',
    };
  }

  return {
    title: 'login | United for F&A Consultants',
    description: 'login in your account on united for f&a consultants',
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
