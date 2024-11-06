import type { Metadata } from "next";
import Footer from '@/components/shared/Footer';
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;

  if (locale === 'ar') {
    return {
      title: ' الشروط والاحكام | المتحدة للاستشارات المالية والإدارية',
      description:'الشروط والاحكام للمتحدة للاستشارات المالية والإدارية',
    };
  }

  return {
    title: 'Terms and conditions | United for F&A Consultants',
    description: 'Terms and conditions for United for F&A Consultants',
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
