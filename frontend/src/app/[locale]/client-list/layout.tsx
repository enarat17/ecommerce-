import type { Metadata } from "next";
import Footer from '@/components/shared/Footer';
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;

  if (locale === 'ar') {
    return {
      title: ' قائمة العملاء | المتحدة للاستشارات المالية والإدارية',
      description: 'قائمة العملاء السابقين الذين حصلوا علي استشاراتنا وخدماتنا',
    };
  }

  return {
    title: 'Client list | United for F&A Consultants',
    description: 'a list of the clients that dealt with us and got our services and consults',
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
