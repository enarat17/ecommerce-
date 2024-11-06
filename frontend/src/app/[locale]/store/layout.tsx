import type { Metadata } from "next";
import Footer from '@/components/shared/Footer';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;

  if (locale === 'ar') {
    return {
      title: ' المتجر الإلكتروني | المتحدة للاستشارات المالية والإدارية',
      description:'متجر منصة المتحدون',
    };
  }

  return {
    title: 'E-store | United for F&A Consultants',
    description: 'sign up as a new user  on United for F&A Consultants platform',
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (    
  <main className="flex flex-col items-center">
      {children}
      <Footer />
    </main> 
  );
}
