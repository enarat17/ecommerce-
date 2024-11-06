import type { Metadata } from "next";
import Footer from '@/components/shared/Footer';
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;

  if (locale === 'ar') {
    return {
      title: ' خدمات أعمالي | المتحدة للاستشارات المالية والإدارية',
      description:'قائمة الخدمات التي تقدمها المتحدة للاستشارات المالية والإدارية',
    };
  }

  return {
    title: 'Business Services | United for F&A Consultants',
    description: 'a list of the services that united for financial and administrative consulting provides',
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
    </main> 
  );
}
