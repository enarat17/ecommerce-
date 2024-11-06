import type { Metadata } from "next";
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;

  if (locale === 'ar') {
    return {
      title: ' خدمات الموارد البشرية | المتحدة للاستشارات المالية والإدارية',
      description:'قائمة الخدمات التي تقدمها المتحدة للاستشارات المالية والإدارية',
    };
  }

  return {
    title: 'HR Services | United for F&A Consultants',
    description: 'a list of the services that united for financial and administrative consulting provides',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full flex flex-col items-center">
      {children}
    </main> 
  );
}
