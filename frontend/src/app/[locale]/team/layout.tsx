import type { Metadata } from "next";
import Footer from '@/components/shared/Footer';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;

  if (locale === 'ar') {
    return {
      title: 'فريق العمل | المتحدة للاستشارات المالية والإدارية',
      description: 'تعرف على فريقنا والمؤسسين لمنصة المتحدة للاستشارات المالية والإدارية.',
    };
  }

  return {
    title: 'Team | United for F&A Consultants',
    description: 'Learn about our team and founders of the United for F&A Consultants platform.',
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
