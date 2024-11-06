import type { Metadata } from "next";
import Footer from '@/components/shared/Footer';
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;

  if (locale === 'ar') {
    return {
      title: ' مستخدم جديد | المتحدة للاستشارات المالية والإدارية',
      description:'تسجيل كمستخدم جديد في منصة المتحدة للاستشارات المالية والإدارية',
    };
  }

  return {
    title: 'Sign up | United for F&A Consultants',
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
